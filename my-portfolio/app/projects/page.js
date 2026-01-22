import Link from "next/link";

// 1. YOUR PROJECT DATA
const PROJECTS = [
  {
    title: "Student Room Finder",
    description: "A comprehensive platform for students to find and book accommodation. Features real-time availability, dynamic filtering, and a secure booking system.",
    techStack: ["Next.js", "React", "Tailwind", "SQL"],
    githubLink: "#",
    liveLink: "#", // Use '#' if not deployed yet and use null if dont want to show the live button
    status: "In Progress", // Optional badge
    color: "from-blue-500 to-cyan-500" // Custom gradient for the placeholder
  },
  {
    title: "Portfolio Website",
    description: "My personal digital garden. Built with Next.js 14 App Router and Tailwind CSS. Features a modern glassmorphism UI and responsive design.",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    githubLink: "https://github.com/YOUR_USERNAME/portfolio",
    liveLink: "https://yogendra.dev", 
    status: "Completed",
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Utility Toolbox",
    description: "A collection of some tools like password generator, OTP generator, Random number generator in a range, just created for practice my skills in next.js, but some updates are needed and it will be updated soon. ",
    techStack: ["Next.js", "Tailwind",],
    githubLink: "https://github.com/YOUR_USERNAME/dsa-library",
    liveLink: "https://utility-toolbox-phi.vercel.app", 
    status: "Completed",
    color: "from-emerald-500 to-teal-500"
  }
];

export default function Projects() {
  return (
    <div className="relative isolate px-6 pt-20 lg:px-8 min-h-screen">
      
      {/* Background Blob (Top Right) */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#06b6d4] to-[#3b82f6] opacity-20 sm:left-[calc(50%-30rem)] sm:w-288.75"></div>
      </div>

      <div className="mx-auto max-w-6xl py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            My <span className="text-cyan-400">Creation</span>
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            A selection of projects that showcase my passion for coding.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}

// 2. THE CARD COMPONENT
function ProjectCard({ project }) {
  return (
    <div className="group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col">
      
      {/* Image Placeholder with Gradient */}
      <div className={`h-48 w-full bg-linear-to-br ${project.color} group-hover:scale-105 transition duration-500 relative`}>
         {/* Status Badge */}
         <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10">
            {project.status}
         </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition">
            {project.title}
        </h3>
        
        <p className="text-gray-400 text-sm mb-4 flex-grow">
            {project.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech) => (
            <span key={tech} className="px-3 py-1 text-xs font-medium text-cyan-300 bg-cyan-900/30 rounded-full border border-cyan-500/20">
              {tech}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-auto">
          {/* GitHub Button */}
          <a href={project.githubLink} target="_blank" className="flex-1 flex items-center justify-center gap-2 bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-700 transition text-sm font-medium border border-slate-700">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
            Code
          </a>

          {/* Live Demo Button (Only show if link exists) */}
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" className="flex-1 flex items-center justify-center gap-2 bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-500 transition text-sm font-medium shadow-lg shadow-cyan-500/20">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
}