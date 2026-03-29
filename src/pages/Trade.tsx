import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { usePrices } from "@/contexts/PriceContext";
import { useAuth } from "@/contexts/AuthContext";
import { useWallet } from "@/contexts/WalletContext";
import { formatPrice, formatVolume } from "@/lib/crypto-data";
import { getOpenOrders, getOrderHistory, cancelOrder, checkLimitOrders } from "@/lib/trading-engine";
import type { Order } from "@/lib/trading-engine";
import TradingChart from "@/components/TradingChart";
import OrderBook from "@/components/OrderBook";
import TradePanel from "@/components/TradePanel";
import RecentTrades from "@/components/RecentTrades";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Clock, BarChart3, X } from "lucide-react";
import { toast } from "sonner";

const Trade = () => {
  const [searchParams] = useSearchParams();
  const pairParam = searchParams.get("pair") || "BTC";
  const [selectedPair, setSelectedPair] = useState(pairParam);
  const [orderRefresh, setOrderRefresh] = useState(0);

  const { assets, getPrice } = usePrices();
  const { user, isAuthenticated } = useAuth();
  const { deposit, addTransaction } = useWallet();

  const currentAsset = useMemo(
    () => assets.find(a => a.symbol === selectedPair) || assets[0],
    [assets, selectedPair]
  );

  const openOrders = useMemo(() => {
    if (!user) return [];
    return getOpenOrders(user.id);
  }, [user, orderRefresh]);

  const orderHistory = useMemo(() => {
    if (!user) return [];
    return getOrderHistory(user.id).slice(0, 50);
  }, [user, orderRefresh]);

  // Check limit orders on price changes
  useEffect(() => {
    if (!user) return;
    const prices: Record<string, number> = {};
    assets.forEach(a => { prices[a.symbol] = a.price; });
    const filled = checkLimitOrders(user.id, prices, deposit, addTransaction);
    if (filled.length > 0) {
      filled.forEach(o => {
        toast.success(`Limit order filled: ${o.side} ${o.amount} ${o.pair.replace('/USDT', '')} at $${formatPrice(o.price)}`);
      });
      setOrderRefresh(r => r + 1);
    }
  }, [assets, user]);

  const handleCancelOrder = useCallback((orderId: string) => {
    if (!user) return;
    const ok = cancelOrder(user.id, orderId, deposit);
    if (ok) {
      toast.success("Order cancelled");
      setOrderRefresh(r => r + 1);
    }
  }, [user, deposit]);

  const handleOrderPlaced = useCallback(() => {
    setOrderRefresh(r => r + 1);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0b0e]">
      {/* Pair Header */}
      <div className="border-b border-[#1a1a1e] bg-[#0d0d10]">
        <div className="max-w-[1600px] mx-auto px-4 py-3">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Pair Selector */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0 scrollbar-thin">
              {assets.slice(0, 10).map(asset => (
                <button
                  key={asset.id}
                  onClick={() => setSelectedPair(asset.symbol)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg whitespace-nowrap text-sm transition-colors ${
                    selectedPair === asset.symbol
                      ? "bg-[#0ecb81]/10 text-[#0ecb81] border border-[#0ecb81]/30"
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
                  <TabsTrigger value="open-orders" className="data-[state=active]:text-[#0ecb81] data-[state=active]:border-b-2 data-[state=active]:border-[#0ecb81] rounded-none text-gray-500 text-sm py-3 px-4">
                    <Clock className="w-3 h-3 mr-1" /> Open Orders ({openOrders.length})
                  </TabsTrigger>
                  <TabsTrigger value="order-history" className="data-[state=active]:text-[#0ecb81] data-[state=active]:border-b-2 data-[state=active]:border-[#0ecb81] rounded-none text-gray-500 text-sm py-3 px-4">
                    <BarChart3 className="w-3 h-3 mr-1" /> Order History
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="open-orders" className="p-0">
                  {!isAuthenticated ? (
                    <p className="text-gray-500 text-sm p-8 text-center">Log in to view your open orders</p>
                  ) : openOrders.length === 0 ? (
                    <p className="text-gray-500 text-sm p-8 text-center">No open orders</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="text-gray-500 border-b border-[#1a1a1e]">
                            <th className="text-left py-2 px-4">Date</th>
                            <th className="text-left py-2 px-4">Pair</th>
                            <th className="text-left py-2 px-4">Type</th>
                            <th className="text-left py-2 px-4">Side</th>
                            <th className="text-right py-2 px-4">Price</th>
                            <th className="text-right py-2 px-4">Amount</th>
                            <th className="text-right py-2 px-4">Total</th>
                            <th className="text-right py-2 px-4">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {openOrders.map((order: Order) => (
                            <tr key={order.id} className="border-b border-[#1a1a1e]/50 hover:bg-white/[0.02]">
                              <td className="py-2 px-4 text-gray-400">{new Date(order.timestamp).toLocaleString()}</td>
                              <td className="py-2 px-4 text-white">{order.pair}</td>
                              <td className="py-2 px-4 text-gray-400 capitalize">{order.type}</td>
                              <td className={`py-2 px-4 capitalize ${order.side === 'buy' ? 'text-[#0ecb81]' : 'text-[#f6465d]'}`}>{order.side}</td>
                              <td className="py-2 px-4 text-right text-white">${formatPrice(order.price)}</td>
                              <td className="py-2 px-4 text-right text-white">{order.amount.toFixed(6)}</td>
                              <td className="py-2 px-4 text-right text-white">${order.total.toFixed(2)}</td>
                              <td className="py-2 px-4 text-right">
                                <button
                                  onClick={() => handleCancelOrder(order.id)}
                                  className="text-[#f6465d] hover:text-[#f6465d]/80 p-1"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="order-history" className="p-0">
                  {!isAuthenticated ? (
                    <p className="text-gray-500 text-sm p-8 text-center">Log in to view your order history</p>
                  ) : orderHistory.length === 0 ? (
                    <p className="text-gray-500 text-sm p-8 text-center">No order history</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="text-gray-500 border-b border-[#1a1a1e]">
                            <th className="text-left py-2 px-4">Date</th>
                            <th className="text-left py-2 px-4">Pair</th>
                            <th className="text-left py-2 px-4">Type</th>
                            <th className="text-left py-2 px-4">Side</th>
                            <th className="text-right py-2 px-4">Price</th>
                            <th className="text-right py-2 px-4">Amount</th>
                            <th className="text-right py-2 px-4">Total</th>
                            <th className="text-right py-2 px-4">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderHistory.map((order: Order) => (
                            <tr key={order.id} className="border-b border-[#1a1a1e]/50 hover:bg-white/[0.02]">
                              <td className="py-2 px-4 text-gray-400">{new Date(order.timestamp).toLocaleString()}</td>
                              <td className="py-2 px-4 text-white">{order.pair}</td>
                              <td className="py-2 px-4 text-gray-400 capitalize">{order.type}</td>
                              <td className={`py-2 px-4 capitalize ${order.side === 'buy' ? 'text-[#0ecb81]' : 'text-[#f6465d]'}`}>{order.side}</td>
                              <td className="py-2 px-4 text-right text-white">${formatPrice(order.price)}</td>
                              <td className="py-2 px-4 text-right text-white">{order.amount.toFixed(6)}</td>
                              <td className="py-2 px-4 text-right text-white">${order.total.toFixed(2)}</td>
                              <td className="py-2 px-4 text-right">
                                <span className={`px-2 py-0.5 rounded text-xs ${
                                  order.status === 'filled' ? 'bg-[#0ecb81]/10 text-[#0ecb81]' : 'bg-[#f6465d]/10 text-[#f6465d]'
                                }`}>
                                  {order.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Column - Trade Panel + Recent Trades */}
          <div className="xl:col-span-3 order-2 xl:order-3 space-y-4">
            <TradePanel symbol={currentAsset.symbol} price={currentAsset.price} onOrderPlaced={handleOrderPlaced} />
            <RecentTrades basePrice={currentAsset.price} symbol={currentAsset.symbol} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trade;
