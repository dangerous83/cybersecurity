import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { cryptoAssets, CryptoAsset } from '@/lib/crypto-data';

interface PriceContextType {
  assets: CryptoAsset[];
  getPrice: (symbol: string) => number;
  getAsset: (symbol: string) => CryptoAsset | undefined;
}

const PriceContext = createContext<PriceContextType>({
  assets: cryptoAssets,
  getPrice: () => 0,
  getAsset: () => undefined,
});

export const PriceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [assets, setAssets] = useState<CryptoAsset[]>(cryptoAssets);
  const assetsRef = useRef(assets);
  assetsRef.current = assets;

  useEffect(() => {
    const interval = setInterval(() => {
      setAssets(prev =>
        prev.map(asset => {
          // More realistic price movement using a random walk with mean reversion
          const volatilityMap: Record<string, number> = {
            BTC: 0.0004, ETH: 0.0005, BNB: 0.0005, SOL: 0.0008, XRP: 0.0006,
            DOGE: 0.001, SHIB: 0.0012, ADA: 0.0007, AVAX: 0.0007, DOT: 0.0007,
          };
          const vol = volatilityMap[asset.symbol] || 0.0006;
          const drift = (Math.random() - 0.498) * asset.price * vol;
          const momentum = asset.change24h > 0 ? 0.0001 : -0.0001;
          const change = drift + asset.price * momentum * (Math.random() - 0.3);
          const newPrice = Math.max(asset.price * 0.95, asset.price + change);
          const newChange24h = newPrice - (asset.price - asset.change24h);
          const basePrice = asset.price - asset.change24h;
          const newPercent = basePrice !== 0 ? ((newPrice - basePrice) / basePrice) * 100 : 0;
          const volumeChange = asset.volume24h * (1 + (Math.random() - 0.5) * 0.002);

          return {
            ...asset,
            price: newPrice,
            change24h: newChange24h,
            changePercent24h: newPercent,
            high24h: Math.max(asset.high24h, newPrice),
            low24h: Math.min(asset.low24h, newPrice),
            volume24h: volumeChange,
            sparkline: [...asset.sparkline.slice(1), newPrice],
          };
        })
      );
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const getPrice = useCallback((symbol: string): number => {
    return assetsRef.current.find(a => a.symbol === symbol)?.price ?? 0;
  }, []);

  const getAsset = useCallback((symbol: string): CryptoAsset | undefined => {
    return assetsRef.current.find(a => a.symbol === symbol);
  }, []);

  return (
    <PriceContext.Provider value={{ assets, getPrice, getAsset }}>
      {children}
    </PriceContext.Provider>
  );
};

export const usePrices = () => useContext(PriceContext);
export default PriceContext;
