import { timeline } from "../data/portfolio";
import SectionHeading from "../shared/SectionHeading";

const cardTones = [
  {
    bg: "bg-[var(--theme-card-sky-solid)]",
    text: "text-[var(--theme-card-sky-solid)]",
  },
  {
    bg: "bg-[var(--theme-card-orange-solid)]",
    text: "text-[var(--theme-card-orange-solid)]",
  },
  {
    bg: "bg-[var(--theme-card-purple-solid)]",
    text: "text-[var(--theme-card-purple-solid)]",
  },
  {
    bg: "bg-[var(--theme-card-emerald-solid)]",
    text: "text-[var(--theme-card-emerald-solid)]",
  },
];

function ExperienceCard({
  item,
  index,
}: {
  item: (typeof timeline)[number];
  index: number;
}) {
  const tone = cardTones[index % cardTones.length];
  const stickyTop = `calc(6rem + ${index * 1.4}rem)`;

  return (
    <div
      className="relative sticky"
      style={{ top: stickyTop, zIndex: timeline.length + index }}
    >
      <article
        className={`${tone.bg} overflow-hidden rounded-[1.25rem] border border-white/15 p-6 text-white sm:p-7`}
      >
        <div className="grid gap-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span
              className={`${tone.text} rounded-full bg-white px-3 py-1 font-mono text-xs font-black`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="rounded-full border border-white/25 bg-white/12 px-3 py-1 text-xs font-semibold text-white/86">
              {item.period}
            </span>
          </div>

          <h3 className="text-balance text-3xl font-black leading-tight text-white sm:text-4xl">
            {item.role} <span className="text-white/70">at</span> {item.company}
          </h3>

          <div className="flex flex-wrap gap-2">
            {item.focuses.slice(0, 5).map((focus) => (
              <span
                key={focus}
                className="rounded-full border border-white/20 bg-white/14 px-3 py-1 text-xs font-semibold text-white/88"
              >
                {focus}
              </span>
            ))}
          </div>

          <p className="max-w-4xl text-base leading-8 text-white/84">
            {item.details}
          </p>

          <div className="max-w-4xl rounded-2xl border border-white/20 bg-white/12 px-4 py-3">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              Impact
            </p>
            <p className="mt-1.5 text-sm leading-6 text-white/84">
              {item.impact}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section-band px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Experience"
          title="Professional work, simplified."
          copy="A quick view of the roles, product surfaces, and delivery impact behind my frontend and full-stack work."
        />

        <div className="relative space-y-10 pb-[35vh]">
          {timeline.map((item, index) => (
            <ExperienceCard
              key={`${item.company}-${item.role}`}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

