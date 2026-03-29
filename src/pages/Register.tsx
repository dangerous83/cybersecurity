import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Mail, Lock, User, Shield, Check } from "lucide-react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [referral, setReferral] = useState("");

  const passwordChecks = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains number", met: /\d/.test(password) },
    { label: "Contains special character", met: /[!@#$%^&*]/.test(password) },
  ];

  return (
    <div className="min-h-screen bg-[#0b0b0e] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 gold-gradient rounded-xl flex items-center justify-center font-black text-black text-lg">
              K
            </div>
            <span className="text-2xl font-bold gold-text">KORYPTO</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Create Account</h1>
          <p className="text-gray-500 text-sm mt-1">Start trading crypto in minutes</p>
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
                className="w-full bg-[#1a1a1e] border border-[#2a2a2e] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#f0b90b]/50"
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
                placeholder="Create a strong password"
                className="w-full bg-[#1a1a1e] border border-[#2a2a2e] rounded-xl pl-10 pr-12 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#f0b90b]/50"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {password && (
              <div className="grid grid-cols-2 gap-1 pt-1">
                {passwordChecks.map(check => (
                  <div key={check.label} className={`flex items-center gap-1 text-[10px] ${check.met ? 'text-[#0ecb81]' : 'text-gray-500'}`}>
                    <Check className="w-3 h-3" /> {check.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm text-gray-400">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full bg-[#1a1a1e] border border-[#2a2a2e] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#f0b90b]/50"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm text-gray-400">Referral Code (Optional)</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={referral}
                onChange={e => setReferral(e.target.value)}
                placeholder="Enter referral code"
                className="w-full bg-[#1a1a1e] border border-[#2a2a2e] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#f0b90b]/50"
              />
            </div>
          </div>

          <label className="flex items-start gap-2 text-xs text-gray-400 cursor-pointer">
            <input type="checkbox" className="rounded border-gray-600 mt-0.5 accent-[#f0b90b]" />
            <span>I agree to the <Link to="#" className="text-[#f0b90b] hover:underline">Terms of Service</Link> and <Link to="#" className="text-[#f0b90b] hover:underline">Privacy Policy</Link></span>
          </label>

          <Button className="w-full gold-gradient text-black font-bold py-3">
            Create Account
          </Button>

          <div className="flex items-center gap-2 text-xs text-gray-500 pt-2">
            <Shield className="w-4 h-4 text-[#0ecb81]" />
            Your data is encrypted and securely stored
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[#f0b90b] hover:underline font-medium">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
