"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiCode, FiCopy, FiGithub, FiLinkedin } from "react-icons/fi";
import { profile, socials } from "@/data/site";
import { copyText, scrollToId } from "../../lib/client";
import Magnetic from "../hero/Magnetic";

const NAME = "NAJEEB";

type OrbitTool = { name: string; mark: string; hue: string; angle: number };

const rings: { id: string; tools: OrbitTool[] }[] = [
  {
    id: "inner",
    tools: [
      { name: "React", mark: "Re", hue: "var(--hue-interfaces)", angle: 10 },
      { name: "Next.js", mark: "Nx", hue: "var(--hue-interfaces)", angle: 100 },
      { name: "Angular", mark: "Ng", hue: "var(--hue-interfaces)", angle: 190 },
      { name: "TypeScript", mark: "TS", hue: "var(--hue-interfaces)", angle: 280 },
    ],
  },
  {
    id: "outer",
    tools: [
      { name: ".NET", mark: "Nt", hue: "var(--hue-systems)", angle: 36 },
      { name: "Spring Boot", mark: "Sb", hue: "var(--hue-systems)", angle: 108 },
      { name: "LangChain", mark: "Lc", hue: "var(--hue-intelligence)", angle: 180 },
      { name: "OpenAI API", mark: "Ai", hue: "var(--hue-intelligence)", angle: 252 },
      { name: "Docker", mark: "Dk", hue: "var(--hue-delivery)", angle: 324 },
    ],
  },
];

// Deterministic pseudo-random stars, so server and client render the same sky.
const stars = Array.from({ length: 30 }, (_, i) => {
  const r1 = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
  const r2 = Math.abs(Math.sin(i * 78.233) * 12345.6789) % 1;
  return {
    left: `${(r1 * 100).toFixed(2)}%`,
    top: `${(r2 * 92).toFixed(2)}%`,
    size: i % 5 === 0 ? 3 : 2,
    duration: `${2.6 + (i % 7) * 0.6}s`,
    delay: `${(i % 9) * 0.35}s`,
  };
});

/**
 * Two tilted rings carrying tool chips. Drawn twice: the far half behind the portrait and the
 * near half in front of it, so the orbit wraps around him. Pure CSS, so both copies stay in step.
 */
function Orbits({ side }: { side: "back" | "front" }) {
  return (
    <div className={`hx-orbits hx-orbits-${side}`} aria-hidden>
      <div className="hx-orbit-origin">
        {rings.map((ring) => (
          <div key={ring.id} className={`hx-ring hx-ring-${ring.id}`}>
            {ring.tools.map((tool) => (
              <div key={tool.name} className="hx-arm" style={{ "--a": `${tool.angle}deg` } as React.CSSProperties}>
                <div className="hx-chip-pos">
                  <span className="hx-orbit-chip">
                    <span className="hx-orbit-mark" style={{ background: tool.hue }}>
                      {tool.mark}
                    </span>
                    {tool.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const github = socials.find((s) => s.label === "GitHub")!.href;
  const linkedin = socials.find((s) => s.label === "LinkedIn")!.href;

  return (
    <section className="hx" id="top" aria-labelledby="hero-title">
      <div className="hx-sky" aria-hidden>
        {stars.map((star, i) => (
          <span
            key={i}
            className="hx-star"
            style={
              {
                left: star.left,
                top: star.top,
                width: star.size,
                height: star.size,
                "--dur": star.duration,
                "--delay": star.delay,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <h1 className="hx-name" id="hero-title">
        <span className="sr-only">{profile.name}, software engineer</span>
        <span className="hx-letters" aria-hidden>
          {Array.from(NAME).map((char, i) => (
            <span key={i} className="hx-letter" style={{ "--i": i } as React.CSSProperties}>
              {char}
            </span>
          ))}
        </span>
      </h1>

      <div className="hx-aurora" aria-hidden>
        <div className="hx-aurora-spin" />
      </div>
      <div className="hx-halo" aria-hidden />

      <Orbits side="back" />

      <div className="hx-portrait portrait-image">
        <Image
          src={profile.portrait}
          alt={`${profile.name}, software engineer`}
          fill
          preload
          sizes="(max-width: 767px) 92vw, 620px"
        />
      </div>

      <Orbits side="front" />

      <div className="hx-badge hx-badge-left">
        <span className="hx-badge-icon hx-badge-icon-success" aria-hidden>
          <FiCode />
        </span>
        <span>
          <span className="hx-badge-label">Now</span>
          Building at Jami Partners
        </span>
      </div>
      <Link href="/work/paklexai" className="hx-badge hx-badge-right">
        <span className="pulse-dot" aria-hidden />
        <span>
          <span className="hx-badge-label">Live</span>
          PakLexAI
        </span>
        <FiArrowUpRight aria-hidden />
      </Link>

      <div className="hx-foot">
        <div className="container hx-foot-inner">
          <div className="hx-tagline">
            <p className="hx-kicker">I design and build software that</p>
            <p className="hx-serif">feels effortless.</p>
          </div>
          <div className="hx-actions">
            <Magnetic>
              <a
                href="#work"
                className="btn btn-solid"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToId("work");
                }}
              >
                See the work
              </a>
            </Magnetic>
            <button
              type="button"
              className="btn btn-glass"
              onClick={() => copyText(profile.email, "Email copied")}
            >
              <FiCopy aria-hidden /> Copy email
            </button>
            <a href={github} target="_blank" rel="noreferrer" className="icon-btn icon-btn-glass" aria-label="GitHub">
              <FiGithub aria-hidden />
            </a>
            <a href={linkedin} target="_blank" rel="noreferrer" className="icon-btn icon-btn-glass" aria-label="LinkedIn">
              <FiLinkedin aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
