"use client";

import { useEffect, useRef, useState } from "react";
import { expertise } from "@/data/site";

/** A seeded spiral of dust, identical on the server and in the browser. */
function galaxyDust() {
  let seed = 42;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  const palette = ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#D6B4FF", "#9AD7FF", "#FFC98B"];
  return Array.from({ length: 420 }, (_, i) => {
    const t = Math.pow(rand(), 0.8);
    const radius = 30 + t * 460 + (rand() - 0.5) * 50;
    const angle = (i % 3) * ((Math.PI * 2) / 3) + t * Math.PI * 3.6 + (rand() - 0.5) * 0.55;
    return {
      x: (500 + Math.cos(angle) * radius).toFixed(1),
      y: (500 + Math.sin(angle) * radius).toFixed(1),
      r: (0.6 + rand() * 1.9).toFixed(2),
      o: (0.25 + rand() * 0.65 * (1 - t * 0.5)).toFixed(2),
      c: palette[Math.floor(rand() * palette.length)],
    };
  });
}
const dust = galaxyDust();

export default function Expertise() {
  const [active, setActive] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);
  const star = expertise[active];

  // On narrow screens the field scrolls sideways; start on the core, where the main stars are.
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }, []);

  return (
    <section className="section expertise" id="expertise" aria-labelledby="expertise-title">
      <div className="container">
        <header className="section-head">
          <p className="kicker">Expertise</p>
          <h2 className="title" id="expertise-title">
            What I&rsquo;m known for.
          </h2>
          <p className="section-sub">
            The bright stars are where I spend most of my time. Hover or tap any of them to see what it means in practice.
          </p>
        </header>

        <div className="galaxy">
          <div className="galaxy-scroll" ref={scroller}>
            <div className="galaxy-field">
              <div className="galaxy-disc" aria-hidden>
                <svg className="galaxy-spin" viewBox="0 0 1000 1000">
                  {dust.map((d, i) => (
                    <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={d.c} opacity={d.o} />
                  ))}
                </svg>
              </div>
              <div className="galaxy-core" aria-hidden />
              <ul className="galaxy-stars" aria-label="Strengths">
                {expertise.map((item, i) => (
                  <li key={item.name} style={{ left: `${item.x}%`, top: `${item.y}%` }}>
                    <button
                      type="button"
                      className={`star${item.major ? " is-major" : ""}`}
                      aria-pressed={i === active}
                      style={{ "--hue": item.hue } as React.CSSProperties}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                    >
                      <span className="star-dot" aria-hidden />
                      <span className="star-name">{item.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="galaxy-panel" aria-live="polite" style={{ "--hue": star.hue } as React.CSSProperties}>
            <p className="galaxy-kind">
              <span aria-hidden />
              {star.kind}
            </p>
            <p className="galaxy-name">{star.name}</p>
            <p className="galaxy-body">{star.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
