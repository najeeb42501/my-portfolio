"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiX } from "react-icons/fi";
import type { Project } from "@/data/projects";

/** Screenshot viewer for one project, as a native modal dialog. */
export default function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const total = project.images.length;
  const step = (delta: number) => setIndex((i) => (i + delta + total) % total);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    dialog.showModal();
    window.__lenis?.stop();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
      window.__lenis?.start();
    };
  }, []);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    }
  };

  return (
    <dialog
      ref={ref}
      className="project-dialog"
      data-lenis-prevent
      aria-labelledby="project-dialog-title"
      onKeyDown={onKeyDown}
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        // A click on the backdrop lands on the dialog element itself.
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="dialog-inner">
        <div className="dialog-top">
          <div>
            <p className="dialog-category">{project.category}</p>
            <h2 id="project-dialog-title">{project.title}</h2>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            <FiX aria-hidden />
          </button>
        </div>

        <div className="dialog-gallery">
          <div className="dialog-shot">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                className="dialog-shot-frame"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={project.images[index]}
                  alt={`${project.title}, screen ${index + 1} of ${total}`}
                  fill
                  sizes="(max-width: 1023px) 92vw, 980px"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="dialog-gallery-controls">
            <button type="button" className="icon-btn" onClick={() => step(-1)} aria-label="Previous screen">
              <FiArrowLeft aria-hidden />
            </button>
            <span role="status">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <button type="button" className="icon-btn" onClick={() => step(1)} aria-label="Next screen">
              <FiArrowRight aria-hidden />
            </button>
          </div>
        </div>

        <div className="dialog-details">
          <p className="dialog-description">{project.description}</p>
          <ul className="dialog-features">
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <div className="chips">
            {project.stack.map((tech) => (
              <span key={tech} className="chip">
                {tech}
              </span>
            ))}
          </div>
          <div className="dialog-actions">
            {project.caseStudy ? (
              <Link href={project.caseStudy} className="btn btn-solid btn-sm">
                Read the case study
              </Link>
            ) : null}
            {project.demo ? (
              <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
                Visit live <FiArrowUpRight aria-hidden />
              </a>
            ) : null}
            {project.github ? (
              <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
                Source <FiArrowUpRight aria-hidden />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </dialog>
  );
}
