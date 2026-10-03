export type Filter = "Fintech" | "Dashboards" | "Websites" | "AI" | "Lab";

export const filters: Filter[] = ["Fintech", "Dashboards", "Websites", "AI", "Lab"];

export type Project = {
  slug: string;
  title: string;
  category: string;
  filters: Filter[];
  /** One line, outcome first. */
  summary: string;
  description: string;
  features: string[];
  stack: string[];
  images: string[];
  status: "Live" | "Private" | "Open source" | "Experiment";
  demo?: string;
  github?: string;
  /** Leave undefined until you know it; the UI hides it when missing. */
  year?: string;
  size: "wide" | "normal";
  /** Where the archive tile links. Case study pages win over live links. */
  caseStudy?: string;
};

export const projects: Project[] = [
  {
    slug: "ubl-funds-portal",
    title: "UBL Funds Portal",
    category: "Investor platform",
    filters: ["Fintech", "Dashboards"],
    summary: "Investors view, invest, redeem and convert funds from one secure self-service portal.",
    description:
      "A customer self-service portal for UBL Funds investors to manage portfolios, investments, redemptions, conversions, billing transactions and profile services.",
    features: [
      "Consolidated portfolio overview and returns",
      "Investment, redemption and fund conversion requests",
      "Scheduled transactions and billing management",
      "Plan allocation and limit enhancement requests",
      "Bank details and profile settings",
      "Secure integration with .NET services, Oracle and SQL",
    ],
    stack: ["Angular 19", "TypeScript", "RxJS", ".NET", "REST APIs"],
    images: [
      "/ubl-portal/ubl-portal-1.png",
      "/ubl-portal/ubl-portal-2.png",
      "/ubl-portal/ubl-portal-3.png",
      "/ubl-portal/ubl-portal-4.png",
      "/ubl-portal/ubl-portal-5.png",
    ],
    status: "Live",
    demo: "https://online.ublfunds.com/UBL1/",
    size: "wide",
    caseStudy: "/work/ubl-funds#customer-portal",
  },
  {
    slug: "paklexai",
    title: "PakLexAI",
    category: "AI legal assistant",
    filters: ["AI"],
    summary: "Plain-language answers about Pakistani law, each one traceable to the source PDF.",
    description:
      "An LLM-powered legal information assistant that connects natural-language questions to relevant Pakistani laws, sections and original source documents.",
    features: [
      "Natural-language legal questions",
      "Relevant law and section identification",
      "Applicable section text and original source PDFs",
      "Practical prevention and compliance steps",
      "Conversational follow-up questions",
      "Clear informational-use disclaimer",
    ],
    stack: ["Next.js", "FastAPI", "OpenAI API", "LangChain", "Vector DBs"],
    images: ["/lawbot/lawbot-1.png", "/lawbot/lawbot-2.png"],
    status: "Live",
    demo: "https://paklex.vercel.app/",
    size: "normal",
    caseStudy: "/work/paklexai",
  },
  {
    slug: "corporate-pension-portal",
    title: "Corporate Pension Portal",
    category: "Pension management",
    filters: ["Fintech", "Dashboards"],
    summary: "HR and finance teams track pension assets, contributions and gains per employee.",
    description:
      "A secure portal for UBL Funds corporate clients to manage pension investments, employee contributions, withdrawals, balances and cost-to-market-value reporting.",
    features: [
      "Organization-wide pension performance dashboard",
      "Employee-level balances and contribution history",
      "Investments, redemptions, withdrawals and exits",
      "Allocation by fund category and scheme type",
      "Cost versus market value, per employee or overall",
      "Searchable tables with CSV export",
    ],
    stack: ["Angular", "TypeScript", ".NET Web API", "Docker", "IIS"],
    images: [
      "/pension-portal/pension-portal-1.png",
      "/pension-portal/pension-portal-2.png",
      "/pension-portal/pension-portal-3.png",
      "/pension-portal/pension-portal-4.png",
      "/pension-portal/pension-portal-6.png",
    ],
    status: "Private",
    size: "normal",
    caseStudy: "/work/ubl-funds#corporate-pension",
  },
  {
    slug: "jobs-dashboard",
    title: "JOBS Dashboard",
    category: "Real-time operations",
    filters: ["Dashboards"],
    summary: "Operations teams see failing jobs the moment they happen, without refreshing.",
    description:
      "A real-time monitoring dashboard for backend jobs, transaction statuses, digital services and account-opening activity.",
    features: [
      "Live job monitoring with socket updates",
      "Transaction status and digital service views",
      "Account-opening status tracking",
      "Filters by source, type and status",
      "Detailed error and execution information",
      "Dark and light themes for monitoring screens",
    ],
    stack: ["React 19", "Socket.IO", "Spring Boot", "Tailwind CSS", "IIS"],
    images: [
      "/jobs-portal/jobs-dashboard.png",
      "/jobs-portal/jobs-dashboard-1.png",
      "/jobs-portal/jobs-dashboard-2.png",
      "/jobs-portal/jobs-dashboard-3.png",
      "/jobs-portal/jobs-dashboard-4.png",
    ],
    status: "Private",
    size: "wide",
    caseStudy: "/work/jobs-dashboard",
  },
  {
    slug: "sofstica-website",
    title: "Sofstica Website",
    category: "Company website",
    filters: ["Websites"],
    summary: "A fast, SEO-ready company site with blog publishing, lead capture and 3D storytelling.",
    description:
      "A modern business website for Sofstica with service sections, 3D visuals, custom blog templates, Resend-powered lead capture and optimized performance.",
    features: [
      "Service-focused landing experience",
      "Blog publishing with custom templates",
      "Lead capture with Resend email delivery",
      "3D model integration and motion",
      "Optimized images and SEO structure",
    ],
    stack: ["Next.js", "TypeScript", "Framer Motion", "Resend", "Cloudflare"],
    images: [
      "/sofstica-website/sofstica.png",
      "/sofstica-website/sofstica-1.png",
      "/sofstica-website/sofstica-2.png",
      "/sofstica-website/sofstica-3.png",
      "/sofstica-website/sofstica-4.png",
    ],
    status: "Live",
    demo: "https://sofstica.com/",
    size: "wide",
  },
  {
    slug: "ubl-funds-onboarding",
    title: "UBL Funds Onboarding",
    category: "Digital onboarding",
    filters: ["Fintech"],
    summary: "New investors sign up in guided steps, and can leave and resume where they stopped.",
    description:
      "A revamped onboarding portal with a backend-driven multi-step flow, OTP verification and saved progress.",
    features: [
      "Backend-controlled multi-step stepper",
      "Save-and-resume from the last completed step",
      "Go back to earlier steps with data preserved",
      "Dynamic fields and validation",
      "OTP-based verification",
      "Clear loading and error states",
    ],
    stack: ["React 19", "Node.js", "Express", "Material UI", "REST APIs"],
    images: [
      "/onboarding-react/onboarding-1.png",
      "/onboarding-react/onboarding-2.png",
      "/onboarding-react/onboarding-4.png",
      "/onboarding-react/onboarding-6.png",
    ],
    status: "Live",
    demo: "https://online.ublfunds.com/onboarding/",
    size: "normal",
    caseStudy: "/work/ubl-funds#onboarding",
  },
  {
    slug: "ubl-corporate-portal",
    title: "UBL Corporate Portal",
    category: "Payment operations",
    filters: ["Fintech", "Dashboards"],
    summary: "Finance teams run bills, vendors and salaries through maker–checker–authorizer approvals.",
    description:
      "An enterprise payment dashboard for bills, vendors, payees, salaries and approval-based finance workflows with dynamic roles.",
    features: [
      "Bill, vendor and salary payment workflows",
      "Maker, checker and authorizer approvals",
      "Super Admin and Company Admin access levels",
      "Dynamic roles and permissions",
      "Reusable data grid with advanced filters",
      "Custom theme built on global design tokens",
    ],
    stack: ["Angular 19", "Spring Boot", "PrimeNG", "Microservices", "RBAC"],
    images: [
      "/payment-dashboard/payment-dashboard-1.png",
      "/payment-dashboard/payment-dashboard-2.png",
      "/payment-dashboard/payment-dashboard-3.png",
      "/payment-dashboard/payment-dashboard-4.png",
    ],
    status: "Private",
    size: "normal",
    caseStudy: "/work/ubl-funds#corporate-payments",
  },
  {
    slug: "radga-website",
    title: "RADGA Website",
    category: "Architecture portfolio",
    filters: ["Websites"],
    summary: "An image-led portfolio that tells the story behind research-driven, social-impact architecture.",
    description:
      "The portfolio site for Rickman Architecture + Design, presenting commercial, civic and community projects through an image-led experience.",
    features: [
      "Image-led project browsing",
      "Completed and active-build project statuses",
      "Firm mission and values storytelling",
      "Performance-conscious image delivery",
    ],
    stack: ["Next.js", "GSAP", "Tailwind CSS", "Framer Motion"],
    images: ["/radga-website/radga-1.png", "/radga-website/radga-2.png", "/radga-website/radga-3.png"],
    status: "Live",
    demo: "https://radga.com/",
    size: "wide",
  },
];

export function projectBySlug(slug: string) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) throw new Error(`Unknown project: ${slug}`);
  return project;
}

export function projectHref(project: Project) {
  return project.caseStudy ?? project.demo ?? project.github;
}

export type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  outcome: string;
  /** Brand-adjacent tint, used only as a soft glow behind screenshots. */
  tint: string;
  cover: string;
  metrics: string[];
  tags: string[];
  demo?: string;
  meta: { label: string; value: string }[];
  problem: string;
  approach: string[];
  solution: string;
  outcomeText: string;
  /** Projects shown as sub-modules. A single-project case study lists itself. */
  modules: { id: string; project: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "ubl-funds",
    title: "UBL Funds",
    category: "Fintech platform · 4 products",
    outcome:
      "One product family for UBL Fund Managers: investors onboard, invest and track their money; corporate teams run pensions and payments.",
    tint: "#2563eb",
    cover: "/ubl-portal/ubl-portal-1.png",
    metrics: ["4 products, one system", "2 live for investors", "Save & resume onboarding"],
    tags: ["Angular 19", "React 19", ".NET", "Spring Boot", "RxJS"],
    demo: "https://online.ublfunds.com/UBL1/",
    meta: [
      { label: "Role", value: "Frontend engineering" },
      { label: "Products", value: "Customer Portal, Onboarding, Corporate Pension, Corporate Payments" },
      { label: "Stack", value: "Angular 19, React 19, RxJS, .NET, Spring Boot, Node.js" },
      { label: "Status", value: "Two live, two privately deployed" },
    ],
    problem:
      "UBL Fund Managers serves very different people: retail investors who want to manage their savings themselves, new customers signing up for the first time, and corporate HR and finance teams who run pensions and payments for whole organizations. Each group needed a secure, responsive way to do its job without calling a branch, and the existing signup experience needed a rework.",
    approach: [
      "Treat the four surfaces as one product family: shared patterns for dashboards, data tables, forms, validation and error handling, tailored per audience.",
      "Keep money movements explicit. Investments, redemptions and conversions are guided forms with clear review steps, and corporate payments follow maker, checker and authorizer approvals.",
      "Let the backend drive what it should. Onboarding steps and fields come from the server, so the flow can change without a frontend release.",
    ],
    solution:
      "A customer portal for portfolios and transactions, a guided onboarding journey with OTP verification and saved progress, a pension portal for corporate clients, and a payments portal with role-based approvals, all speaking the same visual language.",
    outcomeText:
      "The Customer Portal and Onboarding are live for UBL Funds customers at online.ublfunds.com. The Corporate Pension and Corporate Payments portals run privately for corporate clients.",
    modules: [
      { id: "customer-portal", project: "ubl-funds-portal" },
      { id: "onboarding", project: "ubl-funds-onboarding" },
      { id: "corporate-pension", project: "corporate-pension-portal" },
      { id: "corporate-payments", project: "ubl-corporate-portal" },
    ],
  },
  {
    slug: "jobs-dashboard",
    title: "JOBS Dashboard",
    category: "Real-time operations",
    outcome:
      "Operations teams see failed jobs, transactions and account openings the moment they change, with no manual refresh.",
    tint: "#0891b2",
    cover: "/jobs-portal/jobs-dashboard.png",
    metrics: ["Live socket updates", "4 monitoring views", "Wall-screen ready"],
    tags: ["React 19", "Socket.IO", "Spring Boot", "Tailwind CSS"],
    meta: [
      { label: "Role", value: "Frontend engineering" },
      { label: "Stack", value: "React 19, Tailwind CSS, Socket.IO, Spring Boot" },
      { label: "Deployment", value: "IIS on company servers" },
      { label: "Status", value: "Private, internal tool" },
    ],
    problem:
      "Operations teams needed one place to watch backend jobs, transaction statuses, digital services and account-opening activity, and to spot failures quickly on large monitoring screens.",
    approach: [
      "Push, don't poll. Socket.IO streams status changes from Spring Boot services straight into the UI.",
      "Design a status language that reads from across the room: failed, running, idle and successful each have a distinct, consistent treatment.",
      "Keep high-volume tables fast with filtered, optimized rendering, and support dark and light themes for different rooms.",
    ],
    solution:
      "A single dashboard with four live views (jobs, transactions, digital services and account openings), filters by source, type and status, and detailed error information one click away.",
    outcomeText:
      "Socket-based updates replace manual refreshing, so teams can react to failures as they happen. The dashboard is deployed on IIS on company servers.",
    modules: [{ id: "overview", project: "jobs-dashboard" }],
  },
  {
    slug: "paklexai",
    title: "PakLexAI",
    category: "AI legal assistant",
    outcome:
      "Plain-language answers about Pakistani law, each one traceable to the section and source PDF it came from.",
    tint: "#0d9488",
    cover: "/lawbot/lawbot-1.png",
    metrics: ["Grounded with RAG", "Cites source PDFs", "Live on Vercel"],
    tags: ["Next.js", "FastAPI", "OpenAI API", "LangChain", "RAG"],
    demo: "https://paklex.vercel.app/",
    meta: [
      { label: "Role", value: "Design and full-stack engineering" },
      { label: "Stack", value: "Next.js, TypeScript, FastAPI, OpenAI API, LangChain" },
      { label: "Retrieval", value: "Vector search across Pinecone, Weaviate and ChromaDB" },
      { label: "Status", value: "Live" },
    ],
    problem:
      "Pakistani law is dense and hard to navigate for people without legal training. A generic chatbot can sound confident while giving no way to check where an answer came from.",
    approach: [
      "Ground every answer with retrieval-augmented generation over the original legal texts, rather than relying on the model's memory.",
      "Design the answer citation-first: relevant law, the applicable section text, then the explanation, with the source PDF one click away.",
      "Be honest about scope. The assistant presents itself as legal information, not legal advice.",
    ],
    solution:
      "A conversational assistant that identifies relevant laws and sections, shows the section text and source PDF, explains it plainly, and suggests practical prevention or compliance steps.",
    outcomeText:
      "PakLexAI is live at paklex.vercel.app. Because the source is always visible, users can verify every answer for themselves.",
    modules: [{ id: "overview", project: "paklexai" }],
  },
];

export function caseStudyBySlug(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
