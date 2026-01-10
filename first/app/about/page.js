import Link from 'next/link';
import { Terminal, Cpu, Zap, Globe, ArrowLeft } from 'lucide-react';

export default function About() {
  const stats = [
    { label: "Built with", value: "Next.js 14", icon: <Cpu className="w-5 h-5 text-indigo-400" /> },
    { label: "Styled with", value: "Tailwind CSS", icon: <Zap className="w-5 h-5 text-yellow-400" /> },
    { label: "Deployment", value: "Vercel", icon: <Globe className="w-5 h-5 text-emerald-400" /> },
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30 overflow-hidden">
      
      {/* 1. Consistent Background (Grid + Glow) */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ backgroundImage: `linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)`, 
                    backgroundSize: '40px 40px' }}>
      </div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -z-10"></div>

      {/* 2. Content Container */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-20 pb-24">
        
        {/* Back Button */}
        <Link href="/" className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12 w-fit">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Tools</span>
        </Link>

        {/* Hero Section */}
        <section className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-white via-indigo-200 to-indigo-500 bg-clip-text text-transparent">
            About Utility Toolbox
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            This project was born out of a simple idea: creating a central hub for the small but essential tools 
            developers and users need every day. No ads, no fluff—just pure utility.
          </p>
        </section>

        {/* The "Why" Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="p-8 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-xl">
            <Terminal className="text-indigo-400 mb-4" size={32} />
            <h3 className="text-xl font-semibold mb-3">The Mission</h3>
            <p className="text-slate-400">
              To provide a lightweight, privacy-focused alternative to bloated online tools. 
              Whether it's generating a secure OTP or rolling a virtual die, speed is our priority.
            </p>
          </div>
          
          <div className="p-8 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-xl">
            <Cpu className="text-purple-400 mb-4" size={32} />
            <h3 className="text-xl font-semibold mb-3">The Tech</h3>
            <p className="text-slate-400">
              Built using modern web standards. By leveraging Next.js server-side capabilities and 
              Tailwind's utility-first styling, we ensure the fastest load times possible.
            </p>
          </div>
        </div>

        {/* Tech Stack Horizontal List */}
        <section className="border-t border-white/5 pt-12">
          <h2 className="text-2xl font-bold mb-8">Developed By</h2>
          <div className="flex flex-wrap gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-3 bg-slate-900/80 px-5 py-3 rounded-full border border-white/10 shadow-lg shadow-black/20">
                {stat.icon}
                <span className="text-sm font-medium">
                  <span className="text-slate-500">{stat.label}:</span> {stat.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Text */}
        <footer className="mt-32 text-center text-slate-500 text-sm">
          <p>© 2026 Utility Toolbox • Minor Project Cretaed. Just for Fun and gain some experience of deployment</p>
        </footer>
      </main>
    </div>
  );
}