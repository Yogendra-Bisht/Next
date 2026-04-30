"use client";
import { motion } from "framer-motion";

const SKILL_CATEGORIES = [
  {
    icon: "🖥️",
    title: "Frontend Development",
    description: "Building responsive, accessible, and performant user interfaces.",
    skills: [
      { name: "HTML5 / CSS3", level: 100 },
      { name: "Tailwind CSS", level: 95 },
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "React.js", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "Framer Motion", level: 75 },
    ],
  },
  {
    icon: "⚙️",
    title: "Backend & Logic",
    description: "Handling business logic, databases, and complex algorithms.",
    skills: [
      { name: "Java (Core & Advanced)", level: 90 },
      { name: "Data Structures (DSA)", level: 85 },
      { name: "REST APIs", level: 80 },
      { name: "Node.js & Express.js", level: 65 },
      { name: "MongoDB", level: 55 },
      { name: "Python", level: 60 },
    ],
  },
  {
    icon: "🛠️",
    title: "Tools & Platforms",
    description: "The software and platforms I use daily to ship code.",
    skills: [
      { name: "VS Code", level: 95 },
      { name: "Vercel Deployment", level: 90 },
      { name: "Git & GitHub", level: 85 },
      { name: "Postman", level: 80 },
      { name: "Vite", level: 75 },
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function Skills() {
  return (
    <div className="relative isolate px-6 pt-20 lg:px-8 min-h-screen">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#10b981] to-[#06b6d4] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="mx-auto max-w-5xl py-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Technical <span className="text-cyan-400">Proficiency</span>
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            A breakdown of the tools and technologies I use to solve problems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILL_CATEGORIES.map((category, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="p-8 bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl hover:border-cyan-500/30 transition duration-300"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>
              <p className="text-sm text-gray-500 mb-6">{category.description}</p>

              <div className="space-y-4">
                {category.skills.map((skill, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                      <span className="text-sm font-medium text-cyan-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-700/60 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: idx * 0.07 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Currently Learning Card */}
          <motion.div
            custom={SKILL_CATEGORIES.length}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl flex flex-col justify-center items-center text-center"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="text-4xl mb-4"
            >
              🚀
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-3">Currently Learning</h3>
            <p className="text-gray-400 text-sm mb-6">
              Expanding into backend architecture and modern tooling.
            </p>
            <div className="flex gap-3 flex-wrap justify-center">
              {["TypeScript", "Docker", "Machine Learning", "System Design", "Next.js Auth"].map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.08 }}
                  className="px-4 py-2 bg-slate-700 rounded-full text-sm text-cyan-300 border border-cyan-500/30 cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}