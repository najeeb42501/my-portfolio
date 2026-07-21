"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { FiDownload, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
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
const MyProcess = dynamic(() => import("./sections/MyProcess"), {
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

const footerLinks = [
  {
    label: "GitHub",
    href: "https://example.com/",
    icon: FiGithub,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://example.com/",
    icon: FiLinkedin,
    external: true,
  },
  { label: "Email", href: "mailto:najeeb08089@gmail.com", icon: FiMail },
  {
    label: "CV",
    href: "/Najeeb-Ullah-Khan-CV.pdf",
    icon: FiDownload,
    download: true,
  },
];

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
    let animationFrame = 0;

    const updateActiveSection = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        const sections = sectionIds
          .map((id) => document.getElementById(id))
          .filter((section): section is HTMLElement => section !== null)
          .sort((a, b) => a.offsetTop - b.offsetTop);

        const activationLine = window.innerHeight * 0.32;
        let currentSection = "";

        for (const section of sections) {
          if (section.getBoundingClientRect().top <= activationLine) {
            currentSection = section.id;
          } else {
            break;
          }
        }

        const reachedPageEnd =
          window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 2;

        if (reachedPageEnd && sections.length > 0) {
          currentSection = sections[sections.length - 1].id;
        }

        setActiveSection((current) =>
          current === currentSection ? current : currentSection,
        );
      });
    };

    const contentObserver = new MutationObserver(updateActiveSection);
    const main = document.querySelector("main");

    if (main) {
      contentObserver.observe(main, { childList: true, subtree: true });
    }

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      contentObserver.disconnect();
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
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
        <Skills />
        <MyProcess />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <footer className="theme-footer-bg relative overflow-hidden px-5 py-8 sm:px-8">
        <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-white/14 blur-3xl" />
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-white/72">
              Portfolio
            </p>
            <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
              Najeeb Ullah Khan
            </h2>
            <p className="mt-1 text-sm font-medium text-white/72">
              Software Engineer building clean, fast product interfaces.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {footerLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="group inline-flex size-12 items-center justify-center rounded-xl border border-white/18 bg-white/12 text-xl text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/20"
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  download={item.download ? true : undefined}
                  title={item.label}
                >
                  <Icon
                    aria-hidden
                    className="transition group-hover:scale-110"
                  />
                </a>
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
}
