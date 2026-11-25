# Aqyldy Vaults

A hackathon prototype from September 2025: the interface of a Solana yield vault that would send part of its returns to social-impact projects. It is a front-end demo, not a working DeFi protocol. No funds are moved, nothing is deployed, and nothing here has been audited.

## What actually works

- A Next.js 15 / React 19 interface: landing page, dashboard, vault page and about page.
- Solana wallet connection through the Wallet Adapter (Phantom and others) and reading the wallet's balance from a public RPC.
- Swap quotes from the Jupiter quote API (`src/sdk/jupiter.ts`, `src/lib/solana.ts`).

## What is a mock-up

| In the interface | In the code |
|---|---|
| Deposit and withdraw | In demo mode only logged to the console (`src/sdk/aqv.ts`) |
| "AI risk analysis" | A fixed answer after a timeout, no model is called (`src/components/AIRiskAnalysis.tsx`) |
| APY 8.5–18.7% | Hard-coded numbers, not calculated from any market |
| Prices and volatility | Static values (`src/sdk/pyth.ts`), Pyth is not connected |
| Live stats, notifications, users | Generated with `Math.random()` |
| NFTs, governance, insurance pool, referrals, social features | UI screens only |

## The Solana program

`aqv/programs/aqv/src/lib.rs` is an Anchor skeleton (about 100 lines): `deposit` and `withdraw` only change a TVL counter without transferring tokens, `harvest_and_compound` is a stub, and the program ID is a placeholder. It has not been deployed and has no tests.

## Run it

```bash
npm install
cp env.example .env.local   # keep NEXT_PUBLIC_DEMO_MODE=true
npm run dev                 # http://localhost:3000
```

Jest is configured in `package.json`, but there are no tests yet.

## License

MIT, see [LICENSE](LICENSE).
