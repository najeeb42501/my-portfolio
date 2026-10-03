import { FiCheck } from "react-icons/fi";
import { capabilities } from "@/data/site";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";

function InterfacesVisual() {
  return (
    <div className="mv-ui">
      <div className="mv-row">
        <span>Notifications</span>
        <span className="mv-toggle" />
      </div>
      <div>
        <div className="mv-slider">
          <span className="mv-slider-fill" />
          <span className="mv-slider-thumb" />
        </div>
        <div className="mv-ticks">
          <span>Daily</span>
          <span>Weekly</span>
          <span>Monthly</span>
        </div>
      </div>
    </div>
  );
}

function SystemsVisual() {
  return (
    <svg className="mv-sys" viewBox="0 0 340 170">
      <line className="mv-line" x1="62" y1="50" x2="278" y2="50" />
      <line className="mv-line" x1="170" y1="62" x2="170" y2="128" />
      {[
        { x: 10, y: 34, w: 64, label: "API" },
        { x: 132, y: 34, w: 76, label: "Service" },
        { x: 268, y: 34, w: 64, label: "DB" },
        { x: 132, y: 124, w: 76, label: "Cache" },
      ].map((node) => (
        <g key={node.label} className="mv-node">
          <rect x={node.x} y={node.y} width={node.w} height="32" rx="8" />
          <text x={node.x + node.w / 2} y={node.y + 20} textAnchor="middle">
            {node.label}
          </text>
        </g>
      ))}
      <circle className="mv-pulse mv-pulse-x" cx="74" cy="50" r="4" />
      <circle className="mv-pulse mv-pulse-y" cx="170" cy="66" r="4" />
    </svg>
  );
}

function IntelligenceVisual() {
  return (
    <div className="mv-ai">
      <div className="mv-prompt">
        <span style={{ color: "var(--accent)" }}>›</span>
        <span className="mv-typed">Is this clause enforceable?</span>
      </div>
      <div className="mv-answer">
        <i />
        <i />
        <i />
      </div>
      <span className="mv-source">↳ Source: Contract Act, s. 23</span>
    </div>
  );
}

function DeliveryVisual() {
  const steps = ["Build", "Test", "Deploy"];
  return (
    <div className="mv-pipe">
      {steps.map((step, i) => (
        <div key={step} style={{ display: "contents" }}>
          {i > 0 ? <span className="mv-link" style={{ "--d": `${i * 0.9 - 0.6}s` } as React.CSSProperties} /> : null}
          <div className="mv-step">
            <span className="mv-step-dot" style={{ "--d": `${i * 0.9}s` } as React.CSSProperties}>
              <FiCheck aria-hidden />
            </span>
            {step}
          </div>
        </div>
      ))}
    </div>
  );
}

const visuals = {
  interfaces: InterfacesVisual,
  systems: SystemsVisual,
  intelligence: IntelligenceVisual,
  delivery: DeliveryVisual,
};

export default function Capabilities() {
  return (
    <section className="section inverted" id="capabilities" aria-labelledby="capabilities-title">
      <div className="container">
        <SectionHeader
          index="03"
          label="Capabilities"
          id="capabilities-title"
          title={
            <>
              The right tools. The bigger <span className="serif">picture</span>.
            </>
          }
          lead="Technology is a means to a better experience. Four areas I work across, end to end."
        />
        <div className="cap-grid">
          {capabilities.map((cap, i) => {
            const Visual = visuals[cap.id];
            return (
              <Reveal key={cap.id} as="article" delay={i * 0.06} className="card cap-card">
                <div className="cap-visual" aria-hidden>
                  <Visual />
                </div>
                <div className="cap-body">
                  <h3 className="h3">{cap.title}</h3>
                  <p>{cap.body}</p>
                  <div className="chips">
                    {cap.tools.map((tool) => (
                      <span key={tool} className="chip">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
