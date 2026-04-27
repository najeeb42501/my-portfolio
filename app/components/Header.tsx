"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { navItems } from "./data/portfolio";

export default function Header({ activeSection }: { activeSection: string }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.2,
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0d1117]/90 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <motion.div
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-cyan-300"
        style={{ scaleX: progress }}
      />
      <nav
        className="mx-auto grid h-14 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 sm:px-6"
        aria-label="Primary navigation"
      >
        <a href="#hero" className="flex items-center gap-2" aria-label="Go to top">
          <span className="size-3 rounded-full bg-[#ff5f57] shadow-[0_0_12px_rgba(255,95,87,0.45)]" />
          <span className="size-3 rounded-full bg-[#ffbd2e] shadow-[0_0_12px_rgba(255,189,46,0.38)]" />
          <span className="size-3 rounded-full bg-[#28c840] shadow-[0_0_12px_rgba(40,200,64,0.35)]" />
        </a>
        <div className="min-w-0 justify-self-center rounded border border-white/10 bg-black/25 px-3 py-1 font-mono text-xs text-zinc-400 sm:text-sm">
          <span className="hidden text-zinc-600 sm:inline">~/portfolio/</span>
          <span className="text-cyan-200">NJB</span>
          <span className="text-zinc-500">.software-engineer</span>
        </div>
        <div className="scrollbar-none flex max-w-[48vw] justify-end gap-1 overflow-x-auto rounded bg-transparent p-0 sm:max-w-none sm:gap-2">
          {navItems.map((item) => {
            const id = item.href.slice(1);
            const isActive = activeSection === id;

            return (
              <a
                key={item.href}
                href={item.href}
                className={`rounded px-2.5 py-1.5 text-xs transition sm:px-3 sm:text-sm ${
                  isActive
                    ? "bg-cyan-300 text-black shadow-[0_0_18px_rgba(34,211,238,0.25)]"
                    : "text-zinc-400 hover:bg-white/10 hover:text-white"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
