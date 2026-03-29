import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Shield, Zap, Globe, TrendingUp, Users, Lock,
  BarChart3, Wallet, ArrowUpRight, ChevronRight, Layers,
  CreditCard, Repeat, Award, Clock, CheckCircle2,
  Activity, PieChart, Bot, Fingerprint, ShieldCheck
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
  { icon: Zap, color: "text-[#0ecb81]", bg: "bg-[#0ecb81]/10", title: "Lightning Fast Engine", desc: "Execute trades in under 5ms with our high-performance matching engine processing 1.4M orders per second." },
  { icon: Shield, color: "text-[#f0b90b]", bg: "bg-[#f0b90b]/10", title: "Bank-Grade Security", desc: "Multi-tier security with cold storage, MPC wallets, 2FA, and a $500M insurance fund protecting your assets 24/7." },
  { icon: Globe, color: "text-[#3b82f6]", bg: "bg-[#3b82f6]/10", title: "600+ Trading Pairs", desc: "Access spot, futures, and options markets with deep liquidity across 600+ cryptocurrencies worldwide." },
  { icon: Wallet, color: "text-[#a855f7]", bg: "bg-[#a855f7]/10", title: "Earn Up to 22% APY", desc: "Put your crypto to work with flexible savings, locked staking, and DeFi yield farming with auto-compounding." },
  { icon: Repeat, color: "text-[#ec4899]", bg: "bg-[#ec4899]/10", title: "Instant Convert", desc: "Swap between any two coins instantly at market rate. Zero slippage, zero hidden fees, one-click execution." },
  { icon: Layers, color: "text-[#06b6d4]", bg: "bg-[#06b6d4]/10", title: "Advanced Futures", desc: "Trade perpetual contracts with up to 125x leverage, cross/isolated margin, and advanced order types." },
];

const whyChoose = [
  { icon: Fingerprint, title: "Proof of Reserves", desc: "100% verifiable on-chain reserves published monthly" },
  { icon: ShieldCheck, title: "SOC 2 Certified", desc: "Enterprise-grade compliance and audit standards" },
  { icon: Bot, title: "API & Bots", desc: "REST & WebSocket APIs for algorithmic trading" },
  { icon: PieChart, title: "Portfolio Analytics", desc: "Real-time P&L tracking and performance insights" },
  { icon: Activity, title: "99.99% Uptime", desc: "Global infrastructure across 6 data centers" },
  { icon: CreditCard, title: "Fiat Gateway", desc: "Buy crypto with credit card, bank transfer, or P2P" },
];

const Index = () => {
  const { assets } = usePrices();
  const topMovers = [...assets].sort((a, b) => Math.abs(b.changePercent24h) - Math.abs(a.changePercent24h)).slice(0, 4);
  const topGainers = [...assets].sort((a, b) => b.changePercent24h - a.changePercent24h).slice(0, 3);
  const topLosers = [...assets].sort((a, b) => a.changePercent24h - b.changePercent24h).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d10] via-[#14151a] to-[#0d0d10]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-[#0ecb81]/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#f0b90b]/4 blur-[120px] rounded-full" />
        <div className="absolute top-1/3 left-0 w-[300px] h-[300px] bg-[#f0b90b]/3 blur-[100px] rounded-full" />

        <div className="relative max-w-[1600px] mx-auto px-4 pt-20 pb-24 lg:pt-28 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0ecb81]/10 border border-[#0ecb81]/20 text-[#0ecb81] text-sm animate-shimmer">
                <Zap className="w-4 h-4" /> The Future of Trading is Here
                <span className="w-2 h-2 rounded-full bg-[#0ecb81] animate-pulse" />
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.05] text-white">
                Trade Crypto<br />
                <span className="brand-text">With Zero</span><br />
                <span className="brand-text">Limits</span>
              </h1>
              <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
                Join 185 million traders on the world's most trusted exchange.
                Buy, sell & trade 600+ cryptocurrencies with ultra-low fees and lightning-fast execution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="brand-gradient text-black font-bold px-10 py-7 text-base hover:opacity-90 hover-scale">
                    Start Trading Free <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/trade">
                  <Button size="lg" variant="outline" className="border-[#2a2a2e] text-white hover:bg-white/5 px-10 py-7 text-base hover-scale">
                    Live Exchange <ArrowUpRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-[#1a1a1e]">
                {stats.map((stat, i) => (
                  <div key={stat.label} className={`space-y-1 animate-count-up delay-${(i + 1) * 100}`}>
                    <div className="flex items-center gap-1.5 text-[#0ecb81]">
                      <stat.icon className="w-4 h-4" />
                      <span className="text-xl font-bold text-white">{stat.value}</span>
                    </div>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="absolute -top-8 -right-4 w-20 h-20 rounded-2xl bg-[#0ecb81]/5 border border-[#0ecb81]/10 animate-float" />
              <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-xl bg-[#f0b90b]/5 border border-[#f0b90b]/10 animate-float delay-300" />
              <div className="bg-[#14151a]/80 border border-[#1a1a1e] rounded-2xl p-6 backdrop-blur-xl glow-brand animate-scale-in">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-white font-heading">Top Movers</h3>
                  <Link to="/markets" className="text-xs text-[#0ecb81] hover:underline flex items-center gap-1">View All <ChevronRight className="w-3 h-3" /></Link>
                </div>
                <div className="space-y-3">
                  {topMovers.map(asset => (
                    <Link key={asset.id} to={`/trade?pair=${asset.symbol}`} className="flex items-center justify-between p-3 rounded-xl hover-glow hover:bg-white/5 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#1a1a1e] flex items-center justify-center text-lg font-bold text-[#f0b90b]">{asset.icon}</div>
                        <div>
                          <div className="font-semibold text-white">{asset.symbol}</div>
                          <div className="text-xs text-gray-500">Vol ${formatVolume(asset.volume24h)}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">${formatPrice(asset.price)}</div>
                        <span className={`text-xs ${asset.changePercent24h >= 0 ? 'text-[#0ecb81]' : 'text-[#f6465d]'}`}>{asset.changePercent24h >= 0 ? '+' : ''}{asset.changePercent24h.toFixed(2)}%</span>
                      </div>
                      <MiniChart data={asset.sparkline} color={asset.changePercent24h >= 0 ? '#0ecb81' : '#f6465d'} width={80} height={30} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GAINERS / LOSERS */}
      <section className="py-14 border-t border-[#1a1a1e]">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#0d0d10] border border-[#1a1a1e] rounded-2xl p-5 hover-glow">
              <h3 className="text-sm font-semibold text-[#0ecb81] mb-4 flex items-center gap-2 font-heading"><TrendingUp className="w-4 h-4" /> Top Gainers (24h)</h3>
              <div className="space-y-3">
                {topGainers.map(asset => (
                  <Link key={asset.id} to={`/trade?pair=${asset.symbol}`} className="flex items-center justify-between hover:bg-white/5 rounded-lg p-2.5 -mx-2 transition-all hover-scale">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1a1a1e] flex items-center justify-center text-sm font-bold text-[#0ecb81]">{asset.icon}</div>
                      <div><span className="font-medium text-white text-sm">{asset.symbol}</span><span className="text-gray-500 text-xs ml-2">{asset.name}</span></div>
                    </div>
                    <div className="text-right">
                      <div className="text-white text-sm">${formatPrice(asset.price)}</div>
                      <div className="text-[#0ecb81] text-xs font-medium">+{asset.changePercent24h.toFixed(2)}%</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="bg-[#0d0d10] border border-[#1a1a1e] rounded-2xl p-5 hover-glow">
              <h3 className="text-sm font-semibold text-[#f6465d] mb-4 flex items-center gap-2 font-heading"><TrendingUp className="w-4 h-4 rotate-180" /> Top Losers (24h)</h3>
              <div className="space-y-3">
                {topLosers.map(asset => (
                  <Link key={asset.id} to={`/trade?pair=${asset.symbol}`} className="flex items-center justify-between hover:bg-white/5 rounded-lg p-2.5 -mx-2 transition-all hover-scale">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1a1a1e] flex items-center justify-center text-sm font-bold text-[#f6465d]">{asset.icon}</div>
                      <div><span className="font-medium text-white text-sm">{asset.symbol}</span><span className="text-gray-500 text-xs ml-2">{asset.name}</span></div>
                    </div>
                    <div className="text-right">
                      <div className="text-white text-sm">${formatPrice(asset.price)}</div>
                      <div className="text-[#f6465d] text-xs font-medium">{asset.changePercent24h.toFixed(2)}%</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARKET TABLE */}
      <section className="py-14 border-t border-[#1a1a1e]">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div><h2 className="text-3xl font-bold text-white">Live Market Prices</h2><p className="text-gray-500 mt-1">Real-time cryptocurrency prices updated every second</p></div>
            <Link to="/markets" className="text-[#0ecb81] text-sm font-medium hover:underline flex items-center gap-1">See All Markets <ChevronRight className="w-4 h-4" /></Link>
          </div>
          <div className="bg-[#0d0d10] rounded-2xl border border-[#1a1a1e] overflow-hidden"><MarketTable assets={assets} /></div>
        </div>
      </section>

      {/* 6 FEATURE CARDS */}
      <section className="py-20 bg-[#0a0a0d] border-t border-[#1a1a1e]">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Everything You Need to <span className="brand-text">Trade Like a Pro</span></h2>
            <p className="text-gray-500 max-w-xl mx-auto">Professional-grade tools built for everyone — from first-time buyers to institutional traders.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(feature => (
              <div key={feature.title} className="p-7 rounded-2xl bg-[#14151a] border border-[#1a1a1e] hover-lift hover-glow group">
                <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#0ecb81] transition-colors">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE ALCON */}
      <section className="py-20 border-t border-[#1a1a1e]">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why Millions Trust <span className="brand-text">ALCON</span></h2>
              <p className="text-gray-400 mb-8 leading-relaxed">We've built the most secure, reliable, and feature-rich crypto exchange on the planet. Every system is designed with security-first architecture and battle-tested at scale.</p>
              <div className="grid grid-cols-2 gap-4">
                {whyChoose.map(item => (
                  <div key={item.title} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.02] transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-[#0ecb81]/10 flex items-center justify-center shrink-0 group-hover:bg-[#0ecb81]/20 transition-colors"><item.icon className="w-5 h-5 text-[#0ecb81]" /></div>
                    <div><h4 className="text-sm font-semibold text-white">{item.title}</h4><p className="text-xs text-gray-500 mt-0.5">{item.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {[
                { value: "$76.4B", label: "Daily Volume", color: "border-[#0ecb81]/20" },
                { value: "185M+", label: "Active Users", color: "border-[#f0b90b]/20" },
                { value: "<5ms", label: "Trade Execution", color: "border-[#3b82f6]/20" },
                { value: "99.99%", label: "Platform Uptime", color: "border-[#a855f7]/20" },
              ].map(card => (
                <div key={card.label} className={`bg-[#0d0d10] border ${card.color} rounded-2xl p-6 text-center hover-lift`}>
                  <div className="text-3xl font-black text-white mb-1">{card.value}</div>
                  <p className="text-sm text-gray-500">{card.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-[#0a0a0d] border-t border-[#1a1a1e]">
        <div className="max-w-[1600px] mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Start Trading in <span className="brand-text">3 Simple Steps</span></h2>
          <p className="text-gray-500 max-w-lg mx-auto mb-14">From signup to your first trade in under 2 minutes.</p>
          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "01", icon: Award, title: "Create Account", desc: "Sign up with email and verify. Get $10,000 demo balance to practice risk-free." },
              { step: "02", icon: CreditCard, title: "Fund Your Wallet", desc: "Deposit crypto or buy with credit card, bank transfer, Apple Pay, or Google Pay." },
              { step: "03", icon: BarChart3, title: "Start Trading", desc: "Trade spot, futures, earn yield, swap coins — all from one powerful platform." },
            ].map((item, i) => (
              <div key={item.step} className="relative text-center">
                {i < 2 && <div className="hidden sm:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-[#0ecb81]/30 to-transparent" />}
                <div className="w-16 h-16 rounded-2xl brand-gradient flex items-center justify-center mx-auto mb-5 hover-lift"><item.icon className="w-7 h-7 text-black" /></div>
                <div className="text-xs font-bold text-[#0ecb81] mb-2">STEP {item.step}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-20 border-t border-[#1a1a1e]">
        <div className="max-w-[1600px] mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Explore Our <span className="brand-text">Products</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: BarChart3, title: "Spot Trading", desc: "600+ pairs with deep liquidity", link: "/trade", color: "#0ecb81" },
              { icon: TrendingUp, title: "Futures", desc: "Up to 125x leverage", link: "/futures", color: "#f0b90b" },
              { icon: Wallet, title: "Earn & Stake", desc: "Up to 22% APY", link: "/earn", color: "#3b82f6" },
              { icon: Repeat, title: "Convert", desc: "Instant zero-fee swaps", link: "/convert", color: "#a855f7" },
            ].map(prod => (
              <Link key={prod.title} to={prod.link} className="bg-[#0d0d10] border border-[#1a1a1e] rounded-2xl p-6 hover-lift hover-glow group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${prod.color}15` }}><prod.icon className="w-6 h-6" style={{ color: prod.color }} /></div>
                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-[#0ecb81] transition-colors">{prod.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{prod.desc}</p>
                <span className="text-[#0ecb81] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">Explore <ArrowRight className="w-4 h-4" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY BANNER */}
      <section className="py-16 bg-gradient-to-r from-[#0ecb81]/5 via-[#0a0a0d] to-[#f0b90b]/5 border-t border-[#1a1a1e]">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#0ecb81]/10 flex items-center justify-center shrink-0"><ShieldCheck className="w-8 h-8 text-[#0ecb81]" /></div>
              <div><h3 className="text-xl font-bold text-white">Your Assets Are Protected</h3><p className="text-gray-400 text-sm mt-1">95% cold storage · $500M insurance fund · SOC 2 certified · 24/7 monitoring</p></div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {["Audited by CertiK", "ISO 27001", "SOC 2 Type II"].map(badge => (
                <span key={badge} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1a1a1e] text-xs text-gray-400 border border-[#2a2a2e]"><CheckCircle2 className="w-3 h-3 text-[#0ecb81]" /> {badge}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0e] to-[#0a0a0d]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#0ecb81]/5 blur-[120px] rounded-full" />
        <div className="relative max-w-[1600px] mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5">Ready to Start Your <span className="brand-text">Crypto Journey?</span></h2>
          <p className="text-gray-400 mb-10 max-w-lg mx-auto text-lg">Create your free account and start trading in under 2 minutes. No minimum deposit required.</p>
          <Link to="/register"><Button size="lg" className="brand-gradient text-black font-bold px-12 py-7 text-lg hover:opacity-90 hover-scale">Create Free Account <ArrowRight className="w-5 h-5 ml-2" /></Button></Link>
          <p className="text-gray-600 text-sm mt-6 flex items-center justify-center gap-2"><Clock className="w-4 h-4" /> Takes less than 2 minutes · No credit card required</p>
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="py-10 border-t border-[#1a1a1e]">
        <div className="max-w-[1600px] mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm mb-6">Backed by leading institutions worldwide</p>
          <div className="flex flex-wrap justify-center gap-10 opacity-30">
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
