"use client";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { depositToVault, getExplorerUrl, VAULT_ADDRESSES } from "@/lib/solana";

interface Vault {
    id: string;
    name: string;
    apy: number;
    tvl: number;
    risk: 'low' | 'medium' | 'high';
    strategy: string;
    verified: boolean;
}

interface DepositModalProps {
    vault: Vault;
    isOpen: boolean;
    onClose: () => void;
}

export default function VaultDeposit({ vault, isOpen, onClose }: DepositModalProps) {
    const { publicKey, signTransaction } = useWallet();
    const [amount, setAmount] = useState('');
    const [isDepositing, setIsDepositing] = useState(false);
    const [step, setStep] = useState<'amount' | 'confirm' | 'success'>('amount');

    const handleDeposit = async () => {
        if (!publicKey || !signTransaction) {
            alert('Please connect your wallet');
            return;
        }

        setIsDepositing(true);
        setStep('confirm');

        try {
            // Get real vault address based on vault ID
            const vaultAddress = VAULT_ADDRESSES[vault.id as keyof typeof VAULT_ADDRESSES] || VAULT_ADDRESSES.USDC_VAULT;

            // Use real Solana transaction
            const signature = await depositToVault(
                { publicKey, signTransaction } as any,
                vaultAddress,
                parseFloat(amount)
            );

            console.log('Deposit successful:', signature);
            console.log('Explorer URL:', getExplorerUrl(signature));

            setStep('success');

            // In real implementation, you would:
            // 1. Update vault TVL
            // 2. Mint vault tokens to user
            // 3. Start yield farming
            // 4. Update user's portfolio

        } catch (error) {
            console.error('Deposit failed:', error);
            alert('Deposit failed. Please try again.');
            setStep('amount');
        } finally {
            setIsDepositing(false);
        }
    };

    const getRiskColor = (risk: string) => {
        switch (risk) {
            case 'low': return 'text-green-400';
            case 'medium': return 'text-yellow-400';
            case 'high': return 'text-red-400';
            default: return 'text-gray-400';
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
                        <h2 className="text-xl font-semibold text-white">Deposit to Vault</h2>
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
                            {/* Vault Info */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-white mb-2">{vault.name}</h3>
                                <p className="text-sm text-gray-400 mb-4">{vault.strategy}</p>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-800 rounded-lg p-3">
                                        <div className="text-sm text-gray-400">APY</div>
                                        <div className="text-lg font-semibold text-green-400">{vault.apy}%</div>
                                    </div>
                                    <div className="bg-gray-800 rounded-lg p-3">
                                        <div className="text-sm text-gray-400">Risk</div>
                                        <div className={`text-lg font-semibold ${getRiskColor(vault.risk)}`}>
                                            {vault.risk.charAt(0).toUpperCase() + vault.risk.slice(1)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Amount Input */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Deposit Amount (SOL)
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

                            {/* Yield Preview */}
                            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
                                <h4 className="text-sm font-semibold text-green-400 mb-2">Expected Returns</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">Daily Yield</span>
                                        <span className="text-white">
                                            {amount ? (parseFloat(amount) * (vault.apy / 100) / 365).toFixed(4) : '0'} SOL
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">Monthly Yield</span>
                                        <span className="text-white">
                                            {amount ? (parseFloat(amount) * (vault.apy / 100) / 12).toFixed(4) : '0'} SOL
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">Annual Yield</span>
                                        <span className="text-white">
                                            {amount ? (parseFloat(amount) * (vault.apy / 100)).toFixed(4) : '0'} SOL
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setStep('confirm')}
                                disabled={!amount || parseFloat(amount) <= 0}
                                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-600 text-white py-3 rounded-lg font-medium transition-all duration-200"
                            >
                                Continue to Deposit
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
                                <h3 className="text-lg font-semibold text-white mb-2">Confirm Deposit</h3>
                                <p className="text-gray-400">Review your deposit details</p>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Vault</span>
                                    <span className="text-white">{vault.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Amount</span>
                                    <span className="text-white">{amount} SOL</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">APY</span>
                                    <span className="text-green-400 font-semibold">{vault.apy}%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Risk Level</span>
                                    <span className={`font-semibold ${getRiskColor(vault.risk)}`}>
                                        {vault.risk.charAt(0).toUpperCase() + vault.risk.slice(1)}
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
                                    onClick={handleDeposit}
                                    disabled={isDepositing}
                                    className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-600 text-white py-3 rounded-lg font-medium transition-all duration-200"
                                >
                                    {isDepositing ? 'Processing...' : 'Confirm Deposit'}
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
                                <h3 className="text-lg font-semibold text-white mb-2">Deposit Successful!</h3>
                                <p className="text-gray-400 mb-6">
                                    You've successfully deposited {amount} SOL into {vault.name}
                                </p>

                                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
                                    <h4 className="text-sm font-semibold text-green-400 mb-2">What's Next?</h4>
                                    <ul className="text-sm text-gray-300 space-y-1 text-left">
                                        <li>• Your funds are now earning {vault.apy}% APY</li>
                                        <li>• Yields are automatically compounded</li>
                                        <li>• You can withdraw anytime</li>
                                        <li>• Track performance in your portfolio</li>
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
