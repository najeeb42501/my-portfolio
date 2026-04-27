"use client";

import { useEffect, useMemo, useState } from "react";

type CodeSegment = {
  text: string;
  className: string;
};

const codeLines: CodeSegment[][] = [
  [
    { text: "const", className: "text-violet-300" },
    { text: " intro", className: "text-sky-200" },
    { text: " = ", className: "text-zinc-300" },
    { text: "[", className: "text-zinc-100" },
  ],
  [
    { text: "  ", className: "text-zinc-500" },
    {
      text: '"Software engineer crafting fast web experiences",',
      className: "text-emerald-300",
    },
  ],
  [
    { text: "  ", className: "text-zinc-500" },
    {
      text: '"Problem solver with clean systems thinking",',
      className: "text-emerald-300",
    },
  ],
  [
    { text: "  ", className: "text-zinc-500" },
    {
      text: '"Turning product ideas into polished, scalable code"',
      className: "text-emerald-300",
    },
  ],
  [
    { text: "]", className: "text-zinc-100" },
    { text: ";", className: "text-zinc-500" },
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
    <div className="flex-1 px-5 py-7 text-left sm:px-8 sm:py-9 lg:px-12 lg:py-12">
      <div className="mb-8 max-w-4xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.28em] text-cyan-200/80">
          full-stack developer
        </p>
        <h1 className="font-sans text-4xl font-black leading-none text-white drop-shadow-[0_0_28px_rgba(34,211,238,0.2)] sm:text-6xl lg:text-7xl">
          Najeebullah Khan
        </h1>
        <p className="mt-4 max-w-2xl font-sans text-base leading-7 text-zinc-300 sm:text-lg">
          4 years building clean interfaces, reliable systems, and sharp-feeling
          products.
        </p>
      </div>

      <pre
        className="whitespace-pre-wrap font-mono text-sm leading-8 text-zinc-300 sm:text-base lg:text-lg lg:leading-9"
        aria-label="Animated software engineer introduction code"
      >
        <code>
          {renderedLines.map((line, lineIndex) => (
            <span key={lineStarts[lineIndex]} className="block">
              <span className="mr-5 select-none text-zinc-700">
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
                <span className="ml-1 inline-block h-5 w-2 translate-y-1 animate-pulse bg-cyan-200 shadow-[0_0_18px_rgba(103,232,249,0.8)]" />
              )}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
