import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Mail, Lock, Shield } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0b0e] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 brand-gradient rounded-xl flex items-center justify-center font-black text-black text-lg">
              K
            </div>
            <span className="text-2xl font-bold brand-text">KORYPTO</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-500 text-sm mt-1">Log in to your account to continue trading</p>
        </div>

        <div className="bg-[#0d0d10] border border-[#1a1a1e] rounded-2xl p-6 space-y-4">
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
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-600 accent-[#0ecb81]" />
              Remember me
            </label>
            <Link to="#" className="text-[#0ecb81] hover:underline">Forgot password?</Link>
          </div>

          <Button className="w-full brand-gradient text-black font-bold py-3">
            Log In
          </Button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#1a1a1e]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#0d0d10] px-3 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="border-[#2a2a2e] text-white hover:bg-white/5">
              Google
            </Button>
            <Button variant="outline" className="border-[#2a2a2e] text-white hover:bg-white/5">
              Apple
            </Button>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500 pt-2">
            <Shield className="w-4 h-4 text-[#0ecb81]" />
            Protected by advanced security and 2FA authentication
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#0ecb81] hover:underline font-medium">Register now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
