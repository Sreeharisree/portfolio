import { motion } from "motion/react";
import { portfolioData } from "../data";

export function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto border-t border-zinc-800/50">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        <div className="lg:col-span-4">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">About Me</h2>
          <div className="h-px w-12 bg-zinc-700 mb-8"></div>
          <div className="space-y-4 text-sm text-zinc-400">
            <div className="flex justify-between border-b border-zinc-800/50 pb-2">
              <span className="text-zinc-500">DOB</span>
              <span className="text-zinc-200">{portfolioData.personal.dob}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800/50 pb-2">
              <span className="text-zinc-500">Nationality</span>
              <span className="text-zinc-200">{portfolioData.personal.nationality}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800/50 pb-2">
              <span className="text-zinc-500">Languages</span>
              <span className="text-zinc-200">{portfolioData.personal.languages}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800/50 pb-2">
              <span className="text-zinc-500">Hobbies</span>
              <span className="text-zinc-200 text-right max-w-[150px]">{portfolioData.personal.hobbies}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="mb-16">
            <h3 className="text-xl font-medium mb-6 text-zinc-200">Core Expertise</h3>
            <div className="flex flex-wrap gap-3">
              {portfolioData.skills.map((skill, index) => (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  key={skill}
                  className="px-4 py-2 rounded-full border border-zinc-800 text-sm text-zinc-300 hover:border-zinc-500 hover:bg-zinc-800/50 transition-all cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-8 text-zinc-200">Education</h3>
            <div className="space-y-8">
              {portfolioData.education.map((edu, index) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  key={edu.id}
                  className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-zinc-700 before:rounded-full after:absolute after:left-[3px] after:top-4 after:bottom-[-24px] after:w-px after:bg-zinc-800 last:after:hidden"
                >
                  <h4 className="text-lg font-medium text-zinc-100">{edu.degree}</h4>
                  <p className="text-zinc-400 mt-1">{edu.college}</p>
                  <div className="flex gap-4 mt-2 text-sm text-zinc-500 font-mono">
                    <span>{edu.passOut}</span>
                    <span>•</span>
                    <span>{edu.percentage}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
