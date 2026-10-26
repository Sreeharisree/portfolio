import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Building2, Calendar, Smartphone, Globe, ChevronRight, Briefcase, ArrowUpRight } from "lucide-react";
import { portfolioData } from "../data";

export function Experience() {
  const [filter, setFilter] = useState<"All" | "React Native" | "React Js">("All");

  const allProjects = portfolioData.experience.flatMap((exp) =>
    exp.projects.map((proj) => ({ 
      ...proj, 
      company: exp.company, 
      period: exp.period 
    }))
  );

  const filteredProjects =
    filter === "All" ? allProjects : allProjects.filter((p) => p.tool === filter);

  return (
    <section id="experience" className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800/80">
      {/* Experience Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mb-16"
      >
        <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#0284c7] dark:text-[#61dafb] font-semibold mb-2">
          <Briefcase size={14} />
          <span>Professional Background</span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Work Experience
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2.5 leading-relaxed">
          Over 8 years building, optimizing, and maintaining enterprise React Native & React.js applications.
        </p>
      </motion.div>

      {/* Company Timeline Cards with Staggered Entrance */}
      <div className="space-y-8 mb-24">
        {portfolioData.experience.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15, duration: 0.5 }}
            whileHover={{ y: -3 }}
            className="p-7 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-xs hover:border-[#61dafb]/40 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0284c7] dark:text-[#61dafb] uppercase tracking-wider mb-1">
                  <Building2 size={13} />
                  {exp.company}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                  {exp.role}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 w-fit">
                <Calendar size={13} className="text-[#0284c7] dark:text-[#61dafb]" />
                <span>{exp.period}</span>
              </div>
            </div>

            {/* Company Responsibilities Grid from CV */}
            <div className="mt-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3.5 font-semibold">
                Key Responsibilities & Deliverables
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {exp.highlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <ChevronRight size={14} className="text-[#0284c7] dark:text-[#61dafb] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Projects Subsection */}
      <div id="projects" className="pt-6">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#0284c7] dark:text-[#61dafb] font-semibold mb-2">
              <Smartphone size={14} />
              <span>Production Portfolio</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Featured Client Projects
            </h3>
          </motion.div>

          {/* Interactive Filter Tabs with Micro-animations */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-200/70 dark:bg-[#0b0f19] rounded-xl border border-slate-300/80 dark:border-slate-800 w-fit">
            {(["All", "React Native", "React Js"] as const).map((tab) => {
              const active = filter === tab;
              return (
                <motion.button
                  key={tab}
                  whileTap={{ scale: 0.96 }}
                  type="button"
                  onClick={() => setFilter(tab)}
                  className={`relative px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                    active
                      ? "text-[#0b0f19]"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 bg-[#61dafb] rounded-lg shadow-xs"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid with Interactive Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                whileHover={{ y: -4 }}
                key={project.id}
                className="flex flex-col justify-between p-7 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] hover:border-[#61dafb]/50 transition-colors shadow-xs group"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-medium">
                        {project.company}
                      </span>
                      <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5 group-hover:text-[#0284c7] dark:group-hover:text-[#61dafb] transition-colors">
                        {project.name}
                      </h4>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#61dafb]/10 text-[#0284c7] dark:text-[#61dafb] border border-[#61dafb]/20 shrink-0 font-bold">
                      {project.tool === "React Native" ? (
                        <Smartphone size={13} />
                      ) : (
                        <Globe size={13} />
                      )}
                      <span>{project.tool}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-4">
                    Role: {project.role}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {project.summary}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                      Key Technical Contributions
                    </span>
                    <ul className="space-y-2 mt-2">
                      {project.responsibilities.map((resp, i) => (
                        <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                          <span className="text-[#0284c7] dark:text-[#61dafb] mt-0.5">•</span>
                          <span className="leading-relaxed">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {"playStoreUrl" in project && project.playStoreUrl && (
                    <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                      <a
                        href={project.playStoreUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#61dafb]/30 bg-[#61dafb]/10 text-[#0284c7] dark:text-[#61dafb] hover:bg-[#61dafb]/20 transition-colors text-xs font-mono font-bold"
                      >
                        <span>View on Google Play</span>
                        <ArrowUpRight size={13} />
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
