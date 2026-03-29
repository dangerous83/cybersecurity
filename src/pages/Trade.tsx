import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useLivePrices } from "@/hooks/useLivePrices";
import { formatPrice, formatVolume } from "@/lib/crypto-data";
import TradingChart from "@/components/TradingChart";
import OrderBook from "@/components/OrderBook";
import TradePanel from "@/components/TradePanel";
import RecentTrades from "@/components/RecentTrades";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, BarChart3, Clock } from "lucide-react";

const Trade = () => {
  const [searchParams] = useSearchParams();
  const pairParam = searchParams.get("pair") || "BTC";
  const [selectedPair, setSelectedPair] = useState(pairParam);

  const assets = useLivePrices();
  const currentAsset = useMemo(
    () => assets.find(a => a.symbol === selectedPair) || assets[0],
    [assets, selectedPair]
  );

  return (
    <div className="min-h-screen bg-[#0b0b0e]">
      {/* Pair Header */}
      <div className="border-b border-[#1a1a1e] bg-[#0d0d10]">
        <div className="max-w-[1600px] mx-auto px-4 py-3">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Pair Selector */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0 scrollbar-thin">
              {assets.slice(0, 8).map(asset => (
                <button
                  key={asset.id}
                  onClick={() => setSelectedPair(asset.symbol)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg whitespace-nowrap text-sm transition-colors ${
                    selectedPair === asset.symbol
                      ? "bg-[#f0b90b]/10 text-[#f0b90b] border border-[#f0b90b]/30"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="font-medium">{asset.symbol}</span>
                  <span className={`text-xs ${asset.changePercent24h >= 0 ? 'text-[#0ecb81]' : 'text-[#f6465d]'}`}>
                    {asset.changePercent24h >= 0 ? '+' : ''}{asset.changePercent24h.toFixed(2)}%
                  </span>
                </button>
              ))}
            </div>

            {/* Stats Bar */}
            <div className="flex items-center gap-6 lg:ml-auto text-xs overflow-x-auto pb-2 lg:pb-0">
              <div>
                <span className="text-gray-500">24h High</span>
                <div className="text-white font-medium">${formatPrice(currentAsset.high24h)}</div>
              </div>
              <div>
                <span className="text-gray-500">24h Low</span>
                <div className="text-white font-medium">${formatPrice(currentAsset.low24h)}</div>
              </div>
              <div>
                <span className="text-gray-500">24h Volume</span>
                <div className="text-white font-medium">${formatVolume(currentAsset.volume24h)}</div>
              </div>
              <div>
                <span className="text-gray-500">24h Change</span>
                <div className={`font-medium flex items-center gap-1 ${
                  currentAsset.changePercent24h >= 0 ? 'text-[#0ecb81]' : 'text-[#f6465d]'
                }`}>
                  {currentAsset.changePercent24h >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {currentAsset.changePercent24h >= 0 ? '+' : ''}{currentAsset.changePercent24h.toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Trading Layout */}
      <div className="max-w-[1600px] mx-auto px-4 py-4">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
          {/* Left Column - Order Book */}
          <div className="xl:col-span-2 order-3 xl:order-1">
            <OrderBook basePrice={currentAsset.price} symbol={currentAsset.symbol} />
          </div>

          {/* Center - Chart */}
          <div className="xl:col-span-7 order-1 xl:order-2 space-y-4">
            <TradingChart
              symbol={currentAsset.symbol}
              basePrice={currentAsset.price}
              change={currentAsset.changePercent24h}
            />

            {/* Bottom Tabs */}
            <div className="bg-[#0d0d10] rounded-xl border border-[#1a1a1e]">
              <Tabs defaultValue="open-orders">
                <TabsList className="bg-transparent border-b border-[#1a1a1e] rounded-none w-full justify-start px-4 h-auto">
                  <TabsTrigger value="open-orders" className="data-[state=active]:text-[#f0b90b] data-[state=active]:border-b-2 data-[state=active]:border-[#f0b90b] rounded-none text-gray-500 text-sm py-3 px-4">
                    <Clock className="w-3 h-3 mr-1" /> Open Orders (0)
                  </TabsTrigger>
                  <TabsTrigger value="order-history" className="data-[state=active]:text-[#f0b90b] data-[state=active]:border-b-2 data-[state=active]:border-[#f0b90b] rounded-none text-gray-500 text-sm py-3 px-4">
                    <BarChart3 className="w-3 h-3 mr-1" /> Order History
                  </TabsTrigger>
                  <TabsTrigger value="trade-history" className="data-[state=active]:text-[#f0b90b] data-[state=active]:border-b-2 data-[state=active]:border-[#f0b90b] rounded-none text-gray-500 text-sm py-3 px-4">
                    Trade History
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="open-orders" className="p-8 text-center">
                  <p className="text-gray-500 text-sm">Log in to view your open orders</p>
                </TabsContent>
                <TabsContent value="order-history" className="p-8 text-center">
                  <p className="text-gray-500 text-sm">Log in to view your order history</p>
                </TabsContent>
                <TabsContent value="trade-history" className="p-8 text-center">
                  <p className="text-gray-500 text-sm">Log in to view your trade history</p>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Column - Trade Panel + Recent Trades */}
          <div className="xl:col-span-3 order-2 xl:order-3 space-y-4">
            <TradePanel symbol={currentAsset.symbol} price={currentAsset.price} />
            <RecentTrades basePrice={currentAsset.price} symbol={currentAsset.symbol} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trade;
