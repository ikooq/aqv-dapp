export async function getPrice(symbol: string) {
    // DEMO: статические цены/волатильность
    if (symbol === "SOL") return { price: 150, vol24h: 0.12 };
    if (symbol === "USDC") return { price: 1, vol24h: 0.01 };
    return { price: 1, vol24h: 0.2 };
}
