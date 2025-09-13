"use client";
import { useState, useEffect } from "react";

export default function InteractiveButtons() {
    const [clickCount, setClickCount] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [ripples, setRipples] = useState<Array<{ id: number, x: number, y: number }>>([]);

    const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newRipple = {
            id: Date.now(),
            x,
            y
        };

        setRipples(prev => [...prev, newRipple]);

        // Удаляем ripple через 600ms
        setTimeout(() => {
            setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
        }, 600);
    };

    const handleButtonClick = (action: string) => {
        setClickCount(prev => prev + 1);
        setIsAnimating(true);

        // Сброс анимации через 300ms
        setTimeout(() => setIsAnimating(false), 300);

        // Показываем уведомление
        console.log(`Action: ${action}`);
    };

    return (
        <div className="space-y-6">
            {/* Интерактивные кнопки */}
            <div className="card">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg">⚡</span>
                    </div>
                    <div>
                        <div className="text-lg font-bold gradient-text">Interactive Actions</div>
                        <div className="text-sm text-gray-400">Click to see magic happen!</div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Кнопка депозита */}
                    <button
                        onClick={(e) => {
                            createRipple(e);
                            handleButtonClick('deposit');
                        }}
                        className="relative overflow-hidden group bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                        {ripples.map(ripple => (
                            <div
                                key={ripple.id}
                                className="absolute w-4 h-4 bg-white/30 rounded-full animate-ping"
                                style={{
                                    left: ripple.x - 8,
                                    top: ripple.y - 8,
                                }}
                            />
                        ))}
                        <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">💰</div>
                        <div className="text-sm font-semibold">Deposit</div>
                        <div className="text-xs opacity-80">Add funds</div>
                    </button>

                    {/* Кнопка вывода */}
                    <button
                        onClick={(e) => {
                            createRipple(e);
                            handleButtonClick('withdraw');
                        }}
                        className="relative overflow-hidden group bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                        {ripples.map(ripple => (
                            <div
                                key={ripple.id}
                                className="absolute w-4 h-4 bg-white/30 rounded-full animate-ping"
                                style={{
                                    left: ripple.x - 8,
                                    top: ripple.y - 8,
                                }}
                            />
                        ))}
                        <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">💸</div>
                        <div className="text-sm font-semibold">Withdraw</div>
                        <div className="text-xs opacity-80">Take funds</div>
                    </button>

                    {/* Кнопка награды */}
                    <button
                        onClick={(e) => {
                            createRipple(e);
                            handleButtonClick('reward');
                        }}
                        className="relative overflow-hidden group bg-gradient-to-br from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                        {ripples.map(ripple => (
                            <div
                                key={ripple.id}
                                className="absolute w-4 h-4 bg-white/30 rounded-full animate-ping"
                                style={{
                                    left: ripple.x - 8,
                                    top: ripple.y - 8,
                                }}
                            />
                        ))}
                        <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">🎁</div>
                        <div className="text-sm font-semibold">Claim</div>
                        <div className="text-xs opacity-80">Get rewards</div>
                    </button>

                    {/* Кнопка NFT */}
                    <button
                        onClick={(e) => {
                            createRipple(e);
                            handleButtonClick('nft');
                        }}
                        className="relative overflow-hidden group bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                        {ripples.map(ripple => (
                            <div
                                key={ripple.id}
                                className="absolute w-4 h-4 bg-white/30 rounded-full animate-ping"
                                style={{
                                    left: ripple.x - 8,
                                    top: ripple.y - 8,
                                }}
                            />
                        ))}
                        <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">🎨</div>
                        <div className="text-sm font-semibold">Mint NFT</div>
                        <div className="text-xs opacity-80">Create art</div>
                    </button>
                </div>

                {/* Счетчик кликов */}
                <div className="mt-6 text-center">
                    <div className="text-sm text-gray-400 mb-2">Total Interactions</div>
                    <div className={`text-3xl font-bold gradient-text transition-all duration-300 ${isAnimating ? 'scale-110' : 'scale-100'
                        }`}>
                        {clickCount}
                    </div>
                </div>
            </div>

            {/* Специальные эффекты */}
            <div className="card">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg">✨</span>
                    </div>
                    <div>
                        <div className="text-lg font-bold gradient-text">Special Effects</div>
                        <div className="text-sm text-gray-400">Interactive visual elements</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Кнопка с частицами */}
                    <button
                        onClick={() => handleButtonClick('particles')}
                        className="relative overflow-hidden group bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white p-6 rounded-xl transition-all duration-300 hover:scale-105"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <div className="relative z-10">
                            <div className="text-2xl mb-2">🌟</div>
                            <div className="font-semibold">Particle Effect</div>
                            <div className="text-sm opacity-80">Click for magic</div>
                        </div>
                    </button>

                    {/* Кнопка с волнами */}
                    <button
                        onClick={() => handleButtonClick('waves')}
                        className="relative overflow-hidden group bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white p-6 rounded-xl transition-all duration-300 hover:scale-105"
                    >
                        <div className="absolute inset-0">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
                        </div>
                        <div className="relative z-10">
                            <div className="text-2xl mb-2">🌊</div>
                            <div className="font-semibold">Wave Effect</div>
                            <div className="text-sm opacity-80">Click for waves</div>
                        </div>
                    </button>

                    {/* Кнопка с пульсацией */}
                    <button
                        onClick={() => handleButtonClick('pulse')}
                        className="relative overflow-hidden group bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white p-6 rounded-xl transition-all duration-300 hover:scale-105"
                    >
                        <div className="absolute inset-0 bg-white/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                        <div className="relative z-10">
                            <div className="text-2xl mb-2 animate-pulse">💓</div>
                            <div className="font-semibold">Pulse Effect</div>
                            <div className="text-sm opacity-80">Click for pulse</div>
                        </div>
                    </button>

                    {/* Кнопка с вращением */}
                    <button
                        onClick={() => handleButtonClick('rotate')}
                        className="relative overflow-hidden group bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white p-6 rounded-xl transition-all duration-300 hover:scale-105"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-45 scale-0 group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="relative z-10">
                            <div className="text-2xl mb-2 group-hover:rotate-180 transition-transform duration-500">🌀</div>
                            <div className="font-semibold">Rotate Effect</div>
                            <div className="text-sm opacity-80">Click to spin</div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Прогресс-бар */}
            <div className="card">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg">📊</span>
                    </div>
                    <div>
                        <div className="text-lg font-bold gradient-text">Progress Tracker</div>
                        <div className="text-sm text-gray-400">Track your interactions</div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span>Interaction Level</span>
                            <span>{Math.min(Math.floor(clickCount / 10), 10)}/10</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3">
                            <div
                                className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min((clickCount / 10) * 10, 100)}%` }}
                            ></div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span>Engagement Score</span>
                            <span>{clickCount * 5} points</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3">
                            <div
                                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min((clickCount * 5) / 100, 100)}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


