import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left Section: Brand & Copyright */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-white tracking-wide">
            Yogendra<span className="text-cyan-400">.dev</span>
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            © {currentYear} Yogendra Bisht. All rights reserved.
          </p>
        </div>

        {/* Middle Section: Quick Links (Optional, good for SEO) */}
        <div className="flex gap-6 text-sm font-medium">
          <Link href="/projects" className="hover:text-cyan-400 transition">Projects</Link>
          <Link href="/skills" className="hover:text-cyan-400 transition">Skills</Link>
          <Link href="/contact" className="hover:text-cyan-400 transition">Contact</Link>
        </div>

        {/* Right Section: Social Icons */}
        <div className="flex gap-4">
          {/* GitHub Icon */}
          <a 
            href="https://github.com/Yogendra-Bisht" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 bg-slate-800 rounded-full hover:bg-cyan-600 hover:text-white transition duration-300"
            aria-label="GitHub"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>

          {/* LinkedIn Icon */}
          <a 
            href="https://linkedin.com/in/yogendra-bisht-7b4b63288" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 bg-slate-800 rounded-full hover:bg-cyan-600 hover:text-white transition duration-300"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
            </svg>
          </a>

          {/* Email Icon */}
          <a 
            href="mailto:bishtyogendra96436372@gmail.com" 
            className="p-2 bg-slate-800 rounded-full hover:bg-cyan-600 hover:text-white transition duration-300"
            aria-label="Email"
          >
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </div>
      
      {/* Bottom Text: Tech Stack Badge */}
      <div className="text-center mt-8 border-t border-slate-800 pt-6">
        <p className="text-xs text-gray-600">
          Built with <span className="text-gray-400 font-semibold">Next.js</span> & <span className="text-cyan-500 font-semibold">Tailwind CSS</span>
        </p>
      </div>
    </footer>
  );
}