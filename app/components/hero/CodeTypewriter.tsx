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
    <div className="flex min-h-0 flex-1 px-4 py-4 text-left sm:px-8 sm:py-6 md:py-0 lg:px-12">
      <div className="grid min-h-0 w-full content-center gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(15rem,20rem)] lg:items-center xl:grid-cols-[minmax(0,1fr)_minmax(17rem,23rem)]">
        <div className="max-w-4xl">
          <p className="mb-2 font-mono text-[0.68rem] uppercase tracking-[0.24em] theme-accent sm:mb-3 sm:text-xs sm:tracking-[0.28em]">
            full-stack developer
          </p>
          <h1 className="font-sans text-[clamp(2.45rem,13vw,4rem)] font-black leading-none drop-shadow-[0_0_28px_var(--site-glow)] theme-heading sm:text-5xl lg:text-6xl xl:text-7xl">
            Najeebullah Khan
          </h1>
          <p className="mt-3 max-w-2xl font-sans text-sm leading-6 theme-text sm:text-base sm:leading-7 lg:text-lg">
            4 years building clean interfaces, reliable systems, and
            sharp-feeling products.
          </p>

          <pre
            className="scrollbar-none mt-5 overflow-x-auto whitespace-pre font-mono text-[0.72rem] leading-6 theme-code-plain sm:text-sm sm:leading-7 lg:text-base lg:leading-8"
            aria-label="Animated software engineer introduction code"
          >
            <code>
              {renderedLines.map((line, lineIndex) => (
                <span key={lineStarts[lineIndex]} className="block min-w-max">
                  <span className="mr-3 inline-block w-5 select-none text-right theme-subtle sm:mr-5">
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
