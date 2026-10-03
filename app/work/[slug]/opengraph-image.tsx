import { ImageResponse } from "next/og";
import { caseStudies, caseStudyBySlug } from "@/data/projects";

export const alt = "Case study by Najeeb Ullah Khan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudyBySlug(slug);
  const title = study?.title ?? "Case study";
  const outcome = study?.outcome ?? "";
  const tint = study?.tint ?? "#4f46e5";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: `radial-gradient(circle at 85% 0%, ${tint}33, transparent 55%), #fafaf9`,
          color: "#0a0a0a",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 44, fontWeight: 700, letterSpacing: -3 }}>
            nk<span style={{ color: "#4f46e5" }}>.</span>
          </span>
          <span style={{ fontSize: 20, color: "#5c5c5c", letterSpacing: 2 }}>CASE STUDY</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span style={{ fontSize: 88, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>{title}</span>
          <span style={{ fontSize: 32, color: "#5c5c5c", lineHeight: 1.35, maxWidth: 980 }}>{outcome}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(0,0,0,0.1)",
            paddingTop: 24,
            fontSize: 22,
          }}
        >
          <span>Najeeb Ullah Khan</span>
          <span style={{ color: "#5c5c5c" }}>Software Engineer · Karachi</span>
        </div>
      </div>
    ),
    size,
  );
}
