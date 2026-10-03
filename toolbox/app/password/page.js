"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Lock, RefreshCw, ArrowLeft, Copy, ShieldAlert, KeyRound, SlidersHorizontal, Check } from "lucide-react";
import Link from "next/link";
import { useToast } from "../components/ToastContext";
import { saveToHistory } from "../components/HistoryDrawer";

const WORD_LIST = [
  "orbit", "galaxy", "quantum", "cipher", "matrix", "shield", "nexus", "vector",
  "zenith", "vertex", "horizon", "beacon", "catalyst", "dynamo", "eclipse", "falcon",
  "glacier", "hyper", "impulse", "jaguar", "kinetic", "lunar", "magnet", "nebula",
  "omni", "pulsar", "radar", "solaris", "titan", "velocity", "vortex", "zenon"
];

export default function PasswordPage() {
  const [mode, setMode] = useState("password"); // "password" or "passphrase"
  const [length, setLength] = useState(16);
  const [wordCount, setWordCount] = useState(4);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const { addToast } = useToast();

  const generatePassword = useCallback((isManual = false) => {
    if (mode === "passphrase") {
      let chosenWords = [];
      const randomValues = new Uint32Array(wordCount);
      window.crypto.getRandomValues(randomValues);
      for (let i = 0; i < wordCount; i++) {
        const word = WORD_LIST[randomValues[i] % WORD_LIST.length];
        chosenWords.push(word);
      }
      const pass = chosenWords.join("-");
      setPassword(pass);
      if (isManual) {
        saveToHistory({ tool: "Password", val: pass, detail: `${wordCount} Words Passphrase` });
      }
      return;
    }

    let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lower = "abcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (excludeAmbiguous) {
      upper = upper.replace(/[IO]/g, "");
      lower = lower.replace(/[il]/g, "");
      numbers = numbers.replace(/[01]/g, "");
    }

    let charset = "";
    if (useUpper) charset += upper;
    if (useLower) charset += lower;
    if (useNumbers) charset += numbers;
    if (useSymbols) charset += symbols;

    if (!charset) {
      if (isManual) addToast("Please select at least one character type!", "error");
      return;
    }

    const randomBuffer = new Uint32Array(length);
    window.crypto.getRandomValues(randomBuffer);

    let result = "";
    for (let i = 0; i < length; i++) {
      result += charset[randomBuffer[i] % charset.length];
    }

    setPassword(result);
    if (isManual) {
      saveToHistory({ tool: "Password", val: result, detail: `${length} Chars (${mode})` });
    }
  // NOTE: addToast is intentionally excluded — it is stable (useCallback with [] deps)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, length, wordCount, useUpper, useLower, useNumbers, useSymbols, excludeAmbiguous]);

  // Auto-regenerate when any generator setting changes (use primitives, NOT the function ref)
  useEffect(() => {
    generatePassword(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, length, wordCount, useUpper, useLower, useNumbers, useSymbols, excludeAmbiguous]);

  // Calculate NIST entropy (bits)
  const calculateEntropy = () => {
    if (!password) return 0;
    if (mode === "passphrase") {
      return Math.round(wordCount * Math.log2(WORD_LIST.length));
    }
    let pool = 0;
    if (useUpper) pool += 26;
    if (useLower) pool += 26;
    if (useNumbers) pool += 10;
    if (useSymbols) pool += 26;
    return Math.round(length * Math.log2(pool || 1));
  };

  const entropy = calculateEntropy();

  const getStrengthLabel = () => {
    if (entropy < 35) return { label: "Weak", color: "bg-rose-500 text-rose-400", width: "w-1/4" };
    if (entropy < 60) return { label: "Fair", color: "bg-amber-500 text-amber-400", width: "w-2/4" };
    if (entropy < 90) return { label: "Strong", color: "bg-emerald-500 text-emerald-400", width: "w-3/4" };
    return { label: "Unbreakable", color: "bg-cyan-400 text-cyan-300", width: "w-full" };
  };

  const strength = getStrengthLabel();

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    addToast("Password copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-4 pt-24 pb-16 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

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
              <div className="p-3 bg-cyan-500/15 rounded-2xl border border-cyan-500/30 text-cyan-400">
                <Lock size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Password Architect Pro</h1>
                <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                  Web-Crypto random passwords & passphrases
                </p>
              </div>
            </div>

            {/* Mode Selector */}
            <div className="flex p-1 rounded-xl bg-slate-950 border border-slate-800">
              <button
                onClick={() => setMode("password")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  mode === "password" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30" : "text-slate-400"
                }`}
              >
                Password
              </button>
              <button
                onClick={() => setMode("passphrase")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  mode === "passphrase" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30" : "text-slate-400"
                }`}
              >
                Passphrase
              </button>
            </div>
          </div>

          {/* Password Output Field */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider">
              <span>Generated {mode}</span>
              <span className={strength.color.split(" ")[1]}>
                {entropy} Bits of Entropy ({strength.label})
              </span>
            </div>

            <div className="relative w-full p-4 sm:p-5 rounded-2xl border border-slate-700 bg-slate-950 flex items-center justify-between gap-3 overflow-hidden group">
              <span className="font-mono text-xl sm:text-2xl font-bold tracking-wider text-cyan-300 select-all break-all pr-12">
                {password}
              </span>

              <button
                onClick={handleCopy}
                className="p-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white transition-all active:scale-95 shrink-0 shadow-lg shadow-cyan-500/25 cursor-pointer"
                title="Copy to clipboard"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>

            {/* Strength Bar */}
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className={`h-full ${strength.color.split(" ")[0]} ${strength.width} transition-all duration-300`} />
            </div>
          </div>

          {/* Controls Section */}
          <div className="space-y-6 pt-4 border-t border-slate-800/80">
            <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm">
              <SlidersHorizontal size={16} className="text-cyan-400" />
              <span>Generator Configuration</span>
            </div>

            {mode === "password" ? (
              <div className="space-y-6">
                {/* Length Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-400">Length</span>
                    <span className="text-cyan-400 font-bold font-mono text-sm">{length} characters</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="64"
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>

                {/* Character Toggles Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Uppercase (A-Z)", state: useUpper, set: setUseUpper },
                    { label: "Lowercase (a-z)", state: useLower, set: setUseLower },
                    { label: "Numbers (0-9)", state: useNumbers, set: setUseNumbers },
                    { label: "Symbols (!@#$)", state: useSymbols, set: setUseSymbols },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => item.set(!item.state)}
                      className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                        item.state
                          ? "bg-slate-800 border-cyan-500/40 text-cyan-200"
                          : "bg-slate-950/60 border-slate-800 text-slate-500 hover:text-slate-400"
                      }`}
                    >
                      <span>{item.label}</span>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${item.state ? "bg-cyan-500 border-cyan-400" : "border-slate-700"}`}>
                        {item.state && <Check size={12} className="text-slate-950 font-bold" />}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Exclude Ambiguous Checkbox */}
                <button
                  onClick={() => setExcludeAmbiguous(!excludeAmbiguous)}
                  className={`w-full p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    excludeAmbiguous ? "bg-slate-800 border-cyan-500/40 text-cyan-200" : "bg-slate-950/60 border-slate-800 text-slate-500"
                  }`}
                >
                  <span>Exclude Ambiguous (I, l, 1, O, 0)</span>
                  <div className={`w-4 h-4 rounded border flex items-center justify-center ${excludeAmbiguous ? "bg-cyan-500 border-cyan-400" : "border-slate-700"}`}>
                    {excludeAmbiguous && <Check size={12} className="text-slate-950 font-bold" />}
                  </div>
                </button>
              </div>
            ) : (
              /* Passphrase Words Slider */
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-400">Word Count</span>
                  <span className="text-cyan-400 font-bold font-mono text-sm">{wordCount} Words</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="8"
                  value={wordCount}
                  onChange={(e) => setWordCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
            )}
          </div>

          {/* Regenerate Button */}
          <button
            onClick={() => generatePassword(true)}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-cyan-600 hover:bg-cyan-500 active:scale-[0.98] transition-all font-bold text-white text-base shadow-xl shadow-cyan-600/25 cursor-pointer"
          >
            <RefreshCw size={18} />
            Generate New {mode === "password" ? "Password" : "Passphrase"}
          </button>
        </div>
      </div>
    </div>
  );
}
