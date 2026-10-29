"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { projects } from "@/data/projects";
import { capabilities, toolNotes, toolPairs } from "@/data/site";
import Reveal from "../ui/Reveal";

type Group = (typeof capabilities)[number]["id"];

const hue: Record<Group, string> = {
  interfaces: "var(--hue-interfaces)",
  systems: "var(--hue-systems)",
  intelligence: "var(--hue-intelligence)",
  delivery: "var(--hue-delivery)",
};

// Each group owns a quadrant of the map; tools sit in two staggered columns inside it.
const zones: Record<Group, { x: number; y: number }> = {
  interfaces: { x: 1.5, y: 3 },
  systems: { x: 52.5, y: 3 },
  intelligence: { x: 1.5, y: 53 },
  delivery: { x: 52.5, y: 53 },
};
const ZONE_W = 46;
const ZONE_H = 44;

type Tool = { name: string; group: Group; mark: string; x: number; y: number };

const tools: Tool[] = capabilities.flatMap((cap) =>
  cap.tools.map((name, i) => {
    const zone = zones[cap.id];
    const column = i % 2;
    const row = Math.floor(i / 2);
    return {
      name,
      group: cap.id,
      mark: name.replace(/[^A-Za-z]/g, "").slice(0, 2),
      x: zone.x + 3.5 + column * 22,
      y: zone.y + 13 + row * 10.5 + column * 4,
    };
  }),
);
const toolByName = Object.fromEntries(tools.map((t) => [t.name, t]));
const pairs = toolPairs.filter(([a, b]) => toolByName[a] && toolByName[b]);

const usesTool = (stack: string[], tool: string) => stack.some((s) => s === tool || s.startsWith(`${tool} `));

export default function StackMap() {
  const [selected, setSelected] = useState("Next.js");
  const [filter, setFilter] = useState<Group | "all">("all");
  const current = toolByName[selected];
  const linked = useMemo(
    () => new Set(pairs.flatMap(([a, b]) => (a === selected ? [b] : b === selected ? [a] : []))),
    [selected],
  );
  const shippedIn = projects.filter((p) => usesTool(p.stack, selected));
  const recipe = [selected, ...Array.from(linked).slice(0, 2)];
  const inFilter = (group: Group) => filter === "all" || filter === group;

  return (
    <section className="section stack" id="stack" aria-labelledby="stack-title">
      <div className="container">
        <Reveal className="section-title-block">
          <p className="kicker">My stack</p>
          <h2 className="title-xl" id="stack-title">
            The magic <span className="serif grad-text">underneath</span>
          </h2>
          <p className="lead">
            No skill bars. Every line is a pairing I use in real work. Pick a tool to see what it works with and where it
            shipped.
          </p>
        </Reveal>

        <div className="stack-toolbar">
          <div className="segmented" role="group" aria-label="Filter tools">
            {(["all", ...capabilities.map((c) => c.id)] as const).map((id) => {
              const cap = capabilities.find((c) => c.id === id);
              const active = filter === id;
              return (
                <button
                  key={id}
                  type="button"
                  className="segment"
                  aria-pressed={active}
                  onClick={() => {
                    setFilter(id);
                    if (cap && toolByName[selected].group !== id) setSelected(cap.tools[0]);
                  }}
                >
                  {active ? <motion.span layoutId="stack-tab" className="segment-pill" /> : null}
                  <span>
                    <i className="stack-dot" style={{ background: cap ? hue[cap.id] : "var(--accent)" }} aria-hidden />
                    {cap ? cap.title : "All"}
                    <span className="count">{cap ? cap.tools.length : tools.length}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <p className="stack-count">
            {tools.length} tools, {pairs.length} real pairings
          </p>
        </div>

        <div className="stack-layout">
          <div className="stack-map-scroll">
            <div className="stack-map">
              {capabilities.map((cap) => {
                const zone = zones[cap.id];
                const lit = current.group === cap.id;
                return (
                  <div
                    key={cap.id}
                    className={`stack-zone${lit ? " is-lit" : ""}`}
                    style={
                      {
                        left: `${zone.x}%`,
                        top: `${zone.y}%`,
                        width: `${ZONE_W}%`,
                        height: `${ZONE_H}%`,
                        "--hue": hue[cap.id],
                        opacity: inFilter(cap.id) ? 1 : 0.35,
                      } as React.CSSProperties
                    }
                  >
                    <span className="stack-zone-label">
                      <i style={{ background: hue[cap.id] }} aria-hidden />
                      <span className="serif">{cap.title}</span>
                      <span className="count">{cap.tools.length}</span>
                    </span>
                  </div>
                );
              })}

              <svg className="stack-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                {pairs.map(([a, b]) => {
                  const p = toolByName[a];
                  const q = toolByName[b];
                  const x1 = p.x + 1.8;
                  const x2 = q.x + 1.8;
                  const mx = (x1 + x2) / 2;
                  const my = (p.y + q.y) / 2;
                  const cx = mx - (q.y - p.y) * 0.22;
                  const cy = my + (x2 - x1) * 0.22;
                  const hot = a === selected || b === selected;
                  const dim = !(inFilter(p.group) || inFilter(q.group));
                  return (
                    <path
                      key={`${a}-${b}`}
                      d={`M ${x1} ${p.y} Q ${cx} ${cy} ${x2} ${q.y}`}
                      className={`stack-line${hot ? " is-hot" : ""}${dim ? " is-dim" : ""}`}
                    />
                  );
                })}
              </svg>

              {tools.map((tool) => {
                const on = tool.name === selected;
                const near = linked.has(tool.name);
                return (
                  <button
                    key={tool.name}
                    type="button"
                    className={`stack-node${on ? " is-on" : ""}${near ? " is-near" : ""}`}
                    style={
                      {
                        left: `${tool.x}%`,
                        top: `${tool.y}%`,
                        "--hue": hue[tool.group],
                        opacity: inFilter(tool.group) ? 1 : 0.3,
                      } as React.CSSProperties
                    }
                    aria-pressed={on}
                    onClick={() => setSelected(tool.name)}
                    onPointerEnter={(event) => {
                      if (event.pointerType === "mouse") setSelected(tool.name);
                    }}
                    onFocus={() => setSelected(tool.name)}
                  >
                    <span className="stack-mark" aria-hidden>
                      {tool.mark}
                    </span>
                    {tool.name}
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="stack-detail" aria-live="polite">
            <div className="stack-detail-head">
              <span className="stack-detail-mark" style={{ background: hue[current.group] }} aria-hidden>
                {current.mark}
              </span>
              <div>
                <p className="stack-detail-name">{selected}</p>
                <p className="serif muted">{capabilities.find((c) => c.id === current.group)!.title}</p>
              </div>
            </div>
            <p className="muted">{toolNotes[selected] ?? ""}</p>
            <div>
              <p className="stack-detail-label">Pairs with</p>
              <div className="chips">
                {Array.from(linked).map((name) => (
                  <button key={name} type="button" className="chip chip-button" onClick={() => setSelected(name)}>
                    {name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="stack-detail-label">Shipped in</p>
              {shippedIn.length ? (
                <ul className="stack-projects">
                  {shippedIn.map((project) => (
                    <li key={project.slug}>
                      <span>{project.title}</span>
                      <span className="muted">{project.category}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="stack-projects-empty">Part of how the work gets built and shipped.</p>
              )}
            </div>
            <div className="stack-recipe">
              <p className="stack-detail-label">A stack I&rsquo;d reach for</p>
              <p>
                {recipe.map((name, i) => (
                  <span key={name}>
                    <span className="stack-recipe-item">{name}</span>
                    {i < recipe.length - 1 ? <span className="muted"> + </span> : null}
                  </span>
                ))}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
