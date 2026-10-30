"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { aboutLine, lockNotes, profile, workPrinciples } from "@/data/site";
import { scrollToId } from "../../lib/client";

const bars = [22, 34, 30, 46, 40, 54, 50, 64];
const words = aboutLine.split(" ");
const clamp = (value: number) => Math.min(1, Math.max(0, value));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function useKarachiClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);
  const at = now ?? new Date();
  const fmt = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-GB", { timeZone: profile.timezone, ...options }).format(at);
  return {
    date: fmt({ weekday: "long", day: "numeric", month: "long" }),
    time: fmt({ hour: "2-digit", minute: "2-digit" }),
  };
}

/**
 * Hero and About share one stage. The hero is a lock screen: scrolling lifts it away layer by layer
 * while the portrait, the one element that stays, glides down and lands in the About card.
 */
export default function Stage() {
  const stage = useRef<HTMLDivElement>(null);
  const slot = useRef<HTMLDivElement>(null);
  const target = useRef<HTMLDivElement>(null);
  const shackle = useRef<SVGPathElement>(null);
  const sentence = useRef<HTMLParagraphElement>(null);
  const [openNote, setOpenNote] = useState(-1);
  const clock = useKarachiClock();

  useEffect(() => {
    const root = stage.current;
    const portrait = slot.current;
    const landing = target.current;
    if (!root || !portrait || !landing) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const lifts = Array.from(root.querySelectorAll<HTMLElement>("[data-lift]"));
    const wordEls = Array.from(sentence.current?.children ?? []) as HTMLElement[];
    let path = { dx: 0, dy: 0, scale: 1 };
    let frame = 0;

    // Measure from the untransformed start to the landing spot in the About card.
    const measure = () => {
      portrait.style.transform = "";
      const a = portrait.getBoundingClientRect();
      const b = landing.getBoundingClientRect();
      path = { dx: b.left - a.left, dy: b.top - a.top, scale: b.width / a.width };
      update();
    };

    const update = () => {
      const y = -root.getBoundingClientRect().top;
      const still = reduce.matches;
      const ph = still ? 0 : clamp(y / 600);
      for (const el of lifts) {
        const speed = Number(el.dataset.lift);
        el.style.transform = ph ? `translate3d(0, ${-ph * speed}px, 0)` : "";
        el.style.opacity = ph ? String(Math.max(0, 1 - ph * 1.4)) : "";
      }
      shackle.current?.setAttribute("data-open", y > 12 ? "true" : "false");

      // Vertically it keeps pace with the page, so it holds its place on screen while it slides
      // sideways early (clearing the About text) and shrinks to the card's size.
      const p = still ? 0 : clamp(y / Math.max(1, path.dy));
      const e = easeOut(p);
      const scale = 1 + (path.scale - 1) * e;
      portrait.style.transform = p ? `translate3d(${path.dx * e}px, ${path.dy * p}px, 0) scale(${scale})` : "";
      root.dataset.landed = p >= 1 ? "true" : "false";

      if (wordEls.length && sentence.current) {
        const r = sentence.current.getBoundingClientRect();
        const vh = innerHeight;
        const lit = still ? wordEls.length : Math.round(clamp((vh * 0.82 - r.top) / (r.height + vh * 0.3)) * wordEls.length);
        wordEls.forEach((el, i) => el.classList.toggle("is-lit", i < lit));
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    measure();
    addEventListener("scroll", onScroll, { passive: true });
    reduce.addEventListener("change", measure);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      removeEventListener("scroll", onScroll);
      reduce.removeEventListener("change", measure);
    };
  }, []);

  return (
    <div className="stage" ref={stage}>
      <section className="lock" id="top" aria-labelledby="hero-title">
        <div className="lock-wall" aria-hidden>
          <span className="lock-blob lock-blob-a" />
          <span className="lock-blob lock-blob-b" />
          <span className="lock-blob lock-blob-c" />
        </div>

        <div className="lock-top" data-lift="40">
          <svg width="18" height="22" viewBox="0 0 18 22" fill="none" aria-hidden>
            <path ref={shackle} className="lock-shackle" d="M4.5 9.5V6.5a4.5 4.5 0 0 1 9 0v3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <rect x="1" y="9" width="16" height="12" rx="3.5" fill="currentColor" />
          </svg>
          <p className="lock-date rise" style={{ "--d": "150ms" } as React.CSSProperties}>
            <span suppressHydrationWarning>{clock.date}</span> · {profile.role}, Karachi
          </p>
        </div>

        <div className="lock-name-wrap" data-lift="70">
          <h1 className="lock-name" id="hero-title">
            <span aria-hidden>{profile.shortName}</span>
            <span className="sr-only">
              {profile.name}, {profile.role.toLowerCase()} in Karachi
            </span>
          </h1>
        </div>

        {/* The portrait: it starts here and is moved into the About card on scroll. */}
        <div className="lock-portrait" ref={slot} aria-hidden>
          <Image src={profile.portrait} alt="" fill preload sizes="(max-width: 1099px) 340px, 552px" />
        </div>

        <div className="lock-panels">
          <div className="lock-widgets" data-lift="120">
            <div className="lock-widget pop" style={{ "--d": "700ms" } as React.CSSProperties}>
              <span className="lock-ring" aria-hidden />
              <span className="lock-widget-text">
                <strong>Open to work</strong>
                <span>Full-time or freelance</span>
              </span>
            </div>
            <div className="lock-widget pop" style={{ "--d": "770ms" } as React.CSSProperties}>
              <span className="lock-widget-label">Shipping for</span>
              <span className="lock-widget-text">
                <strong className="lock-big">3+ yrs</strong>
                <span>in production</span>
              </span>
            </div>
            <div className="lock-widget lock-widget-wide pop" style={{ "--d": "840ms" } as React.CSSProperties}>
              <span className="lock-widget-text">
                <span className="lock-widget-label">Products</span>
                <strong className="lock-big">
                  8 <span>shipped, 5 live</span>
                </strong>
              </span>
              <span className="lock-bars" aria-hidden>
                {bars.map((h, i) => (
                  <span key={i} style={{ height: h }} data-on={i < 5 || undefined} />
                ))}
              </span>
            </div>
          </div>

          <ul className="lock-notes" data-lift="150" aria-label="Notifications">
            {lockNotes.map((note, i) => {
              const open = openNote === i;
              return (
                <li key={note.app} className="note-in" style={{ "--d": `${900 + i * 80}ms` } as React.CSSProperties}>
                  <div className="lock-note" data-open={open || undefined}>
                    <button
                      type="button"
                      className="lock-note-head"
                      aria-expanded={open}
                      aria-controls={`note-${i}`}
                      onClick={() => setOpenNote(open ? -1 : i)}
                    >
                      <span className={`lock-note-icon is-${note.icon === "avatar" ? "avatar" : i === 1 ? "purple" : "orange"}`} aria-hidden>
                        {note.icon === "avatar" ? <Image src="/najeeb-profile.webp" alt="" width={38} height={38} /> : note.icon}
                      </span>
                      <span className="lock-note-copy">
                        <span className="lock-note-meta">
                          <strong>{note.app}</strong>
                          <span suppressHydrationWarning>{note.when === "clock" ? clock.time : note.when}</span>
                        </span>
                        <span className="lock-note-title">{note.title}</span>
                        <span className="lock-note-body">{note.body}</span>
                      </span>
                    </button>
                    <div className="lock-note-actions" id={`note-${i}`} inert={!open}>
                      <div>
                        {note.actions.map((action, a) => {
                          const external = action.href.startsWith("http");
                          return (
                            <a
                              key={action.label}
                              href={action.href}
                              className={a === 0 ? "is-primary" : undefined}
                              target={external ? "_blank" : undefined}
                              rel={external ? "noreferrer" : undefined}
                              download={action.href.endsWith(".pdf") || undefined}
                              onClick={(event) => {
                                if (action.href.startsWith("#")) {
                                  event.preventDefault();
                                  scrollToId(action.href.slice(1));
                                }
                              }}
                            >
                              {action.label}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <a
          href="#work"
          className="lock-corner is-left"
          data-lift="40"
          aria-label="See my work"
          onClick={(event) => {
            event.preventDefault();
            scrollToId("work");
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <rect x="1" y="1" width="8" height="8" rx="2.5" />
            <rect x="11" y="1" width="8" height="8" rx="2.5" />
            <rect x="1" y="11" width="8" height="8" rx="2.5" />
            <rect x="11" y="11" width="8" height="8" rx="2.5" />
          </svg>
        </a>
        <a
          href="#contact"
          className="lock-corner is-right"
          data-lift="40"
          aria-label="Contact me"
          onClick={(event) => {
            event.preventDefault();
            scrollToId("contact");
          }}
        >
          <svg width="22" height="18" viewBox="0 0 22 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden>
            <rect x="1" y="1" width="20" height="16" rx="3" />
            <path d="M2 3l9 7 9-7" />
          </svg>
        </a>

        <button type="button" className="lock-home" data-lift="20" onClick={() => scrollToId("about")}>
          <span className="lock-home-hint">Scroll or tap to unlock</span>
          <span className="lock-home-bar" aria-hidden />
        </button>
      </section>

      <section className="about" id="about" aria-labelledby="about-title">
        <div className="about-inner">
          <div className="about-card">
            <div className="about-landing" ref={target} aria-hidden />
            <Image className="about-still" src={profile.portrait} alt="" fill sizes="420px" />
            <p className="about-chip">
              <span className="about-chip-icon" aria-hidden>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4z" />
                </svg>
              </span>
              <span>
                <span className="about-chip-label">Exploring now:</span> AI agents for operations teams
              </span>
            </p>
          </div>

          <div className="about-copy">
            <h2 className="kicker" id="about-title">
              About
            </h2>
            <p className="about-line" ref={sentence}>
              {words.map((word, i) => (
                <span key={i}>{word} </span>
              ))}
            </p>
            <p className="about-list-title">How I work</p>
            <ul className="inset-list">
              {workPrinciples.map((item) => (
                <li key={item.title}>
                  <span className={`inset-icon is-${item.tone}`} aria-hidden>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={item.icon} />
                    </svg>
                  </span>
                  <span className="inset-copy">
                    <strong>{item.title}</strong>
                    <span>{item.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
