"use client";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import {
  FiArrowDown,
  FiArrowUpRight,
  FiCode,
  FiGithub,
  FiLinkedin,
} from "react-icons/fi";
import portrait from "../../../public/najeeb-new.png";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-12, 24]);
  return (
    <section id="hero" ref={ref} className="hero-section">
      <div className="page-container hero-intro">
        <p className="eyebrow">
          <span className="status-dot" /> Available for meaningful work
        </p>
        <h1>
          Thoughtful code.
          <br />
          <span className="serif-word">Remarkable</span> experiences.
        </h1>
        <p className="hero-subtitle">
          I’m Najeeb Ullah Khan. A software engineer connecting
          <br className="hidden sm:block" /> considered design with dependable
          technology.
        </p>
      </div>
      <div className="page-container hero-stage">
        <div className="hero-side hero-side-left">
          <span className="tiny-label">THE APPROACH</span>
          <p>
            Complex under the hood.
            <br />
            <strong>Effortless in your hands.</strong>
          </p>
          <a href="#projects" className="text-link">
            Explore my work <FiArrowDown aria-hidden />
          </a>
          <div className="hero-socials">
            <a
              href="https://github.com/najeeb42501"
              aria-label="Najeeb on GitHub"
              target="_blank"
              rel="noreferrer"
            >
              <FiGithub aria-hidden />
            </a>
            <a
              href="https://www.linkedin.com/in/najeebullah-khan-86b759170/"
              aria-label="Najeeb on LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <FiLinkedin aria-hidden />
            </a>
            <span className="tiny-label">LET’S CONNECT</span>
          </div>
        </div>
        <div className="portrait-scene">
          <div className="portrait-halo" aria-hidden />
          <div className="portrait-orbit" aria-hidden />
          <span className="portrait-cross cross-one" aria-hidden>
            +
          </span>
          <span className="portrait-cross cross-two" aria-hidden>
            +
          </span>
          <motion.div
            className="portrait-image"
            style={{ y: reducedMotion ? 0 : y }}
          >
            <Image
              src={portrait}
              alt="Najeeb Ullah Khan, software engineer"
              fill
              preload
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 62vw, 560px"
              className="object-cover object-top"
            />
          </motion.div>
          <motion.div
            aria-hidden
            className="hero-code-object"
            style={{ rotate: reducedMotion ? -12 : rotate }}
          >
            <FiCode />
          </motion.div>
          <div className="portrait-caption">
            <span className="status-dot" />
            <span>ENGINEER BY CRAFT. BUILDER AT HEART.</span>
          </div>
        </div>
        <div className="hero-side hero-side-right">
          <svg
            className="hero-asterisk"
            viewBox="0 0 80 80"
            fill="none"
            aria-hidden
          >
            <path
              d="M40 0v80M0 40h80M12 12l56 56M12 68l56-56"
              stroke="currentColor"
              strokeWidth="10"
            />
          </svg>
          <p>
            From the first idea
            <br />
            to the final interaction.
          </p>
          <a
            href="#contact"
            className="round-cta"
            aria-label="Let’s discuss your project"
          >
            <FiArrowUpRight aria-hidden />
          </a>
          <span className="tiny-label">LET’S BUILD SOMETHING GOOD</span>
        </div>
      </div>
      <div className="hero-bottom page-container">
        <span>FRONTEND PRECISION. FULL-STACK THINKING.</span>
        <div>
          <span>React & Next.js</span>
          <span>Enterprise platforms</span>
          <span>AI experiences</span>
        </div>
        <a href="#projects" aria-label="Scroll to selected projects">
          <FiArrowDown aria-hidden />
        </a>
      </div>
    </section>
  );
}
