"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { timeline } from "../data/portfolio";
import SectionHeading from "../shared/SectionHeading";

const roleDetails = [
  {
    accent: "from-sky-400 via-cyan-300 to-emerald-300",
    focus: "Platform leadership",
    impact: "Owned frontend architecture, release quality, and performance budgets across product surfaces.",
    tags: ["Next.js", "Design Systems", "API Reliability"],
  },
  {
    accent: "from-violet-400 via-fuchsia-300 to-sky-300",
    focus: "Interface delivery",
    impact: "Shipped customer dashboards with accessible flows, faster interactions, and reusable UI patterns.",
    tags: ["React", "Accessibility", "Performance"],
  },
  {
    accent: "from-amber-300 via-orange-300 to-rose-300",
    focus: "Full-stack execution",
    impact: "Built data-rich applications, integrations, and internal automation for growing product teams.",
    tags: ["Node.js", "Databases", "Integrations"],
  },
];

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
  const detail = roleDetails[index % roleDetails.length];

  return (
    <div
      ref={cardRef}
      className="relative sticky"
      style={{ top: stickyTop, zIndex: timeline.length + index }}
    >
      <motion.article
        className="grid min-h-[22rem] overflow-hidden rounded border shadow-2xl theme-surface md:grid-cols-[0.42fr_1.58fr]"
        style={{ scale, y }}
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative overflow-hidden border-b p-6 theme-border md:border-b-0 md:border-r md:p-7">
          <div
            className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${detail.accent}`}
          />
          <div
            className={`absolute -bottom-16 -left-16 size-44 rounded-full bg-gradient-to-br ${detail.accent} opacity-15 blur-2xl`}
          />
          <span className="font-mono text-sm theme-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="mt-8 text-xs uppercase tracking-[0.22em] theme-subtle">
            {item.period}
          </p>
          <p className="mt-3 text-xl font-semibold theme-heading">
            {item.company}
          </p>
          <p className="mt-5 rounded-full border px-3 py-1 text-xs font-medium theme-accent-soft">
            {detail.focus}
          </p>
        </div>

        <div className="flex flex-col justify-between p-6 md:p-8">
          <div>
            <h3 className="text-balance text-3xl font-semibold leading-tight theme-heading md:text-4xl">
              {item.role}
            </h3>
            <p className="mt-5 max-w-3xl text-lg leading-8 theme-text">
              {item.details}
            </p>
            <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
              <p className="border-l-2 border-[var(--site-accent)] pl-4 leading-7 theme-muted">
                {detail.impact}
              </p>
              <div className="flex flex-wrap gap-2 lg:max-w-72 lg:justify-end">
                {detail.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border px-3 py-1 text-xs font-medium theme-panel theme-text"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-9 flex items-center gap-4">
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
          title="Roles stacked by impact, revealed as you scroll."
          copy="A vertical career stack shaped around reliable delivery, thoughtful interfaces, and product-minded engineering."
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
