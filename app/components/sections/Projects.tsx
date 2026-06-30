"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  FiChevronLeft,
  FiChevronRight,
  FiExternalLink,
  FiGithub,
  FiX,
} from "react-icons/fi";
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
  const x = useTransform(scrollYProgress, [0, 0.14, 1], ["0%", "0%", "-68%"]);

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
  }, [selectedProjectImageCount]);

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

  const portalTarget = typeof document === "undefined" ? null : document.body;
  const projectModal = selectedProject ? (
    <ProjectModal
      project={selectedProject}
      projectNumber={selectedProjectNumber ?? 1}
      selectedGalleryImage={selectedGalleryImage}
      galleryImageIndex={galleryImageIndex}
      onClose={closeProject}
      onPrevious={showPreviousGalleryImage}
      onNext={showNextGalleryImage}
      onSelectImage={setGalleryImageIndex}
    />
  ) : null;

  return (
    <section
      id="projects"
      ref={targetRef}
      className="section-band relative h-[360vh]"
    >
      <div className="sticky top-0 flex min-h-svh items-center overflow-hidden px-5 py-14 sm:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-5 max-w-[38rem] sm:max-w-[calc(76vw+1.5rem)] lg:max-w-[calc(76rem+1.5rem)]">
            <p className="mb-2 text-center font-mono text-xs font-semibold uppercase tracking-[0.26em] theme-accent">
              Projects
            </p>
            <div className="grid gap-3 sm:grid-cols-[minmax(0,38rem)_auto] sm:items-end sm:justify-between">
              <h2 className="max-w-xl text-balance text-2xl font-black leading-tight theme-heading sm:text-[2.35rem] lg:text-[1.75rem]">
                Selected builds with product thinking.
              </h2>
              <p className="text-sm leading-6 theme-muted sm:max-w-56 sm:text-right">
                Scroll to move through the work.
              </p>
            </div>
          </div>

          <motion.div
            style={{ x }}
            className="flex w-max gap-6 will-change-transform"
            aria-label="Featured project carousel"
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                onOpen={() => openProject(index)}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {portalTarget && projectModal
        ? createPortal(projectModal, portalTarget)
        : null}
    </section>
  );
}

type Project = (typeof projects)[number];

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.article
      className="bento-card group relative grid h-[clamp(26rem,calc(100svh-12rem),31rem)] w-[78vw] max-w-[38rem] shrink-0 grid-rows-[auto_minmax(12rem,1fr)_auto] overflow-hidden transition duration-500 hover:-translate-y-1 hover:border-[var(--site-accent)] sm:w-[62vw]"
      initial={{ opacity: 0.72, y: 18, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ amount: 0.42 }}
      transition={{ duration: 0.55 }}
    >
      <div className="flex min-h-12 items-center gap-3 border-b px-4 theme-border bg-[color-mix(in_srgb,var(--site-panel-strong)_78%,transparent)] backdrop-blur-xl">
        <span className="rounded-full border px-3 py-1 font-mono text-xs font-semibold theme-accent-soft">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="min-w-0 flex-1 truncate text-base font-black theme-heading">
          {project.title}
        </h3>
        <span className="hidden items-center gap-2 sm:flex">
          <span className="size-2.5 rounded-full bg-red-400" />
          <span className="size-2.5 rounded-full bg-yellow-400" />
          <span className="size-2.5 rounded-full bg-green-400" />
        </span>
      </div>

      <div className="relative overflow-hidden border-b bg-[color-mix(in_srgb,var(--site-bg-soft)_86%,transparent)] theme-border">
        <div className="absolute inset-x-0 top-0 z-10 h-20 bg-[linear-gradient(to_bottom,var(--site-accent-soft),transparent)] opacity-70" />
        <Image
          src={project.images[0]}
          alt={`${project.title} interface preview`}
          fill
          sizes="(max-width: 640px) 78vw, 608px"
          className="object-contain p-4 transition duration-700 group-hover:scale-[1.015] sm:p-5"
          preload={index === 0}
        />
      </div>

      <div className="grid gap-4 p-4 sm:p-5">
        <div className="min-w-0">
          <div className="mb-3 h-px w-14 theme-spectrum-line" />
          <p className="line-clamp-2 text-sm leading-6 theme-muted">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 sm:justify-end">
          <button
            type="button"
            onClick={onOpen}
            className="minimal-button theme-accent-bg px-4 py-2 text-sm font-semibold"
          >
            View details
          </button>
          {project.demo ? (
            <a
              href={project.demo}
              className="minimal-button border px-4 py-2 text-sm font-semibold theme-panel theme-heading hover:border-[var(--site-accent)] hover:text-[var(--site-accent)]"
              target="_blank"
              rel="noreferrer"
            >
              Live Demo
            </a>
          ) : (
            <span className="minimal-button border theme-chip-orange px-4 py-2 text-sm font-semibold">
              {project.demoUnavailableLabel ?? "Not live yet"}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function ProjectModal({
  project,
  projectNumber,
  selectedGalleryImage,
  galleryImageIndex,
  onClose,
  onPrevious,
  onNext,
  onSelectImage,
}: {
  project: Project;
  projectNumber: number;
  selectedGalleryImage: string | null;
  galleryImageIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSelectImage: (index: number) => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/62 px-4 py-5 backdrop-blur-xl sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-details-title"
      onClick={onClose}
    >
      <motion.div
        className="relative grid h-[min(44rem,calc(100svh-2.5rem))] w-full max-w-6xl grid-rows-[minmax(16rem,42svh)_minmax(0,1fr)] overflow-hidden rounded-[1.25rem] border theme-border bg-[color-mix(in_srgb,var(--site-surface-strong)_92%,var(--site-panel)_70%)] shadow-[0_30px_100px_rgba(0,0,0,0.38)] backdrop-blur-2xl lg:grid-cols-[1.08fr_0.92fr] lg:grid-rows-1"
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.22 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative min-h-0 border-b theme-border lg:border-b-0 lg:border-r">
          <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full border theme-border bg-[color-mix(in_srgb,var(--site-surface-strong)_78%,transparent)] px-3 py-1.5 shadow-lg backdrop-blur-xl">
            <span className="font-mono text-xs font-semibold theme-accent">
              {String(projectNumber).padStart(2, "0")}
            </span>
            <span className="h-3 w-px bg-[var(--site-border-strong)]" />
            <span className="max-w-[12rem] truncate text-xs font-semibold theme-heading sm:max-w-xs">
              {project.title}
            </span>
          </div>

          {selectedGalleryImage && (
            <div className="relative h-full min-h-0 bg-[color-mix(in_srgb,var(--site-bg-soft)_80%,transparent)]">
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
                    alt={`${project.title} selected gallery preview`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 640px"
                    className="object-contain p-5 sm:p-8"
                  />
                </motion.div>
              </AnimatePresence>

              {project.images.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Show previous project image"
                    onClick={onPrevious}
                    className="absolute left-4 top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center rounded-full border theme-border bg-[color-mix(in_srgb,var(--site-surface-strong)_82%,transparent)] text-lg font-semibold theme-heading shadow-lg backdrop-blur-xl transition hover:scale-105 hover:text-[var(--site-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--site-accent)]"
                  >
                    <FiChevronLeft aria-hidden />
                  </button>
                  <button
                    type="button"
                    aria-label="Show next project image"
                    onClick={onNext}
                    className="absolute right-4 top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center rounded-full border theme-border bg-[color-mix(in_srgb,var(--site-surface-strong)_82%,transparent)] text-lg font-semibold theme-heading shadow-lg backdrop-blur-xl transition hover:scale-105 hover:text-[var(--site-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--site-accent)]"
                  >
                    <FiChevronRight aria-hidden />
                  </button>
                  <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 rounded-full border theme-border bg-[color-mix(in_srgb,var(--site-surface-strong)_78%,transparent)] px-3 py-2 shadow-lg backdrop-blur-xl">
                    {project.images.map((image, imageIndex) => (
                      <button
                        type="button"
                        key={`${project.title}-${image}-dot`}
                        aria-label={`Show project image ${imageIndex + 1}`}
                        onClick={() => onSelectImage(imageIndex)}
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
        </div>

        <div className="flex min-h-0 flex-col overflow-hidden">
          <div className="flex shrink-0 items-start gap-4 border-b p-5 theme-border sm:p-6">
            <div className="min-w-0 flex-1">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] theme-accent">
                Project details
              </p>
              <h3
                id="project-details-title"
                className="mt-2 text-balance text-2xl font-black leading-tight theme-heading"
              >
                {project.title}
              </h3>
              <p className="mt-3 text-sm leading-6 theme-muted">
                {project.description}
              </p>
            </div>
            <button
              type="button"
              aria-label="Close project details"
              onClick={onClose}
              className="grid size-9 shrink-0 place-items-center rounded-full border theme-panel theme-heading transition hover:border-[var(--site-accent)] hover:text-[var(--site-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--site-accent)]"
            >
              <FiX aria-hidden />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6">
            <section>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--theme-card-sky-solid)]">
                Overview
              </p>
              <p className="mt-3 text-sm leading-7 theme-text">
                {project.detailedDescription}
              </p>
            </section>

            <section className="mt-6">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--theme-card-emerald-solid)]">
                Product highlights
              </p>
              <ul className="mt-3 grid gap-2">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-2 rounded border border-[color-mix(in_srgb,var(--theme-card-emerald-solid)_22%,transparent)] bg-[color-mix(in_srgb,var(--theme-card-emerald-solid)_8%,transparent)] px-3 py-2 text-sm leading-5 theme-text"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--theme-card-emerald-solid)]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-6">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--theme-card-purple-solid)]">
                Tech stack
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((tech, techIndex) => (
                  <span
                    key={tech}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold shadow-sm ${
                      techIndex % 3 === 0
                        ? "theme-chip-purple"
                        : techIndex % 3 === 1
                          ? "theme-chip-sky"
                          : "theme-chip-orange"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <div className="flex shrink-0 flex-wrap gap-3 border-t p-5 theme-border sm:p-6">
            <a
              href={project.github}
              className="minimal-button theme-accent-bg inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold"
              target="_blank"
              rel="noreferrer"
            >
              <FiGithub aria-hidden />
              GitHub
            </a>
            {project.demo ? (
              <a
                href={project.demo}
                className="minimal-button inline-flex items-center gap-2 border px-4 py-2 text-sm font-semibold theme-panel theme-heading hover:border-[var(--site-accent)] hover:text-[var(--site-accent)]"
                target="_blank"
                rel="noreferrer"
              >
                <FiExternalLink aria-hidden />
                Live Demo
              </a>
            ) : (
              <span className="minimal-button border theme-chip-orange px-4 py-2 text-sm font-semibold">
                {project.demoUnavailableLabel ?? "Not live yet"}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
