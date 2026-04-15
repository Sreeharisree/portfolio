import { portfolioData } from "../data";

export function Footer() {
  return (
    <footer className="py-8 border-t border-zinc-800/50 text-center">
      <p className="text-zinc-500 text-sm">
        © {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
      </p>
    </footer>
  );
}
