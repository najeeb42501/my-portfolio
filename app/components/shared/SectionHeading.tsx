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
    <Reveal className="mx-auto mb-8 max-w-4xl text-center sm:mb-10">
      <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.26em] theme-accent">
        {eyebrow}
      </p>
      <h2 className="gradient-heading text-balance text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-base leading-7 theme-muted sm:text-lg">
        {copy}
      </p>
    </Reveal>
  );
}