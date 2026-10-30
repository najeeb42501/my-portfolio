"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { caseStudies } from "@/data/projects";

const hues: Record<string, string> = {
  "ubl-funds": "var(--hue-interfaces)",
  "jobs-dashboard": "var(--hue-systems)",
  paklexai: "var(--hue-intelligence)",
};

/** Case studies as product tiles in a native snap carousel: swipe, scroll or use the controls. */
export default function Work() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const go = (index: number) => {
    const el = track.current;
    const card = el?.children[index] as HTMLElement | undefined;
    if (!el || !card) return;
    const smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2, behavior: smooth ? "smooth" : "auto" });
    setActive(index);
  };

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDistance = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const c = child as HTMLElement;
      const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
      if (d < bestDistance) {
        bestDistance = d;
        best = i;
      }
    });
    if (best !== active) setActive(best);
  };

  return (
    <section className="section work" id="work" aria-labelledby="work-title">
      <header className="section-head container">
        <p className="kicker">Selected work</p>
        <h2 className="title" id="work-title">
          Products I helped ship.
        </h2>
      </header>

      <div className="work-track" ref={track} onScroll={onScroll} aria-label="Case studies" role="region" tabIndex={0}>
        {caseStudies.map((study, i) => (
          <article key={study.slug} className="work-tile" aria-roledescription="slide" aria-label={`${i + 1} of ${caseStudies.length}`}>
            <p className="work-category" style={{ color: hues[study.slug] }}>
              {study.category.replace(" · ", ", ")}
            </p>
            <h3 className="work-title">{study.title}</h3>
            <p className="work-outcome">{study.outcome}</p>
            <div className="work-actions">
              <Link href={`/work/${study.slug}`} className="pill-btn">
                Read the case study
              </Link>
              {study.demo ? (
                <a href={study.demo} target="_blank" rel="noreferrer" className="chevron-link">
                  Visit live
                </a>
              ) : null}
            </div>
            <div className="laptop">
              <div className="laptop-screen">
                <Image src={study.cover} alt={`${study.title} screenshot`} fill sizes="(max-width: 767px) 80vw, 760px" />
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="work-controls">
        <button type="button" className="round-btn" onClick={() => go(Math.max(0, active - 1))} aria-label="Previous case study">
          <FiChevronLeft aria-hidden />
        </button>
        <div className="work-dots">
          {caseStudies.map((study, i) => (
            <button key={study.slug} type="button" aria-label={`Show ${study.title}`} aria-pressed={i === active} onClick={() => go(i)} />
          ))}
        </div>
        <button
          type="button"
          className="round-btn"
          onClick={() => go(Math.min(caseStudies.length - 1, active + 1))}
          aria-label="Next case study"
        >
          <FiChevronRight aria-hidden />
        </button>
      </div>
    </section>
  );
}
