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
    <Reveal className="mx-auto mb-12 max-w-3xl text-center">
      <p className="mb-3 text-sm font-medium uppercase theme-accent">
        {eyebrow}
      </p>
      <h2 className="text-balance text-3xl font-semibold theme-heading md:text-5xl">
        {title}
      </h2>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-8 theme-muted">
        {copy}
      </p>
    </Reveal>
  );
}
