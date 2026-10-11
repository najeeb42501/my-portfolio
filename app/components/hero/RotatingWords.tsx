"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ease } from "../ui/MotionProvider";

/** Cycles through `words`, flipping each letter out and the next word's letters in. */
export default function RotatingWords({ words, interval = 2600 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [reduced, words.length, interval]);

  const word = words[index];
  return (
    <span className="rw">
      <span className="sr-only">{words.join(", ")}</span>
      <motion.span className="rw-slot" layout transition={{ duration: 0.45, ease }} aria-hidden>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={word} className="rw-word">
            {Array.from(word).map((char, i) => (
              <motion.span
                key={i}
                className="rw-char"
                initial={{ y: "70%", rotateX: -80, opacity: 0, filter: "blur(6px)" }}
                animate={{ y: "0%", rotateX: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: "-70%", rotateX: 80, opacity: 0, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease, delay: i * 0.018 }}
              >
                {char === " " ? " " : char}
              </motion.span>
            ))}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </span>
  );
}
