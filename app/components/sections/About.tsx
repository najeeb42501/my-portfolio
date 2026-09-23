import { FiArrowUpRight, FiCode, FiLayers, FiZap } from "react-icons/fi";
import Reveal from "../shared/Reveal";
const principles = [
  {
    icon: FiLayers,
    title: "Clarity before complexity.",
    body: "Understand the problem, map the experience, and make every layer earn its place.",
  },
  {
    icon: FiCode,
    title: "Craft you can build on.",
    body: "Reusable interfaces, thoughtful architecture, and clean integrations that hold up as a product grows.",
  },
  {
    icon: FiZap,
    title: "The details are the product.",
    body: "The loading state. The keyboard shortcut. The final millisecond. Small things make a big difference.",
  },
];
export default function About() {
  return (
    <section id="about" className="about-section section-pad">
      <div className="page-container">
        <p className="eyebrow">
          <span className="section-marker" />
          03 / A little about me
        </p>
        <div className="about-layout">
          <Reveal>
            <h2>
              I care about how
              <br />
              it works.
              <br />
              <span className="serif-word">And how it feels.</span>
            </h2>
          </Reveal>
          <Reveal className="about-copy">
            <p className="about-lead">
              I’m Najeeb, a software engineer who enjoys turning complicated
              problems into things people love using.
            </p>
            <p>
              My work spans enterprise dashboards, customer onboarding, business
              websites, and AI experiences. I bring frontend precision and
              full-stack thinking to the same table, from the first user flow to
              the production release.
            </p>
            <p>
              Currently building enterprise products at Jami Partners.
              Previously at Sofstica, with experience in AI evaluation at Turing
              and independent client work.
            </p>
            <a
              className="text-link"
              href="/NajeebullahKhan-resume.pdf"
              download
            >
              Get to know my experience <FiArrowUpRight aria-hidden />
            </a>
          </Reveal>
        </div>
        <div className="principles-grid">
          {principles.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <article className="principle-card">
                <item.icon aria-hidden />
                <span className="tiny-label">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
