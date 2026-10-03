"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { FiArrowRight, FiCode, FiLayers, FiZap } from "react-icons/fi";
import { bio, principles, process, profile } from "@/data/site";
import { scrollToId } from "../../lib/client";
import { ease } from "../ui/MotionProvider";
import Reveal from "../ui/Reveal";

const icons = [FiLayers, FiCode, FiZap];

export default function About() {
  const reduced = useReducedMotion();
  return (
    <section className="section" id="about" aria-labelledby="about-title" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="container">
        <div className="about-grid">
          <Reveal>
            <figure className="portrait" style={{ margin: 0 }}>
              <Image
                src={profile.portrait}
                alt={`Portrait of ${profile.name}`}
                fill
                sizes="(max-width: 900px) 420px, 460px"
              />
              <figcaption className="portrait-caption">
                <span className="pulse-dot" aria-hidden /> {profile.location}
              </figcaption>
            </figure>
          </Reveal>
          <Reveal className="about-copy" delay={0.08}>
            <p className="eyebrow">05 — About</p>
            <h2 className="h2" id="about-title">
              I care about how it works. <span className="serif serif-accent">And how it feels.</span>
            </h2>
            <div className="bio">
              {bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="actions">
              <a
                href="#contact"
                className="btn btn-solid"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToId("contact");
                }}
              >
                Work with me <FiArrowRight aria-hidden />
              </a>
              <a href={profile.resume} download className="btn btn-ghost">
                Résumé (PDF)
              </a>
            </div>
          </Reveal>
        </div>

        <ul className="principles" style={{ listStyle: "none", padding: 0 }}>
          {principles.map((item, i) => {
            const Icon = icons[i];
            return (
              <Reveal as="li" key={item.title} delay={i * 0.06} className="card principle">
                <span className="principle-icon" aria-hidden>
                  <Icon />
                </span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            );
          })}
        </ul>

        <div className="process-wrap">
          <h3 className="sr-only">How I work</h3>
          <span className="process-line" aria-hidden>
            <motion.i
              initial={{ scaleX: reduced ? 1 : 0, scaleY: reduced ? 1 : 0 }}
              whileInView={{ scaleX: 1, scaleY: 1 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 1.2, ease }}
            />
          </span>
          <ol className="process">
            {process.map((step, i) => (
              <Reveal as="li" key={step.title} delay={0.2 + i * 0.12} className="process-step">
                <span className="mono" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4>{step.title}</h4>
                <p>{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
