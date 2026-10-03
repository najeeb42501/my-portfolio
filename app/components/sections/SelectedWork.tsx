"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { caseStudies, projectBySlug, type CaseStudy } from "@/data/projects";
import { useMediaQuery } from "../../lib/client";
import BrowserFrame from "../ui/BrowserFrame";
import SectionHeader from "../ui/SectionHeader";

const total = caseStudies.length;

export default function SelectedWork() {
  const stackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 768px)");
  const animated = desktop && !reduced;
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="section" id="work" aria-labelledby="work-title" style={{ paddingBottom: 0 }}>
      <div className="container">
        <SectionHeader
          index="01"
          label="Selected work"
          id="work-title"
          title={
            <>
              Built to make a <span className="serif">difference</span>.
            </>
          }
          lead="Three products I'm proud of: platforms that move real money, keep operations running, and make dense information usable."
        />
        <div ref={stackRef} className={`stack${animated ? "" : " is-static"}`}>
          {caseStudies.map((study, index) => (
            <StackCard
              key={study.slug}
              study={study}
              index={index}
              progress={scrollYProgress}
              animated={animated}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StackCard({
  study,
  index,
  progress,
  animated,
}: {
  study: CaseStudy;
  index: number;
  progress: MotionValue<number>;
  animated: boolean;
}) {
  const span = Math.max(total - 1, 1);
  const isLast = index === total - 1;
  const start = index / span;
  const scale = useTransform(progress, [start, 1], [1, isLast ? 1 : 1 - (total - 1 - index) * 0.03]);
  const dim = useTransform(progress, [start, Math.min((index + 1) / span, 1)], [0, isLast ? 0 : 0.55]);
  const shotY = useTransform(
    progress,
    [Math.max((index - 1) / span, 0), Math.min((index + 1) / span, 1)],
    [32, -32],
  );

  const modules = study.modules.length > 1 ? study.modules.map((m) => projectBySlug(m.project).title) : null;
  const domain = study.demo ? new URL(study.demo).host : undefined;

  return (
    <div className="stack-slot">
      <motion.article
        className="stack-card"
        style={animated ? { scale, top: index * 20 } : undefined}
        aria-labelledby={`${study.slug}-title`}
      >
        <div className="stack-info">
          <span className="stack-index">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} · {study.category}
          </span>
          <h3 className="h3" id={`${study.slug}-title`}>
            {study.title}
          </h3>
          <p className="lead">{study.outcome}</p>
          <div className="chips" aria-label="Highlights">
            {study.metrics.map((metric) => (
              <span key={metric} className="chip chip-solid">
                {metric}
              </span>
            ))}
          </div>
          {modules ? (
            <p className="stack-modules">
              <strong>Includes</strong> {modules.join(" · ")}
            </p>
          ) : null}
          <div className="chips" aria-label="Stack">
            {study.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>
          <div className="stack-actions">
            <Link href={`/work/${study.slug}`} className="btn btn-solid btn-sm">
              Read case study <FiArrowRight aria-hidden />
            </Link>
            {study.demo ? (
              <a href={study.demo} target="_blank" rel="noreferrer" className="text-link">
                Live site <FiArrowUpRight aria-hidden />
              </a>
            ) : null}
          </div>
        </div>
        <div className="stack-media" style={{ "--glow-color": study.tint } as React.CSSProperties}>
          <div className="glow" aria-hidden />
          <motion.div style={animated ? { y: shotY, height: "100%" } : { height: "100%" }}>
            <BrowserFrame
              src={study.cover}
              alt={`${study.title} interface`}
              url={domain}
              sizes="(max-width: 767px) 92vw, 700px"
            />
          </motion.div>
        </div>
        {animated && !isLast ? <motion.div className="stack-dim" style={{ opacity: dim }} aria-hidden /> : null}
      </motion.article>
    </div>
  );
}
