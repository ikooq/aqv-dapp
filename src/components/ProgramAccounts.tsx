"use client";
import { useEffect, useState } from "react";
import { connection } from "@/lib/solana";
import { PublicKey } from "@solana/web3.js";

export default function ProgramAccounts({ programId }: { programId: string }) {
    const [count, setCount] = useState<number>(0);
    const [first, setFirst] = useState<string>("");

    useEffect(() => {
        if (!programId) return;
        (async () => {
            const pid = new PublicKey(programId);
            // Ограничим объем: только ключи (без данных) через dataSlice
            const accs = await connection.getProgramAccounts(pid, {
                dataSlice: { offset: 0, length: 0 },
                commitment: "confirmed",
            });
            setCount(accs.length);
            setFirst(accs[0]?.pubkey.toBase58() ?? "");
        })();
    }, [programId]);

    return (
        <div className="rounded-2xl border bg-white p-4 text-xs">
            <div className="font-semibold mb-1">Program Accounts (RPC)</div>
            <div>Total: <b>{count}</b></div>
            {first && <div>First: <span className="font-mono">{first.slice(0, 18)}…</span></div>}
        </div>
    );
}
