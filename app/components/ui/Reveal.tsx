"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { ease } from "./MotionProvider";

type Props = HTMLMotionProps<"div"> & {
  delay?: number;
  as?: "div" | "li" | "article" | "section";
};

/**
 * Fade, rise and sharpen into place once, when scrolled into view.
 * Reduced motion keeps only the fade. Above-the-fold content uses the CSS `.enter` class instead,
 * so it doesn't wait for hydration.
 */
export default function Reveal({ delay = 0, as = "div", children, ...rest }: Props) {
  const reduced = useReducedMotion();
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14, filter: "blur(6px)" }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, ease, delay }}
      {...rest}
    >
      {children}
    </Component>
  );
}
