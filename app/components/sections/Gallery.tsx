"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiImage, FiX } from "react-icons/fi";
import { projectHref, projects, type Project } from "@/data/projects";
import { socials } from "@/data/site";
import Reveal from "../ui/Reveal";

type Tab = { label: string; match: (p: Project) => boolean };

const allTabs: Tab[] = [
  { label: "All work", match: () => true },
  { label: "Platforms", match: (p) => p.filters.some((f) => f === "Fintech" || f === "Dashboards") },
  { label: "AI", match: (p) => p.filters.includes("AI") },
  { label: "Websites", match: (p) => p.filters.includes("Websites") },
  { label: "Lab", match: (p) => p.filters.includes("Lab") },
];
// A tab only appears once a project uses it.
const tabs = allTabs.filter((tab) => projects.some(tab.match));

function ProjectLink({ project, className, children }: { project: Project; className?: string; children: React.ReactNode }) {
  const href = projectHref(project);
  if (!href) return <span className={className}>{children}</span>;
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  );
}

export default function Gallery() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState<Project | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const reduced = useReducedMotion();
  const visible = projects.filter(tabs[tab].match);
  const github = socials.find((s) => s.label === "GitHub")!.href;

  const close = () => setOpen(null);

  // Once the dialog is gone, return focus to the card that opened it.
  useEffect(() => {
    if (!open) return;
    return () => opener.current?.focus({ preventScroll: true });
  }, [open]);

  return (
    <section className="gallery section" id="gallery" aria-labelledby="gallery-title">
      <div className="container">
        <Reveal className="gallery-head">
          <h2 className="title-lg" id="gallery-title">
            More <span className="serif muted">from the archive</span>
          </h2>
          <div className="gallery-filters segmented" role="group" aria-label="Filter projects">
            {tabs.map((t, index) => {
              const selected = tab === index;
              return (
                <button key={t.label} type="button" className="segment" aria-pressed={selected} onClick={() => setTab(index)}>
                  {selected ? (
                    <motion.span
                      layoutId="gallery-tab"
                      className="segment-pill"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  ) : null}
                  <span>
                    {t.label}
                    <span className="count">{projects.filter(t.match).length}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.ul className="gallery-grid" layout={!reduced} role="list">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project) => (
              <motion.li
                key={project.slug}
                layout={!reduced}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4 }}
                className={`gallery-card card${project.size === "wide" ? " is-wide" : ""}`}
              >
                <button
                  type="button"
                  className="gallery-preview"
                  onClick={(event) => {
                    opener.current = event.currentTarget;
                    setOpen(project);
                  }}
                  aria-label={`View ${project.images.length} screenshots of ${project.title}`}
                >
                  <Image
                    src={project.images[0]}
                    alt=""
                    fill
                    sizes={
                      project.size === "wide"
                        ? "(max-width: 767px) 92vw, (max-width: 1023px) 92vw, 780px"
                        : "(max-width: 767px) 92vw, (max-width: 1023px) 46vw, 390px"
                    }
                  />
                  <span className="gallery-preview-hint" aria-hidden>
                    <FiImage /> {project.images.length} screens
                  </span>
                </button>
                <div className="gallery-body">
                  <div className="gallery-title-row">
                    <h3 className="gallery-title">
                      <ProjectLink project={project} className="gallery-link">
                        {project.title}
                      </ProjectLink>
                    </h3>
                    <span className="status" data-status={project.status}>
                      {project.year ?? project.status}
                    </span>
                  </div>
                  <p className="gallery-category">{project.category}</p>
                  <p className="gallery-summary">{project.summary}</p>
                  <div className="chips">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <div className="gallery-foot">
          <a href={github} target="_blank" rel="noreferrer" className="text-link">
            Side projects and experiments on GitHub <FiArrowUpRight aria-hidden />
          </a>
        </div>
      </div>

      {open ? <ProjectDialog project={open} onClose={close} /> : null}
    </section>
  );
}

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
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
