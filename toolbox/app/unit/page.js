"use client";
import React, { useState } from "react";
import { ArrowLeft, Thermometer, ArrowRightLeft, Copy, Check } from "lucide-react";
import Link from "next/link";
import { useToast } from "../components/ToastContext";
import { saveToHistory } from "../components/HistoryDrawer";

const unitCategories = {
  Temperature: {
    units: ["Celsius (°C)", "Fahrenheit (°F)", "Kelvin (K)"],
    convert: (val, from, to) => {
      let c = val;
      if (from.includes("Fahrenheit")) c = (val - 32) * (5 / 9);
      if (from.includes("Kelvin")) c = val - 273.15;

      if (to.includes("Celsius")) return c;
      if (to.includes("Fahrenheit")) return c * (9 / 5) + 32;
      if (to.includes("Kelvin")) return c + 273.15;
      return val;
    }
  },
  Length: {
    units: ["Meters (m)", "Kilometers (km)", "Feet (ft)", "Inches (in)", "Miles (mi)"],
    rates: { "Meters (m)": 1, "Kilometers (km)": 0.001, "Feet (ft)": 3.28084, "Inches (in)": 39.3701, "Miles (mi)": 0.000621371 },
    convert: (val, from, to) => {
      const baseInMeters = val / unitCategories.Length.rates[from];
      return baseInMeters * unitCategories.Length.rates[to];
    }
  },
  Weight: {
    units: ["Kilograms (kg)", "Grams (g)", "Pounds (lbs)", "Ounces (oz)"],
    rates: { "Kilograms (kg)": 1, "Grams (g)": 1000, "Pounds (lbs)": 2.20462, "Ounces (oz)": 35.274 },
    convert: (val, from, to) => {
      const baseInKg = val / unitCategories.Weight.rates[from];
      return baseInKg * unitCategories.Weight.rates[to];
    }
  },
  Data: {
    units: ["Bytes (B)", "Kilobytes (KB)", "Megabytes (MB)", "Gigabytes (GB)", "Terabytes (TB)"],
    rates: { "Bytes (B)": 1, "Kilobytes (KB)": 1024, "Megabytes (MB)": 1048576, "Gigabytes (GB)": 1073741824, "Terabytes (TB)": 1099511627776 },
    convert: (val, from, to) => {
      const baseInBytes = val * unitCategories.Data.rates[from];
      return baseInBytes / unitCategories.Data.rates[to];
    }
  }
};

export default function UnitPage() {
  const [category, setCategory] = useState("Temperature");
  const [fromUnit, setFromUnit] = useState(unitCategories["Temperature"].units[0]);
  const [toUnit, setToUnit] = useState(unitCategories["Temperature"].units[1]);
  const [inputValue, setInputValue] = useState(100);
  const [copied, setCopied] = useState(false);

  const { addToast } = useToast();

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setFromUnit(unitCategories[cat].units[0]);
    setToUnit(unitCategories[cat].units[1]);
  };

  const numVal = Number(inputValue) || 0;
  const converted = unitCategories[category].convert(numVal, fromUnit, toUnit);
  const formattedConverted = Number.isInteger(converted) ? converted : Number(converted.toFixed(4));

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const handleCopy = () => {
    const text = `${inputValue} ${fromUnit} = ${formattedConverted} ${toUnit}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    saveToHistory({ tool: "Unit Converter", val: text, detail: category });
    addToast("Conversion copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-4 pt-24 pb-16 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

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
          <div className="flex items-center gap-4">
            <div className="p-3 bg-teal-500/15 rounded-2xl border border-teal-500/30 text-teal-400">
              <Thermometer size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Unit & Temp Converter</h1>
              <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                Convert Temperature, Length, Weight & Data Storage
              </p>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex p-1 rounded-xl bg-slate-950 border border-slate-800 overflow-x-auto">
            {Object.keys(unitCategories).map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  category === cat ? "bg-teal-500/20 text-teal-300 border border-teal-500/30" : "text-slate-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Conversion Inputs */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              
              {/* From Unit */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">From</label>
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-700 bg-slate-950 text-white font-mono text-sm focus:outline-none"
                >
                  {unitCategories[category].units.map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-slate-700 bg-slate-950 font-mono text-xl font-bold text-white text-center focus:outline-none"
                />
              </div>

              {/* To Unit */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">To</label>
                  <button
                    onClick={handleSwap}
                    className="p-1 rounded bg-slate-800 text-teal-400 hover:text-white"
                    title="Swap Units"
                  >
                    <ArrowRightLeft size={14} />
                  </button>
                </div>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-700 bg-slate-950 text-white font-mono text-sm focus:outline-none"
                >
                  {unitCategories[category].units.map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
                <div className="w-full p-3.5 rounded-xl border border-teal-500/40 bg-teal-950/40 font-mono text-xl font-bold text-teal-300 text-center select-all">
                  {formattedConverted}
                </div>
              </div>

            </div>

            {/* Formula display & Copy */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="font-mono text-xs text-slate-300">
                {inputValue} {fromUnit} = <span className="text-teal-300 font-bold">{formattedConverted} {toUnit}</span>
              </span>
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white transition-colors cursor-pointer"
                title="Copy Result"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
