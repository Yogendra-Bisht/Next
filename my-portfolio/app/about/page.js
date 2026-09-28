"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, FileText, Brain, Palette, Rocket, MapPin, Mail, Phone, Sparkles } from "lucide-react";

const EDUCATION = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "HNB Garhwal University",
    period: "2024 - 2026",
    icon: GraduationCap,
    highlight: true,
  },
  {
    degree: "B.Sc. — Physics, Mathematics & IT",
    institution: "S.S.J. Campus, Almora",
    period: "2021 – 2024",
    icon: BookOpen,
    highlight: false,
  },
  {
    degree: "Class XII (Senior Secondary)",
    institution: "Percentage: 85.2%",
    period: "2021",
    icon: FileText,
    highlight: false,
  },
  {
    degree: "Class X (Secondary)",
    institution: "Percentage: 82.6%",
    period: "2019",
    icon: FileText,
    highlight: false,
  },
];

const STRENGTHS = [
  {
    icon: Brain,
    title: "DevOps & Cloud Systems",
    desc: "Proficient in Linux administration, Docker containerization, AWS cloud services (EC2, S3, IAM), and GitHub Actions CI/CD.",
  },
  {
    icon: Palette,
    title: "Frontend Architecture",
    desc: "Passionate about creating fluid, responsive user interfaces with React 19, Next.js 16, Tailwind CSS v4, and Framer Motion.",
  },
  {
    icon: Rocket,
    title: "Algorithmic Systems",
    desc: "Strong foundation in Java Data Structures & Algorithms, building structured backend logic and performant web solutions.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function About() {
  return (
    <div className="relative isolate px-4 sm:px-6 pt-12 lg:px-8 min-h-screen pb-24">
      {/* Background glow */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#064E3B] to-[#10B981] opacity-25 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="mx-auto max-w-4xl py-8">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#064E3B]/60 border border-[#F8E7C9]/30 text-[#F8E7C9] text-xs font-semibold tracking-wide shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#F8E7C9]" />
            Developer Profile
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#FAF4E8] sm:text-5xl">
            About <span className="text-[#F8E7C9] font-serif italic">Yogendra</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#D4C3A3] max-w-2xl mx-auto">
            DevOps &amp; Software Engineer dedicated to cloud infrastructure, clean code, and high-performance digital experiences.
          </p>
        </motion.div>

        {/* Bio Card */}
        <motion.div
          className="bg-[#064E3B]/30 border border-[#F8E7C9]/25 rounded-3xl p-6 sm:p-8 mb-16 backdrop-blur-xl shadow-2xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="shrink-0 w-14 h-14 rounded-2xl bg-[#064E3B] border border-[#F8E7C9]/40 flex items-center justify-center text-[#F8E7C9] shadow-md">
              <Sparkles className="w-7 h-7 text-[#F8E7C9]" />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-[#FAF4E8]">Hey, I&apos;m Yogendra Singh Bisht</h2>
              <p className="text-[#D4C3A3] leading-relaxed text-sm sm:text-base">
                I&apos;m an <span className="text-[#FAF4E8] font-semibold">MCA Graduate (2026)</span> from{" "}
                <span className="text-[#F8E7C9] font-semibold">HNB Garhwal University</span> specializing in{" "}
                <span className="text-[#FAF4E8] font-medium">DevOps (Linux, Docker, AWS)</span>,{" "}
                <span className="text-[#F8E7C9] font-semibold">Next.js &amp; React Architecture</span>, and{" "}
                <span className="text-[#FAF4E8] font-medium">Java DSA</span>. I bridge continuous cloud integration with modern user experiences.
              </p>
              <p className="text-[#D4C3A3] leading-relaxed text-sm sm:text-base">
                I am actively seeking full-time opportunities in DevOps, Software Engineering, and Cloud Systems — ready to bring technical reliability and scalable software design to high-impact teams.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#F8E7C9]/15">
                <span className="text-xs text-[#FAF4E8] flex items-center gap-1.5 bg-[#022C22]/80 px-3 py-1.5 rounded-full border border-[#F8E7C9]/20">
                  <MapPin className="w-3.5 h-3.5 text-[#F8E7C9]" /> Uttarakhand, India
                </span>
                <span className="text-xs text-[#FAF4E8] flex items-center gap-1.5 bg-[#022C22]/80 px-3 py-1.5 rounded-full border border-[#F8E7C9]/20">
                  <Phone className="w-3.5 h-3.5 text-[#F8E7C9]" /> +91 94563 11336
                </span>
                <a href="mailto:bishtyogendra96436372@gmail.com" className="text-xs text-[#F8E7C9] hover:underline flex items-center gap-1.5 bg-[#022C22]/80 px-3 py-1.5 rounded-full border border-[#F8E7C9]/20">
                  <Mail className="w-3.5 h-3.5 text-[#F8E7C9]" /> bishtyogendra96436372@gmail.com
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Strengths Grid */}
        <motion.div
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={fadeUp} className="text-2xl font-bold text-[#FAF4E8] mb-8 text-center">
            What I Bring
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STRENGTHS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-6 bg-[#022C22]/80 border border-[#F8E7C9]/20 rounded-2xl hover:border-[#F8E7C9]/50 transition duration-300 text-center shadow-lg"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#064E3B] border border-[#F8E7C9]/30 flex items-center justify-center text-[#F8E7C9] mx-auto mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#FAF4E8] mb-2">{s.title}</h3>
                  <p className="text-xs text-[#D4C3A3] leading-relaxed">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Education Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={fadeUp} className="text-2xl font-bold text-[#FAF4E8] mb-10 text-center">
            Academic Background
          </motion.h2>

          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-[#F8E7C9]/20 md:left-1/2" />

            <div className="space-y-8">
              {EDUCATION.map((edu, i) => {
                const Icon = edu.icon;
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className={`relative flex items-start gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    {/* Node on line */}
                    <div className="absolute left-6 w-3.5 h-3.5 rounded-full bg-[#F8E7C9] border-2 border-[#022C22] -translate-x-1/2 mt-4 md:left-1/2 shadow" />

                    <div className="hidden md:block w-1/2" />

                    <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pl-10" : "md:pr-10 md:text-right"}`}>
                      <div
                        className={`p-6 rounded-2xl border transition duration-300 shadow-xl ${
                          edu.highlight
                            ? "bg-[#064E3B]/50 border-[#F8E7C9]/40"
                            : "bg-[#022C22]/80 border-[#F8E7C9]/15 hover:border-[#F8E7C9]/35"
                        }`}
                      >
                        <div className={`flex items-center gap-2 mb-2 ${i % 2 !== 0 ? "md:justify-end" : ""}`}>
                          <Icon className="w-4 h-4 text-[#F8E7C9]" />
                          <span className="text-xs text-[#D4C3A3]/80 font-mono">{edu.period}</span>
                          {edu.highlight && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#34D399]/15 text-[#34D399] font-bold border border-[#34D399]/30">
                              Graduated 2026
                            </span>
                          )}
                        </div>
                        <h3 className="text-[#FAF4E8] font-bold text-base">{edu.degree}</h3>
                        <p className="text-[#D4C3A3] text-xs mt-1">{edu.institution}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16 pt-8 border-t border-[#F8E7C9]/15"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[#D4C3A3] mb-6">Interested in discussing opportunities or projects?</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-[#F8E7C9] text-[#022C22] px-6 py-3 text-sm font-semibold hover:bg-[#FAF4E8] transition shadow-lg"
            >
              Get In Touch
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#F8E7C9]/30 bg-[#064E3B]/30 px-6 py-3 text-sm font-semibold text-[#FAF4E8] hover:border-[#F8E7C9] transition"
            >
              Download Resume ↗
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

