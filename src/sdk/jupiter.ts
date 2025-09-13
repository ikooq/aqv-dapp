export type JupiterRoute = {
    inAmount: string;
    outAmount: string;
    otherAmountThreshold: string;
    priceImpactPct: number;
    marketInfos: any[];
};

const JUP_QUOTE = "https://quote-api.jup.ag/v6/quote";
const JUP_SWAP = "https://quote-api.jup.ag/v6/swap";

function ensure(v: string | undefined, name: string): string {
    if (!v) throw new Error(`Missing ${name}. Check .env.local`);
    return v;
}

export async function jupQuote(params: {
    inputMint: string;
    outputMint: string;
    amount: number;        // атомы (для SOL: 1 SOL = 1e9)
    slippageBps?: number;  // 50 = 0.5%
}) {
    const { inputMint, outputMint, amount, slippageBps = 50 } = params;

    const url = `${JUP_QUOTE}?inputMint=${encodeURIComponent(
        ensure(inputMint, "inputMint")
    )}&outputMint=${encodeURIComponent(
        ensure(outputMint, "outputMint")
    )}&amount=${String(amount)}&slippageBps=${slippageBps}&swapMode=ExactIn&onlyDirectRoutes=false`;

    const res = await fetch(url);
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Jupiter quote error: ${res.status} ${text}`);
    }
    const data = await res.json();
    return (data?.data?.[0] ?? null) as JupiterRoute | null;
}

export async function jupBuildSwap(args: {
    route: JupiterRoute;
    userPublicKey: string;
    wrapAndUnwrapSol?: boolean;
    asLegacyTransaction?: boolean;
}) {
    const { route, userPublicKey, wrapAndUnwrapSol = true, asLegacyTransaction = false } = args;

    const res = await fetch(JUP_SWAP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            quoteResponse: route,
            userPublicKey,
            wrapAndUnwrapSol,
            asLegacyTransaction,
            dynamicComputeUnitLimit: true,
            prioritizationFeeLamports: "auto",
            platformFeeBps: 0
        }),
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Jupiter swap build error: ${res.status} ${text}`);
    }
    const data = await res.json();
    return data?.swapTransaction as string;
}
