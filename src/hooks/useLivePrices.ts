import { useState, useEffect, useCallback } from 'react';
import { cryptoAssets, CryptoAsset } from '@/lib/crypto-data';

export const useLivePrices = () => {
  const [assets, setAssets] = useState<CryptoAsset[]>(cryptoAssets);

  const updatePrices = useCallback(() => {
    setAssets(prev =>
      prev.map(asset => {
        const volatility = asset.price * 0.001;
        const change = (Math.random() - 0.48) * volatility;
        const newPrice = Math.max(asset.price * 0.95, asset.price + change);
        const newChange24h = asset.change24h + change * 0.1;
        const newPercent = (newChange24h / (newPrice - newChange24h)) * 100;

        return {
          ...asset,
          price: newPrice,
          change24h: newChange24h,
          changePercent24h: newPercent,
          high24h: Math.max(asset.high24h, newPrice),
          low24h: Math.min(asset.low24h, newPrice),
          sparkline: [...asset.sparkline.slice(1), newPrice],
        };
      })
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(updatePrices, 2000);
    return () => clearInterval(interval);
  }, [updatePrices]);

  return assets;
};
