import { ImageResponse } from "next/og";

export const alt = "Najeeb Ullah Khan — Thoughtful code. Remarkable experiences.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          background: "radial-gradient(circle at 50% -10%, rgba(79,70,229,0.16), transparent 55%), #fafaf9",
          color: "#0a0a0a",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 44, fontWeight: 700, letterSpacing: -3 }}>
            nk<span style={{ color: "#4f46e5" }}>.</span>
          </span>
          <span style={{ fontSize: 20, color: "#5c5c5c", letterSpacing: 2 }}>SOFTWARE ENGINEER</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 700, letterSpacing: -4, lineHeight: 1.05 }}>
          <span>Thoughtful code.</span>
          <span>
            <span style={{ color: "#4f46e5", fontStyle: "italic", fontWeight: 400 }}>Remarkable</span>
            &nbsp;experiences.
          </span>
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
          <span style={{ color: "#5c5c5c" }}>Fintech portals · Dashboards · AI products</span>
        </div>
      </div>
    ),
    size,
  );
}
