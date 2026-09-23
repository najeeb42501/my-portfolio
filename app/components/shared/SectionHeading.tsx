import Reveal from "./Reveal";
export default function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <Reveal className="section-heading">
      <p className="eyebrow">
        <span className="section-marker" />
        {eyebrow}
      </p>
      <div className="section-heading-row">
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
    </Reveal>
  );
}
