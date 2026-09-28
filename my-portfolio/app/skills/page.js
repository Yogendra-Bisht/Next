"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Server,
  Container,
  Cloud,
  Code2,
  Cpu,
  Wrench,
  Sparkles,
  Rocket,
  ShieldCheck,
  Terminal,
  Zap,
  Globe,
  Database,
  GitBranch,
  Layers,
  CheckCircle2
} from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "All Arsenal" },
  { id: "devops", label: "DevOps & Cloud", highlight: true },
  { id: "frontend", label: "Frontend Architecture" },
  { id: "backend", label: "Backend & Core CS" },
  { id: "tools", label: "Tools & Infrastructure" },
];

const SKILL_SECTIONS = [
  {
    id: "devops",
    icon: Server,
    title: "DevOps & Cloud Infrastructure",
    badge: "Core Specialization",
    description: "System administration, container management, cloud deployments & CI/CD automation.",
    skills: [
      { name: "Linux Systems & CLI (RHEL/Ubuntu)", level: 90, status: "Advanced", tags: ["Bash", "Systemd", "Permissions", "Nginx"] },
      { name: "Docker & Containerization", level: 88, status: "Advanced", tags: ["Dockerfile", "Docker Compose", "Multi-stage"] },
      { name: "AWS Cloud Services", level: 80, status: "Practitioner", tags: ["EC2", "S3", "IAM", "VPC Basics"] },
      { name: "CI/CD & Automation", level: 85, status: "Proficient", tags: ["GitHub Actions", "Vercel CI/CD", "Workflows"] },
      { name: "Nginx & Web Servers", level: 82, status: "Proficient", tags: ["Reverse Proxy", "SSL/TLS", "Virtual Hosts"] },
    ],
  },
  {
    id: "frontend",
    icon: Globe,
    title: "Frontend & UI Engineering",
    badge: "Production Ready",
    description: "Crafting modern, accessible, and high-performance Web User Interfaces.",
    skills: [
      { name: "Next.js 16 (App Router)", level: 92, status: "Advanced", tags: ["SSR", "Server Actions", "Turbopack"] },
      { name: "React 19 & Hooks", level: 90, status: "Advanced", tags: ["Concurrent UI", "Context API", "Custom Hooks"] },
      { name: "Tailwind CSS v4 & Modern CSS", level: 95, status: "Expert", tags: ["Glassmorphism", "Responsive", "Design Tokens"] },
      { name: "JavaScript (ES6+)", level: 90, status: "Advanced", tags: ["Async/Await", "DOM", "Closures"] },
      { name: "Framer Motion", level: 85, status: "Proficient", tags: ["Layout Animations", "Page Transitions"] },
    ],
  },
  {
    id: "backend",
    icon: Cpu,
    title: "Backend Architecture & Core CS",
    badge: "Algorithmic Foundation",
    description: "Data Structures, Object-Oriented System Design, and API Development.",
    skills: [
      { name: "Java (Core & Advanced)", level: 90, status: "Advanced", tags: ["OOP", "Collections", "Multithreading"] },
      { name: "Data Structures & Algorithms", level: 88, status: "Strong", tags: ["Arrays", "Trees", "Graphs", "DP"] },
      { name: "RESTful API Development", level: 85, status: "Proficient", tags: ["Node.js", "Express.js", "JSON APIs"] },
      { name: "MongoDB & NoSQL", level: 75, status: "Intermediate", tags: ["Mongoose", "Aggregation", "CRUD"] },
    ],
  },
  {
    id: "tools",
    icon: Wrench,
    title: "Developer Tools & Workflows",
    badge: "Workflow Efficiency",
    description: "Version control, API debugging, IDE tooling, and environment setup.",
    skills: [
      { name: "Git & GitHub Workflows", level: 92, status: "Advanced", tags: ["Branching", "Pull Requests", "Rebase"] },
      { name: "VS Code & Remote SSH", level: 95, status: "Expert", tags: ["Extensions", "Dev Containers"] },
      { name: "Postman & API Testing", level: 85, status: "Proficient", tags: ["Endpoint Verification", "Payload Testing"] },
      { name: "npm / pnpm Package Management", level: 88, status: "Proficient", tags: ["Dependencies", "Monorepo Scripts"] },
    ],
  },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSections =
    activeCategory === "all"
      ? SKILL_SECTIONS
      : SKILL_SECTIONS.filter((s) => s.id === activeCategory);

  return (
    <div className="relative isolate px-4 sm:px-6 pt-12 lg:px-8 min-h-screen pb-24">
      {/* Background glow */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#064E3B] to-[#10B981] opacity-25 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="mx-auto max-w-6xl py-8">
        
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#064E3B]/60 border border-[#F8E7C9]/30 text-[#F8E7C9] text-xs font-semibold tracking-wide shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#F8E7C9]" />
            Technical Competence &amp; Stack
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#FAF4E8] sm:text-5xl">
            DevOps &amp; Technical <span className="text-[#F8E7C9] font-serif italic">Arsenal</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#D4C3A3] max-w-2xl mx-auto leading-relaxed">
            A comprehensive matrix of Linux administration, Docker containerization, AWS cloud services, Next.js architecture, and Java DSA logic.
          </p>
        </motion.div>

        {/* Highlight Banner — DevOps Spotlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#064E3B]/80 via-[#043327] to-[#022C22] border border-[#F8E7C9]/30 shadow-2xl backdrop-blur-xl relative overflow-hidden"
        >
          <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
            <Server className="w-72 h-72 text-[#F8E7C9]" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#F8E7C9]/15 text-[#F8E7C9] text-[11px] font-bold tracking-wider uppercase border border-[#F8E7C9]/30">
                <ShieldCheck className="w-3.5 h-3.5 text-[#34D399]" /> Core Focus &amp; Specialty
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#FAF4E8]">
                Linux, Docker &amp; Cloud Infrastructure
              </h2>
              <p className="text-xs sm:text-sm text-[#D4C3A3]/90 max-w-2xl leading-relaxed">
                Specializing in building automated server deployment environments, configuring containerized microservices with Docker Compose, and deploying on AWS cloud infrastructure.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              {["Linux RHEL", "Docker", "AWS EC2/S3", "GitHub Actions", "Nginx"].map((pill) => (
                <span
                  key={pill}
                  className="px-3 py-1.5 rounded-xl bg-[#022C22]/90 text-[#F8E7C9] text-xs font-semibold border border-[#F8E7C9]/25 shadow"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 border ${
                activeCategory === cat.id
                  ? "bg-[#F8E7C9] text-[#022C22] border-[#F8E7C9] shadow-lg shadow-[#F8E7C9]/15 scale-105"
                  : "bg-[#064E3B]/40 text-[#D4C3A3] border-[#F8E7C9]/15 hover:border-[#F8E7C9]/40 hover:text-[#FAF4E8]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skill Sections Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {filteredSections.map((section, idx) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.id}
                  className="p-8 bg-[#022C22]/85 backdrop-blur-xl border border-[#F8E7C9]/20 rounded-3xl hover:border-[#F8E7C9]/45 transition duration-300 shadow-xl flex flex-col justify-between"
                >
                  <div>
                    {/* Card Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#064E3B] border border-[#F8E7C9]/30 flex items-center justify-center text-[#F8E7C9] shadow-md">
                          <Icon className="w-5 h-5 text-[#F8E7C9]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#FAF4E8]">{section.title}</h3>
                          <span className="text-[10px] uppercase tracking-wider text-[#F8E7C9] font-mono">
                            {section.badge}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-[#D4C3A3]/80 mb-6">{section.description}</p>

                    {/* Skill Bars & Tags */}
                    <div className="space-y-6">
                      {section.skills.map((skill, sIdx) => (
                        <div key={sIdx} className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-[#FAF4E8] flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399]" />
                              {skill.name}
                            </span>
                            <span className="font-mono text-xs text-[#F8E7C9] font-bold bg-[#064E3B]/60 px-2 py-0.5 rounded border border-[#F8E7C9]/20">
                              {skill.status}
                            </span>
                          </div>

                          {/* Progress Meter */}
                          <div className="w-full bg-[#064E3B]/50 rounded-full h-2.5 overflow-hidden border border-[#F8E7C9]/10">
                            <motion.div
                              className="bg-gradient-to-r from-[#F8E7C9] to-[#34D399] h-2.5 rounded-full shadow-sm"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, ease: "easeOut", delay: sIdx * 0.08 }}
                              viewport={{ once: true }}
                            />
                          </div>

                          {/* Skill Tags */}
                          {skill.tags && (
                            <div className="flex flex-wrap gap-1.5 pt-0.5">
                              {skill.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] px-2 py-0.5 rounded-md bg-[#041C16] text-[#D4C3A3]/90 border border-[#F8E7C9]/10"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Continuous Learning / Upcoming Tech Focus Card */}
            {(activeCategory === "all" || activeCategory === "devops") && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 bg-gradient-to-br from-[#064E3B]/70 via-[#033B2D] to-[#022C22] border border-[#F8E7C9]/35 rounded-3xl flex flex-col justify-center items-center text-center shadow-xl relative overflow-hidden"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#064E3B] border border-[#F8E7C9]/40 flex items-center justify-center text-[#F8E7C9] mb-4 shadow-md">
                  <Rocket className="w-7 h-7 text-[#F8E7C9] animate-bounce" />
                </div>
                <h3 className="text-2xl font-bold text-[#FAF4E8] mb-2">Expanding DevOps Stack</h3>
                <p className="text-[#D4C3A3] text-xs mb-6 max-w-xs leading-relaxed">
                  Continuously mastering modern cloud orchestration and infrastructure-as-code tooling.
                </p>
                <div className="flex gap-2 flex-wrap justify-center max-w-xs">
                  {["Kubernetes Basics", "Terraform IaC", "Prometheus & Grafana", "Microservices Security"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-[#022C22]/90 rounded-full text-xs font-semibold text-[#F8E7C9] border border-[#F8E7C9]/30 shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}