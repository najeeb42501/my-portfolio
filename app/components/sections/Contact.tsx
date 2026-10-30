"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";
import { FiArrowUp } from "react-icons/fi";
import { profile } from "@/data/site";
import { copyText } from "../../lib/client";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Chip label, and the project type the contact API expects for it. */
const topics = [
  ["A product", "New product"],
  ["A dashboard", "Dashboard"],
  ["AI features", "AI feature"],
  ["Something else", "Something else"],
] as const;

type Status = "idle" | "sending" | "sent" | "error";

/** Contact as an iMessage thread: two opening bubbles, then the visitor's message is sent for real. */
export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [topic, setTopic] = useState<number | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [sentText, setSentText] = useState("");
  const [error, setError] = useState("");
  const [replied, setReplied] = useState(false);
  const [tried, setTried] = useState(false);

  // After a successful send, show a typing indicator, then a short reply.
  useEffect(() => {
    if (status !== "sent") return;
    const id = window.setTimeout(() => setReplied(true), 1600);
    return () => window.clearTimeout(id);
  }, [status]);

  const problem = !name.trim()
    ? "Add your name so I know who's writing."
    : !EMAIL.test(email.trim())
      ? "Add your email so I can reply."
      : message.trim().length < 10
        ? "Write a sentence or two, then send."
        : "";
  const ready = !problem;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTried(true);
    if (!ready || status === "sending") return;
    const data = new FormData(event.currentTarget);
    setSentText(message.trim());
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          projectType: topic === null ? undefined : topics[topic][1],
          website: String(data.get("website") ?? ""),
        }),
      });
      const body = (await response.json().catch(() => ({}))) as { message?: string };
      if (!response.ok) throw new Error(body.message || "Your message couldn't be sent.");
      setStatus("sent");
      setReplied(false);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const reset = () => {
    setStatus("idle");
    setMessage("");
    setTopic(null);
    setTried(false);
    setReplied(false);
  };

  const showThread = status !== "idle";

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container-chat">
        <header className="contact-head">
          <h2 className="title-xl" id="contact-title">
            Let&rsquo;s talk.
          </h2>
          <p className="section-sub">Tell me what you&rsquo;re building. I reply to every message.</p>
        </header>

        <div className="chat">
          <div className="chat-top">
            <span className="chat-avatar">
              <Image src="/najeeb-profile.webp" alt="" width={46} height={46} />
            </span>
            <strong>{profile.name}</strong>
            <span>Usually replies within 24 hours</span>
          </div>

          <div className="chat-thread" aria-live="polite">
            <p className="bubble is-in">Hey, I&rsquo;m {profile.shortName}.</p>
            <p className="bubble is-in" style={{ "--d": "120ms" } as React.CSSProperties}>
              What are you building? A product, a dashboard, an AI feature, or something else?
            </p>
            {showThread ? (
              <>
                <p className="bubble is-out">{sentText}</p>
                <p className="bubble-meta" data-error={status === "error" || undefined}>
                  {status === "sending" ? "Sending…" : status === "error" ? `Not delivered. ${error}` : "Delivered"}
                </p>
                {status === "sent" && !replied ? (
                  <p className="bubble is-in is-typing" aria-label="Typing">
                    <span />
                    <span />
                    <span />
                  </p>
                ) : null}
                {status === "sent" && replied ? (
                  <p className="bubble is-in">Got it, thank you. I&rsquo;ll reply to {email.trim()} within a day.</p>
                ) : null}
              </>
            ) : null}
          </div>

          {status === "sent" ? (
            <div className="chat-done">
              <button type="button" className="soft-btn" onClick={reset}>
                New message
              </button>
            </div>
          ) : (
            <form className="chat-form" onSubmit={submit} noValidate aria-label="Send me a message">
              <div className="chat-fields">
                <label>
                  <span>Name</span>
                  <input name="name" autoComplete="name" maxLength={100} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                  <span>Email</span>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>
              <div className="chat-topics" role="group" aria-label="What are you building?">
                {topics.map(([label], i) => (
                  <button key={label} type="button" aria-pressed={topic === i} onClick={() => setTopic(topic === i ? null : i)}>
                    {label}
                  </button>
                ))}
              </div>
              <div className="chat-compose">
                <textarea
                  name="message"
                  rows={2}
                  maxLength={5000}
                  placeholder="Write your message"
                  aria-label="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) e.currentTarget.form?.requestSubmit();
                  }}
                />
                <button type="submit" className="chat-send" aria-label="Send message" data-ready={ready || undefined} disabled={status === "sending"}>
                  <FiArrowUp aria-hidden />
                </button>
              </div>
              <div className="honeypot" aria-hidden="true">
                <label>
                  Website
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              <p className="chat-hint" data-warn={(tried && !ready) || undefined}>
                {ready ? "Ready to send. ⌘ or Ctrl + Enter works too." : problem}
              </p>
            </form>
          )}
        </div>

        <p className="contact-alt">
          <span>Prefer email?</span>
          <button type="button" className="soft-btn" onClick={() => copyText(profile.email, "Email copied")}>
            {profile.email}
            <span>Copy</span>
          </button>
        </p>
      </div>
    </section>
  );
}
