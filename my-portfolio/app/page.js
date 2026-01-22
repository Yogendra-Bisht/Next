
import Link from "next/link";

// 1. THE Skill data
const SKILLS = [
  { name: "Next.js", level: "Intermediate" },
  { name: "React", level: "Advanced" },
  { name: "Java & DSA", level: "Strong" },
  { name: "Tailwind CSS", level: "Advanced" },
  { name: "SQL / Databases", level: "Intermediate" },
  { name: "Git & GitHub", level: "Daily User" },
  { name: "JavaScript", level: "Advanced" }, 
  { name: "Node.js", level: "Beginner" },
];

export default function Home() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      
      {/* Background Glow */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#06b6d4] to-[#3b82f6] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"></div>
      </div>

      {/* Hero Section */}
      <div className="mx-auto max-w-2xl py-20 sm:py-32">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Building Logic-Driven <br />
            <span className="text-cyan-400">Web Experiences</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-400">
            Hi, I'm <span className="text-white font-semibold">Yogendra Bisht</span>. 
            A Final Year MCA Student specializing in <span className="text-cyan-400">Next.js</span>, 
            <span className="text-cyan-400"> Java</span>, and <span className="text-cyan-400">Data Structures</span>.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/projects" className="rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 transition">
              View My Work
            </Link>
            <Link href="/contact" className="text-sm font-semibold leading-6 text-white hover:text-cyan-400 transition">
              Contact Me <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Skills Section using .map() */}
      <div className="mx-auto max-w-4xl py-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-white">My Tech Arsenal</h2>
          <p className="text-gray-500 mt-2">Tools I use to bring ideas to life</p>
        </div>

        {/* 2. THE LOOP: This renders the cards automatically */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
          {SKILLS.map((skill, index) => (
            <SkillCard key={index} title={skill.name} level={skill.level} />
          ))}
        </div>
      </div>

      {/* Bottom Glow */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#06b6d4] to-[#3b82f6] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"></div>
      </div>
    </div>
  );
}

// Helper Component
function SkillCard({ title, level }) {
  return (
    <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-cyan-500/50 transition duration-300 hover:shadow-lg hover:shadow-cyan-500/10 group">
      <h3 className="text-lg font-semibold text-gray-200 group-hover:text-cyan-400 transition">{title}</h3>
      <p className="text-sm text-gray-500">{level}</p>
    </div>
  );
}