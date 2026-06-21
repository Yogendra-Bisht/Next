"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const PROJECTS = [
  {
    title: "Student Accommodation Platform",
    description:
      "Full-stack platform to streamline accommodation discovery for students near universities. RESTful API with Node.js & Express.js, MongoDB for storage, and auth with search/filter features.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    githubLink: "https://github.com/Yogendra-Bisht/SRAP",
    liveLink: "https://srap-ten.vercel.app/",
    status: "Live",
    statusStyle: "text-amber-400 bg-amber-400/10 border border-amber-400/30",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Portfolio Website",
    description:
      "Responsive personal portfolio built with Next.js and Tailwind CSS. Features SSR, CI/CD on Vercel, and an AI chatbot powered by GPT-4o mini that answers questions about me in real time.",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "OpenAI"],
    githubLink: "https://github.com/Yogendra-Bisht/Next/tree/main/my-portfolio",
    liveLink: "https://my-portfolio-nine-jet-47.vercel.app/",
    status: "Live",
    statusStyle: "text-emerald-400 bg-emerald-400/10 border border-emerald-400/30",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Utility Toolbox",
    description:
      "Modular utility web app with a password generator, OTP generator, and random number generator. Reusable component architecture reduced redundant code by ~40%.",
    techStack: ["Next.js", "React.js", "Tailwind CSS"],
    githubLink: "https://github.com/Yogendra-Bisht/Next/tree/main/first",
    liveLink: "https://utility-toolbox-phi.vercel.app",
    status: "Live",
    statusStyle: "text-emerald-400 bg-emerald-400/10 border border-emerald-400/30",
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "zodify-json",
    tagline: "Client-Side JSON to Zod Schema Generator",
    description:
      "A lightning-fast developer utility that dynamically parses raw JSON objects entirely in the browser and instantly generates valid Zod validation schemas along with inferred TypeScript type definitions — eliminating runtime validation boilerplate.",
    techStack: ["Next.js", "React", "Tailwind CSS", "Google Antigravity", "Vercel"],
    githubLink: "https://github.com/Yogendra-Bisht/zodify-json",
    liveLink: "https://zodify-json.vercel.app",
    status: "Live",
    statusStyle: "text-emerald-400 bg-emerald-400/10 border border-emerald-400/30",
    color: "from-violet-500 to-indigo-500",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Projects() {
  return (
    <div className="relative isolate px-6 pt-20 lg:px-8 min-h-screen">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#06b6d4] to-[#3b82f6] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="mx-auto max-w-6xl py-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            My <span className="text-cyan-400">Work</span>
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Projects that showcase my passion for building real-world solutions.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {PROJECTS.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariant}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col"
            >
              {/* Gradient Banner */}
              <div className={`h-44 w-full bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-white/10" />
                <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-white/10" />
                <div className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full ${project.statusStyle}`}>
                  {project.status === "Live" && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
                  )}
                  {project.status}
                </div>
                <div className="absolute bottom-4 left-5 right-4">
                  <h3 className="text-lg font-bold text-white drop-shadow leading-tight">{project.title}</h3>
                  {project.tagline && (
                    <p className="text-xs text-white/70 mt-0.5 font-medium drop-shadow">{project.tagline}</p>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <p className="text-gray-400 text-sm mb-4 flex-grow">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-medium text-cyan-300 bg-cyan-900/30 rounded-full border border-cyan-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-auto">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-700 transition text-sm font-medium border border-slate-700"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    Code
                  </a>
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-500 transition text-sm font-medium shadow-lg shadow-cyan-500/20"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}