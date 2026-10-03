"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState } from "react";
import { FiArrowUpRight, FiGrid, FiList } from "react-icons/fi";
import { filters, projectHref, projects, type Filter, type Project } from "@/data/projects";
import { socials } from "@/data/site";
import { useMediaQuery } from "../../lib/client";
import SectionHeader from "../ui/SectionHeader";

type Tab = "All" | Filter;

const tabs: Tab[] = [
  "All",
  ...filters.filter((filter) => projects.some((p) => p.filters.includes(filter))),
];

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

function meta(project: Project) {
  return project.year ? `${project.year}` : project.status;
}

export default function Archive() {
  const [tab, setTab] = useState<Tab>("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelId = useId();
  const reduced = useReducedMotion();

  const visible = tab === "All" ? projects : projects.filter((p) => p.filters.includes(tab));
  const github = socials.find((s) => s.label === "GitHub")!.href;

  const onTabKey = (event: React.KeyboardEvent, index: number) => {
    const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (index + delta + tabs.length) % tabs.length;
    setTab(tabs[next]);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="section" id="archive" aria-labelledby="archive-title">
      <div className="container">
        <SectionHeader
          index="02"
          label="Archive"
          id="archive-title"
          title={
            <>
              More to <span className="serif">explore</span>.
            </>
          }
          lead="Investment platforms, operations dashboards, AI assistants and websites. Everything I've helped ship, in one place."
        />

        <div className="archive-toolbar">
          <div className="segmented" role="tablist" aria-label="Filter projects">
            {tabs.map((name, index) => {
              const count = name === "All" ? projects.length : projects.filter((p) => p.filters.includes(name)).length;
              const selected = tab === name;
              return (
                <button
                  key={name}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`${panelId}-tab-${name}`}
                  aria-selected={selected}
                  aria-controls={panelId}
                  tabIndex={selected ? 0 : -1}
                  className="segment"
                  onClick={() => setTab(name)}
                  onKeyDown={(event) => onTabKey(event, index)}
                >
                  {selected ? (
                    <motion.span
                      layoutId="archive-tab"
                      className="segment-pill"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  ) : null}
                  <span>
                    {name}
                    <span className="count">{count}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <div className="segmented view-toggle" role="group" aria-label="Layout">
            {(["grid", "list"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                className="segment"
                aria-pressed={view === mode}
                aria-label={mode === "grid" ? "Grid view" : "List view"}
                onClick={() => setView(mode)}
              >
                {view === mode ? (
                  <motion.span layoutId="archive-view" className="segment-pill" />
                ) : null}
                <span>{mode === "grid" ? <FiGrid aria-hidden /> : <FiList aria-hidden />}</span>
              </button>
            ))}
          </div>
        </div>

        <div id={panelId} role="tabpanel" aria-labelledby={`${panelId}-tab-${tab}`}>
          {view === "grid" ? (
            <motion.ul className="bento" layout={!reduced} role="list" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <AnimatePresence mode="popLayout" initial={false}>
                {visible.map((project) => (
                  <Tile key={project.slug} project={project} />
                ))}
              </AnimatePresence>
            </motion.ul>
          ) : (
            <Rows items={visible} />
          )}
        </div>

        <div className="archive-foot">
          <a href={github} target="_blank" rel="noreferrer" className="text-link">
            See everything on GitHub <FiArrowUpRight aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}

function Tile({ project }: { project: Project }) {
  const wide = project.size === "wide";
  const media = (
    <div className="tile-media">
      <Image
        src={project.images[0]}
        alt={`${project.title} screenshot`}
        fill
        sizes={wide ? "(max-width: 767px) 92vw, (max-width: 1023px) 92vw, 800px" : "(max-width: 767px) 92vw, (max-width: 1023px) 46vw, 400px"}
      />
    </div>
  );
  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4 }}
      className={`card tile${wide ? " tile-wide" : ""}`}
    >
      {wide ? <div className="tile-media-wrap">{media}</div> : media}
      <div className="tile-body">
        <div className="tile-head">
          <h3 className="tile-title">
            <ProjectLink project={project} className="tile-link">
              {project.title}
            </ProjectLink>
          </h3>
          <span className="tile-meta status" data-status={project.status}>
            {meta(project)}
          </span>
        </div>
        <p className="tile-summary">{project.summary}</p>
        <div className="chips">
          {project.stack.slice(0, 3).map((tech) => (
            <span key={tech} className="chip">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.li>
  );
}

function Rows({ items }: { items: Project[] }) {
  const [hovered, setHovered] = useState<Project | null>(null);
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 });

  return (
    <div
      className="rows"
      onPointerMove={(event) => {
        x.set(event.clientX + 24);
        y.set(event.clientY - 100);
      }}
      onPointerLeave={() => setHovered(null)}
    >
      <ul role="list" style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((project) => (
          <li key={project.slug} onPointerEnter={() => setHovered(project)}>
            <ProjectLink project={project} className="row-link">
              <span className="row-title">{project.title}</span>
              <span className="row-cat">{project.category}</span>
              <span className="tile-meta status" data-status={project.status}>
                {meta(project)}
              </span>
              <FiArrowUpRight aria-hidden />
            </ProjectLink>
          </li>
        ))}
      </ul>
      {finePointer && !reduced ? (
        <AnimatePresence>
          {hovered ? (
            <motion.div
              className="row-preview"
              style={{ x: sx, y: sy }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.2 }}
              aria-hidden
            >
              <Image key={hovered.slug} src={hovered.images[0]} alt="" fill sizes="320px" />
            </motion.div>
          ) : null}
        </AnimatePresence>
      ) : null}
    </div>
  );
}
