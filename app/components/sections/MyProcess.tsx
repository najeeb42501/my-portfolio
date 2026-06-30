"use client";

import type { IconType } from "react-icons";
import {
  FiCheckCircle,
  FiCode,
  FiCpu,
  FiGitBranch,
  FiGitCommit,
  FiPackage,
  FiSearch,
  FiShield,
} from "react-icons/fi";
import {
  Background,
  BackgroundVariant,
  Handle,
  MarkerType,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import Reveal from "../shared/Reveal";
import SectionHeading from "../shared/SectionHeading";

const processNodes = [
  {
    id: "decode",
    hash: "a91c4f2",
    type: "discovery",
    title: "Decode",
    body: "Goals, users, constraints, risks, and success signals become clear.",
    tags: ["Flows", "Rules", "Edge cases"],
    icon: FiSearch,
    tone: "emerald",
  },
  {
    id: "blueprint",
    hash: "c7d92ab",
    type: "architecture",
    title: "Blueprint",
    body: "The solution turns into components, API contracts, state, and delivery shape.",
    tags: ["Components", "APIs", "State"],
    icon: FiCpu,
    tone: "purple",
  },
  {
    id: "build",
    hash: "e9ab013",
    type: "implementation",
    title: "Build",
    body: "Clean UI, typed logic, backend integration, and responsive behavior come together.",
    tags: ["React", "Angular", ".NET"],
    icon: FiCode,
    tone: "sky",
  },
  {
    id: "harden",
    hash: "f31b88c",
    type: "verification",
    title: "Harden",
    body: "The feature gets checked against loading, failure states, accessibility, and QA notes.",
    tags: ["QA", "Fallbacks", "A11y"],
    icon: FiShield,
    tone: "pink",
  },
  {
    id: "release",
    hash: "ff902dc",
    type: "release",
    title: "Release",
    body: "Performance, polish, build confidence, and deployment readiness close the loop.",
    tags: ["Perf", "Build", "Deploy"],
    icon: FiPackage,
    tone: "orange",
  },
];

const toneClasses: Record<string, { chip: string; dot: string; icon: string; card: string; header: string }> = {
  emerald: {
    chip: "theme-chip-emerald",
    dot: "bg-[var(--theme-card-emerald-solid)]",
    icon: "text-[var(--theme-card-emerald-solid)]",
    card: "bg-[linear-gradient(145deg,color-mix(in_srgb,var(--theme-card-emerald-solid)_16%,var(--site-surface-strong)),color-mix(in_srgb,var(--site-panel)_88%,transparent))]",
    header: "bg-[color-mix(in_srgb,var(--theme-card-emerald-solid)_16%,transparent)]",
  },
  purple: {
    chip: "theme-chip-purple",
    dot: "bg-[var(--theme-card-purple-solid)]",
    icon: "text-[var(--theme-card-purple-solid)]",
    card: "bg-[linear-gradient(145deg,color-mix(in_srgb,var(--theme-card-purple-solid)_17%,var(--site-surface-strong)),color-mix(in_srgb,var(--site-panel)_88%,transparent))]",
    header: "bg-[color-mix(in_srgb,var(--theme-card-purple-solid)_16%,transparent)]",
  },
  sky: {
    chip: "theme-chip-sky",
    dot: "bg-[var(--theme-card-sky-solid)]",
    icon: "text-[var(--theme-card-sky-solid)]",
    card: "bg-[linear-gradient(145deg,color-mix(in_srgb,var(--theme-card-sky-solid)_16%,var(--site-surface-strong)),color-mix(in_srgb,var(--site-panel)_88%,transparent))]",
    header: "bg-[color-mix(in_srgb,var(--theme-card-sky-solid)_15%,transparent)]",
  },
  pink: {
    chip: "theme-chip-pink",
    dot: "bg-[var(--theme-card-pink-solid)]",
    icon: "text-[var(--theme-card-pink-solid)]",
    card: "bg-[linear-gradient(145deg,color-mix(in_srgb,var(--theme-card-pink-solid)_15%,var(--site-surface-strong)),color-mix(in_srgb,var(--site-panel)_88%,transparent))]",
    header: "bg-[color-mix(in_srgb,var(--theme-card-pink-solid)_15%,transparent)]",
  },
  orange: {
    chip: "theme-chip-orange",
    dot: "bg-[var(--theme-card-orange-solid)]",
    icon: "text-[var(--theme-card-orange-solid)]",
    card: "bg-[linear-gradient(145deg,color-mix(in_srgb,var(--theme-card-orange-solid)_17%,var(--site-surface-strong)),color-mix(in_srgb,var(--site-panel)_88%,transparent))]",
    header: "bg-[color-mix(in_srgb,var(--theme-card-orange-solid)_15%,transparent)]",
  },
};

type ProcessNodeData = {
  hash: string;
  type: string;
  title: string;
  body: string;
  tags: string[];
  icon: IconType;
  tone: string;
};

function ProcessCard({
  data,
  withHandles = false,
}: {
  data: ProcessNodeData;
  withHandles?: boolean;
}) {
  const Icon = data.icon;
  const tone = toneClasses[data.tone];

  return (
    <article className={`group relative flex h-full min-h-[16rem] w-[13.5rem] flex-col overflow-hidden rounded-[1.1rem] border theme-border ${tone.card} p-4 shadow-[0_20px_70px_color-mix(in_srgb,var(--site-shadow)_35%,transparent)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_color-mix(in_srgb,var(--site-accent)_18%,var(--site-shadow)_42%)]`}>
      {withHandles ? (
        <>
          <Handle id="source-top" type="source" position={Position.Top} className="process-flow-handle" />
          <Handle id="source-bottom" type="source" position={Position.Bottom} className="process-flow-handle" />
          <Handle id="source-right" type="source" position={Position.Right} className="process-flow-handle" />
          <Handle id="target-left" type="target" position={Position.Left} className="process-flow-handle" />
          <Handle id="target-bottom" type="target" position={Position.Bottom} className="process-flow-handle" />
        </>
      ) : null}

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-sky-400 via-blue-500 to-purple-600" />
      <div className={`-mx-4 -mt-4 mb-4 flex items-center justify-between gap-3 border-b px-4 py-3 theme-border ${tone.header}`}>
        <div className="flex min-w-0 items-center gap-2 font-mono text-[0.68rem] font-black theme-muted">
          <FiGitCommit aria-hidden className="shrink-0 text-[var(--site-accent)]" />
          <span>commit</span>
          <span className="text-[var(--theme-card-emerald-solid)]">{data.hash}</span>
        </div>
        <span className={`${tone.chip} rounded-full border px-2.5 py-1 font-mono text-[0.62rem] font-black uppercase tracking-[0.16em]`}>
          HEAD
        </span>
      </div>

      <div className="flex items-start gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl border theme-border bg-[color-mix(in_srgb,var(--site-panel)_72%,transparent)]">
          <Icon aria-hidden className={`text-xl ${tone.icon}`} />
        </span>
        <div className="min-w-0">
          <p className="font-mono text-[0.65rem] font-black uppercase tracking-[0.22em] theme-accent">
            feat({data.type})
          </p>
          <h3 className="text-lg font-extrabold leading-tight theme-heading transition group-hover:translate-x-1">
            {data.title}
          </h3>
        </div>
      </div>

      <p className="mt-3 text-sm leading-5 theme-muted">{data.body}</p>

      <div className="mt-3 grid gap-1 font-mono text-[0.7rem] font-bold theme-muted">
        {data.tags.map((tag) => (
          <span key={tag}>+ {tag}</span>
        ))}
      </div>
    </article>
  );
}

function FlowCard({ data }: NodeProps<Node<ProcessNodeData, "processCard">>) {
  return <ProcessCard data={data} withHandles />;
}

function ReviewGate() {
  return (
    <div className="relative w-[18rem] rounded-[1rem] border theme-border bg-[color-mix(in_srgb,var(--theme-card-emerald-solid)_10%,var(--site-surface-strong))] px-5 py-4 text-center shadow-[0_18px_60px_color-mix(in_srgb,var(--site-shadow)_30%,transparent)]">
      <Handle id="target-left" type="target" position={Position.Left} className="process-flow-handle" />
      <Handle id="source-right" type="source" position={Position.Right} className="process-flow-handle" />
      <p className="font-mono text-[0.65rem] font-black uppercase tracking-[0.2em] theme-accent">
        review gate
      </p>
      <p className="mt-2 text-sm font-semibold leading-6 theme-heading">
        Validate scope, states, copy, and edge cases before final polish.
      </p>
    </div>
  );
}

function ProductionReady() {
  return (
    <div className="relative flex items-center gap-2 rounded-full border theme-border bg-[color-mix(in_srgb,var(--theme-card-emerald-solid)_12%,var(--site-panel))] px-4 py-2 font-mono text-xs font-black text-[var(--theme-card-emerald-solid)] shadow-lg">
      <Handle id="target-left" type="target" position={Position.Left} className="process-flow-handle" />
      <FiCheckCircle aria-hidden />
      Production Ready
    </div>
  );
}

const nodeTypes = {
  processCard: FlowCard,
  reviewGate: ReviewGate,
  productionReady: ProductionReady,
};

const flowNodes: Node[] = [
  ...processNodes.map((node, index) => ({
    id: node.id,
    type: "processCard",
    position: {
      x: index * 236,
      y: index % 2 === 0 ? 0 : 300,
    },
    data: node,
    draggable: false,
  })),
  {
    id: "review-gate",
    type: "reviewGate",
    position: { x: 472, y: 575 },
    data: {},
    draggable: false,
  },
  {
    id: "production-ready",
    type: "productionReady",
    position: { x: 946, y: 610 },
    data: {},
    draggable: false,
  },
];

const edgeStyle = { stroke: "#0ea5e9", strokeWidth: 3 };
const edgeMarker = { type: MarkerType.ArrowClosed, color: "#0ea5e9" };

const flowEdges: Edge[] = [
  {
    id: "decode-blueprint",
    source: "decode",
    target: "blueprint",
    sourceHandle: "source-bottom",
    targetHandle: "target-left",
    type: "smoothstep",
    animated: true,
    markerEnd: edgeMarker,
    style: edgeStyle,
  },
  {
    id: "blueprint-build",
    source: "blueprint",
    target: "build",
    sourceHandle: "source-top",
    targetHandle: "target-left",
    type: "smoothstep",
    animated: true,
    markerEnd: edgeMarker,
    style: edgeStyle,
  },
  {
    id: "build-harden",
    source: "build",
    target: "harden",
    sourceHandle: "source-bottom",
    targetHandle: "target-left",
    type: "smoothstep",
    animated: true,
    markerEnd: edgeMarker,
    style: edgeStyle,
  },
  {
    id: "harden-review",
    source: "harden",
    target: "review-gate",
    sourceHandle: "source-bottom",
    targetHandle: "target-left",
    type: "smoothstep",
    animated: true,
    markerEnd: edgeMarker,
    style: edgeStyle,
  },
  {
    id: "review-release",
    source: "review-gate",
    target: "release",
    sourceHandle: "source-right",
    targetHandle: "target-bottom",
    type: "smoothstep",
    animated: true,
    markerEnd: edgeMarker,
    style: edgeStyle,
  },
  {
    id: "release-production",
    source: "release",
    target: "production-ready",
    sourceHandle: "source-bottom",
    targetHandle: "target-left",
    type: "smoothstep",
    animated: true,
    markerEnd: edgeMarker,
    style: edgeStyle,
  },
];

export default function MyProcess() {
  return (
    <section id="process" className="section-band relative overflow-hidden px-5 py-16 sm:px-8">
      <div className="pointer-events-none absolute inset-0 opacity-[0.045] [background-image:linear-gradient(90deg,var(--site-heading)_1px,transparent_1px),linear-gradient(var(--site-heading)_1px,transparent_1px)] [background-size:38px_38px]" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="My process"
          title="From rough idea to production flow."
          copy="A visual map of how I move from product uncertainty to clean architecture, shippable features, and release-ready polish."
        />

        <Reveal>
          <div className="relative overflow-hidden rounded-[1.35rem] border theme-border bg-[color-mix(in_srgb,var(--site-bg)_70%,var(--site-panel)_84%)] p-4 shadow-[0_28px_100px_color-mix(in_srgb,var(--site-shadow)_40%,transparent)] backdrop-blur-xl sm:p-6">
            <div className="mb-5 flex flex-col gap-4 rounded-2xl border theme-border bg-[color-mix(in_srgb,var(--site-panel)_78%,transparent)] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs font-black theme-heading">
                <span className="grid size-9 place-items-center rounded-full theme-accent-bg text-white">
                  <FiGitBranch aria-hidden />
                </span>
                <span>main</span>
                <span className="theme-muted">{`->`}</span>
                <span className="theme-accent">production-ready</span>
              </div>
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.22em] theme-muted">
                React Flow
              </span>
            </div>

            <div className="relative hidden h-[42rem] lg:block">
              <ReactFlow
                nodes={flowNodes}
                edges={flowEdges}
                nodeTypes={nodeTypes}
                defaultViewport={{ x: 42, y: 34, zoom: 1 }}
                minZoom={1}
                maxZoom={1}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                panOnDrag={false}
                zoomOnScroll={false}
                zoomOnPinch={false}
                zoomOnDoubleClick={false}
                preventScrolling={false}
                proOptions={{ hideAttribution: true }}
              >
                <Background
                  variant={BackgroundVariant.Dots}
                  gap={24}
                  size={1}
                  color="var(--site-border-strong)"
                />
              </ReactFlow>
            </div>

            <div className="relative grid gap-4 lg:hidden">
              <div className="absolute bottom-8 left-5 top-8 w-px bg-gradient-to-b from-sky-400 via-blue-500 to-purple-700" />
              {processNodes.map((node) => {
                const tone = toneClasses[node.tone];
                return (
                  <div key={node.hash} className="relative pl-10">
                    <span className={`absolute left-[0.55rem] top-7 z-10 size-3 rounded-full ${tone.dot} shadow-[0_0_0_6px_var(--site-bg)]`} />
                    <ProcessCard data={node} />
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}



