"use client";
import { useState, useEffect } from "react";

interface NFT {
    id: string;
    name: string;
    image: string;
    rarity: "Common" | "Rare" | "Epic" | "Legendary";
    power: number;
    description: string;
    isEquipped: boolean;
}

interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    isUnlocked: boolean;
    progress: number;
    maxProgress: number;
}

export default function NFTIntegration() {
    const [nfts, setNfts] = useState<NFT[]>([]);
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [userLevel, setUserLevel] = useState(15);
    const [xp, setXp] = useState(2340);
    const [nextLevelXp, setNextLevelXp] = useState(3000);

    useEffect(() => {
        // Simulate loading NFTs and achievements
        setNfts([
            {
                id: "1",
                name: "Yield Master Badge",
                image: "🏆",
                rarity: "Legendary",
                power: 95,
                description: "Increases APY by 2.5% when equipped",
                isEquipped: true
            },
            {
                id: "2",
                name: "Risk Guardian Shield",
                image: "🛡️",
                rarity: "Epic",
                power: 78,
                description: "Reduces risk score by 15%",
                isEquipped: false
            },
            {
                id: "3",
                name: "Compound Catalyst",
                image: "⚡",
                rarity: "Rare",
                power: 65,
                description: "Speeds up compounding by 20%",
                isEquipped: true
            },
            {
                id: "4",
                name: "Liquidity Booster",
                image: "💧",
                rarity: "Common",
                power: 45,
                description: "Increases liquidity rewards by 10%",
                isEquipped: false
            }
        ]);

        setAchievements([
            {
                id: "1",
                title: "First Deposit",
                description: "Make your first vault deposit",
                icon: "🎯",
                isUnlocked: true,
                progress: 1,
                maxProgress: 1
            },
            {
                id: "2",
                title: "Yield Hunter",
                description: "Earn 1000 USDC in yield",
                icon: "💰",
                isUnlocked: true,
                progress: 1000,
                maxProgress: 1000
            },
            {
                id: "3",
                title: "Governance Master",
                description: "Participate in 10 governance votes",
                icon: "🗳️",
                isUnlocked: false,
                progress: 7,
                maxProgress: 10
            },
            {
                id: "4",
                title: "Risk Taker",
                description: "Invest in 5 different vaults",
                icon: "🎲",
                isUnlocked: false,
                progress: 3,
                maxProgress: 5
            },
            {
                id: "5",
                title: "Diamond Hands",
                description: "Hold for 30 consecutive days",
                icon: "💎",
                isUnlocked: false,
                progress: 12,
                maxProgress: 30
            }
        ]);
    }, []);

    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case "Legendary": return "text-yellow-400 border-yellow-400/30 bg-yellow-400/10";
            case "Epic": return "text-purple-400 border-purple-400/30 bg-purple-400/10";
            case "Rare": return "text-blue-400 border-blue-400/30 bg-blue-400/10";
            default: return "text-gray-400 border-gray-400/30 bg-gray-400/10";
        }
    };

    const toggleEquip = (nftId: string) => {
        setNfts(prev => prev.map(nft =>
            nft.id === nftId ? { ...nft, isEquipped: !nft.isEquipped } : nft
        ));
    };

    return (
        <div className="space-y-6">
            {/* User Level & XP */}
            <div className="card">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-lg font-bold gradient-text">DeFi Level System</div>
                        <div className="text-sm text-gray-400">Earn XP and unlock rewards</div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="text-center">
                        <div className="text-3xl font-bold gradient-text mb-1">Level {userLevel}</div>
                        <div className="text-sm text-gray-400">DeFi Explorer</div>
                    </div>

                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">Experience Points</span>
                            <span className="text-gray-300">{xp} / {nextLevelXp}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3">
                            <div
                                className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${(xp / nextLevelXp) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="text-lg font-bold gradient-text">12</div>
                            <div className="text-xs text-gray-400">NFTs Owned</div>
                        </div>
                        <div>
                            <div className="text-lg font-bold gradient-text">8</div>
                            <div className="text-xs text-gray-400">Achievements</div>
                        </div>
                        <div>
                            <div className="text-lg font-bold gradient-text">2.5%</div>
                            <div className="text-xs text-gray-400">APY Bonus</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* NFTs */}
            <div className="card">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-lg font-bold gradient-text">NFT Collection</div>
                        <div className="text-sm text-gray-400">Equip NFTs to boost your yields</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {nfts.map((nft) => (
                        <div key={nft.id} className={`p-4 rounded-lg border-2 transition-all ${nft.isEquipped ? 'border-green-400/50 bg-green-400/10' : 'border-gray-700 bg-gray-800/50'
                            }`}>
                            <div className="flex items-center justify-between mb-3">
                                <div className="text-2xl">{nft.image}</div>
                                <div className={`px-2 py-1 rounded-full text-xs font-semibold border ${getRarityColor(nft.rarity)}`}>
                                    {nft.rarity}
                                </div>
                            </div>

                            <h4 className="font-semibold mb-2">{nft.name}</h4>
                            <p className="text-sm text-gray-400 mb-3">{nft.description}</p>

                            <div className="flex items-center justify-between">
                                <div className="text-sm">
                                    <span className="text-gray-400">Power: </span>
                                    <span className="font-semibold text-purple-400">{nft.power}</span>
                                </div>
                                <button
                                    onClick={() => toggleEquip(nft.id)}
                                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${nft.isEquipped
                                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                            : 'bg-gray-600/20 text-gray-300 border border-gray-600/30 hover:bg-gray-600/30'
                                        }`}
                                >
                                    {nft.isEquipped ? 'Equipped' : 'Equip'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Achievements */}
            <div className="card">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-lg font-bold gradient-text">Achievements</div>
                        <div className="text-sm text-gray-400">Complete challenges to earn rewards</div>
                    </div>
                </div>

                <div className="space-y-3">
                    {achievements.map((achievement) => (
                        <div key={achievement.id} className={`p-3 rounded-lg border transition-all ${achievement.isUnlocked
                                ? 'border-green-400/30 bg-green-400/10'
                                : 'border-gray-700 bg-gray-800/50'
                            }`}>
                            <div className="flex items-center gap-3">
                                <div className="text-2xl">{achievement.icon}</div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-semibold">{achievement.title}</h4>
                                        {achievement.isUnlocked && (
                                            <span className="text-green-400 text-sm">✓</span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-400 mb-2">{achievement.description}</p>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1">
                                        {achievement.progress} / {achievement.maxProgress}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

