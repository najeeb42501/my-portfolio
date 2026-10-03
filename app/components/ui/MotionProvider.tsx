"use client";

import { MotionConfig } from "framer-motion";
import { useEffect } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;

/** Card spotlight: one delegated listener feeds --mx/--my to the hovered `.card`. */
function useCardSpotlight() {
  useEffect(() => {
    if (!matchMedia("(hover: hover)").matches) return;
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      const card = (event.target as Element | null)?.closest<HTMLElement>(".card");
      if (!card) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        card.style.setProperty("--my", `${event.clientY - rect.top}px`);
      });
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);
}

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  useCardSpotlight();
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.6, ease }}>
      {children}
    </MotionConfig>
  );
}
