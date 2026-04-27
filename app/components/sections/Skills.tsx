"use client";

import { motion } from "framer-motion";
import Reveal from "../shared/Reveal";
import SectionHeading from "../shared/SectionHeading";

export const SKILLS = [
  {
    label: "Frontend",
    summary:
      "Scalable, high-performance interfaces with modern frameworks and strong UX patterns.",
    skills: [
      "Angular (v15+)",
      "React",
      "Next.js (SSR/SSG)",
      "TypeScript",
      "RxJS & Signals",
      "State Management (NgRx, Zustand)",
      "Component Architecture",
      "Responsive Design",
      "Performance Optimization",
      "PrimeNG / Material UI / Tailwind CSS",
    ],
  },
  {
    label: "Backend",
    summary:
      "Robust APIs and microservices with scalable architecture and secure integrations.",
    skills: [
      "Node.js (Express / NestJS)",
      "Java Spring Boot",
      "Python (FastAPI / Django)",
      "RESTful APIs",
      "Microservices Architecture",
      "JWT / OAuth Authentication",
      "SQL & NoSQL Databases",
      "Redis Caching",
      "Kafka / RabbitMQ",
    ],
  },
  {
    label: "AI / LLM",
    summary:
      "Intelligent systems using LLMs, RAG pipelines, and conversational AI solutions.",
    skills: [
      "Large Language Models (LLMs)",
      "RAG (Retrieval-Augmented Generation)",
      "Chatbot Development",
      "Prompt Engineering",
      "Vector Databases (Pinecone, FAISS)",
      "LangChain / LlamaIndex",
      "Semantic Search",
      "AI API Integrations",
      "Conversational AI",
    ],
  },
  {
    label: "DevOps & Cloud",
    summary:
      "Automated deployments, cloud infrastructure, and reliable system operations.",
    skills: [
      "Docker & Containerization",
      "CI/CD (GitHub Actions, GitLab CI)",
      "AWS / Azure / GCP",
      "Nginx / Reverse Proxy",
      "Linux & Shell Scripting",
      "Monitoring & Logging",
      "Environment Management",
      "Infrastructure as Code (Terraform)",
    ],
  },
];

const skillPositions = [
  "lg:col-start-1 lg:row-start-1",
  "lg:col-start-3 lg:row-start-1",
  "lg:col-start-1 lg:row-start-3",
  "lg:col-start-3 lg:row-start-3",
];

const chipStyles = [
  "border-sky-400/25 bg-sky-400/[0.07] text-sky-700 dark:text-sky-200",
  "border-emerald-400/25 bg-emerald-400/[0.07] text-emerald-700 dark:text-emerald-200",
  "border-violet-400/25 bg-violet-400/[0.07] text-violet-700 dark:text-violet-200",
  "border-amber-400/25 bg-amber-400/[0.08] text-amber-700 dark:text-amber-200",
  "border-rose-400/25 bg-rose-400/[0.07] text-rose-700 dark:text-rose-200",
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden px-5 py-24 sm:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Skills"
          title="Core software engineering across product, systems, and AI."
          copy="A practical capability map for building modern applications from interface to infrastructure."
        />

        <div className="relative mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.82fr_1fr] lg:grid-rows-[auto_auto_auto] lg:items-center">
          {SKILLS.map((group, index) => (
            <SkillLane
              key={group.label}
              group={group}
              index={index}
              className={skillPositions[index]}
            />
          ))}

          <CoreCircle />
        </div>

        <Reveal
          className="mx-auto mt-10 max-w-5xl border-l-2 border-[var(--site-accent)] py-3 pl-6"
          delay={0.18}
        >
          <p className="text-2xl font-semibold theme-heading">
            A full-stack engineering foundation built for real product work.
          </p>
          <p className="mt-3 max-w-4xl text-lg leading-8 theme-muted">
            I combine frontend craft, backend architecture, AI-enabled
            workflows, and cloud operations to build systems that are usable,
            scalable, and maintainable. The focus is not just writing code, but
            connecting the right technical decisions to the right product
            outcomes.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function CoreCircle() {
  return (
    <Reveal className="relative min-h-80 lg:col-start-2 lg:row-span-3 lg:row-start-1">
      <div className="absolute inset-8 rounded-full border border-sky-400/20 bg-[conic-gradient(from_140deg,rgba(56,189,248,0.16),rgba(168,85,247,0.12),rgba(16,185,129,0.14),rgba(251,191,36,0.12),rgba(56,189,248,0.16))] " />
      <motion.div
        className="absolute inset-13 rounded-full border border-dashed border-violet-400/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-20 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.2),transparent_62%)] "
        animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-[linear-gradient(145deg,rgba(255,255,255,0.95),rgba(239,246,255,0.9))] p-6 text-center shadow-2xl shadow-sky-500/10 dark:border-white/10 dark:bg-[linear-gradient(145deg,rgba(13,17,23,0.98),rgba(8,13,23,0.96))]"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex h-full flex-col items-center justify-center ">
          <p className="font-mono text-xs uppercase tracking-[0.24em] theme-accent">
            core
          </p>
          <h3 className="mt-3 text-3xl font-black leading-none theme-heading">
            Software
            <br />
            Engineer
          </h3>
          <p className="mt-4 text-sm leading-6 theme-muted">
            Product thinking, system design, and delivery discipline.
          </p>
        </div>
      </motion.div>

      {[
        "left-1/2 top-6",
        "right-8 top-1/2",
        "bottom-6 left-1/2",
        "left-8 top-1/2",
      ].map((position, index) => (
        <motion.span
          key={position}
          className={`absolute ${position} size-3 rounded-full bg-[var(--site-accent)] shadow-[0_0_22px_var(--site-glow)]`}
          animate={{ scale: [1, 1.45, 1], opacity: [0.55, 1, 0.55] }}
          transition={{
            duration: 2.4,
            delay: index * 0.28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </Reveal>
  );
}

function SkillLane({
  group,
  index,
  className,
}: {
  group: (typeof SKILLS)[number];
  index: number;
  className: string;
}) {
  return (
    <Reveal delay={index * 0.08} className={className}>
      <motion.div
        className="relative h-full overflow-hidden rounded border p-5 theme-panel"
        whileHover={{ y: -6, borderColor: "var(--site-accent)" }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,var(--site-accent),transparent)]" />
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] theme-accent">
              {group.label}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-6 theme-muted">
              {group.summary}
            </p>
          </div>
          <span className="font-mono text-xs theme-subtle">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-4 flex max-h-36 flex-wrap gap-1.5 overflow-hidden">
          {group.skills.map((skill, skillIndex) => (
            <motion.span
              key={skill}
              className={`rounded-full border px-2.5 py-1 text-[0.72rem] font-medium leading-none ${chipStyles[skillIndex % chipStyles.length]}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: skillIndex * 0.04 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </Reveal>
  );
}
