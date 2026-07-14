"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useCallback } from "react";

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
    "Validates foundational knowledge of GitHub — the world's leading platform for software collaboration. Demonstrates proficiency in Git, GitHub repositories, collaboration workflows, modern developer tooling (Copilot, Actions, Codespaces), and security best practices.",
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
      const rotX = ((y - cy) / cy) * -12;
      const rotY = ((x - cx) / cx) * 12;
      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`;
      card.style.transition = "transform 0.1s ease";
      if (shineRef.current) {
        shineRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.18) 0%, transparent 65%)`;
        shineRef.current.style.opacity = "1";
      }
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    if (animFrame.current) cancelAnimationFrame(animFrame.current);
    const card = ref.current;
    if (!card) return;
    card.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    card.style.transition = "transform 0.5s ease";
    if (shineRef.current) shineRef.current.style.opacity = "0";
  }, []);

  return { ref, shineRef, onMouseMove, onMouseLeave };
}

/* ─── PDF / Image Modal ─────────────────────────────────── */
function CertModal({ onClose, certPdf, certImage, title }) {
  const [mode, setMode] = useState("pdf"); // "pdf" | "image"

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-5xl bg-slate-950 rounded-2xl border border-slate-700/80 overflow-hidden shadow-2xl shadow-cyan-500/10 flex flex-col"
        style={{ maxHeight: "92vh" }}
        initial={{ scale: 0.88, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900/80 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-white">{title}</span>
            {/* Toggle Tabs */}
            <div className="flex items-center gap-1 ml-3 bg-slate-800 rounded-lg p-0.5">
              {[
                { key: "pdf", label: "📄 PDF" },
                { key: "image", label: "🖼️ Image" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setMode(tab.key)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition ${
                    mode === tab.key
                      ? "bg-cyan-600 text-white shadow"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={certPdf}
              download="GitHub-Foundation-Certificate.pdf"
              className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-medium px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 transition hover:bg-cyan-500/20"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-gray-400 hover:text-white transition"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-auto bg-slate-950 min-h-0">
          {mode === "pdf" ? (
            <div className="w-full h-full" style={{ minHeight: "75vh" }}>
              <embed
                src={certPdf}
                type="application/pdf"
                className="w-full"
                style={{ height: "75vh" }}
              />
              {/* Fallback for mobile */}
              <div className="p-4 text-center text-sm text-gray-500 border-t border-slate-800">
                PDF not rendering?{" "}
                <a href={certPdf} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                  Open in new tab
                </a>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center p-6 min-h-[75vh]">
              <img
                src={certImage}
                alt="GitHub Foundation Certificate"
                className="max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl"
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
      {/* PDF/Image Modal */}
      {modalOpen && (
        <CertModal
          onClose={() => setModalOpen(false)}
          certPdf={CERT.certPdf}
          certImage={CERT.certImage}
          title={CERT.title}
        />
      )}

      <div className="relative isolate px-4 sm:px-6 pt-20 lg:px-8 min-h-screen">
        {/* Background glow */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#6366f1] to-[#06b6d4] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>

        <div className="mx-auto max-w-6xl py-12">
          {/* ── Page Header ── */}
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
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              Industry Verified · Microsoft
            </motion.span>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              My <span className="text-cyan-400">Certifications</span>
            </h1>
            <p className="mt-4 text-lg text-gray-400 max-w-xl mx-auto">
              Industry-recognized credentials validating my technical expertise and commitment to continuous learning.
            </p>
          </motion.div>

          {/* ── Main Card: Split Layout ── */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* LEFT — Certificate Info */}
            <div className="space-y-6">
              {/* Title block */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7 hover:border-cyan-500/30 transition duration-300">
                {/* Issuer row */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{CERT.issuer}</p>
                    <p className="text-xs font-mono text-cyan-400/80 mt-0.5">Exam: {CERT.examCode}</p>
                  </div>
                  <span className="ml-auto flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full text-emerald-400 bg-emerald-400/10 border border-emerald-400/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Active
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-white mb-3">{CERT.title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed">{CERT.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {CERT.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 text-xs font-medium text-cyan-300 bg-cyan-900/30 rounded-full border border-cyan-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/30 transition duration-300">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Skills Validated</p>
                <div className="grid grid-cols-1 gap-2.5">
                  {CERT.skills.map((skill, i) => (
                    <motion.div
                      key={skill.label}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/30 hover:bg-slate-800 transition"
                    >
                      <svg className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="text-sm text-gray-300">{skill.label}</span>
                      <svg className="w-3.5 h-3.5 text-cyan-400 ml-auto flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Credential Info */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/30 transition duration-300">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Credential Details</p>
                <div className="space-y-3">
                  {[
                    { label: "Credential ID", value: CERT.credentialId, mono: true, color: "text-gray-100" },
                    { label: "Cert Number", value: CERT.certificationNumber, mono: true, color: "text-gray-100" },
                    { label: "Earned", value: CERT.earnedDate, mono: false, color: "text-emerald-400" },
                    { label: "Expires", value: CERT.expiryDate, mono: false, color: "text-amber-400" },
                  ].map((row, i) => (
                    <div key={row.label}>
                      {i > 0 && <div className="border-t border-slate-800 mb-3" />}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{row.label}</span>
                        <span className={`text-xs font-medium ${row.mono ? "font-mono tracking-wider" : ""} ${row.color}`}>
                          {row.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setModalOpen(true)}
                  className="flex flex-col items-center justify-center gap-1.5 bg-cyan-600 text-white py-3.5 rounded-xl hover:bg-cyan-500 transition text-xs font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Cert
                </button>
                <a
                  href={CERT.msLearnUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-1.5 bg-slate-800 text-white py-3.5 rounded-xl hover:bg-slate-700 transition text-xs font-semibold border border-slate-700 hover:border-cyan-500/50 hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  Verify
                </a>
                <a
                  href={CERT.certPdf}
                  download="GitHub-Foundation-Certificate.pdf"
                  className="flex flex-col items-center justify-center gap-1.5 bg-slate-800 text-white py-3.5 rounded-xl hover:bg-slate-700 transition text-xs font-semibold border border-slate-700 hover:border-indigo-500/50 hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </a>
              </div>
            </div>

            {/* RIGHT — 3D Certificate Showcase */}
            <div className="flex flex-col items-center gap-6">
              {/* 3D Tilt Card */}
              <div className="w-full">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 text-center">
                  Certificate Preview · <span className="text-cyan-400 normal-case font-normal">hover to interact</span>
                </p>
                <div
                  ref={tilt.ref}
                  onMouseMove={tilt.onMouseMove}
                  onMouseLeave={tilt.onMouseLeave}
                  className="relative rounded-2xl overflow-hidden cursor-pointer select-none shadow-2xl shadow-black/60"
                  style={{ willChange: "transform" }}
                  onClick={() => setModalOpen(true)}
                >
                  {/* Certificate Image */}
                  {imgError ? (
                    <div className="aspect-video bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center">
                      <p className="text-gray-500 text-sm text-center px-8">
                        Place <code className="text-cyan-400 bg-cyan-400/10 px-1.5 py-0.5 rounded text-xs">github-foundation-cert.png</code> in <code className="text-cyan-400 bg-cyan-400/10 px-1.5 py-0.5 rounded text-xs">public/</code>
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

                  {/* Moving Shine Overlay */}
                  <div
                    ref={tilt.shineRef}
                    className="absolute inset-0 pointer-events-none transition-opacity duration-200"
                    style={{ opacity: 0, borderRadius: "inherit" }}
                  />

                  {/* Click to view overlay */}
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition duration-300 flex items-center justify-center opacity-0 hover:opacity-100 rounded-2xl">
                    <div className="flex items-center gap-2 bg-black/70 backdrop-blur-sm text-white text-sm font-medium px-5 py-2.5 rounded-full border border-white/20">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                      Click to view full certificate
                    </div>
                  </div>

                  {/* Corner shimmer accents */}
                  <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-tl-2xl pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-indigo-400/20 to-transparent rounded-br-2xl pointer-events-none" />
                </div>
              </div>

              {/* Microsoft Learn Share Card */}
              <motion.a
                href={CERT.msLearnUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full group bg-gradient-to-r from-slate-900 to-slate-900 border border-slate-700 hover:border-cyan-500/50 rounded-2xl p-5 transition duration-300 hover:shadow-xl hover:shadow-cyan-500/10"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0078d4] to-[#004ba0] flex items-center justify-center flex-shrink-0 shadow-lg">
                    {/* Microsoft logo */}
                    <svg viewBox="0 0 23 23" className="w-6 h-6" fill="none">
                      <rect x="1" y="1" width="10" height="10" fill="#F25022" />
                      <rect x="12" y="1" width="10" height="10" fill="#7FBA00" />
                      <rect x="1" y="12" width="10" height="10" fill="#00A4EF" />
                      <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white group-hover:text-cyan-400 transition">Microsoft Learn</p>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">Verified credential · share &amp; verify online</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </motion.a>

              {/* Floating stats row */}
              <div className="w-full grid grid-cols-3 gap-3">
                {[
                  { label: "Exam Score", value: "Pass", sub: "GH-900", color: "emerald" },
                  { label: "Renews", value: "2028", sub: "Jul 15, 2028", color: "cyan" },
                  { label: "Level", value: "Found.", sub: "Entry level", color: "indigo" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className={`bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-center hover:border-${s.color}-500/30 transition`}
                  >
                    <p className={`text-lg font-bold text-${s.color}-400`}>{s.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{s.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bottom note */}
          <motion.p
            className="text-center text-gray-600 text-sm mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            More certifications coming soon — currently preparing for advanced exams.
          </motion.p>
        </div>

        {/* Bottom glow */}
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#6366f1] to-[#06b6d4] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
        </div>
      </div>
    </>
  );
}
