"use client";
import { useState, useEffect } from "react";

export default function WowEffects() {
    const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number, vx: number, vy: number, life: number }>>([]);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });

            // Создаем частицы при движении мыши
            if (Math.random() > 0.7) {
                const newParticle = {
                    id: Date.now() + Math.random(),
                    x: e.clientX,
                    y: e.clientY,
                    vx: (Math.random() - 0.5) * 4,
                    vy: (Math.random() - 0.5) * 4,
                    life: 1
                };
                setParticles(prev => [...prev, newParticle]);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const animateParticles = () => {
            setParticles(prev => prev
                .map(p => ({
                    ...p,
                    x: p.x + p.vx,
                    y: p.y + p.vy,
                    life: p.life - 0.02
                }))
                .filter(p => p.life > 0)
            );
        };

        const interval = setInterval(animateParticles, 16);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* Магические частицы за курсором */}
            <div className="fixed inset-0 pointer-events-none z-10">
                {particles.map(particle => (
                    <div
                        key={particle.id}
                        className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60"
                        style={{
                            left: particle.x - 4,
                            top: particle.y - 4,
                            transform: `scale(${particle.life})`,
                            transition: 'transform 0.1s ease-out'
                        }}
                    />
                ))}
            </div>

            {/* Плавающие элементы */}
            <div className="fixed top-1/4 left-6 z-40">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-xl animate-float"></div>
            </div>

            <div className="fixed top-3/4 right-8 z-40">
                <div className="w-32 h-32 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
            </div>
        </>
    );
}