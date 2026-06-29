"use client";

import { motion } from "framer-motion";
import { FiCheck, FiCloud, FiCode, FiCpu, FiLayers, FiZap } from "react-icons/fi";
import { stats } from "../data/portfolio";
import Reveal from "../shared/Reveal";

const focusLines = [
  "I turn unclear product ideas into clean web experiences with practical architecture.",
  "I care about the full path: interface states, API contracts, performance, security, and release quality.",
  "The goal is software that looks sharp, works smoothly, and stays easy to grow.",
];

const capabilityCards = [
  {
    title: "Problem solving",
    copy: "Breaking unclear requirements into practical product flows, states, and implementation steps.",
    icon: FiCpu,
    tone: "text-[var(--theme-card-purple-solid)]",
  },
  {
    title: "Delivery mindset",
    copy: "Shipping reliable work with release hygiene, clear communication, and useful iteration.",
    icon: FiCloud,
    tone: "text-[var(--theme-card-pink-solid)]",
  },
  {
    title: "Performance optimizations",
    copy: "Improving render speed, bundle weight, API flow, and smooth interaction details.",
    icon: FiZap,
    tone: "text-[var(--theme-card-sky-solid)]",
  },
  {
    title: "Clean architecture",
    copy: "Designing reusable components, clear data flow, and maintainable frontend systems.",
    icon: FiLayers,
    tone: "text-[var(--theme-card-orange-solid)]",
  },
];

const workflow = [
  {
    title: "Listen",
    copy: "Understand the product goal, user path, constraints, and success signal.",
    tone: "bg-[var(--theme-card-pink-solid)]",
    textTone: "text-[var(--theme-card-pink-solid)]",
  },
  {
    title: "Shape",
    copy: "Turn the messy middle into components, data flow, and a realistic build path.",
    tone: "bg-[var(--theme-card-orange-solid)]",
    textTone: "text-[var(--theme-card-orange-solid)]",
  },
  {
    title: "Build",
    copy: "Ship typed, polished features with resilient UI states and clean integration.",
    tone: "bg-[var(--theme-card-purple-solid)]",
    textTone: "text-[var(--theme-card-purple-solid)]",
  },
  {
    title: "Refine",
    copy: "Measure, simplify, tune, and keep the product easier to use and maintain.",
    tone: "bg-[var(--theme-card-sky-solid)]",
    textTone: "text-[var(--theme-card-sky-solid)]",
  },
];

export default function About() {
  return (
    <section id="about" className="section-band relative overflow-hidden px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto mb-12 max-w-4xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.26em] theme-accent">
            About
          </p>
          <h2 className="mt-5 text-balance text-2xl font-black leading-tight tracking-tight theme-heading sm:text-3xl lg:text-4xl">
            Thoughtful engineering for products that need to feel effortless.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 theme-muted">
            I blend product clarity, interface craft, and maintainable systems
            to build modern web apps that feel calm, useful, and reliable.
          </p>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <motion.div
              className="theme-primary-bg relative flex min-h-[27rem] flex-col justify-between overflow-hidden rounded-[1.5rem] border border-white/18 p-6 text-white sm:p-8"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
              <div className="absolute -right-16 -top-16 size-56 rounded-full bg-white/18 blur-3xl" />
              <div className="absolute -bottom-20 left-1/3 size-64 rounded-full bg-black/10 blur-3xl" />

              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-2xl bg-white text-[var(--theme-primary)] shadow-lg">
                    <FiCode aria-hidden className="text-lg" />
                  </span>
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-white/82">
                    developer with product instincts
                  </p>
                </div>

                <h3 className="mt-8 max-w-3xl text-balance text-2xl font-black leading-tight text-white sm:text-3xl lg:text-4xl">
                  I build web experiences that feel calm on the surface and
                  disciplined underneath.
                </h3>

                <ul className="mt-5 grid gap-2 text-sm leading-6 text-white/82">
                  {focusLines.map((line) => (
                    <li key={line} className="flex gap-3 py-1">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-white text-[var(--theme-primary)]">
                        <FiCheck aria-hidden className="text-xs" />
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {stats.map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="rounded-xl border border-white/20 bg-white/14 p-4 backdrop-blur"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: index * 0.07 }}
                    >
                      <span className="text-3xl font-black text-white">
                        {item.value}
                      </span>
                      <p className="mt-2 text-xs leading-5 text-white/74">
                        {item.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </Reveal>

          <div className="grid content-stretch gap-2 lg:h-full lg:grid-rows-4">
            {capabilityCards.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * 0.08} className="h-full">
                  <motion.article
                    className="relative flex h-full min-h-[6.5rem] items-center border-b px-3 py-4 theme-border lg:min-h-0"
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  >
                    <div className="flex w-full items-center gap-4">
                      <span className={`${item.tone} grid size-11 shrink-0 place-items-center rounded-xl border theme-border`}>
                        <Icon aria-hidden className="text-lg" />
                      </span>
                      <div>
                        <h3 className={`${item.tone} text-lg font-black leading-tight`}>{item.title}</h3>
                        <p className={`${item.tone} mt-1.5 text-sm leading-6 opacity-80`}>
                          {item.copy}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal className="mt-10">
          <div className="grid gap-5 lg:flex lg:items-start lg:gap-0">
            {workflow.map((step, index) => (
              <motion.article
                key={step.title}
                className={`relative lg:flex-1 ${index > 0 ? "lg:-ml-9" : ""} ${index % 2 === 1 ? "lg:translate-y-8" : ""}`}
                style={{ zIndex: index + 1 }}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
              >
                <div
                  className={`${step.tone} relative min-h-44 overflow-hidden rounded-[1.15rem] border border-white/15 p-5 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)] ${
                    index < workflow.length - 1 ? "lg:pr-14" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`${step.textTone} grid size-11 place-items-center rounded-2xl bg-white font-mono text-xs font-black shadow-[0_14px_35px_rgba(15,23,42,0.18)]`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/70">
                      Step
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-black text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/82">
                    {step.copy}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}














