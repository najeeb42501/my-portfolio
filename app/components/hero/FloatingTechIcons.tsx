"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  SiGit,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTypescript,
} from "react-icons/si";

const floatingIcons = [
  {
    label: "React",
    Icon: SiReact,
    className: "left-[7%] top-[18%] text-cyan-200",
    size: "text-5xl",
    delay: 0,
  },
  {
    label: "Node.js",
    Icon: SiNodedotjs,
    className: "right-[10%] top-[20%] text-emerald-200",
    size: "text-5xl",
    delay: 0.7,
  },
  {
    label: "JavaScript",
    Icon: SiJavascript,
    className: "left-[12%] bottom-[20%] text-yellow-200",
    size: "text-6xl",
    delay: 1.1,
  },
  {
    label: "Git",
    Icon: SiGit,
    className: "right-[17%] bottom-[16%] text-rose-200",
    size: "text-5xl",
    delay: 1.5,
  },
  {
    label: "TypeScript",
    Icon: SiTypescript,
    className: "left-[47%] top-[10%] text-sky-200",
    size: "text-4xl",
    delay: 0.3,
  },
  {
    label: "Next.js",
    Icon: SiNextdotjs,
    className: "right-[40%] bottom-[8%] text-zinc-200",
    size: "text-4xl",
    delay: 1.9,
  },
];

export default function FloatingTechIcons() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -52]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {floatingIcons.map(({ label, Icon, className, size, delay }) => (
        <motion.div
          key={label}
          className={`absolute ${className}`}
          style={{ y }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{
              opacity: 0.16,
              scale: 1,
              rotate: [0, 4, -4, 0],
              y: [0, -16, 10, 0],
            }}
            transition={{
              opacity: { delay, duration: 0.8 },
              scale: { delay, duration: 0.8 },
              rotate: {
                delay,
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              },
              y: {
                delay,
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <Icon
              className={`${size} blur-[0.8px] drop-shadow-[0_0_24px_currentColor]`}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
