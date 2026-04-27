"use client";

import { motion, type Variants } from "framer-motion";
import { type FormEvent, useState } from "react";
import Reveal from "../shared/Reveal";

const socialLinks = [
  { label: "GitHub", href: "https://example.com/", external: true },
  { label: "LinkedIn", href: "https://example.com/", external: true },
  { label: "Email", href: "mailto:hello@njb.dev", external: false },
];

const contactNotes = [
  "Senior frontend and full-stack product work",
  "Performance, architecture, and UX polish",
  "Design systems and maintainable delivery",
];

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: index * 0.07 },
  }),
};

export default function Contact() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setStatusMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "Something went wrong.");
      }

      setStatus("success");
      setStatusMessage(data.message ?? "Message sent successfully.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Message could not be sent right now.",
      );
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden px-5 py-24 sm:px-8">
      <div className="absolute inset-x-0 top-28 h-px bg-[linear-gradient(to_right,transparent,var(--site-accent),transparent)] opacity-20" />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <Reveal>
            <p className="font-mono text-sm uppercase tracking-[0.28em] theme-accent">
              Contact
            </p>
            <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight theme-heading sm:text-6xl">
              Let&apos;s turn a sharp idea into a serious product.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 theme-muted">
              Send the shape of the problem, the goal, and where the product
              needs momentum. I&apos;ll reply with a clear next step.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative border-l pl-6 theme-border">
              <motion.span
                className="absolute -left-[0.28rem] top-1 size-2 rounded-full bg-[var(--site-accent)] shadow-[0_0_24px_var(--site-glow)]"
                animate={{ y: [0, 122, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <p className="text-sm uppercase tracking-[0.22em] theme-subtle">
                Available for
              </p>
              <div className="mt-5 grid gap-4">
                {contactNotes.map((note, index) => (
                  <motion.p
                    key={note}
                    className="flex items-center gap-3 text-base theme-text"
                    initial={{ opacity: 0, x: 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                  >
                    <span className="size-1.5 rounded-full bg-[var(--site-accent)]" />
                    {note}
                  </motion.p>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="rounded-full border px-4 py-2 text-sm font-medium transition theme-panel theme-text hover:border-[var(--site-accent)] hover:text-[var(--site-accent)]"
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-14">
          <div className="grid overflow-hidden rounded border shadow-2xl theme-card-solid lg:grid-cols-[0.42fr_0.58fr]">
            <div className="relative border-b p-6 theme-border sm:p-8 lg:border-b-0 lg:border-r">
              <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(to_right,var(--site-accent),transparent)]" />
              <p className="font-mono text-xs uppercase tracking-[0.24em] theme-accent">
                Project signal
              </p>
              <h3 className="mt-5 text-3xl font-semibold theme-heading">
                The best first message is specific, short, and honest.
              </h3>
              <p className="mt-5 leading-8 theme-muted">
                Include what you&apos;re building, what feels blocked, and what
                kind of help would make the biggest difference.
              </p>
              <div className="mt-8 grid gap-3 text-sm theme-muted">
                <p className="rounded border p-3 theme-panel">
                  Typical response: within 24-48 hours
                </p>
                <p className="rounded border p-3 theme-panel">
                  Best fit: product engineering, modern web apps, AI workflows
                </p>
              </div>
            </div>

            <form className="grid gap-4 p-6 sm:p-8" onSubmit={handleSubmit}>
              <motion.label
                className="grid gap-2 text-sm theme-text"
                custom={0}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fieldVariants}
              >
                Name
                <input
                  name="name"
                  autoComplete="name"
                  className="rounded border px-4 py-3 outline-none transition theme-input focus:border-[var(--site-accent)]"
                  placeholder="Your name"
                  required
                />
              </motion.label>
              <motion.label
                className="grid gap-2 text-sm theme-text"
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fieldVariants}
              >
                Email
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="rounded border px-4 py-3 outline-none transition theme-input focus:border-[var(--site-accent)]"
                  placeholder="you@example.com"
                  required
                />
              </motion.label>
              <motion.label
                className="grid gap-2 text-sm theme-text"
                custom={2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fieldVariants}
              >
                Message
                <textarea
                  name="message"
                  rows={6}
                  className="resize-none rounded border px-4 py-3 outline-none transition theme-input focus:border-[var(--site-accent)]"
                  placeholder="Tell me what you are building..."
                  required
                />
              </motion.label>
              <motion.div
                custom={3}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fieldVariants}
              >
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full rounded px-6 py-3 text-sm font-semibold transition theme-accent-bg hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
              </motion.div>
              {statusMessage && (
                <p
                  className={`text-sm ${
                    status === "success" ? "theme-accent" : "text-rose-500"
                  }`}
                  role="status"
                >
                  {statusMessage}
                </p>
              )}
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
