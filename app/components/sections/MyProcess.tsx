import { FiArrowUpRight } from "react-icons/fi";
import Reveal from "../shared/Reveal";
import SectionHeading from "../shared/SectionHeading";
const steps = [
  {
    title: "Understand",
    label: "ASK THE RIGHT QUESTIONS",
    copy: "Get close to the problem. Understand the people, the constraints, and what a good outcome looks like.",
  },
  {
    title: "Shape",
    label: "MAKE THE COMPLEX CLEAR",
    copy: "Map the flows, connect the systems, and turn a broad idea into a practical plan.",
  },
  {
    title: "Build",
    label: "BRING IT TO LIFE",
    copy: "Create thoughtful interfaces and reliable integrations, with room to learn and iterate.",
  },
  {
    title: "Refine",
    label: "MAKE THE DETAILS COUNT",
    copy: "Test real scenarios. Tune the performance. Polish the interactions. Ship with care.",
  },
];
export default function MyProcess() {
  return (
    <section id="process" className="process-section section-pad">
      <div className="page-container">
        <SectionHeading
          eyebrow="05 / How I work"
          title="Good work starts with a good process."
          copy="Collaborative from the first conversation. Deliberate through the last detail."
        />
        <div className="process-grid">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.07}>
              <article className="process-card">
                <div className="process-number">
                  0{index + 1}
                  <FiArrowUpRight aria-hidden />
                </div>
                <span className="tiny-label">{step.label}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
