import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/crypto-data";
import { useAuth } from "@/contexts/AuthContext";
import { useWallet } from "@/contexts/WalletContext";
import { placeMarketOrder, placeLimitOrder } from "@/lib/trading-engine";
import { toast } from "sonner";

interface TradePanelProps {
  symbol: string;
  price: number;
  onOrderPlaced?: () => void;
}

const TradePanel = ({ symbol, price, onOrderPlaced }: TradePanelProps) => {
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [orderType, setOrderType] = useState<'limit' | 'market'>('market');
  const [amount, setAmount] = useState('');
  const [limitPrice, setLimitPrice] = useState('');
  const [sliderValue, setSliderValue] = useState(0);
  const { user, isAuthenticated } = useAuth();
  const { getBalance, deposit, withdraw, addTransaction } = useWallet();

  const pair = `${symbol}/USDT`;

  useEffect(() => {
    if (orderType === 'limit') {
      setLimitPrice(formatPrice(price).replace(/,/g, ''));
    }
  }, [symbol]);

  const usdtBalance = getBalance('USDT');
  const cryptoBalance = getBalance(symbol);
  const availableBalance = side === 'buy' ? usdtBalance : cryptoBalance;

  const effectivePrice = orderType === 'market' ? price : parseFloat(limitPrice.replace(/,/g, '') || '0');
  const amountNum = parseFloat(amount || '0');
  const total = amountNum * effectivePrice;

  const percentages = [25, 50, 75, 100];

  const handlePercentage = (pct: number) => {
    setSliderValue(pct);
    if (side === 'buy' && effectivePrice > 0) {
      const maxAmount = (usdtBalance * pct / 100) / effectivePrice;
      setAmount(maxAmount > 0 ? maxAmount.toFixed(6) : '');
    } else if (side === 'sell') {
      const maxAmount = cryptoBalance * pct / 100;
      setAmount(maxAmount > 0 ? maxAmount.toFixed(6) : '');
    }
  };

  const handleSlider = (val: number) => {
    setSliderValue(val);
    if (side === 'buy' && effectivePrice > 0) {
      const maxAmount = (usdtBalance * val / 100) / effectivePrice;
      setAmount(maxAmount > 0 ? maxAmount.toFixed(6) : '');
    } else if (side === 'sell') {
      const maxAmount = cryptoBalance * val / 100;
      setAmount(maxAmount > 0 ? maxAmount.toFixed(6) : '');
    }
  };

  const handleSubmit = () => {
    if (!user) return;
    if (amountNum <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (orderType === 'market') {
      const result = placeMarketOrder(user.id, pair, side, amountNum, price, deposit, withdraw, addTransaction);
      if (result.success) {
        toast.success(`${side === 'buy' ? 'Bought' : 'Sold'} ${amountNum} ${symbol} at $${formatPrice(price)}`);
        setAmount('');
        setSliderValue(0);
        onOrderPlaced?.();
      } else {
        toast.error(result.error || 'Order failed');
      }
    } else {
      if (effectivePrice <= 0) {
        toast.error("Please enter a valid price");
        return;
      }
      const result = placeLimitOrder(user.id, pair, side, amountNum, effectivePrice, withdraw);
      if (result.success) {
        toast.success(`Limit ${side} order placed: ${amountNum} ${symbol} at $${formatPrice(effectivePrice)}`);
        setAmount('');
        setSliderValue(0);
        onOrderPlaced?.();
      } else {
        toast.error(result.error || 'Order failed');
      }
    }
  };

  return (
    <div className="bg-[#0d0d10] rounded-xl border border-[#1a1a1e]">
      {/* Buy/Sell Tabs */}
      <div className="flex border-b border-[#1a1a1e]">
        <button
          onClick={() => { setSide('buy'); setAmount(''); setSliderValue(0); }}
          className={`flex-1 py-3 text-sm font-semibold transition-colors ${
            side === 'buy'
              ? 'text-[#0ecb81] border-b-2 border-[#0ecb81] bg-[#0ecb81]/5'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => { setSide('sell'); setAmount(''); setSliderValue(0); }}
          className={`flex-1 py-3 text-sm font-semibold transition-colors ${
            side === 'sell'
              ? 'text-[#f6465d] border-b-2 border-[#f6465d] bg-[#f6465d]/5'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Sell
        </button>
      </div>

      <div className="p-4 space-y-3">
        {/* Order Type */}
        <div className="flex gap-2 text-xs">
          {(['market', 'limit'] as const).map(type => (
            <button
              key={type}
              onClick={() => setOrderType(type)}
              className={`px-3 py-1 rounded-md capitalize transition-colors ${
                orderType === type
                  ? 'bg-[#0ecb81]/10 text-[#0ecb81]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Price Input */}
        {orderType === 'limit' && (
          <div className="space-y-1">
            <label className="text-xs text-gray-500">Price</label>
            <div className="relative">
              <input
                type="text"
                value={limitPrice}
                onChange={e => setLimitPrice(e.target.value)}
                className="w-full bg-[#1a1a1e] border border-[#2a2a2e] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#0ecb81]/50"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">USDT</span>
            </div>
          </div>
        )}

        {orderType === 'market' && (
          <div className="space-y-1">
            <label className="text-xs text-gray-500">Price</label>
            <div className="relative">
              <input
                type="text"
                readOnly
                value={`${formatPrice(price)} (Market)`}
                className="w-full bg-[#1a1a1e] border border-[#2a2a2e] rounded-lg px-3 py-2.5 text-sm text-gray-400"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">USDT</span>
            </div>
          </div>
        )}

        {/* Amount Input */}
        <div className="space-y-1">
          <label className="text-xs text-gray-500">Amount</label>
          <div className="relative">
            <input
              type="text"
              value={amount}
              onChange={e => {
                const v = e.target.value;
                if (v === '' || /^\d*\.?\d*$/.test(v)) setAmount(v);
              }}
              placeholder="0.00"
              className="w-full bg-[#1a1a1e] border border-[#2a2a2e] rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#0ecb81]/50"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">{symbol}</span>
          </div>
        </div>

        {/* Percentage Slider */}
        <div className="space-y-2">
          <input
            type="range"
            min={0}
            max={100}
            value={sliderValue}
            onChange={e => handleSlider(Number(e.target.value))}
            className="w-full h-1 bg-[#1a1a1e] rounded-lg appearance-none cursor-pointer accent-[#0ecb81]"
          />
          <div className="flex justify-between">
            {percentages.map(p => (
              <button
                key={p}
                onClick={() => handlePercentage(p)}
                className={`text-xs px-2 py-0.5 rounded transition-colors ${
                  sliderValue === p
                    ? 'bg-[#0ecb81]/10 text-[#0ecb81]'
                    : 'text-gray-500 hover:text-white'
                }`}
              >
                {p}%
              </button>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="space-y-1">
          <label className="text-xs text-gray-500">Total</label>
          <div className="relative">
            <input
              type="text"
              readOnly
              value={total > 0 ? total.toFixed(2) : '0.00'}
              className="w-full bg-[#1a1a1e] border border-[#2a2a2e] rounded-lg px-3 py-2.5 text-sm text-gray-400"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">USDT</span>
          </div>
        </div>

        {/* Available Balance */}
        <div className="flex justify-between text-xs text-gray-500 pt-1">
          <span>Available</span>
          <span className="text-gray-300">
            {isAuthenticated
              ? `${availableBalance.toFixed(side === 'buy' ? 2 : 6)} ${side === 'buy' ? 'USDT' : symbol}`
              : '--'}
          </span>
        </div>

        {/* Submit Button */}
        {isAuthenticated ? (
          <Button
            onClick={handleSubmit}
            className={`w-full py-3 font-semibold text-white ${
              side === 'buy'
                ? 'bg-[#0ecb81] hover:bg-[#0ecb81]/90'
                : 'bg-[#f6465d] hover:bg-[#f6465d]/90'
            }`}
          >
            {side === 'buy' ? `Buy ${symbol}` : `Sell ${symbol}`}
          </Button>
        ) : (
          <Link to="/login">
            <Button className="w-full py-3 font-semibold brand-gradient text-black">
              Log In to Trade
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default TradePanel;
