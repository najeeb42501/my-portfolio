"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { projects } from "../data/portfolio";

export default function Projects() {
  const targetRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 12%", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 0.16, 1], ["0%", "0%", "-63%"]);

  return (
    <section id="projects" ref={targetRef} className="relative h-[410vh]">
      <div className="sticky top-14 flex h-[calc(100svh-3.5rem)] items-center overflow-hidden px-5 py-8 sm:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-medium uppercase theme-accent">
                Projects
              </p>
              <h2 className="text-balance text-3xl font-semibold theme-heading md:text-5xl">
                Selected builds with clear product thinking.
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
                className="group grid h-[min(32rem,calc(100svh-13rem))] min-h-[29rem] w-[84vw] max-w-[58rem] shrink-0 overflow-hidden rounded border shadow-2xl theme-surface md:grid-cols-[0.95fr_1.05fr]"
                initial={{ opacity: 0.72, y: 18, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ amount: 0.45 }}
                transition={{ duration: 0.55 }}
              >
                <div className="relative min-h-56 overflow-hidden border-b theme-border md:h-full md:border-b-0 md:border-r">
                  <Image
                    src={project.image}
                    alt={`${project.title} interface preview`}
                    fill
                    sizes="(max-width: 768px) 84vw, 464px"
                    className="object-cover transition duration-700 group-hover:scale-105"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.32),transparent_46%)] opacity-70" />
                  <span className="absolute left-4 top-4 rounded-full border px-3 py-1 font-mono text-xs backdrop-blur theme-accent-soft">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex min-w-0 flex-col p-6 sm:p-7">
                  <div className="mb-5 h-px w-16 bg-[var(--site-accent)]" />
                  <h3 className="text-3xl font-semibold tracking-tight theme-heading">
                    {project.title}
                  </h3>
                  <p className="mt-4 flex-1 text-base leading-8 theme-muted">
                    {project.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border px-3 py-1 text-xs font-medium theme-panel theme-text"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={project.github}
                      className="rounded px-4 py-2 text-sm font-semibold transition theme-accent-bg hover:-translate-y-0.5"
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                    </a>
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
    </section>
  );
}
