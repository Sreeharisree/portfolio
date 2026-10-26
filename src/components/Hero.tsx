import { useState } from "react";
import { motion } from "motion/react";
import { 
  Download, 
  Github, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Check, 
  Loader2, 
  Smartphone, 
  ArrowRight,
  MapPin
} from "lucide-react";
import { portfolioData } from "../data";
import { ReactLogo } from "./ReactLogo";

export function Hero() {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);

    try {
      const localUrl = portfolioData.resumeLocalPdf || "/Sreehari_S_CV.pdf";
      const response = await fetch(localUrl, { method: "HEAD" });

      if (response.ok) {
        const link = document.createElement("a");
        link.href = localUrl;
        link.download = "Sreehari_S_CV.pdf";
        document.body.appendChild(link);
        link.click();
        link.remove();
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3000);
        return;
      }
      throw new Error("Local file not reachable, falling back to Google Drive");
    } catch {
      const resumeId = portfolioData.resumeDriveId || "1Ctt1w7wzTjGg6kgghGeZ6ysRD69ujMEa";
      const driveUrl = `https://drive.google.com/uc?export=download&id=${resumeId}`;
      window.open(driveUrl, "_blank", "noopener,noreferrer");
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background Animated React Logo & Mobile Watermarks */}
      <motion.div 
        animate={{ rotate: 360, y: [0, -12, 0] }}
        transition={{ rotate: { repeat: Infinity, duration: 25, ease: "linear" }, y: { repeat: Infinity, duration: 6, ease: "easeInOut" } }}
        className="absolute top-16 right-8 text-[#61dafb]/10 dark:text-[#61dafb]/6 pointer-events-none hidden lg:block"
      >
        <ReactLogo className="w-56 h-56" />
      </motion.div>

      <motion.div 
        animate={{ y: [0, 14, 0], rotate: [-6, 6, -6] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        className="absolute bottom-20 left-6 text-[#61dafb]/10 dark:text-[#61dafb]/5 pointer-events-none hidden md:block"
      >
        <Smartphone size={100} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
        {/* Left Column: Personal Focus & Pitch */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col justify-center z-10"
        >
          {/* Status & Location kicker with mini animated React logo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#111827]/80 text-xs font-mono text-slate-600 dark:text-slate-300 mb-6 w-fit shadow-2xs backdrop-blur-sm"
          >
            <ReactLogo className="w-4 h-4 text-[#0284c7] dark:text-[#61dafb] animate-[spin_8s_linear_infinite]" />
            <span className="font-semibold text-slate-800 dark:text-slate-200">Senior Software Engineer</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <MapPin size={12} className="text-[#0284c7] dark:text-[#61dafb]" />
              {portfolioData.address}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] mb-4">
              Hi, I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-100 dark:to-slate-300">{portfolioData.name}</span>
            </h1>

            <p className="font-mono text-lg sm:text-xl md:text-2xl font-semibold text-[#0284c7] dark:text-[#61dafb] mb-6 flex items-center gap-3">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                className="inline-block"
              >
                <ReactLogo className="w-6 h-6 text-[#0284c7] dark:text-[#61dafb]" />
              </motion.span>
              <span>React Native & React.js Specialist</span>
            </p>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mb-8 font-normal"
          >
            {portfolioData.summary}
          </motion.p>

          {/* Action Row with Interactive Physics */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="flex flex-wrap items-center gap-4 mb-10"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center gap-2 bg-[#61dafb] hover:bg-[#38bdf8] text-[#0b0f19] px-6 py-3.5 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-[#61dafb]/20 cursor-pointer disabled:opacity-75"
            >
              {downloading ? (
                <>
                  <Loader2 size={16} className="animate-spin text-[#0b0f19]" />
                  Downloading...
                </>
              ) : downloadSuccess ? (
                <>
                  <Check size={16} className="text-[#0b0f19]" />
                  Resume Ready
                </>
              ) : (
                <>
                  <Download size={16} />
                  Download Resume
                </>
              )}
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#111827] text-slate-800 dark:text-slate-200 hover:border-[#61dafb] dark:hover:border-[#61dafb] hover:text-[#0284c7] dark:hover:text-[#61dafb] transition-all shadow-2xs"
            >
              View Featured Work
              <ArrowRight size={15} />
            </motion.a>

            {/* Social Icons with Interactive Hover Micro-animations */}
            <div className="flex items-center gap-2.5 ml-auto sm:ml-0">
              <motion.a
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.92 }}
                href={portfolioData.social.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] text-slate-600 dark:text-slate-400 hover:text-[#0284c7] dark:hover:text-[#61dafb] hover:border-[#61dafb]/40 transition-colors shadow-2xs"
              >
                <Linkedin size={18} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.92 }}
                href={portfolioData.social.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] text-slate-600 dark:text-slate-400 hover:text-[#0284c7] dark:hover:text-[#61dafb] hover:border-[#61dafb]/40 transition-colors shadow-2xs"
              >
                <Github size={18} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.92 }}
                href={portfolioData.social.twitter}
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] text-slate-600 dark:text-slate-400 hover:text-[#0284c7] dark:hover:text-[#61dafb] hover:border-[#61dafb]/40 transition-colors shadow-2xs"
              >
                <Twitter size={18} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.92 }}
                href={portfolioData.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] text-slate-600 dark:text-slate-400 hover:text-[#0284c7] dark:hover:text-[#61dafb] hover:border-[#61dafb]/40 transition-colors shadow-2xs"
              >
                <Instagram size={18} />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Sreehari Profile Showcase Card with Animated React & Mobile Badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center lg:justify-end items-center relative"
        >
          <div className="relative group w-full max-w-sm sm:max-w-md">
            {/* Ambient Background Aura */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[#61dafb]/20 via-[#38bdf8]/10 to-transparent blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Main Profile Showcase Card */}
            <div className="relative rounded-3xl p-3 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
              <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img
                  src={portfolioData.photo}
                  alt={portfolioData.name}
                  className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                
                {/* Subtle gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Profile Identity Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-display font-bold text-xl">{portfolioData.name}</p>
                  <p className="text-xs text-[#61dafb] font-mono mt-0.5">Senior Software Engineer</p>
                  <p className="text-[11px] text-slate-300 mt-1">Specializing in React Native & React.js</p>
                </div>
              </div>
            </div>

            {/* Animated Floating Badge: React Native with Spinning React Logo */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 px-3.5 py-2 rounded-xl bg-white/95 dark:bg-[#0b0f19]/95 border border-slate-200 dark:border-slate-800 text-xs font-mono font-semibold text-slate-800 dark:text-slate-100 shadow-lg backdrop-blur-md flex items-center gap-2"
            >
              <ReactLogo className="w-4 h-4 text-[#0284c7] dark:text-[#61dafb] animate-[spin_8s_linear_infinite]" />
              <span>React Native</span>
            </motion.div>

            {/* Animated Floating Badge: Mobile Architecture with Animated Smartphone Icon */}
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.8 }}
              className="absolute -bottom-4 -right-4 px-3.5 py-2 rounded-xl bg-white/95 dark:bg-[#0b0f19]/95 border border-slate-200 dark:border-slate-800 text-xs font-mono font-semibold text-slate-800 dark:text-slate-100 shadow-lg backdrop-blur-md flex items-center gap-2"
            >
              <motion.div
                animate={{ rotate: [-8, 8, -8] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              >
                <Smartphone size={14} className="text-[#0284c7] dark:text-[#61dafb]" />
              </motion.div>
              <span>iOS & Android · 60 FPS</span>
            </motion.div>

            {/* Floating Top-Right Spinning React Logo Orb */}
            <motion.div
              animate={{ rotate: 360, y: [0, -5, 0] }}
              transition={{ rotate: { repeat: Infinity, duration: 16, ease: "linear" }, y: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
              className="absolute -top-5 -right-5 w-12 h-12 rounded-2xl bg-white/95 dark:bg-[#0b0f19]/95 border border-[#61dafb]/40 shadow-lg flex items-center justify-center text-[#0284c7] dark:text-[#61dafb] backdrop-blur-md"
            >
              <ReactLogo className="w-6 h-6" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Interactive Quantitative Metrics Strip */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-6"
      >
        {portfolioData.metrics.map((metric, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-[#111827]/40 backdrop-blur-sm shadow-xs hover:border-[#61dafb]/40 transition-colors"
          >
            <span className="font-mono text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {metric.value.replace("+", "")}
              <span className="text-[#0284c7] dark:text-[#61dafb]">{metric.value.includes("+") ? "+" : "%"}</span>
            </span>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
              {metric.label}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {metric.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
