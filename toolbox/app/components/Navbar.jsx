"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Terminal,
  Search,
  History,
  Menu,
  X,
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
  ChevronDown
} from "lucide-react";
import CommandPalette from "./CommandPalette";
import HistoryDrawer from "./HistoryDrawer";

const navCategories = [
  {
    name: "Security",
    links: [
      { name: "Password Architect", path: "/password", icon: Lock },
      { name: "OTP & 2FA Studio", path: "/otp", icon: ShieldCheck },
    ]
  },
  {
    name: "Randomization",
    links: [
      { name: "Virtual Dice", path: "/dice", icon: Disc },
      { name: "Range Randomizer", path: "/random", icon: Hash },
    ]
  },
  {
    name: "Developer",
    links: [
      { name: "JSON Formatter", path: "/json", icon: FileCode },
      { name: "Text & Case Studio", path: "/text", icon: Type },
      { name: "Color Studio", path: "/color", icon: Palette },
    ]
  },
  {
    name: "Converters",
    links: [
      { name: "Unit & Temp", path: "/unit", icon: Thermometer },
      { name: "Fiat Currency", path: "/currency", icon: Coins },
      { name: "Crypto Tracker", path: "/crypto", icon: Bitcoin },
    ]
  }
];

export default function Navbar() {
  const pathname = usePathname();
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleCustomToggle = () => setIsCmdPaletteOpen(true);
    window.addEventListener("toggle-command-palette", handleCustomToggle);
    return () => window.removeEventListener("toggle-command-palette", handleCustomToggle);
  }, []);

  return (
    <>
      <nav className="fixed top-0 w-full z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="p-2 bg-indigo-500/20 rounded-xl border border-indigo-500/30 group-hover:bg-indigo-500/30 transition-all shadow-[0_0_15px_rgba(99,102,241,0.2)]">
              <Terminal className="text-indigo-400" size={22} />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                OmniToolbox
              </span>
              <span className="text-[9px] font-mono text-indigo-400 uppercase tracking-widest -mt-1 font-bold">
                Dev & Utility Hub
              </span>
            </div>
          </Link>

          {/* Nav Links Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                pathname === "/" ? "text-indigo-400 bg-indigo-500/10 border border-indigo-500/20" : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Home
            </Link>

            {navCategories.map((cat) => {
              const isCatActive = cat.links.some((l) => l.path === pathname);
              return (
                <div
                  key={cat.name}
                  className="relative group py-2"
                  onMouseEnter={() => setActiveDropdown(cat.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      isCatActive
                        ? "text-indigo-400 bg-indigo-500/10 border border-indigo-500/20"
                        : "text-slate-400 group-hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                  </button>

                  {/* Dropdown Menu */}
                  {activeDropdown === cat.name && (
                    <div className="absolute top-full left-0 w-56 p-2 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl animate-fade-in space-y-1">
                      {cat.links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.path;
                        return (
                          <Link
                            key={link.path}
                            href={link.path}
                            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                              isActive
                                ? "text-indigo-400 bg-indigo-500/15 border border-indigo-500/20"
                                : "text-slate-300 hover:text-white hover:bg-slate-800"
                            }`}
                          >
                            <Icon className="w-4 h-4 text-indigo-400 shrink-0" />
                            <span>{link.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            <Link
              href="/about"
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                pathname === "/about" ? "text-indigo-400 bg-indigo-500/10 border border-indigo-500/20" : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              About
            </Link>
          </div>

          {/* Action Bar (Search Cmd+K & History) */}
          <div className="flex items-center gap-2.5">
            {/* Command Palette Trigger */}
            <button
              onClick={() => setIsCmdPaletteOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all text-xs cursor-pointer"
            >
              <Search className="w-4 h-4 text-indigo-400" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 font-mono border border-slate-700">
                ⌘K
              </kbd>
            </button>

            {/* History Drawer Trigger */}
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-indigo-400 transition-all cursor-pointer"
              title="View Local History"
            >
              <History className="w-4 h-4" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white lg:hidden cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-slate-950 p-6 space-y-6 max-h-[85vh] overflow-y-auto animate-slide-down">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block font-semibold text-white text-base py-1"
            >
              Home
            </Link>

            {navCategories.map((cat) => (
              <div key={cat.name} className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                  {cat.name}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2">
                  {cat.links.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.path}
                        href={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 p-3 rounded-xl border text-sm font-medium ${
                          pathname === link.path
                            ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-300"
                            : "bg-slate-900/60 border-slate-800 text-slate-300 hover:text-white"
                        }`}
                      >
                        <Icon className="w-4 h-4 text-indigo-400" />
                        <span>{link.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block font-semibold text-slate-300 hover:text-white text-base py-1 border-t border-slate-800 pt-4"
            >
              About Project & Resume Info
            </Link>
          </div>
        )}
      </nav>

      {/* Global Command Palette & History Drawer Modals */}
      <CommandPalette isOpen={isCmdPaletteOpen} onClose={() => setIsCmdPaletteOpen(false)} />
      <HistoryDrawer isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />
    </>
  );
}
