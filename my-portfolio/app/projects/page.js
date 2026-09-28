"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Sparkles, Terminal, Code2, Layers, CheckCircle2 } from "lucide-react";

const GithubIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);


const FEATURED_PROJECT = {
  title: "Student Accommodation Platform",
  tagline: "Full-Stack Discovery Platform for Students",
  description:
    "A comprehensive web platform engineered to simplify accommodation discovery near university campuses. Features a RESTful backend built with Node.js & Express, MongoDB document storage, secure JWT user authentication, and interactive search filters.",
  techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "REST API"],
  githubLink: "https://github.com/Yogendra-Bisht/SRAP",
  liveLink: "https://srap-ten.vercel.app/",
  status: "Live Production",
  features: [
    "Location-based university proximity searching",
    "Restful API architecture with JWT Auth",
    "Real-time filter & responsive UI components",
  ],
};

const SECONDARY_PROJECTS = [
  {
    title: "zodify-json",
    tagline: "Client-Side JSON to Zod Schema Generator",
    description:
      "A developer utility that dynamically parses raw JSON objects in browser memory and generates valid Zod validation schemas along with inferred TypeScript types — eliminating manual validation boilerplate.",
    techStack: ["Next.js 16", "React 19", "Tailwind CSS", "TypeScript"],
    githubLink: "https://github.com/Yogendra-Bisht/zodify-json",
    liveLink: "https://zodify-json.vercel.app",
    status: "Live Utility",
  },
  {
    title: "Portfolio Website",
    tagline: "Personal Engineering Portfolio & AI Assistant",
    description:
      "Modern portfolio built with Next.js App Router and Tailwind CSS. Integrated with a streaming Groq LLaMA 3.1 AI chatbot assistant, Framer Motion transitions, and speed insights.",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "Groq AI"],
    githubLink: "https://github.com/Yogendra-Bisht/Next/tree/main/my-portfolio",
    liveLink: "https://my-portfolio-nine-jet-47.vercel.app/",
    status: "Live",
  },
  {
    title: "Utility Toolbox",
    tagline: "Modular Web Utility Suite",
    description:
      "Reusable utility web app featuring a secure password generator, OTP generator, and random number engine. Built with modular component architecture reducing redundant code by 40%.",
    techStack: ["Next.js", "React.js", "Tailwind CSS"],
    githubLink: "https://github.com/Yogendra-Bisht/Next/tree/main/first",
    liveLink: "https://utility-toolbox-phi.vercel.app",
    status: "Live",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Projects() {
  return (
    <div className="relative isolate px-4 sm:px-6 pt-12 lg:px-8 min-h-screen pb-24">
      {/* Background glow */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#064E3B] to-[#10B981] opacity-25 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="mx-auto max-w-6xl py-8">
        
        {/* Page Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#064E3B]/60 border border-[#F8E7C9]/30 text-[#F8E7C9] text-xs font-semibold tracking-wide shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#F8E7C9]" />
            Engineering Showcase
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#FAF4E8] sm:text-5xl">
            Selected <span className="text-[#F8E7C9] font-serif italic">Projects</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#D4C3A3] max-w-xl mx-auto">
            A curated portfolio of full-stack applications, developer utilities, and modern web platforms.
          </p>
        </motion.div>

        {/* FEATURED SHOWCASE PROJECT (Full-Width Editorial Card) */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="bg-gradient-to-br from-[#064E3B]/40 to-[#022C22]/90 border border-[#F8E7C9]/30 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            
            {/* Header Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <span className="text-xs font-mono font-bold tracking-widest text-[#F8E7C9] uppercase flex items-center gap-1.5">
                <Terminal className="w-4 h-4" /> Featured Flagship Application
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#10B981]/15 text-[#34D399] border border-[#10B981]/30">
                <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
                {FEATURED_PROJECT.status}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FAF4E8]">
                  {FEATURED_PROJECT.title}
                </h2>
                <p className="text-sm font-medium text-[#F8E7C9]/90 italic font-serif">
                  {FEATURED_PROJECT.tagline}
                </p>
                <p className="text-sm text-[#D4C3A3] leading-relaxed">
                  {FEATURED_PROJECT.description}
                </p>

                {/* Key Features List */}
                <div className="pt-2 space-y-2">
                  {FEATURED_PROJECT.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#FAF4E8]">
                      <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 pt-3">
                  {FEATURED_PROJECT.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium text-[#F8E7C9] bg-[#064E3B] rounded-full border border-[#F8E7C9]/25 shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-4">
                  <a
                    href={FEATURED_PROJECT.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full bg-[#F8E7C9] text-[#022C22] font-semibold text-xs hover:bg-[#FAF4E8] transition shadow-lg flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" /> Live Platform Demo
                  </a>
                  <a
                    href={FEATURED_PROJECT.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full bg-[#064E3B]/60 text-[#FAF4E8] font-medium text-xs border border-[#F8E7C9]/30 hover:border-[#F8E7C9] transition flex items-center gap-2"
                  >
                    <GithubIcon className="w-4 h-4" /> Source Repository
                  </a>
                </div>
              </div>

              {/* Right Decorative Code Preview Pane */}
              <div className="lg:col-span-5 bg-[#041C16] border border-[#F8E7C9]/20 rounded-2xl p-5 font-mono text-xs text-[#D4C3A3] shadow-inner space-y-3 hidden lg:block">
                <div className="flex items-center justify-between text-[11px] text-[#F8E7C9]/70 pb-2 border-b border-[#F8E7C9]/15">
                  <span>server/routes/accommodation.js</span>
                  <span className="text-[#34D399]">Express REST API</span>
                </div>
                <pre className="text-[11px] leading-relaxed text-[#FAF4E8] overflow-x-auto">
{`router.get("/search", async (req, res) => {
  const { city, maxPrice } = req.query;
  const listings = await Accommodation.find({
    city,
    price: { $lte: maxPrice }
  }).populate("owner");

  res.status(200).json({ success: true, listings });
});`}
                </pre>
              </div>
            </div>

          </div>
        </motion.div>

        {/* CURATED WORK BENTO GRID */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {SECONDARY_PROJECTS.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariant}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-[#022C22]/80 border border-[#F8E7C9]/20 rounded-2xl p-6 hover:border-[#F8E7C9]/60 transition duration-300 flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-[#F8E7C9]/10 text-[#F8E7C9] border border-[#F8E7C9]/25 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
                    {project.status}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#064E3B] border border-[#F8E7C9]/20 flex items-center justify-center text-[#F8E7C9]">
                    <Code2 className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#FAF4E8] mb-1">{project.title}</h3>
                <p className="text-xs text-[#F8E7C9]/80 font-serif italic mb-3">{project.tagline}</p>
                <p className="text-xs text-[#D4C3A3] leading-relaxed mb-4">{project.description}</p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[11px] font-medium text-[#F8E7C9] bg-[#064E3B]/60 rounded-md border border-[#F8E7C9]/15"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 border-t border-[#F8E7C9]/10 pt-4">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-xl bg-[#064E3B]/40 text-[#FAF4E8] hover:bg-[#064E3B] border border-[#F8E7C9]/20 transition text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <GithubIcon className="w-3.5 h-3.5" /> Code
                  </a>
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 rounded-xl bg-[#F8E7C9] text-[#022C22] hover:bg-[#FAF4E8] transition text-xs font-semibold flex items-center justify-center gap-1.5 shadow"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Live Demo
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