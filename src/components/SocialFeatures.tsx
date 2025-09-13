"use client";
import { useState, useEffect } from "react";

interface VaultRating {
    id: string;
    name: string;
    rating: number;
    reviews: number;
    apy: number;
    risk: string;
    isTrending: boolean;
    userRating?: number;
}

export default function SocialFeatures() {
    const [vaults, setVaults] = useState<VaultRating[]>([]);
    const [selectedVault, setSelectedVault] = useState<string | null>(null);
    const [userRating, setUserRating] = useState<number>(0);
    const [review, setReview] = useState<string>("");

    useEffect(() => {
        // Simulate loading vault ratings
        setVaults([
            {
                id: "1",
                name: "USDC Auto-Compound",
                rating: 4.8,
                reviews: 1247,
                apy: 12.4,
                risk: "LOW",
                isTrending: true,
                userRating: 5
            },
            {
                id: "2",
                name: "SOL Staking Plus",
                rating: 4.6,
                reviews: 892,
                apy: 18.7,
                risk: "MEDIUM",
                isTrending: false,
                userRating: 4
            },
            {
                id: "3",
                name: "Multi-Asset Vault",
                rating: 4.2,
                reviews: 456,
                apy: 15.2,
                risk: "HIGH",
                isTrending: true,
                userRating: 3
            }
        ]);
    }, []);

    const handleRating = (vaultId: string, rating: number) => {
        setVaults(prev => prev.map(v =>
            v.id === vaultId ? { ...v, userRating: rating } : v
        ));
    };

    const handleReview = (vaultId: string) => {
        if (review.trim()) {
            // Simulate review submission
            setVaults(prev => prev.map(v =>
                v.id === vaultId ? { ...v, reviews: v.reviews + 1 } : v
            ));
            setReview("");
            setSelectedVault(null);
        }
    };

    const renderStars = (rating: number, interactive: boolean = false, onRate?: (rating: number) => void) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        onClick={() => interactive && onRate?.(star)}
                        disabled={!interactive}
                        className={`text-lg ${star <= rating
                                ? 'text-yellow-400'
                                : 'text-gray-600'
                            } ${interactive ? 'hover:text-yellow-300 cursor-pointer' : 'cursor-default'}`}
                    >
                        ★
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className="card">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <div>
                    <div className="text-lg font-bold gradient-text">Community Ratings</div>
                    <div className="text-sm text-gray-400">See what the community thinks</div>
                </div>
            </div>

            <div className="space-y-4">
                {vaults.map((vault) => (
                    <div key={vault.id} className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <h4 className="font-semibold">{vault.name}</h4>
                                {vault.isTrending && (
                                    <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full border border-red-500/30">
                                        🔥 Trending
                                    </span>
                                )}
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-gray-400">{vault.apy}% APY</div>
                                <div className={`text-xs px-2 py-1 rounded-full ${vault.risk === "LOW" ? "bg-green-500/20 text-green-400" :
                                        vault.risk === "MEDIUM" ? "bg-yellow-500/20 text-yellow-400" :
                                            "bg-red-500/20 text-red-400"
                                    }`}>
                                    {vault.risk}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                {renderStars(vault.rating)}
                                <span className="text-sm text-gray-400">({vault.reviews} reviews)</span>
                            </div>
                            <button
                                onClick={() => setSelectedVault(selectedVault === vault.id ? null : vault.id)}
                                className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                            >
                                {selectedVault === vault.id ? 'Cancel' : 'Rate & Review'}
                            </button>
                        </div>

                        {selectedVault === vault.id && (
                            <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Your Rating
                                        </label>
                                        {renderStars(vault.userRating || 0, true, (rating) => handleRating(vault.id, rating))}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Write a Review
                                        </label>
                                        <textarea
                                            value={review}
                                            onChange={(e) => setReview(e.target.value)}
                                            className="input h-20 resize-none"
                                            placeholder="Share your experience with this vault..."
                                        />
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleReview(vault.id)}
                                            className="btn-primary flex-1"
                                        >
                                            Submit Review
                                        </button>
                                        <button
                                            onClick={() => setSelectedVault(null)}
                                            className="btn-secondary"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {/* Community Stats */}
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20">
                    <div className="text-sm font-semibold gradient-text mb-3">Community Stats</div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="text-lg font-bold gradient-text">2,595</div>
                            <div className="text-xs text-gray-400">Total Reviews</div>
                        </div>
                        <div>
                            <div className="text-lg font-bold gradient-text">4.6</div>
                            <div className="text-xs text-gray-400">Avg Rating</div>
                        </div>
                        <div>
                            <div className="text-lg font-bold gradient-text">98%</div>
                            <div className="text-xs text-gray-400">Satisfaction</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

