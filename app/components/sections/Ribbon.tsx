import { ribbon, trustedBy } from "@/data/site";

function Star() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M12 0c.8 6.4 4.8 10.6 12 12-7.2 1.4-11.2 5.6-12 12-.8-6.4-4.8-10.6-12-12C7.2 10.6 11.2 6.4 12 0z" />
    </svg>
  );
}

/**
 * A band holds its words three times over (enough to span wide screens), then that run twice,
 * so the loop can slide by exactly half its width.
 */
function Band({ words, className, label }: { words: readonly string[]; className: string; label?: string }) {
  const run = [...words, ...words, ...words];
  const doubled = [...run, ...run];
  return (
    <div
      className={`ribbon-band ${className}`}
      aria-label={label}
      role={label ? "group" : undefined}
      aria-hidden={label ? undefined : true}
    >
      <ul className="ribbon-track" role="list">
        {doubled.map((word, i) => (
          <li key={`${word}-${i}`} aria-hidden={i >= words.length || undefined}>
            {word}
            <Star />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Ribbon() {
  return (
    <section className="ribbon" aria-label="Companies and platforms I've worked with">
      <Band className="ribbon-back" words={ribbon.map((w) => w.toUpperCase())} />
      <Band
        className="ribbon-front"
        words={trustedBy.map((brand) => brand.name.toUpperCase())}
        label="Trusted by teams at"
      />
    </section>
  );
}
