"use client";
import { useEffect, useState } from "react";

export default function Insurance() {
    const [pool, setPool] = useState<number>(2500);
    const [amt, setAmt] = useState<string>("100");
    const [note, setNote] = useState<string>("");

    // persist
    useEffect(() => {
        const v = localStorage.getItem("insPool");
        if (v) setPool(parseFloat(v));
    }, []);
    useEffect(() => {
        localStorage.setItem("insPool", String(pool));
    }, [pool]);

    const amount = Math.max(0, Number(amt) || 0);

    const stake = () => {
        setPool(p => p + amount);
        setNote(`Staked $${amount.toFixed(2)} into Insurance Pool`);
        setTimeout(() => setNote(""), 2000);
    };

    const unstake = () => {
        setPool(p => Math.max(0, p - amount));
        setNote(`Unstaked $${amount.toFixed(2)} from Insurance Pool`);
        setTimeout(() => setNote(""), 2000);
    };

    return (
        <div className="card">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                </div>
                <div>
                    <div className="text-lg font-bold gradient-text">Insurance Pool</div>
                    <div className="text-sm text-gray-400">Protection against smart contract risks</div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <span className="text-sm text-gray-400">Pool Size</span>
                    <span className="text-lg font-bold gradient-text">
                        ${pool.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </span>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Amount (USD)</label>
                    <input
                        type="number"
                        min={0}
                        value={amt}
                        onChange={(e) => setAmt(e.target.value)}
                        className="input"
                        placeholder="100"
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        className="btn-primary bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                        onClick={stake}
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Stake
                    </button>
                    <button
                        className="btn-secondary"
                        onClick={unstake}
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                        Unstake
                    </button>
                </div>

                {note && (
                    <div className="text-sm rounded-lg bg-blue-500/10 border border-blue-500/20 px-3 py-2 text-blue-400">
                        {note}
                    </div>
                )}
            </div>
        </div>
    );
}
