"use client";
import { useEffect, useState } from "react";

export default function Governance() {
    const [gov, setGov] = useState<number>(0);
    const [choice, setChoice] = useState<"FOR" | "AGAINST" | "ABSTAIN">("FOR");
    const [note, setNote] = useState<string>("");

    // persist
    useEffect(() => {
        const v = localStorage.getItem("govPoints");
        if (v) setGov(parseInt(v, 10));
    }, []);
    useEffect(() => {
        localStorage.setItem("govPoints", String(gov));
    }, [gov]);

    const onVote = () => {
        setGov(v => v + 1);
        setNote(`Vote submitted: ${choice}. +1 GOV`);
        setTimeout(() => setNote(""), 2000);
    };

    return (
        <div className="card">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div>
                    <div className="text-lg font-bold gradient-text">Governance Mining</div>
                    <div className="text-sm text-gray-400">Earn GOV points by participating in votes</div>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Your Vote</label>
                    <select
                        className="input"
                        value={choice}
                        onChange={(e) => setChoice(e.target.value as any)}
                    >
                        <option value="FOR">✅ FOR</option>
                        <option value="AGAINST">❌ AGAINST</option>
                        <option value="ABSTAIN">🤷 ABSTAIN</option>
                    </select>
                </div>

                <button
                    onClick={onVote}
                    className="btn-primary w-full"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Submit Vote
                </button>

                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <span className="text-sm text-gray-400">Your GOV Points</span>
                    <span className="text-lg font-bold gradient-text">{gov}</span>
                </div>

                {note && (
                    <div className="text-sm rounded-lg bg-green-500/10 border border-green-500/20 px-3 py-2 text-green-400">
                        {note}
                    </div>
                )}
            </div>
        </div>
    );
}
