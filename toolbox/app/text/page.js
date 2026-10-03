"use client";
import React, { useState } from "react";
import { ArrowLeft, Type, Copy, Check, Clock, AlignLeft } from "lucide-react";
import Link from "next/link";
import { useToast } from "../components/ToastContext";
import { saveToHistory } from "../components/HistoryDrawer";

export default function TextPage() {
  const [text, setText] = useState("The quick brown fox jumps over the lazy dog");
  const [copied, setCopied] = useState(false);

  const { addToast } = useToast();

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
  const readingTime = Math.ceil(words / 200);

  const applyTransformation = (type) => {
    let result = text;
    if (type === "upper") result = text.toUpperCase();
    if (type === "lower") result = text.toLowerCase();
    if (type === "title") {
      result = text.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase());
    }
    if (type === "camel") {
      result = text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    }
    if (type === "snake") {
      result = text
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-zA-Z0-9_]/g, "");
    }
    if (type === "kebab") {
      result = text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9-]/g, "");
    }
    if (type === "constant") {
      result = text
        .toUpperCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-zA-Z0-9_]/g, "");
    }
    if (type === "base64encode") {
      try {
        result = btoa(text);
      } catch {
        addToast("Base64 encode failed", "error");
        return;
      }
    }
    if (type === "base64decode") {
      try {
        result = atob(text);
      } catch {
        addToast("Invalid Base64 string", "error");
        return;
      }
    }
    if (type === "urlencode") result = encodeURIComponent(text);
    if (type === "urldecode") result = decodeURIComponent(text);

    setText(result);
    saveToHistory({ tool: "Text Tool", val: result.slice(0, 40) + "...", detail: type.toUpperCase() });
    addToast(`Applied: ${type.toUpperCase()}`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    addToast("Text copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-4 pt-24 pb-16 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="relative w-full max-w-3xl">
        
        {/* Back link */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 w-fit"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back to Hub</span>
        </Link>

        {/* Main Card */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl space-y-6">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-500/15 rounded-2xl border border-amber-500/30 text-amber-400">
                <Type size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Text & Case Studio</h1>
                <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                  Case converters, reading stats & Base64 / URL encoders
                </p>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="p-3 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              Copy Text
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="block text-[10px] text-slate-500 font-bold uppercase">Words</span>
              <span className="font-mono text-xl font-bold text-amber-400">{words}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="block text-[10px] text-slate-500 font-bold uppercase">Chars</span>
              <span className="font-mono text-xl font-bold text-slate-300">{chars}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="block text-[10px] text-slate-500 font-bold uppercase">Sentences</span>
              <span className="font-mono text-xl font-bold text-slate-300">{sentences}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="block text-[10px] text-slate-500 font-bold uppercase">Read Time</span>
              <span className="font-mono text-xl font-bold text-indigo-400">{readingTime} min</span>
            </div>
          </div>

          {/* Text Area */}
          <textarea
            rows={7}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-4 rounded-2xl border border-slate-700 bg-slate-950 font-mono text-sm text-slate-200 focus:outline-none focus:border-amber-500"
            placeholder="Type or paste text here..."
          />

          {/* Actions Grid */}
          <div className="space-y-3">
            <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Case Conversions
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: "UPPERCASE", id: "upper" },
                { label: "lowercase", id: "lower" },
                { label: "Title Case", id: "title" },
                { label: "camelCase", id: "camel" },
                { label: "snake_case", id: "snake" },
                { label: "kebab-case", id: "kebab" },
                { label: "CONSTANT_CASE", id: "constant" },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => applyTransformation(btn.id)}
                  className="px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 text-xs font-mono font-bold text-slate-300 hover:text-amber-300 transition-all cursor-pointer"
                >
                  {btn.label}
                </button>
              ))}
            </div>

            <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider pt-2">
              Encoders & Decoders
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: "Base64 Encode", id: "base64encode" },
                { label: "Base64 Decode", id: "base64decode" },
                { label: "URL Encode", id: "urlencode" },
                { label: "URL Decode", id: "urldecode" },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => applyTransformation(btn.id)}
                  className="px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/40 text-xs font-mono font-bold text-indigo-300 hover:text-indigo-200 transition-all cursor-pointer"
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
