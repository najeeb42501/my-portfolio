"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { FiArrowRight, FiClock, FiCopy, FiMapPin } from "react-icons/fi";
import { budgets, profile, projectTypes, socials } from "@/data/site";
import { copyText } from "../../lib/client";
import { ease } from "../ui/MotionProvider";
import Reveal from "../ui/Reveal";

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(field: Field, value: string): string | undefined {
  const text = value.trim();
  if (field === "name" && !text) return "Please tell me your name.";
  if (field === "email") {
    if (!text) return "I'll need an email to reply to.";
    if (!EMAIL.test(text)) return "That email doesn't look quite right.";
  }
  if (field === "message") {
    if (!text) return "What would you like to talk about?";
    if (text.length < 10) return "A little more detail helps (10 characters or more).";
  }
  return undefined;
}

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});

  const onBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as Field;
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((e) => ({ ...e, [field]: validate(field, event.target.value) }));
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as Field;
    if (touched[field]) setErrors((e) => ({ ...e, [field]: validate(field, event.target.value) }));
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors: Errors = {};
    for (const field of ["name", "email", "message"] as Field[]) {
      const error = validate(field, String(data.get(field) ?? ""));
      if (error) nextErrors[field] = error;
    }
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });
    const firstInvalid = (["name", "email", "message"] as Field[]).find((f) => nextErrors[f]);
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("sending");
    setServerError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      const body = (await response.json().catch(() => ({}))) as { message?: string };
      if (!response.ok) throw new Error(body.message || "Your message couldn't be sent. Please try again.");
      setStatus("success");
      form.reset();
      setTouched({});
    } catch (error) {
      setStatus("error");
      setServerError(
        error instanceof Error ? error.message : `Something went wrong. You can email me at ${profile.email}.`,
      );
    }
  }

  const fieldProps = (field: Field) => ({
    name: field,
    id: `contact-${field}`,
    onBlur,
    onChange,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `contact-${field}-error` : undefined,
    className: "input",
  });
  const errorFor = (field: Field) =>
    errors[field] ? (
      <span className="field-error" id={`contact-${field}-error`}>
        {errors[field]}
      </span>
    ) : null;

  return (
    <section className="section" id="contact" aria-labelledby="contact-title" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="container contact-grid">
        <Reveal className="contact-intro">
          <p className="eyebrow">06 — Contact</p>
          <h2 className="h2" id="contact-title">
            A good idea deserves a <span className="serif serif-accent">great partner</span>.
          </h2>
          <p className="lead">
            Have a product in mind, a problem to untangle, or just a good question? I&rsquo;d love to hear it.
          </p>
          <div className="email-row">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <button
              type="button"
              className="icon-btn"
              onClick={() => copyText(profile.email, "Email copied")}
              aria-label="Copy email address"
              title="Copy email address"
            >
              <FiCopy aria-hidden />
            </button>
          </div>
          <ul className="contact-meta">
            <li>
              <span className="pulse-dot" aria-hidden /> Open to full-time, freelance and contract work
            </li>
            <li>
              <FiClock aria-hidden /> {profile.responseTime}
            </li>
            <li>
              <FiMapPin aria-hidden /> {profile.location} · {profile.timezoneLabel}
            </li>
          </ul>
          <div className="contact-socials">
            {socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="text-link">
                {social.label}
              </a>
            ))}
            <a href={profile.resume} download className="text-link">
              Résumé
            </a>
          </div>
        </Reveal>

        <Reveal className="form-wrap" delay={0.08}>
          <div className="glow" aria-hidden />
          <div className="form-card">
            <AnimatePresence mode="wait" initial={false}>
              {status === "success" ? (
                <motion.div
                  key="success"
                  className="success"
                  role="status"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <svg viewBox="0 0 64 64" fill="none" aria-hidden>
                    <motion.circle
                      cx="32"
                      cy="32"
                      r="30"
                      stroke="currentColor"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, ease }}
                    />
                    <motion.path
                      d="M20 33l8 8 16-17"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, ease, delay: 0.45 }}
                    />
                  </svg>
                  <h3>Message sent.</h3>
                  <p>Thanks for reaching out. I&rsquo;ll get back to you within a day.</p>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => setStatus("idle")}>
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  noValidate
                  aria-labelledby="form-title"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 id="form-title">Tell me what you&rsquo;re thinking.</h3>
                  <p className="muted" style={{ fontSize: 15, marginTop: 4 }}>
                    A little context goes a long way.
                  </p>

                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="contact-name">Name</label>
                      <input {...fieldProps("name")} autoComplete="name" maxLength={100} placeholder="Your name" />
                      {errorFor("name")}
                    </div>
                    <div className="field">
                      <label htmlFor="contact-email">Email</label>
                      <input
                        {...fieldProps("email")}
                        type="email"
                        autoComplete="email"
                        maxLength={254}
                        placeholder="you@company.com"
                      />
                      {errorFor("email")}
                    </div>
                  </div>

                  <fieldset className="field">
                    <legend>
                      Project type <span className="optional">(optional)</span>
                    </legend>
                    <div className="choice-chips">
                      {projectTypes.map((type) => (
                        <label key={type} className="choice">
                          <input type="radio" name="projectType" value={type} />
                          <span>{type}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="field">
                    <legend>
                      Budget <span className="optional">(optional)</span>
                    </legend>
                    <div className="choice-chips">
                      {budgets.map((budget) => (
                        <label key={budget} className="choice">
                          <input type="radio" name="budget" value={budget} />
                          <span>{budget}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div className="field">
                    <label htmlFor="contact-message">Message</label>
                    <textarea
                      {...fieldProps("message")}
                      rows={5}
                      maxLength={5000}
                      placeholder="A new product, an interesting problem, a collaboration…"
                    />
                    {errorFor("message")}
                  </div>

                  <div className="honeypot" aria-hidden="true">
                    <label>
                      Website
                      <input name="website" tabIndex={-1} autoComplete="off" />
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-accent form-submit"
                    disabled={status === "sending"}
                    aria-busy={status === "sending"}
                  >
                    {status === "sending" ? "Sending…" : "Send message"}
                    {status === "sending" ? <span className="spinner" aria-hidden /> : <FiArrowRight aria-hidden />}
                  </button>
                  {status === "error" && serverError ? (
                    <p className="form-error" role="alert">
                      {serverError}
                    </p>
                  ) : null}
                  <p className="form-note">Straight to my inbox. No mailing lists, ever.</p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
