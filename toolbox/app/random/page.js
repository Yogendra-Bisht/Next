"use client"
import React, { useState } from 'react'
import { Hash, Shuffle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const page = () => {
  const [val1, setval1] = useState('');
  const [val2, setval2] = useState('');
  const [number, setNumber] = useState(null);

  function catchrange1(value) {
    setval1(value);
  }
  function catchrange2(value) {
    setval2(value);
  }

  function makenumber() {
    let start = Math.ceil(val1);
    let end = Math.floor(val2);
    let random = Math.floor(Math.random() * (end - start + 1) + start);
    setNumber(random);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-4 pt-16 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[130px] pointer-events-none" />

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
            <div className="p-3 bg-purple-500/15 rounded-2xl border border-purple-500/20">
              <Hash className="text-purple-400" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Range Randomizer</h1>
              <p className="text-slate-400 text-sm mt-0.5">Pick a fair number between any two values</p>
            </div>
          </div>

          {/* Range Inputs */}
          <div className="flex items-end gap-4 mb-8">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">From</label>
              <input
                type="number"
                value={val1}
                onChange={(e) => catchrange1(e.target.value)}
                placeholder="1"
                className="w-full px-4 py-3.5 rounded-xl border border-slate-700 bg-slate-950/80 text-white text-center text-2xl font-bold focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all placeholder-slate-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            <div className="pb-3.5 text-slate-600 font-bold text-2xl select-none">—</div>

            <div className="flex-1">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">To</label>
              <input
                type="number"
                value={val2}
                onChange={(e) => catchrange2(e.target.value)}
                placeholder="100"
                className="w-full px-4 py-3.5 rounded-xl border border-slate-700 bg-slate-950/80 text-white text-center text-2xl font-bold focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all placeholder-slate-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>

          {/* Result Display */}
          <div className="mb-8">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Result</p>
            <div className="relative w-full h-28 rounded-2xl border border-slate-700 bg-slate-950/80 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-purple-500/5" />
              <span className={`relative font-mono text-6xl font-black transition-all duration-300 ${number !== null ? 'text-purple-300' : 'text-slate-700'}`}>
                {number !== null ? number : '?'}
              </span>
            </div>
          </div>

          {/* Shuffle Button */}
          <button
            onClick={makenumber}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-purple-600 hover:bg-purple-500 active:scale-[0.97] transition-all duration-200 font-semibold text-white text-lg shadow-lg shadow-purple-500/25 cursor-pointer"
          >
            <Shuffle size={20} />
            Randomize
          </button>

          <p className="text-center text-slate-600 text-xs mt-5">
            Set a range and hit randomize to pick a number
          </p>
        </div>

        {/* Tag */}
        <p className="text-center text-slate-700 text-xs mt-6">
          Utility Toolbox · Range Randomizer
        </p>
      </div>
    </div>
  )
}

export default page