import { ArrowUp, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { portfolioData } from "../data";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 border-t border-slate-200 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100">
            <span>Sreehari S</span>
          </div>
          <span aria-hidden="true" className="hidden sm:inline text-slate-300 dark:text-slate-700">·</span>
          <span>© {new Date().getFullYear()} All rights reserved.</span>
          <span aria-hidden="true" className="hidden sm:inline text-slate-300 dark:text-slate-700">·</span>
          <a
            href="https://sreeharis.co.in"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#0284c7] dark:hover:text-[#61dafb] transition-colors"
          >
            sreeharis.co.in
          </a>
        </div>

        {/* Social & Back to Top */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500">
            <a
              href={portfolioData.social.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-1.5 hover:text-[#0284c7] dark:hover:text-[#61dafb] transition-colors"
            >
              <Github size={17} />
            </a>
            <a
              href={portfolioData.social.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-1.5 hover:text-[#0284c7] dark:hover:text-[#61dafb] transition-colors"
            >
              <Linkedin size={17} />
            </a>
            <a
              href={portfolioData.social.twitter}
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="p-1.5 hover:text-[#0284c7] dark:hover:text-[#61dafb] transition-colors"
            >
              <Twitter size={17} />
            </a>
            <a
              href={portfolioData.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="p-1.5 hover:text-[#0284c7] dark:hover:text-[#61dafb] transition-colors"
            >
              <Instagram size={17} />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] text-slate-600 dark:text-slate-400 hover:text-[#0284c7] dark:hover:text-[#61dafb] hover:border-[#61dafb]/40 transition-colors cursor-pointer shadow-2xs"
            title="Back to top"
          >
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}
