"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Code2,
  Terminal,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Cpu,
  Layers,
  Zap,
  Globe,
  Database,
  Copy,
  Check,
  FolderGit2,
  Server,
  Cloud,
  Box,
  Container
} from "lucide-react";

const ROLES = [
  "DevOps & Cloud Enthusiast",
  "Linux & Docker Specialist",
  "Next.js & React Architect",
  "Java & DSA Engineer",
  "Actively Seeking Opportunities",
];

const BENTO_SKILLS = [
  { name: "DevOps & Linux", level: "Core Focus", desc: "Linux OS, Shell Scripting, Systems Admin & Nginx", icon: Server, highlight: true },
  { name: "Docker & Containers", level: "Advanced", desc: "Containerization, Multi-Stage Builds, Compose", icon: Container, highlight: true },
  { name: "AWS & Cloud", level: "Practitioner", desc: "EC2, S3, IAM, Cloud Architecture & Deployments", icon: Cloud, highlight: true },
  { name: "Next.js 16 & React 19", level: "Advanced", desc: "App Router, SSR, Server Actions, Modern UI", icon: Globe, highlight: false },
  { name: "Java & DSA", level: "Strong", desc: "OOP Principles, Data Structures & Algorithmic Logic", icon: Cpu, highlight: false },
  { name: "CI/CD & Automation", level: "Proficient", desc: "GitHub Actions, Automated Pipelines, Vercel", icon: Zap, highlight: false },
];

const IDE_SNIPPETS = {
  "developer.config.js": `// Yogendra Bisht — Software & DevOps Engineer
export const developer = {
  name: "Yogendra Singh Bisht",
  degree: "MCA Graduate '26 @ HNB Garhwal University",
  status: "Actively Looking for Opportunities 🚀",
  location: "Uttarakhand, India",
  specializations: ["DevOps", "Linux", "Docker", "AWS", "Next.js", "Java DSA"],
  philosophy: "Bridging seamless cloud infrastructure with high-performance web architecture."
};`,
  "stack.json": `{
  "devops": ["Linux Admin", "Docker Containers", "AWS Cloud", "GitHub Actions"],
  "webTech": "Next.js 16.1 (App Router) + React 19",
  "coreLogic": "Java (DSA) + Node.js APIs",
  "styling": "Tailwind CSS v4 + Glassmorphism",
  "certification": "GitHub Foundations (GH-900)"
}`,
  "terminal.sh": `$ docker-compose up -d --build
[+] Building 2.4s (12/12) FINISHED
 ✔ Container app-web         Started
 ✔ Container devops-pipeline  Running

$ aws sts get-caller-identity
✔ AWS Cloud Credentials Verified
⚡ Ready for high-concurrency deployment!`
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function Typewriter({ words }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    let timeout;
    if (!deleting && text.length < word.length) {
      timeout = setTimeout(() => setText(word.slice(0, text.length + 1)), 75);
    } else if (!deleting && text.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), 40);
    } else {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words]);

  return (
    <span className="text-[#F8E7C9] font-mono">
      {text}
      <span className="animate-pulse ml-0.5 text-[#34D399]">|</span>
    </span>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("developer.config.js");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(IDE_SNIPPETS[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative isolate px-4 sm:px-6 pt-10 lg:px-8 min-h-screen">
      {/* Subtle Background Glow Blobs */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#064E3B] to-[#10B981] opacity-25 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      {/* Hero Workstation Section */}
      <div className="mx-auto max-w-6xl py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column — Editorial Intro */}
          <motion.div
            className="lg:col-span-7 text-left"
            initial="hidden"
            animate="visible"
            variants={container}
          >
            <motion.div variants={item} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#064E3B]/60 border border-[#F8E7C9]/30 text-[#F8E7C9] text-xs font-semibold tracking-wide shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
                Available for Full-Time &amp; Internship Roles
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#FAF4E8] leading-[1.1]"
            >
              Building modern software with <span className="text-[#F8E7C9] font-serif italic">precision</span> &amp; elegance.
            </motion.h1>

            <motion.div variants={item} className="mt-5 text-xl sm:text-2xl font-semibold h-9 flex items-center gap-2 text-[#D4C3A3]">
              <span className="text-xs uppercase tracking-widest text-[#D4C3A3]/60 font-sans">Role:</span>
              <Typewriter words={ROLES} />
            </motion.div>

            <motion.p variants={item} className="mt-6 text-base sm:text-lg leading-relaxed text-[#D4C3A3]">
              Hi, I&apos;m <span className="text-[#FAF4E8] font-semibold">Yogendra Singh Bisht</span> — MCA Graduate from{" "}
              <span className="text-[#F8E7C9]">HNB Garhwal University</span> specializing in{" "}
              <span className="text-[#FAF4E8] font-medium">DevOps (Linux, Docker, AWS)</span>,{" "}
              <span className="text-[#FAF4E8] font-medium">Next.js &amp; React</span>, and{" "}
              <span className="text-[#FAF4E8] font-medium">Java DSA</span>. I engineer scalable cloud infrastructure and high-performance web applications.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/projects"
                className="px-6 py-3.5 rounded-full bg-[#F8E7C9] text-[#022C22] font-semibold text-sm shadow-xl shadow-[#F8E7C9]/15 hover:bg-[#FAF4E8] hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <FolderGit2 className="w-4 h-4" />
                Explore My Work
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-full border border-[#F8E7C9]/30 bg-[#064E3B]/30 text-[#FAF4E8] font-medium text-sm hover:border-[#F8E7C9] hover:bg-[#064E3B]/60 transition-all duration-300 flex items-center gap-2"
              >
                Get In Touch <ArrowRight className="w-4 h-4 text-[#F8E7C9]" />
              </Link>
            </motion.div>

            {/* Quick Metrics */}
            <motion.div variants={item} className="mt-12 pt-8 border-t border-[#F8E7C9]/15 grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl font-bold text-[#F8E7C9]">GH-900</p>
                <p className="text-xs text-[#D4C3A3]/70 mt-0.5">GitHub Certified</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#F8E7C9]">DevOps</p>
                <p className="text-xs text-[#D4C3A3]/70 mt-0.5">Linux, Docker, AWS</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#F8E7C9]">MCA &apos;26</p>
                <p className="text-xs text-[#D4C3A3]/70 mt-0.5">Post-Grad Alumnus</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column — Interactive Code IDE Widget */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-[#041C16] border border-[#F8E7C9]/25 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden backdrop-blur-xl">
              
              {/* Window Controls Header */}
              <div className="bg-[#064E3B]/60 px-4 py-3 border-b border-[#F8E7C9]/15 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 text-xs font-mono text-[#D4C3A3]/70 flex items-center gap-1">
                    <Terminal className="w-3.5 h-3.5 text-[#F8E7C9]" /> developer-workspace
                  </span>
                </div>
                <button
                  onClick={handleCopy}
                  className="text-xs text-[#D4C3A3] hover:text-[#F8E7C9] flex items-center gap-1 px-2 py-1 rounded bg-[#022C22]/50 border border-[#F8E7C9]/15 transition"
                  title="Copy code snippet"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#34D399]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>

              {/* IDE Tabs */}
              <div className="flex border-b border-[#F8E7C9]/15 bg-[#022C22]/80 overflow-x-auto">
                {Object.keys(IDE_SNIPPETS).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-xs font-mono transition border-r border-[#F8E7C9]/10 ${
                      activeTab === tab
                        ? "bg-[#041C16] text-[#F8E7C9] border-t-2 border-t-[#F8E7C9] font-bold"
                        : "text-[#D4C3A3]/60 hover:text-[#FAF4E8] hover:bg-[#064E3B]/30"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Code Content */}
              <div className="p-5 font-mono text-xs leading-relaxed text-[#FAF4E8] overflow-x-auto min-h-[220px]">
                <pre className="whitespace-pre-wrap">{IDE_SNIPPETS[activeTab]}</pre>
              </div>

              {/* Status Bar Footer */}
              <div className="bg-[#022C22] px-4 py-2 border-t border-[#F8E7C9]/15 flex items-center justify-between text-[11px] text-[#D4C3A3]/70 font-mono">
                <span className="flex items-center gap-1.5 text-[#34D399]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Vercel CI/CD: Passing
                </span>
                <span>UTF-8 · JavaScript</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bento Grid Tech Arsenal */}
      <div className="mx-auto max-w-6xl py-12 pb-24">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-bold text-[#F8E7C9] uppercase tracking-widest">Stack Architecture</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FAF4E8] mt-1">My Tech Arsenal</h2>
          <p className="text-[#D4C3A3]/80 text-sm mt-2 max-w-md mx-auto">
            Core technologies and tools I leverage daily to engineer scalable web solutions.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {BENTO_SKILLS.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`p-6 rounded-2xl border transition duration-300 flex flex-col justify-between ${
                  skill.highlight
                    ? "bg-[#064E3B]/40 border-[#F8E7C9]/40 shadow-xl shadow-black/50"
                    : "bg-[#022C22]/80 border-[#F8E7C9]/15 hover:border-[#F8E7C9]/40"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#064E3B] border border-[#F8E7C9]/30 flex items-center justify-center text-[#F8E7C9]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-[#F8E7C9]/10 text-[#F8E7C9] border border-[#F8E7C9]/25">
                      {skill.level}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#FAF4E8]">{skill.name}</h3>
                  <p className="text-xs text-[#D4C3A3]/80 mt-1">{skill.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="text-center mt-10">
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 text-sm text-[#F8E7C9] hover:underline font-semibold"
          >
            View detailed technical proficiency matrix <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}