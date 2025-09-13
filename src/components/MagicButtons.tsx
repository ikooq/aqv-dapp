"use client";
import { useState } from "react";

interface MagicButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'magic';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
}

export default function MagicButton({
    children,
    onClick,
    variant = 'primary',
    size = 'md',
    disabled = false
}: MagicButtonProps) {
    const [isPressed, setIsPressed] = useState(false);
    const [ripples, setRipples] = useState<Array<{ id: number, x: number, y: number }>>([]);

    const createRipple = (e: React.MouseEvent) => {
        if (disabled) return;

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

    const getVariantStyles = () => {
        switch (variant) {
            case 'primary':
                return 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-purple-500/50';
            case 'secondary':
                return 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 hover:border-gray-500';
            case 'magic':
                return 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-pink-500/50';
            default:
                return 'bg-gray-600 hover:bg-gray-700 text-white';
        }
    };

    const getSizeStyles = () => {
        switch (size) {
            case 'sm':
                return 'px-4 py-2 text-sm';
            case 'md':
                return 'px-6 py-3 text-base';
            case 'lg':
                return 'px-8 py-4 text-lg';
            default:
                return 'px-6 py-3 text-base';
        }
    };

    return (
        <button
            className={`
        relative overflow-hidden rounded-xl font-medium transition-all duration-300
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${isPressed ? 'scale-95' : 'hover:scale-105'}
        group
      `}
            onClick={(e) => {
                createRipple(e);
                if (!disabled) {
                    onClick();
                }
            }}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
            disabled={disabled}
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
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            {/* Содержимое */}
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
                {variant === 'magic' && (
                    <span className="text-lg group-hover:rotate-180 transition-transform duration-500">
                        ✨
                    </span>
                )}
            </span>

            {/* Магические частицы */}
            {variant === 'magic' && (
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-2 right-2 w-1 h-1 bg-white/60 rounded-full animate-ping"></div>
                    <div className="absolute bottom-2 left-2 w-1 h-1 bg-white/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute top-1/2 left-1/4 w-0.5 h-0.5 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 right-1/4 w-0.5 h-0.5 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
                </div>
            )}
        </button>
    );
}
