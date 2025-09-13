"use client";
import { useEffect, useState } from "react";
import { connection } from "@/lib/solana";
import { PublicKey } from "@solana/web3.js";

export default function ProgramLogs({ programId }: { programId: string }) {
    const [lines, setLines] = useState<string[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!programId) return;
        let subId: number | null = null;

        const connectToLogs = async () => {
            try {
                setError(null);
                const pid = new PublicKey(programId);

                subId = await connection.onLogs(
                    pid,
                    (log) => {
                        setLines((prev) => {
                            const slot = (log as any).context?.slot || 'unknown';
                            const logs = log.logs || [];
                            const next = [`[slot ${slot}] ${logs.join(" | ")}`, ...prev];
                            return next.slice(0, 20);
                        });
                        setIsConnected(true);
                    },
                    "confirmed"
                );
            } catch (err) {
                console.error('Error connecting to logs:', err);
                setError('Failed to connect to program logs');
                setIsConnected(false);
            }
        };

        connectToLogs();

        return () => {
            if (subId !== null) {
                try {
                    connection.removeOnLogsListener(subId);
                } catch (err) {
                    console.error('Error removing log listener:', err);
                }
            }
        };
    }, [programId]);

    return (
        <div className="card">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <div>
                    <div className="text-lg font-bold gradient-text">Program Logs</div>
                    <div className="text-sm text-gray-400">
                        {isConnected ? 'Connected' : 'Connecting...'} • Program: {programId.slice(0, 8)}...
                    </div>
                </div>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                    {error}
                </div>
            )}

            <div className="bg-gray-900/50 rounded-lg p-4 max-h-60 overflow-auto">
                <pre className="text-xs text-gray-300 whitespace-pre-wrap break-words">
                    {lines.length ? lines.join("\n") : "Waiting for program logs..."}
                </pre>
            </div>

            {lines.length > 0 && (
                <div className="mt-3 text-xs text-gray-400 text-center">
                    Showing last {lines.length} log entries
                </div>
            )}
        </div>
    );
}
