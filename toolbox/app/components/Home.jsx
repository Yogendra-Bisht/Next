"use client";
import React from "react";
import Link from "next/link";
import {
  Lock,
  ShieldCheck,
  Disc,
  Hash,
  FileCode,
  Type,
  Palette,
  Thermometer,
  Coins,
  Bitcoin,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Search,
  Cpu
} from "lucide-react";

export default function Home() {
  const toolCategories = [
    {
      title: "Security & Authentication",
      subtitle: "Cryptographically secure generators & RFC 6238 TOTP authenticators",
      tools: [
        {
          name: "Password Architect Pro",
          desc: "Generate unbreakable Web-Crypto passwords with NIST entropy score & passphrase modes.",
          path: "/password",
          icon: Lock,
          accent: "border-cyan-500/30 text-cyan-400 bg-cyan-500/5 hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]",
          tag: "Web Crypto API"
        },
        {
          name: "OTP & 2FA Security Studio",
          desc: "Generate 4/6/8-digit OTPs and simulate live 30-second rolling TOTP authenticators.",
          path: "/otp",
          icon: ShieldCheck,
          accent: "border-indigo-500/30 text-indigo-400 bg-indigo-500/5 hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]",
          tag: "RFC 6238 TOTP"
        },
      ]
    },
    {
      title: "Randomization & Decision",
      subtitle: "Fair polyhedral dice rolling & list shuffler tools",
      tools: [
        {
          name: "Virtual Multi-Dice Roller",
          desc: "Roll 1-6 dice across d4, d6, d8, d10, d12, d20, d100 with 3D animation & analytics.",
          path: "/dice",
          icon: Disc,
          accent: "border-rose-500/30 text-rose-400 bg-rose-500/5 hover:shadow-[0_0_30px_rgba(244,63,94,0.25)]",
          tag: "Polyhedral & Audio"
        },
        {
          name: "Range Randomizer & Picker",
          desc: "Pick non-duplicate range numbers or paste item lists to pick random winners.",
          path: "/random",
          icon: Hash,
          accent: "border-purple-500/30 text-purple-400 bg-purple-500/5 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]",
          tag: "List Picker & Winner"
        },
      ]
    },
    {
      title: "Developer & Code Utilities",
      subtitle: "Daily essentials for frontend, backend, and API engineering",
      tools: [
        {
          name: "JSON Formatter & TS Gen",
          desc: "Format & validate JSON schemas and auto-generate clean TypeScript interfaces.",
          path: "/json",
          icon: FileCode,
          accent: "border-emerald-500/30 text-emerald-400 bg-emerald-500/5 hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]",
          tag: "TS Interface Gen"
        },
        {
          name: "Text & Case Converter Studio",
          desc: "Convert text cases (camel, snake, kebab), count stats, and encode Base64 / URLs.",
          path: "/text",
          icon: Type,
          accent: "border-amber-500/30 text-amber-400 bg-amber-500/5 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]",
          tag: "Base64 & Cases"
        },
        {
          name: "Color & Contrast Studio",
          desc: "Convert HEX/RGB/HSL values and check WCAG AA/AAA accessibility contrast standards.",
          path: "/color",
          icon: Palette,
          accent: "border-pink-500/30 text-pink-400 bg-pink-500/5 hover:shadow-[0_0_30px_rgba(236,72,153,0.25)]",
          tag: "WCAG Accessibility"
        },
      ]
    },
    {
      title: "Converters & Financial Suite",
      subtitle: "Live currency rates, crypto prices, and scientific unit converters",
      tools: [
        {
          name: "Unit & Temp Converter",
          desc: "Instant conversion across Temperature, Length, Weight, Data Storage, Speed, and Time.",
          path: "/unit",
          icon: Thermometer,
          accent: "border-teal-500/30 text-teal-400 bg-teal-500/5 hover:shadow-[0_0_30px_rgba(20,184,166,0.25)]",
          tag: "Data & Temperature"
        },
        {
          name: "Live Fiat Currency Converter",
          desc: "Convert between 30+ world currencies (USD, EUR, GBP, INR) with live market rates.",
          path: "/currency",
          icon: Coins,
          accent: "border-green-500/30 text-green-400 bg-green-500/5 hover:shadow-[0_0_30px_rgba(34,197,94,0.25)]",
          tag: "Live FX Rates"
        },
        {
          name: "Live Crypto Currency Tracker",
          desc: "Real-time prices for BTC, ETH, SOL, BNB with instant fiat & crypto value calculators.",
          path: "/crypto",
          icon: Bitcoin,
          accent: "border-orange-500/30 text-orange-400 bg-orange-500/5 hover:shadow-[0_0_30px_rgba(249,115,22,0.25)]",
          tag: "24h Live Market"
        },
      ]
    }
  ];

  const highlights = [
    { icon: Zap, title: "Client-Side Speed", desc: "Sub-millisecond execution running natively in your browser." },
    { icon: Shield, title: "100% Zero-Tracking", desc: "No databases, cookies, or remote tracking. Total privacy." },
    { icon: Cpu, title: "Web Crypto Standards", desc: "Uses browser native window.crypto for military-grade randomness." },
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-white pt-24 pb-24 px-4 sm:px-6 overflow-hidden">
      
      {/* Background Glow — pointer-events-none so no layout cost */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-indigo-600/8 rounded-full blur-[120px] pointer-events-none -z-10" />

      <main className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Hero Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md mb-8 animate-slide-up">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">
            10 Production-Grade Developer & Utility Tools
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-center tracking-tight mb-6 bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent leading-[1.1]">
          The Ultimate <br className="hidden sm:block" /> OmniToolbox Hub
        </h1>

        <p className="text-slate-400 text-center max-w-2xl text-base sm:text-lg mb-10 leading-relaxed">
          A high-performance suite of security generators, developer converters, real-time FX & crypto trackers, and decision tools.
        </p>

        {/* Hero Search Shortcut Button */}
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("toggle-command-palette"))}
          className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 text-slate-400 hover:text-white transition-all shadow-xl max-w-md w-full justify-between group mb-20 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Quick search all tools...</span>
          </div>
          <kbd className="px-2.5 py-1 rounded-lg bg-slate-800 text-xs font-mono border border-slate-700 text-indigo-300">
            Cmd + K
          </kbd>
        </button>

        {/* Categorized Tools Grid */}
        <div className="w-full space-y-16 mb-24">
          {toolCategories.map((category, catIdx) => (
            <div key={catIdx} className="space-y-6">
              
              <div className="border-b border-slate-800/80 pb-4">
                <h2 className="text-2xl font-bold text-white tracking-tight">{category.title}</h2>
                <p className="text-slate-400 text-sm mt-1">{category.subtitle}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.tools.map((tool, toolIdx) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={toolIdx}
                      href={tool.path}
                      className="group block outline-none"
                    >
                      <div
                        className={`p-6 rounded-3xl border bg-slate-900/80 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between h-full ${tool.accent}`}
                      >
                        <div>
                          <div className="flex items-start justify-between mb-6">
                            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/50 group-hover:scale-110 transition-transform duration-300">
                              <Icon className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                              {tool.tag}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-200 transition-colors">
                            {tool.name}
                          </h3>

                          <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            {tool.desc}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mt-auto group-hover:translate-x-1 transition-transform">
                          <span>Launch Tool</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

        {/* Feature Highlights Banner */}
        <div className="w-full pt-12 border-t border-slate-800/80">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex flex-col items-center text-center p-6 rounded-3xl bg-slate-900/30 border border-slate-800/60">
                  <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

      </main>
    </div>
  );
}
