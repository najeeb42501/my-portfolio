"use client";

import { useState } from "react";

type TerminalTab = {
  id: string;
  label: string;
  command: string;
  lines: string[];
};

const tabs: TerminalTab[] = [
  {
    id: "status",
    label: "Status",
    command: "node ./status.mjs",
    lines: [
      "name: Najeeb Ullah Khan",
      "role: Full Stack Software Engineer",
      "mode: building products, dashboards, APIs, and AI-assisted workflows",
    ],
  },
  {
    id: "focus",
    label: "Focus",
    command: "cat ./current-focus.log",
    lines: [
      "full-stack product development with clean UI and reliable backend flow",
      "AI work: LLM APIs, agents, chatbots, and practical automations",
      "dashboard systems, onboarding flows, integrations, and production polish",
    ],
  },
  {
    id: "process",
    label: "Process",
    command: "git log --oneline --workflow",
    lines: [
      "01 clarify the product goal and user path",
      "02 shape reusable components and data flow",
      "03 ship, test, optimize, and refine the experience",
    ],
  },
  {
    id: "availability",
    label: "Availability",
    command: "open ./contact --intent=collab",
    lines: [
      "available for full-stack, dashboard, and AI-enabled product work",
      "best fit: React/Angular apps, APIs, chatbots, agents, automations",
      "next step: jump to contact and send the project context",
    ],
  },
];

export default function IntroTerminal() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const active = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  return (
    <div className="border-t font-mono text-[0.68rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_-14px_48px_var(--site-accent-soft)] theme-border theme-panel sm:text-xs">
      <div className="flex flex-col gap-1.5 border-b px-3 py-1.5 theme-border theme-panel-strong sm:px-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-2">
          <span className="size-2 rounded-full bg-[#ff5f57] shadow-[0_0_10px_rgba(255,95,87,0.45)]" />
          <span className="size-2 rounded-full bg-[#ffbd2e] shadow-[0_0_10px_rgba(255,189,46,0.4)]" />
          <span className="size-2 rounded-full bg-[#28c840] shadow-[0_0_10px_rgba(40,200,64,0.4)]" />
          <span className="ml-1 truncate text-[0.62rem] font-semibold uppercase tracking-[0.2em] theme-muted">
            njb-terminal
          </span>
        </div>
        <div className="flex max-w-full overflow-x-auto rounded border p-0.5 theme-border theme-panel">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap rounded px-2.5 py-1 text-[0.62rem] font-semibold transition sm:text-[0.68rem] ${
                active.id === tab.id
                  ? "theme-accent-bg shadow-[0_0_18px_var(--site-glow)]"
                  : "theme-muted hover:bg-[var(--site-accent-soft)] hover:text-[var(--site-heading)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative grid gap-1.5 px-4 py-2.5 sm:px-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(color-mix(in_srgb,var(--site-accent)_8%,transparent)_1px,transparent_1px)] bg-[length:100%_24px]" />
        <p className="relative">
          <span className="text-emerald-500">najeeb</span>
          <span className="theme-muted">@</span>
          <span className="theme-accent">portfolio</span>
          <span className="theme-muted">:</span>
          <span className="text-violet-500">~/hero</span>
          <span className="theme-muted"> $ </span>
          <span className="text-amber-500">{active.command}</span>
        </p>
        <div className="relative grid gap-1 pl-4">
          {active.lines.map((line, index) => (
            <p key={line} className="leading-4 sm:leading-5">
              <span className="mr-3 select-none theme-subtle">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="theme-text">{line}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
