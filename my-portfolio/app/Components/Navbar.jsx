"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Menu, X, Sparkles } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/certifications", label: "Certifications" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#022C22]/85 border-b border-[#F8E7C9]/15 text-[#FAF4E8] transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5 text-xl font-bold tracking-tight text-[#FAF4E8]">
            <span className="w-8 h-8 rounded-lg bg-[#064E3B] border border-[#F8E7C9]/30 flex items-center justify-center text-[#F8E7C9] group-hover:border-[#F8E7C9] group-hover:scale-105 transition-all duration-300 shadow-md">
              <Sparkles className="w-4 h-4 text-[#F8E7C9]" />
            </span>
            <span className="tracking-wide">
              Yogendra<span className="text-[#F8E7C9] font-serif italic ml-0.5">.dev</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1 items-center font-medium">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition duration-200 ${
                    isActive
                      ? "text-[#022C22] bg-[#F8E7C9] font-semibold shadow-md shadow-[#F8E7C9]/10"
                      : "text-[#D4C3A3] hover:text-[#FAF4E8] hover:bg-[#064E3B]/40"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 px-4 py-1.5 rounded-full text-sm font-semibold bg-[#F8E7C9] text-[#022C22] hover:bg-[#FAF4E8] transition-all duration-300 shadow-md shadow-[#F8E7C9]/20 hover:shadow-[#F8E7C9]/40 flex items-center gap-1.5 hover:-translate-y-0.5"
            >
              <FileText className="w-3.5 h-3.5" />
              Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="outline-none text-[#D4C3A3] hover:text-[#F8E7C9] p-2 rounded-lg bg-[#064E3B]/30 border border-[#F8E7C9]/15"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5 text-[#F8E7C9]" /> : <Menu className="w-5 h-5 text-[#F8E7C9]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#022C22] border-b border-[#F8E7C9]/20 pb-5 px-6 pt-2 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col space-y-2 mt-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`py-2.5 px-4 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? "text-[#022C22] bg-[#F8E7C9] font-semibold"
                      : "text-[#D4C3A3] hover:text-[#FAF4E8] hover:bg-[#064E3B]/50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 text-center py-2.5 bg-[#F8E7C9] text-[#022C22] font-semibold rounded-xl text-sm hover:bg-[#FAF4E8] transition flex items-center justify-center gap-2 shadow-lg"
            >
              <FileText className="w-4 h-4" />
              View Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}