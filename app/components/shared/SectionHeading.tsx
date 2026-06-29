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
    <Reveal className="mx-auto mb-10 max-w-4xl text-center">
      <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.24em] theme-accent">
        {eyebrow}
      </p>
      <h2 className="gradient-heading text-balance text-3xl font-semibold leading-tight md:text-5xl">
        {title}
      </h2>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-8 theme-muted">
        {copy}
      </p>
    </Reveal>
  );
}