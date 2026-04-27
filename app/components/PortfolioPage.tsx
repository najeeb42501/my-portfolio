"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Header from "./Header";
import { sectionIds } from "./data/portfolio";
import SectionLoader from "./shared/SectionLoader";

const sectionLoading = () => <SectionLoader />;

const Hero = dynamic(() => import("./sections/Hero"), {
  loading: sectionLoading,
});
const About = dynamic(() => import("./sections/About"), {
  loading: sectionLoading,
});
const Projects = dynamic(() => import("./sections/Projects"), {
  loading: sectionLoading,
});
const Experience = dynamic(() => import("./sections/Experience"), {
  loading: sectionLoading,
});
const Skills = dynamic(() => import("./sections/Skills"), {
  loading: sectionLoading,
});
const Contact = dynamic(() => import("./sections/Contact"), {
  loading: sectionLoading,
});

export default function PortfolioPage() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.1, 0.35, 0.6] },
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-[#0a0a0a] text-zinc-100">
      <Header activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-zinc-500 sm:px-8">
        <p>NJB. Built with Next.js, Tailwind CSS, and Framer Motion.</p>
      </footer>
    </div>
  );
}
