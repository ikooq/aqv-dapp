"use client";
import { useState, useEffect } from "react";

export default function LiveAnimations() {
    const [time, setTime] = useState(new Date());
    const [pulse, setPulse] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
            setPulse(prev => (prev + 1) % 100);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed top-24 left-4 z-40 space-y-4">
            {/* Живые часы */}
            <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30">
                <div className="text-xs text-gray-400 mb-1">Live Time</div>
                <div className="text-lg font-mono text-white">
                    {time.toLocaleTimeString()}
                </div>
                <div className="text-xs text-purple-400">
                    {time.toLocaleDateString()}
                </div>
            </div>

            {/* Пульсирующий индикатор */}
            <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-green-500/30">
                <div className="text-xs text-gray-400 mb-2">Network Status</div>
                <div className="flex items-center gap-2">
                    <div
                        className="w-3 h-3 bg-green-400 rounded-full animate-pulse"
                        style={{
                            boxShadow: `0 0 ${pulse}px rgba(34, 197, 94, 0.5)`
                        }}
                    ></div>
                    <span className="text-sm text-green-400">Connected</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                    {pulse}ms latency
                </div>
            </div>

            {/* Анимированные цифры */}
            <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30">
                <div className="text-xs text-gray-400 mb-2">Live Stats</div>
                <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Users Online</span>
                        <span className="text-blue-400 font-mono">
                            {Math.floor(Math.random() * 1000) + 1000}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Transactions</span>
                        <span className="text-green-400 font-mono">
                            {Math.floor(Math.random() * 10000) + 50000}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-300">TVL</span>
                        <span className="text-purple-400 font-mono">
                            ${(Math.random() * 100 + 50).toFixed(1)}M
                        </span>
                    </div>
                </div>
            </div>

            {/* Магический прогресс-бар */}
            <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-pink-500/30">
                <div className="text-xs text-gray-400 mb-2">Magic Loading</div>
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                        className="h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full transition-all duration-1000"
                        style={{ width: `${pulse}%` }}
                    ></div>
                </div>
                <div className="text-xs text-pink-400 mt-1">
                    {pulse}% Complete
                </div>
            </div>
        </div>
    );
}
