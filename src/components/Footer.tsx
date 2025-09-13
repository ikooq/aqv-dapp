"use client";
import { useState, useEffect } from "react";

export default function Footer() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        const footer = document.getElementById('footer');
        if (footer) observer.observe(footer);

        return () => {
            clearInterval(timer);
            if (footer) observer.unobserve(footer);
        };
    }, []);

    return (
        <footer id="footer" className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 border-t border-gray-800 overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
                {/* Main content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">💰</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    Aqyldy
                                </h3>
                                <p className="text-gray-400 text-sm">DeFi Impact Platform</p>
                            </div>
                        </div>
                        <p className="text-gray-300 mb-6 max-w-md">
                            Революционная платформа для социальных инвестиций на блокчейне Solana.
                            Зарабатывайте доходы, создавая позитивное воздействие на мир.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://discord.gg/fnMxg9cs" target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                                <span className="text-white">💬</span>
                            </a>
                            <a href="https://x.com/solana" target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                                <span className="text-white">🐦</span>
                            </a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                                <span className="text-white">🐙</span>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Быстрые ссылки</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Vaults</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Impact Fund</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Portfolio</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Dashboard</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">About</a></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Ресурсы</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Documentation</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">API</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Whitepaper</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Audit Report</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Support</a></li>
                        </ul>
                    </div>
                </div>

                {/* Live Stats */}
                <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-6 mb-8 border border-gray-700">
                    <h4 className="text-lg font-semibold text-white mb-4 text-center">Live Statistics</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-400 mb-1">$97.2M</div>
                            <div className="text-gray-400 text-sm">Total Value Locked</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-pink-400 mb-1">1,906</div>
                            <div className="text-gray-400 text-sm">Active Users</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-400 mb-1">57,353</div>
                            <div className="text-gray-400 text-sm">Transactions</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-400 mb-1">99.9%</div>
                            <div className="text-gray-400 text-sm">Uptime</div>
                        </div>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-8 mb-8 border border-purple-500/20">
                    <div className="text-center">
                        <h4 className="text-2xl font-bold text-white mb-2">Stay Updated</h4>
                        <p className="text-gray-300 mb-6">Получайте последние новости о новых проектах и возможностях</p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                            />
                            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-gray-400 text-sm">Live on Solana</span>
                        </div>
                        <div className="text-gray-400 text-sm">
                            {currentTime.toLocaleTimeString()}
                        </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-400">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center pt-6 text-gray-500 text-sm">
                    <p>&copy; 2024 Aqyldy. All rights reserved. Built with ❤️ on Solana.</p>
                </div>
            </div>

            {/* Floating elements */}
            {isVisible && (
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-10 right-10 w-4 h-4 bg-purple-400 rounded-full animate-ping"></div>
                    <div className="absolute bottom-20 left-10 w-3 h-3 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
                </div>
            )}
        </footer>
    );
}


