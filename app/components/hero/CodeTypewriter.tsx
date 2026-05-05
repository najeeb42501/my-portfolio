"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type CodeSegment = {
  text: string;
  className: string;
};

const codeLines: CodeSegment[][] = [
  [
    { text: "const", className: "theme-code-keyword" },
    { text: " intro", className: "theme-code-name" },
    { text: " = ", className: "theme-code-plain" },
    { text: "[", className: "theme-heading" },
  ],
  [
    { text: "  ", className: "theme-code-punctuation" },
    {
      text: '"Software engineer crafting fast web experiences",',
      className: "theme-code-string",
    },
  ],
  [
    { text: "  ", className: "theme-code-punctuation" },
    {
      text: '"Problem solver with clean systems thinking",',
      className: "theme-code-string",
    },
  ],
  [
    { text: "  ", className: "theme-code-punctuation" },
    {
      text: '"Turning product ideas into polished, scalable code"',
      className: "theme-code-string",
    },
  ],
  [
    { text: "]", className: "theme-heading" },
    { text: ";", className: "theme-code-punctuation" },
  ],
];

const lineLengths = codeLines.map((line) =>
  line.reduce((total, segment) => total + segment.text.length, 0),
);

const lineStarts = codeLines.map((_, index) =>
  lineLengths.slice(0, index).reduce((total, length) => total + length + 1, 0),
);

const totalCharacters =
  lineLengths.reduce((total, length) => total + length, 0) +
  codeLines.length -
  1;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function CodeTypewriter() {
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  const renderedLines = useMemo(
    () =>
      codeLines.map((line, lineIndex) => {
        const visibleInLine = clamp(
          visibleCharacters - lineStarts[lineIndex],
          0,
          lineLengths[lineIndex],
        );

        return line.map((segment, segmentIndex) => {
          const start = line
            .slice(0, segmentIndex)
            .reduce((total, item) => total + item.text.length, 0);
          const end = start + segment.text.length;

          return {
            ...segment,
            text: segment.text.slice(0, clamp(visibleInLine - start, 0, end)),
          };
        });
      }),
    [visibleCharacters],
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setVisibleCharacters((current) =>
        current >= totalCharacters ? totalCharacters : current + 1,
      );
    }, 34);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-0 flex-1 px-5 text-left sm:px-8 lg:px-12">
      <div className="grid min-h-0 w-full items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(15rem,20rem)] xl:grid-cols-[minmax(0,1fr)_minmax(17rem,23rem)]">
        <div className="max-w-4xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.28em] theme-accent">
            full-stack developer
          </p>
          <h1 className="font-sans text-4xl font-black leading-none drop-shadow-[0_0_28px_var(--site-glow)] theme-heading sm:text-5xl lg:text-6xl xl:text-7xl">
            Najeebullah Khan
          </h1>
          <p className="mt-4 max-w-2xl font-sans text-base leading-7 theme-text lg:text-lg">
            4 years building clean interfaces, reliable systems, and
            sharp-feeling products.
          </p>

          <pre
            className="mt-6 whitespace-pre-wrap font-mono text-sm leading-7 theme-code-plain lg:text-base lg:leading-8"
            aria-label="Animated software engineer introduction code"
          >
            <code>
              {renderedLines.map((line, lineIndex) => (
                <span key={lineStarts[lineIndex]} className="block">
                  <span className="mr-5 select-none theme-subtle">
                    {String(lineIndex + 1).padStart(2, "0")}
                  </span>
                  {line.map((segment, segmentIndex) => (
                    <span
                      key={`${lineIndex}-${segmentIndex}`}
                      className={segment.className}
                    >
                      {segment.text}
                    </span>
                  ))}
                  {lineIndex ===
                    lineStarts.findLastIndex(
                      (start) => visibleCharacters >= start,
                    ) && (
                    <span className="ml-1 inline-block h-5 w-2 translate-y-1 animate-pulse bg-[var(--site-accent)] shadow-[0_0_18px_var(--site-glow)]" />
                  )}
                </span>
              ))}
            </code>
          </pre>
        </div>

        <div className="pointer-events-none relative hidden h-full min-h-0 self-stretch lg:block">
          <div className="absolute bottom-8 right-8 size-64 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--site-accent)_26%,transparent),transparent_68%)] blur-2xl" />
          <div className="absolute bottom-0 right-4 h-28 w-72 bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--site-accent)_22%,transparent),transparent)] blur-2xl" />
          <div className="absolute bottom-0 right-0 h-px w-72 bg-[linear-gradient(90deg,transparent,var(--site-accent),transparent)] opacity-60" />
          <Image
            src="/najeeb-nobg-1.png"
            alt="Najeeb Ullah Khan"
            width={420}
            height={520}
            priority
            className="absolute bottom-0 right-0 max-h-full w-auto object-contain drop-shadow-[0_26px_42px_rgba(15,23,42,0.24)]"
          />
        </div>
      </div>
    </div>
  );
}
