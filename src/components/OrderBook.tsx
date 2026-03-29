import { useMemo } from "react";
import { generateOrderBook, formatPrice } from "@/lib/crypto-data";

interface OrderBookProps {
  basePrice: number;
  symbol: string;
}

const OrderBook = ({ basePrice, symbol }: OrderBookProps) => {
  const { asks, bids } = useMemo(() => generateOrderBook(basePrice), [basePrice]);

  const maxTotal = Math.max(
    asks[asks.length - 1]?.total ?? 0,
    bids[bids.length - 1]?.total ?? 0
  );

  return (
    <div className="bg-[#0d0d10] rounded-xl border border-[#1a1a1e] h-full">
      <div className="p-3 border-b border-[#1a1a1e] flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Order Book</h3>
        <span className="text-xs text-gray-500">{symbol}/USDT</span>
      </div>

      {/* Column Headers */}
      <div className="grid grid-cols-3 text-xs text-gray-500 px-3 py-1.5 border-b border-[#1a1a1e]">
        <span>Price (USDT)</span>
        <span className="text-right">Amount ({symbol})</span>
        <span className="text-right">Total</span>
      </div>

      {/* Asks (sell orders) - reversed so lowest ask is at bottom */}
      <div className="overflow-hidden">
        {[...asks].reverse().map((ask, i) => (
          <div key={`ask-${i}`} className="relative grid grid-cols-3 text-xs px-3 py-0.5 hover:bg-white/5">
            <div
              className="absolute right-0 top-0 bottom-0 bg-[#f6465d]/10"
              style={{ width: `${(ask.total / maxTotal) * 100}%` }}
            />
            <span className="relative text-[#f6465d]">{formatPrice(ask.price)}</span>
            <span className="relative text-right text-gray-300">{ask.amount.toFixed(4)}</span>
            <span className="relative text-right text-gray-500">{ask.total.toFixed(4)}</span>
          </div>
        ))}
      </div>

      {/* Spread / Current Price */}
      <div className="px-3 py-2 border-y border-[#1a1a1e] flex items-center justify-between">
        <span className="text-lg font-bold text-[#0ecb81]">{formatPrice(basePrice)}</span>
        <span className="text-xs text-gray-500">
          ≈ ${formatPrice(basePrice)}
        </span>
      </div>

      {/* Bids (buy orders) */}
      <div className="overflow-hidden">
        {bids.map((bid, i) => (
          <div key={`bid-${i}`} className="relative grid grid-cols-3 text-xs px-3 py-0.5 hover:bg-white/5">
            <div
              className="absolute right-0 top-0 bottom-0 bg-[#0ecb81]/10"
              style={{ width: `${(bid.total / maxTotal) * 100}%` }}
            />
            <span className="relative text-[#0ecb81]">{formatPrice(bid.price)}</span>
            <span className="relative text-right text-gray-300">{bid.amount.toFixed(4)}</span>
            <span className="relative text-right text-gray-500">{bid.total.toFixed(4)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderBook;
