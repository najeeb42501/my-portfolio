"use client";
import { useEffect, useRef } from "react";
// Server content stays visible, including with JavaScript disabled.
export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || preference.matches || !window.IntersectionObserver) return;
    let animation: Animation | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (!preference.matches && entry.boundingClientRect.top > 0) {
          animation = element.animate(
            [{ transform: "translateY(22px)" }, { transform: "translateY(0)" }],
            {
              duration: 650,
              delay: delay * 1000,
              easing: "cubic-bezier(.22,1,.36,1)",
            },
          );
        }
        observer.disconnect();
      },
      { threshold: 0.08 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      animation?.cancel();
    };
  }, [delay]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
