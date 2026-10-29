"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { caseStudies, projectBySlug, type CaseStudy } from "@/data/projects";
import { useMediaQuery } from "../../lib/client";
import Reveal from "../ui/Reveal";

const count = caseStudies.length;

function Card({
  study,
  index,
  progress,
}: {
  study: CaseStudy;
  index: number;
  progress: MotionValue<number> | null;
}) {
  const second = projectBySlug(study.modules[0].project).images[1] ?? study.cover;
  const step = 1 / Math.max(1, count - 1);
  const at = index * step;
  const still = useMotionValue(at);
  const source = progress ?? still;
  // Keep every offset inside 0..1: scroll-linked transforms can run as native animations.
  const input = [at - step, at, at + step].filter((v) => v >= 0 && v <= 1);
  const peak = input.indexOf(at);
  const scale = useTransform(source, input, input.map((_, i) => (i === peak ? 1 : 0.93)));
  const opacity = useTransform(source, input, input.map((_, i) => (i === peak ? 1 : 0.45)));

  return (
    <motion.article
      className="featured-card"
      style={{ "--tint": study.tint, ...(progress ? { scale, opacity } : {}) } as React.CSSProperties}
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${count}: ${study.title}`}
    >
      <span className="featured-num" aria-hidden>
        0{index + 1}
      </span>
      <div className="featured-copy">
        <p className="featured-meta">{study.category}</p>
        <h3 className="featured-title">{study.title}</h3>
        <p className="featured-outcome">{study.outcome}</p>
        <ul className="featured-metrics">
          {study.metrics.map((metric) => (
            <li key={metric}>{metric}</li>
          ))}
        </ul>
        <div className="featured-tags">
          {study.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="featured-actions">
          <Link href={`/work/${study.slug}`} className="btn btn-white">
            Read the case study
          </Link>
          {study.demo ? (
            <a href={study.demo} target="_blank" rel="noreferrer" className="btn btn-clear">
              Visit live <FiArrowUpRight aria-hidden />
            </a>
          ) : null}
        </div>
      </div>
      <div className="featured-media">
        <div className="featured-browser">
          <div className="featured-browser-bar" aria-hidden>
            <i />
            <i />
            <i />
          </div>
          <div className="featured-shot">
            <Image
              src={study.cover}
              alt={`${study.title} screenshot`}
              fill
              loading="eager"
              sizes="(max-width: 767px) 86vw, 640px"
            />
          </div>
        </div>
        <div className="featured-float" aria-hidden>
          <Image src={second} alt="" fill loading="eager" sizes="240px" />
        </div>
      </div>
    </motion.article>
  );
}

/** Pinned while the page scrolls past it; the cards glide sideways. */
function PinnedSlider({ active, setActive }: { active: number; setActive: (i: number) => void }) {
  const pinRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);
  const { scrollYProgress } = useScroll({ target: pinRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (v) => -v * shift);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current || !viewportRef.current) return;
      setShift(Math.max(0, trackRef.current.scrollWidth - viewportRef.current.clientWidth));
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    if (viewportRef.current) observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.round(v * (count - 1));
    if (next !== active) setActive(next);
  });

  const go = (index: number) => {
    const pin = pinRef.current;
    if (!pin) return;
    setActive(index);
    const top = pin.getBoundingClientRect().top + window.scrollY;
    const target = top + (pin.offsetHeight - window.innerHeight) * (index / Math.max(1, count - 1));
    if (window.__lenis) window.__lenis.scrollTo(target, { duration: 1.1 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <div ref={pinRef} className="featured-pin" style={{ height: `${count * 100}vh` }}>
      <div className="featured-sticky">
        <Controls active={active} go={go} progress={scrollYProgress} />
        <div ref={viewportRef} className="featured-viewport">
          <motion.div ref={trackRef} className="featured-track" style={{ x }}>
            {caseStudies.map((study, index) => (
              <Card key={study.slug} study={study} index={index} progress={scrollYProgress} />
            ))}
          </motion.div>
        </div>
        <p className="featured-hint container">Keep scrolling to move through the case studies</p>
      </div>
    </div>
  );
}

/** Small screens and reduced motion: a swipeable row with snap points. */
function SwipeSlider({ active, setActive }: { active: number; setActive: (i: number) => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: trackRef });

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    const center = track.scrollLeft + track.clientWidth / 2;
    let nearest = 0;
    cards.forEach((card, i) => {
      const mid = card.offsetLeft + card.offsetWidth / 2;
      const best = cards[nearest].offsetLeft + cards[nearest].offsetWidth / 2;
      if (Math.abs(mid - center) < Math.abs(best - center)) nearest = i;
    });
    if (nearest !== active) setActive(nearest);
  };

  const go = (index: number) => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    setActive(index);
    track.scrollTo({ left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2, behavior: "smooth" });
  };

  return (
    <div className="featured-swipe">
      <Controls active={active} go={go} progress={scrollXProgress} />
      <div ref={trackRef} className="featured-track featured-track-swipe" onScroll={onScroll}>
        {caseStudies.map((study, index) => (
          <Card key={study.slug} study={study} index={index} progress={null} />
        ))}
      </div>
    </div>
  );
}

function Controls({
  active,
  go,
  progress,
}: {
  active: number;
  go: (index: number) => void;
  progress: MotionValue<number>;
}) {
  return (
    <div className="container featured-head">
      <p className="featured-counter">
        <strong>Featured</strong>
        <span aria-live="polite">
          {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
      </p>
      <div className="featured-progress" aria-hidden>
        <motion.span style={{ scaleX: progress }} />
      </div>
      <div className="featured-controls" role="group" aria-label="Choose a case study">
        {caseStudies.map((study, index) => (
          <button
            key={study.slug}
            type="button"
            aria-pressed={active === index}
            aria-label={`Show ${study.title}`}
            onClick={() => go(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default function Featured() {
  const pinned = useMediaQuery("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
  const [active, setActive] = useState(0);

  return (
    <section className="featured" id="work" aria-labelledby="work-title">
      <Reveal className="container section-title-block">
        <p className="kicker">Selected work</p>
        <h2 className="title-xl" id="work-title">
          Product <span className="serif grad-text">showcase</span>
        </h2>
        <p className="lead">
          Three products I helped take from first flow to production. Each one has a full case study.
        </p>
      </Reveal>
      {pinned ? (
        <PinnedSlider active={active} setActive={setActive} />
      ) : (
        <SwipeSlider active={active} setActive={setActive} />
      )}
    </section>
  );
}
