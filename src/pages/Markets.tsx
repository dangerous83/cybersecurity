import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { usePrices } from "@/contexts/PriceContext";
import { formatPrice, formatVolume, formatMarketCap } from "@/lib/crypto-data";
import MiniChart from "@/components/MiniChart";
import { Search, TrendingUp, TrendingDown, Star, Flame, Sparkles, BarChart3, ArrowUpDown } from "lucide-react";

const tabs = [
  { id: "all", label: "All Cryptos", icon: BarChart3 },
  { id: "favorites", label: "Favorites", icon: Star },
  { id: "gainers", label: "Top Gainers", icon: TrendingUp },
  { id: "losers", label: "Top Losers", icon: TrendingDown },
  { id: "hot", label: "Hot", icon: Flame },
  { id: "new", label: "New Listings", icon: Sparkles },
];

const Markets = () => {
  const { assets } = usePrices();
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<'price' | 'changePercent24h' | 'volume24h' | 'marketCap'>('marketCap');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem('alcon_market_favorites');
      if (stored) return new Set(JSON.parse(stored));
    } catch {}
    return new Set<string>();
  });

  useEffect(() => {
    localStorage.setItem('alcon_market_favorites', JSON.stringify([...favorites]));
  }, [favorites]);

  const toggleFav = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSort = (key: typeof sortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const displayed = useMemo(() => {
    let filtered = assets.filter(a =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.symbol.toLowerCase().includes(search.toLowerCase())
    );

    if (activeTab === 'favorites') filtered = filtered.filter(a => favorites.has(a.id));
    else if (activeTab === 'gainers') filtered = [...filtered].sort((a, b) => b.changePercent24h - a.changePercent24h);
    else if (activeTab === 'losers') filtered = [...filtered].sort((a, b) => a.changePercent24h - b.changePercent24h);
    else if (activeTab === 'hot') filtered = [...filtered].sort((a, b) => b.volume24h - a.volume24h);
    else if (activeTab === 'new') filtered = filtered.slice(-6).reverse();

    if (activeTab === 'all' || activeTab === 'favorites') {
      const mul = sortDir === 'asc' ? 1 : -1;
      filtered = [...filtered].sort((a, b) => (a[sortKey] - b[sortKey]) * mul);
    }

    return filtered;
  }, [assets, search, activeTab, favorites, sortKey, sortDir]);

  const totalVolume = assets.reduce((sum, a) => sum + a.volume24h, 0);
  const totalMarketCap = assets.reduce((sum, a) => sum + a.marketCap, 0);

  return (
    <div className="min-h-screen bg-[#0b0b0e]">
      {/* Header */}
      <div className="border-b border-[#1a1a1e] bg-[#0d0d10]">
        <div className="max-w-[1600px] mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-white mb-2">Markets Overview</h1>
          <p className="text-gray-500 mb-6">Real-time prices for 600+ cryptocurrencies</p>

          {/* Market Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Total Market Cap", value: `$${formatVolume(totalMarketCap)}` },
              { label: "24h Volume", value: `$${formatVolume(totalVolume)}` },
              { label: "Active Cryptos", value: `${assets.length}` },
              { label: "BTC Dominance", value: "52.4%" },
            ].map(stat => (
              <div key={stat.label} className="bg-[#14151a] border border-[#1a1a1e] rounded-xl p-4">
                <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
                <div className="text-lg font-bold text-white">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name or symbol..."
                className="w-full bg-[#14151a] border border-[#1a1a1e] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#0ecb81]/50"
              />
            </div>
            <div className="flex gap-1 overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm rounded-xl whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? "bg-[#0ecb81]/10 text-[#0ecb81] border border-[#0ecb81]/30"
                      : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-[1600px] mx-auto px-4 py-6">
        <div className="bg-[#0d0d10] rounded-2xl border border-[#1a1a1e] overflow-hidden">
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
                  <th className="text-right py-3 px-3 hidden md:table-cell cursor-pointer hover:text-white" onClick={() => handleSort('volume24h')}>
                    <span className="inline-flex items-center gap-1">24h Volume <ArrowUpDown className="w-3 h-3" /></span>
                  </th>
                  <th className="text-right py-3 px-3 hidden lg:table-cell cursor-pointer hover:text-white" onClick={() => handleSort('marketCap')}>
                    <span className="inline-flex items-center gap-1">Market Cap <ArrowUpDown className="w-3 h-3" /></span>
                  </th>
                  <th className="text-right py-3 px-3 hidden xl:table-cell">Last 24h</th>
                  <th className="text-right py-3 px-3">Trade</th>
                </tr>
              </thead>
              <tbody>
                {displayed.map((asset, idx) => (
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
                    <td className="py-3 px-3 text-right text-white font-medium">${formatPrice(asset.price)}</td>
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
                    <td className="py-3 px-3 text-right text-gray-400 hidden md:table-cell">${formatVolume(asset.volume24h)}</td>
                    <td className="py-3 px-3 text-right text-gray-400 hidden lg:table-cell">{formatMarketCap(asset.marketCap)}</td>
                    <td className="py-3 px-3 text-right hidden xl:table-cell">
                      <MiniChart data={asset.sparkline} color={asset.changePercent24h >= 0 ? '#0ecb81' : '#f6465d'} />
                    </td>
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
          {displayed.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              {activeTab === 'favorites' ? 'No favorites yet. Star some coins!' : 'No results found.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Markets;
