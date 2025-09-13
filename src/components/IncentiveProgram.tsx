"use client";
import { useState, useEffect } from "react";

interface Incentive {
    id: string;
    title: string;
    description: string;
    reward: string;
    type: "deposit" | "referral" | "social" | "achievement";
    progress: number;
    maxProgress: number;
    isCompleted: boolean;
    expiresAt?: Date;
}

export default function IncentiveProgram() {
    const [incentives, setIncentives] = useState<Incentive[]>([]);
    const [totalRewards, setTotalRewards] = useState(0);
    const [activeUsers, setActiveUsers] = useState(1247);

    useEffect(() => {
        // Simulate loading incentives
        setIncentives([
            {
                id: "1",
                title: "First Deposit Bonus",
                description: "Make your first deposit of $100+ to earn bonus rewards",
                reward: "$25 USDC + 1 NFT",
                type: "deposit",
                progress: 0,
                maxProgress: 100,
                isCompleted: false
            },
            {
                id: "2",
                title: "Social Media Champion",
                description: "Share Aqyldy on Twitter and Discord",
                reward: "$10 USDC + 0.5% APY boost",
                type: "social",
                progress: 0,
                maxProgress: 2,
                isCompleted: false
            },
            {
                id: "3",
                title: "Referral Master",
                description: "Refer 5 friends to earn exclusive rewards",
                reward: "$50 USDC + Rare NFT + 1% APY boost",
                type: "referral",
                progress: 0,
                maxProgress: 5,
                isCompleted: false
            },
            {
                id: "4",
                title: "Early Adopter",
                description: "Join before 1000 users to get special benefits",
                reward: "Lifetime 0.5% APY boost + VIP status",
                type: "achievement",
                progress: 1247,
                maxProgress: 1000,
                isCompleted: true
            },
            {
                id: "5",
                title: "Liquidity Provider",
                description: "Provide $500+ to insurance pool",
                reward: "$75 USDC + Insurance NFT + 2% APY boost",
                type: "deposit",
                progress: 0,
                maxProgress: 500,
                isCompleted: false
            },
            {
                id: "6",
                title: "Governance Participant",
                description: "Vote in 3 governance proposals",
                reward: "$15 USDC + Governance NFT",
                type: "achievement",
                progress: 1,
                maxProgress: 3,
                isCompleted: false
            }
        ]);

        setTotalRewards(1250);
    }, []);

    const claimReward = (incentiveId: string) => {
        setIncentives(prev => prev.map(inc =>
            inc.id === incentiveId ? { ...inc, isCompleted: true } : inc
        ));
        // Simulate claiming reward
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "deposit": return "💰";
            case "referral": return "👥";
            case "social": return "📱";
            case "achievement": return "🏆";
            default: return "🎁";
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case "deposit": return "from-green-500 to-emerald-500";
            case "referral": return "from-blue-500 to-cyan-500";
            case "social": return "from-purple-500 to-pink-500";
            case "achievement": return "from-yellow-500 to-orange-500";
            default: return "from-gray-500 to-gray-600";
        }
    };

    return (
        <div className="space-y-6">
            {/* Header Stats */}
            <div className="card">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold gradient-text">Incentive Program</h2>
                        <p className="text-gray-400">Complete tasks to earn rewards and boost your APY</p>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold gradient-text">${totalRewards.toLocaleString()}</div>
                        <div className="text-sm text-gray-400">Total Rewards Pool</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-800/50 rounded-lg text-center">
                        <div className="text-2xl font-bold gradient-text">{activeUsers.toLocaleString()}</div>
                        <div className="text-sm text-gray-400">Active Users</div>
                    </div>
                    <div className="p-4 bg-gray-800/50 rounded-lg text-center">
                        <div className="text-2xl font-bold gradient-text">12</div>
                        <div className="text-sm text-gray-400">Available Tasks</div>
                    </div>
                    <div className="p-4 bg-gray-800/50 rounded-lg text-center">
                        <div className="text-2xl font-bold gradient-text">4</div>
                        <div className="text-sm text-gray-400">Completed</div>
                    </div>
                </div>
            </div>

            {/* Incentives List */}
            <div className="space-y-4">
                {incentives.map((incentive) => (
                    <div key={incentive.id} className={`card ${incentive.isCompleted ? 'opacity-75' : ''}`}>
                        <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 bg-gradient-to-br ${getTypeColor(incentive.type)} rounded-xl flex items-center justify-center text-2xl`}>
                                {getTypeIcon(incentive.type)}
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-lg font-bold gradient-text">{incentive.title}</h3>
                                    {incentive.isCompleted && (
                                        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                                            ✓ Completed
                                        </span>
                                    )}
                                </div>

                                <p className="text-gray-300 mb-3">{incentive.description}</p>

                                <div className="flex items-center justify-between mb-3">
                                    <div className="text-sm">
                                        <span className="text-gray-400">Progress: </span>
                                        <span className="font-semibold">{incentive.progress}/{incentive.maxProgress}</span>
                                    </div>
                                    <div className="text-sm font-bold text-yellow-400">{incentive.reward}</div>
                                </div>

                                <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-500 ${incentive.isCompleted ? 'bg-green-500' : 'bg-gradient-to-r from-purple-500 to-blue-500'
                                            }`}
                                        style={{ width: `${Math.min((incentive.progress / incentive.maxProgress) * 100, 100)}%` }}
                                    ></div>
                                </div>

                                {!incentive.isCompleted && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => claimReward(incentive.id)}
                                            className="btn-primary text-sm"
                                        >
                                            {incentive.progress > 0 ? 'Claim Reward' : 'Start Task'}
                                        </button>
                                        {incentive.type === 'social' && (
                                            <button className="btn-secondary text-sm">
                                                Share Now
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Special Offers */}
            <div className="card bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
                <div className="text-center">
                    <h3 className="text-xl font-bold gradient-text mb-2">🎉 Limited Time Offer</h3>
                    <p className="text-gray-300 mb-4">
                        First 100 users get 2x rewards on all tasks + exclusive NFT collection access
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm">
                        <span className="text-gray-400">Spots remaining:</span>
                        <span className="font-bold text-red-400">23/100</span>
                    </div>
                </div>
            </div>

            {/* Community Benefits */}
            <div className="card">
                <h3 className="text-lg font-bold gradient-text mb-4">Community Benefits</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                                <span className="text-white">💎</span>
                            </div>
                            <h4 className="font-semibold">VIP Status</h4>
                        </div>
                        <p className="text-sm text-gray-400">Priority support, exclusive features, and higher rewards</p>
                    </div>

                    <div className="p-4 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                <span className="text-white">🎨</span>
                            </div>
                            <h4 className="font-semibold">NFT Collection</h4>
                        </div>
                        <p className="text-sm text-gray-400">Exclusive NFTs that provide permanent APY bonuses</p>
                    </div>

                    <div className="p-4 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                                <span className="text-white">🗳️</span>
                            </div>
                            <h4 className="font-semibold">Governance Power</h4>
                        </div>
                        <p className="text-sm text-gray-400">Vote on protocol changes and earn governance rewards</p>
                    </div>

                    <div className="p-4 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                                <span className="text-white">⚡</span>
                            </div>
                            <h4 className="font-semibold">Early Access</h4>
                        </div>
                        <p className="text-sm text-gray-400">Be first to try new features and vault strategies</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

