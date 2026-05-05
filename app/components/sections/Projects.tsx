"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { projects } from "../data/portfolio";

export default function Projects() {
  const targetRef = useRef<HTMLElement>(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<
    number | null
  >(null);
  const [galleryImageIndex, setGalleryImageIndex] = useState(0);
  const selectedProject =
    selectedProjectIndex === null ? null : projects[selectedProjectIndex];
  const selectedProjectNumber =
    selectedProjectIndex === null ? null : selectedProjectIndex + 1;
  const selectedGalleryImage = selectedProject
    ? (selectedProject.images[galleryImageIndex] ?? selectedProject.images[0])
    : null;
  const selectedProjectImageCount = selectedProject?.images.length ?? 0;
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 12%", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 0.16, 1], ["0%", "0%", "-63%"]);

  useEffect(() => {
    if (selectedProjectImageCount <= 1) {
      return;
    }

    const galleryTimer = window.setInterval(() => {
      setGalleryImageIndex(
        (current) => (current + 1) % selectedProjectImageCount,
      );
    }, 4500);

    return () => window.clearInterval(galleryTimer);
  }, [selectedProjectImageCount, galleryImageIndex]);

  const openProject = (index: number) => {
    setSelectedProjectIndex(index);
    setGalleryImageIndex(0);
  };

  const closeProject = () => {
    setSelectedProjectIndex(null);
    setGalleryImageIndex(0);
  };

  const showPreviousGalleryImage = () => {
    if (!selectedProject) {
      return;
    }

    setGalleryImageIndex((current) =>
      current === 0 ? selectedProject.images.length - 1 : current - 1,
    );
  };

  const showNextGalleryImage = () => {
    if (!selectedProject) {
      return;
    }

    setGalleryImageIndex(
      (current) => (current + 1) % selectedProject.images.length,
    );
  };

  return (
    <section id="projects" ref={targetRef} className="relative h-[410vh]">
      <div className="sticky top-14 flex h-[calc(100svh-3.5rem)] items-center overflow-hidden px-5 py-5 sm:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0">
              <p className="mb-2 text-xs font-medium uppercase theme-accent">
                Projects
              </p>
              <h2 className="truncate text-xl font-semibold theme-heading sm:text-2xl md:text-3xl">
                Selected builds with product thinking.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 theme-muted">
              Scroll to move through the work.
            </p>
          </div>

          <motion.div
            style={{ x }}
            className="flex w-max gap-6 will-change-transform"
            aria-label="Featured project carousel"
          >
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                className="group relative flex h-[clamp(25rem,calc(100svh-10.5rem),31rem)] w-[82vw] max-w-[44rem] shrink-0 flex-col overflow-hidden rounded border border-white/20 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--site-surface)_88%,transparent),color-mix(in_srgb,var(--site-accent-soft)_42%,transparent))] shadow-[0_24px_80px_var(--site-accent-soft)] transition duration-500 hover:-translate-y-1 hover:border-[var(--site-accent)] sm:w-[72vw]"
                initial={{ opacity: 0.72, y: 18, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ amount: 0.45 }}
                transition={{ duration: 0.55 }}
              >
                <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--site-accent),transparent)] opacity-80" />
                <div className="flex h-10 shrink-0 items-center gap-2 border-b border-white/15 bg-[color-mix(in_srgb,var(--site-panel-strong)_78%,transparent)] px-4 backdrop-blur-xl">
                  <span className="rounded-full border border-[var(--site-accent)] bg-[color-mix(in_srgb,var(--site-accent-soft)_65%,transparent)] px-3 py-1 font-mono text-xs text-[var(--site-accent)] backdrop-blur">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="min-w-0 truncate text-sm font-semibold theme-heading sm:text-base">
                    {project.title}
                  </h3>
                  <span className="ml-auto flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-red-400" />
                    <span className="size-2.5 rounded-full bg-yellow-400" />
                    <span className="size-2.5 rounded-full bg-green-400" />
                  </span>
                </div>

                <div className="relative flex-[1.65] overflow-hidden border-b bg-[var(--site-bg-soft)] theme-border">
                  <div className="absolute inset-x-0 top-0 z-10 h-20 bg-[linear-gradient(to_bottom,var(--site-accent-soft),transparent)] opacity-70" />
                  <Image
                    src={project.images[0]}
                    alt={`${project.title} interface preview`}
                    fill
                    sizes="(max-width: 640px) 82vw, 704px"
                    className="object-contain p-2 transition duration-700 group-hover:scale-[1.015] sm:p-3"
                    priority={index === 0}
                  />
                </div>

                <div className="grid shrink-0 gap-4 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--site-panel)_74%,transparent),color-mix(in_srgb,var(--site-surface)_92%,transparent))] p-4 sm:p-5">
                  <div className="min-w-0">
                    <div className="mb-3 h-px w-14 bg-[linear-gradient(90deg,var(--site-accent),#38bdf8)]" />
                    <p className="w-full text-sm leading-6 theme-muted">
                      {project.description}
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/20 bg-[color-mix(in_srgb,var(--site-accent-soft)_54%,var(--site-panel))] px-3 py-1 text-xs font-medium text-[var(--site-heading)] shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3 md:justify-end">
                      <button
                        type="button"
                        onClick={() => openProject(index)}
                        className="rounded bg-[linear-gradient(135deg,var(--site-accent),#38bdf8)] px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_32px_var(--site-accent-soft)] transition hover:-translate-y-0.5"
                      >
                        View details
                      </button>
                      {project.demo ? (
                        <a
                          href={project.demo}
                          className="rounded border px-4 py-2 text-sm font-semibold transition theme-panel theme-heading hover:-translate-y-0.5 hover:border-[var(--site-accent)] hover:text-[var(--site-accent)]"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Live Demo
                        </a>
                      ) : (
                        <span className="rounded border border-amber-300/35 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-500">
                          Not live yet
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/45 px-4 py-6 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-details-title"
          onClick={closeProject}
        >
          <motion.div
            className="max-h-[92svh] w-full max-w-4xl overflow-hidden rounded-[1.75rem] border border-white/20 bg-[color-mix(in_srgb,var(--site-surface-strong)_82%,transparent)] shadow-2xl backdrop-blur-2xl"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.22 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex h-14 items-center gap-3 border-b border-white/20 px-5">
              <span className="rounded-full border px-3 py-1 font-mono text-xs backdrop-blur theme-accent-soft">
                {String(selectedProjectNumber).padStart(2, "0")}
              </span>
              <h3
                id="project-details-title"
                className="min-w-0 truncate text-base font-semibold theme-heading"
              >
                {selectedProject.title}
              </h3>
              <button
                type="button"
                aria-label="Close project details"
                onClick={closeProject}
                className="ml-auto grid size-8 place-items-center rounded-full bg-[#ff5f57] text-sm font-semibold leading-none text-red-950 shadow-sm ring-1 ring-black/10 transition hover:scale-105 hover:bg-[#ff7a73] focus:outline-none focus:ring-2 focus:ring-[var(--site-accent)]"
              >
                x
              </button>
            </div>

            <div className="max-h-[calc(92svh-3.5rem)] overflow-y-auto">
              <section>
                {selectedGalleryImage && (
                  <div className="group/gallery relative aspect-[16/9] overflow-hidden border-y border-white/20 bg-[color-mix(in_srgb,var(--site-bg-soft)_84%,transparent)] shadow-[0_24px_70px_rgba(15,23,42,0.18),inset_0_1px_0_rgba(255,255,255,0.24)]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedGalleryImage}
                        className="absolute inset-0"
                        initial={{ opacity: 0, x: 24, scale: 0.985 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -24, scale: 0.985 }}
                        transition={{ duration: 0.24, ease: "easeOut" }}
                      >
                        <Image
                          src={selectedGalleryImage}
                          alt={`${selectedProject.title} selected gallery preview`}
                          fill
                          sizes="(max-width: 768px) 100vw, 760px"
                          className="object-inherit"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {selectedProject.images.length > 1 && (
                      <>
                        <button
                          type="button"
                          aria-label="Show previous project image"
                          onClick={showPreviousGalleryImage}
                          className="pointer-events-none absolute left-4 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/50 text-lg font-semibold text-[var(--site-heading)] opacity-0 shadow-lg backdrop-blur-xl transition group-hover/gallery:pointer-events-auto group-hover/gallery:opacity-100 group-focus-within/gallery:pointer-events-auto group-focus-within/gallery:opacity-100 hover:scale-105 hover:bg-white/65 focus:outline-none focus:ring-2 focus:ring-[var(--site-accent)]"
                        >
                          &lt;
                        </button>
                        <button
                          type="button"
                          aria-label="Show next project image"
                          onClick={showNextGalleryImage}
                          className="pointer-events-none absolute right-4 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/50 text-lg font-semibold text-[var(--site-heading)] opacity-0 shadow-lg backdrop-blur-xl transition group-hover/gallery:pointer-events-auto group-hover/gallery:opacity-100 group-focus-within/gallery:pointer-events-auto group-focus-within/gallery:opacity-100 hover:scale-105 hover:bg-white/65 focus:outline-none focus:ring-2 focus:ring-[var(--site-accent)]"
                        >
                          &gt;
                        </button>
                        <div className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full border border-white/25 bg-white/50 px-3 py-2.5 opacity-0 shadow-lg backdrop-blur-xl transition group-hover/gallery:pointer-events-auto group-hover/gallery:opacity-100 group-focus-within/gallery:pointer-events-auto group-focus-within/gallery:opacity-100">
                          {selectedProject.images.map((image, imageIndex) => (
                            <button
                              type="button"
                              key={`${selectedProject.title}-${image}-dot`}
                              aria-label={`Show project image ${imageIndex + 1}`}
                              onClick={() => setGalleryImageIndex(imageIndex)}
                              className={`size-2.5 rounded-full transition ${
                                galleryImageIndex === imageIndex
                                  ? "bg-[var(--site-accent)]"
                                  : "bg-[var(--site-border-strong)] hover:bg-[var(--site-muted)]"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </section>

              <div className="space-y-5 px-4 pb-5 pt-5 sm:px-6">
                <section className="grid gap-5">
                  <div className="relative overflow-hidden rounded-[1.25rem] border border-cyan-300/25 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--site-panel)_90%,transparent),rgba(14,165,233,0.12))] p-5 shadow-sm backdrop-blur">
                    <div className="absolute inset-y-5 left-0 w-1 rounded-r-full bg-cyan-400" />
                    <p className="mb-1 text-xs font-medium uppercase text-cyan-500">
                      Description
                    </p>
                    <h4 className="mb-3 text-lg font-semibold theme-heading">
                      What this project does
                    </h4>
                    <p className="text-sm leading-7 text-[color-mix(in_srgb,var(--site-text)_78%,var(--site-muted))] sm:text-base">
                      {selectedProject.detailedDescription}
                    </p>
                  </div>

                  <div className="relative overflow-hidden rounded-[1.25rem] border border-emerald-300/25 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--site-panel)_90%,transparent),rgba(16,185,129,0.12))] p-5 shadow-sm backdrop-blur">
                    <div className="absolute inset-y-5 left-0 w-1 rounded-r-full bg-emerald-400" />
                    <p className="mb-1 text-xs font-medium uppercase text-emerald-500">
                      Features
                    </p>
                    <h4 className="mb-4 text-lg font-semibold theme-heading">
                      Product highlights
                    </h4>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {selectedProject.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex gap-2 rounded border border-emerald-300/15 bg-emerald-400/[0.06] px-3 py-2 text-sm leading-5 theme-text"
                        >
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.55)]" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative overflow-hidden rounded-[1.25rem] border border-violet-300/25 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--site-panel)_90%,transparent),rgba(139,92,246,0.12))] p-5 shadow-sm backdrop-blur">
                    <div className="absolute inset-y-5 left-0 w-1 rounded-r-full bg-violet-400" />
                    <p className="mb-1 text-xs font-medium uppercase text-violet-500">
                      Skills used
                    </p>
                    <h4 className="mb-3 text-lg font-semibold theme-heading">
                      Tech stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.stack.map((tech, techIndex) => (
                        <span
                          key={tech}
                          className={`rounded-full border px-3 py-1 text-xs font-medium shadow-sm ${
                            techIndex % 3 === 0
                              ? "border-violet-300/30 bg-violet-400/10 text-violet-500"
                              : techIndex % 3 === 1
                                ? "border-cyan-300/30 bg-cyan-400/10 text-cyan-500"
                                : "border-amber-300/30 bg-amber-400/10 text-amber-500"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </section>

                <div className="flex flex-wrap gap-3 border-t pt-5 theme-border">
                  <a
                    href={selectedProject.github}
                    className="rounded px-4 py-2 text-sm font-semibold transition theme-accent-bg hover:-translate-y-0.5"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                  {selectedProject.demo ? (
                    <a
                      href={selectedProject.demo}
                      className="rounded border px-4 py-2 text-sm font-semibold transition theme-panel theme-heading hover:-translate-y-0.5 hover:border-[var(--site-accent)] hover:text-[var(--site-accent)]"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live Demo
                    </a>
                  ) : (
                    <span className="rounded border border-amber-300/35 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-500">
                      Not live yet
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
