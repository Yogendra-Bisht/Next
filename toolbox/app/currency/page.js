"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft, Coins, ArrowRightLeft, Copy, Check, RefreshCw, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useToast } from "../components/ToastContext";
import { saveToHistory } from "../components/HistoryDrawer";

// Fallback rates if offline or API is down
const FALLBACK_RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.5,
  JPY: 155.2,
  CAD: 1.36,
  AUD: 1.51,
  CHF: 0.90,
  SGD: 1.35,
  CNY: 7.23,
  AED: 3.67,
  SAR: 3.75,
};

export default function CurrencyPage() {
  const [rates, setRates] = useState(FALLBACK_RATES);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [amount, setAmount] = useState(100);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");

  const { addToast } = useToast();

  const fetchLiveRates = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://open.er-api.com/v6/latest/USD");
      const data = await res.json();
      if (data && data.rates) {
        setRates(data.rates);
        setLastUpdated(new Date().toLocaleTimeString());
        addToast("Updated live currency exchange rates!");
      }
    } catch {
      addToast("Using cached offline exchange rates", "info");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveRates();
  }, []);

  const numAmount = Number(amount) || 0;
  const rateFrom = rates[fromCurrency] || 1;
  const rateTo = rates[toCurrency] || 1;

  // Amount in USD = numAmount / rateFrom
  // Amount in Target = (numAmount / rateFrom) * rateTo
  const converted = (numAmount / rateFrom) * rateTo;
  const formattedConverted = converted.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleCopy = () => {
    const text = `${amount} ${fromCurrency} = ${formattedConverted} ${toCurrency}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    saveToHistory({ tool: "Currency Converter", val: text, detail: "Live FX Conversion" });
    addToast("Copied conversion!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-4 pt-24 pb-16 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

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
              <div className="p-3 bg-green-500/15 rounded-2xl border border-green-500/30 text-green-400">
                <Coins size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Live Fiat Currency Converter</h1>
                <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                  Real-time FX rates for 30+ world currencies
                </p>
              </div>
            </div>

            <button
              onClick={fetchLiveRates}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-green-400 transition-colors"
              title="Refresh Live Rates"
            >
              <RefreshCw size={18} className={loading ? "animate-spin text-green-400" : ""} />
            </button>
          </div>

          {/* Conversion Controls */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-4 rounded-2xl border border-slate-700 bg-slate-950 font-mono text-2xl font-bold text-white text-center focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              
              {/* From Currency */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">From Currency</label>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-mono text-sm font-bold focus:outline-none"
                >
                  {Object.keys(rates).map((code) => (
                    <option key={code} value={code}>{code}</option>
                  ))}
                </select>
              </div>

              {/* To Currency */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">To Currency</label>
                  <button
                    onClick={handleSwap}
                    className="p-1 rounded bg-slate-800 text-green-400 hover:text-white"
                    title="Swap Currencies"
                  >
                    <ArrowRightLeft size={14} />
                  </button>
                </div>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-mono text-sm font-bold focus:outline-none"
                >
                  {Object.keys(rates).map((code) => (
                    <option key={code} value={code}>{code}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Output Display Box */}
            <div className="p-6 rounded-2xl border border-green-500/30 bg-green-950/20 text-center space-y-2">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Converted Value</span>
              <p className="font-mono text-4xl font-black text-green-300">
                {formattedConverted} <span className="text-2xl font-bold text-green-400">{toCurrency}</span>
              </p>
              <p className="text-xs text-slate-500 font-mono">
                1 {fromCurrency} = {(rateTo / rateFrom).toFixed(4)} {toCurrency}
              </p>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-green-600 hover:bg-green-500 font-bold text-white text-base shadow-xl shadow-green-600/25 cursor-pointer"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              Copy Conversion Result
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
