import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import WalletContextProvider from "@/components/WalletProvider";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

export const metadata: Metadata = {
  title: "Aqyldy Vaults",
  description: "Auto-compounding DeFi vaults on Solana",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const rpc = process.env.NEXT_PUBLIC_SOLANA_RPC!;
  const network = (process.env.NEXT_PUBLIC_SOLANA_NETWORK || "devnet") as WalletAdapterNetwork;

  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white relative overflow-x-hidden">
        {/* Animated background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-2xl animate-pulse-slow"></div>
        </div>

        <WalletContextProvider rpc={"https://api.devnet.solana.com"} network={network}>
          <Navbar />
          <main className="relative z-10">{children}</main>
        </WalletContextProvider>
      </body>
    </html>
  );
}
