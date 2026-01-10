"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Terminal, 
  Home, 
  Info, 
  ShieldCheck, 
  Lock, 
  Hash, 
  Disc,
  Menu // For a potential mobile menu later
} from 'lucide-react';

const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'OTP', path: '/otp', icon: <ShieldCheck size={18} /> },
    { name: 'Password', path: '/password', icon: <Lock size={18} /> },
    { name: 'Random', path: '/random', icon: <Hash size={18} /> },
    { name: 'Dice', path: '/dice', icon: <Disc size={18} /> },
    { name: 'About', path: '/about', icon: <Info size={18} /> },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-slate-950/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="p-2 bg-indigo-500/20 rounded-lg group-hover:bg-indigo-500/30 transition-all">
            <Terminal className="text-indigo-400" size={20} />
          </div>
          <span className="hidden md:block font-bold text-xl tracking-tight bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Toolbox
          </span>
        </Link>

        {/* Navigation Links - Scrollable on mobile if needed */}
        <div className="flex items-center gap-1 sm:gap-4 md:gap-8 overflow-x-auto no-scrollbar py-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link 
                key={link.path} 
                href={link.path}
                className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                  ${isActive 
                    ? 'text-indigo-400 bg-indigo-500/10' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                {link.icon}
                <span className="hidden lg:block">{link.name}</span>
                
                {/* Underline Indicator for Active Link */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Status Indicator (Purely Visual) */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">System Live</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;