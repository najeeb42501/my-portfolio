"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=/<>";

/**
 * Renders `text`, then decodes it from random glyphs once after `delay` ms and again on hover.
 * Server output is the final text, so there's no hydration mismatch and nothing for screen readers to stumble on.
 */
export default function TextScramble({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const [output, setOutput] = useState(text);
  const frame = useRef(0);

  const run = useCallback(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cancelAnimationFrame(frame.current);
    const start = performance.now();
    const duration = 900;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const settled = Math.floor(progress * text.length);
      setOutput(
        Array.from(text, (char, i) =>
          i < settled || char === " " ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        ).join(""),
      );
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  }, [text]);

  useEffect(() => {
    const id = window.setTimeout(run, delay);
    return () => {
      window.clearTimeout(id);
      cancelAnimationFrame(frame.current);
    };
  }, [run, delay]);

  return (
    <span className={className} onPointerEnter={run}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{output}</span>
    </span>
  );
}
