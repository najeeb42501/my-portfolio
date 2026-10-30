"use client";

import Link from "next/link";
import { caseStudies } from "@/data/projects";
import { profile, socials } from "@/data/site";
import { scrollToId } from "../../lib/client";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <nav className="footer-studies" aria-label="Case studies">
          {caseStudies.map((study) => (
            <Link key={study.slug} href={`/work/${study.slug}`}>
              {study.title}
            </Link>
          ))}
        </nav>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {profile.name}. Designed and built in Karachi.
          </span>
          <span className="footer-links">
            {socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            ))}
            <a href={profile.resume} download>
              Résumé
            </a>
            <button
              type="button"
              onClick={() => {
                if (!scrollToId("top")) window.scrollTo({ top: 0 });
              }}
            >
              Back to top
            </button>
          </span>
        </div>
      </div>
    </footer>
  );
}
