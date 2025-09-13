"use client";
import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import ImpactInvestment from "@/components/ImpactInvestment";
import VaultDeposit from "@/components/VaultDeposit";
import PaymentSystem from "@/components/PaymentSystem";
import WowEffects from "@/components/WowEffects";
import LiveAnimations from "@/components/LiveAnimations";
import InteractiveCard from "@/components/InteractiveCards";
import MagicButton from "@/components/MagicButtons";
import TestCoins from "@/components/TestCoins";
import WalletBalance from "@/components/WalletBalance";
import Footer from "@/components/Footer";

// Types
interface ImpactProject {
  id: string;
  title: string;
  description: string;
  category: 'environment' | 'education' | 'health' | 'technology' | 'social';
  targetAmount: number;
  currentAmount: number;
  apy: number;
  impactScore: number;
  image: string;
  verified: boolean;
  deadline: Date;
  investors: number;
}

interface Vault {
  id: string;
  name: string;
  apy: number;
  tvl: number;
  risk: 'low' | 'medium' | 'high';
  strategy: string;
  verified: boolean;
}

export default function HomePage() {
  const { publicKey, connect, disconnect, connected } = useWallet();
  const [activeTab, setActiveTab] = useState<'vaults' | 'impact' | 'portfolio'>('vaults');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'apy' | 'tvl' | 'risk'>('apy');
  const [selectedProject, setSelectedProject] = useState<ImpactProject | null>(null);
  const [selectedVault, setSelectedVault] = useState<Vault | null>(null);
  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean;
    type: 'vault' | 'impact';
    targetId: string;
    amount: number;
  }>({
    isOpen: false,
    type: 'vault',
    targetId: '',
    amount: 0
  });

  // Mock data for Impact Projects
  const impactProjects: ImpactProject[] = [
    {
      id: '1',
      title: 'Clean Ocean Initiative',
      description: 'AI-powered ocean cleanup using autonomous drones to remove plastic waste',
      category: 'environment',
      targetAmount: 5000000,
      currentAmount: 3200000,
      apy: 12.5,
      impactScore: 95,
      image: '/api/placeholder/300/200',
      verified: true,
      deadline: new Date('2024-12-31'),
      investors: 1247
    },
    {
      id: '2',
      title: 'Global Education Access',
      description: 'Blockchain-based education platform for underserved communities',
      category: 'education',
      targetAmount: 3000000,
      currentAmount: 1800000,
      apy: 15.2,
      impactScore: 88,
      image: '/api/placeholder/300/200',
      verified: true,
      deadline: new Date('2024-11-30'),
      investors: 892
    },
    {
      id: '3',
      title: 'Telemedicine for Rural Areas',
      description: 'Decentralized healthcare network connecting rural communities with doctors',
      category: 'health',
      targetAmount: 7500000,
      currentAmount: 4500000,
      apy: 18.7,
      impactScore: 92,
      image: '/api/placeholder/300/200',
      verified: true,
      deadline: new Date('2025-03-15'),
      investors: 2156
    }
  ];

  // Mock data for Vaults
  const vaults: Vault[] = [
    {
      id: '1',
      name: 'USDC Yield Optimizer',
      apy: 8.5,
      tvl: 2500000,
      risk: 'low',
      strategy: 'Lending + Liquidity Mining',
      verified: true
    },
    {
      id: '2',
      name: 'SOL Staking Plus',
      apy: 12.3,
      tvl: 1800000,
      risk: 'medium',
      strategy: 'Staking + DeFi Farming',
      verified: true
    },
    {
      id: '3',
      name: 'Multi-Asset Strategy',
      apy: 15.7,
      tvl: 3200000,
      risk: 'high',
      strategy: 'Cross-Protocol Yield',
      verified: true
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'environment': return '🌱';
      case 'education': return '📚';
      case 'health': return '🏥';
      case 'technology': return '💻';
      case 'social': return '🤝';
      default: return '💡';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const handleInvest = (project: ImpactProject) => {
    if (!connected) {
      connect();
      return;
    }
    setPaymentModal({
      isOpen: true,
      type: 'impact',
      targetId: project.id,
      amount: 0.1 // Default amount
    });
  };

  const handleDeposit = (vault: Vault) => {
    if (!connected) {
      connect();
      return;
    }
    setPaymentModal({
      isOpen: true,
      type: 'vault',
      targetId: vault.id,
      amount: 0.1 // Default amount
    });
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Магические эффекты */}
      <WowEffects />
      <LiveAnimations />
      <TestCoins />

      {/* Header */}
      <header className="relative bg-black/95 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-purple-500/10">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">AQ</span>
              </div>
              <div className="text-xl font-bold">Aqyldy</div>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search vaults, projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
                <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Wallet */}
            <div className="flex items-center gap-4">
              {connected ? (
                <div className="flex items-center gap-3">
                  <div className="text-sm text-gray-400">
                    {publicKey?.toString().slice(0, 4)}...{publicKey?.toString().slice(-4)}
                  </div>
                  <MagicButton
                    onClick={() => disconnect()}
                    variant="secondary"
                    size="sm"
                  >
                    Disconnect
                  </MagicButton>
                </div>
              ) : (
                <MagicButton
                  onClick={() => connect()}
                  variant="magic"
                  size="md"
                >
                  Connect Wallet
                </MagicButton>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-gradient-to-r from-gray-900 to-gray-800 p-1 rounded-xl w-fit border border-gray-700 shadow-2xl shadow-purple-500/10">
          {[
            { id: 'vaults', label: 'Yield Vaults', count: vaults.length },
            { id: 'impact', label: 'Impact Fund', count: impactProjects.length },
            { id: 'portfolio', label: 'My Portfolio', count: 0 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-md transition-all duration-200 ${activeTab === tab.id
                ? 'bg-white text-black font-medium'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Sort & Filter */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
            >
              <option value="apy">Sort by APY</option>
              <option value="tvl">Sort by TVL</option>
              <option value="risk">Sort by Risk</option>
            </select>
          </div>
          <div className="text-sm text-gray-400">
            {activeTab === 'vaults' && `${vaults.length} vaults available`}
            {activeTab === 'impact' && `${impactProjects.length} impact projects`}
            {activeTab === 'portfolio' && 'Your investments'}
          </div>
        </div>

        {/* Content */}
        {activeTab === 'vaults' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {vaults.map((vault) => (
              <InteractiveCard
                key={vault.id}
                title={vault.name}
                description={vault.strategy}
                apy={vault.apy}
                tvl={vault.tvl}
                risk={vault.risk}
                icon="💰"
                gradient="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-gray-700/50 backdrop-blur-sm shadow-2xl shadow-purple-500/10"
                onClick={() => handleDeposit(vault)}
              />
            ))}
          </div>
        )}

        {activeTab === 'impact' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {impactProjects.map((project) => (
              <InteractiveCard
                key={project.id}
                title={project.title}
                description={project.description}
                apy={project.apy}
                tvl={project.currentAmount}
                risk="low"
                icon={getCategoryIcon(project.category)}
                gradient="bg-gradient-to-br from-purple-900/60 to-blue-900/60 border-purple-500/40 backdrop-blur-sm shadow-2xl shadow-purple-500/20"
                onClick={() => handleInvest(project)}
              />
            ))}
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 animate-bounce">📊</div>
            <h3 className="text-2xl font-semibold text-white mb-2">Your Portfolio</h3>
            <p className="text-gray-400 mb-6">Connect your wallet to view your investments</p>
            {!connected && (
              <MagicButton
                onClick={() => connect()}
                variant="magic"
                size="lg"
              >
                Connect Wallet
              </MagicButton>
            )}
          </div>
        )}
      </main>

      {/* Payment System */}
      {paymentModal.isOpen && (
        <PaymentSystem
          type={paymentModal.type}
          targetId={paymentModal.targetId}
          amount={paymentModal.amount}
          onSuccess={(signature) => {
            console.log('Payment successful:', signature);
            setPaymentModal({ isOpen: false, type: 'vault', targetId: '', amount: 0 });
          }}
          onClose={() => setPaymentModal({ isOpen: false, type: 'vault', targetId: '', amount: 0 })}
        />
      )}

      {/* Дополнительный контент для скролла */}
      <section className="py-16">

        {/* Статистика */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">$97.2M</div>
              <div className="text-gray-400">Total Value Locked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400 mb-2">1,906</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">57,353</div>
              <div className="text-gray-400">Transactions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
              <div className="text-gray-400">Uptime</div>
            </div>
          </div>
        </div>

        {/* Как это работает */}
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold mb-8">Как это работает?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                1
              </div>
              <h4 className="text-xl font-semibold mb-2">Выберите проект</h4>
              <p className="text-gray-400">Выберите социальный проект для инвестирования</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                2
              </div>
              <h4 className="text-xl font-semibold mb-2">Инвестируйте</h4>
              <p className="text-gray-400">Подключите кошелек и инвестируйте SOL</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                3
              </div>
              <h4 className="text-xl font-semibold mb-2">Получайте доход</h4>
              <p className="text-gray-400">Зарабатывайте APY и создавайте позитивное воздействие</p>
            </div>
          </div>
        </div>

        {/* CTA секция */}
        <div className="text-center bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-2xl p-12 mb-16">
          <h3 className="text-3xl font-bold mb-4">Готовы начать?</h3>
          <p className="text-gray-300 mb-8 text-lg">Присоединяйтесь к революции социальных инвестиций</p>
          <MagicButton
            onClick={() => connect()}
            variant="magic"
            size="lg"
          >
            Начать инвестировать
          </MagicButton>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}