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
    id: "intro",
    label: "Intro",
    command: "npm run intro",
    lines: [
      "NJB builds modern web apps with a focus on speed, clarity, and polish.",
      "From product idea to shipped interface, the work stays clean and practical.",
    ],
  },
  {
    id: "skills",
    label: "Skills",
    command: "cat skills.json",
    lines: [
      "Next.js, React, TypeScript, Tailwind CSS",
      "API design, performance tuning, accessibility, clean architecture",
    ],
  },
  {
    id: "about",
    label: "About",
    command: "whoami --detail",
    lines: [
      "Software engineer with a product-first mindset.",
      "I like sharp UI, reliable systems, and code that is easy to extend.",
    ],
  },
  {
    id: "contact",
    label: "Contact",
    command: "open ./contact",
    lines: [
      "Available for thoughtful web projects and collaboration.",
      "Jump to the contact section when you are ready to talk.",
    ],
  },
];

export default function IntroTerminal() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const active = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  return (
    <div className="border-t font-mono text-xs theme-border theme-panel sm:text-sm">
      <div className="flex items-center border-b px-3 py-2 theme-border sm:px-5">
        <div className="flex min-w-0 items-center gap-2 theme-muted">
          <span className="size-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.7)]" />
          <span>terminal</span>
        </div>
        <div className="flex overflow-hidden rounded border theme-panel">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 text-[0.68rem] font-semibold transition sm:text-xs ${
                active.id === tab.id
                  ? "theme-accent-bg"
                  : "theme-muted hover:bg-[var(--site-accent-soft)] hover:text-[var(--site-heading)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-2 px-4 py-4 sm:px-6">
        <p>
          <span className="theme-accent">njb@portfolio</span>
          <span className="theme-subtle">:</span>
          <span className="theme-code-keyword">~</span>
          <span className="theme-muted">$ </span>
          <span className="theme-heading">{active.command}</span>
        </p>
        <div className="grid gap-1 pl-4 theme-code-string">
          {active.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
