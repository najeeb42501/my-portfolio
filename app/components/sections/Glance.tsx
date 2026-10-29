"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FiCopy } from "react-icons/fi";
import { profile } from "@/data/site";
import { copyText, scrollToId } from "../../lib/client";
import Reveal from "../ui/Reveal";

const zones = [
  { label: "Karachi", timeZone: profile.timezone },
  { label: "London", timeZone: "Europe/London" },
  { label: "New York", timeZone: "America/New_York" },
];

function partsIn(timeZone: string, date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return { h: get("hour"), m: get("minute"), s: get("second") };
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Ticks once a second, starting after mount so the server render stays stable. */
function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

function TimeCard() {
  const now = useNow();
  const [zone, setZone] = useState(0);
  const home = now ? partsIn(profile.timezone, now) : { h: 10, m: 9, s: 30 };
  const shown = now ? partsIn(zones[zone].timeZone, now) : null;
  const homeLabel = now ? `${pad(home.h)}:${pad(home.m)}` : "--:--";

  return (
    <div className="card glance-card glance-time">
      <div className="clock" role="img" aria-label={`Clock showing ${homeLabel} in Karachi`}>
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} className={`clock-tick${i % 3 === 0 ? " is-major" : ""}`} style={{ "--deg": `${i * 30}deg` } as React.CSSProperties} />
        ))}
        <span className="clock-hand clock-hour" style={{ "--deg": `${(home.h % 12) * 30 + home.m * 0.5}deg` } as React.CSSProperties} />
        <span className="clock-hand clock-minute" style={{ "--deg": `${home.m * 6 + home.s * 0.1}deg` } as React.CSSProperties} />
        <span className="clock-hand clock-second" style={{ "--deg": `${home.s * 6}deg` } as React.CSSProperties} />
        <span className="clock-pin" />
      </div>
      <div className="glance-time-copy">
        <p className="glance-label">{zone === 0 ? "My time right now" : `In ${zones[zone].label}, mine is ${homeLabel}`}</p>
        <p className="glance-time-value" suppressHydrationWarning>
          {shown ? `${pad(shown.h)}:${pad(shown.m)}` : "--:--"}
        </p>
      </div>
      <div className="mini-tabs" role="group" aria-label="Show the time in">
        {zones.map((z, i) => (
          <button key={z.label} type="button" aria-pressed={zone === i} onClick={() => setZone(i)}>
            {z.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const demos = [
  { label: "Hover", button: "Hovered", caption: "lift 3px, 180ms", state: "hover", fill: 38 },
  { label: "Press", button: "Pressed", caption: "scale 0.96, 90ms", state: "press", fill: 72 },
  { label: "Release", button: "Released", caption: "spring 260 / 22", state: "release", fill: 100 },
];

function FeelCard() {
  const [demo, setDemo] = useState(0);
  const [on, setOn] = useState(true);
  const current = demos[demo];
  return (
    <div className="card glance-card glance-feel">
      <div className="glance-feel-copy">
        <p className="glance-title">
          Interfaces <span className="serif">you can feel.</span>
        </p>
        <p className="glance-note">Timing, feedback and states tuned until they feel obvious. Try them.</p>
      </div>
      <div className="feel-stage">
        <div className="feel-row">
          <button
            type="button"
            className="feel-switch"
            aria-pressed={on}
            aria-label="Demo switch"
            onClick={() => setOn((value) => !value)}
          >
            <span />
          </button>
          <span className="feel-button" data-state={current.state}>
            {current.button}
          </span>
        </div>
        <div className="feel-slider" style={{ "--fill": `${current.fill}%` } as React.CSSProperties}>
          <span className="feel-slider-fill" />
          <span className="feel-slider-thumb" />
        </div>
        <p className="feel-caption">{current.caption}</p>
        <div className="mini-tabs" role="group" aria-label="Interaction demo">
          {demos.map((d, i) => (
            <button key={d.label} type="button" aria-pressed={demo === i} onClick={() => setDemo(i)}>
              {d.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function BuildingCard() {
  return (
    <div className="card glance-card glance-building">
      <p className="glance-label">Currently</p>
      <p className="glance-title">
        Building enterprise products at <span className="serif grad-text">Jami Partners</span>
      </p>
      <div className="glance-shots" aria-hidden>
        <div className="glance-shot glance-shot-a">
          <Image src="/payment-dashboard/payment-dashboard-1.png" alt="" fill sizes="220px" />
        </div>
        <div className="glance-shot glance-shot-b">
          <Image src="/pension-portal/pension-portal-1.png" alt="" fill sizes="220px" />
        </div>
      </div>
    </div>
  );
}

function TalkCard() {
  const jump = (event: React.MouseEvent) => {
    event.preventDefault();
    scrollToId("contact");
  };
  return (
    <div className="card glance-card glance-talk">
      <span className="status-pill">
        <span className="pulse-dot" aria-hidden /> {profile.availability}
      </span>
      <p className="glance-title">
        Let&rsquo;s build something <span className="serif muted">that ships.</span>
      </p>
      <button type="button" className="glance-email" onClick={() => copyText(profile.email, "Email copied")}>
        <span>{profile.email}</span>
        <FiCopy aria-hidden />
        <span className="sr-only">Copy email address</span>
      </button>
      <a href="#contact" onClick={jump} className="btn btn-solid btn-sm glance-cta">
        Start a conversation
      </a>
    </div>
  );
}

export default function Glance() {
  return (
    <section className="glance" aria-label="At a glance">
      <Reveal className="container glance-row">
        <TimeCard />
        <FeelCard />
        <BuildingCard />
        <TalkCard />
      </Reveal>
    </section>
  );
}
