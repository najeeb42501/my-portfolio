"use client";
import dynamic from "next/dynamic";
import type { MotionValue } from "framer-motion";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState, useSyncExternalStore } from "react";
import { FiArrowUpRight, FiExternalLink, FiLock } from "react-icons/fi";
import { projects } from "../data/portfolio";
import SectionHeading from "../shared/SectionHeading";
import ProjectGallery from "./ProjectGallery";

const ProjectModal = dynamic(() => import("../projects/ProjectModal"));
const featuredIndexes = [0, 3, 4];
const featuredProjects = featuredIndexes.map((index) => projects[index]);
type Project = (typeof projects)[number];
function subscribeCompact(callback: () => void) {
  const query = matchMedia(
    "(max-width: 767px), (prefers-reduced-motion: reduce)",
  );
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
export default function Projects() {
  const stackRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  const compact = useSyncExternalStore(
    subscribeCompact,
    () =>
      matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)")
        .matches,
    () => false,
  );
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (value) =>
    setActive(Math.min(2, Math.round(value * 2))),
  );
  function goToProject(index: number) {
    const track = stackRef.current;
    if (!track) return;
    const top = track.getBoundingClientRect().top + scrollY;
    window.scrollTo({
      top: top + (index / 2) * (track.offsetHeight - innerHeight),
      behavior: "smooth",
    });
  }
  return (
    <>
      <section id="projects" className="featured-section">
        <div className="page-container section-space-bottom">
          <SectionHeading
            eyebrow="01 / Selected work"
            title="Built to make a difference."
            copy="A few projects at the intersection of thoughtful interfaces, real complexity, and everyday usefulness."
          />
          <div className="section-meta">
            <span>THREE SELECTED PROJECTS</span>
            <a className="text-link" href="#gallery">
              Browse the full gallery <FiArrowUpRight aria-hidden />
            </a>
          </div>
        </div>
        <div
          ref={stackRef}
          className="featured-track"
          style={{ height: "300svh" }}
        >
          <div className="featured-sticky sticky top-0 h-svh overflow-hidden">
            <div className="featured-stage h-full w-full px-4 pb-16 pt-[6rem] sm:px-6 lg:px-8">
              <div className="featured-cards relative size-full">
                {featuredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    index={index}
                    active={compact || active === index}
                    scrollProgress={scrollYProgress}
                    onOpen={() => setSelectedIndex(featuredIndexes[index])}
                  />
                ))}
              </div>
            </div>
            <div
              className="featured-controls"
              aria-label="Featured project navigation"
            >
              {featuredProjects.map((project, index) => (
                <button
                  key={project.title}
                  onClick={() => goToProject(index)}
                  aria-label={`Show ${project.title}`}
                  aria-pressed={active === index}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span className="featured-control-line" />
                </button>
              ))}
              <a href="#gallery">
                ALL WORK <FiArrowUpRight aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </section>
      <ProjectGallery onOpen={setSelectedIndex} />
      {selectedIndex !== null && (
        <ProjectModal
          project={projects[selectedIndex]}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </>
  );
}
function ProjectCard({
  project,
  index,
  scrollProgress,
  onOpen,
  active,
}: {
  project: Project;
  index: number;
  scrollProgress: MotionValue<number>;
  onOpen: () => void;
  active: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const { theme } = project;
  const transitionCount = Math.max(featuredProjects.length - 1, 1);
  const segmentStart = index === 0 ? 0 : (index - 1) / transitionCount;
  const segmentEnd = index === 0 ? 0.001 : index / transitionCount;
  const rawX = useTransform(
    scrollProgress,
    [segmentStart, segmentEnd],
    index === 0 ? ["0%", "0%"] : ["110%", "0%"],
  );
  const smoothX = useSpring(rawX, {
    stiffness: 105,
    damping: 26,
    mass: 0.42,
  });

  return (
    <motion.article
      inert={!active}
      aria-label={project.title}
      style={{ x: reduceMotion ? rawX : smoothX, zIndex: index + 1 }}
      className={`featured-card group absolute inset-0 grid size-full overflow-hidden border-y border-white/20 text-white shadow-[-24px_28px_90px_rgba(15,23,42,0.34)] ${theme.card} grid-rows-[minmax(0,0.92fr)_minmax(12rem,1.08fr)] md:grid-cols-[0.84fr_1.16fr] md:grid-rows-1`}
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
          aria-label={`Project ${index + 1} of ${featuredProjects.length}`}
        >
          <div className="flex items-center gap-1.5" aria-hidden>
            {featuredProjects.map((item, dotIndex) => (
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
            {String(featuredProjects.length).padStart(2, "0")}
          </span>
        </div>

        <div className="relative z-10 my-auto py-4 sm:py-6">
          <p className="mb-2 font-mono text-[0.65rem] font-black uppercase tracking-[0.2em] text-white/65 sm:mb-3">
            {project.category}
          </p>
          <h3 className="max-w-xl text-balance text-2xl font-black leading-[1.08] sm:text-3xl xl:text-4xl">
            {project.title}
          </h3>
          <p className="mt-3 line-clamp-3 max-w-xl text-xs font-medium leading-5 text-white/78 sm:mt-5 sm:text-base sm:leading-7">
            {project.summary}
          </p>

          <div className="mt-5 hidden flex-wrap gap-2 sm:flex">
            {project.capabilities.map((tech) => (
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
        <div className="absolute inset-x-3 -bottom-[18%] top-7 overflow-hidden rounded-[1.5rem] border border-white/25 bg-[#f8fafc] shadow-[0_28px_75px_rgba(15,23,42,0.34)] ring-1 ring-black/10 sm:inset-x-5 sm:top-10 md:-bottom-[16%] md:left-2 md:right-6 md:top-[27%] lg:left-3 lg:right-8">
          <Image
            src={project.images[0]}
            alt={`${project.title} interface preview`}
            fill
            sizes="(max-width: 768px) 100vw, 62vw"
            className="object-contain object-top"
            loading="lazy"
          />
        </div>
      </div>
    </motion.article>
  );
}
