"use client";

import { motion, type Variants } from "framer-motion";
import { type FormEvent, useState } from "react";
import {
  FiCheckCircle,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMessageSquare,
  FiSend,
} from "react-icons/fi";
import Reveal from "../shared/Reveal";
import SectionHeading from "../shared/SectionHeading";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/najeeb42501",
    external: true,
    icon: FiGithub,
    iconClass: "text-[#24292f]",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/najeebullah-khan-86b759170/",
    external: true,
    icon: FiLinkedin,
    iconClass: "text-[#0a66c2]",
  },
  {
    label: "Email",
    href: "mailto:najeeb08089@gmail.com",
    external: false,
    icon: FiMail,
    iconClass: "text-[var(--theme-card-pink-solid)]",
  },
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
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setStatus("error");
      setStatusMessage("Please fill in your name, email, and message.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
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
    <section
      id="contact"
      className="section-band relative mb-10 overflow-hidden px-5 py-12 sm:mb-14 sm:px-8 lg:mb-20"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's turn a sharp idea into a serious product."
          copy="Send the shape of the problem, the goal, and where the product needs momentum. I'll reply with a clear next step."
        />

        <Reveal>
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            <aside className="theme-primary-bg relative flex min-h-[30rem] flex-col justify-between overflow-hidden rounded-[1.5rem] border border-white/18 p-5 text-white sm:p-6 lg:rounded-r-none">
              <div className="absolute -right-16 -top-16 size-56 rounded-full bg-white/18 blur-3xl" />
              <div className="absolute -bottom-24 left-1/4 size-72 rounded-full bg-black/10 blur-3xl" />

              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-2xl bg-white text-[var(--theme-primary)] shadow-lg">
                    <FiMessageSquare aria-hidden className="text-xl" />
                  </span>
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-white/82">
                    project signal
                  </p>
                </div>

                <h3 className="mt-6 max-w-xl text-balance text-2xl font-black leading-tight text-white sm:text-3xl">
                  The best first message is specific, short, and honest.
                </h3>
                <p className="mt-4 max-w-lg text-sm leading-7 text-white/82 sm:text-base">
                  Include what you&apos;re building, what feels blocked, and
                  what kind of help would make the biggest difference.
                </p>

                <div className="mt-6 grid gap-2.5">
                  {contactNotes.map((note, index) => (
                    <motion.div
                      key={note}
                      className="flex items-center gap-3 rounded-xl border border-white/18 bg-white/12 px-4 py-2.5 backdrop-blur"
                      initial={{ opacity: 0, x: 18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: index * 0.08 }}
                    >
                      <FiCheckCircle
                        aria-hidden
                        className="shrink-0 text-lg text-white"
                      />
                      <span className="text-sm font-medium leading-6 text-white/86">
                        {note}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative z-10 mt-6 flex items-center gap-3">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      aria-label={item.label}
                      className="grid size-11 place-items-center rounded-full bg-white shadow-[0_14px_34px_rgba(15,23,42,0.14)] ring-1 ring-white/28 transition hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(15,23,42,0.2)] focus:outline-none focus:ring-2 focus:ring-white"
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noreferrer" : undefined}
                    >
                      <Icon
                        aria-hidden
                        className={`${item.iconClass} text-lg transition`}
                      />
                    </a>
                  );
                })}
              </div>
            </aside>

            <form
              className="relative grid content-start gap-4 overflow-hidden rounded-[1.5rem] border border-transparent bg-[color-mix(in_srgb,var(--site-surface)_86%,var(--site-panel)_78%)] p-5 shadow-[0_24px_80px_color-mix(in_srgb,var(--site-shadow)_74%,transparent)] backdrop-blur-[18px] sm:p-6 lg:rounded-l-none"
              onSubmit={handleSubmit}
            >
              <div className="mb-1 flex items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] theme-accent">
                    Message
                  </p>
                  <h3 className="mt-1.5 text-xl font-black theme-heading sm:text-2xl">
                    Tell me what you&apos;re building
                  </h3>
                </div>
              </div>

              <motion.label
                className="grid gap-2 text-sm font-semibold theme-text"
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
                  className="rounded-xl border px-4 py-2.5 outline-none transition theme-input focus:border-[var(--site-accent)] focus:shadow-[0_0_0_4px_var(--site-accent-soft)]"
                  placeholder="Your name"
                  required
                />
              </motion.label>
              <motion.label
                className="grid gap-2 text-sm font-semibold theme-text"
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
                  className="rounded-xl border px-4 py-2.5 outline-none transition theme-input focus:border-[var(--site-accent)] focus:shadow-[0_0_0_4px_var(--site-accent-soft)]"
                  placeholder="you@example.com"
                  required
                />
              </motion.label>
              <motion.label
                className="grid gap-2 text-sm font-semibold theme-text"
                custom={2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fieldVariants}
              >
                Message
                <textarea
                  name="message"
                  rows={5}
                  className="resize-none rounded-xl border px-4 py-3 outline-none transition theme-input focus:border-[var(--site-accent)] focus:shadow-[0_0_0_4px_var(--site-accent-soft)]"
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
                  className="minimal-button theme-primary-bg inline-flex w-full items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                  aria-busy={status === "sending"}
                >
                  <FiSend aria-hidden />
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
              </motion.div>
              {statusMessage && (
                <p
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
                    status === "success"
                      ? "theme-chip-emerald"
                      : "theme-chip-pink"
                  }`}
                  role={status === "error" ? "alert" : "status"}
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
