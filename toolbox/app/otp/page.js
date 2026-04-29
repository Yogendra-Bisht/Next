"use client"
import React, { useState } from 'react'
import { ShieldCheck, RefreshCw, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const page = () => {
  const [Otp, setOtp] = useState('')

  function showOtp() {
    let otp = function createOtp() {
      let x = Math.random() * 1000000;
      x = Math.floor(x);
      return x;
    }
    setOtp(otp);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-4 pt-16 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[130px] pointer-events-none" />

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
            <div className="p-3 bg-indigo-500/15 rounded-2xl border border-indigo-500/20">
              <ShieldCheck className="text-indigo-400" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">OTP Generator</h1>
              <p className="text-slate-400 text-sm mt-0.5">Secure one-time passwords</p>
            </div>
          </div>

          {/* OTP Display */}
          <div className="mb-8">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Your OTP</p>
            <div className="relative w-full h-28 rounded-2xl border border-slate-700 bg-slate-950/80 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-indigo-500/5" />
              <span className={`relative font-mono text-5xl font-bold tracking-[0.25em] select-all transition-all duration-300 ${Otp ? 'text-indigo-300' : 'text-slate-700'}`}>
                {Otp || '000000'}
              </span>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={showOtp}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:scale-[0.97] transition-all duration-200 font-semibold text-white text-lg shadow-lg shadow-indigo-500/25 cursor-pointer"
          >
            <RefreshCw size={20} />
            Generate OTP
          </button>

          <p className="text-center text-slate-600 text-xs mt-5">
            Click to generate a new one-time password
          </p>
        </div>

        {/* Tag */}
        <p className="text-center text-slate-700 text-xs mt-6">
          Utility Toolbox · OTP Tool
        </p>
      </div>
    </div>
  )
}

export default page