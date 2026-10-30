"use client";

import { useState } from "react";
import { experience } from "@/data/experience";

const marks = [
  "linear-gradient(160deg, #5E5CE6, #3634A3)",
  "linear-gradient(160deg, #BF5AF2, #7A2BB5)",
  "linear-gradient(160deg, #3A3A3C, #0B0B0C)",
  "linear-gradient(160deg, #1DBF73, #0E8A50)",
];

/** Roles as an inset grouped list. Each row opens to show the summary, highlights and stack. */
export default function Experience() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section experience" id="experience" aria-labelledby="experience-title">
      <div className="container-narrow">
        <p className="kicker">Experience</p>
        <h2 className="title" id="experience-title">
          Where I&rsquo;ve worked.
        </h2>
        <div className="xp-list">
          {experience.map((role, i) => {
            const expanded = open === i;
            return (
              <article key={`${role.company}-${role.start}`} className="xp-row" data-open={expanded || undefined}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`xp-${i}`}
                    onClick={() => setOpen(expanded ? -1 : i)}
                  >
                    <span className="xp-mark" style={{ background: marks[i % marks.length] }} aria-hidden>
                      {role.mark}
                    </span>
                    <span className="xp-titles">
                      <span className="xp-role">
                        {role.role}
                        {role.end === "Present" ? <span className="xp-now">Now</span> : null}
                      </span>
                      <span className="xp-company">{role.company.replace(" · ", ", ")}</span>
                    </span>
                    <span className="xp-dates">
                      {role.start} – {role.end}
                    </span>
                    <span className="xp-chev" aria-hidden>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 6l6 6-6 6" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div className="xp-body" id={`xp-${i}`} inert={!expanded}>
                  <div>
                    <p>{role.summary}</p>
                    <ul className="xp-highlights">
                      {role.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                    <ul className="xp-tech" aria-label="Stack">
                      {role.tech.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
