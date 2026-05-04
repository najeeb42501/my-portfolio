"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
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
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 12%", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 0.16, 1], ["0%", "0%", "-63%"]);

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

    setGalleryImageIndex((current) => (current + 1) % selectedProject.images.length);
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
                className="group flex h-[clamp(25rem,calc(100svh-10.5rem),31rem)] w-[82vw] max-w-[44rem] shrink-0 flex-col overflow-hidden rounded border shadow-2xl theme-surface sm:w-[72vw]"
                initial={{ opacity: 0.72, y: 18, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ amount: 0.45 }}
                transition={{ duration: 0.55 }}
              >
                <div className="flex h-10 shrink-0 items-center gap-2 border-b px-4 theme-border theme-panel-strong">
                  <span className="rounded-full border px-3 py-1 font-mono text-xs backdrop-blur theme-accent-soft">
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
                  <div className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(to_bottom,var(--site-accent-soft),transparent)] opacity-70" />
                  <Image
                    src={project.images[0]}
                    alt={`${project.title} interface preview`}
                    fill
                    sizes="(max-width: 640px) 82vw, 704px"
                    className="object-contain p-2 transition duration-700 group-hover:scale-[1.015] sm:p-3"
                    priority={index === 0}
                  />
                </div>

                <div className="grid shrink-0 gap-4 p-4 sm:p-5 md:grid-cols-[1fr_auto] md:items-end">
                  <div className="min-w-0">
                    <div className="mb-3 h-px w-14 bg-[var(--site-accent)]" />
                    <p className="max-w-2xl text-sm leading-6 theme-muted">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border px-3 py-1 text-xs font-medium theme-panel theme-text"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 md:justify-end">
                    <button
                      type="button"
                      onClick={() => openProject(index)}
                      className="rounded px-4 py-2 text-sm font-semibold transition theme-accent-bg hover:-translate-y-0.5"
                    >
                      View details
                    </button>
                    <a
                      href={project.demo}
                      className="rounded border px-4 py-2 text-sm font-semibold transition theme-panel theme-heading hover:-translate-y-0.5 hover:border-[var(--site-accent)] hover:text-[var(--site-accent)]"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live Demo
                    </a>
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

            <div className="max-h-[calc(92svh-3.5rem)] space-y-5 overflow-y-auto p-3 sm:p-4">
              <section>
                {selectedGalleryImage && (
                  <div className="relative -mx-3 aspect-[16/9] overflow-hidden border-y border-white/20 bg-[color-mix(in_srgb,var(--site-bg-soft)_84%,transparent)] shadow-[0_24px_70px_rgba(15,23,42,0.18),inset_0_1px_0_rgba(255,255,255,0.24)] sm:-mx-4">
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
                          className="object-contain"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {selectedProject.images.length > 1 && (
                      <>
                        <button
                          type="button"
                          aria-label="Show previous project image"
                          onClick={showPreviousGalleryImage}
                          className="absolute left-4 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/50 text-lg font-semibold text-[var(--site-heading)] shadow-lg backdrop-blur-xl transition hover:scale-105 hover:bg-white/65 focus:outline-none focus:ring-2 focus:ring-[var(--site-accent)]"
                        >
                          &lt;
                        </button>
                        <button
                          type="button"
                          aria-label="Show next project image"
                          onClick={showNextGalleryImage}
                          className="absolute right-4 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/50 text-lg font-semibold text-[var(--site-heading)] shadow-lg backdrop-blur-xl transition hover:scale-105 hover:bg-white/65 focus:outline-none focus:ring-2 focus:ring-[var(--site-accent)]"
                        >
                          &gt;
                        </button>
                        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full border border-white/25 bg-white/50 px-3 py-2.5 shadow-lg backdrop-blur-xl">
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

              <section className="grid gap-5 md:grid-cols-[1fr_0.8fr]">
                <div className="rounded-[1.25rem] border border-white/20 bg-[color-mix(in_srgb,var(--site-panel)_82%,transparent)] p-4 shadow-sm backdrop-blur">
                  <p className="mb-1 text-xs font-medium uppercase theme-accent">
                    Descriptions
                  </p>
                  <h4 className="mb-3 text-lg font-semibold theme-heading">
                    What this project does
                  </h4>
                  <p className="text-sm leading-7 theme-muted sm:text-base">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="rounded-[1.25rem] border border-white/20 bg-[color-mix(in_srgb,var(--site-panel)_82%,transparent)] p-4 shadow-sm backdrop-blur">
                  <p className="mb-1 text-xs font-medium uppercase theme-accent">
                    Skills used
                  </p>
                  <h4 className="mb-3 text-lg font-semibold theme-heading">
                    Tech stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border px-3 py-1 text-xs font-medium theme-panel theme-text"
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
                <a
                  href={selectedProject.demo}
                  className="rounded border px-4 py-2 text-sm font-semibold transition theme-panel theme-heading hover:-translate-y-0.5 hover:border-[var(--site-accent)] hover:text-[var(--site-accent)]"
                  target="_blank"
                  rel="noreferrer"
                >
                  Live Demo
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
