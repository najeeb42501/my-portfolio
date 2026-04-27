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
        className="grid min-h-[22rem]  overflow-hidden rounded border shadow-2xl theme-surface md:grid-cols-[0.7fr_1.3fr] "
        style={{ scale, y }}
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative border-b p-6 theme-border md:border-b-0 md:border-r md:p-8 ">
          <span className="font-mono text-sm theme-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="mt-8 text-sm uppercase tracking-[0.22em] theme-subtle">
            {item.period}
          </p>
          <p className="mt-3 text-2xl font-semibold theme-heading">
            {item.company}
          </p>
          <div className="absolute bottom-0 left-0 h-1 w-full bg-[linear-gradient(to_right,var(--site-accent),transparent)]" />
        </div>

        <div className="flex flex-col justify-between p-6 md:p-8">
          <div>
            <h3 className="text-balance text-3xl font-semibold leading-tight theme-heading md:text-5xl">
              {item.role}
            </h3>
            <p className="mt-5 max-w-2xl text-lg leading-9 theme-text">
              {item.details}
            </p>
          </div>

          <div className="mt-10 flex items-center gap-4">
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
