"use client";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { connection } from "@/lib/solana";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

type Sig = { signature: string; slot: number; blockTime?: number };

export default function WalletActivity() {
    const { publicKey } = useWallet();
    const [balance, setBalance] = useState<number | null>(null);
    const [sigs, setSigs] = useState<Sig[]>([]);

    useEffect(() => {
        if (!publicKey) return;
        (async () => {
            // 1) баланс
            const lamports = await connection.getBalance(publicKey);
            setBalance(lamports / LAMPORTS_PER_SOL);

            // 2) последние подписи (история)
            // getSignaturesForAddress — официальный RPC метод
            const list = await connection.getSignaturesForAddress(publicKey, { limit: 10 });
            setSigs(list.map(s => ({ signature: s.signature, slot: s.slot, blockTime: s.blockTime ?? undefined })));
        })();
    }, [publicKey]);

    if (!publicKey) return null;

    return (
        <div className="rounded-2xl border bg-white p-4 text-xs">
            <div className="font-semibold mb-1">Wallet Activity</div>
            <div>Address: <span className="font-mono">{publicKey.toBase58().slice(0, 8)}…</span></div>
            <div>Balance: <b>{balance?.toFixed(4) ?? "…"}</b> SOL</div>
            <div className="mt-2">Recent signatures:</div>
            <ul className="mt-1 space-y-1">
                {sigs.map((s) => (
                    <li key={s.signature} className="font-mono break-all">
                        {s.signature.slice(0, 24)}… (slot {s.slot})
                    </li>
                ))}
            </ul>
        </div>
    );
}
