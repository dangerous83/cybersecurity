import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

export interface WalletBalances {
  [asset: string]: number;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'trade_buy' | 'trade_sell' | 'convert' | 'stake' | 'unstake';
  asset: string;
  amount: number;
  timestamp: string;
  description: string;
}

interface WalletContextType {
  balances: WalletBalances;
  transactions: Transaction[];
  getBalance: (asset: string) => number;
  deposit: (asset: string, amount: number) => void;
  withdraw: (asset: string, amount: number) => boolean;
  addTransaction: (tx: Omit<Transaction, 'id' | 'timestamp'>) => void;
  getPortfolioValue: (getPrice: (symbol: string) => number) => number;
}

const WalletContext = createContext<WalletContextType>({
  balances: {},
  transactions: [],
  getBalance: () => 0,
  deposit: () => {},
  withdraw: () => false,
  addTransaction: () => {},
  getPortfolioValue: () => 0,
});

const WALLET_KEY = 'korypto_wallet_';
const TX_KEY = 'korypto_tx_';

const DEFAULT_BALANCES: WalletBalances = {
  USDT: 10000,
};

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [balances, setBalances] = useState<WalletBalances>({});
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load wallet when user changes
  useEffect(() => {
    if (user) {
      try {
        const stored = localStorage.getItem(WALLET_KEY + user.id);
        if (stored) {
          setBalances(JSON.parse(stored));
        } else {
          setBalances({ ...DEFAULT_BALANCES });
          localStorage.setItem(WALLET_KEY + user.id, JSON.stringify(DEFAULT_BALANCES));
        }
        const storedTx = localStorage.getItem(TX_KEY + user.id);
        if (storedTx) {
          setTransactions(JSON.parse(storedTx));
        } else {
          setTransactions([]);
        }
      } catch {
        setBalances({ ...DEFAULT_BALANCES });
        setTransactions([]);
      }
    } else {
      setBalances({});
      setTransactions([]);
    }
  }, [user]);

  const persist = useCallback((newBalances: WalletBalances) => {
    if (user) {
      localStorage.setItem(WALLET_KEY + user.id, JSON.stringify(newBalances));
    }
  }, [user]);

  const persistTx = useCallback((txList: Transaction[]) => {
    if (user) {
      localStorage.setItem(TX_KEY + user.id, JSON.stringify(txList));
    }
  }, [user]);

  const getBalance = useCallback((asset: string): number => {
    return balances[asset] || 0;
  }, [balances]);

  const deposit = useCallback((asset: string, amount: number) => {
    setBalances(prev => {
      const updated = { ...prev, [asset]: (prev[asset] || 0) + amount };
      persist(updated);
      return updated;
    });
  }, [persist]);

  const withdraw = useCallback((asset: string, amount: number): boolean => {
    const current = balances[asset] || 0;
    if (current < amount) return false;
    setBalances(prev => {
      const updated = { ...prev, [asset]: (prev[asset] || 0) - amount };
      if (updated[asset] < 0.000000001) updated[asset] = 0;
      persist(updated);
      return updated;
    });
    return true;
  }, [balances, persist]);

  const addTransaction = useCallback((tx: Omit<Transaction, 'id' | 'timestamp'>) => {
    const newTx: Transaction = {
      ...tx,
      id: 'tx-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
      timestamp: new Date().toISOString(),
    };
    setTransactions(prev => {
      const updated = [newTx, ...prev].slice(0, 200);
      persistTx(updated);
      return updated;
    });
  }, [persistTx]);

  const getPortfolioValue = useCallback((getPrice: (symbol: string) => number): number => {
    let total = 0;
    for (const [asset, amount] of Object.entries(balances)) {
      if (asset === 'USDT') {
        total += amount;
      } else {
        total += amount * getPrice(asset);
      }
    }
    return total;
  }, [balances]);

  return (
    <WalletContext.Provider value={{ balances, transactions, getBalance, deposit, withdraw, addTransaction, getPortfolioValue }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
export default WalletContext;
