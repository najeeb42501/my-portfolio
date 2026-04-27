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
      <p className="mb-3 text-sm font-medium uppercase text-cyan-300">
        {eyebrow}
      </p>
      <h2 className="text-balance text-3xl font-semibold text-white md:text-5xl">
        {title}
      </h2>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-zinc-400">
        {copy}
      </p>
    </Reveal>
  );
}
