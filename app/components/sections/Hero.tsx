"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { FiArrowRight, FiArrowUpRight, FiGithub, FiLinkedin, FiZap } from "react-icons/fi";
import { impact, profile, socials } from "@/data/site";
import { scrollToId, useMediaQuery } from "../../lib/client";
import Magnetic from "../hero/Magnetic";
import RotatingWords from "../hero/RotatingWords";
import TextScramble from "../hero/TextScramble";
import Ticker from "../ui/Ticker";

const NAME = "NAJEEB";
const BUILDS = ["fintech portals", "real-time dashboards", "AI-powered products", "onboarding flows"];
const stats = impact.slice(0, 3);

/** One word split into letters that rise out of a mask. CSS-driven, so it starts on first paint. */
function Letters({ text, start }: { text: string; start: number }) {
  return (
    <span className="hx-word">
      {Array.from(text).map((char, i) => (
        <span key={i} className="hx-char" style={{ "--i": start + i } as React.CSSProperties}>
          {char}
        </span>
      ))}
    </span>
  );
}

const RING_A = "M 10 300 A 290 104 0 1 0 590 300 A 290 104 0 1 0 10 300";
const RING_B = "M 550 300 A 250 78 0 1 0 50 300 A 250 78 0 1 0 550 300";

/**
 * Two tilted rings with a dot travelling along each. Rendered twice: behind the portrait,
 * and in front with only the lower arc visible, so the rings appear to wrap around him.
 */
function Orbits({ className, moving }: { className: string; moving: boolean }) {
  return (
    <svg className={className} viewBox="0 0 600 600" aria-hidden>
      <g transform="rotate(-12 300 300)">
        <path className="hx-ring" d={RING_A} />
        {moving ? (
          <circle className="hx-orbit-dot" r="4">
            <animateMotion dur="16s" repeatCount="indefinite" path={RING_A} />
          </circle>
        ) : null}
      </g>
      <g transform="rotate(14 300 300)">
        <path className="hx-ring" d={RING_B} />
        {moving ? (
          <circle className="hx-orbit-dot" r="3">
            <animateMotion dur="22s" repeatCount="indefinite" path={RING_B} />
          </circle>
        ) : null}
      </g>
    </svg>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const interactive = finePointer && !reduced;

  // Pointer depth: -0.5..0.5 on each axis, smoothed.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 90, damping: 20, mass: 0.6 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);
  const tiltY = useTransform(sx, [-0.5, 0.5], [-7, 7]);
  const tiltX = useTransform(sy, [-0.5, 0.5], [5, -5]);
  const nameX = useTransform(sx, [-0.5, 0.5], [28, -28]);
  const haloX = useTransform(sx, [-0.5, 0.5], [-30, 30]);
  const chipAX = useTransform(sx, [-0.5, 0.5], [-34, 34]);
  const chipAY = useTransform(sy, [-0.5, 0.5], [-22, 22]);
  const chipBX = useTransform(sx, [-0.5, 0.5], [-52, 52]);
  const chipBY = useTransform(sy, [-0.5, 0.5], [-30, 30]);

  // Cursor spotlight.
  const lightX = useMotionValue(50);
  const lightY = useMotionValue(30);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${lightX}% ${lightY}%, var(--hx-spot), transparent 70%)`;

  // Scrolling away pulls the layers apart.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const stageY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const leftX = useTransform(scrollYProgress, [0, 0.8], [0, -80]);
  const rightX = useTransform(scrollYProgress, [0, 0.8], [0, 80]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const onPointerMove = (event: React.PointerEvent) => {
    if (!interactive || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    px.set(x - 0.5);
    py.set(y - 0.5);
    lightX.set(x * 100);
    lightY.set(y * 100);
  };
  const onPointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  const jump = (id: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    scrollToId(id);
  };

  const github = socials.find((s) => s.label === "GitHub")!.href;
  const linkedin = socials.find((s) => s.label === "LinkedIn")!.href;

  return (
    <section
      ref={sectionRef}
      className="hx"
      id="top"
      aria-labelledby="hero-title"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="hx-bg" aria-hidden>
        <div className="hx-aurora hx-aurora-1" />
        <div className="hx-aurora hx-aurora-2" />
        <div className="hx-aurora hx-aurora-3" />
        <div className="hx-grid" />
        {interactive ? <motion.div className="hx-spot" style={{ background: spotlight }} /> : null}
      </div>

      <motion.div className="hx-stage" style={reduced ? undefined : { y: stageY, scale: stageScale }}>
        <motion.div
          className="hx-name"
          aria-hidden
          style={reduced ? undefined : interactive ? { x: nameX, y: nameY } : { y: nameY }}
        >
          {Array.from(NAME).map((char, i) => (
            <span key={i} className="hx-name-char" style={{ "--i": i } as React.CSSProperties}>
              {char}
            </span>
          ))}
        </motion.div>

        <motion.div className="hx-halo" aria-hidden style={interactive ? { x: haloX } : undefined}>
          <div className="hx-aura" />
          <div className="hx-disc" />
        </motion.div>
        <Orbits className="hx-orbits hx-orbits-back" moving={!reduced} />

        <motion.div className="hx-portrait" style={interactive ? { rotateX: tiltX, rotateY: tiltY } : undefined}>
          <div className="hx-portrait-img">
            <Image
              src={profile.portrait}
              alt={`${profile.name}, software engineer`}
              fill
              preload
              sizes="(max-width: 1199px) 86vw, 620px"
            />
          </div>
        </motion.div>

        <Orbits className="hx-orbits hx-orbits-front" moving={!reduced} />

        <motion.div className="hx-chip hx-chip-a" style={interactive ? { x: chipAX, y: chipAY } : undefined}>
          <div className="hx-chip-inner">
            <span className="hx-chip-icon" aria-hidden>
              <FiZap />
            </span>
            <span>
              <span className="hx-chip-label">Now</span>
              Building at Jami Partners
            </span>
          </div>
        </motion.div>
        <motion.div className="hx-chip hx-chip-b" style={interactive ? { x: chipBX, y: chipBY } : undefined}>
          <Link href="/work/paklexai" className="hx-chip-inner">
            <span className="pulse-dot" aria-hidden />
            <span>
              <span className="hx-chip-label">Live</span>
              PakLexAI
            </span>
            <FiArrowUpRight aria-hidden />
          </Link>
        </motion.div>
      </motion.div>

      <div className="hx-content">
        <motion.div className="hx-left" style={reduced ? undefined : { x: leftX, opacity: copyOpacity }}>
          <div className="enter" style={{ "--delay": "100ms" } as React.CSSProperties}>
            <span className="badge">
              <span className="pulse-dot" aria-hidden />
              {profile.availability}
            </span>
          </div>
          <h1 className="hx-title" id="hero-title">
            <span className="sr-only">Thoughtful code. Remarkable experiences.</span>
            <span className="hx-line" aria-hidden>
              <Letters text="Thoughtful" start={0} />
            </span>
            <span className="hx-line" aria-hidden>
              <Letters text="code." start={10} />
            </span>
            <span className="hx-line" aria-hidden>
              <span className="hx-remarkable serif">Remarkable</span>
            </span>
            <span className="hx-line" aria-hidden>
              <Letters text="experiences." start={20} />
            </span>
          </h1>
        </motion.div>

        <motion.div className="hx-right" style={reduced ? undefined : { x: rightX, opacity: copyOpacity }}>
          <div className="enter" style={{ "--delay": "500ms" } as React.CSSProperties}>
            <TextScramble text="SOFTWARE ENGINEER — KARACHI" delay={650} className="eyebrow hx-role" />
          </div>
          <p className="hx-lead enter" style={{ "--delay": "620ms" } as React.CSSProperties}>
            I build <RotatingWords words={BUILDS} />
            <br />
            with frontend precision and full-stack thinking.
          </p>
          <div className="hx-ctas enter" style={{ "--delay": "740ms" } as React.CSSProperties}>
            <Magnetic>
              <a href="#work" onClick={jump("work")} className="btn btn-solid hx-btn">
                <span>View my work</span>
                <FiArrowRight aria-hidden />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" onClick={jump("contact")} className="btn btn-ghost">
                Let&rsquo;s talk
              </a>
            </Magnetic>
          </div>
          <dl className="hx-stats enter" style={{ "--delay": "860ms" } as React.CSSProperties}>
            {stats.map((stat, i) => (
              <div key={stat.label}>
                <dt>{stat.short}</dt>
                <dd>
                  <Ticker value={stat.value} suffix={stat.suffix} delay={0.9 + i * 0.12} />
                  <span className="sr-only">
                    {stat.value}
                    {stat.suffix}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>

      <div className="hx-foot">
        <a href="#work" onClick={jump("work")} className="hx-scroll">
          <span className="hx-scroll-track" aria-hidden>
            <span />
          </span>
          Scroll to explore
        </a>
        <div className="hx-social">
          <a href={github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <FiGithub aria-hidden />
          </a>
          <a href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FiLinkedin aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
