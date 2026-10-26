import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Moon, Sun, Menu, X, ArrowUpRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { ReactLogo } from "./ReactLogo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ["home", "about", "experience", "projects", "contact"];
      let current = "home";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 dark:bg-[#0b0f19]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 py-3.5 shadow-xs"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
        {/* Zone 1: Profile Wordmark (Sreehari S) */}
        <a
          href="#home"
          className="group flex items-center gap-2.5 font-bold text-lg tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-[#61dafb]/15 border border-[#61dafb]/30 flex items-center justify-center text-[#0284c7] dark:text-[#61dafb] shadow-xs group-hover:bg-[#61dafb]/25 transition-colors overflow-hidden">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="flex items-center justify-center text-[#0284c7] dark:text-[#61dafb]"
            >
              <ReactLogo className="w-5 h-5" />
            </motion.div>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
              Sreehari S
            </span>
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
              React Native & React.js
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links with modern motion underline */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
          {navLinks.map((link) => {
            const sectionId = link.href.substring(1);
            const isActive = activeSection === sectionId || (link.href === "#projects" && activeSection === "projects");
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative py-1 transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? "text-slate-950 dark:text-white font-semibold"
                    : "hover:text-[#0284c7] dark:hover:text-[#61dafb]"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#61dafb] rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Theme Toggle & Connect Action) */}
        <div className="flex items-center gap-3 shrink-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#111827] text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 transition-colors cursor-pointer flex items-center justify-center shadow-2xs"
            title={`Switch to ${isDark ? "light" : "dark"} theme`}
          >
            {isDark ? (
              <Sun size={17} className="text-amber-400" />
            ) : (
              <Moon size={17} className="text-slate-700" />
            )}
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl bg-[#61dafb] hover:bg-[#38bdf8] text-[#0b0f19] transition-all whitespace-nowrap shrink-0 shadow-xs active:scale-[0.98]"
          >
            Get In Touch
            <ArrowUpRight size={13} />
          </motion.a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] text-slate-700 dark:text-slate-300"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0b0f19]/95 backdrop-blur-xl px-6 py-4 space-y-3"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[#61dafb]"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#61dafb] hover:bg-[#38bdf8] text-[#0b0f19] font-bold text-xs shadow-xs"
              >
                Get In Touch
                <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
