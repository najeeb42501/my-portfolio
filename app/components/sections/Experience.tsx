"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiDownload } from "react-icons/fi";
import { experience, type Experience as Role } from "@/data/experience";
import { profile } from "@/data/site";
import Reveal from "../ui/Reveal";

// The line and the nodes share one threshold, so a role lights up as the line reaches it.
const LINE = "62%";

function Item({ role, reduced }: { role: Role; reduced: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 66%", "start 58%"] });
  const lit = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <li ref={ref} className="xp-item">
      <span className="xp-node" aria-hidden>
        <motion.span className="xp-node-lit" style={{ opacity: reduced ? 1 : lit }} />
      </span>
      <article className="card xp-card">
        <div className="xp-head">
          <span className="xp-mark" aria-hidden>
            {role.mark}
          </span>
          <div className="xp-titles">
            <h3>
              {role.role} <span className="serif muted">at {role.company}</span>
            </h3>
            <p className="xp-dates">
              {role.start} – {role.end}
            </p>
          </div>
        </div>
        <p className="xp-summary">{role.summary}</p>
        <ul className="xp-highlights">
          {role.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        <div className="chips">
          {role.tech.map((tech) => (
            <span key={tech} className="chip">
              {tech}
            </span>
          ))}
        </div>
      </article>
    </li>
  );
}

export default function Experience() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: listRef, offset: [`start ${LINE}`, `end ${LINE}`] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const tip = useTransform(fill, (v) => `${v * 100}%`);

  return (
    <section className="section experience" id="experience" aria-labelledby="experience-title">
      <div className="container">
        <Reveal className="section-title-block">
          <p className="kicker">Experience</p>
          <h2 className="title-xl" id="experience-title">
            The road <span className="serif grad-text">so far</span>
          </h2>
          <p className="lead">
            From freelance builds to enterprise fintech, with AI work running alongside the whole way.
          </p>
        </Reveal>

        <ol ref={listRef} className="xp-list">
          <li className="xp-rail" aria-hidden>
            <motion.span className="xp-fill" style={{ scaleY: reduced ? 1 : fill }} />
            {reduced ? null : <motion.span className="xp-tip" style={{ top: tip }} />}
          </li>
          {experience.map((role) => (
            <Item key={`${role.company}-${role.start}`} role={role} reduced={reduced} />
          ))}
        </ol>

        <div className="xp-foot">
          <a href={profile.resume} download className="btn btn-ghost">
            <FiDownload aria-hidden /> Download résumé
          </a>
        </div>
      </div>
    </section>
  );
}
