export default function AboutPage() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
                    About Aqyldy Vaults
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    The next-generation DeFi yield optimization platform built on Solana,
                    combining AI-powered risk analysis, social features, and gamification
                    to maximize your returns while minimizing risk.
                </p>
            </div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-12 mb-16">
                <div className="card">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold gradient-text mb-4">Our Mission</h2>
                    <p className="text-gray-300">
                        To democratize access to sophisticated DeFi strategies by making yield optimization
                        accessible, transparent, and profitable for everyone. We believe that advanced
                        financial tools should be available to all, not just institutional investors.
                    </p>
                </div>

                <div className="card">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold gradient-text mb-4">Our Vision</h2>
                    <p className="text-gray-300">
                        To become the leading DeFi platform that bridges traditional finance with
                        decentralized protocols, creating a sustainable ecosystem where users can
                        maximize returns while maintaining security and transparency.
                    </p>
                </div>
            </div>

            {/* Key Features */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold gradient-text text-center mb-12">Key Features</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="card text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3">AI-Powered Risk Analysis</h3>
                        <p className="text-gray-400">
                            Advanced machine learning algorithms analyze market conditions, smart contract risks,
                            and liquidity factors to provide real-time risk assessments and recommendations.
                        </p>
                    </div>

                    <div className="card text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Social Features</h3>
                        <p className="text-gray-400">
                            Community-driven platform with user ratings, reviews, and social proof to help
                            users make informed decisions about vault strategies.
                        </p>
                    </div>

                    <div className="card text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3">NFT Integration</h3>
                        <p className="text-gray-400">
                            Gamified experience with NFT rewards, achievements, and level system that
                            provides additional yield bonuses and unlocks exclusive features.
                        </p>
                    </div>

                    <div className="card text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Insurance Pool</h3>
                        <p className="text-gray-400">
                            Community-funded insurance mechanism that provides protection against
                            smart contract risks and unexpected market events.
                        </p>
                    </div>

                    <div className="card text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Governance Mining</h3>
                        <p className="text-gray-400">
                            Earn governance tokens by participating in protocol decisions, creating
                            a decentralized and community-driven platform evolution.
                        </p>
                    </div>

                    <div className="card text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
                        <p className="text-gray-400">
                            Built on Solana blockchain for sub-second transaction finality and
                            minimal fees, ensuring optimal user experience and cost efficiency.
                        </p>
                    </div>
                </div>
            </div>

            {/* Technology Stack */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold gradient-text text-center mb-12">Technology Stack</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="card text-center">
                        <div className="text-4xl mb-3">⚡</div>
                        <h3 className="font-bold mb-2">Solana</h3>
                        <p className="text-sm text-gray-400">High-performance blockchain</p>
                    </div>
                    <div className="card text-center">
                        <div className="text-4xl mb-3">🔗</div>
                        <h3 className="font-bold mb-2">Anchor</h3>
                        <p className="text-sm text-gray-400">Rust-based smart contracts</p>
                    </div>
                    <div className="card text-center">
                        <div className="text-4xl mb-3">🤖</div>
                        <h3 className="font-bold mb-2">AI/ML</h3>
                        <p className="text-sm text-gray-400">Machine learning algorithms</p>
                    </div>
                    <div className="card text-center">
                        <div className="text-4xl mb-3">🌐</div>
                        <h3 className="font-bold mb-2">Next.js</h3>
                        <p className="text-sm text-gray-400">Modern web framework</p>
                    </div>
                </div>
            </div>

            {/* Architecture Diagram */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold gradient-text text-center mb-12">Architecture</h2>
                <div className="card">
                    <pre className="text-sm text-gray-300 overflow-x-auto">{`User (Phantom Wallet)
   │
   ├── Frontend (Next.js, Wallet Adapter)
   │     ├─ Solana RPC via web3.js:
   │     │   • getLatestBlockhash / sendTransaction
   │     │   • getSignaturesForAddress (history)
   │     │   • logsSubscribe (live logs)
   │     │   • getProgramAccounts (indexing)
   │     ├─ Jupiter (quote/swap build)
   │     ├─ Pyth (prices/volatility)
   │     ├─ AI Risk Analysis Engine
   │     ├─ Social Features & Ratings
   │     └─ NFT Integration & Gamification
   │
   └── Smart Contracts (Anchor/Rust):
         • Vault Management (deposits/withdrawals)
         • Yield Optimization Strategies
         • Governance Token Distribution
         • Insurance Pool Management
         • NFT Minting & Rewards System`}</pre>
                </div>
            </div>

            {/* Call to Action */}
            <div className="card text-center bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
                <h2 className="text-3xl font-bold gradient-text mb-4">Ready to Start Earning?</h2>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                    Join thousands of users who are already maximizing their DeFi yields with
                    Aqyldy Vaults. Start with as little as $10 and watch your portfolio grow.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/" className="btn-primary">
                        Explore Vaults
                    </a>
                    <a href="/dashboard" className="btn-secondary">
                        View Dashboard
                    </a>
                </div>
            </div>
        </div>
    );
}
