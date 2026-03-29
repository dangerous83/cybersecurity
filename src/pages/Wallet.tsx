import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useWallet } from "@/contexts/WalletContext";
import { usePrices } from "@/contexts/PriceContext";
import { formatPrice } from "@/lib/crypto-data";
import { Button } from "@/components/ui/button";
import {
  Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, ArrowLeftRight,
  Eye, EyeOff, TrendingUp, X, Search
} from "lucide-react";
import { toast } from "sonner";

const Wallet = () => {
  const { user, isAuthenticated } = useAuth();
  const { balances, transactions, deposit, withdraw, addTransaction, getPortfolioValue } = useWallet();
  const { assets, getPrice } = usePrices();
  const navigate = useNavigate();

  const [hideBalances, setHideBalances] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [modalAsset, setModalAsset] = useState('USDT');
  const [modalAmount, setModalAmount] = useState('');
  const [search, setSearch] = useState('');
  const [hideSmall, setHideSmall] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0b0b0e] flex items-center justify-center">
        <div className="text-center">
          <WalletIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Wallet</h2>
          <p className="text-gray-500 mb-6">Log in to view your wallet and balances</p>
          <Link to="/login">
            <Button className="brand-gradient text-black font-semibold">Log In</Button>
          </Link>
        </div>
      </div>
    );
  }

  const portfolioValue = getPortfolioValue(getPrice);

  const assetList = useMemo(() => {
    const allAssets = new Map<string, { symbol: string; name: string; icon: string; balance: number; usdValue: number; price: number }>();

    // Add USDT
    const usdtBal = balances['USDT'] || 0;
    allAssets.set('USDT', { symbol: 'USDT', name: 'Tether', icon: '$', balance: usdtBal, usdValue: usdtBal, price: 1 });

    // Add all crypto with balances
    assets.forEach(a => {
      const bal = balances[a.symbol] || 0;
      allAssets.set(a.symbol, {
        symbol: a.symbol,
        name: a.name,
        icon: a.icon,
        balance: bal,
        usdValue: bal * a.price,
        price: a.price,
      });
    });

    let list = [...allAssets.values()];

    if (hideSmall) {
      list = list.filter(a => a.usdValue >= 1);
    }

    if (search) {
      list = list.filter(a =>
        a.symbol.toLowerCase().includes(search.toLowerCase()) ||
        a.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return list.sort((a, b) => b.usdValue - a.usdValue);
  }, [balances, assets, hideSmall, search]);

  // Portfolio allocation for pie chart
  const topAllocations = useMemo(() => {
    const items = assetList.filter(a => a.usdValue > 0);
    const total = items.reduce((s, a) => s + a.usdValue, 0);
    return items.slice(0, 6).map(a => ({
      ...a,
      percentage: total > 0 ? (a.usdValue / total) * 100 : 0,
    }));
  }, [assetList]);

  const handleDeposit = () => {
    const amt = parseFloat(modalAmount);
    if (!amt || amt <= 0) { toast.error("Enter a valid amount"); return; }
    deposit(modalAsset, amt);
    addTransaction({ type: 'deposit', asset: modalAsset, amount: amt, description: `Deposited ${amt} ${modalAsset}` });
    toast.success(`Deposited ${amt} ${modalAsset}`);
    setShowDeposit(false);
    setModalAmount('');
  };

  const handleWithdraw = () => {
    const amt = parseFloat(modalAmount);
    if (!amt || amt <= 0) { toast.error("Enter a valid amount"); return; }
    const ok = withdraw(modalAsset, amt);
    if (!ok) { toast.error(`Insufficient ${modalAsset} balance`); return; }
    addTransaction({ type: 'withdraw', asset: modalAsset, amount: amt, description: `Withdrew ${amt} ${modalAsset}` });
    toast.success(`Withdrew ${amt} ${modalAsset}`);
    setShowWithdraw(false);
    setModalAmount('');
  };

  const pieColors = ['#0ecb81', '#3b82f6', '#f6465d', '#f0b90b', '#8b5cf6', '#06b6d4'];

  // SVG pie chart
  const renderPieChart = () => {
    if (topAllocations.length === 0) return null;
    let cumulativeAngle = 0;
    const paths = topAllocations.map((item, i) => {
      const angle = (item.percentage / 100) * 360;
      const startAngle = cumulativeAngle;
      const endAngle = cumulativeAngle + angle;
      cumulativeAngle = endAngle;

      const startRad = (startAngle - 90) * Math.PI / 180;
      const endRad = (endAngle - 90) * Math.PI / 180;
      const x1 = 50 + 40 * Math.cos(startRad);
      const y1 = 50 + 40 * Math.sin(startRad);
      const x2 = 50 + 40 * Math.cos(endRad);
      const y2 = 50 + 40 * Math.sin(endRad);
      const largeArc = angle > 180 ? 1 : 0;

      if (angle >= 359.9) {
        return <circle key={i} cx="50" cy="50" r="40" fill={pieColors[i % pieColors.length]} />;
      }

      return (
        <path
          key={i}
          d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
          fill={pieColors[i % pieColors.length]}
        />
      );
    });

    return (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {paths}
        <circle cx="50" cy="50" r="25" fill="#0d0d10" />
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-[#0b0b0e]">
      <div className="max-w-[1600px] mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Wallet Overview</h1>
            <p className="text-gray-500 text-sm">Manage your crypto assets</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => { setShowDeposit(true); setModalAsset('USDT'); setModalAmount(''); }} className="brand-gradient text-black font-semibold gap-2">
              <ArrowDownLeft className="w-4 h-4" /> Deposit
            </Button>
            <Button onClick={() => { setShowWithdraw(true); setModalAsset('USDT'); setModalAmount(''); }} variant="outline" className="border-[#2a2a2e] text-white hover:bg-white/5 gap-2">
              <ArrowUpRight className="w-4 h-4" /> Withdraw
            </Button>
            <Button onClick={() => navigate('/convert')} variant="outline" className="border-[#2a2a2e] text-white hover:bg-white/5 gap-2">
              <ArrowLeftRight className="w-4 h-4" /> Convert
            </Button>
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2 bg-[#0d0d10] border border-[#1a1a1e] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-gray-500">Total Portfolio Value</h3>
              <button onClick={() => setHideBalances(!hideBalances)} className="text-gray-400 hover:text-white">
                {hideBalances ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="text-4xl font-bold text-white mb-2">
              {hideBalances ? '****' : `$${portfolioValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
            </div>
            <div className="flex items-center gap-2 text-[#0ecb81] text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>Portfolio Performance</span>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-[#0d0d10] border border-[#1a1a1e] rounded-2xl p-6">
            <h3 className="text-sm text-gray-500 mb-3">Allocation</h3>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 shrink-0">
                {renderPieChart()}
              </div>
              <div className="space-y-1 text-xs">
                {topAllocations.map((item, i) => (
                  <div key={item.symbol} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: pieColors[i % pieColors.length] }} />
                    <span className="text-gray-300">{item.symbol}</span>
                    <span className="text-gray-500">{item.percentage.toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Asset Balances */}
        <div className="bg-[#0d0d10] border border-[#1a1a1e] rounded-2xl overflow-hidden mb-8">
          <div className="p-4 border-b border-[#1a1a1e] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-white">Assets</h3>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hideSmall}
                  onChange={e => setHideSmall(e.target.checked)}
                  className="accent-[#0ecb81]"
                />
                Hide small balances
              </label>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="bg-[#1a1a1e] border border-[#2a2a2e] rounded-lg pl-7 pr-3 py-1.5 text-xs text-white placeholder-gray-600 w-40"
                />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 text-xs border-b border-[#1a1a1e]">
                  <th className="text-left py-3 px-4">Asset</th>
                  <th className="text-right py-3 px-4">Balance</th>
                  <th className="text-right py-3 px-4 hidden sm:table-cell">Price</th>
                  <th className="text-right py-3 px-4">USD Value</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {assetList.map(a => (
                  <tr key={a.symbol} className="border-b border-[#1a1a1e]/50 hover:bg-white/[0.02]">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#1a1a1e] flex items-center justify-center text-sm font-bold text-[#0ecb81]">
                          {a.icon}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{a.symbol}</div>
                          <div className="text-xs text-gray-500">{a.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right text-white font-medium">
                      {hideBalances ? '****' : a.balance > 0 ? a.balance.toFixed(a.symbol === 'USDT' ? 2 : 6) : '0'}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-400 hidden sm:table-cell">
                      ${formatPrice(a.price)}
                    </td>
                    <td className="py-3 px-4 text-right text-white">
                      {hideBalances ? '****' : `$${a.usdValue.toFixed(2)}`}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => { setShowDeposit(true); setModalAsset(a.symbol); setModalAmount(''); }}
                          className="text-xs text-[#0ecb81] hover:underline"
                        >
                          Deposit
                        </button>
                        <button
                          onClick={() => { setShowWithdraw(true); setModalAsset(a.symbol); setModalAmount(''); }}
                          className="text-xs text-gray-400 hover:text-white"
                        >
                          Withdraw
                        </button>
                        {a.symbol !== 'USDT' && (
                          <Link to={`/trade?pair=${a.symbol}`} className="text-xs text-[#3b82f6] hover:underline">
                            Trade
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-[#0d0d10] border border-[#1a1a1e] rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-[#1a1a1e]">
            <h3 className="text-lg font-semibold text-white">Transaction History</h3>
          </div>
          {transactions.length === 0 ? (
            <p className="text-gray-500 text-sm p-8 text-center">No transactions yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-gray-500 border-b border-[#1a1a1e]">
                    <th className="text-left py-2 px-4">Date</th>
                    <th className="text-left py-2 px-4">Type</th>
                    <th className="text-left py-2 px-4">Asset</th>
                    <th className="text-right py-2 px-4">Amount</th>
                    <th className="text-left py-2 px-4 hidden md:table-cell">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.slice(0, 50).map(tx => (
                    <tr key={tx.id} className="border-b border-[#1a1a1e]/50 hover:bg-white/[0.02]">
                      <td className="py-2 px-4 text-gray-400">{new Date(tx.timestamp).toLocaleString()}</td>
                      <td className="py-2 px-4">
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          tx.type.includes('buy') || tx.type === 'deposit' ? 'bg-[#0ecb81]/10 text-[#0ecb81]' :
                          tx.type.includes('sell') || tx.type === 'withdraw' ? 'bg-[#f6465d]/10 text-[#f6465d]' :
                          'bg-[#3b82f6]/10 text-[#3b82f6]'
                        }`}>
                          {tx.type.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-2 px-4 text-white">{tx.asset}</td>
                      <td className="py-2 px-4 text-right text-white">{tx.amount.toFixed(6)}</td>
                      <td className="py-2 px-4 text-gray-400 hidden md:table-cell">{tx.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Deposit Modal */}
      {showDeposit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#14151a] border border-[#2a2a2e] rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Deposit {modalAsset}</h3>
              <button onClick={() => setShowDeposit(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <p className="text-xs text-gray-500 mb-4">This is a simulated deposit for demo purposes.</p>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Asset</label>
                <select
                  value={modalAsset}
                  onChange={e => setModalAsset(e.target.value)}
                  className="w-full bg-[#1a1a1e] border border-[#2a2a2e] rounded-lg px-3 py-2.5 text-sm text-white"
                >
                  <option value="USDT">USDT</option>
                  {assets.map(a => <option key={a.symbol} value={a.symbol}>{a.symbol}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Amount</label>
                <input
                  type="text"
                  value={modalAmount}
                  onChange={e => { if (e.target.value === '' || /^\d*\.?\d*$/.test(e.target.value)) setModalAmount(e.target.value); }}
                  placeholder="0.00"
                  className="w-full bg-[#1a1a1e] border border-[#2a2a2e] rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600"
                />
              </div>
              <Button onClick={handleDeposit} className="w-full brand-gradient text-black font-semibold">
                Deposit
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdraw && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#14151a] border border-[#2a2a2e] rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Withdraw {modalAsset}</h3>
              <button onClick={() => setShowWithdraw(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <p className="text-xs text-gray-500 mb-4">This is a simulated withdrawal for demo purposes.</p>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Asset</label>
                <select
                  value={modalAsset}
                  onChange={e => setModalAsset(e.target.value)}
                  className="w-full bg-[#1a1a1e] border border-[#2a2a2e] rounded-lg px-3 py-2.5 text-sm text-white"
                >
                  <option value="USDT">USDT</option>
                  {assets.map(a => <option key={a.symbol} value={a.symbol}>{a.symbol}</option>)}
                </select>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Available</span>
                <span className="text-white">{(balances[modalAsset] || 0).toFixed(6)} {modalAsset}</span>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Amount</label>
                <div className="relative">
                  <input
                    type="text"
                    value={modalAmount}
                    onChange={e => { if (e.target.value === '' || /^\d*\.?\d*$/.test(e.target.value)) setModalAmount(e.target.value); }}
                    placeholder="0.00"
                    className="w-full bg-[#1a1a1e] border border-[#2a2a2e] rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600"
                  />
                  <button
                    onClick={() => setModalAmount((balances[modalAsset] || 0).toString())}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#0ecb81] hover:underline"
                  >
                    MAX
                  </button>
                </div>
              </div>
              <Button onClick={handleWithdraw} className="w-full bg-[#f6465d] hover:bg-[#f6465d]/90 text-white font-semibold">
                Withdraw
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
