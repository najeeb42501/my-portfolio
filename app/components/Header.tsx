"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { navItems } from "./data/portfolio";

export default function Header({
  activeSection,
  theme,
  onToggleTheme,
}: {
  activeSection: string;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.2,
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl theme-header">
      <motion.div
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-[var(--site-accent)]"
        style={{ scaleX: progress }}
      />
      <nav
        className="mx-auto grid h-14 max-w-7xl grid-cols-[auto_1fr_auto_auto] items-center gap-3 px-4 sm:px-6"
        aria-label="Primary navigation"
      >
        <a
          href="#hero"
          className="flex items-center gap-2"
          aria-label="Go to top"
        >
          <span className="size-3 rounded-full bg-[#ff5f57] shadow-[0_0_12px_rgba(255,95,87,0.45)]" />
          <span className="size-3 rounded-full bg-[#ffbd2e] shadow-[0_0_12px_rgba(255,189,46,0.38)]" />
          <span className="size-3 rounded-full bg-[#28c840] shadow-[0_0_12px_rgba(40,200,64,0.35)]" />
        </a>
        <div className="min-w-0 justify-self-center rounded border px-3 py-1 font-mono text-xs theme-panel theme-muted sm:text-sm">
          <span className="hidden theme-subtle sm:inline">~/portfolio/</span>
          <span className="theme-accent">Najeebullah_Khan</span>
          <span className="theme-muted">.software-engineer</span>
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
                    ? "theme-accent-bg shadow-[0_0_18px_var(--site-glow)]"
                    : "theme-muted hover:bg-[var(--site-accent-soft)] hover:text-[var(--site-heading)]"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </div>
        <button
          type="button"
          onClick={onToggleTheme}
          className="rounded border px-3 py-1.5 text-xs font-semibold transition theme-panel theme-muted hover:border-[var(--site-accent)] hover:text-[var(--site-heading)]"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </nav>
    </header>
  );
}
