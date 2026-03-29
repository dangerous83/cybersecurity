import { useState } from "react";
import { useLivePrices } from "@/hooks/useLivePrices";
import { formatVolume } from "@/lib/crypto-data";
import MarketTable from "@/components/MarketTable";
import { Search, TrendingUp, Star, Flame, Sparkles, BarChart3 } from "lucide-react";

const tabs = [
  { id: "all", label: "All Cryptos", icon: BarChart3 },
  { id: "favorites", label: "Favorites", icon: Star },
  { id: "gainers", label: "Top Gainers", icon: TrendingUp },
  { id: "hot", label: "Hot", icon: Flame },
  { id: "new", label: "New Listings", icon: Sparkles },
];

const Markets = () => {
  const assets = useLivePrices();
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = assets.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const displayed = activeTab === "gainers"
    ? [...filtered].sort((a, b) => b.changePercent24h - a.changePercent24h)
    : filtered;

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
                className="w-full bg-[#14151a] border border-[#1a1a1e] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#f0b90b]/50"
              />
            </div>
            <div className="flex gap-1 overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm rounded-xl whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? "bg-[#f0b90b]/10 text-[#f0b90b] border border-[#f0b90b]/30"
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
          <MarketTable assets={displayed} />
        </div>
      </div>
    </div>
  );
};

export default Markets;
