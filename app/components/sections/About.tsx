"use client";

import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { bio, principles, profile } from "@/data/site";
import { scrollToId } from "../../lib/client";
import Reveal from "../ui/Reveal";

export default function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container about-grid">
        <Reveal className="about-copy">
          <p className="kicker">About</p>
          <h2 className="title-lg" id="about-title">
            Turning complicated systems into <span className="serif grad-text">calm software.</span>
          </h2>
          <div className="about-bio">
            {bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="about-actions">
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

        <Reveal className="about-photos" delay={0.08}>
          <div className="about-photo about-photo-left" aria-hidden>
            <Image src="/lawbot/lawbot-1.webp" alt="" fill sizes="240px" />
          </div>
          <div className="about-photo about-photo-right" aria-hidden>
            <Image src="/ubl-portal/ubl-portal-2.png" alt="" fill sizes="240px" />
          </div>
          <figure className="about-photo about-photo-main">
            <Image src="/najeeb.png" alt={`Portrait of ${profile.name}`} fill sizes="(max-width: 767px) 60vw, 320px" />
            <figcaption>
              <span className="pulse-dot" aria-hidden /> {profile.location}
            </figcaption>
          </figure>
        </Reveal>
      </div>

      <ul className="container principles" role="list">
        {principles.map((item, i) => (
          <Reveal as="li" key={item.title} delay={i * 0.06} className="card principle">
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
