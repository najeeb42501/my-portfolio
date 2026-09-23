import { FiCode, FiCpu, FiDatabase, FiGlobe } from "react-icons/fi";
import Reveal from "../shared/Reveal";
import SectionHeading from "../shared/SectionHeading";
const groups = [
  {
    icon: FiCode,
    label: "Interfaces",
    description: "Where people meet the product.",
    skills: [
      "React",
      "Next.js",
      "Angular",
      "TypeScript",
      "Tailwind CSS",
      "Design systems",
      "Accessibility",
      "Animation",
    ],
  },
  {
    icon: FiDatabase,
    label: "Systems",
    description: "The foundations that make it work.",
    skills: [
      "Node.js",
      "Spring Boot",
      "REST APIs",
      "PostgreSQL",
      "Redis",
      "Microservices",
      "Authentication",
      "GraphQL",
    ],
  },
  {
    icon: FiCpu,
    label: "Intelligence",
    description: "Useful AI, thoughtfully integrated.",
    skills: [
      "LLM APIs",
      "RAG",
      "LangChain",
      "Vector search",
      "AI evaluation",
      "Chat interfaces",
    ],
  },
  {
    icon: FiGlobe,
    label: "Delivery",
    description: "From a local build to the real world.",
    skills: [
      "Docker",
      "CI/CD",
      "Cloudflare",
      "AWS",
      "IIS",
      "Performance",
      "SEO",
      "Testing",
    ],
  },
];
export default function Skills() {
  return (
    <section id="skills" className="skills-section section-pad">
      <div className="page-container">
        <SectionHeading
          eyebrow="04 / Capabilities"
          title="The right tools. The bigger picture."
          copy="Technology is a means to a better experience. Here’s the toolkit I bring to the work."
        />
        <div className="capability-grid">
          {groups.map((group, index) => (
            <Reveal key={group.label} delay={index * 0.06}>
              <article className="capability-card">
                <div className="capability-top">
                  <group.icon aria-hidden />
                  <span className="tiny-label">0{index + 1}</span>
                </div>
                <h3>{group.label}</h3>
                <p>{group.description}</p>
                <div className="gallery-tags">
                  {group.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
