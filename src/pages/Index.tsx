import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Shield, Zap, Globe, TrendingUp, Users, Lock,
  BarChart3, Wallet, ArrowUpRight, ChevronRight
} from "lucide-react";
import { usePrices } from "@/contexts/PriceContext";
import { formatPrice, formatVolume } from "@/lib/crypto-data";
import MarketTable from "@/components/MarketTable";
import MiniChart from "@/components/MiniChart";

const stats = [
  { label: "24h Trading Volume", value: "$76.4B", icon: BarChart3 },
  { label: "Registered Users", value: "185M+", icon: Users },
  { label: "Supported Countries", value: "180+", icon: Globe },
  { label: "Assets Secured", value: "$12.8B", icon: Lock },
];

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Execute trades in milliseconds with our high-performance matching engine capable of 1.4M orders per second.",
  },
  {
    icon: Shield,
    title: "Bank-Grade Security",
    desc: "Multi-tier security architecture with cold storage, 2FA, and real-time risk monitoring to protect your assets.",
  },
  {
    icon: Globe,
    title: "Global Coverage",
    desc: "Trade 600+ cryptocurrencies with deep liquidity across spot, futures, and options markets worldwide.",
  },
  {
    icon: Wallet,
    title: "Earn & Stake",
    desc: "Put your crypto to work with flexible savings, locked staking, and DeFi yield farming up to 120% APY.",
  },
];

const Index = () => {
  const { assets } = usePrices();
  const topMovers = [...assets].sort((a, b) => Math.abs(b.changePercent24h) - Math.abs(a.changePercent24h)).slice(0, 4);
  const topGainers = [...assets].sort((a, b) => b.changePercent24h - a.changePercent24h).slice(0, 3);
  const topLosers = [...assets].sort((a, b) => a.changePercent24h - b.changePercent24h).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d10] via-[#14151a] to-[#0d0d10]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#0ecb81]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#3b82f6]/5 blur-[100px] rounded-full" />

        <div className="relative max-w-[1600px] mx-auto px-4 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0ecb81]/10 border border-[#0ecb81]/20 text-[#0ecb81] text-sm">
                <Zap className="w-4 h-4" />
                The Future of Trading is Here
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] text-white">
                Buy, Sell &<br />
                <span className="brand-text">Trade Crypto</span><br />
                with Confidence
              </h1>
              <p className="text-lg text-gray-400 max-w-lg">
                Join 185 million users on the world's most trusted cryptocurrency exchange.
                Trade Bitcoin, Ethereum, and 600+ altcoins with ultra-low fees.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/register">
                  <Button size="lg" className="brand-gradient text-black font-bold px-8 py-6 text-base hover:opacity-90">
                    Get Started Free <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/trade">
                  <Button size="lg" variant="outline" className="border-[#2a2a2e] text-white hover:bg-white/5 px-8 py-6 text-base">
                    Start Trading <ArrowUpRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                {stats.map(stat => (
                  <div key={stat.label} className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[#0ecb81]">
                      <stat.icon className="w-4 h-4" />
                      <span className="text-lg font-bold text-white">{stat.value}</span>
                    </div>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Right - Top Movers Card */}
            <div className="hidden lg:block">
              <div className="bg-[#14151a]/80 border border-[#1a1a1e] rounded-2xl p-6 backdrop-blur-xl glow-brand">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-white">Top Movers</h3>
                  <Link to="/markets" className="text-xs text-[#0ecb81] hover:underline flex items-center gap-1">
                    View All <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="space-y-4">
                  {topMovers.map(asset => (
                    <Link
                      key={asset.id}
                      to={`/trade?pair=${asset.symbol}`}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#1a1a1e] flex items-center justify-center text-lg font-bold text-[#0ecb81]">
                          {asset.icon}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{asset.symbol}</div>
                          <div className="text-xs text-gray-500">Vol ${formatVolume(asset.volume24h)}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">${formatPrice(asset.price)}</div>
                        <span className={`text-xs ${asset.changePercent24h >= 0 ? 'text-[#0ecb81]' : 'text-[#f6465d]'}`}>
                          {asset.changePercent24h >= 0 ? '+' : ''}{asset.changePercent24h.toFixed(2)}%
                        </span>
                      </div>
                      <MiniChart
                        data={asset.sparkline}
                        color={asset.changePercent24h >= 0 ? '#0ecb81' : '#f6465d'}
                        width={80}
                        height={30}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Ticker - Gainers & Losers */}
      <section className="py-12 border-t border-[#1a1a1e]">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#0d0d10] border border-[#1a1a1e] rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-[#0ecb81] mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Top Gainers (24h)
              </h3>
              <div className="space-y-3">
                {topGainers.map(asset => (
                  <Link key={asset.id} to={`/trade?pair=${asset.symbol}`} className="flex items-center justify-between hover:bg-white/5 rounded-lg p-2 -mx-2 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1a1a1e] flex items-center justify-center text-sm font-bold text-[#0ecb81]">{asset.icon}</div>
                      <div>
                        <span className="font-medium text-white text-sm">{asset.symbol}</span>
                        <span className="text-gray-500 text-xs ml-2">{asset.name}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white text-sm">${formatPrice(asset.price)}</div>
                      <div className="text-[#0ecb81] text-xs">+{asset.changePercent24h.toFixed(2)}%</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="bg-[#0d0d10] border border-[#1a1a1e] rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-[#f6465d] mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 rotate-180" /> Top Losers (24h)
              </h3>
              <div className="space-y-3">
                {topLosers.map(asset => (
                  <Link key={asset.id} to={`/trade?pair=${asset.symbol}`} className="flex items-center justify-between hover:bg-white/5 rounded-lg p-2 -mx-2 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1a1a1e] flex items-center justify-center text-sm font-bold text-[#f6465d]">{asset.icon}</div>
                      <div>
                        <span className="font-medium text-white text-sm">{asset.symbol}</span>
                        <span className="text-gray-500 text-xs ml-2">{asset.name}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white text-sm">${formatPrice(asset.price)}</div>
                      <div className="text-[#f6465d] text-xs">{asset.changePercent24h.toFixed(2)}%</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Market Prices */}
      <section className="py-16 border-t border-[#1a1a1e]">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white">Live Market Prices</h2>
              <p className="text-gray-500 mt-1">Real-time cryptocurrency prices with 24h stats</p>
            </div>
            <Link to="/markets" className="text-[#0ecb81] text-sm font-medium hover:underline flex items-center gap-1">
              See All Markets <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="bg-[#0d0d10] rounded-2xl border border-[#1a1a1e] overflow-hidden">
            <MarketTable assets={assets.slice(0, 10)} />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-[#0a0a0d] border-t border-[#1a1a1e]">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Why Choose KORYPTO</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Built for performance, designed for everyone. From beginners to professional traders.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(feature => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl bg-[#14151a] border border-[#1a1a1e] hover:border-[#0ecb81]/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0ecb81]/10 flex items-center justify-center mb-4 group-hover:bg-[#0ecb81]/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-[#0ecb81]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 relative overflow-hidden border-t border-[#1a1a1e]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0ecb81]/5 via-transparent to-[#3b82f6]/5" />
        <div className="relative max-w-[1600px] mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Start Trading in Minutes
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Create a free account, deposit funds, and begin trading 600+ cryptocurrencies with industry-leading security.
          </p>
          <div className="grid sm:grid-cols-3 gap-8 mt-12 max-w-3xl mx-auto">
            {[
              { step: "01", title: "Create Account", desc: "Sign up with your email and get $10,000 demo balance instantly" },
              { step: "02", title: "Choose Your Market", desc: "Browse 600+ cryptocurrencies across spot, futures, and earn products" },
              { step: "03", title: "Start Trading", desc: "Execute trades with real-time pricing and professional tools" },
            ].map(item => (
              <div key={item.step} className="text-center">
                <div className="text-4xl font-black brand-text mb-3">{item.step}</div>
                <h3 className="font-semibold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link to="/register">
              <Button size="lg" className="brand-gradient text-black font-bold px-10 py-6 text-base">
                Create Free Account <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted Partners */}
      <section className="py-12 border-t border-[#1a1a1e]">
        <div className="max-w-[1600px] mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm mb-6">Trusted by leading institutions worldwide</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-40">
            {["Goldman Sachs", "Fidelity", "BlackRock", "Sequoia", "a16z", "Paradigm"].map(name => (
              <div key={name} className="text-lg font-bold text-gray-500">{name}</div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
