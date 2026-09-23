"use client";
import Image from "next/image";
import { useState } from "react";
import { FiArrowUpRight, FiLock } from "react-icons/fi";
import { projects } from "../data/portfolio";
import Reveal from "../shared/Reveal";
import SectionHeading from "../shared/SectionHeading";

const categories = ["All work", "Platforms", "AI", "Websites"] as const;
const categoryByIndex = [
  "Platforms",
  "Platforms",
  "Platforms",
  "AI",
  "Websites",
  "Platforms",
  "Platforms",
  "Websites",
];
export default function ProjectGallery({
  onOpen,
}: {
  onOpen: (index: number) => void;
}) {
  const [filter, setFilter] = useState<string>("All work");
  const visible = projects
    .map((project, index) => ({ project, index }))
    .filter(
      ({ index }) => filter === "All work" || categoryByIndex[index] === filter,
    );
  return (
    <section id="gallery" className="gallery-section section-pad">
      <div className="page-container">
        <SectionHeading
          eyebrow="02 / The project gallery"
          title="More to explore."
          copy="Investment platforms, AI assistants, and digital experiences. A closer look at the things I’ve helped bring to life."
        />
        <div className="gallery-toolbar">
          <div
            className="gallery-filters"
            role="group"
            aria-label="Filter projects"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                aria-pressed={filter === category}
              >
                {category}
                {category === "All work" && <span>{projects.length}</span>}
              </button>
            ))}
          </div>
          <span className="tiny-label" role="status">
            {String(visible.length).padStart(2, "0")} PROJECTS
          </span>
        </div>
        <div className="gallery-grid">
          {visible.map(({ project, index }) => (
            <Reveal key={project.title}>
              <article className="gallery-card">
                <button
                  className={`gallery-preview ${project.theme.card}`}
                  onClick={() => onOpen(index)}
                  aria-label={`Explore ${project.title} case study`}
                >
                  <span className="gallery-index">
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {categoryByIndex[index]}
                  </span>
                  <div className="gallery-browser">
                    <div className="browser-chrome" aria-hidden>
                      <i />
                      <i />
                      <i />
                      <span>{project.title}</span>
                    </div>
                    <div className="gallery-image">
                      <Image
                        src={project.images[0]}
                        alt={`${project.title} interface`}
                        fill
                        sizes="(max-width: 767px) 88vw, (max-width: 1280px) 44vw, 560px"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                  <span className="gallery-open">
                    <FiArrowUpRight aria-hidden />
                  </span>
                </button>
                <div className="gallery-info">
                  <div>
                    <p className="tiny-label">{project.category}</p>
                    <h3>
                      <button onClick={() => onOpen(index)}>
                        {project.title}
                      </button>
                    </h3>
                  </div>
                  {!project.demo && (
                    <span className="private-label">
                      <FiLock aria-hidden /> Private
                    </span>
                  )}
                </div>
                <p className="gallery-summary">{project.summary}</p>
                <div className="gallery-tags">
                  {project.capabilities.slice(0, 3).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
