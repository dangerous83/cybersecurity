import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu, X, ChevronDown, Search, Bell, User, Wallet,
  Globe, Moon
} from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Exchange", href: "/trade" },
    { label: "Markets", href: "/markets" },
    { label: "Futures", href: "/futures" },
    { label: "Earn", href: "/earn" },
    { label: "NFT", href: "/nft" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="sticky top-0 z-50 glass-dark border-b border-[#2a2a2e]">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 brand-gradient rounded-lg flex items-center justify-center font-black text-black text-sm">
              K
            </div>
            <span className="text-xl font-bold brand-text hidden sm:block font-heading">KORYPTO</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 ml-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(link.href)
                    ? "text-[#0ecb81] bg-[#3b82f6]/10"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white flex items-center gap-1">
              More <ChevronDown className="w-3 h-3" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-xs mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search coins..."
                className="w-full bg-[#1e1e22] border border-[#2a2a2e] rounded-lg pl-9 pr-4 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#0ecb81]/50 transition-colors"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-2">
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
            <div className="flex items-center gap-1 ml-2 border-l border-[#2a2a2e] pl-2">
              <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5">
                <Wallet className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#3b82f6] rounded-full" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5">
                <User className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5">
                <Globe className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5">
                <Moon className="w-4 h-4" />
              </button>
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
                className="w-full bg-[#1e1e22] border border-[#2a2a2e] rounded-lg pl-9 pr-4 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#0ecb81]/50"
              />
            </div>
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2.5 text-sm font-medium rounded-lg ${
                  isActive(link.href)
                    ? "text-[#0ecb81] bg-[#3b82f6]/10"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-3 border-t border-[#2a2a2e]">
              <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" className="w-full border-[#0ecb81] text-[#0ecb81]">
                  Log In
                </Button>
              </Link>
              <Link to="/register" className="flex-1" onClick={() => setMobileOpen(false)}>
                <Button className="w-full brand-gradient text-black font-semibold">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
