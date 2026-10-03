"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
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
  Info,
  ArrowRight,
  X
} from "lucide-react";

export const toolsList = [
  { name: "Password Architect", desc: "Generate cryptographically secure passwords & passphrases", path: "/password", icon: Lock, category: "Security", color: "text-cyan-400 bg-cyan-500/10" },
  { name: "OTP & 2FA Studio", desc: "Generate secure OTPs and simulate live 2FA TOTP authenticators", path: "/otp", icon: ShieldCheck, category: "Security", color: "text-indigo-400 bg-indigo-500/10" },
  { name: "Virtual Dice", desc: "Multi-dice physics roller for d4, d6, d8, d10, d12, d20, d100", path: "/dice", icon: Disc, category: "Randomization", color: "text-rose-400 bg-rose-500/10" },
  { name: "Range Randomizer & Picker", desc: "Fair range generator, bulk numbers & list winner picker", path: "/random", icon: Hash, category: "Randomization", color: "text-purple-400 bg-purple-500/10" },
  { name: "JSON Formatter", desc: "Format, validate JSON and generate TypeScript interfaces", path: "/json", icon: FileCode, category: "Developer", color: "text-emerald-400 bg-emerald-500/10" },
  { name: "Text & Case Studio", desc: "Case converters, reading stats, Base64 & URL encoder/decoder", path: "/text", icon: Type, category: "Developer", color: "text-amber-400 bg-amber-500/10" },
  { name: "Color Studio", desc: "HEX/RGB/HSL converter and WCAG AA/AAA contrast checker", path: "/color", icon: Palette, category: "Developer", color: "text-pink-400 bg-pink-500/10" },
  { name: "Unit & Temp Converter", desc: "Convert temperature, length, weight, data storage & time", path: "/unit", icon: Thermometer, category: "Converters", color: "text-teal-400 bg-teal-500/10" },
  { name: "Currency Converter", desc: "Real-time exchange rates for 30+ world fiat currencies", path: "/currency", icon: Coins, category: "Converters", color: "text-green-400 bg-green-500/10" },
  { name: "Crypto Tracker", desc: "Live crypto prices & instant fiat/crypto conversion", path: "/crypto", icon: Bitcoin, category: "Converters", color: "text-orange-400 bg-orange-500/10" },
  { name: "About & Tech Stack", desc: "Architecture overview, stats, and developer portfolio info", path: "/about", icon: Info, category: "General", color: "text-blue-400 bg-blue-500/10" },
];

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open command palette (parent toggles isOpen)
          window.dispatchEvent(new CustomEvent("toggle-command-palette"));
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredTools = toolsList.filter(
    (tool) =>
      tool.name.toLowerCase().includes(query.toLowerCase()) ||
      tool.desc.toLowerCase().includes(query.toLowerCase()) ||
      tool.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path) => {
    router.push(path);
    onClose();
    setQuery("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-6 py-4 border-b border-slate-800 gap-3">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a tool name or category (e.g. 'crypto', 'password', 'json')..."
            className="w-full bg-transparent text-white placeholder-slate-500 text-lg focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tools Results List */}
        <div className="p-3 overflow-y-auto max-h-[60vh] space-y-1">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.path}
                  onClick={() => handleSelect(tool.path)}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl hover:bg-slate-800/80 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2.5 rounded-xl border border-white/5 ${tool.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
                          {tool.name}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                          {tool.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{tool.desc}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>
              );
            })
          ) : (
            <div className="p-8 text-center text-slate-500">
              No matching tools found for "{query}"
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-6 py-3 border-t border-slate-800/80 bg-slate-950/50 flex items-center justify-between text-xs text-slate-500">
          <span>Navigate with click or search</span>
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-400 font-mono text-[10px]">
              ESC
            </kbd>
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
