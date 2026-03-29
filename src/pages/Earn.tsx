import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePrices } from "@/contexts/PriceContext";
import { useAuth } from "@/contexts/AuthContext";
import { useWallet } from "@/contexts/WalletContext";
import { formatPrice, STAKING_PRODUCTS } from "@/lib/crypto-data";
import { Wallet, Lock, TrendingUp, Shield, ArrowRight, Percent, Calculator, X } from "lucide-react";
import { toast } from "sonner";

interface ActiveStake {
  id: string;
  productId: string;
  asset: string;
  amount: number;
  apy: number;
  type: string;
  startDate: string;
  lockDays: number;
  earned: number;
}

const STAKES_KEY = 'korypto_stakes_';

function getStakes(userId: string): ActiveStake[] {
  try {
    const raw = localStorage.getItem(STAKES_KEY + userId);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function saveStakes(userId: string, stakes: ActiveStake[]) {
  localStorage.setItem(STAKES_KEY + userId, JSON.stringify(stakes));
}

const Earn = () => {
  const { assets, getPrice } = usePrices();
  const { user, isAuthenticated } = useAuth();
  const { getBalance, withdraw, deposit, addTransaction } = useWallet();
  const [activeTab, setActiveTab] = useState<'all' | 'flexible' | 'locked' | 'defi'>('all');
  const [stakeModal, setStakeModal] = useState<string | null>(null);
  const [stakeAmount, setStakeAmount] = useState('');
  const [calcAsset, setCalcAsset] = useState('BTC');
  const [calcAmount, setCalcAmount] = useState('1');
  const [calcApy, setCalcApy] = useState('6.5');
  const [stakeRefresh, setStakeRefresh] = useState(0);

  const activeStakes = useMemo(() => {
    if (!user) return [];
    return getStakes(user.id);
  }, [user, stakeRefresh]);

  // Accrue earnings every 30 seconds
  useEffect(() => {
    if (!user) return;
    const interval = setInterval(() => {
      const stakes = getStakes(user.id);
      let changed = false;
      stakes.forEach(s => {
        const dailyRate = s.apy / 100 / 365;
        const increment = s.amount * dailyRate * (30 / 86400);
        s.earned += increment;
        changed = true;
      });
      if (changed) {
        saveStakes(user.id, stakes);
        setStakeRefresh(r => r + 1);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const filteredProducts = activeTab === 'all'
    ? STAKING_PRODUCTS
    : STAKING_PRODUCTS.filter(p => p.type.toLowerCase() === activeTab);

  const selectedProduct = STAKING_PRODUCTS.find(p => p.id === stakeModal);

  const handleStake = () => {
    if (!user || !selectedProduct) return;
    const amt = parseFloat(stakeAmount);
    if (!amt || amt <= 0) { toast.error("Enter a valid amount"); return; }
    if (amt < selectedProduct.minAmount) { toast.error(`Minimum ${selectedProduct.minAmount} ${selectedProduct.asset}`); return; }

    const balance = getBalance(selectedProduct.asset);
    if (balance < amt) { toast.error(`Insufficient ${selectedProduct.asset} balance`); return; }

    const ok = withdraw(selectedProduct.asset, amt);
    if (!ok) { toast.error("Withdrawal failed"); return; }

    const stake: ActiveStake = {
      id: 'stk-' + Date.now(),
      productId: selectedProduct.id,
      asset: selectedProduct.asset,
      amount: amt,
      apy: selectedProduct.apy,
      type: selectedProduct.type,
      startDate: new Date().toISOString(),
      lockDays: selectedProduct.lockDays,
      earned: 0,
    };

    const existing = getStakes(user.id);
    existing.unshift(stake);
    saveStakes(user.id, existing);

    addTransaction({
      type: 'stake',
      asset: selectedProduct.asset,
      amount: amt,
      description: `Staked ${amt} ${selectedProduct.asset} (${selectedProduct.type} ${selectedProduct.apy}% APY)`,
    });

    toast.success(`Staked ${amt} ${selectedProduct.asset} at ${selectedProduct.apy}% APY`);
    setStakeModal(null);
    setStakeAmount('');
    setStakeRefresh(r => r + 1);
  };

  const handleUnstake = (stake: ActiveStake) => {
    if (!user) return;
    if (stake.lockDays > 0) {
      const startDate = new Date(stake.startDate);
      const unlockDate = new Date(startDate.getTime() + stake.lockDays * 86400000);
      if (new Date() < unlockDate) {
        toast.error(`Locked until ${unlockDate.toLocaleDateString()}`);
        return;
      }
    }

    deposit(stake.asset, stake.amount + stake.earned);

    const existing = getStakes(user.id);
    const updated = existing.filter(s => s.id !== stake.id);
    saveStakes(user.id, updated);

    addTransaction({
      type: 'unstake',
      asset: stake.asset,
      amount: stake.amount + stake.earned,
      description: `Unstaked ${stake.amount} ${stake.asset} + ${stake.earned.toFixed(6)} earned`,
    });

    toast.success(`Unstaked ${stake.amount} ${stake.asset} + ${stake.earned.toFixed(6)} rewards`);
    setStakeRefresh(r => r + 1);
  };

  const totalEarned = activeStakes.reduce((sum, s) => {
    const assetPrice = getPrice(s.asset);
    return sum + s.earned * assetPrice;
  }, 0);

  const estDailyEarnings = calcAmount && calcApy
    ? (parseFloat(calcAmount) * parseFloat(calcApy) / 100 / 365)
    : 0;

  return (
    <div className="min-h-screen bg-[#0b0b0e]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#1a1a1e]">
        <div className="absolute top-0 left-1/3 w-[500px] h-[300px] bg-[#0ecb81]/5 blur-[100px] rounded-full" />
        <div className="relative max-w-[1600px] mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0ecb81]/10 text-[#0ecb81] text-sm mb-4">
            <Percent className="w-4 h-4" /> Earn up to 22% APY
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Put Your <span className="brand-text">Crypto to Work</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto mb-6">
            Earn passive income on your crypto assets with flexible and locked staking options.
          </p>
          {isAuthenticated && totalEarned > 0 && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0ecb81]/10 border border-[#0ecb81]/20">
              <TrendingUp className="w-4 h-4 text-[#0ecb81]" />
              <span className="text-white text-sm">Total Earned: <span className="font-bold text-[#0ecb81]">${totalEarned.toFixed(2)}</span></span>
            </div>
          )}
        </div>
      </section>

      {/* Active Stakes */}
      {isAuthenticated && activeStakes.length > 0 && (
        <section className="max-w-[1600px] mx-auto px-4 py-8">
          <h2 className="text-xl font-bold text-white mb-4">Your Active Stakes</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeStakes.map(stake => {
              const assetPrice = getPrice(stake.asset);
              const isLocked = stake.lockDays > 0;
              const unlockDate = new Date(new Date(stake.startDate).getTime() + stake.lockDays * 86400000);
              const canUnstake = !isLocked || new Date() >= unlockDate;

              return (
                <div key={stake.id} className="bg-[#0d0d10] border border-[#1a1a1e] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{stake.asset}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-[#0ecb81]/10 text-[#0ecb81]">{stake.apy}% APY</span>
                    </div>
                    <span className="text-xs text-gray-500">{stake.type}</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Staked</span>
                      <span className="text-white">{stake.amount} {stake.asset}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Value</span>
                      <span className="text-white">${(stake.amount * assetPrice).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Earned</span>
                      <span className="text-[#0ecb81]">{stake.earned.toFixed(6)} {stake.asset} (${(stake.earned * assetPrice).toFixed(2)})</span>
                    </div>
                    {isLocked && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Unlocks</span>
                        <span className={canUnstake ? 'text-[#0ecb81]' : 'text-[#f6465d]'}>{unlockDate.toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  <Button
                    onClick={() => handleUnstake(stake)}
                    size="sm"
                    variant="outline"
                    className={`w-full mt-3 text-xs ${canUnstake ? 'border-[#0ecb81] text-[#0ecb81] hover:bg-[#0ecb81]/10' : 'border-[#2a2a2e] text-gray-500'}`}
                    disabled={!canUnstake}
                  >
                    {canUnstake ? 'Unstake + Claim' : 'Locked'}
                  </Button>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Product Tabs */}
      <section className="max-w-[1600px] mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Earn Products</h2>
          <div className="flex gap-1">
            {[
              { id: 'all' as const, label: 'All' },
              { id: 'flexible' as const, label: 'Flexible' },
              { id: 'locked' as const, label: 'Locked' },
              { id: 'defi' as const, label: 'DeFi' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 text-xs rounded-lg ${
                  activeTab === tab.id
                    ? 'bg-[#0ecb81]/10 text-[#0ecb81]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map(product => {
            const assetData = assets.find(a => a.symbol === product.asset);
            return (
              <div
                key={product.id}
                className="bg-[#0d0d10] border border-[#1a1a1e] rounded-2xl p-5 hover:border-[#0ecb81]/20 transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#1a1a1e] flex items-center justify-center text-sm font-bold text-[#0ecb81]">
                    {assetData?.icon || product.asset[0]}
                  </div>
                  <div>
                    <span className="font-semibold text-white">{product.asset}</span>
                    <span className="text-xs text-gray-500 ml-2">{product.type}</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-[#0ecb81] mb-3">{product.apy}% APY</div>
                <div className="space-y-1 text-xs text-gray-500 mb-4">
                  <div className="flex justify-between">
                    <span>Min Amount</span>
                    <span className="text-gray-300">{product.minAmount} {product.asset}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lock Period</span>
                    <span className="text-gray-300">{product.lockDays === 0 ? 'Flexible' : `${product.lockDays} Days`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Risk</span>
                    <span className={product.type === 'DeFi' ? 'text-[#f6465d]' : 'text-[#0ecb81]'}>
                      {product.type === 'DeFi' ? 'Medium' : 'Low'}
                    </span>
                  </div>
                </div>
                {isAuthenticated ? (
                  <Button
                    onClick={() => { setStakeModal(product.id); setStakeAmount(''); }}
                    className="w-full brand-gradient text-black font-semibold text-xs"
                  >
                    Subscribe
                  </Button>
                ) : (
                  <Link to="/login">
                    <Button variant="outline" className="w-full border-[#2a2a2e] text-white hover:bg-white/5 text-xs">
                      Log In to Stake
                    </Button>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Earnings Calculator */}
      <section className="max-w-[1600px] mx-auto px-4 py-12 border-t border-[#1a1a1e]">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Calculator className="w-6 h-6 text-[#0ecb81]" /> Earnings Calculator
        </h2>
        <div className="bg-[#0d0d10] border border-[#1a1a1e] rounded-2xl p-6 max-w-2xl">
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Asset</label>
              <select
                value={calcAsset}
                onChange={e => setCalcAsset(e.target.value)}
                className="w-full bg-[#1a1a1e] border border-[#2a2a2e] rounded-lg px-3 py-2 text-sm text-white"
              >
                {assets.slice(0, 10).map(a => (
                  <option key={a.symbol} value={a.symbol}>{a.symbol}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Amount</label>
              <input
                type="text"
                value={calcAmount}
                onChange={e => setCalcAmount(e.target.value)}
                className="w-full bg-[#1a1a1e] border border-[#2a2a2e] rounded-lg px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">APY (%)</label>
              <input
                type="text"
                value={calcApy}
                onChange={e => setCalcApy(e.target.value)}
                className="w-full bg-[#1a1a1e] border border-[#2a2a2e] rounded-lg px-3 py-2 text-sm text-white"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-[#1a1a1e] rounded-xl p-4">
              <div className="text-xs text-gray-500 mb-1">Daily</div>
              <div className="text-lg font-bold text-[#0ecb81]">{estDailyEarnings.toFixed(6)} {calcAsset}</div>
              <div className="text-xs text-gray-500">${(estDailyEarnings * getPrice(calcAsset)).toFixed(2)}</div>
            </div>
            <div className="bg-[#1a1a1e] rounded-xl p-4">
              <div className="text-xs text-gray-500 mb-1">Monthly</div>
              <div className="text-lg font-bold text-[#0ecb81]">{(estDailyEarnings * 30).toFixed(6)} {calcAsset}</div>
              <div className="text-xs text-gray-500">${(estDailyEarnings * 30 * getPrice(calcAsset)).toFixed(2)}</div>
            </div>
            <div className="bg-[#1a1a1e] rounded-xl p-4">
              <div className="text-xs text-gray-500 mb-1">Yearly</div>
              <div className="text-lg font-bold text-[#0ecb81]">{(estDailyEarnings * 365).toFixed(6)} {calcAsset}</div>
              <div className="text-xs text-gray-500">${(estDailyEarnings * 365 * getPrice(calcAsset)).toFixed(2)}</div>
            </div>
          </div>
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

      {/* Stake Modal */}
      {stakeModal && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#14151a] border border-[#2a2a2e] rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Stake {selectedProduct.asset}</h3>
              <button onClick={() => setStakeModal(null)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">APY</span>
                <span className="text-[#0ecb81] font-bold">{selectedProduct.apy}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Type</span>
                <span className="text-white">{selectedProduct.type}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Lock Period</span>
                <span className="text-white">{selectedProduct.lockDays === 0 ? 'Flexible' : `${selectedProduct.lockDays} Days`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Available</span>
                <span className="text-white">{getBalance(selectedProduct.asset).toFixed(6)} {selectedProduct.asset}</span>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Amount</label>
                <div className="relative">
                  <input
                    type="text"
                    value={stakeAmount}
                    onChange={e => {
                      const v = e.target.value;
                      if (v === '' || /^\d*\.?\d*$/.test(v)) setStakeAmount(v);
                    }}
                    placeholder={`Min ${selectedProduct.minAmount}`}
                    className="w-full bg-[#1a1a1e] border border-[#2a2a2e] rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#0ecb81]/50"
                  />
                  <button
                    onClick={() => setStakeAmount(getBalance(selectedProduct.asset).toString())}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#0ecb81] hover:underline"
                  >
                    MAX
                  </button>
                </div>
              </div>
              <Button onClick={handleStake} className="w-full brand-gradient text-black font-semibold">
                Confirm Stake
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Earn;
