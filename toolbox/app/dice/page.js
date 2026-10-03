"use client";
import React, { useState } from "react";
import { ArrowLeft, Disc, Volume2, VolumeX, RotateCw } from "lucide-react";
import Link from "next/link";
import { useToast } from "../components/ToastContext";
import { saveToHistory } from "../components/HistoryDrawer";

const diceTypes = [
  { name: "d4", max: 4 },
  { name: "d6", max: 6 },
  { name: "d8", max: 8 },
  { name: "d10", max: 10 },
  { name: "d12", max: 12 },
  { name: "d20", max: 20 },
  { name: "d100", max: 100 },
];

export default function DicePage() {
  const [selectedType, setSelectedType] = useState(diceTypes[1]); // d6
  const [diceCount, setDiceCount] = useState(2);
  const [rolls, setRolls] = useState([]);
  const [isRolling, setIsRolling] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const { addToast } = useToast();

  const playRollSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch {
      // Audio fallback silent
    }
  };

  const handleRoll = () => {
    setIsRolling(true);
    playRollSound();

    setTimeout(() => {
      const newRolls = [];
      const array = new Uint32Array(diceCount);
      window.crypto.getRandomValues(array);

      for (let i = 0; i < diceCount; i++) {
        const val = (array[i] % selectedType.max) + 1;
        newRolls.push(val);
      }

      setRolls(newRolls);
      setIsRolling(false);

      const sum = newRolls.reduce((a, b) => a + b, 0);
      saveToHistory({
        tool: "Dice",
        val: `${newRolls.join(", ")} (Sum: ${sum})`,
        detail: `${diceCount}x ${selectedType.name}`,
      });
      addToast(`Rolled Total: ${sum}`);
    }, 400);
  };

  const sum = rolls.reduce((a, b) => a + b, 0);
  const maxRoll = rolls.length > 0 ? Math.max(...rolls) : 0;
  const minRoll = rolls.length > 0 ? Math.min(...rolls) : 0;
  const avgRoll = rolls.length > 0 ? (sum / rolls.length).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-4 pt-24 pb-16 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

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
              <div className="p-3 bg-rose-500/15 rounded-2xl border border-rose-500/30 text-rose-400">
                <Disc size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Multi-Dice & Physics Roller</h1>
                <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                  Polyhedral dice simulator (d4 to d100)
                </p>
              </div>
            </div>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
              title="Toggle Audio Feedback"
            >
              {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
          </div>

          {/* Dice Type & Count Controls */}
          <div className="space-y-4 pt-2">
            <div>
              <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Dice Type
              </span>
              <div className="flex flex-wrap gap-2">
                {diceTypes.map((type) => (
                  <button
                    key={type.name}
                    onClick={() => setSelectedType(type)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                      selectedType.name === type.name
                        ? "bg-rose-600 text-white shadow-lg shadow-rose-500/25 border border-rose-400"
                        : "bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Dice Quantity
              </span>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <button
                    key={num}
                    onClick={() => setDiceCount(num)}
                    className={`w-8 h-8 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                      diceCount === num
                        ? "bg-rose-600 text-white shadow-lg shadow-rose-500/20"
                        : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Dice Roller Grid */}
          <div className="space-y-6">
            <div className="min-h-[140px] p-6 rounded-2xl border border-slate-800 bg-slate-950/80 flex flex-wrap items-center justify-center gap-4">
              {rolls.length > 0 ? (
                rolls.map((val, idx) => (
                  <div
                    key={idx}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-rose-950 to-slate-950 border-2 border-rose-500/40 shadow-[0_0_25px_rgba(244,63,94,0.2)] flex items-center justify-center font-mono text-2xl sm:text-3xl font-black text-rose-300 ${
                      isRolling ? "animate-spin-slow scale-90 opacity-50" : "animate-bounce"
                    }`}
                  >
                    {val}
                  </div>
                ))
              ) : (
                <div className="text-center text-slate-600 py-6">
                  <p className="text-sm font-semibold">Ready to roll!</p>
                  <p className="text-xs text-slate-700 mt-0.5">Click the button below to roll {diceCount}x {selectedType.name}</p>
                </div>
              )}
            </div>

            {/* Analytics Box */}
            {rolls.length > 0 && (
              <div className="grid grid-cols-4 gap-2 text-center p-4 rounded-2xl bg-slate-950 border border-slate-800/80">
                <div>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase">Total Sum</span>
                  <span className="font-mono text-lg font-extrabold text-rose-400">{sum}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase">Average</span>
                  <span className="font-mono text-lg font-extrabold text-slate-300">{avgRoll}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase">Highest</span>
                  <span className="font-mono text-lg font-extrabold text-emerald-400">{maxRoll}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase">Lowest</span>
                  <span className="font-mono text-lg font-extrabold text-amber-400">{minRoll}</span>
                </div>
              </div>
            )}
          </div>

          {/* Roll Button */}
          <button
            onClick={handleRoll}
            disabled={isRolling}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-rose-600 hover:bg-rose-500 active:scale-[0.98] transition-all font-bold text-white text-base shadow-xl shadow-rose-600/25 cursor-pointer disabled:opacity-50"
          >
            <RotateCw size={18} className={isRolling ? "animate-spin" : ""} />
            Roll {diceCount}x {selectedType.name}
          </button>

        </div>
      </div>
    </div>
  );
}
