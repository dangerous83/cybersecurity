import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { usePrices } from "@/contexts/PriceContext";
import { useAuth } from "@/contexts/AuthContext";
import { useWallet } from "@/contexts/WalletContext";
import { formatPrice, formatVolume } from "@/lib/crypto-data";
import TradingChart from "@/components/TradingChart";
import OrderBook from "@/components/OrderBook";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface FuturesPosition {
  id: string;
  symbol: string;
  side: 'long' | 'short';
  leverage: number;
  margin: number;
  entryPrice: number;
  size: number;
  timestamp: string;
}

const leverages = [1, 2, 5, 10, 20, 50, 75, 100, 125];

const POSITIONS_KEY = 'korypto_futures_positions_';

function getPositions(userId: string): FuturesPosition[] {
  try {
    const raw = localStorage.getItem(POSITIONS_KEY + userId);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function savePositions(userId: string, positions: FuturesPosition[]) {
  localStorage.setItem(POSITIONS_KEY + userId, JSON.stringify(positions));
}

const Futures = () => {
  const { assets } = usePrices();
  const { user, isAuthenticated } = useAuth();
  const { getBalance, deposit, withdraw, addTransaction } = useWallet();
  const [selectedPair, setSelectedPair] = useState("BTC");
  const [leverage, setLeverage] = useState(20);
  const [side, setSide] = useState<'long' | 'short'>('long');
  const [margin, setMargin] = useState('');
  const [marginMode, setMarginMode] = useState<'cross' | 'isolated'>('cross');
  const [posRefresh, setPosRefresh] = useState(0);

  const asset = assets.find(a => a.symbol === selectedPair) || assets[0];
  const usdtBalance = getBalance('USDT');

  const positions = useMemo(() => {
    if (!user) return [];
    return getPositions(user.id);
  }, [user, posRefresh]);

  const marginNum = parseFloat(margin || '0');
  const positionSize = marginNum * leverage;
  const entryPrice = asset.price;
  const liqPrice = side === 'long'
    ? entryPrice * (1 - 0.9 / leverage)
    : entryPrice * (1 + 0.9 / leverage);

  const fundingRate = 0.01;

  const handleOpenPosition = () => {
    if (!user) return;
    if (marginNum <= 0) { toast.error("Enter a valid margin amount"); return; }

    const ok = withdraw('USDT', marginNum);
    if (!ok) { toast.error("Insufficient USDT balance"); return; }

    const pos: FuturesPosition = {
      id: 'fut-' + Date.now(),
      symbol: selectedPair,
      side,
      leverage,
      margin: marginNum,
      entryPrice,
      size: positionSize,
      timestamp: new Date().toISOString(),
    };

    const existing = getPositions(user.id);
    existing.unshift(pos);
    savePositions(user.id, existing.slice(0, 100));

    addTransaction({
      type: 'trade_buy',
      asset: selectedPair,
      amount: marginNum,
      description: `Opened ${side} ${selectedPair} ${leverage}x - margin $${marginNum.toFixed(2)}`,
    });

    toast.success(`Opened ${leverage}x ${side} ${selectedPair} position - $${positionSize.toFixed(2)}`);
    setMargin('');
    setPosRefresh(r => r + 1);
  };

  const handleClosePosition = (pos: FuturesPosition) => {
    if (!user) return;
    const currentPrice = assets.find(a => a.symbol === pos.symbol)?.price || pos.entryPrice;
    const pnlPercent = pos.side === 'long'
      ? ((currentPrice - pos.entryPrice) / pos.entryPrice) * pos.leverage
      : ((pos.entryPrice - currentPrice) / pos.entryPrice) * pos.leverage;
    const pnl = pos.margin * pnlPercent;
    const returnAmount = Math.max(0, pos.margin + pnl);

    deposit('USDT', returnAmount);

    const existing = getPositions(user.id);
    const updated = existing.filter(p => p.id !== pos.id);
    savePositions(user.id, updated);

    addTransaction({
      type: 'trade_sell',
      asset: pos.symbol,
      amount: returnAmount,
      description: `Closed ${pos.side} ${pos.symbol} ${pos.leverage}x - PnL: $${pnl.toFixed(2)}`,
    });

    toast.success(`Closed ${pos.symbol} ${pos.side} - PnL: $${pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}`);
    setPosRefresh(r => r + 1);
  };

  return (
    <div className="min-h-screen bg-[#0b0b0e]">
      {/* Warning Banner */}
      <div className="bg-[#f6465d]/10 border-b border-[#f6465d]/20">
        <div className="max-w-[1600px] mx-auto px-4 py-2 flex items-center gap-2 text-[#f6465d] text-xs">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>Futures trading involves significant risk. Only trade with funds you can afford to lose.</span>
        </div>
      </div>

      {/* Pair Header */}
      <div className="border-b border-[#1a1a1e] bg-[#0d0d10]">
        <div className="max-w-[1600px] mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-thin">
              {assets.slice(0, 8).map(a => (
                <button
                  key={a.id}
                  onClick={() => setSelectedPair(a.symbol)}
                  className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap ${
                    selectedPair === a.symbol
                      ? "bg-[#0ecb81]/10 text-[#0ecb81] border border-[#0ecb81]/30"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {a.symbol}USDT Perp
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4 md:ml-auto text-xs">
              <div className="px-2 py-1 rounded bg-[#0ecb81]/10 text-[#0ecb81] font-semibold">
                {leverage}x
              </div>
              <span className="text-gray-500">Mark: <span className="text-white">${formatPrice(asset.price * 1.001)}</span></span>
              <span className="text-gray-500">Index: <span className="text-white">${formatPrice(asset.price)}</span></span>
              <span className="text-gray-500">Funding: <span className="text-[#0ecb81]">{fundingRate.toFixed(4)}%</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 py-4">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
          {/* Order Book */}
          <div className="xl:col-span-2 order-3 xl:order-1">
            <OrderBook basePrice={asset.price} symbol={asset.symbol} />
          </div>

          {/* Chart + Positions */}
          <div className="xl:col-span-7 order-1 xl:order-2 space-y-4">
            <TradingChart symbol={`${asset.symbol}USDT Perpetual`} basePrice={asset.price} change={asset.changePercent24h} />

            {/* Positions */}
            <div className="bg-[#0d0d10] rounded-xl border border-[#1a1a1e]">
              <div className="px-4 py-3 border-b border-[#1a1a1e]">
                <h3 className="text-sm font-semibold text-white">Open Positions ({positions.length})</h3>
              </div>
              {!isAuthenticated ? (
                <p className="text-gray-500 text-sm p-8 text-center">Log in to view positions</p>
              ) : positions.length === 0 ? (
                <p className="text-gray-500 text-sm p-8 text-center">No open positions</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-gray-500 border-b border-[#1a1a1e]">
                        <th className="text-left py-2 px-4">Symbol</th>
                        <th className="text-left py-2 px-4">Side</th>
                        <th className="text-right py-2 px-4">Leverage</th>
                        <th className="text-right py-2 px-4">Size</th>
                        <th className="text-right py-2 px-4">Entry</th>
                        <th className="text-right py-2 px-4">Mark</th>
                        <th className="text-right py-2 px-4">PnL</th>
                        <th className="text-right py-2 px-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {positions.map(pos => {
                        const currentPrice = assets.find(a => a.symbol === pos.symbol)?.price || pos.entryPrice;
                        const pnlPercent = pos.side === 'long'
                          ? ((currentPrice - pos.entryPrice) / pos.entryPrice) * pos.leverage
                          : ((pos.entryPrice - currentPrice) / pos.entryPrice) * pos.leverage;
                        const pnl = pos.margin * pnlPercent;
                        const roe = (pnl / pos.margin) * 100;

                        return (
                          <tr key={pos.id} className="border-b border-[#1a1a1e]/50 hover:bg-white/[0.02]">
                            <td className="py-2 px-4 text-white font-medium">{pos.symbol}USDT</td>
                            <td className={`py-2 px-4 capitalize ${pos.side === 'long' ? 'text-[#0ecb81]' : 'text-[#f6465d]'}`}>{pos.side}</td>
                            <td className="py-2 px-4 text-right text-[#0ecb81]">{pos.leverage}x</td>
                            <td className="py-2 px-4 text-right text-white">${pos.size.toFixed(2)}</td>
                            <td className="py-2 px-4 text-right text-white">${formatPrice(pos.entryPrice)}</td>
                            <td className="py-2 px-4 text-right text-white">${formatPrice(currentPrice)}</td>
                            <td className={`py-2 px-4 text-right ${pnl >= 0 ? 'text-[#0ecb81]' : 'text-[#f6465d]'}`}>
                              ${pnl >= 0 ? '+' : ''}{pnl.toFixed(2)} ({roe >= 0 ? '+' : ''}{roe.toFixed(1)}%)
                            </td>
                            <td className="py-2 px-4 text-right">
                              <button
                                onClick={() => handleClosePosition(pos)}
                                className="px-2 py-1 text-xs bg-[#f6465d]/10 text-[#f6465d] rounded hover:bg-[#f6465d]/20"
                              >
                                Close
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Futures Trade Panel */}
          <div className="xl:col-span-3 order-2 xl:order-3">
            <div className="bg-[#0d0d10] rounded-xl border border-[#1a1a1e]">
              {/* Cross / Isolated */}
              <div className="flex border-b border-[#1a1a1e] text-xs">
                <button
                  onClick={() => setMarginMode('cross')}
                  className={`flex-1 py-2.5 font-medium ${marginMode === 'cross' ? 'text-[#0ecb81] border-b-2 border-[#0ecb81]' : 'text-gray-400 hover:text-white'}`}
                >
                  Cross
                </button>
                <button
                  onClick={() => setMarginMode('isolated')}
                  className={`flex-1 py-2.5 font-medium ${marginMode === 'isolated' ? 'text-[#0ecb81] border-b-2 border-[#0ecb81]' : 'text-gray-400 hover:text-white'}`}
                >
                  Isolated
                </button>
              </div>

              {/* Leverage Selector */}
              <div className="p-4 border-b border-[#1a1a1e]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500">Leverage</span>
                  <span className="text-sm font-bold text-[#0ecb81]">{leverage}x</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={125}
                  value={leverage}
                  onChange={e => setLeverage(Number(e.target.value))}
                  className="w-full h-1 bg-[#1a1a1e] rounded appearance-none cursor-pointer accent-[#0ecb81]"
                />
                <div className="flex flex-wrap justify-between mt-2 gap-1">
                  {leverages.map(l => (
                    <button
                      key={l}
                      onClick={() => setLeverage(l)}
                      className={`text-[10px] px-1.5 py-0.5 rounded ${
                        leverage === l ? 'bg-[#0ecb81]/10 text-[#0ecb81]' : 'text-gray-500 hover:text-white'
                      }`}
                    >
                      {l}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Long/Short */}
              <div className="p-4 space-y-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => setSide('long')}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-1 ${
                      side === 'long'
                        ? 'bg-[#0ecb81] text-white'
                        : 'bg-[#1a1a1e] text-gray-400 hover:text-white'
                    }`}
                  >
                    <TrendingUp className="w-4 h-4" /> Long
                  </button>
                  <button
                    onClick={() => setSide('short')}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-1 ${
                      side === 'short'
                        ? 'bg-[#f6465d] text-white'
                        : 'bg-[#1a1a1e] text-gray-400 hover:text-white'
                    }`}
                  >
                    <TrendingDown className="w-4 h-4" /> Short
                  </button>
                </div>

                {/* Margin */}
                <div className="space-y-1">
                  <label className="text-xs text-gray-500">Margin (USDT)</label>
                  <input
                    type="text"
                    value={margin}
                    onChange={e => {
                      const v = e.target.value;
                      if (v === '' || /^\d*\.?\d*$/.test(v)) setMargin(v);
                    }}
                    placeholder="0.00"
                    className="w-full bg-[#1a1a1e] border border-[#2a2a2e] rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#0ecb81]/50"
                  />
                </div>

                {/* Quick margin buttons */}
                <div className="flex gap-2">
                  {[10, 25, 50, 100].map(pct => (
                    <button
                      key={pct}
                      onClick={() => setMargin((usdtBalance * pct / 100).toFixed(2))}
                      className="flex-1 text-xs py-1 rounded bg-[#1a1a1e] text-gray-400 hover:text-white hover:bg-[#222]"
                    >
                      {pct}%
                    </button>
                  ))}
                </div>

                {/* Position info */}
                <div className="text-xs text-gray-500 space-y-1.5 bg-[#1a1a1e] rounded-lg p-3">
                  <div className="flex justify-between">
                    <span>Position Size</span>
                    <span className="text-white">
                      {marginNum > 0 ? `$${positionSize.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : '$0.00'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Entry Price</span>
                    <span className="text-white">${formatPrice(asset.price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Liq. Price (est.)</span>
                    <span className="text-[#f6465d]">${formatPrice(liqPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Funding Rate</span>
                    <span className="text-[#0ecb81]">{fundingRate.toFixed(4)}%</span>
                  </div>
                </div>

                {isAuthenticated ? (
                  <Button
                    onClick={handleOpenPosition}
                    className={`w-full py-3 font-semibold ${
                      side === 'long'
                        ? 'bg-[#0ecb81] hover:bg-[#0ecb81]/90 text-white'
                        : 'bg-[#f6465d] hover:bg-[#f6465d]/90 text-white'
                    }`}
                  >
                    {side === 'long' ? `Open Long ${asset.symbol}` : `Open Short ${asset.symbol}`}
                  </Button>
                ) : (
                  <Link to="/login">
                    <Button className="w-full py-3 font-semibold brand-gradient text-black">
                      Log In to Trade
                    </Button>
                  </Link>
                )}

                <div className="flex justify-between text-xs text-gray-500 pt-1">
                  <span>Available</span>
                  <span className="text-gray-300">{isAuthenticated ? `${usdtBalance.toFixed(2)} USDT` : '--'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Futures;
