"use client";
import { useState, useEffect } from "react";

interface CommunityStats {
    totalUsers: number;
    totalTVL: number;
    totalRewards: number;
    activeVaults: number;
    nftHolders: number;
    governanceVotes: number;
}

export default function CommunityStats() {
    const [stats, setStats] = useState<CommunityStats>({
        totalUsers: 0,
        totalTVL: 0,
        totalRewards: 0,
        activeVaults: 0,
        nftHolders: 0,
        governanceVotes: 0
    });

    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        // Simulate loading real-time stats
        const targetStats: CommunityStats = {
            totalUsers: 1247,
            totalTVL: 2345678,
            totalRewards: 456789,
            activeVaults: 12,
            nftHolders: 234,
            governanceVotes: 89
        };

        setIsAnimating(true);

        // Animate numbers
        const animateValue = (start: number, end: number, duration: number, callback: (value: number) => void) => {
            const startTime = Date.now();
            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const current = start + (end - start) * progress;
                callback(Math.floor(current));

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            animate();
        };

        // Animate each stat
        Object.keys(targetStats).forEach((key, index) => {
            setTimeout(() => {
                animateValue(0, targetStats[key as keyof CommunityStats], 2000, (value) => {
                    setStats(prev => ({ ...prev, [key]: value }));
                });
            }, index * 200);
        });

        setTimeout(() => setIsAnimating(false), 3000);
    }, []);

    const formatNumber = (num: number, type: 'users' | 'currency' | 'percentage' | 'count') => {
        if (type === 'currency') {
            return `$${num.toLocaleString()}`;
        }
        if (type === 'percentage') {
            return `${num}%`;
        }
        return num.toLocaleString();
    };

    return (
        <div className="card">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>
                <div>
                    <div className="text-lg font-bold gradient-text">Community Stats</div>
                    <div className="text-sm text-gray-400">Live metrics from our growing community</div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                    <div className={`text-3xl font-bold gradient-text mb-2 ${isAnimating ? 'animate-pulse' : ''}`}>
                        {formatNumber(stats.totalUsers, 'users')}
                    </div>
                    <div className="text-sm text-gray-400">Active Users</div>
                    <div className="text-xs text-green-400 mt-1">+23 this week</div>
                </div>

                <div className="text-center p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                    <div className={`text-3xl font-bold gradient-text mb-2 ${isAnimating ? 'animate-pulse' : ''}`}>
                        {formatNumber(stats.totalTVL, 'currency')}
                    </div>
                    <div className="text-sm text-gray-400">Total Value Locked</div>
                    <div className="text-xs text-green-400 mt-1">+12.4% this month</div>
                </div>

                <div className="text-center p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                    <div className={`text-3xl font-bold gradient-text mb-2 ${isAnimating ? 'animate-pulse' : ''}`}>
                        {formatNumber(stats.totalRewards, 'currency')}
                    </div>
                    <div className="text-sm text-gray-400">Rewards Distributed</div>
                    <div className="text-xs text-green-400 mt-1">+$45K this week</div>
                </div>

                <div className="text-center p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                    <div className={`text-3xl font-bold gradient-text mb-2 ${isAnimating ? 'animate-pulse' : ''}`}>
                        {formatNumber(stats.activeVaults, 'count')}
                    </div>
                    <div className="text-sm text-gray-400">Active Vaults</div>
                    <div className="text-xs text-blue-400 mt-1">3 new this month</div>
                </div>

                <div className="text-center p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                    <div className={`text-3xl font-bold gradient-text mb-2 ${isAnimating ? 'animate-pulse' : ''}`}>
                        {formatNumber(stats.nftHolders, 'count')}
                    </div>
                    <div className="text-sm text-gray-400">NFT Holders</div>
                    <div className="text-xs text-purple-400 mt-1">+15 this week</div>
                </div>

                <div className="text-center p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                    <div className={`text-3xl font-bold gradient-text mb-2 ${isAnimating ? 'animate-pulse' : ''}`}>
                        {formatNumber(stats.governanceVotes, 'count')}
                    </div>
                    <div className="text-sm text-gray-400">Governance Votes</div>
                    <div className="text-xs text-yellow-400 mt-1">5 active proposals</div>
                </div>
            </div>

            {/* Live Activity Feed */}
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg">
                <div className="text-sm font-semibold gradient-text mb-3">Live Activity</div>
                <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-300">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span>New user joined: 7xKX...9mN2</span>
                        <span className="text-gray-500 text-xs">2m ago</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <span>Large deposit: $50,000 USDC</span>
                        <span className="text-gray-500 text-xs">5m ago</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                        <span>NFT minted: Yield Master Badge</span>
                        <span className="text-gray-500 text-xs">8m ago</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                        <span>Governance vote: Proposal #23</span>
                        <span className="text-gray-500 text-xs">12m ago</span>
                    </div>
                </div>
            </div>

            {/* Join CTA */}
            <div className="mt-6 text-center">
                <div className="text-lg font-bold gradient-text mb-2">Join the Community</div>
                <p className="text-gray-400 mb-4">Be part of the next-generation DeFi revolution</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button className="btn-primary">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                        </svg>
                        Join Discord
                    </button>
                    <button className="btn-secondary">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                        Follow Twitter
                    </button>
                </div>
            </div>
        </div>
    );
}

