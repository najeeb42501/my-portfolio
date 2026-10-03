export type Experience = {
  role: string;
  company: string;
  /** Two-letter monogram shown until a real logo is added. */
  mark: string;
  start: string;
  end: string;
  summary: string;
  highlights: string[];
  tech: string[];
};

export const experience: Experience[] = [
  {
    role: "Software Engineer",
    company: "Jami Partners",
    mark: "JP",
    start: "Sep 2025",
    end: "Present",
    summary:
      "Leading frontend delivery for enterprise dashboards and business applications, with a focus on clean UI systems, scalable architecture and reliable releases.",
    highlights: [
      "Leading Angular 15+ and React dashboard development across active products",
      "Building reusable grids, filters, forms and admin workflows",
      "Improving UI consistency, API integration patterns and performance across enterprise surfaces",
    ],
    tech: ["Angular", "React", "Next.js", ".NET", "Docker", "Redis", "Microservices", "IIS"],
  },
  {
    role: "Jr. Software Engineer",
    company: "Sofstica Solutions",
    mark: "SS",
    start: "Feb 2024",
    end: "Sep 2025",
    summary:
      "Built customer-facing websites, dashboards, onboarding experiences and backend-connected interfaces for business teams and live users.",
    highlights: [
      "Shipped responsive dashboards and customer-facing platforms to production",
      "Integrated frontends with backend APIs, authentication and authorization flows",
      "Built onboarding journeys, polished forms, service websites and LLM-backed chat features",
    ],
    tech: ["Angular", "Next.js", "React", "Spring Boot", "Node.js", "PostgreSQL", "RAG", "AWS"],
  },
  {
    role: "AI Trainer",
    company: "Turing · Part-time contract",
    mark: "TU",
    start: "Jan 2024",
    end: "May 2024",
    summary:
      "Worked on LLM training and evaluation, reviewing model responses and refining coding and reasoning outputs.",
    highlights: [
      "Reviewed AI-generated code for correctness, edge cases and instruction following",
      "Improved prompts for clearer, more reliable model output",
      "Evaluated multi-turn chats, function calling and JSON structure",
    ],
    tech: ["Python", "LLM evaluation", "Prompting", "Code review", "JSON", "Function calling"],
  },
  {
    role: "Frontend Developer",
    company: "Freelance · Fiverr & Upwork",
    mark: "FL",
    start: "Feb 2023",
    end: "Jan 2024",
    summary:
      "Delivered frontend work directly for clients: responsive websites, React interfaces and WordPress business pages.",
    highlights: [
      "Built responsive React interfaces from client requirements and Figma files",
      "Created and customized WordPress websites and landing pages",
      "Handled UI fixes, layout improvements and frontend polish with quick turnaround",
    ],
    tech: ["React", "Tailwind CSS", "Bootstrap", "WordPress", "Framer Motion", "Figma to code"],
  },
];
