"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
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
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const canPersistTheme = useRef(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = window.localStorage.getItem("theme");
      const nextTheme =
        saved === "light" || saved === "dark"
          ? saved
          : window.matchMedia("(prefers-color-scheme: light)").matches
            ? "light"
            : "dark";

      setTheme(nextTheme);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    if (canPersistTheme.current) {
      window.localStorage.setItem("theme", theme);
      return;
    }

    canPersistTheme.current = true;
  }, [theme]);

  function toggleTheme() {
    setTheme((current) => {
      return current === "dark" ? "light" : "dark";
    });
  }

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
    <div className="min-h-screen overflow-x-clip theme-page">
      <Header
        activeSection={activeSection}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <footer className="border-t px-5 py-8 text-center text-sm theme-border theme-subtle sm:px-8">
        <p>NJB. Built with Next.js, Tailwind CSS, and Framer Motion.</p>
      </footer>
    </div>
  );
}
