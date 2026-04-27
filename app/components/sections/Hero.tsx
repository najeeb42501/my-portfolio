"use client";

import { motion } from "framer-motion";
import CodeTypewriter from "../hero/CodeTypewriter";
import FloatingTechIcons from "../hero/FloatingTechIcons";
import IntroTerminal from "../hero/IntroTerminal";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate flex h-svh max-h-svh items-center justify-center overflow-hidden pb-4 pt-10"
    >
      <div className="absolute inset-0 theme-hero-bg" />
      <div
        className="hero-grid absolute inset-0 opacity-50"
        aria-hidden="true"
      />
      <FloatingTechIcons />

      <motion.div
        className="relative z-10 flex h-full min-h-0 w-full overflow-hidden rounded border backdrop-blur theme-surface"
        initial={{ opacity: 0, y: 28, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="relative flex min-h-0 flex-1 overflow-hidden">
            <CodeTypewriter />
          </div>
          <div className="grid border-t theme-border xl:grid-cols-[1fr_auto]">
            <IntroTerminal />
            <motion.div
              className="flex flex-col gap-3 border-t p-4 theme-border theme-panel xl:border-l xl:border-t-0"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.55 }}
            >
              <a
                href="#projects"
                className="rounded px-5 py-3 text-center text-sm font-semibold shadow-[0_0_32px_var(--site-glow)] transition theme-accent-bg hover:scale-[1.03] hover:shadow-[0_0_42px_var(--site-glow)]"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="rounded border px-5 py-3 text-center text-sm font-semibold transition theme-panel theme-heading hover:scale-[1.03] hover:border-[var(--site-accent)] hover:shadow-[0_0_30px_var(--site-glow)]"
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
