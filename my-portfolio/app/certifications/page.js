"use client";
import { motion } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import { ShieldCheck, Award, Eye, Download, ExternalLink, ChevronRight, Check, Sparkles, FileText, Image as ImageIcon, X } from "lucide-react";

/* ─── Certificate Data ─────────────────────────────────── */
const CERT = {
  title: "GitHub Foundations",
  subtitle: "GH-900 Certification",
  issuer: "Microsoft / GitHub",
  examCode: "GH-900",
  credentialId: "7A5FED1001214AAF",
  certificationNumber: "03363B2E397B",
  earnedDate: "July 14, 2026",
  expiryDate: "July 15, 2028",
  msLearnUrl:
    "https://learn.microsoft.com/api/credentials/share/en-us/YOGIBISHT-6482/7A5FED1001214AAF?sharingId=A3F0C03149D963F4",
  certImage: "/github-foundation-cert.png",
  certPdf: "/github-foundation-cert.pdf",
  description:
    "Validates foundational knowledge of GitHub — demonstrating proficiency in Git, GitHub repositories, pull requests, collaboration workflows, GitHub Actions CI/CD, Copilot AI-assisted development, and security best practices.",
  skills: [
    { label: "Git version control fundamentals" },
    { label: "GitHub repositories & branching" },
    { label: "Pull requests & code review" },
    { label: "GitHub Issues & project management" },
    { label: "GitHub Actions & CI/CD basics" },
    { label: "GitHub Copilot & AI-assisted dev" },
    { label: "GitHub Codespaces & dev environments" },
    { label: "Repository security & best practices" },
  ],
  tags: ["Git", "GitHub", "DevOps", "CI/CD", "Collaboration", "AI Tools"],
};

/* ─── 3D Tilt Hook ─────────────────────────────────────── */
function useTilt() {
  const ref = useRef(null);
  const shineRef = useRef(null);
  const animFrame = useRef(null);

  const onMouseMove = useCallback((e) => {
    if (animFrame.current) cancelAnimationFrame(animFrame.current);
    animFrame.current = requestAnimationFrame(() => {
      const card = ref.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -10;
      const rotY = ((x - cx) / cx) * 10;
      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`;
      card.style.transition = "transform 0.1s ease";
      if (shineRef.current) {
        shineRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(248,231,201,0.22) 0%, transparent 65%)`;
        shineRef.current.style.opacity = "1";
      }
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    if (animFrame.current) cancelAnimationFrame(animFrame.current);
    const card = ref.current;
    if (!card) return;
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    card.style.transition = "transform 0.5s ease";
    if (shineRef.current) shineRef.current.style.opacity = "0";
  }, []);

  return { ref, shineRef, onMouseMove, onMouseLeave };
}

/* ─── PDF / Image Modal ─────────────────────────────────── */
function CertModal({ onClose, certPdf, certImage, title }) {
  const [mode, setMode] = useState("pdf");

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#022C22]/90 backdrop-blur-md p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-5xl bg-[#041C16] rounded-3xl border border-[#F8E7C9]/30 overflow-hidden shadow-2xl shadow-black flex flex-col"
        style={{ maxHeight: "92vh" }}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#F8E7C9]/15 bg-[#064E3B]/80 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-[#FAF4E8]">{title}</span>
            <div className="flex items-center gap-1 ml-3 bg-[#022C22] rounded-lg p-0.5 border border-[#F8E7C9]/15">
              {[
                { key: "pdf", label: "PDF View", icon: FileText },
                { key: "image", label: "Image View", icon: ImageIcon },
              ].map((tab) => {
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setMode(tab.key)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition flex items-center gap-1.5 ${
                      mode === tab.key
                        ? "bg-[#F8E7C9] text-[#022C22] font-semibold"
                        : "text-[#D4C3A3] hover:text-[#FAF4E8]"
                    }`}
                  >
                    <TabIcon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={certPdf}
              download="GitHub-Foundation-Certificate.pdf"
              className="flex items-center gap-1.5 text-xs text-[#FAF4E8] font-semibold px-3 py-1.5 rounded-lg bg-[#F8E7C9]/15 border border-[#F8E7C9]/30 hover:bg-[#F8E7C9] hover:text-[#022C22] transition"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-[#064E3B] text-[#D4C3A3] hover:text-[#FAF4E8] transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-auto bg-[#022C22] min-h-0">
          {mode === "pdf" ? (
            <div className="w-full h-full" style={{ minHeight: "75vh" }}>
              <embed
                src={certPdf}
                type="application/pdf"
                className="w-full"
                style={{ height: "75vh" }}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center p-6 min-h-[75vh]">
              <img
                src={certImage}
                alt="GitHub Foundation Certificate"
                className="max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl border border-[#F8E7C9]/20"
              />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Page ─────────────────────────────────────────── */
export default function Certifications() {
  const [modalOpen, setModalOpen] = useState(false);
  const tilt = useTilt();
  const [imgError, setImgError] = useState(false);

  return (
    <>
      {modalOpen && (
        <CertModal
          onClose={() => setModalOpen(false)}
          certPdf={CERT.certPdf}
          certImage={CERT.certImage}
          title={CERT.title}
        />
      )}

      <div className="relative isolate px-4 sm:px-6 pt-12 lg:px-8 min-h-screen pb-24">
        {/* Background glow */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#064E3B] to-[#10B981] opacity-25 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>

        <div className="mx-auto max-w-6xl py-8">
          
          {/* Page Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#064E3B]/60 border border-[#F8E7C9]/30 text-[#F8E7C9] text-xs font-semibold tracking-wide shadow-sm mb-4"
            >
              <ShieldCheck className="w-4 h-4 text-[#F8E7C9]" />
              Industry Verified · Microsoft &amp; GitHub
            </motion.span>

            <h1 className="text-3xl font-extrabold tracking-tight text-[#FAF4E8] sm:text-5xl">
              My <span className="text-[#F8E7C9] font-serif italic">Certifications</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#D4C3A3] max-w-xl mx-auto">
              Industry-recognized credentials validating technical proficiency in DevOps, Git, and software engineering.
            </p>
          </motion.div>

          {/* Main Card: Split Layout */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* LEFT — Certificate Info */}
            <div className="space-y-6">
              {/* Title block */}
              <div className="bg-[#022C22]/80 border border-[#F8E7C9]/20 rounded-3xl p-7 hover:border-[#F8E7C9]/50 transition duration-300 backdrop-blur-xl shadow-xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-[#064E3B] border border-[#F8E7C9]/30 flex items-center justify-center text-[#F8E7C9]">
                    <Award className="w-6 h-6 text-[#F8E7C9]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#F8E7C9] uppercase tracking-wider">{CERT.issuer}</p>
                    <p className="text-xs font-mono text-[#D4C3A3]/80 mt-0.5">Exam Code: {CERT.examCode}</p>
                  </div>
                  <span className="ml-auto flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full text-[#34D399] bg-[#10B981]/15 border border-[#10B981]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                    Active Credential
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-[#FAF4E8] mb-3">{CERT.title}</h2>
                <p className="text-[#D4C3A3] text-xs sm:text-sm leading-relaxed">{CERT.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {CERT.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 text-xs font-medium text-[#F8E7C9] bg-[#064E3B]/60 rounded-full border border-[#F8E7C9]/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Skills Validated */}
              <div className="bg-[#022C22]/80 border border-[#F8E7C9]/20 rounded-3xl p-6 hover:border-[#F8E7C9]/50 transition duration-300 shadow-xl">
                <p className="text-xs font-bold text-[#F8E7C9] uppercase tracking-widest mb-4">Competencies Validated</p>
                <div className="grid grid-cols-1 gap-2.5">
                  {CERT.skills.map((skill, i) => (
                    <motion.div
                      key={skill.label}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-[#064E3B]/30 border border-[#F8E7C9]/15 hover:border-[#F8E7C9]/35 transition"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-[#F8E7C9] flex-shrink-0" />
                      <span className="text-xs font-medium text-[#FAF4E8]">{skill.label}</span>
                      <Check className="w-3.5 h-3.5 text-[#34D399] ml-auto flex-shrink-0" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Credential Specs */}
              <div className="bg-[#022C22]/80 border border-[#F8E7C9]/20 rounded-3xl p-6 hover:border-[#F8E7C9]/50 transition duration-300 shadow-xl">
                <p className="text-xs font-bold text-[#F8E7C9] uppercase tracking-widest mb-4">Verification Metadata</p>
                <div className="space-y-3">
                  {[
                    { label: "Credential ID", value: CERT.credentialId, mono: true, color: "text-[#FAF4E8]" },
                    { label: "Cert Number", value: CERT.certificationNumber, mono: true, color: "text-[#FAF4E8]" },
                    { label: "Earned Date", value: CERT.earnedDate, mono: false, color: "text-[#34D399]" },
                    { label: "Expiration", value: CERT.expiryDate, mono: false, color: "text-[#F8E7C9]" },
                  ].map((row, i) => (
                    <div key={row.label}>
                      {i > 0 && <div className="border-t border-[#F8E7C9]/10 mb-3" />}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#D4C3A3]/70">{row.label}</span>
                        <span className={`text-xs font-medium ${row.mono ? "font-mono tracking-wider" : ""} ${row.color}`}>
                          {row.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setModalOpen(true)}
                  className="flex flex-col items-center justify-center gap-1.5 bg-[#F8E7C9] text-[#022C22] py-3.5 rounded-2xl hover:bg-[#FAF4E8] transition text-xs font-bold shadow-lg shadow-[#F8E7C9]/15"
                >
                  <Eye className="w-4 h-4 text-[#022C22]" />
                  View Certificate
                </button>
                <a
                  href={CERT.msLearnUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-1.5 bg-[#064E3B]/60 text-[#FAF4E8] py-3.5 rounded-2xl hover:bg-[#064E3B] transition text-xs font-semibold border border-[#F8E7C9]/25"
                >
                  <ExternalLink className="w-4 h-4 text-[#F8E7C9]" />
                  Verify Online
                </a>
                <a
                  href={CERT.certPdf}
                  download="GitHub-Foundation-Certificate.pdf"
                  className="flex flex-col items-center justify-center gap-1.5 bg-[#064E3B]/60 text-[#FAF4E8] py-3.5 rounded-2xl hover:bg-[#064E3B] transition text-xs font-semibold border border-[#F8E7C9]/25"
                >
                  <Download className="w-4 h-4 text-[#F8E7C9]" />
                  Download PDF
                </a>
              </div>
            </div>

            {/* RIGHT — 3D Interactive Card Showcase */}
            <div className="flex flex-col items-center gap-6">
              <div className="w-full">
                <p className="text-xs font-bold text-[#F8E7C9] uppercase tracking-widest mb-4 text-center">
                  Certificate Preview · <span className="text-[#FAF4E8] normal-case font-normal">hover for 3D tilt</span>
                </p>
                <div
                  ref={tilt.ref}
                  onMouseMove={tilt.onMouseMove}
                  onMouseLeave={tilt.onMouseLeave}
                  className="relative rounded-3xl overflow-hidden cursor-pointer select-none shadow-2xl shadow-black border border-[#F8E7C9]/30 bg-[#041C16]"
                  style={{ willChange: "transform" }}
                  onClick={() => setModalOpen(true)}
                >
                  {imgError ? (
                    <div className="aspect-video bg-[#064E3B]/40 border border-[#F8E7C9]/20 rounded-3xl flex items-center justify-center p-6 text-center">
                      <p className="text-[#D4C3A3] text-xs">
                        Certificate image <code className="text-[#F8E7C9] font-mono">github-foundation-cert.png</code> in public/
                      </p>
                    </div>
                  ) : (
                    <img
                      src={CERT.certImage}
                      alt="GitHub Foundation Certificate"
                      className="w-full block object-cover"
                      onError={() => setImgError(true)}
                      draggable={false}
                    />
                  )}

                  <div
                    ref={tilt.shineRef}
                    className="absolute inset-0 pointer-events-none transition-opacity duration-200"
                    style={{ opacity: 0, borderRadius: "inherit" }}
                  />

                  <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition duration-300 flex items-center justify-center opacity-0 hover:opacity-100 rounded-3xl">
                    <div className="flex items-center gap-2 bg-[#022C22]/90 backdrop-blur-md text-[#F8E7C9] text-xs font-bold px-5 py-2.5 rounded-full border border-[#F8E7C9]/30 shadow-xl">
                      <Eye className="w-4 h-4" /> Click to view full certificate
                    </div>
                  </div>
                </div>
              </div>

              {/* Microsoft Share Badge */}
              <motion.a
                href={CERT.msLearnUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#022C22]/90 border border-[#F8E7C9]/25 hover:border-[#F8E7C9]/60 rounded-3xl p-5 transition duration-300 shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0078d4] to-[#004ba0] flex items-center justify-center flex-shrink-0 shadow-md">
                    <svg viewBox="0 0 23 23" className="w-6 h-6" fill="none">
                      <rect x="1" y="1" width="10" height="10" fill="#F25022" />
                      <rect x="12" y="1" width="10" height="10" fill="#7FBA00" />
                      <rect x="1" y="12" width="10" height="10" fill="#00A4EF" />
                      <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#FAF4E8]">Microsoft Learn Transcript</p>
                    <p className="text-xs text-[#D4C3A3]/70 mt-0.5 truncate">Verified credential · view online badge</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#F8E7C9]" />
                </div>
              </motion.a>
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
}

