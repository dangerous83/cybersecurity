import { AlertTriangle } from "lucide-react";

const RiskWarning = () => (
  <div className="min-h-screen bg-[#0b0b0e]">
    <section className="border-b border-[#1a1a1e]">
      <div className="max-w-[900px] mx-auto px-4 py-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#f6465d]/10 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-[#f6465d]" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Risk Warning</h1>
            <p className="text-gray-500 text-sm">Last updated: March 1, 2026</p>
          </div>
        </div>
      </div>
    </section>
    <section className="max-w-[900px] mx-auto px-4 py-12 space-y-8">
      <div className="bg-[#f6465d]/5 border border-[#f6465d]/20 rounded-xl p-6">
        <p className="text-[#f6465d] font-semibold mb-2">Important Notice</p>
        <p className="text-sm text-gray-300 leading-relaxed">
          Trading cryptocurrencies carries a high level of risk and may not be suitable for all investors. Before deciding to trade, you should carefully consider your investment objectives, level of experience, and risk appetite. The possibility exists that you could sustain a loss of some or all of your initial investment. You should not invest money that you cannot afford to lose.
        </p>
      </div>
      {[
        { title: "Market Volatility Risk", content: "Cryptocurrency prices are extremely volatile. It is common for prices to increase or decrease by 10-30% within a single day. Historical price performance does not guarantee future results. Market crashes can happen suddenly and without warning. During periods of extreme volatility, you may be unable to execute trades at your desired price." },
        { title: "Leverage & Futures Risk", content: "Trading futures with leverage amplifies both potential profits and losses. With 100x leverage, a 1% price movement against your position results in a 100% loss of your margin. Liquidation can occur rapidly in volatile markets, resulting in complete loss of your margin deposit. You may lose more than your initial investment." },
        { title: "Liquidity Risk", content: "Some cryptocurrencies may have limited trading volume, resulting in wider spreads and difficulty executing large orders. During market stress events, liquidity can evaporate quickly, leading to significant slippage on market orders." },
        { title: "Technology & Security Risk", content: "Despite our security measures, no system is 100% immune to cyberattacks, software bugs, or infrastructure failures. Blockchain networks may experience congestion, forks, or protocol changes that affect your assets. Smart contract bugs in DeFi protocols could result in loss of staked funds." },
        { title: "Regulatory Risk", content: "Cryptocurrency regulations vary by jurisdiction and are rapidly evolving. Changes in law or regulation may adversely affect the use, transfer, exchange, or value of your crypto assets. KORYPTO may be required to restrict services in certain jurisdictions without prior notice." },
        { title: "Staking & Earn Risk", content: "Staking and earn products involve locking your assets for a period of time. During this period, you may be unable to sell your assets if market conditions change. Advertised APY rates are estimates and may fluctuate. DeFi staking involves additional smart contract risk. Validator slashing may result in loss of staked assets." },
        { title: "Tax Implications", content: "Cryptocurrency transactions may be subject to capital gains tax, income tax, or other taxes in your jurisdiction. You are solely responsible for determining and fulfilling your tax obligations. We recommend consulting a qualified tax professional." },
        { title: "No Financial Advice", content: "KORYPTO does not provide financial, investment, legal, or tax advice. All trading decisions are made at your own discretion and risk. Any market analysis, educational content, or information provided by KORYPTO is for informational purposes only and should not be construed as advice." },
      ].map(section => (
        <div key={section.title}>
          <h2 className="text-lg font-semibold text-white mb-2">{section.title}</h2>
          <p className="text-sm text-gray-400 leading-relaxed">{section.content}</p>
        </div>
      ))}
      <div className="bg-[#0d0d10] border border-[#1a1a1e] rounded-xl p-6 mt-8">
        <p className="text-sm text-gray-400 leading-relaxed">
          By using KORYPTO, you acknowledge that you have read, understood, and accept the risks described above. You confirm that you are trading with funds you can afford to lose and that you will not hold KORYPTO responsible for any trading losses.
        </p>
      </div>
    </section>
  </div>
);

export default RiskWarning;
