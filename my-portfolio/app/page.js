"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const ROLES = [
  "Full Stack Web Developer",
  "Next.js & MERN Stack Developer",
  "Java & DSA ",
  "Open to Work ",
];

const SKILLS = [
  { name: "Next.js", level: "Advanced" },
  { name: "React.js", level: "Advanced" },
  { name: "Java & DSA", level: "Strong" },
  { name: "Tailwind CSS", level: "Advanced" },
  { name: "JavaScript", level: "Advanced" },
  { name: "Framer Motion", level: "Intermediate" },
  { name: "Node.js", level: "Learning" },
  { name: "MongoDB", level: "Beginner" },
];

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
    <span className="text-cyan-400">
      {text}
      <span className="animate-pulse ml-0.5">|</span>
    </span>
  );
}

export default function Home() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      {/* Background Glow */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#06b6d4] to-[#3b82f6] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      {/* Hero */}
      <motion.div
        className="mx-auto max-w-2xl py-20 sm:py-32"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        <div className="text-center">
          <motion.div variants={item} className="mb-5">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for Opportunities
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
          >
            Hi, I&apos;m Yogendra Singh
          </motion.h1>

          <motion.div variants={item} className="mt-4 text-xl sm:text-2xl font-semibold h-9">
            <Typewriter words={ROLES} />
          </motion.div>

          <motion.p variants={item} className="mt-6 text-lg leading-8 text-gray-400">
            MCA candidate at{" "}
            <span className="text-white font-medium">HNB Garhwal University</span> — building
            scalable web apps with{" "}
            <span className="text-cyan-400">React.js</span> and{" "}
            <span className="text-cyan-400">Next.js</span>,{" "}
            {/* <span className="text-cyan-400">Java</span>. */}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/projects"
              className="rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 transition hover:shadow-cyan-500/30 hover:shadow-lg"
            >
              View My Work
            </Link>
            <Link
              href="/contact"
              className="text-sm font-semibold leading-6 text-white hover:text-cyan-400 transition"
            >
              Contact Me <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Skills Teaser */}
      <div className="mx-auto max-w-4xl pb-20">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-white">My Tech Arsenal</h2>
          <p className="text-gray-500 mt-2">Tools I use to bring ideas to life</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {SKILLS.map((skill, index) => (
            <motion.div key={index} variants={item} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
              <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-cyan-500/50 transition duration-300 hover:shadow-lg hover:shadow-cyan-500/10 group cursor-default">
                <h3 className="text-sm font-semibold text-gray-200 group-hover:text-cyan-400 transition">
                  {skill.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{skill.level}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          <Link href="/skills" className="text-sm text-cyan-400 hover:text-cyan-300 transition font-medium">
            View detailed skill breakdown →
          </Link>
        </motion.div>
      </div>

      {/* Bottom Glow */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#06b6d4] to-[#3b82f6] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
      </div>
    </div>
  );
}