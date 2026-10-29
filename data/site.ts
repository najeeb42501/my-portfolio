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
  { label: "Work", id: "work", sections: ["work"] },
  { label: "Projects", id: "gallery", sections: ["gallery"] },
  { label: "Stack", id: "stack", sections: ["stack"] },
  { label: "Experience", id: "experience", sections: ["experience"] },
  { label: "About", id: "about", sections: ["about", "contact"] },
];

export const impact = [
  { value: 3, suffix: "+", label: "Years shipping production software", short: "Years shipping" },
  { value: 8, suffix: "", label: "Products shipped", short: "Products shipped" },
  { value: 5, suffix: "", label: "Live, public deployments", short: "Live in production" },
  { value: 4, suffix: "", label: "Engineering roles", short: "Roles" },
];

/** Employers and client platforms. Swap the wordmarks for SVG logos when you have them. */
export const trustedBy = [
  { name: "UBL Funds", style: "ubl" },
  { name: "Jami Partners", style: "jami" },
  { name: "Sofstica", style: "sofstica" },
  { name: "Turing", style: "turing" },
  { name: "fiverr.", style: "fiverr" },
  { name: "Upwork", style: "upwork" },
] as const;

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

/** One line per tool for the stack map's detail card. Tools come from `capabilities`. */
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
};

/** Pairs of tools used together in real projects; drawn as lines on the stack map. */
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

export const ribbon = ["Accessible", "Fast", "Typed", "Tested", "Responsive", "Secure", "Scalable"];

export const principles = [
  {
    title: "Clarity before complexity",
    body: "Understand the problem, map the experience, and make every layer earn its place.",
  },
  {
    title: "Craft you can build on",
    body: "Reusable interfaces and clean integrations that hold up as the product grows.",
  },
  {
    title: "The details are the product",
    body: "The loading state. The keyboard shortcut. The final millisecond. Small things add up.",
  },
];

export const process = [
  { title: "Understand", body: "Get close to the problem and the people." },
  { title: "Shape", body: "Turn a broad idea into flows and a plan." },
  { title: "Build", body: "Ship interfaces and integrations that hold up." },
  { title: "Refine", body: "Test real scenarios, tune, polish, release." },
];

export const bio = [
  "I'm Najeeb, a software engineer in Karachi who enjoys turning complicated problems into things people like using.",
  "Most of my work lives in fintech: investor portals, onboarding flows and operations dashboards that handle real money and real deadlines.",
  "I bring frontend precision and full-stack thinking to the same table, from the first user flow to the production release. Today I'm building enterprise products at Jami Partners.",
];

export const projectTypes = ["New product", "Frontend build", "Dashboard", "AI feature", "Something else"];
export const budgets = ["< $2k", "$2k – $5k", "$5k – $10k", "$10k +"];
