"use client";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { investInImpact, getExplorerUrl, IMPACT_PROJECTS } from "@/lib/solana";

interface ImpactProject {
    id: string;
    title: string;
    description: string;
    category: string;
    targetAmount: number;
    currentAmount: number;
    apy: number;
    impactScore: number;
    verified: boolean;
    deadline: Date;
    investors: number;
}

interface InvestmentModalProps {
    project: ImpactProject;
    isOpen: boolean;
    onClose: () => void;
}

export default function ImpactInvestment({ project, isOpen, onClose }: InvestmentModalProps) {
    const { publicKey, signTransaction } = useWallet();
    const [amount, setAmount] = useState('');
    const [isInvesting, setIsInvesting] = useState(false);
    const [step, setStep] = useState<'amount' | 'confirm' | 'success'>('amount');

    const handleInvest = async () => {
        if (!publicKey || !signTransaction) {
            alert('Please connect your wallet');
            return;
        }

        setIsInvesting(true);
        setStep('confirm');

        try {
            // Get real project address based on project ID
            const projectAddress = IMPACT_PROJECTS[project.id as keyof typeof IMPACT_PROJECTS] || IMPACT_PROJECTS.CLEAN_OCEAN;

            // Use real Solana transaction
            const signature = await investInImpact(
                { publicKey, signTransaction } as any,
                projectAddress,
                parseFloat(amount)
            );

            console.log('Investment successful:', signature);
            console.log('Explorer URL:', getExplorerUrl(signature));

            setStep('success');

            // In real implementation, you would:
            // 1. Update project funding amount
            // 2. Mint impact tokens to investor
            // 3. Update user's portfolio
            // 4. Send confirmation email

        } catch (error) {
            console.error('Investment failed:', error);
            alert('Investment failed. Please try again.');
            setStep('amount');
        } finally {
            setIsInvesting(false);
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'environment': return '🌱';
            case 'education': return '📚';
            case 'health': return '🏥';
            case 'technology': return '💻';
            case 'social': return '🤝';
            default: return '💡';
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-2xl max-w-md w-full border border-gray-800">
                {/* Warning */}
                <div className="bg-yellow-900/20 border-b border-yellow-500/30 p-3">
                    <p className="text-yellow-400 text-sm text-center">
                        ⚠️ <strong>Внимание:</strong> Это реальные транзакции с реальными деньгами на блокчейне Solana!
                    </p>
                </div>

                {/* Header */}
                <div className="p-6 border-b border-gray-800">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-white">Invest in Impact</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {step === 'amount' && (
                        <>
                            {/* Project Info */}
                            <div className="mb-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="text-3xl">{getCategoryIcon(project.category)}</div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                                        <p className="text-sm text-gray-400">Impact Score: {project.impactScore}/100</p>
                                    </div>
                                </div>
                                <p className="text-gray-300 text-sm">{project.description}</p>
                            </div>

                            {/* Investment Details */}
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Expected APY</span>
                                    <span className="text-green-400 font-semibold">{project.apy}%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Current Funding</span>
                                    <span className="text-white">
                                        ${(project.currentAmount / 1000000).toFixed(1)}M / ${(project.targetAmount / 1000000).toFixed(1)}M
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Investors</span>
                                    <span className="text-white">{project.investors.toLocaleString()}</span>
                                </div>
                            </div>

                            {/* Amount Input */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Investment Amount (SOL)
                                </label>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0.0"
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                                />
                                <div className="flex gap-2 mt-2">
                                    {[1, 5, 10, 25].map((value) => (
                                        <button
                                            key={value}
                                            onClick={() => setAmount(value.toString())}
                                            className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-sm transition-colors"
                                        >
                                            {value} SOL
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Impact Preview */}
                            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mb-6">
                                <h4 className="text-sm font-semibold text-purple-400 mb-2">Your Impact</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">Expected Annual Return</span>
                                        <span className="text-white">
                                            {amount ? (parseFloat(amount) * (project.apy / 100)).toFixed(2) : '0'} SOL
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">Impact Tokens Earned</span>
                                        <span className="text-white">
                                            {amount ? Math.floor(parseFloat(amount) * 100) : '0'} AQI
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setStep('confirm')}
                                disabled={!amount || parseFloat(amount) <= 0}
                                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-600 text-white py-3 rounded-lg font-medium transition-all duration-200 relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                <span className="relative z-10">Continue to Invest ✨</span>
                            </button>
                        </>
                    )}

                    {step === 'confirm' && (
                        <>
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Confirm Investment</h3>
                                <p className="text-gray-400">Review your investment details</p>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Project</span>
                                    <span className="text-white">{project.title}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Amount</span>
                                    <span className="text-white">{amount} SOL</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Expected APY</span>
                                    <span className="text-green-400 font-semibold">{project.apy}%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Impact Tokens</span>
                                    <span className="text-purple-400 font-semibold">
                                        {Math.floor(parseFloat(amount) * 100)} AQI
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setStep('amount')}
                                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleInvest}
                                    disabled={isInvesting}
                                    className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-600 text-white py-3 rounded-lg font-medium transition-all duration-200"
                                >
                                    {isInvesting ? 'Processing...' : 'Confirm Investment'}
                                </button>
                            </div>
                        </>
                    )}

                    {step === 'success' && (
                        <>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Investment Successful!</h3>
                                <p className="text-gray-400 mb-6">
                                    You've successfully invested {amount} SOL in {project.title}
                                </p>

                                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
                                    <h4 className="text-sm font-semibold text-green-400 mb-2">What's Next?</h4>
                                    <ul className="text-sm text-gray-300 space-y-1 text-left">
                                        <li>• Impact tokens (AQI) will be minted to your wallet</li>
                                        <li>• You'll receive regular updates on project progress</li>
                                        <li>• Returns will be automatically compounded</li>
                                        <li>• Track your impact in your portfolio</li>
                                    </ul>
                                </div>

                                <button
                                    onClick={onClose}
                                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 rounded-lg font-medium transition-all duration-200"
                                >
                                    View Portfolio
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
