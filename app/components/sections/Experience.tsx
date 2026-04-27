import { timeline } from "../data/portfolio";
import Reveal from "../shared/Reveal";
import SectionHeading from "../shared/SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Experience"
          title="Calm delivery across ambitious product cycles."
          copy="A timeline of roles centered on dependable systems, humane interfaces, and practical technical leadership."
        />
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-white/10 md:left-1/2" />
          {timeline.map((item, index) => (
            <Reveal
              key={`${item.company}-${item.role}`}
              className={`relative mb-10 grid gap-6 md:grid-cols-2 ${
                index % 2 === 0 ? "" : "md:[&>div]:col-start-2"
              }`}
            >
              <span className="absolute left-2 top-7 size-4 rounded-full border border-cyan-200 bg-[#0a0a0a] shadow-[0_0_24px_rgba(34,211,238,0.45)] md:left-[calc(50%-0.5rem)]" />
              <div className="ml-10 rounded border border-white/10 bg-white/[0.03] p-6 md:ml-0">
                <p className="text-sm text-cyan-300">{item.period}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">
                  {item.role}
                </h3>
                <p className="mt-1 text-zinc-400">{item.company}</p>
                <p className="mt-4 leading-7 text-zinc-300">{item.details}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
