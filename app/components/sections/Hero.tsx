"use client";

import { motion } from "framer-motion";
import CodeTypewriter from "../hero/CodeTypewriter";
import FloatingTechIcons from "../hero/FloatingTechIcons";
import IntroTerminal from "../hero/IntroTerminal";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-svh items-stretch justify-center overflow-hidden px-3 pb-3 pt-16 sm:px-4 md:h-svh md:max-h-svh md:items-center md:pt-14"
    >
      <div className="absolute inset-0 theme-hero-bg" />
      <div
        className="hero-grid absolute inset-0 opacity-50"
        aria-hidden="true"
      />
      <FloatingTechIcons />

      <motion.div
        className="relative z-10 flex min-h-[calc(100svh-4.75rem)] w-full overflow-hidden rounded border backdrop-blur theme-surface md:h-full md:min-h-0"
        initial={{ opacity: 0, y: 28, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="relative flex min-h-0 flex-1 md:overflow-hidden">
            <CodeTypewriter />
          </div>
          <div className="grid shrink-0 border-t theme-border xl:grid-cols-[minmax(0,1fr)_auto]">
            <IntroTerminal />
            <motion.div
              className="grid grid-cols-2 gap-2 border-t p-2.5 theme-border theme-panel sm:gap-3 sm:p-3 xl:flex xl:flex-col xl:border-l xl:border-t-0 xl:p-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.55 }}
            >
              <a
                href="#projects"
                className="rounded px-3 py-2 text-center text-xs font-semibold shadow-[0_0_32px_var(--site-glow)] transition theme-accent-bg hover:scale-[1.03] hover:shadow-[0_0_42px_var(--site-glow)] sm:py-2.5 sm:text-sm xl:px-5 xl:py-3"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="rounded border px-3 py-2 text-center text-xs font-semibold transition theme-panel theme-heading hover:scale-[1.03] hover:border-[var(--site-accent)] hover:shadow-[0_0_30px_var(--site-glow)] sm:py-2.5 sm:text-sm xl:px-5 xl:py-3"
              >
                Contact Me
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
