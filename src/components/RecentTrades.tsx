import { useMemo } from "react";
import { generateRecentTrades, formatPrice } from "@/lib/crypto-data";

interface RecentTradesProps {
  basePrice: number;
  symbol: string;
}

const RecentTrades = ({ basePrice, symbol }: RecentTradesProps) => {
  const trades = useMemo(() => generateRecentTrades(basePrice), [basePrice]);

  return (
    <div className="bg-[#0d0d10] rounded-xl border border-[#1a1a1e] h-full">
      <div className="p-3 border-b border-[#1a1a1e]">
        <h3 className="text-sm font-semibold text-white">Recent Trades</h3>
      </div>

      <div className="grid grid-cols-3 text-xs text-gray-500 px-3 py-1.5 border-b border-[#1a1a1e]">
        <span>Price (USDT)</span>
        <span className="text-right">Amount ({symbol})</span>
        <span className="text-right">Time</span>
      </div>

      <div className="overflow-y-auto max-h-[400px] scrollbar-thin">
        {trades.map((trade, i) => (
          <div key={i} className="grid grid-cols-3 text-xs px-3 py-0.5 hover:bg-white/5">
            <span className={trade.side === 'buy' ? 'text-[#0ecb81]' : 'text-[#f6465d]'}>
              {formatPrice(trade.price)}
            </span>
            <span className="text-right text-gray-300">{trade.amount.toFixed(4)}</span>
            <span className="text-right text-gray-500">{trade.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTrades;
