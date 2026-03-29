import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Shield, Zap, Globe, TrendingUp, Users, Lock,
  BarChart3, Wallet, ArrowUpRight, ChevronRight, Layers,
  CreditCard, Repeat, Award, Clock, CheckCircle2,
  Activity, PieChart, Bot, Fingerprint, ShieldCheck, Star, Quote
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
  { icon: Zap, color: "text-[#3b82f6]", bg: "bg-[#3b82f6]/10", title: "Lightning Fast Engine", desc: "Execute trades in under 5ms with our matching engine processing 1.4M orders per second." },
  { icon: Shield, color: "text-[#0ecb81]", bg: "bg-[#0ecb81]/10", title: "Bank-Grade Security", desc: "Multi-tier security with cold storage, MPC wallets, 2FA, and a $500M insurance fund." },
  { icon: Globe, color: "text-[#60a5fa]", bg: "bg-[#60a5fa]/10", title: "600+ Trading Pairs", desc: "Access spot, futures, and options with deep liquidity across 600+ cryptocurrencies." },
  { icon: Wallet, color: "text-[#a855f7]", bg: "bg-[#a855f7]/10", title: "Earn Up to 22% APY", desc: "Flexible savings, locked staking, and DeFi yield farming with auto-compounding." },
  { icon: Repeat, color: "text-[#ec4899]", bg: "bg-[#ec4899]/10", title: "Instant Convert", desc: "Swap any two coins instantly at market rate. Zero slippage, one-click execution." },
  { icon: Layers, color: "text-[#06b6d4]", bg: "bg-[#06b6d4]/10", title: "Advanced Futures", desc: "Perpetual contracts up to 125x leverage with cross/isolated margin modes." },
];

const testimonials = [
  {
    name: "Michael Torres", role: "Professional Trader", avatar: "MT",
    text: "I've used every major exchange out there. ALCON's execution speed is unmatched — my limit orders fill instantly, and the interface is the cleanest I've seen. Moved 90% of my portfolio here.",
    rating: 5,
  },
  {
    name: "Sarah Chen", role: "DeFi Researcher", avatar: "SC",
    text: "The Earn products are genuinely competitive. I'm getting 12% APY on my ETH with locked staking, and the auto-compounding on DeFi vaults is a game changer. Trustworthy and transparent.",
    rating: 5,
  },
  {
    name: "James Okonkwo", role: "Crypto Investor", avatar: "JO",
    text: "What sold me was the security. After the FTX collapse, I needed an exchange I could trust. ALCON's proof-of-reserves and cold storage gave me the confidence to go all in.",
    rating: 5,
  },
  {
    name: "Elena Volkov", role: "Futures Trader", avatar: "EV",
    text: "125x leverage with a liquidation engine that actually works. I've tested it under extreme volatility and never got unfairly liquidated. The funding rates are also very competitive.",
    rating: 5,
  },
  {
    name: "David Park", role: "Startup Founder", avatar: "DP",
    text: "We integrated ALCON's API into our fintech app in under a day. The documentation is excellent, WebSocket feeds are rock-solid, and their support team actually responds within minutes.",
    rating: 5,
  },
  {
    name: "Amira Hassan", role: "First-Time Investor", avatar: "AH",
    text: "I was terrified of crypto until I found ALCON. The demo account let me practice without risk, and the Convert feature makes swapping coins so simple. Now I'm hooked!",
    rating: 5,
  },
];

const whyChoose = [
  { icon: Fingerprint, title: "Proof of Reserves", desc: "100% verifiable on-chain reserves published monthly" },
  { icon: ShieldCheck, title: "SOC 2 Certified", desc: "Enterprise-grade compliance and audit standards" },
  { icon: Bot, title: "API & Bots", desc: "REST & WebSocket APIs for algorithmic trading" },
  { icon: PieChart, title: "Portfolio Analytics", desc: "Real-time P&L tracking and performance insights" },
  { icon: Activity, title: "99.99% Uptime", desc: "Global infrastructure across 6 data centers" },
  { icon: CreditCard, title: "Fiat Gateway", desc: "Buy crypto with card, bank transfer, or P2P" },
];

const Index = () => {
  const { assets } = usePrices();
  const topMovers = [...assets].sort((a, b) => Math.abs(b.changePercent24h) - Math.abs(a.changePercent24h)).slice(0, 4);
  const topGainers = [...assets].sort((a, b) => b.changePercent24h - a.changePercent24h).slice(0, 3);
  const topLosers = [...assets].sort((a, b) => a.changePercent24h - b.changePercent24h).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        {/* Animated background orbs */}
        <div className="absolute inset-0 bg-[#0b0b0e]" />
        <div className="absolute top-[-10%] left-[20%] w-[700px] h-[700px] bg-[#3b82f6]/8 blur-[180px] rounded-full animate-float" />
        <div className="absolute bottom-[-5%] right-[10%] w-[500px] h-[500px] bg-[#2563eb]/6 blur-[150px] rounded-full animate-float delay-300" />
        <div className="absolute top-[40%] left-[-5%] w-[400px] h-[400px] bg-[#0ecb81]/4 blur-[120px] rounded-full animate-float delay-500" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="relative max-w-[1600px] mx-auto px-4 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/20 text-[#60a5fa] text-sm animate-fade-in-up">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3b82f6] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#60a5fa]"></span>
                </span>
                Trusted by 185M+ Traders Worldwide
              </div>

              {/* H1 — New powerful headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] text-white animate-fade-in-up delay-100">
                The Smarter Way<br />
                to <span className="brand-text">Buy, Sell &</span><br />
                <span className="brand-text">Trade</span> Crypto
              </h1>

              <p className="text-lg text-gray-400 max-w-lg leading-relaxed animate-fade-in-up delay-200">
                Ultra-low fees. Lightning execution. 600+ coins.
                From your first Bitcoin to advanced futures — ALCON has everything you need.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
                <Link to="/register">
                  <Button size="lg" className="brand-gradient text-white font-bold px-10 py-7 text-base hover:opacity-90 hover-scale shadow-lg shadow-[#3b82f6]/20">
                    Get Started — It's Free <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/trade">
                  <Button size="lg" variant="outline" className="border-[#2a2a2e] text-white hover:bg-white/5 px-10 py-7 text-base hover-scale">
                    Open Live Exchange <ArrowUpRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>

              {/* Live animated stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-[#1a1a1e] animate-fade-in-up delay-400">
                {stats.map(stat => (
                  <div key={stat.label} className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <stat.icon className="w-4 h-4 text-[#3b82f6]" />
                      <span className="text-xl font-bold text-white">{stat.value}</span>
                    </div>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Right — Live Top Movers Card */}
            <div className="hidden lg:block relative">
              <div className="absolute -top-10 -right-6 w-24 h-24 rounded-3xl bg-[#3b82f6]/5 border border-[#3b82f6]/10 animate-float rotate-12" />
              <div className="absolute -bottom-8 -left-8 w-20 h-20 rounded-2xl bg-[#0ecb81]/5 border border-[#0ecb81]/10 animate-float delay-400 -rotate-6" />
              <div className="absolute top-1/2 -right-4 w-12 h-12 rounded-xl bg-[#a855f7]/5 border border-[#a855f7]/10 animate-float delay-200" />

              <div className="bg-[#14151a]/90 border border-[#1e2030] rounded-2xl p-6 backdrop-blur-xl glow-brand animate-scale-in">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-white font-heading flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#3b82f6]" /> Live Top Movers
                  </h3>
                  <Link to="/markets" className="text-xs text-[#60a5fa] hover:underline flex items-center gap-1">View All <ChevronRight className="w-3 h-3" /></Link>
                </div>
                <div className="space-y-2">
                  {topMovers.map(asset => (
                    <Link key={asset.id} to={`/trade?pair=${asset.symbol}`} className="flex items-center justify-between p-3 rounded-xl hover-glow hover:bg-white/5 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#1a1a1e] flex items-center justify-center text-lg font-bold text-[#60a5fa]">{asset.icon}</div>
                        <div>
                          <div className="font-semibold text-white text-sm">{asset.symbol}</div>
                          <div className="text-xs text-gray-500">Vol ${formatVolume(asset.volume24h)}</div>
                        </div>
                      </div>
                      <div className="text-right mr-2">
                        <div className="text-white text-sm font-medium">${formatPrice(asset.price)}</div>
                        <span className={`text-xs font-medium ${asset.changePercent24h >= 0 ? 'text-[#0ecb81]' : 'text-[#f6465d]'}`}>{asset.changePercent24h >= 0 ? '+' : ''}{asset.changePercent24h.toFixed(2)}%</span>
                      </div>
                      <MiniChart data={asset.sparkline} color={asset.changePercent24h >= 0 ? '#0ecb81' : '#f6465d'} width={70} height={28} />
                    </Link>
                  ))}
                </div>
                {/* Live indicator */}
                <div className="mt-4 pt-3 border-t border-[#1a1a1e] flex items-center justify-center gap-2 text-xs text-gray-500">
                  <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0ecb81] opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-[#0ecb81]"></span></span>
                  Prices updating live
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GAINERS / LOSERS ===== */}
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

      {/* ===== MARKET TABLE ===== */}
      <section className="py-14 border-t border-[#1a1a1e]">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div><h2 className="text-3xl font-bold text-white">Live Market Prices</h2><p className="text-gray-500 mt-1">Real-time prices updated every second</p></div>
            <Link to="/markets" className="text-[#60a5fa] text-sm font-medium hover:underline flex items-center gap-1">See All Markets <ChevronRight className="w-4 h-4" /></Link>
          </div>
          <div className="bg-[#0d0d10] rounded-2xl border border-[#1a1a1e] overflow-hidden"><MarketTable assets={assets} /></div>
        </div>
      </section>

      {/* ===== FEATURE CARDS ===== */}
      <section className="py-20 bg-[#0a0a0d] border-t border-[#1a1a1e]">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Built for Serious Traders.<br /><span className="brand-text">Simple Enough for Everyone.</span></h2>
            <p className="text-gray-500 max-w-xl mx-auto">Professional-grade tools wrapped in an interface anyone can master in minutes.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(feature => (
              <div key={feature.title} className="p-7 rounded-2xl bg-[#14151a] border border-[#1a1a1e] hover-lift hover-glow group">
                <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#60a5fa] transition-colors">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 border-t border-[#1a1a1e]">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Loved by Traders <span className="brand-text">Around the World</span></h2>
            <p className="text-gray-500 max-w-xl mx-auto">Don't take our word for it. Here's what real users have to say about ALCON.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="bg-[#0d0d10] border border-[#1a1a1e] rounded-2xl p-6 hover-lift hover-glow group relative">
                <Quote className="absolute top-4 right-4 w-8 h-8 text-[#3b82f6]/10 group-hover:text-[#3b82f6]/20 transition-colors" />
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#f0b90b] text-[#f0b90b]" />
                  ))}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed mb-5 relative z-10">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-[#1a1a1e]">
                  <div className="w-10 h-10 rounded-full brand-gradient flex items-center justify-center text-xs font-bold text-white">{t.avatar}</div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY TRUST ALCON ===== */}
      <section className="py-20 bg-[#0a0a0d] border-t border-[#1a1a1e]">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why Millions Trust <span className="brand-text">ALCON</span></h2>
              <p className="text-gray-400 mb-8 leading-relaxed">Security-first architecture, battle-tested at scale. Every system designed to protect your assets and maximize your trading edge.</p>
              <div className="grid grid-cols-2 gap-4">
                {whyChoose.map(item => (
                  <div key={item.title} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.02] transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center shrink-0 group-hover:bg-[#3b82f6]/20 transition-colors"><item.icon className="w-5 h-5 text-[#3b82f6]" /></div>
                    <div><h4 className="text-sm font-semibold text-white">{item.title}</h4><p className="text-xs text-gray-500 mt-0.5">{item.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {[
                { value: "$76.4B", label: "Daily Volume", color: "border-[#3b82f6]/20 bg-[#3b82f6]/5" },
                { value: "185M+", label: "Active Users", color: "border-[#0ecb81]/20 bg-[#0ecb81]/5" },
                { value: "<5ms", label: "Trade Execution", color: "border-[#60a5fa]/20 bg-[#60a5fa]/5" },
                { value: "99.99%", label: "Platform Uptime", color: "border-[#a855f7]/20 bg-[#a855f7]/5" },
              ].map(card => (
                <div key={card.label} className={`${card.color} border rounded-2xl p-6 text-center hover-lift`}>
                  <div className="text-3xl font-black text-white mb-1">{card.value}</div>
                  <p className="text-sm text-gray-500">{card.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20 border-t border-[#1a1a1e]">
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
                {i < 2 && <div className="hidden sm:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-[#3b82f6]/30 to-transparent" />}
                <div className="w-16 h-16 rounded-2xl brand-gradient flex items-center justify-center mx-auto mb-5 hover-lift"><item.icon className="w-7 h-7 text-white" /></div>
                <div className="text-xs font-bold text-[#60a5fa] mb-2">STEP {item.step}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS ===== */}
      <section className="py-20 bg-[#0a0a0d] border-t border-[#1a1a1e]">
        <div className="max-w-[1600px] mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Explore Our <span className="brand-text">Products</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: BarChart3, title: "Spot Trading", desc: "600+ pairs with deep liquidity", link: "/trade", color: "#3b82f6" },
              { icon: TrendingUp, title: "Futures", desc: "Up to 125x leverage", link: "/futures", color: "#0ecb81" },
              { icon: Wallet, title: "Earn & Stake", desc: "Up to 22% APY", link: "/earn", color: "#a855f7" },
              { icon: Repeat, title: "Convert", desc: "Instant zero-fee swaps", link: "/convert", color: "#ec4899" },
            ].map(prod => (
              <Link key={prod.title} to={prod.link} className="bg-[#0d0d10] border border-[#1a1a1e] rounded-2xl p-6 hover-lift hover-glow group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${prod.color}15` }}><prod.icon className="w-6 h-6" style={{ color: prod.color }} /></div>
                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-[#60a5fa] transition-colors">{prod.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{prod.desc}</p>
                <span className="text-[#60a5fa] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">Explore <ArrowRight className="w-4 h-4" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECURITY ===== */}
      <section className="py-16 bg-gradient-to-r from-[#3b82f6]/5 via-[#0b0b0e] to-[#0ecb81]/5 border-t border-[#1a1a1e]">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#3b82f6]/10 flex items-center justify-center shrink-0"><ShieldCheck className="w-8 h-8 text-[#3b82f6]" /></div>
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

      {/* ===== FINAL CTA ===== */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0e] to-[#0a0a0d]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#3b82f6]/5 blur-[150px] rounded-full" />
        <div className="relative max-w-[1600px] mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5">Your Crypto Journey <span className="brand-text">Starts Here</span></h2>
          <p className="text-gray-400 mb-10 max-w-lg mx-auto text-lg">Join 185 million traders. No minimum deposit. Start in under 2 minutes.</p>
          <Link to="/register"><Button size="lg" className="brand-gradient text-white font-bold px-12 py-7 text-lg hover:opacity-90 hover-scale shadow-lg shadow-[#3b82f6]/20">Create Free Account <ArrowRight className="w-5 h-5 ml-2" /></Button></Link>
          <p className="text-gray-600 text-sm mt-6 flex items-center justify-center gap-2"><Clock className="w-4 h-4" /> No credit card required · Free demo with $10K USDT</p>
        </div>
      </section>

      {/* ===== TRUSTED BY ===== */}
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
