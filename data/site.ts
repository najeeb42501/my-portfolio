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
  { label: "Work", id: "work", sections: ["work", "archive", "impact", "capabilities"] },
  { label: "Experience", id: "experience", sections: ["experience"] },
  { label: "About", id: "about", sections: ["about"] },
  { label: "Contact", id: "contact", sections: ["contact"] },
];

/** Shown in the hero proof row. Keep these in sync with `impact`. */
export const proof = ["3+ years", "8 products shipped", "Based in Karachi"];

export const impact = [
  { value: 3, suffix: "+", label: "Years shipping production software" },
  { value: 8, suffix: "", label: "Products shipped" },
  { value: 5, suffix: "", label: "Live, public deployments" },
  { value: 4, suffix: "", label: "Engineering roles" },
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
