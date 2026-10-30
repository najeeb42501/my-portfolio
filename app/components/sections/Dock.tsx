"use client";

import { useRef } from "react";
import { dock } from "@/data/site";

const ICON = 54;
const DIVIDER = 21;
const REACH = 140;

/** Teams and tools as a macOS dock. Icons swell toward the pointer; touch screens get a still dock. */
export default function Dock() {
  const bar = useRef<HTMLUListElement>(null);
  const frame = useRef(0);

  const setScales = (x: number | null) => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const items = bar.current?.children;
      if (!items) return;
      for (const item of Array.from(items) as HTMLElement[]) {
        let scale = 1;
        if (x !== null) {
          const center = item.offsetLeft + ICON / 2;
          const dx = Math.abs(x - center);
          scale = 1 + 0.55 * (dx < REACH ? (1 + Math.cos((Math.PI * dx) / REACH)) / 2 : 0);
        }
        item.style.setProperty("--scale", scale.toFixed(3));
      }
    });
  };

  return (
    <section className="dock-section" aria-labelledby="dock-title">
      <p className="dock-title" id="dock-title">
        Teams and tools I ship with
      </p>
      <div className="dock-scroll">
        <ul
          className="dock"
          ref={bar}
          onPointerMove={(event) => {
            if (event.pointerType !== "mouse") return;
            setScales(event.clientX - event.currentTarget.getBoundingClientRect().left);
          }}
          onPointerLeave={() => setScales(null)}
        >
          {dock.map((item) => (
            <li
              key={item.name}
              className={item.divider ? "has-divider" : undefined}
              style={{ marginLeft: item.divider ? DIVIDER : undefined }}
              data-running={item.running || undefined}
            >
              <span className="dock-tip" aria-hidden>
                {item.name}
              </span>
              <span className="dock-icon" role="img" aria-label={item.name} style={{ background: item.bg, color: item.fg, fontSize: item.size }}>
                {item.glyph}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
