"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.2,
  });

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:px-5">
      <motion.div
        className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left theme-spectrum-line"
        style={{ scaleX: progress }}
      />
      <nav
        className="bento-card mx-auto grid min-h-14 max-w-7xl grid-cols-[auto_1fr_auto_auto] items-center gap-3 overflow-hidden px-4 shadow-[0_18px_50px_var(--site-glow)] sm:px-5"
        aria-label="Primary navigation"
      >
        <a
          href="#hero"
          className="flex items-center gap-2"
          aria-label="Go to top"
        >
          <span className="size-3 rounded-full bg-[var(--theme-card-pink-solid)] shadow-[0_0_12px_color-mix(in_srgb,var(--theme-card-pink-solid)_45%,transparent)]" />
          <span className="size-3 rounded-full bg-[var(--theme-card-orange-solid)] shadow-[0_0_12px_color-mix(in_srgb,var(--theme-card-orange-solid)_38%,transparent)]" />
          <span className="size-3 rounded-full bg-[var(--theme-card-emerald-solid)] shadow-[0_0_12px_color-mix(in_srgb,var(--theme-card-emerald-solid)_35%,transparent)]" />
        </a>
        <div className="min-w-0 justify-self-center rounded border px-2.5 py-1 font-mono text-[0.68rem] theme-panel theme-muted sm:px-3 sm:text-sm">
          <span className="hidden theme-subtle sm:inline">~/portfolio/</span>
          <span className="theme-accent">Najeeb</span>
          <span className="hidden theme-accent sm:inline">ullah_Khan</span>
          <span className="hidden theme-muted md:inline">.software-engineer</span>
        </div>
        <div className="hidden justify-end gap-1 bg-transparent p-0 md:flex md:gap-2">
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
          className="minimal-button hidden items-center gap-2 border px-3 py-1.5 text-xs font-semibold theme-panel theme-muted hover:border-[var(--site-accent)] hover:text-[var(--site-heading)] sm:flex"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
          {theme === "dark" ? <FiSun aria-hidden /> : <FiMoon aria-hidden />}
          {theme === "dark" ? "Light" : "Dark"}
        </button>
        <button
          type="button"
          onClick={() => setIsMenuOpen((current) => !current)}
          className="minimal-button grid size-9 place-items-center border theme-panel theme-muted hover:border-[var(--site-accent)] hover:text-[var(--site-heading)] md:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label="Toggle navigation menu"
        >
          <span className="grid gap-1">
            <span
              className={`h-0.5 w-4 rounded-full bg-current transition ${
                isMenuOpen ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-4 rounded-full bg-current transition ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-4 rounded-full bg-current transition ${
                isMenuOpen ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>
      <motion.div
        id="mobile-navigation"
        className="mx-auto max-w-7xl overflow-hidden md:hidden"
        initial={false}
        animate={
          isMenuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
        }
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        <div className="bento-card mt-2 grid gap-2 px-4 py-3">
          <div className="grid gap-2">
            {navItems.map((item) => {
              const id = item.href.slice(1);
              const isActive = activeSection === id;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`rounded px-3 py-2 text-center text-sm font-medium transition ${
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
            className="flex items-center justify-center gap-2 rounded border px-3 py-2 text-sm font-semibold transition theme-panel theme-muted hover:border-[var(--site-accent)] hover:text-[var(--site-heading)] sm:hidden"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? <FiSun aria-hidden /> : <FiMoon aria-hidden />}
            Switch to {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </motion.div>
    </header>
  );
}



