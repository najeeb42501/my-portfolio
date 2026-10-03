"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { impact } from "@/data/site";
import { ease } from "../ui/MotionProvider";

function Ticker({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, value, {
      duration: 1.2,
      ease,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduced, value]);

  return (
    <span ref={ref} aria-hidden>
      {reduced ? value : display}
      {suffix}
    </span>
  );
}

export default function Impact() {
  return (
    <section className="impact" id="impact" aria-label="Impact in numbers">
      <div className="container">
        <dl className="impact-grid">
          {impact.map((stat) => (
            <div key={stat.label} className="stat">
              <dt className="stat-label">
                {stat.label}
              </dt>
              <dd className="stat-value" style={{ margin: 0 }}>
                <Ticker value={stat.value} suffix={stat.suffix} />
                <span className="sr-only">
                  {stat.value}
                  {stat.suffix}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
