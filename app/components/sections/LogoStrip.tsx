import { trustedBy } from "@/data/site";

function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="marquee-track" aria-hidden={hidden || undefined} role="list">
      {trustedBy.map((brand) => (
        <li key={brand.name} className={`wordmark wm-${brand.style}`}>
          {brand.name}
        </li>
      ))}
    </ul>
  );
}

export default function LogoStrip() {
  return (
    <section className="logos" aria-label="Companies and platforms I've worked with">
      <div className="container">
        <p className="logos-label">Trusted by teams at</p>
        <div className="marquee">
          <Track />
          <Track hidden />
        </div>
      </div>
    </section>
  );
}
