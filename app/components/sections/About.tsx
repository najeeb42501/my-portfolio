"use client";

import { motion } from "framer-motion";
import { stats } from "../data/portfolio";
import Reveal from "../shared/Reveal";
import SectionHeading from "../shared/SectionHeading";

const focusLines = [
  "I translate unclear product ideas into useful, well-built web experiences.",
  "I care about the invisible parts too: performance, states, structure, and reliability.",
  "The goal is simple: software that looks sharp, works smoothly, and keeps growing cleanly.",
];

const workflow = [
  {
    title: "Listen",
    copy: "Understand the product, users, constraints, and what success should actually feel like.",
  },
  {
    title: "Shape",
    copy: "Turn the messy middle into a clear interface, data model, and build path.",
  },
  {
    title: "Build",
    copy: "Ship polished features with clean components, typed logic, and resilient UI states.",
  },
  {
    title: "Refine",
    copy: "Measure, tune, simplify, and keep the product easier to use and maintain.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden px-5 py-24 sm:px-8">
      <div className="absolute inset-x-0 top-32 h-px bg-[linear-gradient(to_right,transparent,var(--site-accent),transparent)] opacity-25" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="About"
          title="Thoughtful engineering for products that need to feel effortless."
          copy="I bring experienced judgment to modern web apps, blending product clarity, interface craft, and maintainable systems."
        />

        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <Reveal>
            <p className="font-mono text-sm uppercase tracking-[0.28em] theme-accent">
              developer with product instincts
            </p>
            <h3 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-tight theme-heading sm:text-5xl">
              I build the kind of web experiences that feel calm on the surface
              and disciplined underneath.
            </h3>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-5 border-l pl-6 theme-border">
              {focusLines.map((line, index) => (
                <motion.p
                  key={line}
                  className="relative text-lg leading-9 theme-text"
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.09 }}
                >
                  <span className="absolute -left-[1.73rem] top-3 size-2 rounded-full bg-[var(--site-accent)] shadow-[0_0_16px_var(--site-glow)]" />
                  {line}
                </motion.p>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-14">
          <div className="grid gap-8 border-y py-7 theme-border sm:grid-cols-3">
            {stats.map((item, index) => (
              <motion.div
                key={item.label}
                className="flex items-baseline gap-4"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <span className="text-4xl font-black theme-heading">
                  {item.value}
                </span>
                <span className="max-w-36 text-sm leading-5 theme-subtle">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-20">
          <div className="mb-2">
            <p className="font-mono text-sm uppercase tracking-[0.28em] theme-accent">
              how I work
            </p>
            <h3 className="mt-4 text-balance text-3xl font-semibold theme-heading sm:text-4xl">
              A simple flow from fuzzy idea to polished release.
            </h3>
          </div>

          <div className="relative hidden min-h-80 lg:block">
            <svg
              className="pointer-events-none absolute inset-0 z-0 h-full w-full"
              viewBox="0 0 1000 310"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <motion.path
                d="M 60 170 C 210 45, 330 45, 470 170 S 735 295, 940 132"
                fill="none"
                stroke="var(--site-accent)"
                opacity="0.34"
                strokeWidth="2"
                strokeDasharray="10 12"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </svg>

            {workflow.map((step, index) => {
              const positions = [
                "left-[3%] top-[48%]",
                "left-[28%] top-[18%]",
                "left-[50%] top-[58%]",
                "right-[1%] top-[58%]",
              ];

              return (
                <motion.div
                  key={step.title}
                  className={`absolute z-10 max-w-56 ${positions[index]}`}
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: 0.2 + index * 0.12 }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex size-12 items-center justify-center rounded-full border font-mono text-sm shadow-[0_0_34px_var(--site-glow)] theme-flow-node">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {/* <span className="h-px flex-1 bg-gradient-to-r from-cyan-300/60 to-transparent" /> */}
                  </div>
                  <h4 className="text-2xl font-semibold theme-heading">
                    {step.title}
                  </h4>
                  <p className="mt-3 text-sm leading-6 theme-muted">
                    {step.copy}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="relative grid gap-8 border-l pl-7 theme-border lg:hidden">
            {workflow.map((step, index) => (
              <motion.div
                key={step.title}
                className="relative"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <span className="absolute -left-[2.15rem] top-1 flex size-7 items-center justify-center rounded-full border font-mono text-[0.65rem] theme-flow-node">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h4 className="text-xl font-semibold theme-heading">
                  {step.title}
                </h4>
                <p className="mt-2 leading-7 theme-muted">{step.copy}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
