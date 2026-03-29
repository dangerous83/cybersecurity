import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info } from "lucide-react";

const spotFees = [
  { tier: "Regular", volume: "< $1M", maker: "0.1000%", taker: "0.1000%" },
  { tier: "VIP 1", volume: "$1M - $5M", maker: "0.0900%", taker: "0.1000%" },
  { tier: "VIP 2", volume: "$5M - $10M", maker: "0.0800%", taker: "0.1000%" },
  { tier: "VIP 3", volume: "$10M - $50M", maker: "0.0700%", taker: "0.0900%" },
  { tier: "VIP 4", volume: "$50M - $100M", maker: "0.0500%", taker: "0.0800%" },
  { tier: "VIP 5", volume: "$100M - $250M", maker: "0.0400%", taker: "0.0700%" },
  { tier: "VIP 6", volume: "$250M - $500M", maker: "0.0200%", taker: "0.0600%" },
  { tier: "VIP 7", volume: "> $500M", maker: "0.0000%", taker: "0.0500%" },
];

const futuresFees = [
  { tier: "Regular", volume: "< $5M", maker: "0.0200%", taker: "0.0400%" },
  { tier: "VIP 1", volume: "$5M - $25M", maker: "0.0160%", taker: "0.0400%" },
  { tier: "VIP 2", volume: "$25M - $100M", maker: "0.0140%", taker: "0.0350%" },
  { tier: "VIP 3", volume: "$100M - $250M", maker: "0.0120%", taker: "0.0320%" },
  { tier: "VIP 4", volume: "$250M - $1B", maker: "0.0100%", taker: "0.0300%" },
  { tier: "VIP 5", volume: "> $1B", maker: "0.0000%", taker: "0.0250%" },
];

const withdrawalFees = [
  { coin: "BTC", network: "Bitcoin", fee: "0.0005 BTC", minWithdraw: "0.001 BTC" },
  { coin: "ETH", network: "Ethereum (ERC-20)", fee: "0.005 ETH", minWithdraw: "0.01 ETH" },
  { coin: "ETH", network: "Arbitrum One", fee: "0.0001 ETH", minWithdraw: "0.001 ETH" },
  { coin: "USDT", network: "Ethereum (ERC-20)", fee: "10 USDT", minWithdraw: "20 USDT" },
  { coin: "USDT", network: "Tron (TRC-20)", fee: "1 USDT", minWithdraw: "5 USDT" },
  { coin: "USDT", network: "BSC (BEP-20)", fee: "0.3 USDT", minWithdraw: "5 USDT" },
  { coin: "BNB", network: "BSC (BEP-20)", fee: "0.001 BNB", minWithdraw: "0.01 BNB" },
  { coin: "SOL", network: "Solana", fee: "0.01 SOL", minWithdraw: "0.1 SOL" },
  { coin: "XRP", network: "XRP Ledger", fee: "0.25 XRP", minWithdraw: "1 XRP" },
  { coin: "ADA", network: "Cardano", fee: "1 ADA", minWithdraw: "5 ADA" },
  { coin: "DOGE", network: "Dogecoin", fee: "5 DOGE", minWithdraw: "20 DOGE" },
  { coin: "AVAX", network: "Avalanche C-Chain", fee: "0.01 AVAX", minWithdraw: "0.1 AVAX" },
];

const FeeTable = ({ data, columns }: { data: Record<string, string>[]; columns: { key: string; label: string }[] }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="text-gray-500 text-xs border-b border-[#1a1a1e]">
          {columns.map(col => (
            <th key={col.key} className="text-left py-3 px-4">{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-b border-[#1a1a1e]/50 hover:bg-white/[0.02]">
            {columns.map(col => (
              <td key={col.key} className={`py-3 px-4 ${col.key === 'tier' ? 'font-medium text-white' : 'text-gray-400'}`}>
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Fees = () => (
  <div className="min-h-screen bg-[#0b0b0e]">
    <section className="border-b border-[#1a1a1e]">
      <div className="max-w-[1200px] mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white mb-3">Fee <span className="brand-text">Schedule</span></h1>
        <p className="text-gray-400 max-w-2xl">Transparent, competitive fees with VIP tiers for high-volume traders. All fees are calculated on a 30-day rolling volume basis.</p>
        <div className="flex items-center gap-2 mt-4 text-sm text-[#3b82f6] bg-[#3b82f6]/10 px-4 py-2 rounded-lg w-fit">
          <Info className="w-4 h-4" />
          Pay with KRP token for 25% discount on all trading fees
        </div>
      </div>
    </section>

    <section className="max-w-[1200px] mx-auto px-4 py-12">
      <Tabs defaultValue="spot">
        <TabsList className="bg-[#1a1a1e] mb-8">
          <TabsTrigger value="spot" className="data-[state=active]:bg-[#3b82f6] data-[state=active]:text-black">Spot Trading</TabsTrigger>
          <TabsTrigger value="futures" className="data-[state=active]:bg-[#3b82f6] data-[state=active]:text-black">Futures Trading</TabsTrigger>
          <TabsTrigger value="withdrawal" className="data-[state=active]:bg-[#3b82f6] data-[state=active]:text-black">Withdrawals</TabsTrigger>
        </TabsList>

        <TabsContent value="spot">
          <div className="bg-[#0d0d10] border border-[#1a1a1e] rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-[#1a1a1e]">
              <h2 className="font-semibold text-white">Spot Trading Fee Tiers</h2>
              <p className="text-xs text-gray-500 mt-1">Based on 30-day trading volume (USD equivalent)</p>
            </div>
            <FeeTable
              data={spotFees}
              columns={[
                { key: "tier", label: "Tier" },
                { key: "volume", label: "30d Volume" },
                { key: "maker", label: "Maker Fee" },
                { key: "taker", label: "Taker Fee" },
              ]}
            />
          </div>
        </TabsContent>

        <TabsContent value="futures">
          <div className="bg-[#0d0d10] border border-[#1a1a1e] rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-[#1a1a1e]">
              <h2 className="font-semibold text-white">Futures Trading Fee Tiers</h2>
              <p className="text-xs text-gray-500 mt-1">USDT-Margined Perpetual Contracts</p>
            </div>
            <FeeTable
              data={futuresFees}
              columns={[
                { key: "tier", label: "Tier" },
                { key: "volume", label: "30d Volume" },
                { key: "maker", label: "Maker Fee" },
                { key: "taker", label: "Taker Fee" },
              ]}
            />
          </div>
        </TabsContent>

        <TabsContent value="withdrawal">
          <div className="bg-[#0d0d10] border border-[#1a1a1e] rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-[#1a1a1e]">
              <h2 className="font-semibold text-white">Withdrawal Fees</h2>
              <p className="text-xs text-gray-500 mt-1">Fees are adjusted dynamically based on network conditions. Deposits are free.</p>
            </div>
            <FeeTable
              data={withdrawalFees}
              columns={[
                { key: "coin", label: "Coin" },
                { key: "network", label: "Network" },
                { key: "fee", label: "Withdrawal Fee" },
                { key: "minWithdraw", label: "Min Withdrawal" },
              ]}
            />
          </div>
        </TabsContent>
      </Tabs>
    </section>
  </div>
);

export default Fees;
