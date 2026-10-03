"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    const motionQuery = matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | undefined;

    const start = () => {
      if (motionQuery.matches || lenis) return;
      lenis = new Lenis({
        autoRaf: true,
        lerp: 0.12,
        anchors: true,
      });
      window.__lenis = lenis;
    };
    const stop = () => {
      lenis?.destroy();
      lenis = undefined;
      delete window.__lenis;
    };
    const onChange = () => (motionQuery.matches ? stop() : start());

    start();
    motionQuery.addEventListener("change", onChange);
    return () => {
      motionQuery.removeEventListener("change", onChange);
      stop();
    };
  }, []);

  return null;
}
