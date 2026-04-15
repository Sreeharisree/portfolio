import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { portfolioData } from "../data";

export function Experience() {
  const [filter, setFilter] = useState<"All" | "React Native" | "React Js">("All");

  const allProjects = portfolioData.experience.flatMap((exp) =>
    exp.projects.map((proj) => ({ ...proj, company: exp.company, period: exp.period }))
  );

  const filteredProjects =
    filter === "All" ? allProjects : allProjects.filter((p) => p.tool === filter);

  return (
    <section id="experience" className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto border-t border-zinc-800/50">
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-6">Experience & Projects</h2>
          <div className="h-px w-12 bg-zinc-700"></div>
        </div>

        <div className="flex gap-2 bg-zinc-900/50 p-1 rounded-full border border-zinc-800/50">
          {["All", "React Native", "React Js"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === f
                  ? "bg-zinc-100 text-zinc-950"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={project.id}
              className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-6 lg:p-8 hover:border-zinc-700 transition-colors group"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-medium text-zinc-100 group-hover:text-white transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">{project.company}</p>
                </div>
                <span className="text-xs font-mono px-2 py-1 bg-zinc-800/50 text-zinc-300 rounded border border-zinc-700/50">
                  {project.tool}
                </span>
              </div>

              <p className="text-zinc-400 text-sm mb-6 line-clamp-2">{project.summary}</p>

              <div className="space-y-2">
                <h4 className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Key Responsibilities</h4>
                <ul className="space-y-2">
                  {project.responsibilities.slice(0, 3).map((resp, idx) => (
                    <li key={idx} className="text-sm text-zinc-300 flex items-start gap-2">
                      <span className="text-zinc-600 mt-1">•</span>
                      <span className="leading-relaxed">{resp}</span>
                    </li>
                  ))}
                  {project.responsibilities.length > 3 && (
                    <li className="text-sm text-zinc-500 italic pl-3">
                      + {project.responsibilities.length - 3} more
                    </li>
                  )}
                </ul>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
