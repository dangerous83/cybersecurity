export interface Order {
  id: string;
  pair: string;
  side: 'buy' | 'sell';
  type: 'market' | 'limit';
  price: number;
  amount: number;
  total: number;
  status: 'open' | 'filled' | 'cancelled';
  timestamp: string;
  filledAt?: string;
}

const ORDERS_KEY = 'alcon_orders_';

function getOrdersFromStorage(userId: string): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY + userId);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function saveOrdersToStorage(userId: string, orders: Order[]) {
  localStorage.setItem(ORDERS_KEY + userId, JSON.stringify(orders));
}

export function placeMarketOrder(
  userId: string,
  pair: string,
  side: 'buy' | 'sell',
  amount: number,
  currentPrice: number,
  walletDeposit: (asset: string, amt: number) => void,
  walletWithdraw: (asset: string, amt: number) => boolean,
  addTransaction: (tx: { type: 'trade_buy' | 'trade_sell'; asset: string; amount: number; description: string }) => void,
): { success: boolean; error?: string; order?: Order } {
  const baseAsset = pair.replace('/USDT', '');
  const total = amount * currentPrice;

  if (side === 'buy') {
    const ok = walletWithdraw('USDT', total);
    if (!ok) return { success: false, error: 'Insufficient USDT balance' };
    walletDeposit(baseAsset, amount);
    addTransaction({ type: 'trade_buy', asset: baseAsset, amount, description: `Bought ${amount} ${baseAsset} at $${currentPrice.toFixed(2)}` });
  } else {
    const ok = walletWithdraw(baseAsset, amount);
    if (!ok) return { success: false, error: `Insufficient ${baseAsset} balance` };
    walletDeposit('USDT', total);
    addTransaction({ type: 'trade_sell', asset: baseAsset, amount, description: `Sold ${amount} ${baseAsset} at $${currentPrice.toFixed(2)}` });
  }

  const order: Order = {
    id: 'ord-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
    pair,
    side,
    type: 'market',
    price: currentPrice,
    amount,
    total,
    status: 'filled',
    timestamp: new Date().toISOString(),
    filledAt: new Date().toISOString(),
  };

  const orders = getOrdersFromStorage(userId);
  orders.unshift(order);
  saveOrdersToStorage(userId, orders.slice(0, 500));

  return { success: true, order };
}

export function placeLimitOrder(
  userId: string,
  pair: string,
  side: 'buy' | 'sell',
  amount: number,
  limitPrice: number,
  walletWithdraw: (asset: string, amt: number) => boolean,
): { success: boolean; error?: string; order?: Order } {
  const baseAsset = pair.replace('/USDT', '');
  const total = amount * limitPrice;

  // Reserve funds
  if (side === 'buy') {
    const ok = walletWithdraw('USDT', total);
    if (!ok) return { success: false, error: 'Insufficient USDT balance' };
  } else {
    const ok = walletWithdraw(baseAsset, amount);
    if (!ok) return { success: false, error: `Insufficient ${baseAsset} balance` };
  }

  const order: Order = {
    id: 'ord-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
    pair,
    side,
    type: 'limit',
    price: limitPrice,
    amount,
    total,
    status: 'open',
    timestamp: new Date().toISOString(),
  };

  const orders = getOrdersFromStorage(userId);
  orders.unshift(order);
  saveOrdersToStorage(userId, orders.slice(0, 500));

  return { success: true, order };
}

export function cancelOrder(
  userId: string,
  orderId: string,
  walletDeposit: (asset: string, amt: number) => void,
): boolean {
  const orders = getOrdersFromStorage(userId);
  const idx = orders.findIndex(o => o.id === orderId && o.status === 'open');
  if (idx === -1) return false;

  const order = orders[idx];
  const baseAsset = order.pair.replace('/USDT', '');

  // Refund reserved funds
  if (order.side === 'buy') {
    walletDeposit('USDT', order.total);
  } else {
    walletDeposit(baseAsset, order.amount);
  }

  orders[idx] = { ...order, status: 'cancelled' };
  saveOrdersToStorage(userId, orders);
  return true;
}

export function checkLimitOrders(
  userId: string,
  currentPrices: Record<string, number>,
  walletDeposit: (asset: string, amt: number) => void,
  addTransaction: (tx: { type: 'trade_buy' | 'trade_sell'; asset: string; amount: number; description: string }) => void,
): Order[] {
  const orders = getOrdersFromStorage(userId);
  const filledOrders: Order[] = [];
  let changed = false;

  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    if (order.status !== 'open') continue;

    const baseAsset = order.pair.replace('/USDT', '');
    const currentPrice = currentPrices[baseAsset];
    if (!currentPrice) continue;

    let shouldFill = false;
    if (order.side === 'buy' && currentPrice <= order.price) {
      shouldFill = true;
    } else if (order.side === 'sell' && currentPrice >= order.price) {
      shouldFill = true;
    }

    if (shouldFill) {
      if (order.side === 'buy') {
        walletDeposit(baseAsset, order.amount);
        addTransaction({ type: 'trade_buy', asset: baseAsset, amount: order.amount, description: `Limit buy filled: ${order.amount} ${baseAsset} at $${order.price.toFixed(2)}` });
      } else {
        walletDeposit('USDT', order.total);
        addTransaction({ type: 'trade_sell', asset: baseAsset, amount: order.amount, description: `Limit sell filled: ${order.amount} ${baseAsset} at $${order.price.toFixed(2)}` });
      }
      orders[i] = { ...order, status: 'filled', filledAt: new Date().toISOString() };
      filledOrders.push(orders[i]);
      changed = true;
    }
  }

  if (changed) {
    saveOrdersToStorage(userId, orders);
  }

  return filledOrders;
}

export function getOpenOrders(userId: string): Order[] {
  return getOrdersFromStorage(userId).filter(o => o.status === 'open');
}

export function getOrderHistory(userId: string): Order[] {
  return getOrdersFromStorage(userId).filter(o => o.status !== 'open');
}

export function getAllOrders(userId: string): Order[] {
  return getOrdersFromStorage(userId);
}
