"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import { capabilities, toolNotes, toolPairs } from "@/data/site";

type Group = (typeof capabilities)[number]["title"];
type GraphNode = { id: string; group: Group; hub: boolean; x: number; y: number };
type Edge = { a: number; b: number; len: number; hub: boolean };

const W = 1000;
const H = 620;
const hubStart: Record<string, [number, number]> = {
  Interfaces: [270, 190],
  Systems: [730, 190],
  Intelligence: [270, 440],
  Delivery: [730, 440],
};

/** Force-directed layout, computed once: hubs pull their tools in, every node pushes the rest away. */
function layout() {
  const nodes: GraphNode[] = [];
  const index: Record<string, number> = {};
  capabilities.forEach((c) => {
    index[c.title] = nodes.length;
    const [x, y] = hubStart[c.title];
    nodes.push({ id: c.title, group: c.title, hub: true, x, y });
  });
  capabilities.forEach((c, ci) =>
    c.tools.forEach((tool, i) => {
      const angle = (i / c.tools.length) * Math.PI * 2 + ci;
      const [x, y] = hubStart[c.title];
      index[tool] = nodes.length;
      nodes.push({ id: tool, group: c.title, hub: false, x: x + Math.cos(angle) * 120, y: y + Math.sin(angle) * 95 });
    }),
  );
  const edges: Edge[] = [];
  capabilities.forEach((c) => c.tools.forEach((tool) => edges.push({ a: index[c.title], b: index[tool], len: 145, hub: true })));
  toolPairs.forEach(([a, b]) => edges.push({ a: index[a], b: index[b], len: 200, hub: false }));

  const n = nodes.length;
  const steps = 420;
  for (let it = 0; it < steps; it++) {
    const fx = new Array(n).fill(0);
    const fy = new Array(n).fill(0);
    for (let i = 0; i < n; i++)
      for (let j = i + 1; j < n; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d2 = Math.max(dx * dx + dy * dy, 80);
        const d = Math.sqrt(d2);
        const f = 5200 / d2;
        fx[i] += (dx / d) * f;
        fy[i] += (dy / d) * f;
        fx[j] -= (dx / d) * f;
        fy[j] -= (dy / d) * f;
      }
    for (const e of edges) {
      const A = nodes[e.a];
      const B = nodes[e.b];
      const dx = B.x - A.x;
      const dy = B.y - A.y;
      const d = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
      const f = (d - e.len) * (e.hub ? 0.05 : 0.018);
      fx[e.a] += (dx / d) * f;
      fy[e.a] += (dy / d) * f;
      fx[e.b] -= (dx / d) * f;
      fy[e.b] -= (dy / d) * f;
    }
    const cool = 1 - it / steps;
    const step = (v: number) => Math.max(-9, Math.min(9, v)) * cool;
    for (let i = 0; i < n; i++) {
      fx[i] += (W / 2 - nodes[i].x) * 0.004;
      fy[i] += (H / 2 - nodes[i].y) * 0.006;
      nodes[i].x = Math.max(70, Math.min(900, nodes[i].x + step(fx[i])));
      nodes[i].y = Math.max(46, Math.min(574, nodes[i].y + step(fy[i])));
    }
  }
  // Round once so the server and the browser render identical markup.
  nodes.forEach((node) => {
    node.x = Math.round(node.x * 10) / 10;
    node.y = Math.round(node.y * 10) / 10;
  });
  return { nodes, edges, index };
}

const graph = layout();
const groups = ["All", ...capabilities.map((c) => c.title)] as const;
const hue = (group: Group) => `var(--hue-${group.toLowerCase()})`;
/** Which projects shipped with each tool, matched loosely so "Angular 19" counts as Angular. */
const shippedIn = (tool: string) =>
  projects.filter((p) => p.stack.some((s) => s === tool || s.startsWith(`${tool} `))).map((p) => p.title);

export default function Skills() {
  const [selected, setSelected] = useState("Next.js");
  const [filter, setFilter] = useState<(typeof groups)[number]>("All");
  const [tracing, setTracing] = useState(false);

  const node = graph.nodes[graph.index[selected]];
  const neighbours = new Set<string>();
  graph.edges.forEach((e) => {
    const a = graph.nodes[e.a].id;
    const b = graph.nodes[e.b].id;
    if (a === selected) neighbours.add(b);
    if (b === selected) neighbours.add(a);
  });
  const inFilter = (group: Group) => filter === "All" || group === filter;
  const shipped = node.hub ? [] : shippedIn(selected);

  return (
    <section className="section skills" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <header className="section-head">
          <p className="kicker">Skills</p>
          <h2 className="title" id="skills-title">
            The stack, connected.
          </h2>
          <p className="section-sub">Every line is a pairing from real work. Hover a node to trace what it connects to.</p>
        </header>

        <div className="skills-filter">
          <div className="segmented" role="group" aria-label="Filter skills">
            {groups.map((g) => (
              <button
                key={g}
                type="button"
                aria-pressed={filter === g}
                onClick={() => {
                  setFilter(g);
                  if (g !== "All") setSelected(g);
                }}
              >
                <span className="seg-dot" style={{ background: g === "All" ? "var(--text-muted)" : hue(g) }} aria-hidden />
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="skills-layout">
          <div className="graph-scroll">
            <div className="graph" onMouseLeave={() => setTracing(false)}>
              <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden>
                {graph.edges.map((e, i) => {
                  const A = graph.nodes[e.a];
                  const B = graph.nodes[e.b];
                  const hot = A.id === selected || B.id === selected;
                  const visible = inFilter(A.group) || inFilter(B.group);
                  return (
                    <line
                      key={i}
                      x1={A.x}
                      y1={A.y}
                      x2={B.x}
                      y2={B.y}
                      className={e.hub ? "edge is-hub" : "edge"}
                      data-hot={hot || undefined}
                      data-dim={!visible || (tracing && !hot) || undefined}
                      style={hot ? { stroke: hue(node.group) } : undefined}
                    />
                  );
                })}
              </svg>
              {graph.nodes.map((n) => {
                const on = n.id === selected;
                const near = neighbours.has(n.id);
                const dim = !inFilter(n.group) || (tracing && !on && !near);
                const right = n.x < 820;
                return (
                  <button
                    key={n.id}
                    type="button"
                    className={`node${n.hub ? " is-hub" : ""}${right ? "" : " is-flipped"}`}
                    aria-pressed={on}
                    data-near={near || undefined}
                    data-dim={dim || undefined}
                    style={{ left: `${n.x / 10}%`, top: `${(n.y / H) * 100}%`, "--hue": hue(n.group) } as React.CSSProperties}
                    onMouseEnter={() => {
                      setSelected(n.id);
                      setTracing(true);
                    }}
                    onFocus={() => setSelected(n.id)}
                    onClick={() => setSelected(n.id)}
                  >
                    <span className="node-dot" aria-hidden />
                    <span className="node-name">{n.id}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="skills-panel" aria-live="polite" style={{ "--hue": hue(node.group) } as React.CSSProperties}>
            <div className="panel-card">
              <p className="panel-group">
                <span aria-hidden />
                {node.hub ? "Group" : node.group}
              </p>
              <p className="panel-name">{selected}</p>
              <p className="panel-note">{toolNotes[selected]}</p>
            </div>
            <div className="panel-list">
              <p>Connected to</p>
              <ul>
                {[...neighbours].map((name) => (
                  <li key={name}>
                    <button type="button" onClick={() => setSelected(name)}>
                      <span className="seg-dot" style={{ background: hue(graph.nodes[graph.index[name]].group) }} aria-hidden />
                      {name}
                      <span className="panel-chev" aria-hidden>
                        ›
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="panel-list">
              <p>Shipped in</p>
              <ul>
                {shipped.length ? (
                  shipped.map((title) => <li key={title}>{title}</li>)
                ) : (
                  <li className="is-muted">{node.hub ? "Every project uses this group" : "Part of how every project ships"}</li>
                )}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
