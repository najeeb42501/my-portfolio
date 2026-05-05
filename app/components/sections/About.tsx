"use client";

import { motion } from "framer-motion";
import { stats } from "../data/portfolio";
import Reveal from "../shared/Reveal";

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

const capabilityMetrics = [
  { label: "Frontend architecture", value: 92, tone: "bg-cyan-400" },
  { label: "Dashboard UI systems", value: 88, tone: "bg-violet-400" },
  { label: "API integration", value: 84, tone: "bg-emerald-400" },
  { label: "Performance polish", value: 79, tone: "bg-amber-400" },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden px-5 py-24 sm:px-8">
      <div className="absolute inset-x-0 top-32 h-px bg-[linear-gradient(to_right,transparent,var(--site-accent),transparent)] opacity-25" />
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto mb-14 max-w-5xl text-center">
          <p className="mb-3 text-sm font-medium uppercase theme-accent">
            About
          </p>
          <h2 className="text-balance text-3xl font-semibold theme-heading md:text-5xl">
            Thoughtful engineering for products that need to feel effortless.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 theme-muted">
            I bring experienced judgment to modern web apps, blending product
            clarity, interface craft, and maintainable systems.
          </p>
        </Reveal>

        <div className="grid overflow-hidden rounded border border-white/15 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--site-surface)_92%,transparent),color-mix(in_srgb,var(--site-panel)_72%,transparent))] shadow-[0_24px_90px_rgba(15,23,42,0.16)] backdrop-blur lg:grid-cols-[1.08fr_0.92fr]">
          <Reveal>
            <div className="relative h-full p-6 sm:p-8">
              <div className="absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--site-accent),transparent)]" />
              <p className="font-mono text-sm uppercase tracking-[0.28em] theme-accent">
                developer with product instincts
              </p>
              <h3 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-tight theme-heading sm:text-5xl">
                I build web experiences that feel calm on the surface and
                disciplined underneath.
              </h3>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {stats.map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="rounded border border-white/15 bg-white/[0.035] p-4"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: index * 0.08 }}
                  >
                    <span className="text-3xl font-black theme-heading">
                      {item.value}
                    </span>
                    <p className="mt-2 text-xs leading-5 theme-subtle">
                      {item.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full space-y-4 border-t border-white/15 bg-[color-mix(in_srgb,var(--site-panel)_46%,transparent)] p-6 sm:p-8 lg:border-l lg:border-t-0">
              {focusLines.map((line, index) => (
                <motion.p
                  key={line}
                  className="relative rounded border border-white/10 bg-[color-mix(in_srgb,var(--site-surface)_58%,transparent)] px-4 py-3 text-base leading-7 theme-text"
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.09 }}
                >
                  <span className="mr-3 inline-block size-1.5 rounded-full bg-[var(--site-accent)] align-middle shadow-[0_0_16px_var(--site-glow)]" />
                  {line}
                </motion.p>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-10">
          <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded border border-white/15 bg-[color-mix(in_srgb,var(--site-panel)_62%,transparent)] p-5 shadow-sm backdrop-blur">
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.22em] theme-accent">
                Capability graph
              </p>
              <div className="space-y-4">
                {capabilityMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                  >
                    <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                      <span className="font-medium theme-text">
                        {metric.label}
                      </span>
                      <span className="font-mono text-xs theme-muted">
                        {metric.value}%
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className={`h-full rounded-full ${metric.tone}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${metric.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.12 + index * 0.08 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-[0.8fr_1.2fr]">
              <div className="grid place-items-center rounded border border-white/15 bg-[color-mix(in_srgb,var(--site-panel)_62%,transparent)] p-5 shadow-sm backdrop-blur">
                <div className="relative grid size-40 place-items-center rounded-full bg-[conic-gradient(var(--site-accent)_0_78%,rgba(255,255,255,0.1)_78%_100%)]">
                  <div className="grid size-28 place-items-center rounded-full bg-[var(--site-surface-strong)]">
                    <span className="text-3xl font-black theme-heading">
                      78%
                    </span>
                    <span className="text-[0.65rem] uppercase tracking-[0.18em] theme-muted">
                      UI focus
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded border border-white/15 bg-[color-mix(in_srgb,var(--site-panel)_62%,transparent)] p-5 shadow-sm backdrop-blur">
                <p className="text-xs font-medium uppercase tracking-[0.22em] theme-accent">
                  Work mix
                </p>
                <div className="mt-5 grid gap-3">
                  {[
                    ["UI systems", "42%", "bg-cyan-400"],
                    ["Integrations", "28%", "bg-violet-400"],
                    ["Performance", "18%", "bg-emerald-400"],
                    ["Deployment", "12%", "bg-amber-400"],
                  ].map(([label, value, color]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between rounded border border-white/10 bg-white/[0.035] px-3 py-2 text-sm"
                    >
                      <span className="flex items-center gap-2 theme-text">
                        <span className={`size-2 rounded-full ${color}`} />
                        {label}
                      </span>
                      <span className="font-mono text-xs theme-muted">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
