"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  Download,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Server,
  Code2,
  GraduationCap,
  Award,
  Terminal,
  Printer,
  ArrowLeft
} from "lucide-react";

export default function ResumePage() {
  const [activeTab, setActiveTab] = useState("preview"); // "preview" | "ats"
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("bishtyogendra96436372@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="relative isolate px-4 sm:px-6 pt-10 lg:px-8 min-h-screen pb-24">
      {/* Background Glow */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#064E3B] to-[#10B981] opacity-25 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="mx-auto max-w-6xl py-8">
        
        {/* Navigation & Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#064E3B]/40 border border-[#F8E7C9]/20 text-[#FAF4E8] text-xs font-semibold hover:border-[#F8E7C9] transition"
          >
            <ArrowLeft className="w-4 h-4 text-[#F8E7C9]" /> Return to Portfolio
          </Link>

          <div className="flex items-center gap-3">
            <a
              href="/resume.pdf"
              download="Yogendra_Singh_Bisht_Resume.pdf"
              className="px-5 py-2.5 rounded-full bg-[#F8E7C9] text-[#022C22] font-semibold text-xs hover:bg-[#FAF4E8] hover:scale-105 transition shadow-lg flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-[#022C22]" /> Download PDF Resume
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-[#064E3B] border border-[#F8E7C9]/30 text-[#F8E7C9] hover:border-[#F8E7C9] transition text-xs"
              title="Open raw PDF in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Page Title */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#064E3B]/60 border border-[#F8E7C9]/30 text-[#F8E7C9] text-xs font-semibold tracking-wide shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#F8E7C9]" />
            Official Resume Document
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#FAF4E8] sm:text-5xl">
            Interactive <span className="text-[#F8E7C9] font-serif italic">Resume</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#D4C3A3] max-w-xl mx-auto">
            View the official embedded PDF document or inspect the ATS-formatted technical breakdown.
          </p>
        </motion.div>

        {/* Main Viewer Card */}
        <div className="bg-[#022C22]/90 border border-[#F8E7C9]/30 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
          
          {/* Controls Bar */}
          <div className="bg-[#064E3B]/80 px-6 py-4 border-b border-[#F8E7C9]/20 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("preview")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeTab === "preview"
                    ? "bg-[#022C22] text-[#F8E7C9] border border-[#F8E7C9]/40 shadow"
                    : "text-[#D4C3A3]/70 hover:text-[#FAF4E8]"
                }`}
              >
                📄 Live PDF Viewer
              </button>
              <button
                onClick={() => setActiveTab("ats")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeTab === "ats"
                    ? "bg-[#022C22] text-[#F8E7C9] border border-[#F8E7C9]/40 shadow"
                    : "text-[#D4C3A3]/70 hover:text-[#FAF4E8]"
                }`}
              >
                ⚡ ATS Interactive Summary
              </button>
            </div>

            <button
              onClick={copyEmail}
              className="text-xs font-mono text-[#D4C3A3] hover:text-[#F8E7C9] flex items-center gap-1.5 bg-[#022C22]/60 px-3.5 py-1.5 rounded-full border border-[#F8E7C9]/20"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#34D399]" /> : <Copy className="w-3.5 h-3.5 text-[#F8E7C9]" />}
              <span>{copiedEmail ? "Email Copied!" : "bishtyogendra96436372@gmail.com"}</span>
            </button>
          </div>

          {/* View Container */}
          <div className="p-4 sm:p-8">
            {activeTab === "preview" ? (
              <div className="w-full h-[750px] rounded-2xl overflow-hidden border border-[#F8E7C9]/20 bg-[#041C16] shadow-inner">
                <object
                  data="/resume.pdf#toolbar=1&navpanes=0&scrollbar=1"
                  type="application/pdf"
                  className="w-full h-full"
                >
                  <div className="p-12 text-center space-y-4">
                    <FileText className="w-16 h-16 text-[#F8E7C9] mx-auto opacity-70" />
                    <p className="text-base text-[#FAF4E8]">PDF previewer unavailable directly on your mobile device.</p>
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F8E7C9] text-[#022C22] font-semibold text-sm"
                    >
                      <Download className="w-4 h-4" /> Download Resume PDF
                    </a>
                  </div>
                </object>
              </div>
            ) : (
              /* ATS Breakdown */
              <div className="space-y-8 text-left max-w-4xl mx-auto">
                {/* Profile Header */}
                <div className="p-6 sm:p-8 rounded-3xl bg-[#064E3B]/40 border border-[#F8E7C9]/25 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#34D399] bg-[#10B981]/15 px-3 py-1 rounded-full border border-[#10B981]/30">
                      GitHub Certified Engineer
                    </span>
                    <h2 className="text-3xl font-extrabold text-[#FAF4E8] mt-2">Yogendra Singh Bisht</h2>
                    <p className="text-sm text-[#F8E7C9] font-medium mt-1">
                      DevOps, Linux, Docker, AWS &amp; Next.js Specialist · MCA Graduate (2026)
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="mailto:bishtyogendra96436372@gmail.com"
                      className="px-4 py-2 rounded-xl bg-[#022C22] text-[#F8E7C9] text-xs font-semibold border border-[#F8E7C9]/30 hover:border-[#F8E7C9] transition"
                    >
                      Email Direct
                    </a>
                    <a
                      href="https://github.com/Yogendra-Bisht"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-[#022C22] text-[#F8E7C9] text-xs font-semibold border border-[#F8E7C9]/30 hover:border-[#F8E7C9] transition"
                    >
                      GitHub Profile
                    </a>
                  </div>
                </div>

                {/* Core Competencies Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-2xl bg-[#041C16] border border-[#F8E7C9]/20 space-y-2">
                    <div className="flex items-center gap-2 text-sm font-bold text-[#F8E7C9]">
                      <Server className="w-5 h-5 text-[#F8E7C9]" /> DevOps &amp; Cloud
                    </div>
                    <p className="text-xs text-[#D4C3A3] leading-relaxed">
                      Linux (RHEL/Ubuntu), Docker, Docker Compose, AWS (EC2, S3, IAM), Nginx, GitHub Actions CI/CD, Shell Scripting.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#041C16] border border-[#F8E7C9]/20 space-y-2">
                    <div className="flex items-center gap-2 text-sm font-bold text-[#F8E7C9]">
                      <Code2 className="w-5 h-5 text-[#F8E7C9]" /> Web Architecture
                    </div>
                    <p className="text-xs text-[#D4C3A3] leading-relaxed">
                      Next.js 16 (App Router), React 19, Tailwind CSS v4, JavaScript (ES6+), Framer Motion, Browser Extensions (MV3).
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#041C16] border border-[#F8E7C9]/20 space-y-2">
                    <div className="flex items-center gap-2 text-sm font-bold text-[#F8E7C9]">
                      <Terminal className="w-5 h-5 text-[#F8E7C9]" /> Core CS &amp; Backend
                    </div>
                    <p className="text-xs text-[#D4C3A3] leading-relaxed">
                      Java (Core &amp; Advanced), Data Structures &amp; Algorithms, Node.js, Express REST APIs, MongoDB Atlas, JWT Auth.
                    </p>
                  </div>
                </div>

                {/* Academic Timeline */}
                <div className="p-6 sm:p-8 rounded-3xl bg-[#041C16] border border-[#F8E7C9]/20 space-y-4">
                  <h3 className="text-lg font-bold text-[#FAF4E8] flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-[#F8E7C9]" /> Education &amp; Credentials
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm font-bold text-[#FAF4E8]">
                        <span>Master of Computer Applications (MCA)</span>
                        <span className="text-[#F8E7C9]">2024 – 2026</span>
                      </div>
                      <p className="text-xs text-[#D4C3A3]">HNB Garhwal University (Graduated 2026)</p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-sm font-bold text-[#FAF4E8]">
                        <span>GitHub Foundations (GH-900)</span>
                        <span className="text-[#34D399]">Verified</span>
                      </div>
                      <p className="text-xs text-[#D4C3A3]">Software workflows, Version Control, &amp; CI/CD</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
