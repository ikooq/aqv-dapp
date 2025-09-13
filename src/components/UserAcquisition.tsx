"use client";
import { useState, useEffect } from "react";

interface ReferralStats {
    totalReferrals: number;
    totalRewards: number;
    level: number;
    nextLevelReward: number;
}

interface LeaderboardUser {
    rank: number;
    address: string;
    referrals: number;
    rewards: number;
    level: number;
}

export default function UserAcquisition() {
    const [stats, setStats] = useState<ReferralStats>({
        totalReferrals: 0,
        totalRewards: 0,
        level: 1,
        nextLevelReward: 100
    });

    const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
    const [referralCode, setReferralCode] = useState<string>("");
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        // Simulate loading user stats
        setStats({
            totalReferrals: 23,
            totalRewards: 450,
            level: 3,
            nextLevelReward: 200
        });

        // Simulate leaderboard data
        setLeaderboard([
            { rank: 1, address: "7xKX...9mN2", referrals: 156, rewards: 2340, level: 5 },
            { rank: 2, address: "3pL8...4kR7", referrals: 134, rewards: 2010, level: 5 },
            { rank: 3, address: "9mN2...7xKX", referrals: 98, rewards: 1470, level: 4 },
            { rank: 4, address: "4kR7...3pL8", referrals: 87, rewards: 1305, level: 4 },
            { rank: 5, address: "2kL9...8mP3", referrals: 76, rewards: 1140, level: 4 }
        ]);

        // Generate referral code
        setReferralCode(`AQV-${Math.random().toString(36).substr(2, 8).toUpperCase()}`);
    }, []);

    const copyReferralCode = () => {
        navigator.clipboard.writeText(`https://aqyldy.com?ref=${referralCode}`);
        // Show success message
    };

    const shareOnTwitter = () => {
        const text = `🚀 Just discovered @AqyldyVaults - the most advanced DeFi yield optimization platform on Solana! 
    
✨ AI-powered risk analysis
🎮 NFT rewards & gamification  
💰 Up to 25% APY with auto-compounding
🛡️ Community insurance pool

Join me: https://aqyldy.com?ref=${referralCode}`;

        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
    };

    const shareOnDiscord = () => {
        const text = `🚀 **Aqyldy Vaults** - Next-gen DeFi on Solana! 
    
✨ AI risk analysis & social features
🎮 NFT rewards & level system
💰 Up to 25% APY with auto-compounding
🛡️ Community insurance protection

Join: https://aqyldy.com?ref=${referralCode}`;

        navigator.clipboard.writeText(text);
        // Show success message
    };

    return (
        <div className="space-y-6">
            {/* Referral Program */}
            <div className="card">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-lg font-bold gradient-text">Referral Program</div>
                        <div className="text-sm text-gray-400">Earn rewards for bringing friends</div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                        <div className="text-2xl font-bold gradient-text mb-1">{stats.totalReferrals}</div>
                        <div className="text-sm text-gray-400">Total Referrals</div>
                    </div>
                    <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                        <div className="text-2xl font-bold gradient-text mb-1">${stats.totalRewards}</div>
                        <div className="text-sm text-gray-400">Earned Rewards</div>
                    </div>
                    <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                        <div className="text-2xl font-bold gradient-text mb-1">Level {stats.level}</div>
                        <div className="text-sm text-gray-400">Referral Level</div>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Your Referral Link</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={`https://aqyldy.com?ref=${referralCode}`}
                            readOnly
                            className="input flex-1"
                        />
                        <button onClick={copyReferralCode} className="btn-secondary">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button onClick={shareOnTwitter} className="btn-primary">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                        Share on Twitter
                    </button>
                    <button onClick={shareOnDiscord} className="btn-secondary">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                        </svg>
                        Share on Discord
                    </button>
                </div>
            </div>

            {/* Rewards System */}
            <div className="card">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-lg font-bold gradient-text">Reward System</div>
                        <div className="text-sm text-gray-400">Earn more as you grow</div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                        <div>
                            <div className="font-semibold">Referral Bonus</div>
                            <div className="text-sm text-gray-400">$10 per successful referral</div>
                        </div>
                        <div className="text-green-400 font-bold">+$10</div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                        <div>
                            <div className="font-semibold">Level Bonus</div>
                            <div className="text-sm text-gray-400">Extra 0.5% APY per level</div>
                        </div>
                        <div className="text-green-400 font-bold">+{stats.level * 0.5}%</div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                        <div>
                            <div className="font-semibold">NFT Rewards</div>
                            <div className="text-sm text-gray-400">Exclusive NFTs for top referrers</div>
                        </div>
                        <div className="text-purple-400 font-bold">Rare NFT</div>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg">
                    <div className="text-sm font-semibold text-yellow-400 mb-2">Next Level Reward</div>
                    <div className="text-lg font-bold gradient-text">${stats.nextLevelReward} USDC</div>
                    <div className="text-sm text-gray-400">Earn when you reach level {stats.level + 1}</div>
                </div>
            </div>

            {/* Leaderboard */}
            <div className="card">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-lg font-bold gradient-text">Top Referrers</div>
                        <div className="text-sm text-gray-400">Community leaderboard</div>
                    </div>
                </div>

                <div className="space-y-3">
                    {leaderboard.map((user, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${index === 0 ? 'bg-yellow-500 text-black' :
                                        index === 1 ? 'bg-gray-400 text-black' :
                                            index === 2 ? 'bg-orange-500 text-black' :
                                                'bg-gray-600 text-white'
                                    }`}>
                                    {user.rank}
                                </div>
                                <div>
                                    <div className="font-semibold">{user.address}</div>
                                    <div className="text-sm text-gray-400">Level {user.level}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold gradient-text">${user.rewards}</div>
                                <div className="text-sm text-gray-400">{user.referrals} referrals</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

