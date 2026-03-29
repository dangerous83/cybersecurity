import { MapPin, Clock, ArrowRight, Briefcase, Code, Shield, Megaphone, BarChart3, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const departments = [
  { icon: Code, name: "Engineering", count: 12 },
  { icon: Shield, name: "Security", count: 4 },
  { icon: BarChart3, name: "Product", count: 6 },
  { icon: Megaphone, name: "Marketing", count: 5 },
  { icon: Users, name: "Operations", count: 3 },
  { icon: Briefcase, name: "Legal & Compliance", count: 3 },
];

const jobs = [
  { title: "Senior Backend Engineer", dept: "Engineering", location: "Remote", type: "Full-time", description: "Build and scale our high-performance trading engine processing millions of transactions per second." },
  { title: "Smart Contract Developer", dept: "Engineering", location: "Remote", type: "Full-time", description: "Design and audit smart contracts for our DeFi products, staking, and cross-chain bridges." },
  { title: "Senior Frontend Engineer (React)", dept: "Engineering", location: "Remote", type: "Full-time", description: "Build beautiful, performant trading interfaces used by millions of traders worldwide." },
  { title: "Security Engineer", dept: "Security", location: "Remote", type: "Full-time", description: "Protect user assets and platform infrastructure through penetration testing, code audits, and incident response." },
  { title: "Product Manager - Trading", dept: "Product", location: "Singapore", type: "Full-time", description: "Define and deliver the next generation of trading features for spot, futures, and options markets." },
  { title: "UX Designer", dept: "Product", location: "Remote", type: "Full-time", description: "Create intuitive, accessible designs that make crypto trading simple for millions of users." },
  { title: "Growth Marketing Manager", dept: "Marketing", location: "Dubai", type: "Full-time", description: "Drive user acquisition and retention through data-driven campaigns across global markets." },
  { title: "Compliance Analyst", dept: "Legal & Compliance", location: "Singapore", type: "Full-time", description: "Navigate global regulatory frameworks and ensure ALCON meets all compliance requirements." },
  { title: "DevOps Engineer", dept: "Engineering", location: "Remote", type: "Full-time", description: "Maintain 99.99% uptime for our infrastructure serving millions of concurrent users globally." },
  { title: "Data Scientist", dept: "Product", location: "Remote", type: "Full-time", description: "Build ML models for fraud detection, market analysis, and personalized user experiences." },
];

const perks = [
  "Competitive salary + crypto bonus",
  "Fully remote-first culture",
  "Unlimited PTO policy",
  "Annual learning budget ($5,000)",
  "Latest hardware & equipment",
  "Health & wellness benefits",
  "Crypto education programs",
  "Team retreats worldwide",
];

const Careers = () => (
  <div className="min-h-screen bg-[#0b0b0e]">
    <section className="relative overflow-hidden border-b border-[#1a1a1e]">
      <div className="absolute top-0 right-1/3 w-[500px] h-[300px] bg-[#3b82f6]/5 blur-[100px] rounded-full" />
      <div className="relative max-w-[1200px] mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Build the Future of <span className="brand-text">Finance</span></h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
          Join a world-class team of engineers, designers, and business leaders building the most trusted crypto exchange on the planet.
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
          <span className="flex items-center gap-1"><Users className="w-4 h-4 text-[#3b82f6]" /> 350+ Team Members</span>
          <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-[#3b82f6]" /> 40+ Countries</span>
          <span className="flex items-center gap-1"><Briefcase className="w-4 h-4 text-[#3b82f6]" /> {jobs.length} Open Roles</span>
        </div>
      </div>
    </section>

    {/* Departments */}
    <section className="max-w-[1200px] mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-white mb-6">Departments</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {departments.map(d => (
          <div key={d.name} className="bg-[#0d0d10] border border-[#1a1a1e] rounded-xl p-4 text-center hover:border-[#3b82f6]/20 transition-all">
            <d.icon className="w-6 h-6 text-[#3b82f6] mx-auto mb-2" />
            <div className="text-sm font-semibold text-white">{d.name}</div>
            <div className="text-xs text-gray-500">{d.count} openings</div>
          </div>
        ))}
      </div>
    </section>

    {/* Open Positions */}
    <section className="max-w-[1200px] mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-white mb-6">Open Positions</h2>
      <div className="space-y-3">
        {jobs.map((job, i) => (
          <div key={i} className="bg-[#0d0d10] border border-[#1a1a1e] rounded-xl p-5 hover:border-[#3b82f6]/20 transition-all group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-white text-lg group-hover:text-[#60a5fa] transition-colors">{job.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{job.description}</p>
                <div className="flex flex-wrap gap-3 mt-3">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[#3b82f6]/10 text-[#3b82f6]">{job.dept}</span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[#1a1a1e] text-gray-400 flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[#1a1a1e] text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{job.type}</span>
                </div>
              </div>
              <Button variant="outline" className="border-[#2a2a2e] text-white hover:bg-[#3b82f6]/10 hover:text-[#60a5fa] hover:border-[#3b82f6]/30 shrink-0">
                Apply Now <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Perks */}
    <section className="bg-[#0a0a0d] border-y border-[#1a1a1e] py-16">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Why Work at ALCON</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {perks.map(perk => (
            <div key={perk} className="flex items-center gap-3 bg-[#0d0d10] border border-[#1a1a1e] rounded-xl p-4">
              <div className="w-2 h-2 rounded-full bg-[#3b82f6] shrink-0" />
              <span className="text-sm text-gray-300">{perk}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Careers;
