import Reveal from "./Reveal";

export default function SectionHeader({
  index,
  label,
  title,
  lead,
  id,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  lead?: string;
  id?: string;
}) {
  return (
    <Reveal className="section-header">
      <p className="eyebrow">
        {index} — {label}
      </p>
      <h2 className="h2" id={id}>
        {title}
      </h2>
      {lead ? <p className="lead">{lead}</p> : null}
    </Reveal>
  );
}
