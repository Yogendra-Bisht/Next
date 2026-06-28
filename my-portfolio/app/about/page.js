"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const EDUCATION = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "HNB Garhwal University",
    period: "2024 - 2026",
    icon: "🎓",
    highlight: false,
  },
  {
    degree: "B.Sc. — Physics, Mathematics & IT",
    institution: "S.S.J. Campus, Almora",
    period: "2021 – 2024",
    icon: "📚",
    highlight: false,
  },
  {
    degree: "Class XII",
    institution: "85.2%",
    period: "2021",
    icon: "📄",
    highlight: false,
  },
  {
    degree: "Class X",
    institution: "82.6%",
    period: "2019",
    icon: "📄",
    highlight: false,
  },
];

const STRENGTHS = [
  {
    icon: "🧠",
    title: "Problem Solver",
    desc: "Strong foundation in Data Structures & Algorithms with Java. I approach every challenge analytically.",
  },
  {
    icon: "🎨",
    title: "Frontend Focused",
    desc: "Passionate about building beautiful, responsive UIs using React.js, Next.js, Tailwind CSS, and Framer Motion.",
  },
  {
    icon: "🚀",
    title: "Always Shipping",
    desc: "I don't just learn — I build and deploy. Every project goes through CI/CD and ends up on Vercel.",
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
    <div className="relative isolate px-6 pt-20 lg:px-8 min-h-screen pb-20">
      {/* Background glow */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#7c3aed] to-[#06b6d4] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="mx-auto max-w-4xl py-12">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            About <span className="text-cyan-400">Me</span>
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            A developer who cares deeply about both code quality and user experience.
          </p>
        </motion.div>

        {/* Bio Card */}
        <motion.div
          className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 mb-12 backdrop-blur-sm"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="flex items-start gap-5">
            <div className="shrink-0 w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-3xl">
              👋
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-3">Hey, I&apos;m Yogendra</h2>
              <p className="text-gray-400 leading-relaxed">
                I&apos;m a detail-oriented MCA candidate with a solid foundation in Computer Science and
                hands-on experience building scalable, responsive web applications using{" "}
                <span className="text-cyan-400 font-medium">React.js</span> and{" "}
                <span className="text-cyan-400 font-medium">Next.js</span>. I&apos;m skilled in{" "}
                <span className="text-white font-medium">Data Structures & Algorithms</span> using Java and
                modern front-end technologies including Tailwind CSS and Framer Motion.
              </p>
              <p className="text-gray-400 leading-relaxed mt-3">
                I&apos;m actively expanding my expertise in backend development (Node.js, Express.js),
                TypeScript, and Machine Learning — with a strong drive to deliver impactful,
                production-ready software solutions.
              </p>
              <div className="flex flex-wrap gap-3 mt-5">
                <span className="text-sm text-gray-300">📍 Uttarakhand, India</span>
                <span className="text-sm text-gray-300">📞 +91 94563 11336</span>
                <a href="mailto:bishtyogendra96436372@gmail.com" className="text-sm text-cyan-400 hover:underline">
                  ✉️ Email Me
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Strengths */}
        <motion.div
          className="mb-14"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={fadeUp} className="text-2xl font-bold text-white mb-8 text-center">
            What I Bring
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STRENGTHS.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl hover:border-cyan-500/40 transition duration-300 text-center"
              >
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={fadeUp} className="text-2xl font-bold text-white mb-10 text-center">
            Education
          </motion.h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-700 md:left-1/2" />

            <div className="space-y-8">
              {EDUCATION.map((edu, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className={`relative flex items-start gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Dot on the line */}
                  <div className="absolute left-6 w-3 h-3 rounded-full bg-cyan-500 border-2 border-slate-900 -translate-x-1/2 mt-4 md:left-1/2" />

                  {/* Spacer for alternating layout on md+ */}
                  <div className="hidden md:block w-1/2" />

                  {/* Card */}
                  <div
                    className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pl-10" : "md:pr-10 md:text-right"} `}
                  >
                    <div
                      className={`p-5 rounded-2xl border transition duration-300 ${
                        edu.highlight
                          ? "bg-cyan-500/10 border-cyan-500/30 hover:border-cyan-500/60"
                          : "bg-slate-900/70 border-slate-800 hover:border-slate-600"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{edu.icon}</span>
                        <span className="text-xs text-gray-500 font-medium">{edu.period}</span>
                        {edu.highlight && (
                          <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Current
                          </span>
                        )}
                      </div>
                      <h3 className="text-white font-bold text-sm sm:text-base">{edu.degree}</h3>
                      <p className="text-gray-400 text-sm mt-0.5">{edu.institution}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-400 mb-6">Interested in working together?</p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-500 transition hover:shadow-lg hover:shadow-cyan-500/30"
            >
              Get In Touch
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-white hover:border-cyan-500/50 hover:text-cyan-400 transition"
            >
              Download Resume ↗
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
