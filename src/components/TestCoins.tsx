"use client";
import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { getUserBalance } from "@/lib/solana";

export default function TestCoins() {
    const { publicKey } = useWallet();
    const [balance, setBalance] = useState(0);
    const [testCoins, setTestCoins] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (publicKey) {
            fetchBalance();
        }
    }, [publicKey]);

    const fetchBalance = async () => {
        if (!publicKey) return;

        try {
            const userBalance = await getUserBalance(publicKey);
            setBalance(userBalance);
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    };

    const addTestCoins = () => {
        setTestCoins(prev => prev + 0.1);
    };

    const resetTestCoins = () => {
        setTestCoins(0);
    };

    if (!publicKey) return null;

    return (
        <div className="fixed bottom-4 right-4 z-40">
            <button
                onClick={() => setIsVisible(!isVisible)}
                className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white font-bold text-lg hover:scale-110"
            >
                💰
            </button>

            {isVisible && (
                <div className="absolute bottom-16 right-0 bg-gray-900 rounded-xl p-4 border border-gray-700 shadow-2xl min-w-64">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white font-semibold">Test Coins</h3>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="text-gray-400 hover:text-white"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="space-y-3">
                        <div className="bg-gray-800 rounded-lg p-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Real Balance:</span>
                                <span className="text-white font-mono">{balance.toFixed(4)} SOL</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Test Coins:</span>
                                <span className="text-green-400 font-mono">{testCoins.toFixed(4)} SOL</span>
                            </div>
                            <div className="flex justify-between text-sm font-semibold border-t border-gray-700 pt-2">
                                <span className="text-white">Total:</span>
                                <span className="text-white font-mono">{(balance + testCoins).toFixed(4)} SOL</span>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={addTestCoins}
                                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-300"
                            >
                                +0.1 SOL
                            </button>
                            <button
                                onClick={resetTestCoins}
                                className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-300"
                            >
                                Reset
                            </button>
                        </div>

                        <div className="text-xs text-gray-400 text-center">
                            Test coins are for demonstration only
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


