"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import { navItems, profile, socials } from "@/data/site";
import { scrollToId } from "../../lib/client";

function useLocalTime(timeZone: string) {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
    });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, [timeZone]);
  return time;
}

export default function Footer() {
  const isHome = usePathname() === "/";
  const time = useLocalTime(profile.timezone);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Link href="/" className="logo" aria-label="Home">
              nk<span>.</span>
            </Link>
            <p>{profile.tagline}</p>
          </div>
          <div className="footer-col">
            <h2>Navigate</h2>
            <ul>
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={isHome ? `#${item.id}` : `/#${item.id}`}
                    onClick={(event) => {
                      if (isHome) {
                        event.preventDefault();
                        scrollToId(item.id);
                      }
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h2>Elsewhere</h2>
            <ul>
              {socials.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noreferrer">
                    {social.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={profile.resume} download>
                  Résumé (PDF)
                </a>
              </li>
              <li>
                <a href={`mailto:${profile.email}`}>Email</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>
            Karachi{" "}
            <time suppressHydrationWarning>{time ?? "--:--"}</time> · {profile.timezoneLabel}
          </span>
          <button
            type="button"
            onClick={() => {
              if (!scrollToId("top")) window.scrollTo({ top: 0 });
            }}
          >
            Back to top <FiArrowUp aria-hidden style={{ display: "inline", verticalAlign: "-2px" }} />
          </button>
        </div>
      </div>
      <div className="footer-wordmark" aria-hidden>
        nk.
      </div>
    </footer>
  );
}
