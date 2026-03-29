import { Shield, Users, Globe, Award, Target, Zap, Lock, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => (
  <div className="min-h-screen bg-[#0b0b0e]">
    {/* Hero */}
    <section className="relative overflow-hidden border-b border-[#1a1a1e]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#0ecb81]/5 blur-[120px] rounded-full" />
      <div className="relative max-w-[1200px] mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About <span className="brand-text">ALCON</span></h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Founded in 2024, ALCON is a next-generation cryptocurrency exchange built to make digital asset trading accessible, secure, and efficient for everyone — from first-time buyers to institutional traders.
        </p>
      </div>
    </section>

    {/* Mission */}
    <section className="max-w-[1200px] mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-gray-400 mb-4 leading-relaxed">
            We believe cryptocurrency has the power to create a more open, accessible, and fair financial system. Our mission is to build the infrastructure that makes this possible — providing the tools, security, and education that empower people worldwide to participate in the digital economy.
          </p>
          <p className="text-gray-400 leading-relaxed">
            Every decision we make is guided by our commitment to security, transparency, and user experience. We're not just building an exchange — we're building the future of finance.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Users, value: "185M+", label: "Registered Users" },
            { icon: Globe, value: "180+", label: "Countries Served" },
            { icon: BarChart3, value: "$76B+", label: "Daily Volume" },
            { icon: Lock, value: "$12.8B", label: "Assets Secured" },
          ].map(stat => (
            <div key={stat.label} className="bg-[#0d0d10] border border-[#1a1a1e] rounded-2xl p-5 text-center">
              <stat.icon className="w-6 h-6 text-[#0ecb81] mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="bg-[#0a0a0d] border-y border-[#1a1a1e] py-16">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Our Core Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Shield, title: "Security First", desc: "Multi-layer security architecture with cold storage, real-time monitoring, and insurance fund protection for all user assets." },
            { icon: Target, title: "User Focused", desc: "Every feature is designed with the user in mind. Simple for beginners, powerful for professionals, accessible to everyone." },
            { icon: Zap, title: "Innovation", desc: "We continuously push the boundaries of what's possible in crypto trading with cutting-edge technology and features." },
            { icon: Award, title: "Transparency", desc: "Open communication, published proof-of-reserves, and regular security audits. We earn trust through actions, not words." },
          ].map(v => (
            <div key={v.title} className="bg-[#0d0d10] border border-[#1a1a1e] rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-[#0ecb81]/10 flex items-center justify-center mb-4">
                <v.icon className="w-6 h-6 text-[#0ecb81]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{v.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="max-w-[1200px] mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-white text-center mb-4">Leadership Team</h2>
      <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">Industry veterans from top tech companies and financial institutions leading the future of crypto.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: "Alex Chen", role: "CEO & Co-Founder", bg: "Former Goldman Sachs VP" },
          { name: "Sarah Kim", role: "CTO & Co-Founder", bg: "Ex-Google Staff Engineer" },
          { name: "Marcus Wright", role: "Chief Security Officer", bg: "Former NSA Cybersecurity" },
          { name: "Priya Patel", role: "VP of Product", bg: "Ex-Coinbase Product Lead" },
        ].map(person => (
          <div key={person.name} className="bg-[#0d0d10] border border-[#1a1a1e] rounded-2xl p-6 text-center">
            <div className="w-16 h-16 rounded-full brand-gradient flex items-center justify-center text-xl font-bold text-black mx-auto mb-3">
              {person.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h3 className="font-semibold text-white">{person.name}</h3>
            <p className="text-sm text-[#0ecb81]">{person.role}</p>
            <p className="text-xs text-gray-500 mt-1">{person.bg}</p>
          </div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="border-t border-[#1a1a1e] py-16 text-center">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Trading?</h2>
        <p className="text-gray-400 mb-8">Join millions of users on the most trusted crypto exchange.</p>
        <Link to="/register">
          <Button size="lg" className="brand-gradient text-black font-bold px-10">Create Free Account</Button>
        </Link>
      </div>
    </section>
  </div>
);

export default About;
