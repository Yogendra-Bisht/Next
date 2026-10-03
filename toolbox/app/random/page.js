"use client";
import React, { useState } from "react";
import { ArrowLeft, Hash, Shuffle, Trophy, Copy, Check, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useToast } from "../components/ToastContext";
import { saveToHistory } from "../components/HistoryDrawer";

export default function RandomizerPage() {
  const [tab, setTab] = useState("range"); // "range" or "list"
  
  // Range State
  const [minVal, setMinVal] = useState(1);
  const [maxVal, setMaxVal] = useState(100);
  const [count, setCount] = useState(1);
  const [allowDuplicates, setAllowDuplicates] = useState(false);
  const [results, setResults] = useState([]);

  // List State
  const [rawList, setRawList] = useState("Alpha\nBeta\nGamma\nDelta\nEpsilon");
  const [winner, setWinner] = useState("");
  const [shuffledList, setShuffledList] = useState([]);
  const [copied, setCopied] = useState(false);

  const { addToast } = useToast();

  const handleRangeGenerate = () => {
    const min = Math.ceil(Number(minVal));
    const max = Math.floor(Number(maxVal));

    if (isNaN(min) || isNaN(max) || min >= max) {
      addToast("Min value must be strictly smaller than Max!", "error");
      return;
    }

    const rangeSize = max - min + 1;
    if (!allowDuplicates && count > rangeSize) {
      addToast(`Cannot pick ${count} unique numbers from range size of ${rangeSize}`, "error");
      return;
    }

    const generated = [];
    const used = new Set();

    while (generated.length < count) {
      const buffer = new Uint32Array(1);
      window.crypto.getRandomValues(buffer);
      const val = min + (buffer[0] % rangeSize);

      if (allowDuplicates) {
        generated.push(val);
      } else if (!used.has(val)) {
        used.add(val);
        generated.push(val);
      }
    }

    setResults(generated);
    saveToHistory({
      tool: "Randomizer",
      val: generated.join(", "),
      detail: `Range ${min} - ${max} (${count} items)`,
    });
    addToast("Generated random numbers!");
  };

  const handleListWinner = () => {
    const items = rawList
      .split("\n")
      .map((i) => i.trim())
      .filter(Boolean);

    if (items.length < 2) {
      addToast("Please enter at least 2 items in the list!", "error");
      return;
    }

    const buffer = new Uint32Array(1);
    window.crypto.getRandomValues(buffer);
    const index = buffer[0] % items.length;
    const picked = items[index];

    setWinner(picked);
    saveToHistory({
      tool: "Winner Picker",
      val: picked,
      detail: `Picked from ${items.length} items`,
    });
    addToast(`Winner picked: ${picked}`);
  };

  const handleListShuffle = () => {
    const items = rawList
      .split("\n")
      .map((i) => i.trim())
      .filter(Boolean);

    if (items.length < 2) {
      addToast("Please enter at least 2 items in the list!", "error");
      return;
    }

    // Fisher-Yates Shuffle with Crypto RNG
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const buffer = new Uint32Array(1);
      window.crypto.getRandomValues(buffer);
      const j = buffer[0] % (i + 1);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setShuffledList(shuffled);
    saveToHistory({
      tool: "List Shuffle",
      val: shuffled.join(", "),
      detail: `Shuffled ${items.length} items`,
    });
    addToast("List shuffled!");
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    addToast("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-4 pt-24 pb-16 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="relative w-full max-w-xl">
        
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/15 rounded-2xl border border-purple-500/30 text-purple-400">
                <Hash size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Randomizer & Decision Tool</h1>
                <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                  Range generator & list winner picker
                </p>
              </div>
            </div>

            {/* Mode Selector */}
            <div className="flex p-1 rounded-xl bg-slate-950 border border-slate-800">
              <button
                onClick={() => setTab("range")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  tab === "range" ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" : "text-slate-400"
                }`}
              >
                Range RNG
              </button>
              <button
                onClick={() => setTab("list")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  tab === "list" ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" : "text-slate-400"
                }`}
              >
                List Picker
              </button>
            </div>
          </div>

          {tab === "range" ? (
            /* Range Randomizer Tab */
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Min Value
                  </label>
                  <input
                    type="number"
                    value={minVal}
                    onChange={(e) => setMinVal(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-mono text-center font-bold text-xl focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Max Value
                  </label>
                  <input
                    type="number"
                    value={maxVal}
                    onChange={(e) => setMaxVal(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-mono text-center font-bold text-xl focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Quantity ({count} numbers)
                </span>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="w-48 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
                />
              </div>

              {/* Duplicate Toggle */}
              <button
                onClick={() => setAllowDuplicates(!allowDuplicates)}
                className={`w-full p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                  allowDuplicates ? "bg-slate-800 border-purple-500/40 text-purple-200" : "bg-slate-950/60 border-slate-800 text-slate-500"
                }`}
              >
                <span>Allow Duplicate Numbers</span>
                <div className={`w-4 h-4 rounded border flex items-center justify-center ${allowDuplicates ? "bg-purple-500 border-purple-400" : "border-slate-700"}`}>
                  {allowDuplicates && <Check size={12} className="text-slate-950 font-bold" />}
                </div>
              </button>

              {/* Results Display */}
              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950 text-center min-h-[120px] flex items-center justify-center">
                {results.length > 0 ? (
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {results.map((n, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/30 font-mono text-3xl font-black text-purple-300"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-slate-600 text-sm font-semibold">Click Randomize to generate</span>
                )}
              </div>

              <button
                onClick={handleRangeGenerate}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-purple-600 hover:bg-purple-500 active:scale-[0.98] transition-all font-bold text-white text-base shadow-xl shadow-purple-600/25 cursor-pointer"
              >
                <Shuffle size={18} />
                Randomize Numbers
              </button>
            </div>
          ) : (
            /* List Decision Tab */
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  List Items (One per line)
                </label>
                <textarea
                  rows={4}
                  value={rawList}
                  onChange={(e) => setRawList(e.target.value)}
                  className="w-full p-4 rounded-xl border border-slate-700 bg-slate-950 text-white font-mono text-sm focus:outline-none focus:border-purple-500"
                  placeholder="Enter items..."
                />
              </div>

              {winner && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Trophy className="w-6 h-6 text-amber-400" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-400">Winner Picked</span>
                      <p className="font-bold text-lg text-white">{winner}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(winner)}
                    className="p-2 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              )}

              {shuffledList.length > 0 && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-xs text-slate-400 font-semibold">Shuffled Result:</span>
                  <p className="font-mono text-sm text-purple-300">{shuffledList.join(" ➔ ")}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleListWinner}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-white text-sm shadow-lg shadow-purple-600/20 cursor-pointer"
                >
                  <Trophy size={16} />
                  Pick Winner
                </button>
                <button
                  onClick={handleListShuffle}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-slate-200 text-sm cursor-pointer"
                >
                  <Shuffle size={16} />
                  Shuffle List
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
