"use client"
import React, { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

// Dice dot layout patterns for each face (1–6)
const diceDots = {
  1: [[50, 50]],
  2: [[25, 25], [75, 75]],
  3: [[25, 25], [50, 50], [75, 75]],
  4: [[25, 25], [75, 25], [25, 75], [75, 75]],
  5: [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
  6: [[25, 22], [75, 22], [25, 50], [75, 50], [25, 78], [75, 78]],
};

const DiceFace = ({ value }) => {
  const dots = diceDots[value] || [];
  return (
    <div className="relative w-36 h-36 rounded-3xl bg-slate-950 border-2 border-rose-500/30 shadow-[0_0_40px_rgba(244,63,94,0.15)] overflow-hidden">
      <div className="absolute inset-0 bg-rose-500/5" />
      {dots.map((dot, i) => (
        <div
          key={i}
          className="absolute w-7 h-7 rounded-full bg-rose-400 shadow-[0_0_10px_rgba(251,113,133,0.6)] -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${dot[0]}%`, top: `${dot[1]}%` }}
        />
      ))}
    </div>
  );
};

const page = () => {
  const [dice, setdice] = useState(0)

  function shownum() {
    let num = Math.floor(Math.random() * 10);
    let final = num % 6;
    final = final + 1;
    setdice(final);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-4 pt-16 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-600/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative w-full max-w-md">

        {/* Back link */}
        <Link href="/" className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 w-fit">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="text-sm">Back to Tools</span>
        </Link>

        {/* Card */}
        <div className="p-8 rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl shadow-2xl shadow-black/50">

          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-rose-500/15 rounded-2xl border border-rose-500/20">
              {/* Custom dice icon */}
              <svg className="text-rose-400 w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <circle cx="8.5" cy="8.5" r="1.2" fill="currentColor" />
                <circle cx="15.5" cy="8.5" r="1.2" fill="currentColor" />
                <circle cx="12" cy="12" r="1.2" fill="currentColor" />
                <circle cx="8.5" cy="15.5" r="1.2" fill="currentColor" />
                <circle cx="15.5" cy="15.5" r="1.2" fill="currentColor" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Virtual Dice</h1>
              <p className="text-slate-400 text-sm mt-0.5">Roll for games or quick decisions</p>
            </div>
          </div>

          {/* Dice Display */}
          <div className="flex flex-col items-center mb-8 gap-6">
            {dice > 0 ? (
              <DiceFace value={dice} />
            ) : (
              <div className="w-36 h-36 rounded-3xl border-2 border-dashed border-slate-700 flex items-center justify-center">
                <span className="text-slate-600 text-4xl font-bold select-none">?</span>
              </div>
            )}

            {dice > 0 && (
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-slate-800" />
                <span className="text-slate-400 text-sm">
                  Rolled a <span className="text-rose-400 font-bold text-lg">{dice}</span>
                </span>
                <div className="h-px w-12 bg-slate-800" />
              </div>
            )}
          </div>

          {/* Roll Button */}
          <button
            onClick={shownum}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-rose-600 hover:bg-rose-500 active:scale-[0.97] transition-all duration-200 font-semibold text-white text-lg shadow-lg shadow-rose-500/25 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
            </svg>
            Roll the Dice
          </button>

          <p className="text-center text-slate-600 text-xs mt-5">
            Standard 6-sided die · click to roll
          </p>
        </div>

        {/* Tag */}
        <p className="text-center text-slate-700 text-xs mt-6">
          Utility Toolbox · Virtual Dice
        </p>
      </div>
    </div>
  )
}

export default page