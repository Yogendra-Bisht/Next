"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Download,
  ExternalLink,
  X,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Server,
  Code2,
  GraduationCap,
  Award,
  Terminal,
  FolderGit2,
  Cpu
} from "lucide-react";

export default function ResumeModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("preview"); // "preview" | "ats"
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (!isOpen) return null;

  const copyEmail = () => {
    navigator.clipboard.writeText("bishtyogendra96436372@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-5xl bg-[#022C22] border border-[#F8E7C9]/35 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[90vh] sm:h-[88vh] z-10"
        >
          {/* Top Bar Header (Fixed / Non-scrolling) */}
          <div className="shrink-0 bg-[#064E3B]/90 px-5 py-3.5 border-b border-[#F8E7C9]/20 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#022C22] border border-[#F8E7C9]/30 flex items-center justify-center text-[#F8E7C9] shrink-0">
                <FileText className="w-5 h-5 text-[#F8E7C9]" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#FAF4E8] flex items-center gap-2">
                  Yogendra Singh Bisht
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#34D399]/15 text-[#34D399] border border-[#34D399]/30">
                    MCA Grad &apos;26
                  </span>
                </h3>
                <p className="text-[11px] sm:text-xs text-[#D4C3A3]/80">DevOps · Linux · Docker · AWS · Next.js · Java DSA</p>
              </div>
            </div>

            {/* Action Controls */}
            <div className="flex items-center gap-2">
              <a
                href="/resume.pdf"
                download="Yogendra_Singh_Bisht_Resume.pdf"
                className="px-3.5 py-1.5 rounded-full bg-[#F8E7C9] text-[#022C22] font-semibold text-xs hover:bg-[#FAF4E8] transition duration-200 flex items-center gap-1.5 shadow"
              >
                <Download className="w-3.5 h-3.5 text-[#022C22]" /> Download PDF
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#064E3B] border border-[#F8E7C9]/25 text-[#F8E7C9] hover:border-[#F8E7C9] transition text-xs"
                title="Open PDF in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-[#022C22] border border-[#F8E7C9]/25 text-[#D4C3A3] hover:text-[#FAF4E8] hover:border-[#F8E7C9] transition"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* View Mode Switcher Bar (Fixed / Non-scrolling) */}
          <div className="shrink-0 bg-[#041C16] px-5 py-2 border-b border-[#F8E7C9]/15 flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("preview")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === "preview"
                    ? "bg-[#064E3B] text-[#F8E7C9] border border-[#F8E7C9]/30 shadow"
                    : "text-[#D4C3A3]/70 hover:text-[#FAF4E8]"
                }`}
              >
                📄 Live PDF Viewer
              </button>
              <button
                onClick={() => setActiveTab("ats")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === "ats"
                    ? "bg-[#064E3B] text-[#F8E7C9] border border-[#F8E7C9]/30 shadow"
                    : "text-[#D4C3A3]/70 hover:text-[#FAF4E8]"
                }`}
              >
                ⚡ Interactive Summary Breakdown
              </button>
            </div>

            <button
              onClick={copyEmail}
              className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-[#D4C3A3] hover:text-[#F8E7C9] bg-[#022C22] px-3 py-1 rounded-full border border-[#F8E7C9]/20"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#34D399]" /> : <Copy className="w-3.5 h-3.5 text-[#F8E7C9]" />}
              <span>{copiedEmail ? "Email Copied!" : "Copy Email"}</span>
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 touch-pan-y" style={{ WebkitOverflowScrolling: "touch" }}>
            {activeTab === "preview" ? (
              <div className="w-full h-full min-h-[550px] sm:min-h-[650px] rounded-2xl overflow-hidden border border-[#F8E7C9]/20 bg-[#041C16] relative shadow-inner">
                <object
                  data="/resume.pdf#toolbar=1&navpanes=0&scrollbar=1"
                  type="application/pdf"
                  className="w-full h-full"
                >
                  <div className="p-8 text-center space-y-4">
                    <FileText className="w-12 h-12 text-[#F8E7C9] mx-auto opacity-70" />
                    <p className="text-sm text-[#D4C3A3]">PDF Viewer unavailable directly inside your mobile browser frame.</p>
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F8E7C9] text-[#022C22] font-semibold text-xs"
                    >
                      <Download className="w-4 h-4" /> Download Resume PDF
                    </a>
                  </div>
                </object>
              </div>
            ) : (
              /* ATS Interactive Breakdown (Fully Scrollable) */
              <div className="space-y-6 text-left pb-4">
                {/* Header Summary Card */}
                <div className="p-6 rounded-2xl bg-[#064E3B]/40 border border-[#F8E7C9]/25 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-[#FAF4E8]">Yogendra Singh Bisht</h2>
                    <p className="text-xs text-[#F8E7C9] font-semibold mt-0.5">
                      DevOps &amp; Software Engineer · MCA Graduate (2026)
                    </p>
                    <p className="text-xs text-[#D4C3A3]/80 mt-1">
                      Uttarakhand, India · bishtyogendra96436372@gmail.com · +91 94563 11336
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#10B981]/15 text-[#34D399] text-xs font-bold border border-[#10B981]/30 shrink-0">
                    GH-900 GitHub Certified
                  </span>
                </div>

                {/* Core Technical Stack Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-[#041C16] border border-[#F8E7C9]/15 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#F8E7C9]">
                      <Server className="w-4 h-4 text-[#F8E7C9]" /> DevOps &amp; Cloud Infrastructure
                    </div>
                    <p className="text-xs text-[#D4C3A3] leading-relaxed">
                      Linux Systems Admin (RHEL/Ubuntu, Bash), Docker Containerization, Docker Compose, AWS Cloud (EC2, S3, IAM), Nginx Reverse Proxy, GitHub Actions CI/CD.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#041C16] border border-[#F8E7C9]/15 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#F8E7C9]">
                      <Code2 className="w-4 h-4 text-[#F8E7C9]" /> Frontend Architecture
                    </div>
                    <p className="text-xs text-[#D4C3A3] leading-relaxed">
                      Next.js 16 (App Router), React 19, JavaScript ES6+, Tailwind CSS v4, Framer Motion, Shadow DOM &amp; Browser Extensions (MV3).
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#041C16] border border-[#F8E7C9]/15 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#F8E7C9]">
                      <Terminal className="w-4 h-4 text-[#F8E7C9]" /> Backend &amp; Core Logic
                    </div>
                    <p className="text-xs text-[#D4C3A3] leading-relaxed">
                      Java (Core &amp; Advanced), Data Structures &amp; Algorithms, Node.js, Express REST APIs, MongoDB Atlas, JWT Authentication, Jest Testing.
                    </p>
                  </div>
                </div>

                {/* Featured Projects Highlight */}
                <div className="p-5 rounded-2xl bg-[#041C16] border border-[#F8E7C9]/15 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#FAF4E8]">
                    <FolderGit2 className="w-4 h-4 text-[#F8E7C9]" /> Key Engineering Projects
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-xl bg-[#022C22]/80 border border-[#F8E7C9]/10 space-y-1">
                      <div className="flex justify-between items-center text-xs font-bold text-[#FAF4E8]">
                        <span>WordCatch (Browser Extension MV3)</span>
                        <span className="text-[#34D399] text-[10px]">Render Live</span>
                      </div>
                      <p className="text-[11px] text-[#D4C3A3]/80 leading-relaxed">
                        Double-click vocabulary lookup engine with isolated Shadow DOM tooltips, Express REST API, MongoDB caching, and Manifest V3 background service worker JWT custody.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#022C22]/80 border border-[#F8E7C9]/10 space-y-1">
                      <div className="flex justify-between items-center text-xs font-bold text-[#FAF4E8]">
                        <span>Student Accommodation Platform (SRAP)</span>
                        <span className="text-[#34D399] text-[10px]">Vercel Live</span>
                      </div>
                      <p className="text-[11px] text-[#D4C3A3]/80 leading-relaxed">
                        Full-stack accommodation discovery platform featuring proximity search, Express REST API, MongoDB document storage, and JWT user authentication.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Education & Certification Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-[#041C16] border border-[#F8E7C9]/15">
                    <div className="flex items-center gap-2 text-sm font-bold text-[#FAF4E8] mb-3">
                      <GraduationCap className="w-4 h-4 text-[#F8E7C9]" /> Education
                    </div>
                    <div className="space-y-3 text-xs">
                      <div>
                        <div className="flex justify-between font-bold text-[#FAF4E8]">
                          <span>Master of Computer Applications (MCA)</span>
                          <span className="text-[#F8E7C9]">2024 – 2026</span>
                        </div>
                        <p className="text-[#D4C3A3]/80">HNB Garhwal University (Graduated 2026)</p>
                      </div>
                      <div className="pt-2 border-t border-[#F8E7C9]/10">
                        <div className="flex justify-between font-bold text-[#FAF4E8]">
                          <span>B.Sc. (Physics, Math &amp; IT)</span>
                          <span className="text-[#F8E7C9]">2021 – 2024</span>
                        </div>
                        <p className="text-[#D4C3A3]/80">S.S.J. Campus, Almora</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#041C16] border border-[#F8E7C9]/15">
                    <div className="flex items-center gap-2 text-sm font-bold text-[#FAF4E8] mb-3">
                      <Award className="w-4 h-4 text-[#F8E7C9]" /> Verified Credentials
                    </div>
                    <div className="space-y-3 text-xs">
                      <div>
                        <p className="font-bold text-[#FAF4E8]">GitHub Foundations Certification (GH-900)</p>
                        <p className="text-[#D4C3A3]/80 mt-0.5">
                          Verified expertise in Git version control, GitHub Actions CI/CD pipelines, repository security, and collaborative software engineering workflows.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar (Fixed / Non-scrolling) */}
          <div className="shrink-0 bg-[#064E3B]/80 px-5 py-3 border-t border-[#F8E7C9]/15 flex items-center justify-between text-xs text-[#D4C3A3]">
            <span>Yogendra Singh Bisht · Official Resume Document</span>
            <button
              onClick={onClose}
              className="text-[#F8E7C9] hover:underline font-semibold"
            >
              Close Window
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
