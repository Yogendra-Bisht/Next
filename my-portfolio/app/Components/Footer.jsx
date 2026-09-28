import Link from "next/link";
import { Mail, Sparkles } from "lucide-react";

const GithubIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#022C22] border-t border-[#F8E7C9]/15 text-[#D4C3A3] py-14 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-[#064E3B]/40 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-10 border-b border-[#F8E7C9]/10">
          
          {/* Brand */}
          <div className="text-center md:text-left">
            <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold tracking-tight text-[#FAF4E8]">
              <span className="w-7 h-7 rounded-lg bg-[#064E3B] border border-[#F8E7C9]/30 flex items-center justify-center text-[#F8E7C9]">
                <Sparkles className="w-3.5 h-3.5 text-[#F8E7C9]" />
              </span>
              <span>Yogendra<span className="text-[#F8E7C9] font-serif italic ml-0.5">.dev</span></span>
            </Link>
            <p className="text-sm text-[#D4C3A3]/80 mt-2 max-w-sm">
              Full-Stack Developer crafting high-performance web applications with Next.js, React, and modern software design.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <Link href="/about" className="text-[#D4C3A3] hover:text-[#F8E7C9] transition duration-200">About</Link>
            <Link href="/projects" className="text-[#D4C3A3] hover:text-[#F8E7C9] transition duration-200">Projects</Link>
            <Link href="/skills" className="text-[#D4C3A3] hover:text-[#F8E7C9] transition duration-200">Skills</Link>
            <Link href="/certifications" className="text-[#D4C3A3] hover:text-[#F8E7C9] transition duration-200">Certifications</Link>
            <Link href="/contact" className="text-[#D4C3A3] hover:text-[#F8E7C9] transition duration-200">Contact</Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a 
              href="https://github.com/Yogendra-Bisht" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 bg-[#064E3B]/40 border border-[#F8E7C9]/20 rounded-xl hover:bg-[#F8E7C9] hover:text-[#022C22] text-[#F8E7C9] transition duration-300 shadow-sm"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a 
              href="https://linkedin.com/in/yogendra-bisht-7b4b63288" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 bg-[#064E3B]/40 border border-[#F8E7C9]/20 rounded-xl hover:bg-[#F8E7C9] hover:text-[#022C22] text-[#F8E7C9] transition duration-300 shadow-sm"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a 
              href="mailto:bishtyogendra96436372@gmail.com" 
              className="p-2.5 bg-[#064E3B]/40 border border-[#F8E7C9]/20 rounded-xl hover:bg-[#F8E7C9] hover:text-[#022C22] text-[#F8E7C9] transition duration-300 shadow-sm"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#D4C3A3]/70">
          <p>© {currentYear} Yogendra Bisht. Engineered with precision.</p>
          <div className="flex items-center gap-2">
            <span>Built with <strong className="text-[#F8E7C9]">Next.js</strong> &amp; <strong className="text-[#F8E7C9]">Tailwind CSS</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
