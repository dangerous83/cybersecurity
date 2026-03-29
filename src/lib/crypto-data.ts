export interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  marketCap: number;
  icon: string;
  sparkline: number[];
}

const generateSparkline = (basePrice: number, volatility: number): number[] => {
  const points: number[] = [];
  let price = basePrice;
  for (let i = 0; i < 24; i++) {
    price += (Math.random() - 0.48) * volatility;
    points.push(Math.max(price * 0.9, price));
  }
  return points;
};

export const cryptoAssets: CryptoAsset[] = [
  {
    id: "bitcoin", symbol: "BTC", name: "Bitcoin", price: 87432.51, change24h: 1243.22,
    changePercent24h: 1.44, high24h: 88100.00, low24h: 85900.00, volume24h: 28_430_000_000,
    marketCap: 1_720_000_000_000, icon: "₿", sparkline: generateSparkline(87432, 500),
  },
  {
    id: "ethereum", symbol: "ETH", name: "Ethereum", price: 3284.67, change24h: -42.33,
    changePercent24h: -1.27, high24h: 3350.00, low24h: 3220.00, volume24h: 14_200_000_000,
    marketCap: 395_000_000_000, icon: "Ξ", sparkline: generateSparkline(3284, 30),
  },
  {
    id: "bnb", symbol: "BNB", name: "BNB", price: 612.43, change24h: 8.92,
    changePercent24h: 1.48, high24h: 618.00, low24h: 600.00, volume24h: 1_820_000_000,
    marketCap: 91_000_000_000, icon: "⬡", sparkline: generateSparkline(612, 5),
  },
  {
    id: "solana", symbol: "SOL", name: "Solana", price: 194.82, change24h: 12.44,
    changePercent24h: 6.83, high24h: 198.00, low24h: 180.00, volume24h: 5_600_000_000,
    marketCap: 86_000_000_000, icon: "◎", sparkline: generateSparkline(194, 8),
  },
  {
    id: "xrp", symbol: "XRP", name: "XRP", price: 2.34, change24h: -0.05,
    changePercent24h: -2.09, high24h: 2.42, low24h: 2.30, volume24h: 3_200_000_000,
    marketCap: 134_000_000_000, icon: "✕", sparkline: generateSparkline(2.34, 0.03),
  },
  {
    id: "cardano", symbol: "ADA", name: "Cardano", price: 0.72, change24h: 0.03,
    changePercent24h: 4.35, high24h: 0.74, low24h: 0.68, volume24h: 890_000_000,
    marketCap: 25_000_000_000, icon: "₳", sparkline: generateSparkline(0.72, 0.01),
  },
  {
    id: "dogecoin", symbol: "DOGE", name: "Dogecoin", price: 0.178, change24h: 0.012,
    changePercent24h: 7.23, high24h: 0.182, low24h: 0.164, volume24h: 2_100_000_000,
    marketCap: 25_600_000_000, icon: "Ð", sparkline: generateSparkline(0.178, 0.005),
  },
  {
    id: "avalanche", symbol: "AVAX", name: "Avalanche", price: 38.42, change24h: -1.23,
    changePercent24h: -3.10, high24h: 40.10, low24h: 37.80, volume24h: 620_000_000,
    marketCap: 15_200_000_000, icon: "▲", sparkline: generateSparkline(38.42, 0.8),
  },
  {
    id: "polkadot", symbol: "DOT", name: "Polkadot", price: 7.84, change24h: 0.22,
    changePercent24h: 2.89, high24h: 7.98, low24h: 7.55, volume24h: 380_000_000,
    marketCap: 10_800_000_000, icon: "●", sparkline: generateSparkline(7.84, 0.15),
  },
  {
    id: "chainlink", symbol: "LINK", name: "Chainlink", price: 18.92, change24h: 0.76,
    changePercent24h: 4.18, high24h: 19.20, low24h: 17.90, volume24h: 720_000_000,
    marketCap: 11_400_000_000, icon: "⬡", sparkline: generateSparkline(18.92, 0.4),
  },
  {
    id: "toncoin", symbol: "TON", name: "Toncoin", price: 5.62, change24h: -0.18,
    changePercent24h: -3.10, high24h: 5.85, low24h: 5.50, volume24h: 290_000_000,
    marketCap: 19_400_000_000, icon: "◆", sparkline: generateSparkline(5.62, 0.1),
  },
  {
    id: "shiba-inu", symbol: "SHIB", name: "Shiba Inu", price: 0.0000242, change24h: 0.0000018,
    changePercent24h: 8.04, high24h: 0.0000248, low24h: 0.0000220, volume24h: 1_400_000_000,
    marketCap: 14_200_000_000, icon: "🐕", sparkline: generateSparkline(0.0000242, 0.0000003),
  },
];

export interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
}

export const generateOrderBook = (basePrice: number): { asks: OrderBookEntry[]; bids: OrderBookEntry[] } => {
  const asks: OrderBookEntry[] = [];
  const bids: OrderBookEntry[] = [];
  let askTotal = 0;
  let bidTotal = 0;

  for (let i = 0; i < 15; i++) {
    const askPrice = basePrice + (i + 1) * (basePrice * 0.0002) + Math.random() * basePrice * 0.0001;
    const askAmount = Math.random() * 2 + 0.01;
    askTotal += askAmount;
    asks.push({ price: askPrice, amount: askAmount, total: askTotal });

    const bidPrice = basePrice - (i + 1) * (basePrice * 0.0002) - Math.random() * basePrice * 0.0001;
    const bidAmount = Math.random() * 2 + 0.01;
    bidTotal += bidAmount;
    bids.push({ price: bidPrice, amount: bidAmount, total: bidTotal });
  }

  return { asks, bids };
};

export interface Trade {
  price: number;
  amount: number;
  time: string;
  side: 'buy' | 'sell';
}

export const generateRecentTrades = (basePrice: number): Trade[] => {
  const trades: Trade[] = [];
  const now = new Date();
  for (let i = 0; i < 20; i++) {
    const time = new Date(now.getTime() - i * 3000);
    trades.push({
      price: basePrice + (Math.random() - 0.5) * basePrice * 0.002,
      amount: Math.random() * 1.5 + 0.001,
      time: time.toLocaleTimeString('en-US', { hour12: false }),
      side: Math.random() > 0.5 ? 'buy' : 'sell',
    });
  }
  return trades;
};

export const formatPrice = (price: number): string => {
  if (price >= 1000) return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (price >= 1) return price.toFixed(2);
  if (price >= 0.01) return price.toFixed(4);
  return price.toFixed(8);
};

export const formatVolume = (vol: number): string => {
  if (vol >= 1_000_000_000) return (vol / 1_000_000_000).toFixed(2) + 'B';
  if (vol >= 1_000_000) return (vol / 1_000_000).toFixed(2) + 'M';
  if (vol >= 1_000) return (vol / 1_000).toFixed(2) + 'K';
  return vol.toFixed(2);
};

export const formatMarketCap = (cap: number): string => {
  if (cap >= 1_000_000_000_000) return '$' + (cap / 1_000_000_000_000).toFixed(2) + 'T';
  if (cap >= 1_000_000_000) return '$' + (cap / 1_000_000_000).toFixed(2) + 'B';
  return '$' + (cap / 1_000_000).toFixed(2) + 'M';
};
