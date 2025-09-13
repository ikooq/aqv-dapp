"use client";
import { useState, useEffect } from "react";

interface DemoStep {
    id: number;
    title: string;
    description: string;
    action: string;
    result: string;
    icon: string;
}

export default function InteractiveDemo() {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    const demoSteps: DemoStep[] = [
        {
            id: 1,
            title: "Connect Wallet",
            description: "Connect your Phantom wallet to start earning",
            action: "Click 'Connect Wallet' button",
            result: "Wallet connected successfully!",
            icon: "🔗"
        },
        {
            id: 2,
            title: "Choose Vault",
            description: "Select from our AI-optimized vault strategies",
            action: "Browse available vaults",
            result: "USDC Auto-Compound vault selected",
            icon: "🏦"
        },
        {
            id: 3,
            title: "AI Risk Analysis",
            description: "Our AI analyzes market conditions and risks",
            action: "AI processes data in real-time",
            result: "Risk score: 72/100 (MEDIUM) - Safe to proceed",
            icon: "🤖"
        },
        {
            id: 4,
            title: "Deposit Funds",
            description: "Deposit USDC to start earning yield",
            action: "Enter amount and click 'Deposit'",
            result: "Successfully deposited $1,000 USDC",
            icon: "💰"
        },
        {
            id: 5,
            title: "Auto-Compounding",
            description: "Watch your funds automatically compound",
            action: "Vault automatically reinvests rewards",
            result: "APY increased from 12.4% to 12.6%",
            icon: "⚡"
        },
        {
            id: 6,
            title: "Earn Rewards",
            description: "Collect NFT rewards and level up",
            action: "Complete achievements and earn NFTs",
            result: "Earned 'Yield Master' NFT (+2.5% APY bonus)",
            icon: "🏆"
        }
    ];

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isPlaying && currentStep < demoSteps.length) {
            interval = setInterval(() => {
                setCurrentStep(prev => {
                    const next = prev + 1;
                    if (next >= demoSteps.length) {
                        setIsPlaying(false);
                        return prev;
                    }
                    return next;
                });
            }, 3000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isPlaying, currentStep, demoSteps.length]);

    useEffect(() => {
        setProgress((currentStep / demoSteps.length) * 100);
    }, [currentStep, demoSteps.length]);

    const startDemo = () => {
        setCurrentStep(0);
        setIsPlaying(true);
    };

    const resetDemo = () => {
        setCurrentStep(0);
        setIsPlaying(false);
        setProgress(0);
    };

    const nextStep = () => {
        if (currentStep < demoSteps.length - 1) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    return (
        <div className="card">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div>
                    <div className="text-lg font-bold gradient-text">Interactive Demo</div>
                    <div className="text-sm text-gray-400">Experience Aqyldy Vaults in action</div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Step {currentStep + 1} of {demoSteps.length}</span>
                    <span>{Math.round(progress)}% Complete</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Current Step */}
            {currentStep < demoSteps.length && (
                <div className="mb-6">
                    <div className="text-center mb-4">
                        <div className="text-4xl mb-2">{demoSteps[currentStep].icon}</div>
                        <h3 className="text-xl font-bold gradient-text mb-2">
                            {demoSteps[currentStep].title}
                        </h3>
                        <p className="text-gray-300 mb-4">
                            {demoSteps[currentStep].description}
                        </p>
                    </div>

                    <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                        <div className="text-sm text-gray-400 mb-2">Action:</div>
                        <div className="text-gray-200">{demoSteps[currentStep].action}</div>
                    </div>

                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                        <div className="text-sm text-green-400 mb-2">Result:</div>
                        <div className="text-green-300">{demoSteps[currentStep].result}</div>
                    </div>
                </div>
            )}

            {/* Completion Message */}
            {currentStep >= demoSteps.length && (
                <div className="text-center mb-6">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-2xl font-bold gradient-text mb-2">
                        Demo Complete!
                    </h3>
                    <p className="text-gray-300 mb-4">
                        You've successfully experienced the full Aqyldy Vaults journey.
                        Ready to start earning real yields?
                    </p>
                    <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
                        <div className="text-sm text-gray-400 mb-2">Your Potential Earnings:</div>
                        <div className="text-2xl font-bold gradient-text">$1,000 → $1,124 in 1 year</div>
                        <div className="text-sm text-gray-400">12.4% APY with auto-compounding</div>
                    </div>
                </div>
            )}

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-3">
                {!isPlaying && currentStep === 0 && (
                    <button onClick={startDemo} className="btn-primary flex-1">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Start Interactive Demo
                    </button>
                )}

                {isPlaying && (
                    <button onClick={() => setIsPlaying(false)} className="btn-secondary flex-1">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Pause Demo
                    </button>
                )}

                {!isPlaying && currentStep > 0 && currentStep < demoSteps.length && (
                    <>
                        <button onClick={prevStep} className="btn-secondary">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Previous
                        </button>
                        <button onClick={nextStep} className="btn-primary">
                            Next
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}

                {currentStep >= demoSteps.length && (
                    <button onClick={resetDemo} className="btn-secondary flex-1">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Restart Demo
                    </button>
                )}
            </div>

            {/* Step Indicators */}
            <div className="mt-6 flex justify-center gap-2">
                {demoSteps.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index <= currentStep
                                ? 'bg-gradient-to-r from-cyan-500 to-blue-500'
                                : 'bg-gray-600'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}

