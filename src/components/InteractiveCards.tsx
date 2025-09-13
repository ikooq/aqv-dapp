"use client";
import { useState } from "react";

interface InteractiveCardProps {
    title: string;
    description: string;
    apy: number;
    tvl: number;
    risk: 'low' | 'medium' | 'high';
    icon: string;
    gradient: string;
    onClick: () => void;
}

export default function InteractiveCard({
    title,
    description,
    apy,
    tvl,
    risk,
    icon,
    gradient,
    onClick
}: InteractiveCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [ripples, setRipples] = useState<Array<{ id: number, x: number, y: number }>>([]);

    const createRipple = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newRipple = {
            id: Date.now(),
            x,
            y
        };

        setRipples(prev => [...prev, newRipple]);

        setTimeout(() => {
            setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
        }, 600);
    };

    const getRiskColor = (risk: string) => {
        switch (risk) {
            case 'low': return 'text-green-400 bg-green-500/10 border-green-500/20';
            case 'medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
            case 'high': return 'text-red-400 bg-red-500/10 border-red-500/20';
            default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
        }
    };

    return (
        <div
            className={`relative overflow-hidden rounded-2xl p-6 border transition-all duration-500 cursor-pointer group ${gradient} ${isHovered ? 'scale-105 shadow-2xl shadow-purple-500/30 animate-magicGlow' : 'hover:scale-102'
                }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={(e) => {
                createRipple(e);
                onClick();
            }}
        >
            {/* Ripple эффекты */}
            {ripples.map(ripple => (
                <div
                    key={ripple.id}
                    className="absolute w-4 h-4 bg-white/30 rounded-full animate-ping pointer-events-none"
                    style={{
                        left: ripple.x - 8,
                        top: ripple.y - 8,
                    }}
                />
            ))}

            {/* Магический фон */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Содержимое */}
            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className={`text-3xl transition-transform duration-300 ${isHovered ? 'scale-110 rotate-12' : ''}`}>
                            {icon}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                                {title}
                            </h3>
                            <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                                {description}
                            </p>
                        </div>
                    </div>

                    {/* Risk badge */}
                    <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor(risk)}`}>
                        {risk.toUpperCase()}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-400 group-hover:text-green-300 transition-colors duration-300">
                            {apy}%
                        </div>
                        <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                            APY
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                            ${(tvl / 1000000).toFixed(1)}M
                        </div>
                        <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                            TVL
                        </div>
                    </div>
                </div>

                {/* Анимированная кнопка */}
                <button className="w-full relative overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl py-3 px-4 text-white font-medium transition-all duration-300 group-hover:bg-white/20 group-hover:border-white/40 group-hover:shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-purple-500/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        <span>Invest Now</span>
                        <span className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}>
                            →
                        </span>
                    </span>
                </button>
            </div>

            {/* Магические частицы */}
            {isHovered && (
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
                    <div className="absolute bottom-4 left-4 w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-6 left-6 w-1 h-1 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
                    <div className="absolute bottom-6 right-6 w-1 h-1 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute top-8 right-8 w-1 h-1 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '2.5s' }}></div>
                    <div className="absolute bottom-8 left-8 w-1 h-1 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
                </div>
            )}

            {/* Shimmer effect */}
            {isHovered && (
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
            )}
        </div>
    );
}
