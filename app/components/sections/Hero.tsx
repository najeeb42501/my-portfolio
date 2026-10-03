"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import { profile, proof } from "@/data/site";
import { scrollToId } from "../../lib/client";
import BrowserFrame from "../ui/BrowserFrame";

export default function Hero() {
  const visualRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ["start end", "start 0.25"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  const jump = (id: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    scrollToId(id);
  };

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-grid-bg" aria-hidden />
      <div className="container hero-copy">
        <div className="enter">
          <span className="badge">
            <span className="pulse-dot" aria-hidden />
            {profile.availability}
          </span>
        </div>
        <div className="enter-lcp">
          <h1 className="display" id="hero-title">
            Thoughtful code.{" "}
            <br />
            <span className="serif serif-accent">Remarkable</span> experiences.
          </h1>
        </div>
        <p className="lead enter" style={{ "--delay": "120ms" } as React.CSSProperties}>
          {profile.supportLine}
        </p>
        <div className="hero-ctas enter" style={{ "--delay": "180ms" } as React.CSSProperties}>
          <a href="#work" onClick={jump("work")} className="btn btn-solid">
            View my work
          </a>
          <a href="#contact" onClick={jump("contact")} className="btn btn-ghost">
            Let&rsquo;s talk <FiArrowRight aria-hidden />
          </a>
        </div>
        <div className="proof enter" style={{ "--delay": "240ms" } as React.CSSProperties}>
          <span className="proof-avatar">
            <Image src={profile.portrait} alt="" fill sizes="32px" />
          </span>
          {proof.map((item, i) => (
            <span key={item} style={{ display: "contents" }}>
              {i > 0 ? (
                <span className="proof-sep" aria-hidden>
                  ·
                </span>
              ) : null}
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="container-wide">
        <div ref={visualRef} className="hero-visual enter" style={{ "--delay": "300ms" } as React.CSSProperties}>
          <div className="glow" aria-hidden />
          <motion.div
            className="hero-visual-inner"
            style={reduced ? undefined : { rotateX, scale }}
          >
            <BrowserFrame
              src="/ubl-portal/ubl-portal-1.png"
              alt="UBL Funds customer portal dashboard showing consolidated portfolio allocation, returns and accounts"
              url="online.ublfunds.com"
              sizes="(max-width: 1440px) 96vw, 1400px"
            />
          </motion.div>
          <div className="hero-fade" aria-hidden />
        </div>
      </div>
    </section>
  );
}
