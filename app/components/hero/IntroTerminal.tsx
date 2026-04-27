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
    <div className="border-t border-white/10 bg-black/45 font-mono text-xs text-zinc-400 sm:text-sm">
      <div className="flex items-center  border-b border-white/10 px-3 py-2 sm:px-5">
        <div className="flex min-w-0 items-center gap-2 text-zinc-500">
          <span className="size-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.7)]" />
          <span>terminal</span>
        </div>
        <div className="flex overflow-hidden rounded border border-white/10 bg-white/[0.03]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 text-[0.68rem] font-semibold transition sm:text-xs ${
                active.id === tab.id
                  ? "bg-cyan-300 text-black"
                  : "text-zinc-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-2 px-4 py-4 sm:px-6">
        <p>
          <span className="text-cyan-300">njb@portfolio</span>
          <span className="text-zinc-600">:</span>
          <span className="text-violet-300">~</span>
          <span className="text-zinc-500">$ </span>
          <span className="text-zinc-200">{active.command}</span>
        </p>
        <div className="grid gap-1 pl-4 text-emerald-200/85">
          {active.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
