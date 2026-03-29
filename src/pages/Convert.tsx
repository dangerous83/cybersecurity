import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useWallet } from "@/contexts/WalletContext";
import { usePrices } from "@/contexts/PriceContext";
import { formatPrice } from "@/lib/crypto-data";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, ArrowDown, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const Convert = () => {
  const { isAuthenticated } = useAuth();
  const { getBalance, deposit, withdraw, addTransaction } = useWallet();
  const { assets, getPrice } = usePrices();

  const [fromAsset, setFromAsset] = useState('USDT');
  const [toAsset, setToAsset] = useState('BTC');
  const [fromAmount, setFromAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const allSymbols = useMemo(() => ['USDT', ...assets.map(a => a.symbol)], [assets]);

  const fromPrice = fromAsset === 'USDT' ? 1 : getPrice(fromAsset);
  const toPrice = toAsset === 'USDT' ? 1 : getPrice(toAsset);

  const conversionRate = toPrice > 0 ? fromPrice / toPrice : 0;
  const fromNum = parseFloat(fromAmount || '0');
  const toAmount = fromNum * conversionRate;
  const fromBalance = getBalance(fromAsset);

  const handleSwap = () => {
    setFromAsset(toAsset);
    setToAsset(fromAsset);
    setFromAmount('');
  };

  const handleConvert = () => {
    if (!isAuthenticated) return;
    if (fromNum <= 0) { toast.error("Enter a valid amount"); return; }
    if (fromAsset === toAsset) { toast.error("Cannot convert to the same asset"); return; }

    setLoading(true);
    setTimeout(() => {
      const ok = withdraw(fromAsset, fromNum);
      if (!ok) {
        toast.error(`Insufficient ${fromAsset} balance`);
        setLoading(false);
        return;
      }
      deposit(toAsset, toAmount);
      addTransaction({
        type: 'convert',
        asset: fromAsset,
        amount: fromNum,
        description: `Converted ${fromNum} ${fromAsset} to ${toAmount.toFixed(6)} ${toAsset}`,
      });
      toast.success(`Converted ${fromNum} ${fromAsset} to ${toAmount.toFixed(6)} ${toAsset}`);
      setFromAmount('');
      setLoading(false);
    }, 600);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0b0b0e] flex items-center justify-center">
        <div className="text-center">
          <ArrowLeftRight className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Convert</h2>
          <p className="text-gray-500 mb-6">Log in to convert between crypto assets</p>
          <Link to="/login">
            <Button className="brand-gradient text-black font-semibold">Log In</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0e]">
      <div className="max-w-[600px] mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Convert</h1>
          <p className="text-gray-500">Swap between crypto assets instantly with zero fees</p>
        </div>

        <div className="bg-[#0d0d10] border border-[#1a1a1e] rounded-2xl p-6 space-y-4">
          {/* From */}
          <div className="bg-[#1a1a1e] rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-gray-500">From</label>
              <span className="text-xs text-gray-500">
                Balance: <span className="text-gray-300">{fromBalance.toFixed(fromAsset === 'USDT' ? 2 : 6)} {fromAsset}</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={fromAsset}
                onChange={e => setFromAsset(e.target.value)}
                className="bg-[#14151a] border border-[#2a2a2e] rounded-lg px-3 py-2 text-sm text-white font-medium min-w-[100px]"
              >
                {allSymbols.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <input
                type="text"
                value={fromAmount}
                onChange={e => {
                  const v = e.target.value;
                  if (v === '' || /^\d*\.?\d*$/.test(v)) setFromAmount(v);
                }}
                placeholder="0.00"
                className="flex-1 bg-transparent text-right text-2xl font-bold text-white placeholder-gray-600 outline-none"
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-gray-500">${fromAsset === 'USDT' ? '1.00' : formatPrice(fromPrice)}</span>
              <div className="flex gap-2">
                {[25, 50, 75, 100].map(pct => (
                  <button
                    key={pct}
                    onClick={() => setFromAmount((fromBalance * pct / 100).toString())}
                    className="text-[10px] px-2 py-0.5 rounded bg-[#14151a] text-gray-400 hover:text-[#0ecb81]"
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center -my-2 relative z-10">
            <button
              onClick={handleSwap}
              className="w-10 h-10 rounded-full bg-[#14151a] border border-[#2a2a2e] flex items-center justify-center text-gray-400 hover:text-[#0ecb81] hover:border-[#0ecb81]/30 transition-colors"
            >
              <ArrowDown className="w-5 h-5" />
            </button>
          </div>

          {/* To */}
          <div className="bg-[#1a1a1e] rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-gray-500">To</label>
              <span className="text-xs text-gray-500">
                Balance: <span className="text-gray-300">{getBalance(toAsset).toFixed(toAsset === 'USDT' ? 2 : 6)} {toAsset}</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={toAsset}
                onChange={e => setToAsset(e.target.value)}
                className="bg-[#14151a] border border-[#2a2a2e] rounded-lg px-3 py-2 text-sm text-white font-medium min-w-[100px]"
              >
                {allSymbols.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <div className="flex-1 text-right text-2xl font-bold text-[#0ecb81]">
                {toAmount > 0 ? toAmount.toFixed(toAsset === 'USDT' ? 2 : 6) : '0.00'}
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xs text-gray-500">${toAsset === 'USDT' ? '1.00' : formatPrice(toPrice)}</span>
            </div>
          </div>

          {/* Rate */}
          <div className="flex items-center justify-between text-xs text-gray-400 px-1">
            <span className="flex items-center gap-1">
              <RefreshCw className="w-3 h-3" />
              1 {fromAsset} = {conversionRate.toFixed(conversionRate < 1 ? 2 : 6)} {toAsset}
            </span>
            <span>Fee: 0%</span>
          </div>

          {/* Convert Button */}
          <Button
            onClick={handleConvert}
            disabled={loading || fromNum <= 0}
            className="w-full py-4 text-lg brand-gradient text-black font-bold"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 animate-spin" /> Converting...
              </span>
            ) : (
              'Convert'
            )}
          </Button>
        </div>

        {/* Popular Conversions */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">Popular Conversions</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { from: 'USDT', to: 'BTC' },
              { from: 'USDT', to: 'ETH' },
              { from: 'BTC', to: 'ETH' },
              { from: 'USDT', to: 'SOL' },
            ].map(pair => (
              <button
                key={`${pair.from}-${pair.to}`}
                onClick={() => { setFromAsset(pair.from); setToAsset(pair.to); setFromAmount(''); }}
                className="flex items-center justify-between p-3 rounded-lg bg-[#0d0d10] border border-[#1a1a1e] hover:border-[#0ecb81]/20 transition-colors"
              >
                <span className="text-sm text-white font-medium">{pair.from} / {pair.to}</span>
                <ArrowLeftRight className="w-3 h-3 text-gray-500" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Convert;
