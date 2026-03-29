import { useState } from "react";
import { Search, ChevronDown, ChevronRight, MessageCircle, Mail, FileText, Shield, Wallet, ArrowLeftRight, BarChart3, User, HelpCircle } from "lucide-react";

const categories = [
  { icon: User, title: "Account & Security", articles: [
    { q: "How do I create a KORYPTO account?", a: "Visit the Register page, enter your email address and create a strong password. You'll receive a confirmation email to verify your account. Once verified, you can start trading immediately with a demo balance of $10,000 USDT." },
    { q: "How do I enable Two-Factor Authentication (2FA)?", a: "Go to Settings > Security > Two-Factor Authentication. You can set up 2FA using Google Authenticator or SMS verification. We strongly recommend enabling 2FA to protect your account from unauthorized access." },
    { q: "I forgot my password. How do I reset it?", a: "Click 'Forgot Password' on the login page. Enter your registered email address and we'll send you a password reset link. The link expires in 30 minutes for security. If you don't receive the email, check your spam folder." },
    { q: "How do I verify my identity (KYC)?", a: "Navigate to Settings > Identity Verification. You'll need to provide a government-issued photo ID (passport, driver's license, or national ID) and a selfie for facial verification. Verification typically completes within 24 hours." },
  ]},
  { icon: Wallet, title: "Deposits & Withdrawals", articles: [
    { q: "How do I deposit cryptocurrency?", a: "Go to Wallet > Deposit, select the cryptocurrency you want to deposit, and copy the deposit address. Send your crypto from your external wallet to this address. Make sure to select the correct network (ERC-20, BEP-20, TRC-20, etc.) to avoid loss of funds." },
    { q: "How long do deposits take?", a: "Deposit times vary by cryptocurrency and network congestion. Bitcoin typically takes 1-3 confirmations (10-30 minutes), Ethereum takes 12 confirmations (~3 minutes), and BNB takes 1 confirmation (~3 seconds)." },
    { q: "What are the withdrawal fees?", a: "Withdrawal fees vary by cryptocurrency and network. BTC: 0.0005 BTC, ETH: 0.005 ETH, USDT (TRC-20): 1 USDT. Fees are adjusted dynamically based on network conditions. Check the Fee Schedule page for current rates." },
    { q: "Why is my withdrawal pending?", a: "Withdrawals go through a security review process. Large withdrawals or those flagged by our risk system may require manual review. This typically takes 1-12 hours. If your withdrawal has been pending for more than 24 hours, contact support." },
  ]},
  { icon: ArrowLeftRight, title: "Trading", articles: [
    { q: "What order types are available?", a: "KORYPTO supports Market Orders (execute immediately at best price), Limit Orders (execute at your specified price or better), and Stop-Limit Orders (trigger a limit order when price reaches your stop price). Futures trading also supports Take Profit and Stop Loss orders." },
    { q: "What are the trading fees?", a: "Spot trading: Maker 0.10%, Taker 0.10%. Futures: Maker 0.02%, Taker 0.04%. VIP tiers offer progressively lower fees based on 30-day trading volume. BNB holders receive a 25% discount on all fees." },
    { q: "How does the Convert feature work?", a: "Convert allows you to instantly swap one cryptocurrency for another at the current market rate with zero slippage. Go to Convert, select your source and destination coins, enter the amount, and confirm. The conversion is executed instantly." },
    { q: "What is the maximum leverage for futures?", a: "KORYPTO Futures offers up to 125x leverage on BTC/USDT and ETH/USDT perpetual contracts. Other pairs support up to 75x or 50x leverage depending on the asset. Higher leverage means higher risk — always use proper risk management." },
  ]},
  { icon: BarChart3, title: "Earn & Staking", articles: [
    { q: "How does KORYPTO Earn work?", a: "KORYPTO Earn lets you earn passive income on your crypto holdings. Choose from Flexible Savings (withdraw anytime), Locked Staking (higher APY, fixed term), or DeFi Staking (highest returns, smart contract risk). Interest is calculated daily and distributed to your wallet." },
    { q: "What is the minimum staking amount?", a: "Minimum amounts vary by product: Flexible Savings starts at $10, Locked Staking at $100, and DeFi Staking at $50. Each product has specific minimum and maximum subscription amounts listed on the product page." },
    { q: "Can I unstake early from Locked Staking?", a: "Yes, you can unstake early, but you may forfeit some or all of the accrued rewards depending on the product terms. Flexible savings can be withdrawn at any time without penalty." },
    { q: "How is APY calculated?", a: "APY (Annual Percentage Yield) includes compound interest. The displayed APY is an estimate based on current market conditions and may fluctuate. Actual returns depend on network rewards, market conditions, and the specific staking protocol." },
  ]},
  { icon: Shield, title: "Security", articles: [
    { q: "Is KORYPTO safe to use?", a: "KORYPTO employs bank-grade security measures including: cold storage for 95% of assets, multi-signature wallets, real-time transaction monitoring, DDoS protection, and regular third-party security audits. We also maintain a $500M insurance fund (SAFU) to protect users." },
    { q: "What should I do if I suspect unauthorized access?", a: "Immediately: 1) Change your password, 2) Enable/reset 2FA, 3) Check your API keys and delete any you don't recognize, 4) Review your withdrawal whitelist, 5) Contact our security team at security@korypto.com. We can temporarily freeze your account if needed." },
    { q: "How does KORYPTO store my funds?", a: "95% of all user funds are stored in air-gapped cold storage using multi-signature wallets requiring 3-of-5 key holders to authorize any transaction. Only 5% is kept in hot wallets for instant withdrawal processing, protected by our insurance fund." },
  ]},
];

const HelpCenter = () => {
  const [search, setSearch] = useState("");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (key: string) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const filtered = search
    ? categories.map(cat => ({
        ...cat,
        articles: cat.articles.filter(a =>
          a.q.toLowerCase().includes(search.toLowerCase()) ||
          a.a.toLowerCase().includes(search.toLowerCase())
        ),
      })).filter(cat => cat.articles.length > 0)
    : categories;

  return (
    <div className="min-h-screen bg-[#0b0b0e]">
      <section className="relative overflow-hidden border-b border-[#1a1a1e]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#3b82f6]/5 blur-[100px] rounded-full" />
        <div className="relative max-w-[1200px] mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">How Can We <span className="brand-text">Help?</span></h1>
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search for answers..."
              className="w-full bg-[#14151a] border border-[#1a1a1e] rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#0ecb81]/50"
            />
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="space-y-8">
          {filtered.map(cat => (
            <div key={cat.title}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#0ecb81]/10 flex items-center justify-center">
                  <cat.icon className="w-5 h-5 text-[#0ecb81]" />
                </div>
                <h2 className="text-xl font-bold text-white">{cat.title}</h2>
              </div>
              <div className="space-y-2">
                {cat.articles.map((article, i) => {
                  const key = `${cat.title}-${i}`;
                  const isOpen = openItems.has(key);
                  return (
                    <div key={i} className="bg-[#0d0d10] border border-[#1a1a1e] rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.02]"
                      >
                        <span className="text-sm font-medium text-white pr-4">{article.q}</span>
                        {isOpen ? <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" /> : <ChevronRight className="w-4 h-4 text-gray-500 shrink-0" />}
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-sm text-gray-400 leading-relaxed border-t border-[#1a1a1e] pt-3">
                          {article.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-[#1a1a1e] py-12">
        <div className="max-w-[1200px] mx-auto px-4">
          <h2 className="text-xl font-bold text-white text-center mb-8">Still Need Help?</h2>
          <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { icon: MessageCircle, title: "Live Chat", desc: "24/7 support, avg response < 2 min" },
              { icon: Mail, title: "Email Support", desc: "support@korypto.com" },
              { icon: FileText, title: "Submit Ticket", desc: "For complex issues, avg 24h response" },
            ].map(item => (
              <div key={item.title} className="bg-[#0d0d10] border border-[#1a1a1e] rounded-xl p-5 text-center hover:border-[#0ecb81]/20 transition-all">
                <item.icon className="w-6 h-6 text-[#0ecb81] mx-auto mb-2" />
                <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;
