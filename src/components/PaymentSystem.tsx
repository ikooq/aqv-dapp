"use client";
import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { connection, getUserBalance, depositToVault, investInImpact } from "@/lib/solana";

interface PaymentSystemProps {
    type: 'vault' | 'impact';
    targetId: string;
    amount: number;
    onSuccess: (signature: string) => void;
    onClose: () => void;
}

export default function PaymentSystem({ type, targetId, amount, onSuccess, onClose }: PaymentSystemProps) {
    const { publicKey, signTransaction } = useWallet();
    const [step, setStep] = useState<'confirm' | 'processing' | 'success' | 'error'>('confirm');
    const [balance, setBalance] = useState(0);
    const [testCoins, setTestCoins] = useState(0);
    const [signature, setSignature] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (publicKey) {
            fetchBalance();
        }
    }, [publicKey]);

    const fetchBalance = async () => {
        if (!publicKey) return;

        try {
            const userBalance = await getUserBalance(publicKey);
            setBalance(userBalance);

            // Добавляем тестовые копейки для демонстрации
            setTestCoins(0.1); // 0.1 SOL тестовых копеек
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    };

    const handlePayment = async () => {
        if (!publicKey || !signTransaction) {
            setError('Please connect your wallet');
            return;
        }

        if (amount > balance + testCoins) {
            setError('Insufficient balance');
            return;
        }

        setStep('processing');
        setError('');

        try {
            let txSignature: string;

            if (type === 'vault') {
                // Vault deposit
                txSignature = await depositToVault(
                    { publicKey, signTransaction } as any,
                    targetId,
                    amount
                );
            } else {
                // Impact investment
                txSignature = await investInImpact(
                    { publicKey, signTransaction } as any,
                    targetId,
                    amount
                );
            }

            setSignature(txSignature);
            setStep('success');
            onSuccess(txSignature);
        } catch (error) {
            console.error('Payment failed:', error);
            setError('Payment failed. Please try again.');
            setStep('error');
        }
    };

    const addTestCoins = () => {
        setTestCoins(prev => prev + 0.1);
    };

    if (step === 'success') {
        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-gray-900 rounded-2xl max-w-md w-full border border-gray-800">
                    <div className="p-6 text-center">
                        <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span className="text-2xl">✅</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Payment Successful!</h3>
                        <p className="text-gray-400 mb-4">
                            {type === 'vault' ? 'Deposit' : 'Investment'} of {amount} SOL completed
                        </p>
                        <div className="bg-gray-800 rounded-lg p-3 mb-4">
                            <p className="text-sm text-gray-400 mb-1">Transaction Signature:</p>
                            <p className="text-xs text-white font-mono break-all">{signature}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (step === 'error') {
        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-gray-900 rounded-2xl max-w-md w-full border border-gray-800">
                    <div className="p-6 text-center">
                        <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span className="text-2xl">❌</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Payment Failed</h3>
                        <p className="text-gray-400 mb-4">{error}</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setStep('confirm')}
                                className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={onClose}
                                className="flex-1 bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-2xl max-w-md w-full border border-gray-800">
                {/* Header */}
                <div className="p-6 border-b border-gray-800">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-white">
                            {type === 'vault' ? 'Deposit to Vault' : 'Invest in Impact'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Balance Display */}
                    <div className="bg-gray-800 rounded-lg p-4 mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-400">Your Balance:</span>
                            <span className="text-white font-mono">{balance.toFixed(4)} SOL</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-400">Test Coins:</span>
                            <span className="text-green-400 font-mono">{testCoins.toFixed(4)} SOL</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Total Available:</span>
                            <span className="text-white font-mono font-bold">{(balance + testCoins).toFixed(4)} SOL</span>
                        </div>
                    </div>

                    {/* Payment Details */}
                    <div className="bg-gray-800 rounded-lg p-4 mb-6">
                        <h3 className="text-white font-semibold mb-3">Payment Details</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Amount:</span>
                                <span className="text-white">{amount} SOL</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Type:</span>
                                <span className="text-white">{type === 'vault' ? 'Vault Deposit' : 'Impact Investment'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Network Fee:</span>
                                <span className="text-white">~0.000005 SOL</span>
                            </div>
                            <div className="border-t border-gray-700 pt-2">
                                <div className="flex justify-between font-semibold">
                                    <span className="text-white">Total:</span>
                                    <span className="text-white">{amount} SOL</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Test Coins Button */}
                    <button
                        onClick={addTestCoins}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-300 mb-4"
                    >
                        Add 0.1 SOL Test Coins
                    </button>

                    {/* Payment Button */}
                    <button
                        onClick={handlePayment}
                        disabled={amount > balance + testCoins || step === 'processing'}
                        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed transition-all duration-300"
                    >
                        {step === 'processing' ? 'Processing...' : `Pay ${amount} SOL`}
                    </button>

                    {amount > balance + testCoins && (
                        <p className="text-red-400 text-sm mt-2 text-center">
                            Insufficient balance. Add test coins or connect a wallet with more SOL.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}


