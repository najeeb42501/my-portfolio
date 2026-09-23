import { ImageResponse } from "next/og";
export const alt =
  "Najeeb Ullah Khan — Thoughtful code. Remarkable experiences.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#f8f7f4",
        padding: 70,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "#202320",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 48, fontWeight: 800 }}>nk.</span>
        <span style={{ fontSize: 20, color: "#646960" }}>
          SOFTWARE ENGINEER & PRODUCT BUILDER
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 76,
          letterSpacing: -4,
          lineHeight: 1.1,
        }}
      >
        <span>Thoughtful code.</span>
        <span style={{ color: "#334ddd" }}>Remarkable experiences.</span>
      </div>
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #dedfd7",
          paddingTop: 24,
          justifyContent: "space-between",
          fontSize: 23,
        }}
      >
        <span>Najeeb Ullah Khan</span>
        <span style={{ color: "#646960" }}>
          React · Next.js · Full-stack · AI
        </span>
      </div>
    </div>,
    size,
  );
}
