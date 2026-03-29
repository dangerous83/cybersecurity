import { Button } from "@/components/ui/button";
import { useLivePrices } from "@/hooks/useLivePrices";
import { formatPrice } from "@/lib/crypto-data";
import { Wallet, Lock, TrendingUp, Shield, ArrowRight, Percent } from "lucide-react";

const earnProducts = [
  { type: "Flexible Savings", apy: "5.2%", minAmount: "$10", lockPeriod: "None", risk: "Low" },
  { type: "Locked Staking", apy: "12.8%", minAmount: "$100", lockPeriod: "30 Days", risk: "Low" },
  { type: "DeFi Staking", apy: "28.5%", minAmount: "$50", lockPeriod: "Flexible", risk: "Medium" },
  { type: "Launchpool", apy: "45.0%", minAmount: "$500", lockPeriod: "7 Days", risk: "Medium" },
  { type: "Dual Investment", apy: "120%+", minAmount: "$100", lockPeriod: "Custom", risk: "High" },
];

const Earn = () => {
  const assets = useLivePrices();
  const topAssets = assets.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#0b0b0e]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#1a1a1e]">
        <div className="absolute top-0 left-1/3 w-[500px] h-[300px] bg-[#0ecb81]/5 blur-[100px] rounded-full" />
        <div className="relative max-w-[1600px] mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0ecb81]/10 text-[#0ecb81] text-sm mb-4">
            <Percent className="w-4 h-4" /> Earn up to 120% APY
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Put Your <span className="brand-text">Crypto to Work</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Earn passive income on your crypto assets with flexible and locked staking options.
          </p>
          <Button size="lg" className="brand-gradient text-black font-bold px-8">
            Start Earning <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Product Cards */}
      <section className="max-w-[1600px] mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-8">Earn Products</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {earnProducts.map(product => (
            <div
              key={product.type}
              className="bg-[#0d0d10] border border-[#1a1a1e] rounded-2xl p-5 hover:border-[#0ecb81]/20 transition-all group"
            >
              <div className="flex items-center gap-2 mb-4">
                {product.risk === 'Low' ? (
                  <Shield className="w-5 h-5 text-[#0ecb81]" />
                ) : product.risk === 'Medium' ? (
                  <TrendingUp className="w-5 h-5 text-[#0ecb81]" />
                ) : (
                  <Lock className="w-5 h-5 text-[#f6465d]" />
                )}
                <span className={`text-xs px-2 py-0.5 rounded ${
                  product.risk === 'Low' ? 'bg-[#0ecb81]/10 text-[#0ecb81]' :
                  product.risk === 'Medium' ? 'bg-[#0ecb81]/10 text-[#0ecb81]' :
                  'bg-[#f6465d]/10 text-[#f6465d]'
                }`}>
                  {product.risk} Risk
                </span>
              </div>
              <h3 className="font-semibold text-white mb-1">{product.type}</h3>
              <div className="text-3xl font-bold brand-text mb-3">{product.apy}</div>
              <div className="space-y-1 text-xs text-gray-500 mb-4">
                <div className="flex justify-between">
                  <span>Min Amount</span>
                  <span className="text-gray-300">{product.minAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Lock Period</span>
                  <span className="text-gray-300">{product.lockPeriod}</span>
                </div>
              </div>
              <Button variant="outline" className="w-full border-[#2a2a2e] text-white hover:bg-[#0ecb81]/10 hover:text-[#0ecb81] hover:border-[#0ecb81]/30">
                Subscribe
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Staking Opportunities */}
      <section className="max-w-[1600px] mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-8">Popular Staking</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topAssets.map(asset => {
            const apy = (Math.random() * 15 + 2).toFixed(1);
            return (
              <div key={asset.id} className="bg-[#0d0d10] border border-[#1a1a1e] rounded-2xl p-5 flex items-center justify-between hover:border-[#0ecb81]/20 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1a1a1e] flex items-center justify-center text-lg font-bold text-[#0ecb81]">
                    {asset.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{asset.symbol}</div>
                    <div className="text-xs text-gray-500">${formatPrice(asset.price)}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-[#0ecb81]">{apy}%</div>
                  <div className="text-xs text-gray-500">Est. APY</div>
                </div>
                <Button size="sm" className="brand-gradient text-black font-semibold text-xs">
                  Stake
                </Button>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-[1600px] mx-auto px-4 py-16 border-t border-[#1a1a1e]">
        <h2 className="text-2xl font-bold text-white text-center mb-12">How KORYPTO Earn Works</h2>
        <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {[
            { icon: Wallet, step: "1", title: "Deposit", desc: "Transfer crypto to your KORYPTO wallet" },
            { icon: Lock, step: "2", title: "Subscribe", desc: "Choose a product and lock your assets" },
            { icon: TrendingUp, step: "3", title: "Earn", desc: "Receive daily rewards automatically" },
          ].map(item => (
            <div key={item.step} className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#0ecb81]/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-[#0ecb81]" />
              </div>
              <div className="text-sm text-[#0ecb81] font-semibold mb-1">Step {item.step}</div>
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Earn;
