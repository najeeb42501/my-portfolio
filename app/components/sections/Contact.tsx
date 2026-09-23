"use client";
import { useState, type FormEvent } from "react";
import { FiArrowUpRight, FiCheck, FiMail, FiSend } from "react-icons/fi";
import Reveal from "../shared/Reveal";

export default function Contact() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.get("name"),
          email: fields.get("email"),
          message: fields.get("message"),
          website: fields.get("website"),
        }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(
          data.message || "Unable to send your message. Please try again.",
        );
      setStatus("success");
      setMessage(
        "Message received. Thanks for reaching out — I’ll be in touch.",
      );
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. You can also email me directly.",
      );
    }
  }
  return (
    <section id="contact" className="contact-section section-pad">
      <div className="page-container">
        <p className="eyebrow">
          <span className="status-dot" />
          06 / Let’s make something matter
        </p>
        <div className="contact-layout">
          <Reveal className="contact-intro">
            <h2>
              A good idea
              <br />
              deserves a<br />
              <span className="serif-word">great partner.</span>
            </h2>
            <p>
              Have a product in mind, a challenge to solve, or just a good
              question? I’d love to hear it.
            </p>
            <a className="contact-email" href="mailto:najeeb08089@gmail.com">
              <FiMail aria-hidden />
              najeeb08089@gmail.com
              <FiArrowUpRight aria-hidden />
            </a>
            <div className="contact-note">
              <span className="status-dot" /> Open to full-stack, frontend, and
              AI product work.
            </div>
          </Reveal>
          <Reveal className="contact-form-wrap">
            <form
              className="contact-form"
              onSubmit={submit}
              aria-label="Send Najeeb a message"
            >
              <div className="form-heading">
                <h3>Tell me what you’re thinking.</h3>
                <FiArrowUpRight aria-hidden />
              </div>
              <p>A little context goes a long way.</p>
              <label>
                Your name
                <input
                  name="name"
                  autoComplete="name"
                  placeholder="How should I call you?"
                  maxLength={100}
                  required
                />
              </label>
              <label>
                Email address
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  maxLength={254}
                  required
                />
              </label>
              <label>
                What do you have in mind?
                <textarea
                  name="message"
                  rows={4}
                  placeholder="A new product, an interesting problem, a collaboration..."
                  minLength={10}
                  maxLength={5000}
                  required
                />
              </label>
              <div className="honeypot" aria-hidden="true">
                <label>
                  Website
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              <button
                type="submit"
                className="button-primary"
                disabled={status === "sending"}
                aria-busy={status === "sending"}
              >
                {status === "sending"
                  ? "Sending…"
                  : status === "success"
                    ? "Send another message"
                    : "Send message"}
                {status === "success" ? (
                  <FiCheck aria-hidden />
                ) : (
                  <FiSend aria-hidden />
                )}
              </button>
              {message && (
                <p
                  className={`form-status ${status}`}
                  role={status === "error" ? "alert" : "status"}
                >
                  {message}
                </p>
              )}
              <p className="form-footnote">
                Straight to my inbox. No mailing lists, ever.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
