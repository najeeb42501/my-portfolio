"use client";

import { motion } from "framer-motion";
import CodeTypewriter from "../hero/CodeTypewriter";
import FloatingTechIcons from "../hero/FloatingTechIcons";
import IntroTerminal from "../hero/IntroTerminal";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate flex h-svh max-h-svh items-center justify-center overflow-hidden  pb-4 pt-10 "
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.15),transparent_34%),linear-gradient(135deg,#050505_0%,#0a0a0a_45%,#111014_100%)]" />
      <div
        className="hero-grid absolute inset-0 opacity-50"
        aria-hidden="true"
      />
      <FloatingTechIcons />

      <motion.div
        className="relative z-10 flex h-full min-h-0 w-full  overflow-hidden rounded border border-white/10 bg-[#0d1117]/95 shadow-2xl shadow-black/50 backdrop-blur"
        initial={{ opacity: 0, y: 28, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="relative flex min-h-0 flex-1 overflow-hidden">
            <CodeTypewriter />
          </div>
          <div className="grid border-t border-white/10 xl:grid-cols-[1fr_auto]">
            <IntroTerminal />
            <motion.div
              className="flex flex-col gap-3 border-t border-white/10 bg-black/45 p-4  xl:border-l xl:border-t-0"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.55 }}
            >
              <a
                href="#projects"
                className="rounded bg-cyan-300 px-5 py-3 text-center text-sm font-semibold text-black shadow-[0_0_32px_rgba(34,211,238,0.22)] transition hover:scale-[1.03] hover:bg-cyan-200 hover:shadow-[0_0_42px_rgba(34,211,238,0.34)]"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="rounded border border-white/15 bg-white/5 px-5 py-3 text-center text-sm font-semibold text-white transition hover:scale-[1.03] hover:border-cyan-300/60 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(34,211,238,0.16)]"
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
