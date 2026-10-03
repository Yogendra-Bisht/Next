"use client";
import React, { useState } from "react";
import { ArrowLeft, Palette, Copy, Check, ShieldCheck, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useToast } from "../components/ToastContext";
import { saveToHistory } from "../components/HistoryDrawer";

function hexToRgb(hex) {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex.split("").map((c) => c + c).join("");
  }
  const num = parseInt(hex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function rgbToHsl({ r, g, b }) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function getLuminance({ r, g, b }) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(hex1, hex2) {
  try {
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);
    const lum1 = getLuminance(rgb1);
    const lum2 = getLuminance(rgb2);
    const max = Math.max(lum1, lum2);
    const min = Math.min(lum1, lum2);
    return ((max + 0.05) / (min + 0.05)).toFixed(2);
  } catch {
    return 1;
  }
}

export default function ColorPage() {
  const [bgColor, setBgColor] = useState("#0f172a");
  const [textColor, setTextColor] = useState("#38bdf8");
  const [copied, setCopied] = useState(false);

  const { addToast } = useToast();

  const rgb = hexToRgb(bgColor);
  const hsl = rgbToHsl(rgb);
  const contrastRatio = getContrastRatio(bgColor, textColor);

  const passesAA = contrastRatio >= 4.5;
  const passesAAA = contrastRatio >= 7.0;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    addToast(`Copied ${text} to clipboard!`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-4 pt-24 pb-16 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="relative w-full max-w-2xl">
        
        {/* Back link */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 w-fit"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back to Hub</span>
        </Link>

        {/* Main Card */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl space-y-8">
          
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="p-3 bg-pink-500/15 rounded-2xl border border-pink-500/30 text-pink-400">
              <Palette size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Color & Accessibility Studio</h1>
              <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                HEX/RGB/HSL conversion & WCAG AA/AAA contrast check
              </p>
            </div>
          </div>

          {/* Color Pickers & Preview Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Background Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-12 h-12 rounded-xl bg-transparent border-0 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-white font-mono text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Foreground Text Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-12 h-12 rounded-xl bg-transparent border-0 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-white font-mono text-sm focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Live Contrast Preview Box */}
            <div
              className="p-6 rounded-2xl border border-slate-700 flex flex-col justify-between shadow-xl"
              style={{ backgroundColor: bgColor, color: textColor }}
            >
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-75">Live Contrast Preview</span>
                <p className="text-xl font-bold mt-2">Sample Heading Text</p>
                <p className="text-xs opacity-90 mt-1">The quick brown fox jumps over the lazy dog.</p>
              </div>

              <div className="mt-6 pt-4 border-t border-current/20 flex items-center justify-between text-xs font-mono font-bold">
                <span>Contrast: {contrastRatio}:1</span>
                <span>{passesAA ? "WCAG AA PASS" : "WCAG FAIL"}</span>
              </div>
            </div>
          </div>

          {/* Color Values & Copy Bar */}
          <div className="space-y-3 pt-2">
            <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Converted Formats
            </span>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleCopy(bgColor)}
                className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-pink-500/40 text-left transition-all group"
              >
                <span className="block text-[10px] text-slate-500 font-bold uppercase">HEX</span>
                <span className="font-mono text-sm font-bold text-pink-300 group-hover:text-pink-200">{bgColor}</span>
              </button>

              <button
                onClick={() => handleCopy(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
                className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-pink-500/40 text-left transition-all group"
              >
                <span className="block text-[10px] text-slate-500 font-bold uppercase">RGB</span>
                <span className="font-mono text-sm font-bold text-pink-300 group-hover:text-pink-200">{rgb.r}, {rgb.g}, {rgb.b}</span>
              </button>

              <button
                onClick={() => handleCopy(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}
                className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-pink-500/40 text-left transition-all group"
              >
                <span className="block text-[10px] text-slate-500 font-bold uppercase">HSL</span>
                <span className="font-mono text-sm font-bold text-pink-300 group-hover:text-pink-200">{hsl.h}°, {hsl.s}%, {hsl.l}%</span>
              </button>
            </div>
          </div>

          {/* WCAG Compliance Badges */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
              WCAG 2.1 Accessibility Audit
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-xl border flex items-center gap-3 ${passesAA ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300" : "bg-rose-500/10 border-rose-500/30 text-rose-300"}`}>
                {passesAA ? <ShieldCheck size={20} /> : <ShieldAlert size={20} />}
                <div>
                  <p className="text-xs font-bold">WCAG AA Level</p>
                  <p className="text-[10px] opacity-80">{passesAA ? "Passed (>= 4.5:1)" : "Failed (< 4.5:1)"}</p>
                </div>
              </div>

              <div className={`p-3 rounded-xl border flex items-center gap-3 ${passesAAA ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300" : "bg-rose-500/10 border-rose-500/30 text-rose-300"}`}>
                {passesAAA ? <ShieldCheck size={20} /> : <ShieldAlert size={20} />}
                <div>
                  <p className="text-xs font-bold">WCAG AAA Level</p>
                  <p className="text-[10px] opacity-80">{passesAAA ? "Passed (>= 7.0:1)" : "Failed (< 7.0:1)"}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
