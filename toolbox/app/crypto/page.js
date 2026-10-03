"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft, Bitcoin, ArrowRightLeft, Copy, Check, RefreshCw, TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";
import { useToast } from "../components/ToastContext";
import { saveToHistory } from "../components/HistoryDrawer";

const FALLBACK_CRYPTO = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin", priceUsd: 64250, change24h: 2.4 },
  { id: "ethereum", symbol: "ETH", name: "Ethereum", priceUsd: 3450, change24h: 1.8 },
  { id: "solana", symbol: "SOL", name: "Solana", priceUsd: 145, change24h: 5.2 },
  { id: "binancecoin", symbol: "BNB", name: "BNB", priceUsd: 580, change24h: -0.8 },
  { id: "ripple", symbol: "XRP", name: "XRP", priceUsd: 0.58, change24h: 0.4 },
  { id: "cardano", symbol: "ADA", name: "Cardano", priceUsd: 0.42, change24h: -1.2 },
  { id: "dogecoin", symbol: "DOGE", name: "Dogecoin", priceUsd: 0.12, change24h: 3.1 },
];

export default function CryptoPage() {
  const [coins, setCoins] = useState(FALLBACK_CRYPTO);
  const [selectedCoin, setSelectedCoin] = useState(FALLBACK_CRYPTO[0]);
  const [cryptoAmount, setCryptoAmount] = useState(1);
  const [targetFiat, setTargetFiat] = useState("USD"); // "USD" or "EUR" or "INR"
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const { addToast } = useToast();

  const fetchLiveCrypto = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,binancecoin,ripple,cardano,dogecoin&sparkline=false");
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const formatted = data.map((c) => ({
          id: c.id,
          symbol: c.symbol.toUpperCase(),
          name: c.name,
          priceUsd: c.current_price,
          change24h: c.price_change_percentage_24h || 0,
        }));
        setCoins(formatted);
        setSelectedCoin(formatted[0]);
        addToast("Updated live crypto market prices!");
      }
    } catch {
      addToast("Using offline crypto market snapshot", "info");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveCrypto();
  }, []);

  const numAmount = Number(cryptoAmount) || 0;
  const fiatMultipliers = { USD: 1, EUR: 0.92, INR: 83.5 };
  const totalValue = numAmount * selectedCoin.priceUsd * (fiatMultipliers[targetFiat] || 1);

  const formattedValue = totalValue.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleCopy = () => {
    const text = `${cryptoAmount} ${selectedCoin.symbol} = ${targetFiat === "INR" ? "₹" : "$"} ${formattedValue} ${targetFiat}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    saveToHistory({ tool: "Crypto Tracker", val: text, detail: `${selectedCoin.name} Live Rate` });
    addToast("Copied crypto value!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-4 pt-24 pb-16 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

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
              <div className="p-3 bg-orange-500/15 rounded-2xl border border-orange-500/30 text-orange-400">
                <Bitcoin size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Live Crypto Tracker</h1>
                <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                  Real-time prices & crypto-to-fiat converter
                </p>
              </div>
            </div>

            <button
              onClick={fetchLiveCrypto}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-orange-400 transition-colors"
              title="Refresh Live Prices"
            >
              <RefreshCw size={18} className={loading ? "animate-spin text-orange-400" : ""} />
            </button>
          </div>

          {/* Coin Select Selector Badges */}
          <div className="space-y-2">
            <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Select Cryptocurrency
            </span>
            <div className="flex flex-wrap gap-2">
              {coins.map((coin) => (
                <button
                  key={coin.symbol}
                  onClick={() => setSelectedCoin(coin)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 cursor-pointer ${
                    selectedCoin.symbol === coin.symbol
                      ? "bg-orange-600 text-white shadow-lg shadow-orange-500/25 border border-orange-400"
                      : "bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  <span>{coin.symbol}</span>
                  <span className={`text-[10px] ${coin.change24h >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    {coin.change24h >= 0 ? "+" : ""}{coin.change24h.toFixed(1)}%
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Converter Area */}
          <div className="space-y-6 pt-2 border-t border-slate-800/80">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Amount of {selectedCoin.symbol}
                </label>
                <input
                  type="number"
                  step="any"
                  value={cryptoAmount}
                  onChange={(e) => setCryptoAmount(e.target.value)}
                  className="w-full p-4 rounded-2xl border border-slate-700 bg-slate-950 font-mono text-xl font-bold text-white text-center focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Target Fiat Currency
                </label>
                <div className="flex gap-1.5 p-1 rounded-2xl bg-slate-950 border border-slate-700 h-[60px] items-center">
                  {["USD", "EUR", "INR"].map((fiat) => (
                    <button
                      key={fiat}
                      onClick={() => setTargetFiat(fiat)}
                      className={`flex-1 h-full rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                        targetFiat === fiat
                          ? "bg-orange-600 text-white shadow-md"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {fiat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated Card */}
            <div className="p-6 rounded-2xl border border-orange-500/30 bg-orange-950/20 text-center space-y-2">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Estimated Fiat Value</span>
              <p className="font-mono text-4xl font-black text-orange-300">
                {targetFiat === "INR" ? "₹" : targetFiat === "EUR" ? "€" : "$"}{formattedValue}
              </p>
              <p className="text-xs text-slate-500 font-mono">
                1 {selectedCoin.symbol} = ${selectedCoin.priceUsd.toLocaleString()} USD
              </p>
            </div>

            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-orange-600 hover:bg-orange-500 font-bold text-white text-base shadow-xl shadow-orange-600/25 cursor-pointer"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              Copy Calculated Crypto Value
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
