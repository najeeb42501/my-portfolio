"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { timeline } from "../data/portfolio";
import SectionHeading from "../shared/SectionHeading";

function ExperienceCard({
  item,
  index,
}: {
  item: (typeof timeline)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 72%", "start 18%"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -18]);
  const stickyTop = `calc(6rem + ${index * 1.4}rem)`;

  return (
    <div
      ref={cardRef}
      className="relative sticky"
      style={{ top: stickyTop, zIndex: timeline.length + index }}
    >
      <motion.article
        className="relative overflow-hidden rounded border border-white/15 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--site-surface)_92%,transparent),color-mix(in_srgb,var(--site-panel)_74%,transparent))] p-5 shadow-[0_24px_90px_rgba(15,23,42,0.18)] backdrop-blur md:p-7"
        style={{ scale, y }}
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.accent}`}
        />
        <div
          className={`pointer-events-none absolute -bottom-20 -left-16 size-56 rounded-full bg-gradient-to-br ${item.accent} opacity-15 blur-2xl`}
        />
        <div
          className={`pointer-events-none absolute right-8 top-8 h-24 w-24 rounded-full bg-gradient-to-br ${item.accent} opacity-10 blur-2xl`}
        />

        <div className="relative z-10">
          <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.6fr]">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-xs uppercase tracking-[0.22em] theme-subtle">
                  <span className="font-mono theme-accent">
                    {String(index + 1).padStart(2, "0")}:
                  </span>{" "}
                  Company
                </p>
                <span className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs font-medium theme-muted">
                  {item.period}
                </span>
              </div>
              <h3 className="mt-3 text-2xl font-semibold leading-tight theme-heading">
                {item.company}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.focuses.map((focus) => (
                  <span
                    key={focus}
                    className="rounded border border-[var(--site-accent)]  px-3 py-1 text-xs font-semibold theme-accent"
                  >
                    {focus}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.24em] theme-accent">
                Role
              </p>
              <h3 className="text-balance text-3xl font-semibold leading-tight theme-heading md:text-4xl">
                {item.role}
              </h3>
              <p className="mt-3 max-w-3xl text-base leading-7 theme-text md:text-lg">
                {item.details}
              </p>
              <div className="mt-3 rounded border border-white/15 bg-white/[0.035] p-4">
                <p className="text-xs font-medium uppercase tracking-[0.2em] theme-accent">
                  Impact
                </p>
                <p className="mt-2 leading-7 theme-muted">{item.impact}</p>
              </div>
            </div>
          </div>

          <div className="mt-3 grid gap-5 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] theme-subtle">
                Stack
              </p>
              <div className="flex h-full flex-wrap content-start gap-2 rounded border border-white/10 bg-[color-mix(in_srgb,var(--site-panel)_44%,transparent)] p-3">
                {item.tags.map((tag, tagIndex) => (
                  <span
                    key={tag}
                    className={`rounded-full border px-3 py-1 text-xs font-medium shadow-sm ${
                      tagIndex % 3 === 0
                        ? "border-cyan-400/30 bg-cyan-950/70 text-cyan-200"
                        : tagIndex % 3 === 1
                          ? "border-violet-400/30 bg-violet-950/70 text-violet-200"
                          : "border-emerald-400/30 bg-emerald-950/70 text-emerald-200"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] theme-subtle">
                Highlights
              </p>
              <ul className="grid gap-1.5">
                {item.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-2 rounded border border-white/10 bg-[color-mix(in_srgb,var(--site-panel)_64%,transparent)] px-3 py-1.5 text-sm leading-5 theme-text"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--site-accent)] shadow-[0_0_14px_var(--site-glow)]" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-7 flex items-center gap-4">
            <span className="h-px flex-1 bg-[var(--site-border)]" />
            <span className="font-mono text-xs uppercase tracking-[0.22em] theme-muted">
              shipped with care
            </span>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Experience"
          title="Professional Work Experience & Career Journey"
          copy="A detailed look at my past roles, responsibilities, and professional growth across frontend development, enterprise dashboards, real-time applications, backend integrations, responsive UI systems, and production-ready business platforms."
        />

        <div className="relative space-y-10 pb-[35vh]">
          {timeline.map((item, index) => (
            <ExperienceCard
              key={`${item.company}-${item.role}`}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
