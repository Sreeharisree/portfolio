import { motion } from "motion/react";
import { Download, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { portfolioData } from "../data";

export function Hero() {
  const handleDownload = () => {
    const resumeUrl = "https://drive.google.com/uc?export=download&id=1fpglxOMiZAAEiKOp-fhOwqDTYHsylgqL";
    window.open(resumeUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center pt-20 pb-12 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-2 lg:order-1"
        >
          <h2 className="text-zinc-400 tracking-widest uppercase text-sm font-medium mb-4">
            {portfolioData.title}
          </h2>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-tight mb-6">
            {portfolioData.name}
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-xl leading-relaxed mb-10 font-light">
            {portfolioData.summary}
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-zinc-100 text-zinc-950 px-6 py-3 rounded-full font-medium hover:bg-white transition-colors"
            >
              <Download size={18} />
              Download Resume
            </button>
            <div className="flex items-center gap-4">
              <a
                href={portfolioData.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full border border-zinc-800 hover:border-zinc-500 hover:bg-zinc-800 transition-all"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={portfolioData.social.github}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full border border-zinc-800 hover:border-zinc-500 hover:bg-zinc-800 transition-all"
              >
                <Github size={20} />
              </a>
              <a
                href={portfolioData.social.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full border border-zinc-800 hover:border-zinc-500 hover:bg-zinc-800 transition-all"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="order-1 lg:order-2 flex justify-center lg:justify-end"
        >
          <div className="relative w-64 h-80 md:w-80 md:h-[28rem] rounded-full overflow-hidden border border-zinc-800 p-2">
            <div className="w-full h-full rounded-full overflow-hidden relative">
              <div className="absolute inset-0 bg-zinc-900/20 mix-blend-overlay z-10"></div>
              <img
                src={portfolioData.photo}
                alt={portfolioData.name}
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
