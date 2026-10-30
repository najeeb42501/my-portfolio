export const profile = {
  name: "Najeeb Ullah Khan",
  shortName: "Najeeb",
  role: "Software Engineer",
  location: "Karachi, Pakistan",
  timezone: "Asia/Karachi",
  timezoneLabel: "PKT · UTC+5",
  email: "najeeb08089@gmail.com",
  resume: "/NajeebullahKhan-resume.pdf",
  portrait: "/najeeb-new.png",
  availability: "Available for freelance work",
  responseTime: "Replies within 24h",
  tagline: "Thoughtfully designed. Carefully engineered.",
  supportLine:
    "Software engineer building fintech portals, real-time dashboards and AI-powered products.",
};

export const socials = [
  { label: "GitHub", href: "https://github.com/najeeb42501" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/najeebullah-khan-86b759170/",
  },
];

export const navItems = [
  { label: "About", id: "about", sections: ["about"] },
  { label: "Expertise", id: "expertise", sections: ["expertise"] },
  { label: "Work", id: "work", sections: ["work", "projects"] },
  { label: "Skills", id: "skills", sections: ["skills"] },
  { label: "Experience", id: "experience", sections: ["experience", "contact"] },
];

export const capabilities = [
  {
    id: "interfaces",
    title: "Interfaces",
    body: "Accessible, fast interfaces with design-system discipline, from data-heavy dashboards to customer journeys.",
    tools: ["React", "Next.js", "Angular", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "systems",
    title: "Systems",
    body: "APIs, auth and data flows that hold up when real money and real users move through them.",
    tools: ["Node.js", "Spring Boot", ".NET", "PostgreSQL", "Redis", "REST APIs"],
  },
  {
    id: "intelligence",
    title: "Intelligence",
    body: "Useful AI, thoughtfully integrated: retrieval, grounded answers, and careful evaluation of model output.",
    tools: ["OpenAI API", "LangChain", "RAG", "Vector DBs", "FastAPI", "LLM evaluation"],
  },
  {
    id: "delivery",
    title: "Delivery",
    body: "From a local build to the real world, with containers, pipelines and on-prem or cloud releases.",
    tools: ["Docker", "CI/CD", "IIS", "AWS", "Cloudflare", "Vercel"],
  },
] as const;

/** One line per node for the skills graph's detail card. Tools come from `capabilities`. */
export const toolNotes: Record<string, string> = {
  React: "Component systems that stay readable as a product grows.",
  "Next.js": "Server rendering, routing and fast first loads.",
  Angular: "Large enterprise dashboards with strict structure and RxJS.",
  TypeScript: "Typed from the API response to the button label.",
  "Tailwind CSS": "Design tokens turned into a consistent interface.",
  "Framer Motion": "Motion that explains what just changed.",
  "Node.js": "Services and integrations behind the interface.",
  "Spring Boot": "Java services for payments, jobs and operations.",
  ".NET": "Enterprise APIs behind the fund and pension portals.",
  PostgreSQL: "Relational data and reporting queries.",
  Redis: "Caching and fast lookups for busy dashboards.",
  "REST APIs": "Clear contracts between frontend and backend.",
  "OpenAI API": "Language models inside real product features.",
  LangChain: "Chaining retrieval, prompts and tools.",
  RAG: "Answers grounded in source documents, with citations.",
  "Vector DBs": "Finding the right passage for each question.",
  FastAPI: "Python APIs that serve the AI features.",
  "LLM evaluation": "Checking model output for correctness, not just tone.",
  Docker: "The same environment on every machine.",
  "CI/CD": "Every merge tested and released.",
  IIS: "On-prem releases for internal banking tools.",
  AWS: "Cloud hosting for client platforms.",
  Cloudflare: "DNS, caching and edge delivery for websites.",
  Vercel: "A preview link for every branch.",
  Interfaces: "What people see and touch: accessible, fast interfaces.",
  Systems: "APIs, auth and data flows that hold up under real money.",
  Intelligence: "Useful AI, thoughtfully integrated and evaluated.",
  Delivery: "From a local build to production, cloud or on-prem.",
};

/** Pairs of tools used together in real projects; drawn as edges on the skills graph. */
export const toolPairs: [string, string][] = [
  ["React", "Next.js"],
  ["React", "TypeScript"],
  ["Angular", "TypeScript"],
  ["React", "Tailwind CSS"],
  ["Next.js", "Tailwind CSS"],
  ["Next.js", "Framer Motion"],
  ["Next.js", "Vercel"],
  ["Next.js", "Cloudflare"],
  ["Next.js", "FastAPI"],
  ["Angular", ".NET"],
  ["Angular", "Spring Boot"],
  ["React", "Spring Boot"],
  ["React", "Node.js"],
  ["Node.js", "REST APIs"],
  [".NET", "REST APIs"],
  [".NET", "Redis"],
  ["Spring Boot", "PostgreSQL"],
  ["Spring Boot", "AWS"],
  [".NET", "IIS"],
  ["Docker", ".NET"],
  ["Docker", "CI/CD"],
  ["CI/CD", "Vercel"],
  ["FastAPI", "LangChain"],
  ["LangChain", "OpenAI API"],
  ["LangChain", "RAG"],
  ["RAG", "Vector DBs"],
  ["OpenAI API", "LLM evaluation"],
];

export const projectTypes = ["New product", "Frontend build", "Dashboard", "AI feature", "Something else"];
export const budgets = ["< $2k", "$2k – $5k", "$5k – $10k", "$10k +"];

/* Home page v2 ------------------------------------------------------------ */

/** Lock screen notifications in the hero. Tapping one reveals its two actions. */
export const lockNotes = [
  {
    app: "Najeeb",
    when: "now",
    title: "Open to new work",
    body: "Tap to say hello. Product teams, startups and fintech welcome.",
    icon: "avatar",
    actions: [
      { label: "Email me", href: "mailto:najeeb08089@gmail.com" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/najeebullah-khan-86b759170/" },
    ],
  },
  {
    app: "PakLexAI",
    when: "Live",
    title: "Ask a legal question, get the source",
    body: "Answers about Pakistani law, each linked to the section it came from.",
    icon: "PL",
    actions: [
      { label: "Open app", href: "https://paklex.vercel.app/" },
      { label: "Case study", href: "/work/paklexai" },
    ],
  },
  {
    app: "Karachi",
    when: "clock",
    title: "Replies usually within 24 hours",
    body: "Working hours overlap with Europe and the Gulf.",
    icon: "24h",
    actions: [
      { label: "Book a call", href: "#contact" },
      { label: "Résumé", href: "/NajeebullahKhan-resume.pdf" },
    ],
  },
] as const;

/** The About sentence. The hero already covers who, where and the numbers. */
export const aboutLine =
  "Good software feels quiet. At Jami Partners I build enterprise dashboards, and I sweat the details most people never notice: the loading state, the empty screen, the error that tells you what to do next.";

export const workPrinciples = [
  { title: "Clarity first", body: "Every screen answers one question well.", tone: "blue", icon: "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zM12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8z" },
  { title: "Built to last", body: "Typed, tested and observable from day one.", tone: "green", icon: "M12 3l7 3v6c0 4.5-3 7.5-7 9c-4-1.5-7-4.5-7-9V6zM8.5 12l2.5 2.5l4.5-5" },
  { title: "Ship, then refine", body: "Small releases, real feedback, steady polish.", tone: "orange", icon: "M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4" },
] as const;

/** Stars in the expertise galaxy. Positions are percentages of the galaxy card. */
export const expertise = [
  { name: "System Design", kind: "Core strength", major: true, x: 34, y: 42, hue: "#64D2FF", body: "Services, data flows and boundaries that hold up under real traffic and real money." },
  { name: "DevOps", kind: "Core strength", major: true, x: 66, y: 36, hue: "#FF9F0A", body: "Docker, CI/CD and on-prem IIS releases that ship without drama." },
  { name: "AI Automation", kind: "Core strength", major: true, x: 57, y: 64, hue: "#BF5AF2", body: "LLM features, RAG pipelines and agents that take busywork off people." },
  { name: "Frontend Architecture", kind: "Strength", x: 17, y: 22, hue: "#0A84FF", body: "Component systems that stay readable at enterprise scale." },
  { name: "Fintech Platforms", kind: "Domain", x: 80, y: 17, hue: "#30D158", body: "Investor portals, onboarding, pensions and payments for UBL Funds." },
  { name: "Real-time Dashboards", kind: "Strength", x: 86, y: 56, hue: "#64D2FF", body: "Socket-driven monitoring that shows failures the moment they happen." },
  { name: "RAG and LLMs", kind: "Strength", x: 74, y: 82, hue: "#BF5AF2", body: "Answers grounded in source documents, each one citable." },
  { name: "Design Systems", kind: "Strength", x: 24, y: 61, hue: "#FF375F", body: "Tokens, grids and reusable patterns shared across products." },
  { name: "Microservices", kind: "Strength", x: 11, y: 48, hue: "#30D158", body: "Spring Boot and .NET services behind the interfaces." },
  { name: "Performance", kind: "Craft", x: 42, y: 86, hue: "#FFD60A", body: "Fast first loads and smooth interactions on real devices." },
  { name: "Accessibility", kind: "Craft", x: 45, y: 15, hue: "#FF9F0A", body: "Keyboard, screen reader and contrast, done properly." },
  { name: "Prompt Engineering", kind: "Strength", x: 88, y: 36, hue: "#FF375F", body: "Clear, reliable model output that is evaluated, not guessed." },
];

/** Teams and tools in the dock. A divider separates teams from tools. */
export const dock = [
  { name: "UBL Funds", glyph: "UBL", size: 15, bg: "linear-gradient(160deg, #1E63D6, #0B3E91)", fg: "#FFFFFF" },
  { name: "Jami Partners, now", glyph: "JP", size: 20, bg: "linear-gradient(160deg, #5E5CE6, #3634A3)", fg: "#FFFFFF", running: true },
  { name: "Sofstica", glyph: "S", size: 24, bg: "linear-gradient(160deg, #BF5AF2, #7A2BB5)", fg: "#FFFFFF" },
  { name: "Turing", glyph: "T", size: 24, bg: "linear-gradient(160deg, #3A3A3C, #0B0B0C)", fg: "#FFFFFF" },
  { name: "Fiverr", glyph: "fi", size: 22, bg: "linear-gradient(160deg, #1DBF73, #0E8A50)", fg: "#FFFFFF" },
  { name: "Upwork", glyph: "Up", size: 19, bg: "linear-gradient(160deg, #6FDA44, #3C8D1E)", fg: "#FFFFFF" },
  { name: "Angular", glyph: "Ng", size: 19, bg: "linear-gradient(160deg, #F0306A, #A0103E)", fg: "#FFFFFF", divider: true },
  { name: "React", glyph: "Re", size: 19, bg: "linear-gradient(160deg, #23272F, #0B0D11)", fg: "#61DAFB" },
  { name: "Next.js", glyph: "N", size: 24, bg: "linear-gradient(160deg, #FFFFFF, #D9D9DE)", fg: "#000000" },
  { name: ".NET", glyph: ".N", size: 19, bg: "linear-gradient(160deg, #8A4FE0, #512BD4)", fg: "#FFFFFF" },
  { name: "Spring Boot", glyph: "Sb", size: 19, bg: "linear-gradient(160deg, #7FC75A, #4E9A2B)", fg: "#FFFFFF" },
  { name: "Docker", glyph: "Dk", size: 19, bg: "linear-gradient(160deg, #2CA5F0, #1468C2)", fg: "#FFFFFF" },
  { name: "OpenAI API", glyph: "AI", size: 19, bg: "linear-gradient(160deg, #2C2C2E, #000000)", fg: "#FFFFFF" },
  { name: "Figma", glyph: "F", size: 24, bg: "linear-gradient(160deg, #FF7262, #A259FF)", fg: "#FFFFFF" },
];
