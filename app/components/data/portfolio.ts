export const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const sectionIds = [
  "about",
  "projects",
  "experience",
  "skills",
  "contact",
];

export const stats = [
  { value: "8+", label: "years shipping products" },
  { value: "42%", label: "average perf gains" },
  { value: "12", label: "systems modernized" },
];

export const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "GraphQL",
  "Tailwind CSS",
  "Testing",
  "Accessibility",
  "Design Systems",
  "Cloud",
  "Observability",
];

export const skillBars = [
  { label: "Frontend architecture", value: 94 },
  { label: "Performance tuning", value: 88 },
  { label: "API design", value: 84 },
  { label: "Product systems", value: 91 },
];

export const projects = [
  {
    title: "Sofstica Website",
    description:
      "Release intelligence dashboard with deployment health, canary insight, and incident context in one fast surface.",
    images: [
      "/sofstica.png",
      "/sofstica-1.png",
      "/sofstica-2.png",
      "/sofstica-3.png",
      "/sofstica-4.png",
    ],
    stack: ["Next.js", "TypeScript", "Resend"],
    github: "https://github.com/",
    demo: "https://sofstica.com/",
  },
  {
    title: "JOBS Dashboard",
    description:
      "Realtime analytics workspace for product teams with event streams, collaborative notes, and saved views.",
    images: [
      "/jobs-dashboard.png",
      "/jobs-dashboard-1.png",
      "/jobs-dashboard-2.png",
      "/jobs-dashboard-3.png",
    ],
    stack: ["Next.js", "WebSockets", "Tailwind CSS"],
    github: "https://github.com/",
    demo: "http://172.16.17.30:96/OnlineJobs/",
  },
  {
    title: "Northstar UI",
    description:
      "Accessible component system used across marketing, product, and internal tools with strict visual contracts.",
    images: ["/project-northstar.svg"],
    stack: ["Storybook", "Tailwind", "A11y"],
    github: "https://github.com/",
    demo: "https://example.com/",
  },
  {
    title: "SignalOps",
    description:
      "Operational command center that turns logs, traces, and user impact into crisp engineering priorities.",
    images: ["/project-signal.svg"],
    stack: ["Node.js", "OpenTelemetry", "Redis"],
    github: "https://github.com/",
    demo: "https://example.com/",
  },
];

export const timeline = [
  {
    role: "Senior Software Engineer",
    company: "Vector Labs",
    period: "2023 - Present",
    details:
      "Lead product platform work across Next.js, API reliability, design systems, and performance budgets.",
  },
  {
    role: "Frontend Engineer",
    company: "BrightLayer",
    period: "2020 - 2023",
    details:
      "Built customer-facing dashboards, hardened accessibility standards, and reduced critical interaction latency.",
  },
  {
    role: "Full-Stack Developer",
    company: "Northwind Digital",
    period: "2017 - 2020",
    details:
      "Delivered data-rich web applications, internal automation, and resilient integrations for growing teams.",
  },
];
