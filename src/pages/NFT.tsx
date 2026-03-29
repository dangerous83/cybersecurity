import { Search, Filter, Heart } from "lucide-react";
import { useState } from "react";

const collections = [
  { name: "Alcon Apes", floor: "2.4 ETH", volume: "12,400 ETH", items: 10000, change: "+12.5%", img: "🐵" },
  { name: "Crypto Punks X", floor: "45.2 ETH", volume: "890,000 ETH", items: 10000, change: "+3.2%", img: "👾" },
  { name: "Gold Chain Club", floor: "0.8 ETH", volume: "5,600 ETH", items: 5555, change: "-2.1%", img: "⛓️" },
  { name: "Digital Diamonds", floor: "1.2 ETH", volume: "8,900 ETH", items: 8888, change: "+8.7%", img: "💎" },
  { name: "Meta Kingdoms", floor: "0.5 ETH", volume: "3,200 ETH", items: 7777, change: "+15.3%", img: "🏰" },
  { name: "Neon Samurai", floor: "3.1 ETH", volume: "22,000 ETH", items: 4444, change: "+5.8%", img: "⚔️" },
];

const nfts = [
  { name: "Golden Ape #4281", collection: "Alcon Apes", price: "2.8 ETH", lastSale: "2.1 ETH", rarity: "Legendary", emoji: "🐵" },
  { name: "Punk #9182", collection: "Crypto Punks X", price: "52.0 ETH", lastSale: "48.5 ETH", rarity: "Ultra Rare", emoji: "👾" },
  { name: "Chain #0042", collection: "Gold Chain Club", price: "1.2 ETH", lastSale: "0.9 ETH", rarity: "Rare", emoji: "⛓️" },
  { name: "Diamond #7721", collection: "Digital Diamonds", price: "1.5 ETH", lastSale: "1.1 ETH", rarity: "Epic", emoji: "💎" },
  { name: "Kingdom #3301", collection: "Meta Kingdoms", price: "0.7 ETH", lastSale: "0.5 ETH", rarity: "Rare", emoji: "🏰" },
  { name: "Samurai #1337", collection: "Neon Samurai", price: "4.2 ETH", lastSale: "3.5 ETH", rarity: "Legendary", emoji: "⚔️" },
  { name: "Golden Ape #8192", collection: "Alcon Apes", price: "3.5 ETH", lastSale: "2.8 ETH", rarity: "Mythic", emoji: "🐵" },
  { name: "Punk #2048", collection: "Crypto Punks X", price: "47.8 ETH", lastSale: "44.0 ETH", rarity: "Rare", emoji: "👾" },
];

const NFT = () => {
  const [search, setSearch] = useState("");
  const [likes, setLikes] = useState<Set<string>>(new Set());

  const toggleLike = (name: string) => {
    setLikes(prev => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#0b0b0e]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#1a1a1e]">
        <div className="absolute top-0 right-1/4 w-[400px] h-[300px] bg-[#3b82f6]/5 blur-[100px] rounded-full" />
        <div className="relative max-w-[1600px] mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            ALCON <span className="brand-text">NFT Marketplace</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Discover, collect, and trade extraordinary NFTs on the largest crypto marketplace.
          </p>
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search collections, NFTs, or artists..."
              className="w-full bg-[#14151a] border border-[#1a1a1e] rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#3b82f6]/50"
            />
          </div>
        </div>
      </section>

      {/* Top Collections */}
      <section className="max-w-[1600px] mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Top Collections</h2>
          <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-[#60a5fa]">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 text-xs border-b border-[#1a1a1e]">
                <th className="text-left py-3 px-3">#</th>
                <th className="text-left py-3 px-3">Collection</th>
                <th className="text-right py-3 px-3">Floor Price</th>
                <th className="text-right py-3 px-3">Volume</th>
                <th className="text-right py-3 px-3 hidden md:table-cell">Items</th>
                <th className="text-right py-3 px-3">Change</th>
              </tr>
            </thead>
            <tbody>
              {collections.map((col, i) => (
                <tr key={col.name} className="border-b border-[#1a1a1e]/50 hover:bg-white/[0.02]">
                  <td className="py-3 px-3 text-gray-500">{i + 1}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#1a1a1e] flex items-center justify-center text-xl">
                        {col.img}
                      </div>
                      <span className="font-semibold text-white">{col.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right text-white">{col.floor}</td>
                  <td className="py-3 px-3 text-right text-gray-400">{col.volume}</td>
                  <td className="py-3 px-3 text-right text-gray-400 hidden md:table-cell">{col.items.toLocaleString()}</td>
                  <td className={`py-3 px-3 text-right ${col.change.startsWith('+') ? 'text-[#3b82f6]' : 'text-[#f6465d]'}`}>
                    {col.change}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* NFT Grid */}
      <section className="max-w-[1600px] mx-auto px-4 py-12 border-t border-[#1a1a1e]">
        <h2 className="text-2xl font-bold text-white mb-8">Trending NFTs</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {nfts.map(nft => (
            <div
              key={nft.name}
              className="bg-[#0d0d10] border border-[#1a1a1e] rounded-2xl overflow-hidden hover:border-[#3b82f6]/20 transition-all group"
            >
              {/* NFT Image */}
              <div className="aspect-square bg-gradient-to-br from-[#1a1a1e] to-[#14151a] flex items-center justify-center text-6xl relative">
                {nft.emoji}
                <button
                  onClick={() => toggleLike(nft.name)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-sm"
                >
                  <Heart className={`w-4 h-4 ${likes.has(nft.name) ? 'fill-[#f6465d] text-[#f6465d]' : 'text-white'}`} />
                </button>
                <span className={`absolute top-3 left-3 text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  nft.rarity === 'Mythic' ? 'bg-purple-500/20 text-purple-400' :
                  nft.rarity === 'Legendary' ? 'bg-[#3b82f6]/20 text-[#3b82f6]' :
                  nft.rarity === 'Ultra Rare' ? 'bg-red-500/20 text-red-400' :
                  nft.rarity === 'Epic' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {nft.rarity}
                </span>
              </div>
              <div className="p-4">
                <div className="text-xs text-gray-500 mb-1">{nft.collection}</div>
                <h3 className="font-semibold text-white text-sm mb-3">{nft.name}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500">Price</div>
                    <div className="text-sm font-bold text-[#3b82f6]">{nft.price}</div>
                  </div>
                  <span className="px-3 py-1.5 rounded-lg bg-[#3b82f6]/10 text-[#3b82f6] text-xs font-semibold">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NFT;
