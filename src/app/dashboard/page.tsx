"use client";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import Link from "next/link";

type Point = { t: string; apy: number; tvl: number; risk: number };

export default function DashboardPage() {
    const [data, setData] = useState<Point[]>([]);

    useEffect(() => {
        // Демо-данные: подстраиваемся под время
        const now = Date.now();
        const base: Point[] = Array.from({ length: 20 }).map((_, i) => ({
            t: new Date(now - (19 - i) * 60_000).toLocaleTimeString(),
            apy: 12 + Math.sin(i / 3) * 0.3,
            tvl: 12_500 + i * 15 + Math.sin(i / 2) * 50,
            risk: 70 + Math.sin(i / 4) * 5,
        }));
        setData(base);
        const id = setInterval(() => {
            setData((prev) => {
                const next = prev.slice(1);
                const last = prev[prev.length - 1];
                next.push({
                    t: new Date().toLocaleTimeString(),
                    apy: Math.max(10, Math.min(25, last.apy + (Math.random() - 0.5) * 0.2)),
                    tvl: Math.max(10_000, last.tvl + (Math.random() - 0.4) * 60),
                    risk: Math.max(40, Math.min(95, last.risk + (Math.random() - 0.5) * 1)),
                });
                return next;
            });
        }, 5000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold gradient-text mb-2">Analytics Dashboard</h1>
                    <p className="text-gray-400">Real-time insights into your DeFi portfolio performance</p>
                </div>
                <Link href="/" className="btn-secondary flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Vaults
                </Link>
            </div>

            <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                <Stat
                    label="Current APY"
                    value={`${data.at(-1)?.apy.toFixed(2) ?? "—"}%`}
                    change="+0.3%"
                    icon="📈"
                />
                <Stat
                    label="Total Value Locked"
                    value={`$${(data.at(-1)?.tvl ?? 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                    change="+2.1%"
                    icon="💰"
                />
                <Stat
                    label="Risk Score"
                    value={`${data.at(-1)?.risk.toFixed(0) ?? "—"}`}
                    change="-1.2%"
                    icon="🛡️"
                />
                <Stat
                    label="Active Strategies"
                    value="12"
                    change="+2"
                    icon="⚡"
                />
            </section>

            <section className="grid gap-8 lg:grid-cols-2">
                <Card title="APY Performance" subtitle="Historical yield trends">
                    <Chart data={data} dataKey="apy" color="#8b5cf6" />
                </Card>
                <Card title="TVL Growth" subtitle="Total value locked over time">
                    <Chart data={data} dataKey="tvl" color="#10b981" />
                </Card>
                <Card title="Risk Assessment" subtitle="Portfolio risk metrics">
                    <Chart data={data} dataKey="risk" color="#f59e0b" />
                </Card>
                <Card title="Strategy Performance" subtitle="Individual vault performance">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                <span className="font-medium">USDC Auto-Compound</span>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-green-400">+12.4%</div>
                                <div className="text-xs text-gray-400">APY</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                <span className="font-medium">SOL Staking Plus</span>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-yellow-400">+18.7%</div>
                                <div className="text-xs text-gray-400">APY</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                <span className="font-medium">Multi-Asset Vault</span>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-red-400">+15.2%</div>
                                <div className="text-xs text-gray-400">APY</div>
                            </div>
                        </div>
                    </div>
                </Card>
            </section>
        </div>
    );
}

function Stat({ label, value, change, icon }: {
    label: string;
    value: string;
    change?: string;
    icon?: string;
}) {
    return (
        <div className="card hover-lift">
            <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-400">{label}</div>
                {icon && <span className="text-2xl">{icon}</span>}
            </div>
            <div className="text-2xl font-bold gradient-text mb-1">{value}</div>
            {change && (
                <div className={`text-xs font-medium ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                    }`}>
                    {change}
                </div>
            )}
        </div>
    );
}

function Card({ title, subtitle, children }: {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="card hover-lift">
            <div className="mb-6">
                <div className="text-lg font-bold gradient-text mb-1">{title}</div>
                {subtitle && <div className="text-sm text-gray-400">{subtitle}</div>}
            </div>
            {children}
        </div>
    );
}

function Chart({ data, dataKey, color = "#8b5cf6" }: {
    data: Point[];
    dataKey: keyof Point;
    color?: string;
}) {
    return (
        <div className="w-full h-64">
            <ResponsiveContainer>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                        dataKey="t"
                        stroke="#9ca3af"
                        fontSize={12}
                    />
                    <YAxis
                        stroke="#9ca3af"
                        fontSize={12}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1f1f1f',
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#ffffff'
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey={dataKey}
                        stroke={color}
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 6, fill: color }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
