"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // UPDATED THEME CLASSES HERE
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-700 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo with a slight gradient text effect */}
          <Link href="/" className="text-xl font-bold tracking-wide hover:text-cyan-400 transition">
            Yogendra<span className="text-cyan-400">.dev</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center font-medium">
            <Link href="/" className="hover:text-cyan-400 transition duration-300">Home</Link>
            <Link href="/projects" className="hover:text-cyan-400 transition duration-300">Projects</Link>
            <Link href="/skills" className="hover:text-cyan-400 transition duration-300">Skills</Link>
            <Link href="/contact" className="hover:text-cyan-400 transition duration-300">Contact</Link>
            
            <a href="/resume.pdf" target="_blank" className="px-5 py-2 bg-cyan-600 rounded-full hover:bg-cyan-500 transition shadow-lg shadow-cyan-500/20">
              Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="outline-none text-gray-300 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Keep background solid here for readability) */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 pb-4 px-4 shadow-xl">
          <Link href="/" onClick={() => setIsOpen(false)} className="block py-3 text-sm hover:text-cyan-400 border-b border-slate-800">Home</Link>
          <Link href="/projects" onClick={() => setIsOpen(false)} className="block py-3 text-sm hover:text-cyan-400 border-b border-slate-800">Projects</Link>
          <Link href="/skills" onClick={() => setIsOpen(false)} className="block py-3 text-sm hover:text-cyan-400 border-b border-slate-800">Skills</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="block py-3 text-sm hover:text-cyan-400">Contact</Link>
        </div>
      )}
    </nav>
  );
}