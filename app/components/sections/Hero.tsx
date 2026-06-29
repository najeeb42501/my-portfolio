"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  FiArrowDown,
  FiArrowUpRight,
  FiDownload,
  FiGithub,
  FiLinkedin,
  FiMail,
} from "react-icons/fi";

const heroLinks = [
  { label: "GitHub", href: "https://example.com/", icon: FiGithub },
  { label: "LinkedIn", href: "https://example.com/", icon: FiLinkedin },
  { label: "Email", href: "mailto:najeeb08089@gmail.com", icon: FiMail },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center overflow-hidden bg-[var(--site-bg)] px-5 pb-10 pt-24 sm:px-8 lg:h-svh lg:max-h-svh"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <motion.div
          className="relative z-10 max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] theme-accent">
            Full-stack developer
          </p>

          <h1 className="mt-6 text-balance text-[clamp(3rem,6.5vw,5.75rem)] font-black leading-[0.92] tracking-tight theme-heading">
            I&apos;m <span className="theme-accent">Najeeb</span>, Software
            Engineer
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 theme-muted sm:text-lg">
            I build colorful, high-performance web products with clean UI
            systems, reliable backend integrations, and polished developer
            energy.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#about"
              className="minimal-button theme-ink-bg inline-flex items-center gap-2 px-6 py-3 text-sm font-bold"
            >
              About
            </a>
            <a
              href="/Najeeb-Ullah-Khan-CV.pdf"
              download
              className="minimal-button theme-primary-bg inline-flex items-center gap-2 px-6 py-3 text-sm font-bold"
            >
              <FiDownload aria-hidden />
              Download CV
            </a>
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto flex w-full max-w-xl items-center justify-center lg:mr-0"
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative w-[min(76vw,27rem)] overflow-hidden rounded-[2rem]">
            <Image
              src="/najeeb-profile.png"
              alt="Najeeb Ullah Khan"
              width={720}
              height={840}
              priority
              className="h-auto w-full object-contain"
            />
          </div>

          <a
            href="#contact"
            aria-label="Go to contact section"
            className="absolute bottom-0 right-[calc(50%-14rem)] grid size-20 place-items-center rounded-full border-[10px] border-[var(--site-bg)] bg-[var(--theme-primary-bg-start)] text-3xl text-white transition hover:scale-105 sm:size-24 sm:text-4xl lg:right-2"
          >
            <FiArrowUpRight aria-hidden />
          </a>

          <div className="absolute -right-2 top-1/2 hidden -translate-y-1/2 items-center gap-4 lg:flex">
            <span
              className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--theme-primary-bg-start)]"
              style={{ writingMode: "vertical-rl" }}
            >
              Follow me on
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
