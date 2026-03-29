import { Link } from "react-router-dom";
import { Clock, ArrowRight, Tag } from "lucide-react";

const posts = [
  {
    id: 1, category: "Market Analysis", date: "Mar 28, 2026", readTime: "5 min",
    title: "Bitcoin Surpasses $87K: What's Driving the Rally?",
    excerpt: "Bitcoin has broken through key resistance levels amid institutional accumulation and ETF inflows. We analyze the technical and fundamental factors behind the move and what traders should watch next.",
    featured: true,
  },
  {
    id: 2, category: "Education", date: "Mar 25, 2026", readTime: "8 min",
    title: "The Complete Guide to DeFi Staking in 2026",
    excerpt: "Learn how to earn passive income through DeFi staking, including the risks, rewards, and best strategies for maximizing your yield safely.",
    featured: true,
  },
  {
    id: 3, category: "Product Update", date: "Mar 22, 2026", readTime: "3 min",
    title: "KORYPTO Launches Perpetual Futures with Up to 125x Leverage",
    excerpt: "Trade BTC, ETH, SOL, and 20+ perpetual contracts with cross and isolated margin modes. Industry-leading liquidation engine for maximum capital efficiency.",
    featured: false,
  },
  {
    id: 4, category: "Security", date: "Mar 20, 2026", readTime: "6 min",
    title: "How KORYPTO Keeps Your Assets Safe: Our Security Architecture",
    excerpt: "A deep dive into our multi-tier security system including cold storage, MPC wallets, real-time monitoring, and our $500M insurance fund.",
    featured: false,
  },
  {
    id: 5, category: "Market Analysis", date: "Mar 18, 2026", readTime: "7 min",
    title: "Ethereum's Next Upgrade: What It Means for Traders",
    excerpt: "The upcoming Ethereum network upgrade promises significant improvements to scalability and gas fees. Here's what every ETH trader needs to know.",
    featured: false,
  },
  {
    id: 6, category: "Education", date: "Mar 15, 2026", readTime: "10 min",
    title: "Understanding Order Types: Market, Limit, Stop-Limit Explained",
    excerpt: "Master every order type available on KORYPTO. From basic market orders to advanced stop-limit strategies, this guide covers everything.",
    featured: false,
  },
  {
    id: 7, category: "Regulation", date: "Mar 12, 2026", readTime: "4 min",
    title: "Global Crypto Regulation Update: Q1 2026 Summary",
    excerpt: "A comprehensive overview of regulatory developments across the US, EU, Asia, and Middle East that impact crypto traders and exchanges.",
    featured: false,
  },
  {
    id: 8, category: "Product Update", date: "Mar 10, 2026", readTime: "3 min",
    title: "New Coins Listed: SUI, SEI, TIA, and 5 More Now Available",
    excerpt: "Expand your portfolio with 8 newly listed tokens. Trading pairs are live with USDT with zero maker fees for the first 30 days.",
    featured: false,
  },
];

const categories = ["All", "Market Analysis", "Education", "Product Update", "Security", "Regulation"];

const Blog = () => (
  <div className="min-h-screen bg-[#0b0b0e]">
    <section className="border-b border-[#1a1a1e]">
      <div className="max-w-[1200px] mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white mb-3">KORYPTO <span className="brand-text">Blog</span></h1>
        <p className="text-gray-400">Market insights, product updates, educational guides, and industry news.</p>
      </div>
    </section>

    {/* Categories */}
    <div className="border-b border-[#1a1a1e]">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex gap-1 overflow-x-auto py-3">
          {categories.map((cat, i) => (
            <button key={cat} className={`px-4 py-1.5 text-sm rounded-lg whitespace-nowrap ${i === 0 ? 'bg-[#0ecb81]/10 text-[#0ecb81]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>

    {/* Featured */}
    <section className="max-w-[1200px] mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {posts.filter(p => p.featured).map(post => (
          <div key={post.id} className="bg-[#0d0d10] border border-[#1a1a1e] rounded-2xl overflow-hidden hover:border-[#0ecb81]/20 transition-all group">
            <div className="h-48 bg-gradient-to-br from-[#0ecb81]/10 to-[#3b82f6]/10 flex items-center justify-center">
              <span className="text-5xl opacity-30">📰</span>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                <span className="px-2 py-0.5 rounded-full bg-[#0ecb81]/10 text-[#0ecb81]">{post.category}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.date}</span>
                <span>{post.readTime} read</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-[#0ecb81] transition-colors">{post.title}</h2>
              <p className="text-sm text-gray-400 leading-relaxed">{post.excerpt}</p>
              <button className="text-[#0ecb81] text-sm font-medium mt-4 flex items-center gap-1 hover:underline">Read More <ArrowRight className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {/* All Posts */}
      <h2 className="text-xl font-bold text-white mb-6">Latest Articles</h2>
      <div className="space-y-4">
        {posts.filter(p => !p.featured).map(post => (
          <div key={post.id} className="bg-[#0d0d10] border border-[#1a1a1e] rounded-xl p-5 hover:border-[#0ecb81]/20 transition-all group flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                <span className="px-2 py-0.5 rounded-full bg-[#3b82f6]/10 text-[#3b82f6] flex items-center gap-1"><Tag className="w-3 h-3" />{post.category}</span>
                <span>{post.date}</span>
                <span>{post.readTime} read</span>
              </div>
              <h3 className="font-semibold text-white text-lg group-hover:text-[#0ecb81] transition-colors">{post.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{post.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default Blog;
