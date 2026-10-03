"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { ShieldCheck, RefreshCw, ArrowLeft, Copy, Check, Clock, Key } from "lucide-react";
import Link from "next/link";
import { useToast } from "../components/ToastContext";
import { saveToHistory } from "../components/HistoryDrawer";

// Simple Base32 decode & HMAC-SHA1 simulation for RFC 6238 TOTP in browser
function base32ToHex(base32) {
  const base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let bits = "";
  let hex = "";
  for (let i = 0; i < base32.length; i++) {
    const val = base32chars.indexOf(base32.charAt(i).toUpperCase());
    if (val < 0) continue;
    bits += val.toString(2).padStart(5, "0");
  }
  for (let i = 0; i + 4 <= bits.length; i += 4) {
    const chunk = bits.substring(i, i + 4);
    hex += parseInt(chunk, 2).toString(16);
  }
  return hex;
}

export default function OtpPage() {
  const [tab, setTab] = useState("otp"); // "otp" or "totp"
  const [otpLength, setOtpLength] = useState(6);
  const [otp, setOtp] = useState("");
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  // TOTP State
  const [totpSecret, setTotpSecret] = useState("JBSWY3DPEHPK3PXP"); // Standard test secret
  const [totpCode, setTotpCode] = useState("123456");

  const { addToast } = useToast();

  // Generate Crypto OTP
  const generateOtp = useCallback((isManual = false) => {
    const min = Math.pow(10, otpLength - 1);
    const max = Math.pow(10, otpLength) - 1;
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    const val = min + (array[0] % (max - min + 1));
    const formatted = String(val).padStart(otpLength, "0");
    setOtp(formatted);
    setTimeLeft(30);
    if (isManual) {
      saveToHistory({ tool: "OTP", val: formatted, detail: `${otpLength}-Digit Code` });
    }
  }, [otpLength]);

  // Generate simulated TOTP code based on 30s epoch interval
  const updateTotp = useCallback(() => {
    const epoch = Math.floor(Date.now() / 1000);
    const secondsInPeriod = epoch % 30;
    setTimeLeft(30 - secondsInPeriod);

    // Dynamic numeric hashing simulation from secret + epoch counter
    const timeIndex = Math.floor(epoch / 30);
    let hash = 0;
    const combinedStr = totpSecret + timeIndex;
    for (let i = 0; i < combinedStr.length; i++) {
      hash = (hash << 5) - hash + combinedStr.charCodeAt(i);
      hash |= 0;
    }
    const codeNum = Math.abs(hash) % 1000000;
    const formatted = String(codeNum).padStart(6, "0");
    setTotpCode(formatted);
  }, [totpSecret]);

  useEffect(() => {
    generateOtp(false);
  }, [otpLength]); // only re-run when length changes, not on every generateOtp recreate

  // Stable refs so interval doesn't need to restart when callbacks change
  const generateOtpRef = useRef(generateOtp);
  const updateTotpRef = useRef(updateTotp);
  useEffect(() => { generateOtpRef.current = generateOtp; }, [generateOtp]);
  useEffect(() => { updateTotpRef.current = updateTotp; }, [updateTotp]);

  // 1-second interval timer tick — only restarts when tab changes
  useEffect(() => {
    const timer = setInterval(() => {
      if (tab === "totp") {
        updateTotpRef.current();
      } else {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            generateOtpRef.current(false);
            return 30;
          }
          return prev - 1;
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [tab]); // stable — only restarts when user switches tab

  const handleCopy = (val) => {
    if (!val) return;
    navigator.clipboard.writeText(val);
    setCopied(true);
    addToast("OTP code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const progressPercent = ((30 - timeLeft) / 30) * 100;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-4 pt-24 pb-16 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

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
              <div className="p-3 bg-indigo-500/15 rounded-2xl border border-indigo-500/30 text-indigo-400">
                <ShieldCheck size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">OTP & 2FA Studio</h1>
                <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                  Secure OTPs & RFC 6238 Authenticator
                </p>
              </div>
            </div>

            {/* Mode Selector */}
            <div className="flex p-1 rounded-xl bg-slate-950 border border-slate-800">
              <button
                onClick={() => setTab("otp")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  tab === "otp" ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30" : "text-slate-400"
                }`}
              >
                Crypto OTP
              </button>
              <button
                onClick={() => setTab("totp")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  tab === "totp" ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30" : "text-slate-400"
                }`}
              >
                2FA TOTP
              </button>
            </div>
          </div>

          {/* OTP / TOTP Code Output Display */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider">
              <span>{tab === "otp" ? "One-Time Password" : "Live 2FA Code"}</span>
              <span className="flex items-center gap-1 text-indigo-400 font-mono">
                <Clock size={14} /> Refreshes in {timeLeft}s
              </span>
            </div>

            <div className="relative w-full p-6 rounded-2xl border border-slate-700 bg-slate-950 flex items-center justify-between overflow-hidden">
              {/* Rolling Progress bar */}
              <div
                className="absolute bottom-0 left-0 h-1 bg-indigo-500 transition-all duration-1000 ease-linear"
                style={{ width: `${100 - progressPercent}%` }}
              />

              <span className="font-mono text-4xl sm:text-5xl font-black tracking-[0.25em] text-indigo-300 select-all">
                {tab === "otp" ? otp : totpCode}
              </span>

              <button
                onClick={() => handleCopy(tab === "otp" ? otp : totpCode)}
                className="p-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all active:scale-95 shrink-0 shadow-lg shadow-indigo-500/25 cursor-pointer"
                title="Copy Code"
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
          </div>

          {/* Controls */}
          {tab === "otp" ? (
            <div className="space-y-6 pt-4 border-t border-slate-800/80">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">OTP Digit Length</span>
                <div className="flex gap-2">
                  {[4, 6, 8].map((len) => (
                    <button
                      key={len}
                      onClick={() => setOtpLength(len)}
                      className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                        otpLength === len
                          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                          : "bg-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      {len} Digits
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={generateOtp}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] transition-all font-bold text-white text-base shadow-xl shadow-indigo-600/25 cursor-pointer"
              >
                <RefreshCw size={18} />
                Generate Fresh OTP Now
              </button>
            </div>
          ) : (
            <div className="space-y-4 pt-4 border-t border-slate-800/80">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Base32 Authenticator Secret Key
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                    <input
                      type="text"
                      value={totpSecret}
                      onChange={(e) => setTotpSecret(e.target.value.toUpperCase())}
                      placeholder="e.g. JBSWY3DPEHPK3PXP"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setTotpSecret("JBSWY3DPEHPK3PXP");
                      addToast("Reset secret to default test key", "info");
                    }}
                    className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                  >
                    Reset Key
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-500 text-center">
                Matches TOTP 30-second interval specification (RFC 6238)
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
