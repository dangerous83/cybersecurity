import { useState } from "react";
import { useLivePrices } from "@/hooks/useLivePrices";
import { formatPrice, formatVolume } from "@/lib/crypto-data";
import TradingChart from "@/components/TradingChart";
import OrderBook from "@/components/OrderBook";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

const leverages = [1, 2, 5, 10, 20, 50, 75, 100, 125];

const Futures = () => {
  const assets = useLivePrices();
  const [selectedPair, setSelectedPair] = useState("BTC");
  const [leverage, setLeverage] = useState(20);
  const [side, setSide] = useState<'long' | 'short'>('long');
  const [margin, setMargin] = useState('');

  const asset = assets.find(a => a.symbol === selectedPair) || assets[0];

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
              {assets.slice(0, 6).map(a => (
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
              <span className="text-gray-500">Funding: <span className="text-[#0ecb81]">0.0100%</span></span>
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

          {/* Chart */}
          <div className="xl:col-span-7 order-1 xl:order-2">
            <TradingChart symbol={`${asset.symbol}USDT Perpetual`} basePrice={asset.price} change={asset.changePercent24h} />
          </div>

          {/* Futures Trade Panel */}
          <div className="xl:col-span-3 order-2 xl:order-3">
            <div className="bg-[#0d0d10] rounded-xl border border-[#1a1a1e]">
              {/* Cross / Isolated */}
              <div className="flex border-b border-[#1a1a1e] text-xs">
                <button className="flex-1 py-2.5 text-[#0ecb81] border-b-2 border-[#0ecb81] font-medium">Cross</button>
                <button className="flex-1 py-2.5 text-gray-400 hover:text-white">Isolated</button>
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
                <div className="flex justify-between mt-2 gap-1">
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
                    onChange={e => setMargin(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-[#1a1a1e] border border-[#2a2a2e] rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#0ecb81]/50"
                  />
                </div>

                {/* Position size */}
                <div className="text-xs text-gray-500 space-y-1">
                  <div className="flex justify-between">
                    <span>Position Size</span>
                    <span className="text-white">
                      {margin ? `$${(parseFloat(margin) * leverage).toLocaleString()}` : '$0.00'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Entry Price</span>
                    <span className="text-white">${formatPrice(asset.price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Liq. Price (est.)</span>
                    <span className="text-[#f6465d]">
                      ${formatPrice(side === 'long' ? asset.price * (1 - 0.9 / leverage) : asset.price * (1 + 0.9 / leverage))}
                    </span>
                  </div>
                </div>

                <Button className={`w-full py-3 font-semibold ${
                  side === 'long'
                    ? 'bg-[#0ecb81] hover:bg-[#0ecb81]/90 text-white'
                    : 'bg-[#f6465d] hover:bg-[#f6465d]/90 text-white'
                }`}>
                  {side === 'long' ? `Open Long ${asset.symbol}` : `Open Short ${asset.symbol}`}
                </Button>

                <div className="flex justify-between text-xs text-gray-500 pt-1">
                  <span>Available</span>
                  <span>0.00 USDT</span>
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
