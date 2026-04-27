import Reveal from "../shared/Reveal";
import SectionHeading from "../shared/SectionHeading";

const socialLinks = [
  { label: "GitHub", href: "https://example.com/", external: true },
  { label: "LinkedIn", href: "https://example.com/", external: true },
  { label: "Email", href: "mailto:hello@njb.dev", external: false },
];

export default function Contact() {
  return (
    <section id="contact" className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contact"
          title="Have a product worth sharpening?"
          copy="Send a note with the shape of the problem, the team, and the kind of outcome you want."
        />
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="rounded border border-white/10 bg-white/[0.03] p-7">
            <h3 className="text-2xl font-semibold text-white">
              Let&apos;s build something steady.
            </h3>
            <p className="mt-4 leading-8 text-zinc-400">
              I am best suited for senior frontend, full-stack product work,
              performance rescue, and design-system efforts where craft and
              delivery both matter.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded border border-white/10 px-4 py-2 text-sm text-zinc-200 transition hover:border-cyan-300 hover:text-cyan-200"
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </Reveal>
          <Reveal className="rounded border border-white/10 bg-zinc-950 p-6">
            <form
              className="grid gap-4"
              action="mailto:hello@njb.dev"
              method="post"
              encType="text/plain"
            >
              <label className="grid gap-2 text-sm text-zinc-300">
                Name
                <input
                  name="name"
                  autoComplete="name"
                  className="rounded border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-300"
                  placeholder="Your name"
                  required
                />
              </label>
              <label className="grid gap-2 text-sm text-zinc-300">
                Email
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="rounded border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-300"
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label className="grid gap-2 text-sm text-zinc-300">
                Message
                <textarea
                  name="message"
                  rows={5}
                  className="resize-none rounded border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-300"
                  placeholder="A few details about the work..."
                  required
                />
              </label>
              <button
                type="submit"
                className="rounded bg-cyan-300 px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-cyan-200"
              >
                Send Message
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
