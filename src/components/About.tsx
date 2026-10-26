import { motion } from "motion/react";
import { 
  GraduationCap, 
  Languages, 
  User, 
  Layers, 
  Sparkles, 
  Heart,
  CheckCircle2,
  Cpu
} from "lucide-react";
import { portfolioData } from "../data";

export function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800/80">
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mb-16"
      >
        <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#0284c7] dark:text-[#61dafb] font-semibold mb-2">
          <Cpu size={14} />
          <span>Professional Background</span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          About & Engineering Stack
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2.5 leading-relaxed">
          Detailed profile of mobile and web expertise, production architectures, and engineering methodologies.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Column: Personal Dossier, Languages, Education */}
        <div className="lg:col-span-5 space-y-7">
          {/* Personal Dossier */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.3 }}
            className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-xs hover:border-[#61dafb]/40 transition-colors"
          >
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <User size={16} className="text-[#0284c7] dark:text-[#61dafb]" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                Personal Profile
              </h3>
            </div>

            <dl className="space-y-3.5 text-xs sm:text-sm">
              <div className="flex justify-between items-baseline">
                <dt className="text-slate-500 dark:text-slate-400">Date of Birth</dt>
                <dd className="font-mono text-slate-800 dark:text-slate-200 font-medium">
                  {portfolioData.personal.dob}
                </dd>
              </div>
              <div className="flex justify-between items-baseline">
                <dt className="text-slate-500 dark:text-slate-400">Nationality</dt>
                <dd className="font-medium text-slate-800 dark:text-slate-200">
                  {portfolioData.personal.nationality}
                </dd>
              </div>
              <div className="flex justify-between items-baseline">
                <dt className="text-slate-500 dark:text-slate-400">Location</dt>
                <dd className="font-medium text-slate-800 dark:text-slate-200">
                  {portfolioData.address}
                </dd>
              </div>
            </dl>
          </motion.div>

          {/* Languages */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.3 }}
            className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-xs hover:border-[#61dafb]/40 transition-colors"
          >
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <Languages size={16} className="text-[#0284c7] dark:text-[#61dafb]" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                Languages & CEFR Levels
              </h3>
            </div>

            <div className="space-y-3.5">
              {portfolioData.languages.map((lang) => (
                <div key={lang.name} className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-800 dark:text-slate-200">{lang.name}</span>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#61dafb]/10 text-[#0284c7] dark:text-[#61dafb] border border-[#61dafb]/20 font-bold">
                      {lang.level}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {lang.proficiency}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.3 }}
            className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-xs hover:border-[#61dafb]/40 transition-colors"
          >
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <GraduationCap size={16} className="text-[#0284c7] dark:text-[#61dafb]" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                Education
              </h3>
            </div>

            <div className="space-y-4">
              {portfolioData.education.map((edu) => (
                <div key={edu.id} className="relative pl-4 border-l-2 border-[#61dafb]/50 dark:border-[#61dafb]/40">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
                    {edu.degree}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {edu.college}
                  </p>
                  <div className="mt-1 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <span>Graduated: {edu.passOut}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hobbies & Interests */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-xs"
          >
            <div className="flex items-center gap-2 mb-2">
              <Heart size={15} className="text-[#0284c7] dark:text-[#61dafb]" />
              <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100">
                Interests & Hobbies
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {portfolioData.personal.hobbies}
            </p>
          </motion.div>
        </div>

        {/* Right Column: Career Trajectory & Competencies */}
        <div className="lg:col-span-7 space-y-7">
          {/* Career Statement */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-7 rounded-2xl border border-[#61dafb]/20 bg-[#61dafb]/5 dark:bg-[#61dafb]/5"
          >
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#0284c7] dark:text-[#61dafb] font-bold mb-2.5">
              <Sparkles size={14} />
              <span>Career Trajectory & Goals</span>
            </div>
            <p className="text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed">
              {portfolioData.careerGoal}
            </p>
          </motion.div>

          {/* Core Technical Domains with Interactive Hover Scale */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Layers size={18} className="text-[#0284c7] dark:text-[#61dafb]" />
              <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-slate-100">
                Core Competencies & Stack
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {portfolioData.skillCategories.map((cat, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  whileHover={{ y: -3 }}
                  key={cat.title}
                  className={`p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-xs hover:border-[#61dafb]/40 transition-colors ${
                    idx === 2 ? "sm:col-span-2" : ""
                  }`}
                >
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 mb-3.5 pb-2 border-b border-slate-100 dark:border-slate-800 font-mono text-[#0284c7] dark:text-[#61dafb]">
                    {cat.title}
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 size={14} className="text-[#0284c7] dark:text-[#61dafb] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
