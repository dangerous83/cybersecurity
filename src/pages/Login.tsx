import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Mail, Lock, Shield, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const REMEMBER_KEY = 'alcon_remember';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(REMEMBER_KEY);
      if (saved) {
        const { email: savedEmail } = JSON.parse(saved);
        if (savedEmail) {
          setEmail(savedEmail);
          setRememberMe(true);
        }
      }
    } catch {}
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter your password");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        if (rememberMe) {
          localStorage.setItem(REMEMBER_KEY, JSON.stringify({ email }));
        } else {
          localStorage.removeItem(REMEMBER_KEY);
        }
        toast.success("Welcome back!");
        navigate("/trade");
      } else {
        setError(result.error || "Login failed");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#0b0b0e] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 brand-gradient rounded-xl flex items-center justify-center font-black text-black text-lg">
              A
            </div>
            <span className="text-2xl font-bold brand-text">ALCON</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-500 text-sm mt-1">Log in to your account to continue trading</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#0d0d10] border border-[#1a1a1e] rounded-2xl p-6 space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-[#f6465d]/10 border border-[#f6465d]/20 text-[#f6465d] text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-sm text-gray-400">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-[#1a1a1e] border border-[#2a2a2e] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#0ecb81]/50"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm text-gray-400">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-[#1a1a1e] border border-[#2a2a2e] rounded-xl pl-10 pr-12 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#0ecb81]/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
              <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} className="rounded border-gray-600 accent-[#0ecb81]" />
              Remember me
            </label>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full brand-gradient text-black font-bold py-3"
          >
            {loading ? "Logging in..." : "Log In"}
          </Button>

          <div className="bg-[#0ecb81]/5 border border-[#0ecb81]/20 rounded-lg p-3 text-xs text-gray-400">
            <p className="font-semibold text-[#0ecb81] mb-1.5">Demo Account Credentials</p>
            <div className="space-y-1">
              <p><span className="text-gray-300">Email:</span> demo@alcon.com</p>
              <p><span className="text-gray-300">Password:</span> demo123456</p>
            </div>
            <div className="border-t border-[#0ecb81]/10 mt-2 pt-2">
              <p><span className="text-gray-300">Email:</span> alice@alcon.com</p>
              <p><span className="text-gray-300">Password:</span> Alice1234!</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500 pt-2">
            <Shield className="w-4 h-4 text-[#0ecb81]" />
            Protected by advanced security and 2FA authentication
          </div>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#0ecb81] hover:underline font-medium">Register now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
