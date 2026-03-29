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
    marketCap: 14_200_000_000, icon: "S", sparkline: generateSparkline(0.0000242, 0.0000003),
  },
  {
    id: "polygon", symbol: "MATIC", name: "Polygon", price: 0.89, change24h: 0.04,
    changePercent24h: 4.71, high24h: 0.92, low24h: 0.84, volume24h: 540_000_000,
    marketCap: 8_900_000_000, icon: "P", sparkline: generateSparkline(0.89, 0.02),
  },
  {
    id: "litecoin", symbol: "LTC", name: "Litecoin", price: 92.14, change24h: 1.87,
    changePercent24h: 2.07, high24h: 93.50, low24h: 89.80, volume24h: 480_000_000,
    marketCap: 6_800_000_000, icon: "L", sparkline: generateSparkline(92.14, 1.5),
  },
  {
    id: "uniswap", symbol: "UNI", name: "Uniswap", price: 12.34, change24h: -0.42,
    changePercent24h: -3.30, high24h: 12.90, low24h: 12.10, volume24h: 320_000_000,
    marketCap: 7_400_000_000, icon: "U", sparkline: generateSparkline(12.34, 0.25),
  },
  {
    id: "cosmos", symbol: "ATOM", name: "Cosmos", price: 9.18, change24h: 0.31,
    changePercent24h: 3.49, high24h: 9.40, low24h: 8.75, volume24h: 210_000_000,
    marketCap: 3_600_000_000, icon: "A", sparkline: generateSparkline(9.18, 0.2),
  },
  {
    id: "near", symbol: "NEAR", name: "NEAR Protocol", price: 5.24, change24h: 0.28,
    changePercent24h: 5.64, high24h: 5.40, low24h: 4.90, volume24h: 380_000_000,
    marketCap: 5_800_000_000, icon: "N", sparkline: generateSparkline(5.24, 0.12),
  },
  {
    id: "aptos", symbol: "APT", name: "Aptos", price: 11.42, change24h: -0.38,
    changePercent24h: -3.22, high24h: 11.90, low24h: 11.20, volume24h: 290_000_000,
    marketCap: 4_900_000_000, icon: "A", sparkline: generateSparkline(11.42, 0.25),
  },
  {
    id: "arbitrum", symbol: "ARB", name: "Arbitrum", price: 1.28, change24h: 0.06,
    changePercent24h: 4.92, high24h: 1.32, low24h: 1.20, volume24h: 420_000_000,
    marketCap: 4_200_000_000, icon: "A", sparkline: generateSparkline(1.28, 0.03),
  },
  {
    id: "filecoin", symbol: "FIL", name: "Filecoin", price: 6.12, change24h: -0.22,
    changePercent24h: -3.47, high24h: 6.40, low24h: 5.95, volume24h: 180_000_000,
    marketCap: 3_400_000_000, icon: "F", sparkline: generateSparkline(6.12, 0.14),
  },
  {
    id: "optimism", symbol: "OP", name: "Optimism", price: 2.78, change24h: 0.14,
    changePercent24h: 5.30, high24h: 2.85, low24h: 2.60, volume24h: 310_000_000,
    marketCap: 3_100_000_000, icon: "O", sparkline: generateSparkline(2.78, 0.06),
  },
  {
    id: "injective", symbol: "INJ", name: "Injective", price: 24.56, change24h: 1.82,
    changePercent24h: 8.01, high24h: 25.10, low24h: 22.40, volume24h: 260_000_000,
    marketCap: 2_300_000_000, icon: "I", sparkline: generateSparkline(24.56, 0.6),
  },
  {
    id: "sui", symbol: "SUI", name: "Sui", price: 1.52, change24h: 0.09,
    changePercent24h: 6.29, high24h: 1.58, low24h: 1.40, volume24h: 340_000_000,
    marketCap: 4_700_000_000, icon: "S", sparkline: generateSparkline(1.52, 0.04),
  },
  {
    id: "render", symbol: "RNDR", name: "Render", price: 8.34, change24h: 0.52,
    changePercent24h: 6.65, high24h: 8.50, low24h: 7.70, volume24h: 220_000_000,
    marketCap: 3_200_000_000, icon: "R", sparkline: generateSparkline(8.34, 0.2),
  },
];

export const getAssetBySymbol = (symbol: string): CryptoAsset | undefined => {
  return cryptoAssets.find(a => a.symbol === symbol);
};

export const getAllSymbols = (): string[] => {
  return cryptoAssets.map(a => a.symbol);
};

export const getTradingPair = (symbol: string): string => {
  return `${symbol}/USDT`;
};

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

export const STAKING_PRODUCTS = [
  { id: 'flex-btc', asset: 'BTC', type: 'Flexible' as const, apy: 3.2, minAmount: 0.001, lockDays: 0 },
  { id: 'flex-eth', asset: 'ETH', type: 'Flexible' as const, apy: 4.1, minAmount: 0.01, lockDays: 0 },
  { id: 'flex-sol', asset: 'SOL', type: 'Flexible' as const, apy: 5.8, minAmount: 0.1, lockDays: 0 },
  { id: 'lock-btc-30', asset: 'BTC', type: 'Locked' as const, apy: 6.5, minAmount: 0.001, lockDays: 30 },
  { id: 'lock-eth-30', asset: 'ETH', type: 'Locked' as const, apy: 8.2, minAmount: 0.01, lockDays: 30 },
  { id: 'lock-sol-60', asset: 'SOL', type: 'Locked' as const, apy: 12.5, minAmount: 0.1, lockDays: 60 },
  { id: 'lock-bnb-30', asset: 'BNB', type: 'Locked' as const, apy: 7.8, minAmount: 0.01, lockDays: 30 },
  { id: 'lock-ada-90', asset: 'ADA', type: 'Locked' as const, apy: 14.2, minAmount: 10, lockDays: 90 },
  { id: 'defi-eth', asset: 'ETH', type: 'DeFi' as const, apy: 18.5, minAmount: 0.1, lockDays: 0 },
  { id: 'defi-matic', asset: 'MATIC', type: 'DeFi' as const, apy: 22.0, minAmount: 50, lockDays: 0 },
  { id: 'defi-dot', asset: 'DOT', type: 'DeFi' as const, apy: 15.8, minAmount: 5, lockDays: 0 },
  { id: 'lock-link-60', asset: 'LINK', type: 'Locked' as const, apy: 10.5, minAmount: 1, lockDays: 60 },
];
