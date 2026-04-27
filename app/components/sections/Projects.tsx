"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { projects } from "../data/portfolio";

export default function Projects() {
  const targetRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-62%"]);

  return (
    <section id="projects" ref={targetRef} className="relative h-[360vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-5 sm:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-medium uppercase text-cyan-300">
              Projects
            </p>
            <h2 className="text-balance text-3xl font-semibold text-white md:text-5xl">
              Featured work, sliding with your scroll.
            </h2>
          </div>
          <motion.div
            style={{ x }}
            className="flex w-max gap-5 will-change-transform"
            aria-label="Featured project carousel"
          >
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                className="group flex h-[31rem] w-[82vw] max-w-[36rem] shrink-0 snap-center flex-col overflow-hidden rounded border border-white/10 bg-zinc-950 shadow-2xl shadow-black/35"
                initial={{ opacity: 0.6, rotateY: 10, scale: 0.96 }}
                whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
                viewport={{ amount: 0.45 }}
                transition={{ duration: 0.55 }}
                style={{ transformPerspective: 900 }}
              >
                <div className="relative h-56 overflow-hidden border-b border-white/10">
                  <Image
                    src={project.image}
                    alt={`${project.title} interface preview`}
                    fill
                    sizes="(max-width: 768px) 82vw, 576px"
                    className="object-cover transition duration-700 group-hover:scale-105"
                    priority={index === 0}
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-2xl font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-3 flex-1 leading-7 text-zinc-400">
                    {project.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-3">
                    <a
                      href={project.github}
                      className="rounded bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-cyan-200"
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                    </a>
                    <a
                      href={project.demo}
                      className="rounded border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200"
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
