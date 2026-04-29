import Link from 'next/link';
import { ShieldCheck, Lock, Hash, Disc, ArrowRight, Sparkles, Zap, Shield, Laptop } from 'lucide-react';

export default function Home() {
  const features = [
    {
      title: "OTP Generator",
      desc: "Secure 6-digit one-time passwords.",
      path: "/otp",
      icon: <ShieldCheck className="w-8 h-8 text-indigo-400" />,
      color: "hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)] hover:border-indigo-500/50",
      bgHover: "group-hover:bg-indigo-500/10",
      accent: "text-indigo-400"
    },
    {
      title: "Password Architect",
      desc: "Generate unbreakable alphanumeric passwords.",
      path: "/password",
      icon: <Lock className="w-8 h-8 text-cyan-400" />,
      color: "hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.3)] hover:border-cyan-500/50",
      bgHover: "group-hover:bg-cyan-500/10",
      accent: "text-cyan-400"
    },
    {
      title: "Range Randomizer",
      desc: "Pick a fair number between any two values.",
      path: "/random",
      icon: <Hash className="w-8 h-8 text-purple-400" />,
      color: "hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)] hover:border-purple-500/50",
      bgHover: "group-hover:bg-purple-500/10",
      accent: "text-purple-400"
    },
    {
      title: "Virtual Dice",
      desc: "Roll a fair 6-sided die instantly.",
      path: "/dice",
      icon: <Disc className="w-8 h-8 text-rose-400" />,
      color: "hover:shadow-[0_0_30px_-5px_rgba(244,63,94,0.3)] hover:border-rose-500/50",
      bgHover: "group-hover:bg-rose-500/10",
      accent: "text-rose-400"
    }
  ];

  const benefits = [
    { icon: <Zap className="w-5 h-5" />, title: "Lightning Fast", desc: "Zero loading screens. Instant results." },
    { icon: <Shield className="w-5 h-5" />, title: "Privacy First", desc: "Everything runs locally in your browser." },
    { icon: <Laptop className="w-5 h-5" />, title: "Cross-Platform", desc: "Works seamlessly on mobile and desktop." },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-indigo-500/30 overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" 
           style={{ backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`, 
                    backgroundSize: '32px 32px' }}>
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-24 flex flex-col items-center">
        
        {/* ── Hero Section ── */}
        <div className="text-center max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 backdrop-blur-sm mb-8 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-medium text-indigo-300">Your everyday essentials, elevated.</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-linear-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
            The Ultimate <br className="hidden md:block" /> Utility Toolbox
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
            A premium collection of quick-access tools for security, randomization, and everyday tasks. 
            No ads, no tracking—just pure utility.
          </p>
        </div>

        {/* ── Tools Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mb-32 relative">
          
          {/* Decorative central glow for grid */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-500/5 blur-[100px] -z-10 rounded-full"></div>

          {features.map((item, index) => (
            <Link key={index} href={item.path} className="block group outline-none">
              <div className={`relative p-8 rounded-[2rem] border border-slate-800 bg-slate-900/40 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 ${item.color} overflow-hidden h-full flex flex-col`}>
                
                {/* Hover gradient sweep */}
                <div className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                <div className="flex items-start justify-between relative z-10 mb-8">
                  <div className={`p-4 rounded-2xl bg-slate-800/80 border border-slate-700/50 group-hover:scale-110 transition-transform duration-500 ${item.bgHover}`}>
                    {item.icon}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 border border-slate-700">
                    <ArrowRight className={`w-5 h-5 ${item.accent}`} />
                  </div>
                </div>
                
                <div className="relative z-10 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-slate-100 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 group-hover:text-slate-300 leading-relaxed mb-8 flex-1">
                    {item.desc}
                  </p>
                  
                  <div className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wider ${item.accent} mt-auto`}>
                    <span>Launch Tool</span>
                    <div className="h-[2px] w-0 group-hover:w-8 bg-current transition-all duration-500 ease-out"></div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Benefits Section ── */}
        <div className="w-full max-w-5xl pt-16 border-t border-slate-800/60">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex flex-col items-center md:items-start p-6 rounded-3xl hover:bg-slate-900/40 transition-colors duration-300">
                <div className="p-3 bg-slate-800 rounded-xl text-slate-300 mb-5 border border-slate-700">
                  {benefit.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{benefit.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}