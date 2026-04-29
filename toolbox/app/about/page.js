import Link from 'next/link';
import { 
  Terminal, Cpu, Zap, Globe, ArrowLeft, 
  ShieldCheck, Lock, Hash, Disc,
  CheckCircle, Clock, ArrowRight, Github, Linkedin
} from 'lucide-react';

export default function About() {

  const techStack = [
    { label: "Framework", value: "Next.js 15", icon: <Cpu className="w-5 h-5 text-indigo-400" />, accent: "border-indigo-500/20 bg-indigo-500/5" },
    { label: "Styling", value: "Tailwind CSS v4", icon: <Zap className="w-5 h-5 text-yellow-400" />, accent: "border-yellow-500/20 bg-yellow-500/5" },
    { label: "Icons", value: "Lucide React", icon: <Terminal className="w-5 h-5 text-cyan-400" />, accent: "border-cyan-500/20 bg-cyan-500/5" },
    { label: "Deployment", value: "Vercel", icon: <Globe className="w-5 h-5 text-emerald-400" />, accent: "border-emerald-500/20 bg-emerald-500/5" },
  ];

  const tools = [
    { name: "OTP Generator", desc: "Secure 6-digit one-time passwords", path: "/otp", icon: <ShieldCheck className="w-5 h-5 text-indigo-400" />, color: "border-indigo-500/20 hover:border-indigo-500/40 hover:bg-indigo-500/5" },
    { name: "Password Architect", desc: "Alphanumeric + symbol passwords", path: "/password", icon: <Lock className="w-5 h-5 text-cyan-400" />, color: "border-cyan-500/20 hover:border-cyan-500/40 hover:bg-cyan-500/5" },
    { name: "Range Randomizer", desc: "Random number between any two values", path: "/random", icon: <Hash className="w-5 h-5 text-purple-400" />, color: "border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-500/5" },
    { name: "Virtual Dice", desc: "Roll a fair 6-sided die instantly", path: "/dice", icon: <Disc className="w-5 h-5 text-rose-400" />, color: "border-rose-500/20 hover:border-rose-500/40 hover:bg-rose-500/5" },
  ];

  const roadmap = [
    { label: "Copy to Clipboard on all tools", done: false },
    { label: "Light / Dark mode toggle", done: false },
    { label: "Password length & strength controls", done: false },
    { label: "Unit Converter tool", done: false },
  ];

  const stats = [
    { value: "4", label: "Tools" },
    { value: "0", label: "Ads" },
    { value: "100%", label: "Free" },
    { value: "∞", label: "Uses" },
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30 overflow-hidden">

      {/* Background grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-24">

        {/* Back Button */}
        <Link href="/" className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-14 w-fit">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="text-sm">Back to Tools</span>
        </Link>

        {/* ── Hero ── */}
        <section className="mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-6">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">Minor Project · 2026</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-linear-to-r from-white via-indigo-200 to-indigo-500 bg-clip-text text-transparent leading-tight">
            About Utility Toolbox
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
            A fast, minimal hub for everyday utility tools. No ads, no sign-ups, no bloat — 
            just the tools you need, working instantly in your browser.
          </p>
        </section>

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-4 gap-4 mb-20">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-5 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm">
              <span className="text-3xl font-black text-white mb-1">{s.value}</span>
              <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── Mission & Tech ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          <div className="p-8 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-xl">
            <div className="p-3 bg-indigo-500/15 rounded-xl w-fit mb-5">
              <Terminal className="text-indigo-400" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">The Mission</h3>
            <p className="text-slate-400 leading-relaxed">
              To provide a lightweight, privacy-focused alternative to bloated online tools.
              Everything runs client-side — no data is ever sent to a server.
              Speed and simplicity are the only priorities.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-xl">
            <div className="p-3 bg-purple-500/15 rounded-xl w-fit mb-5">
              <Cpu className="text-purple-400" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">The Tech</h3>
            <p className="text-slate-400 leading-relaxed">
              Built on Next.js 15 App Router with React 19 and Tailwind CSS v4.
              Deployed on Vercel's edge network for sub-second load times globally.
              The React Compiler handles automatic memoization.
            </p>
          </div>
        </div>

        {/* ── Tools Section ── */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-2">The Tools</h2>
          <p className="text-slate-500 text-sm mb-8">Click any tool to try it</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tools.map((tool, i) => (
              <Link key={i} href={tool.path} className={`group flex items-center justify-between p-5 rounded-2xl border bg-slate-900/30 backdrop-blur-sm transition-all duration-200 ${tool.color}`}>
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-slate-800 rounded-xl group-hover:scale-110 transition-transform duration-200">
                    {tool.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{tool.name}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{tool.desc}</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-slate-600 group-hover:text-slate-400 group-hover:translate-x-1 transition-all duration-200 shrink-0" />
              </Link>
            ))}
          </div>
        </section>

        {/* ── Tech Stack Badges ── */}
        <section className="border-t border-white/5 pt-12 mb-20">
          <h2 className="text-2xl font-bold mb-8">Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {techStack.map((t, i) => (
              <div key={i} className={`flex items-center gap-3 px-5 py-3 rounded-full border backdrop-blur-sm ${t.accent}`}>
                {t.icon}
                <span className="text-sm font-medium">
                  <span className="text-slate-500">{t.label}: </span>
                  <span className="text-white">{t.value}</span>
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Roadmap ── */}
        <section className="border-t border-white/5 pt-12 mb-20">
          <h2 className="text-2xl font-bold mb-2">Roadmap</h2>
          <p className="text-slate-500 text-sm mb-8">What's coming next</p>
          <div className="flex flex-col gap-3">
            {roadmap.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/30">
                {item.done
                  ? <CheckCircle className="text-emerald-400 shrink-0" size={18} />
                  : <Clock className="text-slate-600 shrink-0" size={18} />
                }
                <span className={`text-sm ${item.done ? 'text-emerald-300 line-through' : 'text-slate-300'}`}>
                  {item.label}
                </span>
                {!item.done && (
                  <span className="ml-auto text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-500 border border-slate-700 font-semibold">
                    Upcoming
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Developer ── */}
        <section className="border-t border-white/5 pt-12">
          <h2 className="text-2xl font-bold mb-8">The Developer</h2>
          <div className="flex items-center gap-6 p-6 rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl">
            {/* Avatar placeholder */}
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
              <span className="text-2xl font-black text-indigo-400 select-none">YB</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white">Yogendra Bisht</h3>
              <p className="text-slate-400 text-sm mt-1">
                Building this in public — learning Next.js, deployment & professional web standards.
              </p>
              <div className="flex items-center gap-4 mt-4">
                <a
                  href="https://github.com/Yogendra-Bisht/Next"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  <Github size={14} />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/yogendra-bisht-7b4b63288"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  <Linkedin size={14} />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="mt-24 text-center text-slate-600 text-sm">
          <p>© 2026 Utility Toolbox · Built for fun & to gain real deployment experience.</p>
        </footer>

      </main>
    </div>
  );
}