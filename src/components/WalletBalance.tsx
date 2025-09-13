"use client";
import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { getUserBalance, getTokenPrice, TOKENS } from "@/lib/solana";

export default function WalletBalance() {
    const { publicKey, connected } = useWallet();
    const [balance, setBalance] = useState(0);
    const [solPrice, setSolPrice] = useState(0);
    const [usdValue, setUsdValue] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (publicKey && connected) {
            fetchBalance();
            fetchSolPrice();
        } else {
            setBalance(0);
            setUsdValue(0);
        }
    }, [publicKey, connected]);

    const fetchBalance = async () => {
        if (!publicKey) return;

        setLoading(true);
        try {
            const userBalance = await getUserBalance(publicKey);
            setBalance(userBalance);
        } catch (error) {
            console.error('Error fetching balance:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSolPrice = async () => {
        try {
            const price = await getTokenPrice(TOKENS.SOL);
            setSolPrice(price);
        } catch (error) {
            console.error('Error fetching SOL price:', error);
        }
    };

    useEffect(() => {
        setUsdValue(balance * solPrice);
    }, [balance, solPrice]);

    if (!connected || !publicKey) return null;

    return (
        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl p-4 border border-purple-500/30 backdrop-blur-sm shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-300">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-lg">💰</span>
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-bold text-lg font-mono">
                            {loading ? '...' : balance.toFixed(4)}
                        </span>
                        <span className="text-purple-300 text-sm font-semibold">SOL</span>
                    </div>
                    {solPrice > 0 && (
                        <div className="text-green-400 text-sm font-medium">
                            ${usdValue.toFixed(2)} USD
                        </div>
                    )}
                    <div className="text-xs text-gray-400 mt-1">
                        Wallet Balance
                    </div>
                </div>
                <button
                    onClick={fetchBalance}
                    disabled={loading}
                    className="p-2 text-purple-300 hover:text-white hover:bg-purple-500/20 rounded-lg transition-all duration-200 disabled:opacity-50"
                    title="Refresh balance"
                >
                    {loading ? (
                        <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
}


