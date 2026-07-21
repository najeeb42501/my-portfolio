"use client";

import type { MotionValue } from "framer-motion";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  FiArrowUpRight,
  FiChevronLeft,
  FiChevronRight,
  FiExternalLink,
  FiGithub,
  FiLock,
  FiX,
} from "react-icons/fi";
import { projects } from "../data/portfolio";

const projectThemes = [
  {
    card: "bg-[linear-gradient(135deg,#064e3b_0%,#047857_52%,#0f766e_100%)]",
    glow: "bg-emerald-300",
    chip: "bg-emerald-950/30",
  },
  {
    card: "bg-[linear-gradient(135deg,#312e81_0%,#6d28d9_52%,#7c3aed_100%)]",
    glow: "bg-violet-300",
    chip: "bg-violet-950/30",
  },
  {
    card: "bg-[linear-gradient(135deg,#0c4a6e_0%,#0369a1_52%,#0891b2_100%)]",
    glow: "bg-sky-300",
    chip: "bg-sky-950/30",
  },
  {
    card: "bg-[linear-gradient(135deg,#7c2d12_0%,#c2410c_52%,#ea580c_100%)]",
    glow: "bg-orange-300",
    chip: "bg-orange-950/30",
  },
  {
    card: "bg-[linear-gradient(135deg,#831843_0%,#be185d_52%,#db2777_100%)]",
    glow: "bg-pink-300",
    chip: "bg-pink-950/30",
  },
  {
    card: "bg-[linear-gradient(135deg,#1c1917_0%,#78350f_52%,#a16207_100%)]",
    glow: "bg-amber-300",
    chip: "bg-amber-950/35",
  },
] as const;

const projectShowcase = [
  {
    category: "Customer investment platform",
    summary:
      "Self-service investing for portfolios, transactions, and account services—designed to simplify everyday fund management.",
    capabilities: [
      "Angular 19",
      "TypeScript",
      "RxJS",
      ".NET",
      "REST APIs",
      "Secure workflows",
    ],
  },
  {
    category: "Enterprise fintech",
    summary:
      "Role-based payment operations for bills, vendors, salaries, and approvals—built for enterprise finance teams.",
    capabilities: [
      "Angular 19",
      "Spring Boot",
      "TypeScript",
      "RBAC",
      "Microservices",
      "REST APIs",
    ],
  },
  {
    category: "Real-time operations",
    summary:
      "Live visibility across jobs, transactions, digital services, and onboarding—without manual refreshes.",
    capabilities: [
      "React 19",
      "Spring Boot",
      "Socket.IO",
      "WebSockets",
      "Real-time data",
      "IIS",
    ],
  },
  {
    category: "Digital onboarding",
    summary:
      "A guided, backend-driven onboarding journey with OTP verification, saved progress, and resilient multi-step forms.",
    capabilities: [
      "React 19",
      "Node.js",
      "Dynamic forms",
      "OTP",
      "REST APIs",
      "State management",
    ],
  },
  {
    category: "Business platform",
    summary:
      "A polished company platform combining services, publishing, lead capture, and interactive 3D storytelling.",
    capabilities: [
      "Next.js",
      "TypeScript",
      "Resend",
      "Framer Motion",
      "SEO",
      "Cloudflare",
    ],
  },
  {
    category: "Architecture & social impact",
    summary:
      "An image-led portfolio connecting research-based architecture, community impact, and purposeful project storytelling.",
    capabilities: [
      "Responsive UI",
      "Image-led design",
      "Project storytelling",
      "Content architecture",
      "SEO",
      "Accessibility",
    ],
  },
] as const;

export default function Projects() {
  const stackRef = useRef<HTMLDivElement>(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<
    number | null
  >(null);
  const [galleryImageIndex, setGalleryImageIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  const selectedProject =
    selectedProjectIndex === null ? null : projects[selectedProjectIndex];
  const selectedProjectNumber =
    selectedProjectIndex === null ? null : selectedProjectIndex + 1;
  const selectedGalleryImage = selectedProject
    ? (selectedProject.images[galleryImageIndex] ?? selectedProject.images[0])
    : null;
  const selectedProjectImageCount = selectedProject?.images.length ?? 0;

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
    if (!selectedProject) return;
    setGalleryImageIndex((current) =>
      current === 0 ? selectedProject.images.length - 1 : current - 1,
    );
  };

  const showNextGalleryImage = () => {
    if (!selectedProject) return;
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
      className="section-band relative scroll-mt-20 overflow-clip"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(90deg,var(--site-heading)_1px,transparent_1px),linear-gradient(var(--site-heading)_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.26em] theme-accent">
              Selected projects
            </p>
            <h3 className="max-w-3xl text-balance text-xl font-black leading-tight theme-heading sm:text-2xl">
              Work that turns complex ideas into clear products.
            </h3>
          </div>
          <p className="max-w-sm text-sm leading-6 theme-muted lg:text-right">
            Scroll vertically. Projects enter horizontally from the right.
          </p>
        </div>
      </div>

      <div
        ref={stackRef}
        className="relative"
        style={{ height: `${projects.length * 100}svh` }}
      >
        <div className="sticky top-0 h-svh overflow-hidden">
          <div className="h-full w-full px-4 pb-4 pt-[5.25rem] sm:px-6 sm:pb-6 lg:px-8">
            <div className="relative size-full">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                  scrollProgress={scrollYProgress}
                  onOpen={() => openProject(index)}
                />
              ))}
            </div>
          </div>
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
  scrollProgress,
  onOpen,
}: {
  project: Project;
  index: number;
  scrollProgress: MotionValue<number>;
  onOpen: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const theme = projectThemes[index % projectThemes.length];
  const showcase = projectShowcase[index % projectShowcase.length];
  const transitionCount = Math.max(projects.length - 1, 1);
  const segmentStart = index === 0 ? 0 : (index - 1) / transitionCount;
  const segmentEnd = index === 0 ? 0.001 : index / transitionCount;
  const rawX = useTransform(
    scrollProgress,
    [segmentStart, segmentEnd],
    index === 0 ? ["0%", "0%"] : ["102%", "0%"],
  );
  const smoothX = useSpring(rawX, {
    stiffness: 105,
    damping: 26,
    mass: 0.42,
  });

  return (
    <motion.article
      style={{ x: reduceMotion ? rawX : smoothX, zIndex: index + 1 }}
      className={`group absolute inset-0 grid size-full overflow-hidden border-y border-white/20 text-white shadow-[-24px_28px_90px_rgba(15,23,42,0.34)] ${theme.card} grid-rows-[minmax(0,0.92fr)_minmax(12rem,1.08fr)] md:grid-cols-[0.84fr_1.16fr] md:grid-rows-1`}
    >
      {index > 0 ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-30 w-1 bg-white/30 shadow-[8px_0_28px_rgba(15,23,42,0.28)]"
        />
      ) : null}
      <div className="relative flex min-h-0 flex-col overflow-hidden p-5 sm:p-7 lg:p-10 xl:p-12">
        <div
          className={`pointer-events-none absolute -left-24 -top-24 size-72 rounded-full ${theme.glow} opacity-20 blur-3xl`}
        />
        <span className="pointer-events-none absolute bottom-0 right-4 font-mono text-[8rem] font-black leading-none text-white/[0.055] sm:text-[11rem]">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div
          className="relative z-10 flex items-center gap-3"
          aria-label={`Project ${index + 1} of ${projects.length}`}
        >
          <div className="flex items-center gap-1.5" aria-hidden>
            {projects.map((item, dotIndex) => (
              <span
                key={item.title}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  dotIndex === index ? "w-6 bg-white" : "w-1.5 bg-white/30"
                }`}
              />
            ))}
          </div>
          <span className="font-mono text-xs font-bold text-white/80">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        <div className="relative z-10 my-auto py-4 sm:py-6">
          <p className="mb-2 font-mono text-[0.65rem] font-black uppercase tracking-[0.2em] text-white/65 sm:mb-3">
            {showcase.category}
          </p>
          <h3 className="max-w-xl text-balance text-2xl font-black leading-[1.08] sm:text-3xl xl:text-4xl">
            {project.title}
          </h3>
          <p className="mt-3 line-clamp-3 max-w-xl text-xs font-medium leading-5 text-white/78 sm:mt-5 sm:text-base sm:leading-7">
            {showcase.summary}
          </p>

          <div className="mt-5 hidden flex-wrap gap-2 sm:flex">
            {showcase.capabilities.map((tech) => (
              <span
                key={tech}
                className={`rounded-full border border-white/20 ${theme.chip} px-3 py-1.5 text-[0.68rem] font-bold text-white/90 shadow-sm`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex flex-wrap gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onOpen}
            className="minimal-button inline-flex items-center gap-2 bg-white px-4 py-2 text-xs font-black text-slate-900 shadow-lg hover:shadow-xl sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Explore case study <FiArrowUpRight aria-hidden />
          </button>
          {project.demo ? (
            <a
              href={project.demo}
              className="minimal-button inline-flex items-center gap-2 border border-white/28 bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur-sm hover:bg-white/18 sm:px-5 sm:py-2.5 sm:text-sm"
              target="_blank"
              rel="noreferrer"
            >
              Live demo <FiExternalLink aria-hidden />
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-black/15 px-4 py-2 text-xs font-bold text-white/80 sm:px-5 sm:py-2.5 sm:text-sm">
              <FiLock aria-hidden />
              {project.demoUnavailableLabel === "Private"
                ? "Private deployment"
                : (project.demoUnavailableLabel ?? "Not live yet")}
            </span>
          )}
        </div>
      </div>

      <div className="relative min-h-0 overflow-hidden">
        <div className="absolute inset-x-3 -bottom-[18%] top-7 overflow-hidden rounded-[1.5rem] border border-white/25 bg-[#f8fafc] shadow-[0_28px_75px_rgba(15,23,42,0.34)] ring-1 ring-black/10 sm:inset-x-5 sm:top-10 md:-bottom-[16%] md:left-2 md:right-6 md:top-[12%] lg:left-3 lg:right-8">
          <Image
            src={project.images[0]}
            alt={`${project.title} interface preview`}
            fill
            sizes="(max-width: 768px) 100vw, 62vw"
            className="object-contain object-top"
            priority={index === 0}
          />
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
              <span className="minimal-button inline-flex items-center gap-2 border theme-chip-orange px-4 py-2 text-sm font-semibold">
                <FiLock aria-hidden />
                {project.demoUnavailableLabel === "Private"
                  ? "Private deployment"
                  : (project.demoUnavailableLabel ?? "Not live yet")}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
