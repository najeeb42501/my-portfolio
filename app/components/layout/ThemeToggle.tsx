"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { toggleTheme, useTheme } from "../../lib/client";

export default function ThemeToggle() {
  const theme = useTheme();

  // Follow the system setting until the visitor picks a theme themselves.
  useEffect(() => {
    const query = matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem("theme");
      } catch {}
      if (stored) return;
      document.documentElement.dataset.theme = query.matches ? "dark" : "light";
      window.dispatchEvent(new Event("app:theme"));
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      className="icon-btn"
      onClick={toggleTheme}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
          transition={{ duration: 0.25 }}
          style={{ display: "grid" }}
        >
          {theme === "dark" ? <FiSun aria-hidden /> : <FiMoon aria-hidden />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
