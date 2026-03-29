import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu, X, ChevronDown, Search, Bell, User, Wallet,
  LogOut, ClipboardList, ArrowLeftRight
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useWallet } from "@/contexts/WalletContext";
import { usePrices } from "@/contexts/PriceContext";
import { formatPrice } from "@/lib/crypto-data";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { getBalance, getPortfolioValue } = useWallet();
  const { getPrice } = usePrices();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: "Exchange", href: "/trade" },
    { label: "Markets", href: "/markets" },
    { label: "Futures", href: "/futures" },
    { label: "Earn", href: "/earn" },
    { label: "NFT", href: "/nft" },
    { label: "White Label", href: "/white-label" },
  ];

  const isActive = (href: string) => location.pathname === href;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setUserMenuOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const portfolioValue = isAuthenticated ? getPortfolioValue(getPrice) : 0;

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 glass-dark border-b border-[#2a2a2e]">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 brand-gradient rounded-lg flex items-center justify-center font-black text-black text-sm">
              A
            </div>
            <span className="text-xl font-bold brand-text hidden sm:block font-heading">ALCON</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 ml-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(link.href)
                    ? "text-[#3b82f6] bg-[#3b82f6]/10"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated && (
              <>
                <Link
                  to="/wallet"
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive("/wallet")
                      ? "text-[#3b82f6] bg-[#3b82f6]/10"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Wallet
                </Link>
                <Link
                  to="/convert"
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive("/convert")
                      ? "text-[#3b82f6] bg-[#3b82f6]/10"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Convert
                </Link>
              </>
            )}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-xs mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search coins..."
                className="w-full bg-[#1e1e22] border border-[#2a2a2e] rounded-lg pl-9 pr-4 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#3b82f6]/50 transition-colors"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-2">
            {!isAuthenticated ? (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                    Log In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="brand-gradient text-black font-semibold hover:opacity-90">
                    Register
                  </Button>
                </Link>
              </>
            ) : (
              <>
                {/* Balance Preview */}
                <Link to="/wallet" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1a1a1e] hover:bg-[#222] transition-colors">
                  <Wallet className="w-4 h-4 text-[#3b82f6]" />
                  <span className="text-sm text-white font-medium">${formatPrice(portfolioValue)}</span>
                </Link>
              </>
            )}

            <div className="flex items-center gap-1 ml-2 border-l border-[#2a2a2e] pl-2">
              {/* Notifications */}
              <div className="relative" ref={notifRef}>
                <button
                  className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 relative"
                  onClick={() => setNotifOpen(!notifOpen)}
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#3b82f6] rounded-full" />
                </button>
                {notifOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-[#14151a] border border-[#2a2a2e] rounded-xl shadow-xl z-50 overflow-hidden">
                    <div className="p-3 border-b border-[#2a2a2e]">
                      <h4 className="text-sm font-semibold text-white">Notifications</h4>
                    </div>
                    <div className="p-4 text-center text-sm text-gray-500">
                      No new notifications
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    className="flex items-center gap-2 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  >
                    <div className="w-6 h-6 rounded-full brand-gradient flex items-center justify-center text-[10px] font-bold text-black">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-[#14151a] border border-[#2a2a2e] rounded-xl shadow-xl z-50 overflow-hidden">
                      <div className="p-3 border-b border-[#2a2a2e]">
                        <p className="text-sm font-semibold text-white">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      <div className="py-1">
                        <Link to="/wallet" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white">
                          <Wallet className="w-4 h-4" /> Wallet
                        </Link>
                        <Link to="/convert" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white">
                          <ArrowLeftRight className="w-4 h-4" /> Convert
                        </Link>
                        <Link to="/trade" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white">
                          <ClipboardList className="w-4 h-4" /> Orders
                        </Link>
                      </div>
                      <div className="border-t border-[#2a2a2e] py-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-3 py-2 text-sm text-[#f6465d] hover:bg-[#f6465d]/10 w-full text-left"
                        >
                          <LogOut className="w-4 h-4" /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5">
                  <User className="w-4 h-4" />
                </button>
              )}

            </div>
          </div>

          {/* Mobile Menu */}
          <button
            className="lg:hidden p-2 text-gray-300"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#2a2a2e] bg-[#0d0d10]">
          <div className="px-4 py-3 space-y-1">
            {/* Mobile Search */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search coins..."
                className="w-full bg-[#1e1e22] border border-[#2a2a2e] rounded-lg pl-9 pr-4 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#3b82f6]/50"
              />
            </div>
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2.5 text-sm font-medium rounded-lg ${
                  isActive(link.href)
                    ? "text-[#3b82f6] bg-[#3b82f6]/10"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated && (
              <>
                <Link to="/wallet" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:text-white hover:bg-white/5">
                  Wallet
                </Link>
                <Link to="/convert" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:text-white hover:bg-white/5">
                  Convert
                </Link>
              </>
            )}
            <div className="flex gap-2 pt-3 border-t border-[#2a2a2e]">
              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full border-[#3b82f6] text-[#3b82f6]">
                      Log In
                    </Button>
                  </Link>
                  <Link to="/register" className="flex-1" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full brand-gradient text-black font-semibold">
                      Register
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex-1 text-center text-sm text-gray-300 py-2">
                    {user?.name} - ${formatPrice(portfolioValue)}
                  </div>
                  <Button variant="outline" className="border-[#f6465d] text-[#f6465d]" onClick={() => { handleLogout(); setMobileOpen(false); }}>
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
