"use client";
import { useState, useEffect } from "react";

interface RiskAnalysis {
    overallRisk: number;
    marketRisk: number;
    smartContractRisk: number;
    liquidityRisk: number;
    recommendations: string[];
    predictions: {
        next7Days: number;
        next30Days: number;
        confidence: number;
    };
}

export default function AIRiskAnalysis() {
    const [analysis, setAnalysis] = useState<RiskAnalysis | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    useEffect(() => {
        // Simulate AI analysis
        const simulateAnalysis = () => {
            setIsAnalyzing(true);
            setTimeout(() => {
                setAnalysis({
                    overallRisk: 72,
                    marketRisk: 68,
                    smartContractRisk: 45,
                    liquidityRisk: 85,
                    recommendations: [
                        "Diversify across multiple vaults to reduce concentration risk",
                        "Consider reducing position size due to high liquidity risk",
                        "Monitor market volatility closely in the next 48 hours",
                        "Smart contract risk is low - safe to proceed"
                    ],
                    predictions: {
                        next7Days: 12.4,
                        next30Days: 15.2,
                        confidence: 87
                    }
                });
                setIsAnalyzing(false);
            }, 2000);
        };

        simulateAnalysis();
    }, []);

    const getRiskColor = (risk: number) => {
        if (risk >= 80) return "text-red-400";
        if (risk >= 60) return "text-yellow-400";
        return "text-green-400";
    };

    const getRiskLabel = (risk: number) => {
        if (risk >= 80) return "HIGH";
        if (risk >= 60) return "MEDIUM";
        return "LOW";
    };

    if (isAnalyzing) {
        return (
            <div className="card">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center animate-pulse">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-lg font-bold gradient-text">AI Risk Analysis</div>
                        <div className="text-sm text-gray-400">Analyzing portfolio risk factors...</div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                    </div>
                    <div className="text-center text-sm text-gray-400">
                        Processing market data, smart contract audits, and liquidity metrics...
                    </div>
                </div>
            </div>
        );
    }

    if (!analysis) return null;

    return (
        <div className="card">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                </div>
                <div>
                    <div className="text-lg font-bold gradient-text">AI Risk Analysis</div>
                    <div className="text-sm text-gray-400">Powered by advanced machine learning</div>
                </div>
            </div>

            <div className="space-y-6">
                {/* Overall Risk Score */}
                <div className="text-center">
                    <div className="text-3xl font-bold gradient-text mb-2">{analysis.overallRisk}/100</div>
                    <div className={`text-lg font-semibold ${getRiskColor(analysis.overallRisk)}`}>
                        {getRiskLabel(analysis.overallRisk)} RISK
                    </div>
                </div>

                {/* Risk Breakdown */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-sm text-gray-400 mb-1">Market Risk</div>
                        <div className={`text-lg font-bold ${getRiskColor(analysis.marketRisk)}`}>
                            {analysis.marketRisk}%
                        </div>
                    </div>
                    <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-sm text-gray-400 mb-1">Smart Contract</div>
                        <div className={`text-lg font-bold ${getRiskColor(analysis.smartContractRisk)}`}>
                            {analysis.smartContractRisk}%
                        </div>
                    </div>
                    <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-sm text-gray-400 mb-1">Liquidity Risk</div>
                        <div className={`text-lg font-bold ${getRiskColor(analysis.liquidityRisk)}`}>
                            {analysis.liquidityRisk}%
                        </div>
                    </div>
                    <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-sm text-gray-400 mb-1">Confidence</div>
                        <div className="text-lg font-bold text-green-400">
                            {analysis.predictions.confidence}%
                        </div>
                    </div>
                </div>

                {/* Predictions */}
                <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                    <div className="text-sm font-semibold gradient-text mb-3">AI Predictions</div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <div className="text-gray-400">Next 7 Days APY</div>
                            <div className="font-bold text-green-400">{analysis.predictions.next7Days}%</div>
                        </div>
                        <div>
                            <div className="text-gray-400">Next 30 Days APY</div>
                            <div className="font-bold text-green-400">{analysis.predictions.next30Days}%</div>
                        </div>
                    </div>
                </div>

                {/* Recommendations */}
                <div>
                    <div className="text-sm font-semibold gradient-text mb-3">AI Recommendations</div>
                    <div className="space-y-2">
                        {analysis.recommendations.map((rec, index) => (
                            <div key={index} className="flex items-start gap-2 text-sm">
                                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-300">{rec}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={() => window.location.reload()}
                    className="btn-secondary w-full"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh Analysis
                </button>
            </div>
        </div>
    );
}

