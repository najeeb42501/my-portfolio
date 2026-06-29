"use client";

import { motion } from "framer-motion";
import { FiCloud, FiCode, FiCpu, FiDatabase, FiLayers } from "react-icons/fi";
import Reveal from "../shared/Reveal";

const SKILLS = [
  {
    label: "AI / LLM",
    summary:
      "LLM APIs, RAG systems, agents, prompt flows, vector search, and chatbot experiences.",
    skills: ["LLMs", "RAG", "Agents", "Prompting", "Vector DBs"],
    icon: FiCpu,
    tone: "theme-card-pink",
  },
  {
    label: "Frontend",
    summary:
      "Modern interfaces with React, Angular, Next.js, TypeScript, Tailwind, reusable components, and responsive systems.",
    skills: [
      "React",
      "Next.js",
      "Angular",
      "TypeScript",
      "Tailwind",
      "RxJS",
      "SCSS",
      "PrimeNG",
      "Material UI",
      "Responsive UI",
      "Performance",
      "Security",
      "Accessibility",
      "State Management",
      "Forms",
      "Testing",
    ],
    icon: FiLayers,
    tone: "theme-card-orange",
  },
  {
    label: "Backend",
    summary:
      "APIs, microservices, auth, data modeling, and dependable integrations for production workflows.",
    skills: [
      "Node.js",
      "Spring Boot",
      "REST APIs",
      "GraphQL",
      "Microservices",
      "Kafka",
      "SQL",
      "NoSQL",
      "PostgreSQL",
      "Redis",
      "Authentication",
      "Authorization",
      "API Security",
      "Background Jobs",
      "Docker",
      "Caching",
    ],
    icon: FiDatabase,
    tone: "theme-card-purple",
  },
  {
    label: "DevOps",
    summary:
      "Release support with Docker, CI/CD, cloud deployment, IIS, Cloudflare, and environment hygiene.",
    skills: ["Docker", "CI/CD", "Cloudflare", "AWS", "IIS"],
    icon: FiCloud,
    tone: "theme-card-sky",
  },
];

const highlightSkills = [
  "React",
  "Next.js",
  "Angular",
  "TypeScript",
  "Node.js",
  "Spring Boot",
  "RAG",
  "Docker",
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="section-band relative overflow-hidden px-5 py-16 sm:px-8"
    >
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        
        <Reveal className="max-w-xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.26em] text-[var(--theme-card-purple-solid)]">
            My skills
          </p>
          <h2 className="mt-5 max-w-lg text-balance text-3xl font-black leading-tight tracking-tight theme-heading sm:text-4xl lg:text-5xl">
            Beautiful and unique digital experiences
          </h2>
          <p className="mt-6 max-w-md text-base leading-8 theme-muted">
            A practical toolkit for designing, building, integrating, and
            shipping modern products with clean interfaces and reliable systems.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {highlightSkills.map((skill) => (
              <span
                key={skill}
                className="soft-chip px-3 py-1.5 text-xs font-semibold"
              >
                {skill}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="flex gap-3">
          
          <div className="flex flex-1 flex-col gap-3 pt-6">
            
            <BentoCard group={SKILLS[0]} index={0} className="h-44 flex-none" />
            
            <BentoCard
              group={SKILLS[1]}
              index={1}
              className="flex-1 pl-6 ml-6"
            />
          </div>

          
          <div className="flex flex-1 flex-col gap-3 pb-6 pt-4">
            
            <BentoCard
              group={SKILLS[2]}
              index={2}
              className="flex-1 pr-6 mr-6"
            />
            
            <BentoCard group={SKILLS[3]} index={3} className="h-44 flex-none" />
          </div>
        </div>
      </div>
    </section>
  );
}

function BentoCard({
  group,
  index,
  className = "",
}: {
  group: (typeof SKILLS)[number];
  index: number;
  className?: string;
}) {
  const Icon = group.icon;

  return (
    <Reveal delay={index * 0.08} className={className}>
      <motion.article
        className={`relative flex h-full overflow-hidden rounded-[1.25rem] ${group.tone} shadow-[0_24px_70px_rgba(91,63,214,0.18)]`}
        whileHover={{ y: -4, scale: 1.015 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
      >
        
        <div className="relative flex min-h-full w-full flex-col overflow-hidden rounded-[1.25rem] bg-white/10 p-5 text-white">
          
          <div className="relative z-10 flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-[var(--theme-card-purple-solid)] shadow-lg">
              <Icon aria-hidden className="text-lg" />
            </span>
            <h3 className="min-w-0 flex-1 truncate text-base font-black leading-tight">
              {group.label}
            </h3>
          </div>

          
          <p className="relative z-10 mt-3 max-w-xs text-[0.72rem] leading-[1.55] text-white/80">
            {group.summary}
          </p>

          
          <div className="relative z-10 mt-auto flex flex-wrap gap-1.5 pt-4">
            {group.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-white/15 px-2.5 py-1 text-[0.62rem] font-semibold text-white/90 backdrop-blur"
              >
                {skill}
              </span>
            ))}
          </div>

          
          <FiCode
            className="pointer-events-none absolute bottom-4 right-4 text-5xl text-white/[0.08]"
            aria-hidden
          />
        </div>
      </motion.article>
    </Reveal>
  );
}


