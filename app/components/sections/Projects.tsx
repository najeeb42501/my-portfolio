"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/data/projects";
import ProjectDialog from "./ProjectDialog";

type Tab = { label: string; match: (p: Project) => boolean };

const allTabs: Tab[] = [
  { label: "All", match: () => true },
  { label: "Platforms", match: (p) => p.filters.some((f) => f === "Fintech" || f === "Dashboards") },
  { label: "AI", match: (p) => p.filters.includes("AI") },
  { label: "Websites", match: (p) => p.filters.includes("Websites") },
  { label: "Lab", match: (p) => p.filters.includes("Lab") },
];
// A tab only appears once a project uses it.
const tabs = allTabs.filter((tab) => projects.some(tab.match));

/** Every project at a glance: small, quiet cards that open a screenshot viewer. */
export default function Projects() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState<Project | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const visible = projects.filter(tabs[tab].match);

  // Once the dialog is gone, return focus to the card that opened it.
  useEffect(() => {
    if (!open) return;
    return () => opener.current?.focus({ preventScroll: true });
  }, [open]);

  return (
    <section className="section projects" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <div className="projects-head">
          <div>
            <h2 className="title-sm" id="projects-title">
              All projects
            </h2>
            <p className="section-sub">Everything I&rsquo;ve helped ship, at a glance.</p>
          </div>
          <div className="segmented" role="group" aria-label="Filter projects">
            {tabs.map((t, index) => (
              <button key={t.label} type="button" aria-pressed={tab === index} onClick={() => setTab(index)}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <ul className="projects-grid" role="list">
          {visible.map((project) => (
            <li key={project.slug} className="project-card">
              <button
                type="button"
                className="project-preview"
                onClick={(event) => {
                  opener.current = event.currentTarget;
                  setOpen(project);
                }}
                aria-label={`View ${project.images.length} screenshots of ${project.title}`}
              >
                <Image src={project.images[0]} alt="" fill sizes="(max-width: 600px) 92vw, (max-width: 1100px) 45vw, 280px" />
                <span className="project-hint" aria-hidden>
                  View
                </span>
              </button>
              <div className="project-row">
                <h3>{project.title}</h3>
                <span className="project-status" data-status={project.status}>
                  {project.status}
                </span>
              </div>
              <p className="project-category">{project.category}</p>
            </li>
          ))}
        </ul>
      </div>

      {open ? <ProjectDialog project={open} onClose={() => setOpen(null)} /> : null}
    </section>
  );
}
