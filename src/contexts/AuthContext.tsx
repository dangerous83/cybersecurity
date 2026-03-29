import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (email: string, password: string, name: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => ({ success: false }),
  register: () => ({ success: false }),
  logout: () => {},
});

const DEMO_ACCOUNTS = [
  { id: 'demo-1', email: 'demo@alcon.com', password: 'demo123456', name: 'Demo Trader', createdAt: '2024-01-15T00:00:00Z' },
  { id: 'demo-2', email: 'alice@alcon.com', password: 'Alice1234!', name: 'Alice Chen', createdAt: '2024-03-20T00:00:00Z' },
];

const STORAGE_KEY = 'alcon_auth';
const USERS_KEY = 'alcon_users';

function getStoredUsers(): Array<{ id: string; email: string; password: string; name: string; createdAt: string }> {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  // Seed demo accounts
  localStorage.setItem(USERS_KEY, JSON.stringify(DEMO_ACCOUNTS));
  return [...DEMO_ACCOUNTS];
}

function saveUsers(users: Array<{ id: string; email: string; password: string; name: string; createdAt: string }>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {}
    // Ensure demo accounts exist
    getStoredUsers();
  }, []);

  const login = useCallback((email: string, password: string): { success: boolean; error?: string } => {
    const users = getStoredUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!found) {
      return { success: false, error: 'Invalid email or password' };
    }
    const userData: User = { id: found.id, email: found.email, name: found.name, createdAt: found.createdAt };
    setUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    return { success: true };
  }, []);

  const register = useCallback((email: string, password: string, name: string): { success: boolean; error?: string } => {
    const users = getStoredUsers();
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'An account with this email already exists' };
    }
    const newUser = {
      id: 'user-' + Date.now(),
      email,
      password,
      name,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    saveUsers(users);
    const userData: User = { id: newUser.id, email: newUser.email, name: newUser.name, createdAt: newUser.createdAt };
    setUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
