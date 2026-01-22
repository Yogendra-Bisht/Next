import Link from "next/link";

// 1. DATA: Categorized for better impact
const SKILL_CATEGORIES = [
  {
    title: "Frontend Development",
    description: "Building responsive, accessible, and performant user interfaces.",
    skills: [
      { name: "React.js", level: 90 }, // 90% width
      { name: "Next.js 14", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "HTML5 / CSS3", level: 100 },
    ],
  },
  {
    title: "Backend & Logic",
    description: "Handling business logic, databases, and complex algorithms.",
    skills: [
      { name: "Java (Core & Advanced)", level: 90 },
      { name: "Data Structures (DSA)", level: 85 },
      { name: "SQL / MySQL", level: 50 },
      { name: "Node.js (Basics)", level: 60 },
      { name: "REST APIs", level: 75 },
    ],
  },
  {
    title: "Tools & Environment",
    description: "The software and platforms I use daily to ship code.",
    skills: [
      { name: "Git & GitHub", level: 85 },
      { name: "VS Code", level: 95 },
      { name: "Postman", level: 80 },
      { name: "Vercel Deployment", level: 90 },
    ],
  },
];

export default function Skills() {
  return (
    <div className="relative isolate px-6 pt-20 lg:px-8 min-h-screen">
      
      {/* Background Glow (Green/Cyan mix for Skills) */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#10b981] to-[#06b6d4] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>

      <div className="mx-auto max-w-5xl py-12">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Technical <span className="text-cyan-400">Proficiency</span>
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            A breakdown of the tools and technologies I use to solve problems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Map through Categories */}
          {SKILL_CATEGORIES.map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))}
          
          {/* "Learning Now" Card - A nice bonus to show growth mindset */}
          <div className="p-8 bg-linear-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl flex flex-col justify-center items-center text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Currently Learning</h3>
            <p className="text-gray-400 mb-6">
              I am actively expanding my knowledge in system design and advanced backend patterns.
            </p>
            <div className="flex gap-3 flex-wrap justify-center">
               <span className="px-4 py-2 bg-slate-700 rounded-full text-sm text-cyan-300 border border-cyan-500/30">Backend Design</span>
               <span className="px-4 py-2 bg-slate-700 rounded-full text-sm text-cyan-300 border border-cyan-500/30">Next.js Auth</span>
               <span className="px-4 py-2 bg-slate-700 rounded-full text-sm text-cyan-300 border border-cyan-500/30">Docker</span>
               <span className="px-4 py-2 bg-slate-700 rounded-full text-sm text-cyan-300 border border-cyan-500/30">Machine Learning</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Component for Category Card
function CategoryCard({ category }) {
  return (
    <div className="p-8 bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl hover:border-cyan-500/30 transition duration-300">
      <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
      <p className="text-sm text-gray-500 mb-6">{category.description}</p>
      
      <div className="space-y-4">
        {category.skills.map((skill, idx) => (
          <div key={idx}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-300">{skill.name}</span>
              <span className="text-sm font-medium text-cyan-400">{skill.level}%</span>
            </div>
            {/* Progress Bar Container */}
            <div className="w-full bg-slate-700 rounded-full h-2.5">
              {/* Progress Bar Fill */}
              <div 
                className="bg-linear-to-r from-cyan-500 to-blue-500 h-2.5 rounded-full" 
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}