import { AnchorProvider } from "@project-serum/anchor";
import { Connection } from "@solana/web3.js";
import { DEMO_MODE } from "@/lib/config";

export class AqvClient {
    constructor(
        public connection: Connection,
        public provider: AnchorProvider,
    ) { }

    async deposit({ amount, vault }: { amount: number; vault: string }) {
        if (DEMO_MODE) {
            console.log("DEMO deposit", amount, vault);
            await new Promise(r => setTimeout(r, 600));
            return;
        }
        // TODO: здесь позже добавим реальные Raydium+Token Program инструкции
    }

    async withdraw({ amount, vault }: { amount: number; vault: string }) {
        if (DEMO_MODE) {
            console.log("DEMO withdraw", amount, vault);
            await new Promise(r => setTimeout(r, 600));
            return;
        }
        // TODO: реальные инструкции на remove liquidity/transfer
    }

    async harvestAndCompound(vault: string) {
        if (DEMO_MODE) {
            console.log("DEMO harvest", vault);
            await new Promise(r => setTimeout(r, 800));
            return;
        }
        // TODO: claim → Jupiter swap → add liquidity
    }
}
