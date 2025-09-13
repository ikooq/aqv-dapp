"use client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { AnchorProvider } from "@project-serum/anchor";
import { AqvClient } from "@/sdk/aqv";
import { getPrice } from "@/sdk/pyth";
import { jupQuote, jupBuildSwap } from "@/sdk/jupiter";
import Governance from "@/components/Governance";
import Insurance from "@/components/Insurance";
import AIRiskAnalysis from "@/components/AIRiskAnalysis";
import SocialFeatures from "@/components/SocialFeatures";
import NFTIntegration from "@/components/NFTIntegration";
import { Buffer } from "buffer";

// ---- lightweight toast hook (локально для страницы)
function useToast() {
    const [msg, setMsg] = useState<string | null>(null);
    useEffect(() => {
        if (!msg) return;
        const t = setTimeout(() => setMsg(null), 2200);
        return () => clearTimeout(t);
    }, [msg]);
    const Toast = msg ? (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 rounded-xl bg-black text-white px-4 py-2 text-sm shadow">
            {msg}
        </div>
    ) : null;
    return { setMsg, Toast };
}

export default function VaultPage() {
    const { setMsg, Toast } = useToast();

    const params = useParams<{ address: string }>();
    const rawAddress = params.address as string;
    const address = Array.isArray(rawAddress) ? rawAddress[0] : rawAddress;

    const { connection } = useConnection();
    const wallet = useWallet();

    const provider = useMemo(() => {
        if (!wallet || !wallet.publicKey) return null;
        // @ts-ignore - AnchorProvider принимает WalletAdapter
        return new AnchorProvider(connection, wallet, { commitment: "confirmed" });
    }, [wallet, connection]);

    const client = useMemo(() => {
        if (!provider) return null;
        return new AqvClient(connection, provider);
    }, [provider, connection]);

    // ===== DEMO-метрики и сумма =====
    const [amount, setAmount] = useState<string>("10");
    const [apy, setApy] = useState<number>(12.4);
    const [tvl, setTvl] = useState<number>(12543.21);
    const [risk, setRisk] = useState<"LOW" | "MEDIUM" | "HIGH">("LOW");
    const [routeInfo, setRouteInfo] = useState<any | null>(null);

    const ENABLE_SEND = (process.env.NEXT_PUBLIC_JUP_ENABLE_SEND || "false") === "true";
    // фолбэки на случай, если .env.local не подхватился
    const IN_MINT = process.env.NEXT_PUBLIC_JUP_INPUT_MINT ?? "So11111111111111111111111111111111111111112"; // WSOL
    const OUT_MINT = process.env.NEXT_PUBLIC_JUP_OUTPUT_MINT ?? "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"; // USDC

    useEffect(() => {
        (async () => {
            const sol = await getPrice("SOL");
            const riskScore =
                100 - (sol.vol24h * 100 * 0.6 + (1 / (tvl + 1)) * 1000 * 0.2 + 10);
            setRisk(riskScore > 75 ? "LOW" : riskScore > 55 ? "MEDIUM" : "HIGH");
            setApy(12.4);
        })();
    }, [tvl]);

    const disabled = !wallet.connected || !client;
    const parsedAmount = Math.max(0, Number(amount) || 0);

    const onDeposit = async () => {
        if (!client) return;
        await client.deposit({ amount: parsedAmount, vault: address }); // демо
        setTvl((prev) => Math.max(0, prev + parsedAmount));
        setMsg("Deposit simulated ✓");
    };

    const onWithdraw = async () => {
        if (!client) return;
        await client.withdraw({ amount: parsedAmount, vault: address }); // демо
        setTvl((prev) => Math.max(0, prev - parsedAmount));
        setMsg("Withdraw simulated ✓");
    };

    const onHarvest = async () => {
        if (!client || !wallet.publicKey) return;

        try {
            // несколько попыток под разные суммы/пары
            const tries = [
                { inMint: IN_MINT, outMint: OUT_MINT, amount: 50_000_000 }, // 0.05 SOL
                { inMint: IN_MINT, outMint: "Es9vMFrzaCERhG6X9Q66v1i7C8Gx1LqG9Cwzp7A9bk5z", amount: 50_000_000 }, // USDT
                { inMint: "So11111111111111111111111111111111111111112", outMint: OUT_MINT, amount: 100_000_000 }, // 0.1
            ];

            let pickedRoute: any = null;
            let pickedTry: any = null;

            for (const t of tries) {
                try {
                    const r = await jupQuote({
                        inputMint: t.inMint,
                        outputMint: t.outMint,
                        amount: t.amount,
                        slippageBps: 50,
                    });
                    if (r) {
                        pickedRoute = r;
                        pickedTry = t;
                        break;
                    }
                } catch (e) {
                    console.warn("quote attempt failed:", e);
                }
            }

            if (!pickedRoute) {
                // демо-фолбэк
                setTvl((prev) => prev * 1.001);
                setApy((prev) => Math.min(25, prev + 0.05));
                setMsg("No Jupiter route. Simulated compound ✓");
                return;
            }

            setRouteInfo(pickedRoute);
            const b64tx = await jupBuildSwap({
                route: pickedRoute,
                userPublicKey: wallet.publicKey.toBase58(),
                wrapAndUnwrapSol: true,
            });

            if (!ENABLE_SEND) {
                console.log("Base64 tx (not sent):", b64tx.slice(0, 120) + "...");
                setTvl((prev) => prev * 1.001);
                setApy((prev) => Math.min(25, prev + 0.05));
                setMsg("Harvest built via Jupiter ✓");
                return;
            }

            // реальная отправка (если включишь ENABLE_SEND=true на mainnet)
            const { Transaction } = await import("@solana/web3.js");
            const tx = Transaction.from(Buffer.from(b64tx, "base64"));
            // @ts-ignore
            const signed = await wallet.signTransaction!(tx);
            const sig = await connection.sendRawTransaction(signed.serialize(), { skipPreflight: true });
            await connection.confirmTransaction(sig, "confirmed");

            setTvl((prev) => prev * 1.001);
            setApy((prev) => Math.min(25, prev + 0.05));
            setMsg("Harvest sent ✓");
            console.log("Signature:", sig);
        } catch (e: any) {
            console.error(e);
            setMsg(`Harvest failed: ${e.message ?? e}`);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                    <Link href="/" className="btn-secondary flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Vaults
                    </Link>
                </div>
                <h1 className="text-4xl font-bold gradient-text mb-2">USDC Auto-Compound Vault</h1>
                <p className="text-gray-400">Advanced yield optimization strategy with automated compounding</p>
                <div className="mt-4 flex items-center gap-4 text-sm">
                    <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full border border-green-500/20">
                        {risk} Risk
                    </span>
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                        Active Strategy
                    </span>
                    <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20">
                        Auto-Compound
                    </span>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Actions */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Action Card */}
                    <div className="card">
                        <h3 className="text-xl font-bold gradient-text mb-6">Vault Actions</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Amount (USDC)</label>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="input"
                                    min={0}
                                    placeholder="10"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <button
                                    onClick={onDeposit}
                                    disabled={disabled}
                                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Deposit
                                </button>
                                <button
                                    onClick={onWithdraw}
                                    disabled={disabled}
                                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                    </svg>
                                    Withdraw
                                </button>
                                <button
                                    onClick={onHarvest}
                                    disabled={disabled}
                                    className="btn-primary bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Harvest & Compound
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Jupiter Route Info */}
                    {routeInfo && (
                        <div className="card">
                            <h3 className="text-lg font-bold gradient-text mb-4">Jupiter Route Details</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                                <div>
                                    <div className="text-gray-400 mb-1">Output Amount</div>
                                    <div className="font-semibold">{routeInfo.outAmount}</div>
                                </div>
                                <div>
                                    <div className="text-gray-400 mb-1">Price Impact</div>
                                    <div className="font-semibold">{(routeInfo.priceImpactPct * 100).toFixed(2)}%</div>
                                </div>
                                <div>
                                    <div className="text-gray-400 mb-1">Route Hops</div>
                                    <div className="font-semibold">{routeInfo.marketInfos?.length ?? 0}</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* AI Risk Analysis */}
                    <AIRiskAnalysis />

                    {/* Governance & Insurance */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <Governance />
                        <Insurance />
                    </div>

                    {/* Social Features */}
                    <SocialFeatures />

                    {/* NFT Integration */}
                    <NFTIntegration />
                </div>

                {/* Sidebar Metrics */}
                <div className="space-y-6">
                    {/* Key Metrics */}
                    <div className="card">
                        <h3 className="text-lg font-bold gradient-text mb-4">Vault Metrics</h3>
                        <div className="space-y-4">
                            <Metric title="Current APY" value={`${apy.toFixed(2)}%`} icon="📈" />
                            <Metric title="Total Value Locked" value={`$${tvl.toLocaleString(undefined, { maximumFractionDigits: 2 })}`} icon="💰" />
                            <Metric title="Risk Level" value={risk} icon="🛡️" />
                        </div>
                    </div>

                    {/* Price Data */}
                    <div className="card">
                        <h3 className="text-lg font-bold gradient-text mb-4">Price Data</h3>
                        <div className="space-y-4">
                            <Metric title="SOL Price" value="$150.23" icon="🪙" />
                            <Metric title="USDC Price" value="$1.00" icon="💵" />
                        </div>
                    </div>

                    {/* Vault Info */}
                    <div className="card">
                        <h3 className="text-lg font-bold gradient-text mb-4">Vault Information</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Strategy</span>
                                <span className="font-medium">Yield Farming + DEX Arbitrage</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Base Asset</span>
                                <span className="font-medium">USDC</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Min Deposit</span>
                                <span className="font-medium">$10</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Fee</span>
                                <span className="font-medium">2%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {Toast}
        </div>
    );
}

function Metric({ title, value, icon }: { title: string; value: string; icon?: string }) {
    return (
        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
            <div className="flex items-center gap-3">
                {icon && <span className="text-lg">{icon}</span>}
                <span className="text-sm text-gray-400">{title}</span>
            </div>
            <div className="text-lg font-bold gradient-text">{value}</div>
        </div>
    );
}
