import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, ArrowUpDown, TrendingUp, TrendingDown } from "lucide-react";
import { CryptoAsset, formatPrice, formatVolume, formatMarketCap } from "@/lib/crypto-data";
import MiniChart from "./MiniChart";

interface MarketTableProps {
  assets: CryptoAsset[];
  compact?: boolean;
}

const MarketTable = ({ assets, compact = false }: MarketTableProps) => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [sortKey, setSortKey] = useState<'price' | 'changePercent24h' | 'volume24h' | 'marketCap'>('marketCap');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const toggleFav = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSort = (key: typeof sortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const sorted = [...assets].sort((a, b) => {
    const mul = sortDir === 'asc' ? 1 : -1;
    return (a[sortKey] - b[sortKey]) * mul;
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-500 text-xs border-b border-[#1a1a1e]">
            <th className="text-left py-3 px-3 w-8"></th>
            <th className="text-left py-3 px-3">#</th>
            <th className="text-left py-3 px-3">Name</th>
            <th className="text-right py-3 px-3 cursor-pointer hover:text-white" onClick={() => handleSort('price')}>
              <span className="inline-flex items-center gap-1">Price <ArrowUpDown className="w-3 h-3" /></span>
            </th>
            <th className="text-right py-3 px-3 cursor-pointer hover:text-white" onClick={() => handleSort('changePercent24h')}>
              <span className="inline-flex items-center gap-1">24h Change <ArrowUpDown className="w-3 h-3" /></span>
            </th>
            {!compact && (
              <>
                <th className="text-right py-3 px-3 hidden md:table-cell cursor-pointer hover:text-white" onClick={() => handleSort('volume24h')}>
                  <span className="inline-flex items-center gap-1">24h Volume <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th className="text-right py-3 px-3 hidden lg:table-cell cursor-pointer hover:text-white" onClick={() => handleSort('marketCap')}>
                  <span className="inline-flex items-center gap-1">Market Cap <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th className="text-right py-3 px-3 hidden xl:table-cell">Last 24h</th>
              </>
            )}
            <th className="text-right py-3 px-3">Trade</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((asset, idx) => (
            <tr key={asset.id} className="border-b border-[#1a1a1e]/50 hover:bg-white/[0.02] transition-colors">
              <td className="py-3 px-3">
                <button onClick={() => toggleFav(asset.id)}>
                  <Star className={`w-4 h-4 ${favorites.has(asset.id) ? 'fill-[#0ecb81] text-[#0ecb81]' : 'text-gray-600'}`} />
                </button>
              </td>
              <td className="py-3 px-3 text-gray-500">{idx + 1}</td>
              <td className="py-3 px-3">
                <Link to={`/trade?pair=${asset.symbol}`} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1a1a1e] flex items-center justify-center text-sm font-bold text-[#0ecb81]">
                    {asset.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{asset.symbol}</div>
                    <div className="text-xs text-gray-500">{asset.name}</div>
                  </div>
                </Link>
              </td>
              <td className="py-3 px-3 text-right text-white font-medium">
                ${formatPrice(asset.price)}
              </td>
              <td className="py-3 px-3 text-right">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
                  asset.changePercent24h >= 0
                    ? 'text-[#0ecb81] bg-[#0ecb81]/10'
                    : 'text-[#f6465d] bg-[#f6465d]/10'
                }`}>
                  {asset.changePercent24h >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {asset.changePercent24h >= 0 ? '+' : ''}{asset.changePercent24h.toFixed(2)}%
                </span>
              </td>
              {!compact && (
                <>
                  <td className="py-3 px-3 text-right text-gray-400 hidden md:table-cell">
                    ${formatVolume(asset.volume24h)}
                  </td>
                  <td className="py-3 px-3 text-right text-gray-400 hidden lg:table-cell">
                    {formatMarketCap(asset.marketCap)}
                  </td>
                  <td className="py-3 px-3 text-right hidden xl:table-cell">
                    <MiniChart
                      data={asset.sparkline}
                      color={asset.changePercent24h >= 0 ? '#0ecb81' : '#f6465d'}
                    />
                  </td>
                </>
              )}
              <td className="py-3 px-3 text-right">
                <Link
                  to={`/trade?pair=${asset.symbol}`}
                  className="px-3 py-1 text-xs font-medium rounded-md bg-[#0ecb81]/10 text-[#0ecb81] hover:bg-[#0ecb81]/20 transition-colors"
                >
                  Trade
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketTable;
