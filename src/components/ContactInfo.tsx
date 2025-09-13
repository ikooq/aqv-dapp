"use client";
import { useState } from "react";

export default function ContactInfo() {
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setEmail("");
            setTimeout(() => setIsSubscribed(false), 3000);
        }
    };

    return (
        <div className="space-y-6">
            {/* Контактная информация */}
            <div className="card">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-lg font-bold gradient-text">Get in Touch</div>
                        <div className="text-sm text-gray-400">Connect with our community</div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Discord */}
                    <a
                        href="https://discord.gg/fnMxg9cs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all duration-300 hover:scale-105"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-semibold text-white">Discord Community</div>
                                <div className="text-sm text-gray-400">Join 1,247+ members</div>
                            </div>
                        </div>
                        <div className="text-sm text-gray-300">
                            Get real-time support, share strategies, and connect with other DeFi enthusiasts.
                        </div>
                    </a>

                    {/* Twitter */}
                    <a
                        href="https://x.com/solana"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all duration-300 hover:scale-105"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-semibold text-white">Twitter/X</div>
                                <div className="text-sm text-gray-400">Follow for updates</div>
                            </div>
                        </div>
                        <div className="text-sm text-gray-300">
                            Stay updated with the latest news, announcements, and DeFi insights.
                        </div>
                    </a>

                    {/* Email */}
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-semibold text-white">Email Newsletter</div>
                                <div className="text-sm text-gray-400">Weekly updates</div>
                            </div>
                        </div>
                        <form onSubmit={handleSubscribe} className="space-y-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="input text-sm"
                                required
                            />
                            <button
                                type="submit"
                                className="btn-primary w-full text-sm"
                                disabled={isSubscribed}
                            >
                                {isSubscribed ? "✓ Subscribed!" : "Subscribe"}
                            </button>
                        </form>
                    </div>

                    {/* Telegram */}
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-semibold text-white">Telegram</div>
                                <div className="text-sm text-gray-400">Coming soon</div>
                            </div>
                        </div>
                        <div className="text-sm text-gray-300">
                            Join our Telegram channel for instant notifications and updates.
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ */}
            <div className="card">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-lg font-bold gradient-text">Frequently Asked Questions</div>
                        <div className="text-sm text-gray-400">Quick answers to common questions</div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                        <div className="font-semibold text-white mb-2">How do I start earning with Aqyldy Vaults?</div>
                        <div className="text-sm text-gray-300">
                            Simply connect your wallet, choose a vault strategy, and deposit your tokens. Our AI will automatically optimize your yields.
                        </div>
                    </div>

                    <div className="p-4 bg-gray-800/50 rounded-lg">
                        <div className="font-semibold text-white mb-2">What makes Aqyldy different from other DeFi platforms?</div>
                        <div className="text-sm text-gray-300">
                            We combine AI-powered risk analysis, social features, NFT gamification, and community insurance for a unique DeFi experience.
                        </div>
                    </div>

                    <div className="p-4 bg-gray-800/50 rounded-lg">
                        <div className="font-semibold text-white mb-2">How secure are the vaults?</div>
                        <div className="text-sm text-gray-300">
                            All vaults are audited, insured by our community pool, and protected by multi-layer security protocols.
                        </div>
                    </div>

                    <div className="p-4 bg-gray-800/50 rounded-lg">
                        <div className="font-semibold text-white mb-2">Can I earn NFTs while using the platform?</div>
                        <div className="text-sm text-gray-300">
                            Yes! Complete tasks, refer friends, and participate in governance to earn exclusive NFTs with APY bonuses.
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="card bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
                <div className="text-center">
                    <h3 className="text-2xl font-bold gradient-text mb-4">Ready to Maximize Your DeFi Yields?</h3>
                    <p className="text-gray-300 mb-6">
                        Join thousands of users already earning with AI-powered yield optimization
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="btn-primary text-lg px-8 py-3">
                            Start Earning Now
                        </button>
                        <button className="btn-secondary text-lg px-8 py-3">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


