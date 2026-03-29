import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Palette, Layers, Shield, Zap, Globe, ArrowRight, CheckCircle2,
  Monitor, Smartphone, Code, Headphones, BarChart3, Lock, Users,
  Star, ChevronRight, Eye
} from "lucide-react";

// 5 White Label Template Designs
const templates = [
  {
    id: "aurora",
    name: "Aurora Pro",
    tagline: "Premium Dark Exchange",
    description: "Sleek dark theme with neon blue accents. Built for professional traders who demand speed and precision.",
    colors: { primary: "#3b82f6", secondary: "#1e40af", bg: "#0a0e1a", card: "#111827", accent: "#60a5fa" },
    features: ["Advanced charting", "Multi-monitor support", "Dark/Light modes", "TradingView integration"],
    category: "Professional",
    popular: true,
  },
  {
    id: "emerald",
    name: "Emerald Exchange",
    tagline: "Trust & Growth",
    description: "Green-accented design that communicates trust and growth. Perfect for exchanges targeting emerging markets.",
    colors: { primary: "#0ecb81", secondary: "#059669", bg: "#0b1217", card: "#0f1a1f", accent: "#34d399" },
    features: ["P2P trading module", "Multi-language support", "Fiat gateway UI", "KYC flow included"],
    category: "Emerging Markets",
    popular: false,
  },
  {
    id: "nova",
    name: "Nova Finance",
    tagline: "Modern Minimalist",
    description: "Clean, minimal design with purple gradients. Ideal for fintech startups and modern crypto platforms.",
    colors: { primary: "#8b5cf6", secondary: "#6d28d9", bg: "#0d0b14", card: "#16131f", accent: "#a78bfa" },
    features: ["Onboarding wizard", "Portfolio dashboard", "Social trading", "Copy trading UI"],
    category: "Fintech",
    popular: true,
  },
  {
    id: "phoenix",
    name: "Phoenix Trading",
    tagline: "High Performance",
    description: "Orange-fire themed platform designed for futures and derivatives. Maximum data density for power users.",
    colors: { primary: "#f97316", secondary: "#ea580c", bg: "#0f0b07", card: "#1a1308", accent: "#fb923c" },
    features: ["Futures & Options", "125x leverage UI", "Risk management tools", "API trading console"],
    category: "Derivatives",
    popular: false,
  },
  {
    id: "glacier",
    name: "Glacier Exchange",
    tagline: "Institutional Grade",
    description: "Cool blue-white design built for institutional clients. Clean data presentation with compliance-first approach.",
    colors: { primary: "#0ea5e9", secondary: "#0284c7", bg: "#080f16", card: "#0e1824", accent: "#38bdf8" },
    features: ["OTC desk UI", "Custody solution", "Compliance dashboard", "Multi-sig wallet UI"],
    category: "Institutional",
    popular: false,
  },
];

const whyChoose = [
  { icon: Zap, title: "Launch in 2 Weeks", desc: "Pre-built modules mean you can go live in days, not months. Full exchange infrastructure ready to deploy." },
  { icon: Palette, title: "Fully Customizable", desc: "Every pixel is yours. Custom colors, logos, fonts, layouts. Your brand, your identity, zero compromise." },
  { icon: Shield, title: "Bank-Grade Security", desc: "Multi-sig wallets, cold storage, 2FA, DDoS protection, and real-time monitoring baked into every template." },
  { icon: Globe, title: "Multi-Language", desc: "Built-in i18n support for 40+ languages. RTL support included. Reach users in every market worldwide." },
  { icon: Code, title: "API-First Architecture", desc: "RESTful APIs, WebSocket feeds, FIX protocol. Connect any liquidity provider or trading engine." },
  { icon: Headphones, title: "24/7 Technical Support", desc: "Dedicated account manager, priority Slack channel, and 99.9% SLA guaranteed uptime." },
];

const packages = [
  {
    name: "Starter",
    price: "$4,999",
    period: "/month",
    desc: "Perfect for new exchanges",
    features: ["1 White Label Template", "Spot Trading Module", "Basic KYC Flow", "Email Support", "5 Trading Pairs", "Standard Matching Engine"],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$12,999",
    period: "/month",
    desc: "Most popular for growing exchanges",
    features: ["All 5 Templates", "Spot + Futures Trading", "Advanced KYC/AML", "24/7 Priority Support", "Unlimited Trading Pairs", "High-Performance Engine", "Fiat Gateway Integration", "Custom Domain & SSL"],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For institutional-grade platforms",
    features: ["Everything in Professional", "OTC Desk Module", "Custody Solution", "Dedicated Infrastructure", "Custom Development", "On-premise Deployment", "SLA 99.99% Uptime", "Compliance Consulting"],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const clientLogos = [
  "BitVault Exchange", "CryptoNex", "TradeForge", "ChainPay", "LunarFi", "QuantumX", "SwiftTrade", "VaultPrime"
];

const WhiteLabel = () => {
  const [activeTemplate, setActiveTemplate] = useState("aurora");
  const [previewHover, setPreviewHover] = useState<string | null>(null);

  const selectedTemplate = templates.find(t => t.id === activeTemplate) || templates[0];

  return (
    <div className="min-h-screen bg-[#0b0b0e]">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b0b0e] via-[#0d1117] to-[#0b0b0e]" />
        <div className="absolute top-[-10%] left-[30%] w-[600px] h-[600px] bg-[#3b82f6]/6 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] bg-[#8b5cf6]/4 blur-[120px] rounded-full" />

        <div className="relative max-w-[1400px] mx-auto px-4 py-20 lg:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/20 text-[#60a5fa] text-sm mb-6">
              <Layers className="w-4 h-4" /> White Label Crypto Exchange Solutions
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6">
              Launch Your Own<br />
              <span className="brand-text">Crypto Exchange</span><br />
              in 2 Weeks
            </h1>
            <p className="text-lg text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed">
              Choose from 5 professionally designed exchange templates. Fully customizable, institutional-grade security, and ready to deploy with your brand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="brand-gradient text-white font-bold px-10 py-7 text-base hover:opacity-90 hover-scale shadow-lg shadow-[#3b82f6]/20">
                View Templates <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-[#2a2a2e] text-white hover:bg-white/5 px-10 py-7 text-base hover-scale">
                Book a Demo <Monitor className="w-5 h-5 ml-2" />
              </Button>
            </div>
            <div className="flex items-center justify-center gap-8 mt-10 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#0ecb81]" /> No coding required</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#0ecb81]" /> 14-day free trial</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#0ecb81]" /> Full source code</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5 TEMPLATE SHOWCASES ===== */}
      <section className="py-20 border-t border-[#1a1a1e]" id="templates">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">5 Premium <span className="brand-text">Exchange Templates</span></h2>
            <p className="text-gray-500 max-w-xl mx-auto">Each template is a complete, production-ready crypto exchange frontend. Pick one, customize it, and launch.</p>
          </div>

          {/* Template Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {templates.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTemplate(t.id)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTemplate === t.id
                    ? "bg-white/10 text-white border border-white/20 shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <div className="w-3 h-3 rounded-full" style={{ background: t.colors.primary }} />
                {t.name}
                {t.popular && <span className="absolute -top-2 -right-2 px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-[#f0b90b] text-black">HOT</span>}
              </button>
            ))}
          </div>

          {/* Active Template Preview */}
          <div className="bg-[#0d0d10] border border-[#1a1a1e] rounded-3xl overflow-hidden hover-glow">
            {/* Mockup Browser Chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1a1a1e] bg-[#0a0a0d]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#f6465d]" />
                <div className="w-3 h-3 rounded-full bg-[#f0b90b]" />
                <div className="w-3 h-3 rounded-full bg-[#0ecb81]" />
              </div>
              <div className="flex-1 ml-4">
                <div className="bg-[#1a1a1e] rounded-lg px-4 py-1.5 text-xs text-gray-500 max-w-md mx-auto text-center">
                  https://your-brand.com
                </div>
              </div>
            </div>

            {/* Mockup Exchange UI */}
            <div className="relative" style={{ background: selectedTemplate.colors.bg }}>
              {/* Mock Navbar */}
              <div className="flex items-center justify-between px-6 py-3 border-b" style={{ borderColor: `${selectedTemplate.colors.primary}15` }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm text-white" style={{ background: selectedTemplate.colors.primary }}>
                    YB
                  </div>
                  <span className="font-bold text-white text-sm">Your Brand</span>
                  <div className="hidden sm:flex items-center gap-4 ml-6 text-xs text-gray-400">
                    <span className="hover:text-white cursor-pointer" style={{ color: selectedTemplate.colors.accent }}>Exchange</span>
                    <span className="hover:text-white cursor-pointer">Markets</span>
                    <span className="hover:text-white cursor-pointer">Futures</span>
                    <span className="hover:text-white cursor-pointer">Earn</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded-md text-[10px] text-white font-medium" style={{ background: selectedTemplate.colors.primary }}>Register</div>
                </div>
              </div>

              {/* Mock Trading Interface */}
              <div className="grid grid-cols-12 gap-px p-1" style={{ minHeight: 380 }}>
                {/* Order Book */}
                <div className="col-span-2 hidden lg:block rounded-lg p-3" style={{ background: selectedTemplate.colors.card }}>
                  <div className="text-[10px] font-semibold text-gray-400 mb-2">Order Book</div>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={`ask-${i}`} className="flex justify-between text-[9px] py-0.5">
                      <span className="text-[#f6465d]">{(87450 + i * 12).toLocaleString()}</span>
                      <span className="text-gray-500">{(Math.random() * 2).toFixed(3)}</span>
                    </div>
                  ))}
                  <div className="text-center text-sm font-bold my-1.5" style={{ color: selectedTemplate.colors.primary }}>87,432.51</div>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={`bid-${i}`} className="flex justify-between text-[9px] py-0.5">
                      <span className="text-[#0ecb81]">{(87420 - i * 12).toLocaleString()}</span>
                      <span className="text-gray-500">{(Math.random() * 2).toFixed(3)}</span>
                    </div>
                  ))}
                </div>

                {/* Chart Area */}
                <div className="col-span-12 lg:col-span-7 rounded-lg p-3" style={{ background: selectedTemplate.colors.card }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-white text-sm">BTC/USDT</span>
                      <span className="text-sm font-bold" style={{ color: selectedTemplate.colors.primary }}>$87,432.51</span>
                      <span className="text-xs text-[#0ecb81]">+1.44%</span>
                    </div>
                    <div className="flex gap-1">
                      {["1H", "4H", "1D", "1W"].map(tf => (
                        <div key={tf} className="px-2 py-0.5 rounded text-[9px] text-gray-500" style={tf === "1D" ? { background: `${selectedTemplate.colors.primary}20`, color: selectedTemplate.colors.accent } : {}}>
                          {tf}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Candlestick mockup */}
                  <svg viewBox="0 0 600 200" className="w-full" preserveAspectRatio="xMidYMid meet">
                    {Array.from({ length: 40 }).map((_, i) => {
                      const isGreen = Math.random() > 0.45;
                      const base = 40 + Math.sin(i * 0.3) * 30 + Math.random() * 20;
                      const bodyH = 5 + Math.random() * 15;
                      const wickH = bodyH + Math.random() * 8;
                      const x = i * 15 + 5;
                      const color = isGreen ? "#0ecb81" : "#f6465d";
                      return (
                        <g key={i}>
                          <line x1={x} y1={200 - base - wickH} x2={x} y2={200 - base + wickH * 0.3} stroke={color} strokeWidth="1" />
                          <rect x={x - 4} y={200 - base - bodyH / 2} width="8" height={bodyH} fill={color} rx="1" />
                        </g>
                      );
                    })}
                    {/* Price line */}
                    <line x1="0" y1="80" x2="600" y2="80" stroke={selectedTemplate.colors.primary} strokeWidth="0.5" strokeDasharray="4,4" />
                  </svg>
                  {/* Volume bars */}
                  <div className="flex items-end gap-px h-8 mt-1">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div key={i} className="flex-1 rounded-t-sm" style={{
                        height: `${10 + Math.random() * 90}%`,
                        background: Math.random() > 0.45 ? "rgba(14,203,129,0.3)" : "rgba(246,70,93,0.3)"
                      }} />
                    ))}
                  </div>
                </div>

                {/* Trade Panel */}
                <div className="col-span-12 lg:col-span-3 rounded-lg p-3" style={{ background: selectedTemplate.colors.card }}>
                  <div className="flex mb-3 rounded-lg overflow-hidden text-xs font-semibold">
                    <div className="flex-1 py-2 text-center text-white" style={{ background: "#0ecb81" }}>Buy</div>
                    <div className="flex-1 py-2 text-center text-gray-400" style={{ background: `${selectedTemplate.colors.bg}` }}>Sell</div>
                  </div>
                  <div className="space-y-2">
                    {["Price (USDT)", "Amount (BTC)", "Total"].map(label => (
                      <div key={label}>
                        <div className="text-[9px] text-gray-500 mb-0.5">{label}</div>
                        <div className="rounded-md py-2 px-2 text-[10px] text-gray-400" style={{ background: selectedTemplate.colors.bg }}>0.00</div>
                      </div>
                    ))}
                    <div className="flex gap-1 mt-1">
                      {[25, 50, 75, 100].map(p => (
                        <div key={p} className="flex-1 text-center text-[9px] rounded py-0.5 text-gray-500" style={{ background: selectedTemplate.colors.bg }}>{p}%</div>
                      ))}
                    </div>
                    <div className="rounded-lg py-2.5 text-center text-xs font-bold text-white mt-2" style={{ background: "#0ecb81" }}>
                      Buy BTC
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Template Info Bar */}
            <div className="px-6 py-5 border-t border-[#1a1a1e] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-bold text-white">{selectedTemplate.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full text-gray-400" style={{ background: `${selectedTemplate.colors.primary}15`, color: selectedTemplate.colors.accent }}>
                    {selectedTemplate.category}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{selectedTemplate.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedTemplate.features.map(f => (
                    <span key={f} className="flex items-center gap-1 text-xs text-gray-500 bg-[#1a1a1e] px-2.5 py-1 rounded-lg">
                      <CheckCircle2 className="w-3 h-3 text-[#0ecb81]" /> {f}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 shrink-0">
                <Button variant="outline" className="border-[#2a2a2e] text-white hover:bg-white/5">
                  <Eye className="w-4 h-4 mr-2" /> Live Preview
                </Button>
                <Button className="brand-gradient text-white font-semibold">
                  Use This Template <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ALL 5 TEMPLATE CARDS ===== */}
      <section className="py-16 bg-[#0a0a0d] border-t border-[#1a1a1e]">
        <div className="max-w-[1400px] mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">All Templates at a Glance</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {templates.map(t => (
              <button
                key={t.id}
                onClick={() => { setActiveTemplate(t.id); window.scrollTo({ top: 500, behavior: 'smooth' }); }}
                onMouseEnter={() => setPreviewHover(t.id)}
                onMouseLeave={() => setPreviewHover(null)}
                className={`relative text-left rounded-2xl border p-4 transition-all hover-lift ${
                  activeTemplate === t.id ? 'border-white/20 bg-white/5' : 'border-[#1a1a1e] bg-[#0d0d10] hover:border-white/10'
                }`}
              >
                {t.popular && <span className="absolute -top-2 right-3 px-2 py-0.5 text-[9px] font-bold rounded-full bg-[#f0b90b] text-black">POPULAR</span>}
                {/* Color preview bar */}
                <div className="h-24 rounded-xl mb-3 relative overflow-hidden" style={{ background: t.colors.bg }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-lg" style={{ background: t.colors.primary }}>
                      {t.name[0]}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${t.colors.primary}, ${t.colors.accent})` }} />
                </div>
                <h3 className="font-semibold text-white text-sm">{t.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{t.tagline}</p>
                <div className="flex gap-1.5 mt-2">
                  {Object.values(t.colors).slice(0, 3).map((c, i) => (
                    <div key={i} className="w-4 h-4 rounded-full border border-white/10" style={{ background: c }} />
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHAT'S INCLUDED ===== */}
      <section className="py-20 border-t border-[#1a1a1e]">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Everything You Need to <span className="brand-text">Launch & Scale</span></h2>
            <p className="text-gray-500 max-w-xl mx-auto">Each white label solution comes fully loaded with enterprise features out of the box.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoose.map(item => (
              <div key={item.title} className="bg-[#0d0d10] border border-[#1a1a1e] rounded-2xl p-6 hover-lift hover-glow group">
                <div className="w-12 h-12 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-[#3b82f6]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#60a5fa] transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES LIST ===== */}
      <section className="py-16 bg-[#0a0a0d] border-t border-[#1a1a1e]">
        <div className="max-w-[1400px] mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Built-In Modules</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              "Spot Trading Engine", "Futures & Derivatives", "Order Book & Matching", "Fiat On/Off Ramp",
              "KYC/AML Compliance", "Multi-Sig Wallets", "Admin Dashboard", "Fee Management",
              "Staking & Earn", "NFT Marketplace", "P2P Trading", "Convert/Swap Module",
              "Real-Time Charts", "WebSocket Price Feeds", "Mobile Responsive", "Multi-Currency Support",
              "Referral System", "Push Notifications", "2FA Authentication", "Anti-Fraud System",
              "Liquidity Aggregation", "API Documentation", "White Label Mobile App", "Custom Domain & SSL",
            ].map(feature => (
              <div key={feature} className="flex items-center gap-2.5 bg-[#0d0d10] border border-[#1a1a1e] rounded-xl px-4 py-3 hover:border-[#3b82f6]/20 transition-all">
                <CheckCircle2 className="w-4 h-4 text-[#0ecb81] shrink-0" />
                <span className="text-sm text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section className="py-20 border-t border-[#1a1a1e]">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Transparent <span className="brand-text">Pricing</span></h2>
            <p className="text-gray-500">Start with a 14-day free trial. No credit card required.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {packages.map(pkg => (
              <div
                key={pkg.name}
                className={`rounded-2xl p-6 border ${
                  pkg.highlighted
                    ? 'border-[#3b82f6]/40 bg-[#3b82f6]/5 relative shadow-lg shadow-[#3b82f6]/10'
                    : 'border-[#1a1a1e] bg-[#0d0d10]'
                } hover-lift`}
              >
                {pkg.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#3b82f6] text-white text-xs font-bold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-semibold text-white">{pkg.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{pkg.desc}</p>
                <div className="mt-4 mb-6">
                  <span className="text-3xl font-black text-white">{pkg.price}</span>
                  <span className="text-gray-500 text-sm">{pkg.period}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-[#0ecb81] shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Button className={`w-full ${pkg.highlighted ? 'brand-gradient text-white font-bold' : 'bg-[#1a1a1e] text-white hover:bg-[#2a2a2e]'}`}>
                  {pkg.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CLIENTS ===== */}
      <section className="py-12 border-t border-[#1a1a1e] bg-[#0a0a0d]">
        <div className="max-w-[1400px] mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm mb-6">Trusted by 200+ exchanges worldwide</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-30">
            {clientLogos.map(name => (
              <span key={name} className="text-sm font-bold text-gray-500">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 relative overflow-hidden border-t border-[#1a1a1e]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#3b82f6]/5 blur-[150px] rounded-full" />
        <div className="relative max-w-[1400px] mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5">Ready to Launch Your <span className="brand-text">Exchange?</span></h2>
          <p className="text-gray-400 max-w-lg mx-auto text-lg mb-10">Get started with a free 14-day trial. Full access to all templates and features. No credit card needed.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="brand-gradient text-white font-bold px-12 py-7 text-lg hover:opacity-90 hover-scale shadow-lg shadow-[#3b82f6]/20">
              Start Free Trial <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-[#2a2a2e] text-white hover:bg-white/5 px-10 py-7 text-lg hover-scale">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhiteLabel;
