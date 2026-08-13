"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  FiArrowDown,
  FiArrowUpRight,
  FiGithub,
  FiLinkedin,
  FiMail,
} from "react-icons/fi";

const heroLinks = [
  { label: "GitHub", href: "https://github.com/najeeb42501", icon: FiGithub },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/najeebullah-khan-86b759170/",
    icon: FiLinkedin,
  },
  { label: "Email", href: "mailto:najeeb08089@gmail.com", icon: FiMail },
];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const revealFrom = (distance: number) => ({
    opacity: 0,
    y: shouldReduceMotion ? 0 : distance,
  });

  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center overflow-hidden bg-[var(--site-bg)] px-5 pb-10 pt-24 sm:px-8 lg:h-svh lg:max-h-svh"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <motion.div
          className="relative z-10 max-w-3xl"
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="flex items-center gap-3"
            variants={{
              hidden: revealFrom(12),
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="h-px w-10 bg-[var(--site-accent)]" />
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] theme-accent">
              Najeeb Ullah Khan · Software Engineer
            </p>
          </motion.div>

          <motion.h1
            className="mt-7 max-w-[11ch] text-balance text-[clamp(3.15rem,6.5vw,5.75rem)] font-black leading-[0.94] tracking-[-0.055em] theme-heading"
            variants={{
              hidden: revealFrom(24),
              visible: { opacity: 1, y: 0 },
            }}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.08,
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Building digital products that{" "}
            <span className="relative inline-block theme-accent">
              feel effortless.
              <motion.span
                aria-hidden
                className="absolute -bottom-1 left-0 h-1 w-full origin-left rounded-full bg-[var(--site-accent)] opacity-25"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  delay: shouldReduceMotion ? 0 : 0.7,
                  duration: shouldReduceMotion ? 0 : 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </span>
          </motion.h1>

          <motion.p
            className="mt-7 max-w-xl text-base leading-8 theme-muted sm:text-lg"
            variants={{
              hidden: revealFrom(18),
              visible: { opacity: 1, y: 0 },
            }}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.18,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            I turn complex ideas into fast, dependable web experiences—with
            thoughtful interfaces, scalable systems, and details that make the
            product feel complete.
          </motion.p>

          <motion.div
            className="mt-9 flex items-center gap-4 border-l-2 border-[var(--site-accent)] pl-4"
            variants={{
              hidden: revealFrom(14),
              visible: { opacity: 1, y: 0 },
            }}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.28,
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className="relative flex size-2.5 shrink-0">
              <motion.span
                className="absolute inline-flex size-full rounded-full bg-emerald-400"
                animate={
                  shouldReduceMotion
                    ? undefined
                    : { opacity: [0.65, 0, 0.65], scale: [1, 1.8, 1] }
                }
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
            </span>
            <p className="text-sm font-medium leading-6 theme-muted">
              Available for full-stack, dashboard, and AI-enabled product work.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mx-auto flex w-full max-w-xl items-center justify-center lg:mr-0"
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative aspect-[6/7] w-[min(76vw,27rem)] overflow-hidden rounded-[2rem] bg-[#1698df] ">
            <Image
              src="/najeeb-profile.webp"
              alt="Najeeb Ullah Khan"
              fill
              preload
              sizes="(max-width: 1024px) 76vw, 432px"
              className="scale-[1.095] object-cover object-center"
            />
            <div className="absolute bottom-[-15px] right-[-15px] z-20 grid size-24 place-items-center rounded-tl-[4rem] rounded-tr-[3rem] rounded-bl-[3rem] bg-[var(--site-bg)] sm:size-28">
              <a
                href="#contact"
                aria-label="Go to contact section"
                className="theme-primary-bg grid size-16 place-items-center rounded-full border border-white/30 text-3xl text-white  transition hover:-translate-y-1 hover:scale-105 sm:size-[4.5rem] sm:text-4xl"
              >
                <FiArrowUpRight aria-hidden />
              </a>
            </div>
          </div>

          <div className="absolute -right-2 top-1/2 hidden -translate-y-1/2 items-center gap-4 lg:flex">
            <span
              className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--theme-primary-bg-start)]"
              style={{ writingMode: "vertical-rl" }}
            >
              Follow Us on
            </span>
            <span className="h-16 w-px bg-[var(--site-border-strong)]" />
            <div className="grid gap-3">
              {heroLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="grid size-8 place-items-center rounded-full text-[var(--theme-primary-bg-start)] transition hover:-translate-y-0.5 hover:bg-[var(--theme-primary-soft)]"
                  >
                    <Icon aria-hidden />
                  </a>
                );
              })}
            </div>
          </div>

          <FiArrowDown
            aria-hidden
            className="absolute -left-6 top-12 hidden rotate-[-35deg] text-4xl text-[var(--site-heading)] lg:block"
          />
        </motion.div>
      </div>
    </section>
  );
}
