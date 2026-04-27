"use client";

import { motion } from "framer-motion";
import { skills } from "../data/portfolio";
import Reveal from "../shared/Reveal";
import SectionHeading from "../shared/SectionHeading";

export default function Skills() {
  return (
    <section id="skills" className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Skills"
          title="Tools chosen for clarity, speed, and longevity."
          copy="A practical stack for building interfaces that are pleasant to use and easy to evolve."
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {skills.map((skill, index) => (
            <Reveal key={skill} delay={index * 0.025}>
              <motion.div
                className="rounded border border-white/10 bg-white/[0.03] px-4 py-4 text-center text-sm font-medium text-zinc-200"
                whileHover={{ y: -5, borderColor: "rgba(34,211,238,0.55)" }}
                transition={{ type: "spring", stiffness: 320, damping: 20 }}
              >
                {skill}
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
