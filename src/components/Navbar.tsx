"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import WalletBalance from "./WalletBalance";

// динамический импорт кнопки, чтобы Next не пытался её SSR'ить
const WalletMultiButton = dynamic(
    async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
);

export default function Navbar() {
    const [mounted, setMounted] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`w-full sticky top-0 z-50 transition-all duration-300 ${isScrolled
            ? 'glass border-b border-white/10'
            : 'bg-transparent'
            }`}>
            <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                    </div>
                    <div className="text-2xl font-bold gradient-text group-hover:scale-105 transition-transform duration-300">
                        Aqyldy Vaults
                    </div>
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 relative group">
                        Vaults
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                    <Link href="/dashboard" className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 relative group">
                        Dashboard
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                    <Link href="/about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 relative group">
                        About
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    {/* Отображение баланса кошелька */}
                    <WalletBalance />

                    {/* Кнопку кошелька рендерим только на клиенте */}
                    {mounted ? (
                        <div className="wallet-adapter-button-trigger">
                            <WalletMultiButton className="!bg-gradient-to-r !from-purple-600 !to-blue-600 !border-0 !rounded-xl !px-6 !py-2 !font-semibold !text-white hover:!scale-105 !transition-all !duration-300" />
                        </div>
                    ) : (
                        <div className="w-32 h-10 bg-gray-700 rounded-xl animate-pulse"></div>
                    )}

                    {/* Mobile menu button */}
                    <button className="md:hidden p-2 text-gray-300 hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}
