"use client"
import React, { useState } from 'react'
import { Lock, RefreshCw, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const page = () => {
  const [Password, setPassword] = useState('')

  function showPassword() {
    let alphabets = "abcdefghijklmnopqrstuvwxyz0123456789@#$&";
    let password = "";
    for (let index = 0; index < 8; index++) {
      let point = Math.ceil(Math.random() * 100)
      point = point % 40;
      let char = alphabets.charAt(point);
      password = password + char;
    }
    setPassword(password);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-4 pt-16 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/15 rounded-full blur-[130px] pointer-events-none" />

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
            <div className="p-3 bg-cyan-500/15 rounded-2xl border border-cyan-500/20">
              <Lock className="text-cyan-400" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Password Architect</h1>
              <p className="text-slate-400 text-sm mt-0.5">Generate unbreakable passwords</p>
            </div>
          </div>

          {/* Password Display */}
          <div className="mb-8">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Your Password</p>
            <div className="relative w-full h-28 rounded-2xl border border-slate-700 bg-slate-950/80 flex items-center justify-center px-6 overflow-hidden">
              <div className="absolute inset-0 bg-cyan-500/5" />
              <span className={`relative font-mono text-3xl font-bold tracking-widest select-all break-all text-center transition-all duration-300 ${Password ? 'text-cyan-300' : 'text-slate-700'}`}>
                {Password || '••••••••'}
              </span>
            </div>
          </div>

          {/* Strength Indicator (visual only) */}
          {Password && (
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span>Strength</span>
                <span className="text-cyan-400 font-semibold">Good</span>
              </div>
              <div className="flex gap-1.5">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 3 ? 'bg-cyan-500' : 'bg-slate-700'}`} />
                ))}
              </div>
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={showPassword}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-cyan-600 hover:bg-cyan-500 active:scale-[0.97] transition-all duration-200 font-semibold text-white text-lg shadow-lg shadow-cyan-500/25 cursor-pointer"
          >
            <RefreshCw size={20} />
            Generate Password
          </button>

          <p className="text-center text-slate-600 text-xs mt-5">
            8-character alphanumeric + symbols password
          </p>
        </div>

        {/* Tag */}
        <p className="text-center text-slate-700 text-xs mt-6">
          Utility Toolbox · Password Tool
        </p>
      </div>
    </div>
  )
}

export default page