import Link from 'next/link'; // Import from next/link
import { ShieldCheck, Lock, Hash, Disc, ArrowRight } from 'lucide-react';

export default function Home() {
  const features = [
    {
      title: "OTP Generator",
      desc: "Secure, one-time passwords for authentication.",
      path: "/otp", // This matches your folder name
      icon: <ShieldCheck className="w-8 h-8 text-indigo-400" />,
      color: "hover:shadow-indigo-500/20"
    },
    {
      title: "Password Architect",
      desc: "Generate unbreakable passwords with custom rules.",
      path: "/password",
      icon: <Lock className="w-8 h-8 text-cyan-400" />,
      color: "hover:shadow-cyan-500/20"
    },
    {
      title: "Range Randomizer",
      desc: "Pick a fair number between any two values.",
      path: "/random",
      icon: <Hash className="w-8 h-8 text-purple-400" />,
      color: "hover:shadow-purple-500/20"
    },
    {
      title: "Virtual Dice",
      desc: "Roll the dice for games or quick decisions.",
      path: "/dice",
      icon: <Disc className="w-8 h-8 text-rose-400" />,
      color: "hover:shadow-rose-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-indigo-500/30">
      <header className="relative pt-20 pb-16 px-6 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] -z-10"></div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-linear-to-r from-white via-slate-400 to-indigo-400 bg-clip-text text-transparent">
          Utility Toolbox
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed">
          Quick-access tools for security and randomization.
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((item, index) => (
            /* Next.js Link used here */
            <Link key={index} href={item.path}>
              <div className={`group relative p-8 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-slate-700 ${item.color} shadow-xl cursor-pointer h-full`}>
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-slate-800 rounded-lg group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500" />
                </div>
                
                <h3 className="mt-6 text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-slate-400 group-hover:text-slate-300">
                  {item.desc}
                </p>
                <div className="mt-6 flex items-center text-sm font-semibold text-indigo-400 uppercase tracking-wider">
                  Open Tool
                </div>
              </div>
            </Link>
          ))}
        </div>
        
      </main>
    </div>
  );
}