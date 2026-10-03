"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useId, useRef, useState } from "react";
import { FiChevronDown, FiDownload } from "react-icons/fi";
import { experience } from "@/data/experience";
import { profile } from "@/data/site";
import { ease } from "../ui/MotionProvider";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";

export default function Experience() {
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const baseId = useId();
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.7", "end 0.6"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  const toggle = (index: number) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeader
          index="04"
          label="Experience"
          id="experience-title"
          title={
            <>
              Professional work, <span className="serif">simplified</span>.
            </>
          }
          lead="Where I've built, what I owned, and the tools I used to ship it."
        />

        <div className="timeline" ref={timelineRef}>
          <div className="timeline-track" aria-hidden>
            <motion.div className="timeline-fill" style={{ scaleY: reduced ? 1 : fill }} />
          </div>
          {experience.map((job, index) => {
            const isOpen = open.has(index);
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;
            return (
              <div key={job.company} className={`exp${isOpen ? " is-open" : ""}`}>
                <Reveal className="exp-when" delay={index * 0.04}>
                  <span className="exp-date">
                    {job.start} — {job.end}
                  </span>
                  <span className="exp-mark" aria-hidden>
                    {job.mark}
                  </span>
                </Reveal>
                <Reveal className="exp-main" delay={index * 0.04 + 0.04}>
                  <h3 style={{ margin: 0 }}>
                    <button
                      type="button"
                      id={buttonId}
                      className="exp-toggle"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggle(index)}
                    >
                      <span>
                        <span className="exp-role" style={{ display: "block" }}>
                          {job.role} <span>@ {job.company}</span>
                        </span>
                        <span className="exp-summary" style={{ display: "block" }}>
                          {job.summary}
                        </span>
                      </span>
                      <span className="exp-chevron" aria-hidden>
                        <FiChevronDown />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        className="exp-panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease }}
                      >
                        <ul>
                          {job.highlights.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                        <div className="chips">
                          {job.tech.map((tech) => (
                            <span key={tech} className="chip">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </Reveal>
              </div>
            );
          })}
        </div>

        <div className="exp-foot">
          <a href={profile.resume} download className="btn btn-ghost">
            <FiDownload aria-hidden /> Download résumé (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}
