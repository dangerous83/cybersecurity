import { usePrices } from "@/contexts/PriceContext";
import { formatPrice } from "@/lib/crypto-data";

const TickerBar = () => {
  const { assets } = usePrices();

  return (
    <div className="bg-[#0d0d10] border-b border-[#1a1a1e] overflow-hidden">
      <div className="flex items-center ticker-scroll whitespace-nowrap py-2">
        {[...assets, ...assets].map((asset, i) => (
          <div key={`${asset.id}-${i}`} className="flex items-center gap-2 px-4 text-xs">
            <span className="font-semibold text-white">{asset.symbol}/USDT</span>
            <span className={asset.changePercent24h >= 0 ? "text-[#0ecb81]" : "text-[#f6465d]"}>
              ${formatPrice(asset.price)}
            </span>
            <span className={`${asset.changePercent24h >= 0 ? "text-[#0ecb81]" : "text-[#f6465d]"}`}>
              {asset.changePercent24h >= 0 ? "+" : ""}{asset.changePercent24h.toFixed(2)}%
            </span>
            <span className="text-gray-600">|</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TickerBar;
