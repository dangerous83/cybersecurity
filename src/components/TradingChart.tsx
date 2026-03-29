import { useState, useMemo } from "react";

interface TradingChartProps {
  symbol: string;
  basePrice: number;
  change: number;
}

const TradingChart = ({ symbol, basePrice, change }: TradingChartProps) => {
  const [timeframe, setTimeframe] = useState("1D");
  const timeframes = ["15m", "1H", "4H", "1D", "1W", "1M"];

  const candles = useMemo(() => {
    const data: { open: number; high: number; low: number; close: number; volume: number }[] = [];
    let price = basePrice * 0.95;
    const count = timeframe === "15m" ? 60 : timeframe === "1H" ? 48 : timeframe === "4H" ? 42 : 30;
    const vol = basePrice * 0.008;

    for (let i = 0; i < count; i++) {
      const open = price;
      const movement = (Math.random() - 0.45) * vol;
      const close = open + movement;
      const high = Math.max(open, close) + Math.random() * vol * 0.5;
      const low = Math.min(open, close) - Math.random() * vol * 0.5;
      data.push({ open, high, low, close, volume: Math.random() * 1000 + 100 });
      price = close;
    }
    return data;
  }, [basePrice, timeframe]);

  const allPrices = candles.flatMap(c => [c.high, c.low]);
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  const priceRange = maxPrice - minPrice || 1;

  const chartWidth = 800;
  const chartHeight = 350;
  const candleWidth = Math.max(3, (chartWidth / candles.length) * 0.7);
  const gap = chartWidth / candles.length;

  const maxVol = Math.max(...candles.map(c => c.volume));

  const priceToY = (p: number) => chartHeight - ((p - minPrice) / priceRange) * (chartHeight - 40) - 20;

  const gridLines = 5;
  const priceStep = priceRange / gridLines;

  return (
    <div className="bg-[#0d0d10] rounded-xl border border-[#1a1a1e] overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-[#1a1a1e] gap-3">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-bold text-white">{symbol}/USDT</h3>
          <span className={`text-2xl font-bold ${change >= 0 ? "text-[#0ecb81]" : "text-[#f6465d]"}`}>
            ${basePrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className={`text-sm px-2 py-0.5 rounded ${
            change >= 0 ? "text-[#0ecb81] bg-[#0ecb81]/10" : "text-[#f6465d] bg-[#f6465d]/10"
          }`}>
            {change >= 0 ? "+" : ""}{change.toFixed(2)}%
          </span>
        </div>
        <div className="flex gap-1 bg-[#1a1a1e] rounded-lg p-1">
          {timeframes.map(tf => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                timeframe === tf
                  ? "bg-[#f0b90b] text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="p-4 overflow-x-auto">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight + 60}`} className="w-full min-w-[600px]" preserveAspectRatio="xMidYMid meet">
          {/* Grid */}
          {Array.from({ length: gridLines + 1 }).map((_, i) => {
            const price = minPrice + priceStep * i;
            const y = priceToY(price);
            return (
              <g key={i}>
                <line x1={0} y1={y} x2={chartWidth} y2={y} stroke="#1a1a1e" strokeWidth="1" />
                <text x={chartWidth - 5} y={y - 5} textAnchor="end" fill="#666" fontSize="10">
                  {price >= 1 ? price.toFixed(2) : price.toFixed(6)}
                </text>
              </g>
            );
          })}

          {/* Volume bars */}
          {candles.map((c, i) => {
            const x = i * gap + gap / 2;
            const vHeight = (c.volume / maxVol) * 40;
            const isGreen = c.close >= c.open;
            return (
              <rect
                key={`vol-${i}`}
                x={x - candleWidth / 2}
                y={chartHeight + 20 - vHeight}
                width={candleWidth}
                height={vHeight}
                fill={isGreen ? "rgba(14, 203, 129, 0.3)" : "rgba(246, 70, 93, 0.3)"}
                rx="1"
              />
            );
          })}

          {/* Candles */}
          {candles.map((c, i) => {
            const x = i * gap + gap / 2;
            const isGreen = c.close >= c.open;
            const color = isGreen ? "#0ecb81" : "#f6465d";
            const bodyTop = priceToY(Math.max(c.open, c.close));
            const bodyBottom = priceToY(Math.min(c.open, c.close));
            const bodyHeight = Math.max(1, bodyBottom - bodyTop);

            return (
              <g key={i}>
                {/* Wick */}
                <line
                  x1={x} y1={priceToY(c.high)}
                  x2={x} y2={priceToY(c.low)}
                  stroke={color} strokeWidth="1"
                />
                {/* Body */}
                <rect
                  x={x - candleWidth / 2}
                  y={bodyTop}
                  width={candleWidth}
                  height={bodyHeight}
                  fill={color}
                  rx="0.5"
                />
              </g>
            );
          })}

          {/* Current price line */}
          <line
            x1={0}
            y1={priceToY(candles[candles.length - 1]?.close ?? basePrice)}
            x2={chartWidth}
            y2={priceToY(candles[candles.length - 1]?.close ?? basePrice)}
            stroke="#f0b90b"
            strokeWidth="1"
            strokeDasharray="4,4"
          />
        </svg>
      </div>
    </div>
  );
};

export default TradingChart;
