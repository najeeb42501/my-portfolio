"use client";

import { motion } from "framer-motion";
import { FiCloud, FiCode, FiCpu, FiDatabase, FiLayers } from "react-icons/fi";
import {
  SiAngular,
  SiDocker,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiReact,
  SiSpringboot,
  SiTypescript,
} from "react-icons/si";
import Reveal from "../shared/Reveal";
import SectionHeading from "../shared/SectionHeading";

const topSkills = [
  { label: "React", icon: SiReact, iconClass: "text-[#61dafb]" },
  { label: "Next.js", icon: SiNextdotjs, iconClass: "text-[var(--site-heading)]" },
  { label: "Angular", icon: SiAngular, iconClass: "text-[#dd0031]" },
  { label: "TypeScript", icon: SiTypescript, iconClass: "text-[#3178c6]" },
  { label: "Node.js", icon: SiNodedotjs, iconClass: "text-[#5fa04e]" },
  { label: "Spring Boot", icon: SiSpringboot, iconClass: "text-[#6db33f]" },
  { label: "Docker", icon: SiDocker, iconClass: "text-[#2496ed]" },
  { label: "OpenAI", icon: SiOpenai, iconClass: "text-[var(--site-heading)]" },
];
const SKILLS = [
  {
    label: "AI / LLM",
    summary:
      "LLM APIs, RAG systems, agents, prompt flows, vector search, and chatbot experiences.",
    skills: ["LLMs", "RAG", "Agents", "Vector DBs", "LangChain", "OpenAI"],
    icon: FiCpu,
    tone: "theme-card-pink",
    chipTone: "bg-[var(--theme-card-pink-solid)]",
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
      "Animations",
      "Performance Optimization",
      "SEO",
      "SSR",
      "SSG",
    ],
    icon: FiLayers,
    tone: "theme-card-orange",
    chipTone: "bg-[var(--theme-card-orange-solid)]",
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
      "Scalability",
      "Monitoring",
      "Logging",
      "Testing",
    ],
    icon: FiDatabase,
    tone: "theme-card-purple",
    chipTone: "bg-[var(--theme-card-purple-solid)]",
  },
  {
    label: "DevOps",
    summary:
      "Release support with Docker, CI/CD, cloud deployment, IIS, Cloudflare, and environment hygiene.",
    skills: ["Docker", "CI/CD", "Cloudflare", "AWS", "IIS", "Github Actions"],
    icon: FiCloud,
    tone: "theme-card-sky",
    chipTone: "bg-[var(--theme-card-sky-solid)]",
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="section-band relative overflow-hidden px-5 py-16 sm:px-8"
    >
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="My skills"
          title="Beautiful and unique digital experiences"
          copy="A practical toolkit for designing, building, integrating, and shipping modern products with clean interfaces and reliable systems."
        />

        <SkillsShowcase />

        <div className="mx-auto flex max-w-5xl gap-3">
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


function SkillsShowcase() {
  const marqueeItems = [...topSkills, ...topSkills];

  return (
    <Reveal className="mx-auto mb-9 max-w-5xl">
      <div className="relative overflow-hidden rounded-2xl border theme-border bg-[color-mix(in_srgb,var(--site-panel)_82%,transparent)] py-3 shadow-[0_20px_60px_color-mix(in_srgb,var(--site-shadow)_52%,transparent)] backdrop-blur-xl [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="skills-marquee-track flex w-max items-center gap-3 px-3">
          {marqueeItems.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={`${skill.label}-${index}`}
                className="flex h-12 min-w-max items-center gap-3 rounded-full border theme-border bg-[color-mix(in_srgb,var(--site-surface-strong)_72%,transparent)] px-4 text-sm font-bold theme-heading shadow-[0_12px_34px_color-mix(in_srgb,var(--site-shadow)_38%,transparent)]"
              >
                <span className="grid size-8 place-items-center rounded-full bg-[color-mix(in_srgb,var(--site-bg)_86%,transparent)] ring-1 ring-[var(--site-border)]">
                  <Icon aria-hidden className={`${skill.iconClass} text-lg`} />
                </span>
                {skill.label}
              </div>
            );
          })}
        </div>
      </div>
    </Reveal>
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

          <div className="relative z-10 mt-auto flex flex-wrap gap-2 pt-4">
            {group.skills.map((skill) => (
              <span
                key={skill}
                className={`inline-flex min-h-6 items-center rounded-full border border-white/25 ${group.chipTone} px-2.5 py-1 text-[0.68rem] font-semibold leading-none tracking-[-0.01em] text-white shadow-[0_3px_10px_rgba(0,0,0,0.14)] ring-1 ring-inset ring-black/5`}
              >
                {skill}
              </span>
            ))}
          </div>

          <FiCode
            className="pointer-events-none absolute top-4 right-4 text-5xl text-white/[0.08]"
            aria-hidden
          />
        </div>
      </motion.article>
    </Reveal>
  );
}
