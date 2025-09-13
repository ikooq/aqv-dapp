"use client";
import { useEffect, useState } from "react";
import { connection, RPC_URL } from "@/lib/solana";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function ChainStatus() {
    const [slot, setSlot] = useState<number>(0);
    const [blockhash, setBlockhash] = useState<string>("");
    const [minFee, setMinFee] = useState<number>(0);

    useEffect(() => {
        let unsubId: number | null = null;

        (async () => {
            // начальная выборка
            setSlot(await connection.getSlot());
            const { blockhash } = await connection.getLatestBlockhash("finalized");
            setBlockhash(blockhash);
            // оценка минимальной комиссии через empty message
            const msg = new (await import("@solana/web3.js")).TransactionMessage({
                payerKey: (await import("@solana/web3.js")).Keypair.generate().publicKey,
                recentBlockhash: blockhash,
                instructions: [],
            }).compileToV0Message();
            const fee = await connection.getFeeForMessage(msg, "confirmed");
            setMinFee(fee?.value ?? 0);

            // подписка на изменения слотов (websocket)
            // в web3.js: connection.onSlotChange(cb)
            unsubId = connection.onSlotChange((x) => setSlot(x.slot));
        })();

        return () => {
            if (unsubId !== null) {
                connection.removeSlotChangeListener(unsubId);
            }
        };
    }, []);

    return (
        <div className="rounded-2xl border bg-white p-4 text-xs">
            <div className="font-semibold mb-1">Network</div>
            <div>RPC: <span className="font-mono">{RPC_URL}</span></div>
            <div>Slot: <b>{slot}</b></div>
            <div>Latest blockhash: <span className="font-mono">{blockhash.slice(0, 18)}…</span></div>
            <div>Min fee (lamports): <b>{minFee}</b> (~{(minFee / LAMPORTS_PER_SOL).toFixed(6)} SOL)</div>
        </div>
    );
}
