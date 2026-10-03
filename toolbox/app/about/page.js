"use client";
import React from "react";
import Link from "next/link";
import {
  Terminal, Cpu, Zap, Globe, ArrowLeft,
  Lock, ShieldCheck, Disc, Hash, FileCode, Type, Palette, Thermometer, Coins, Bitcoin,
  CheckCircle, ArrowRight, Shield
} from "lucide-react";

const GithubIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.68 1.68 0 1 0 0 3.36 1.68 1.68 0 0 0 0-3.36Z" />
  </svg>
);

export default function AboutPage() {
  const techStack = [
    { label: "Framework", value: "Next.js 16 (App Router)", icon: Cpu, accent: "border-indigo-500/20 bg-indigo-500/5 text-indigo-400" },
    { label: "Styling", value: "Tailwind CSS v4", icon: Zap, accent: "border-yellow-500/20 bg-yellow-500/5 text-yellow-400" },
    { label: "Security", value: "Web Crypto API", icon: Shield, accent: "border-cyan-500/20 bg-cyan-500/5 text-cyan-400" },
    { label: "Icons", value: "Lucide React", icon: Terminal, accent: "border-pink-500/20 bg-pink-500/5 text-pink-400" },
    { label: "Deployment", value: "Vercel Edge Network", icon: Globe, accent: "border-emerald-500/20 bg-emerald-500/5 text-emerald-400" },
  ];

  const tools = [
    { name: "Password Architect Pro", desc: "Web-Crypto RNG + NIST Entropy Meter", path: "/password", icon: Lock },
    { name: "OTP & 2FA Studio", desc: "Crypto OTP & RFC 6238 TOTP Simulator", path: "/otp", icon: ShieldCheck },
    { name: "Multi-Dice Roller", desc: "Polyhedral (d4-d100) + 3D animations", path: "/dice", icon: Disc },
    { name: "Range Randomizer", desc: "Unique range RNG & list winner picker", path: "/random", icon: Hash },
    { name: "JSON Formatter", desc: "Schema validator & TypeScript interface generator", path: "/json", icon: FileCode },
    { name: "Text & Case Studio", desc: "Case converters, Base64 & URL encoders", path: "/text", icon: Type },
    { name: "Color & Contrast Studio", desc: "HEX/RGB/HSL + WCAG AA/AAA audit", path: "/color", icon: Palette },
    { name: "Unit & Temp Converter", desc: "Temp, length, weight, data storage", path: "/unit", icon: Thermometer },
    { name: "Fiat Currency Converter", desc: "Live FX rates for 30+ world currencies", path: "/currency", icon: Coins },
    { name: "Crypto Currency Tracker", desc: "Live crypto market prices & conversion", path: "/crypto", icon: Bitcoin },
  ];

  const stats = [
    { value: "10", label: "Production Tools" },
    { value: "0", label: "Tracking / Ads" },
    { value: "100%", label: "Client Privacy" },
    { value: "Web Crypto", label: "RNG Standard" },
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30 pt-24 pb-24 px-4 sm:px-6 overflow-hidden">
      
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/8 rounded-full blur-[120px] pointer-events-none" />

      <main className="relative z-10 max-w-4xl mx-auto">
        
        {/* Back Button */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-10 w-fit"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back to Hub</span>
        </Link>

        {/* Hero Section */}
        <section className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-6">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
              Resume Portfolio Showcase · 2026
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-indigo-200 to-indigo-500 bg-clip-text text-transparent leading-tight">
            About OmniToolbox Hub
          </h1>

          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
            OmniToolbox is a production-grade utility platform built with Next.js 16, Tailwind CSS v4, and Web Crypto APIs.
            Designed for software engineers, designers, and daily power users requiring cryptographically secure randomization, real-time FX/crypto rates, and zero-tracking privacy.
          </p>
        </section>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-5 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm">
              <span className="text-2xl sm:text-3xl font-black text-indigo-400 mb-1">{s.value}</span>
              <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest font-semibold">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Architectural Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800">
            <div className="p-3 bg-indigo-500/15 rounded-xl text-indigo-400 w-fit mb-5 border border-indigo-500/20">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Cryptographic Privacy</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Every password, OTP, and random number is generated locally using <code className="text-indigo-300 font-mono">window.crypto.getRandomValues</code>. No server calls, no databases, no tracking cookies.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800">
            <div className="p-3 bg-purple-500/15 rounded-xl text-purple-400 w-fit mb-5 border border-purple-500/20">
              <Cpu size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Modern Web Architecture</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Built on Next.js 16 App Router, React 19, and Tailwind v4. Features a global Command Palette (<code className="text-purple-300 font-mono">Cmd + K</code>), LocalStorage activity history, and live API fallback caching.
            </p>
          </div>
        </div>

        {/* Tools Suite Grid */}
        <section className="mb-16 space-y-6">
          <h2 className="text-2xl font-bold">The 10 Tools Suite</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tools.map((tool, i) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={i}
                  href={tool.path}
                  className="flex items-center justify-between p-4 rounded-2xl border border-slate-800 bg-slate-900/30 hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl bg-slate-800 text-indigo-400 group-hover:scale-110 transition-transform">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm group-hover:text-indigo-300 transition-colors">{tool.name}</p>
                      <p className="text-slate-500 text-xs mt-0.5 line-clamp-1">{tool.desc}</p>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all shrink-0" />
                </Link>
              );
            })}
          </div>
        </section>

        {/* Tech Badges */}
        <section className="border-t border-slate-800 pt-12 mb-16">
          <h2 className="text-2xl font-bold mb-6">Tech Stack & Infrastructure</h2>
          <div className="flex flex-wrap gap-3">
            {techStack.map((t, i) => {
              const Icon = t.icon;
              return (
                <div key={i} className={`flex items-center gap-3 px-4 py-2.5 rounded-full border ${t.accent}`}>
                  <Icon size={16} />
                  <span className="text-xs font-medium">
                    <span className="text-slate-500">{t.label}: </span>
                    <span className="text-white font-bold">{t.value}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Developer Portfolio Card */}
        <section className="border-t border-slate-800 pt-12">
          <h2 className="text-2xl font-bold mb-6">Developer & Resume Portfolio</h2>
          <div className="flex items-center gap-6 p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
              <span className="text-2xl font-black text-indigo-400 select-none">YB</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white">Yogendra Bisht</h3>
              <p className="text-slate-400 text-sm mt-1">
                Full-Stack & Frontend Developer · Building high-performance, beautiful web applications with Next.js & modern Web APIs.
              </p>
              <div className="flex items-center gap-4 mt-4">
                <a
                  href="https://github.com/Yogendra-Bisht/Next"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  <GithubIcon size={16} />
                  GitHub Repository
                </a>
                <a
                  href="https://www.linkedin.com/in/yogendra-bisht-7b4b63288"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  <LinkedinIcon size={16} />
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 text-center text-slate-600 text-xs">
          <p>© 2026 OmniToolbox · Built for real utility & resume portfolio excellence.</p>
        </footer>

      </main>
    </div>
  );
}
