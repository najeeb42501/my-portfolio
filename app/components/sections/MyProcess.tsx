import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  FiArrowRight,
  FiCheck,
  FiCheckCircle,
  FiCode,
  FiCpu,
  FiPackage,
  FiSearch,
  FiShield,
} from "react-icons/fi";
import Reveal from "../shared/Reveal";
import SectionHeading from "../shared/SectionHeading";

type ProcessStep = {
  title: string;
  label: string;
  body: string;
  tags: string[];
  icon: IconType;
  tone: string;
  color: string;
};

const processSteps: ProcessStep[] = [
  {
    title: "Decode",
    label: "Discover",
    body: "I turn early ideas into a clear product direction by understanding the users, constraints, risks, and measures of success.",
    tags: ["User flows", "Requirements", "Edge cases"],
    icon: FiSearch,
    tone: "theme-card-emerald",
    color: "var(--theme-card-emerald-solid)",
  },
  {
    title: "Blueprint",
    label: "Plan",
    body: "I map the right components, data flow, API contracts, and delivery approach before implementation begins.",
    tags: ["Architecture", "Components", "Data flow"],
    icon: FiCpu,
    tone: "theme-card-purple",
    color: "var(--theme-card-purple-solid)",
  },
  {
    title: "Build",
    label: "Create",
    body: "I build a responsive, typed, and maintainable experience while connecting the interface to dependable backend services.",
    tags: ["Clean UI", "Typed logic", "Integration"],
    icon: FiCode,
    tone: "theme-card-sky",
    color: "var(--theme-card-sky-solid)",
  },
  {
    title: "Harden",
    label: "Verify",
    body: "I test real user states, accessibility, performance, and failure paths so the experience remains reliable under pressure.",
    tags: ["Quality checks", "Accessibility", "Fallbacks"],
    icon: FiShield,
    tone: "theme-card-pink",
    color: "var(--theme-card-pink-solid)",
  },
  {
    title: "Release",
    label: "Deliver",
    body: "I refine the final details, validate the production build, and prepare a confident, low-friction release.",
    tags: ["Performance", "Final polish", "Deployment"],
    icon: FiPackage,
    tone: "theme-card-orange",
    color: "var(--theme-card-orange-solid)",
  },
];

function ProcessCard({ step, index }: { step: ProcessStep; index: number }) {
  const Icon = step.icon;
  const style = { "--step-color": step.color } as CSSProperties;

  return (
    <article
      tabIndex={0}
      style={style}
      aria-label={`${step.label}: ${step.title}. Focus or hover to read the description.`}
      className="group relative h-[15rem] rounded-[1.35rem] outline-none [perspective:1200px] focus-visible:ring-2 focus-visible:ring-[var(--step-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--site-bg)]"
    >
      <div className="relative size-full rounded-[1.35rem] shadow-[0_20px_55px_color-mix(in_srgb,var(--step-color)_24%,var(--site-shadow))] transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus:[transform:rotateY(180deg)] motion-reduce:duration-0">
        <div
          className={`absolute inset-0 flex flex-col overflow-hidden rounded-[1.35rem] ${step.tone} p-5 text-white [backface-visibility:hidden]`}
        >
          <div className="pointer-events-none absolute -right-8 -top-10 size-32 rounded-full bg-white/15 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-10 size-36 rounded-full bg-black/10 blur-2xl" />

          <div className="relative z-10 flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-[var(--step-color)] shadow-lg ring-1 ring-white/60">
              <Icon aria-hidden className="text-xl" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[0.6rem] font-black uppercase tracking-[0.19em] text-white/70">
                {step.label}
              </p>
              <h3 className="mt-0.5 truncate text-lg font-black leading-tight">
                {step.title}
              </h3>
            </div>
            <span className="self-start font-mono text-xs font-black text-white/70">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <ul className="relative z-10 mt-5 grid gap-2">
            {step.tags.map((tag) => (
              <li
                key={tag}
                className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs font-bold text-white/90 backdrop-blur-sm"
              >
                <span className="grid size-4 shrink-0 place-items-center rounded-full bg-white/20">
                  <FiCheck aria-hidden className="text-[0.65rem]" />
                </span>
                {tag}
              </li>
            ))}
          </ul>

          <p className="relative z-10 mt-auto flex items-center justify-end gap-1.5 pt-3 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/60">
            View details <FiArrowRight aria-hidden />
          </p>
        </div>

        <div
          className={`absolute inset-0 flex flex-col overflow-hidden rounded-[1.35rem] ${step.tone} p-5 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]`}
        >
          <div className="pointer-events-none absolute inset-0 bg-black/10" />
          <div className="pointer-events-none absolute -right-10 -top-12 size-36 rounded-full bg-white/15 blur-2xl" />

          <div className="relative z-10 flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-lg bg-white/15 ring-1 ring-white/25">
              <Icon aria-hidden className="text-base" />
            </span>
            <div>
              <p className="font-mono text-[0.58rem] font-black uppercase tracking-[0.18em] text-white/65">
                {step.label}
              </p>
              <h3 className="text-base font-black">{step.title}</h3>
            </div>
          </div>

          <p className="relative z-10 my-auto text-sm font-medium leading-6 text-white/90">
            {step.body}
          </p>

          {/* <p className="relative z-10 flex items-center gap-1.5 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/60">
            <FiArrowLeft aria-hidden /> Back to overview
          </p> */}
        </div>
      </div>
    </article>
  );
}

export default function MyProcess() {
  return (
    <section
      id="process"
      className="section-band relative overflow-hidden px-5 py-16 sm:px-8"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(90deg,var(--site-heading)_1px,transparent_1px),linear-gradient(var(--site-heading)_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="My process"
          title="A clear path from idea to launch."
          copy="A practical five-step workflow that keeps the work focused, the product quality high, and every decision easy to follow."
        />

        <Reveal>
          <div className="relative mt-2">
            <div className="absolute bottom-6 left-3 top-6 w-px bg-gradient-to-b from-emerald-500 via-sky-500 to-orange-500 opacity-25 md:hidden" />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5 xl:gap-5">
              {processSteps.map((step, index) => (
                <div key={step.title} className="relative pl-6 md:pl-0">
                  <span
                    aria-hidden
                    style={{ background: step.color }}
                    className="absolute left-3 top-8 z-10 size-2.5 -translate-x-1/2 rounded-full ring-4 ring-[var(--site-bg)] md:hidden"
                  />
                  <ProcessCard step={step} index={index} />
                  {index < processSteps.length - 1 ? (
                    <span className="absolute -right-4 top-1/2 z-20 hidden size-7 -translate-y-1/2 place-items-center rounded-full border border-white/45 bg-[var(--site-surface-strong)] text-[var(--site-accent)] shadow-md xl:grid">
                      <FiArrowRight aria-hidden className="text-sm" />
                    </span>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-col gap-3 rounded-2xl border theme-border bg-[color-mix(in_srgb,var(--theme-card-emerald-solid)_7%,var(--site-surface-strong))] px-5 py-3.5 shadow-[0_10px_30px_color-mix(in_srgb,var(--site-shadow)_16%,transparent)] sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[color-mix(in_srgb,var(--theme-card-emerald-solid)_13%,transparent)] text-[var(--theme-card-emerald-solid)]">
                  <FiCheckCircle aria-hidden className="text-lg" />
                </span>
                <div>
                  <p className="text-sm font-extrabold theme-heading">
                    Production ready
                  </p>
                  <p className="text-xs leading-5 theme-muted">
                    Validated, polished, and ready to create value.
                  </p>
                </div>
              </div>
              <span className="w-fit rounded-full border border-[color-mix(in_srgb,var(--theme-card-emerald-solid)_24%,transparent)] bg-[color-mix(in_srgb,var(--theme-card-emerald-solid)_10%,transparent)] px-3 py-1.5 font-mono text-[0.65rem] font-black uppercase tracking-[0.16em] text-[var(--theme-card-emerald-solid)]">
                Ship with confidence
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
