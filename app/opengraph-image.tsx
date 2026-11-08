import { ImageResponse } from "next/og";

export const alt = "Welcome to vibe coding";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// What a link to the site looks like when it's shared.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 88, background: "#15100e", color: "#f6efe6" }}>
        <div style={{ fontSize: 34, opacity: 0.85 }}>Coding with Vibes Only</div>
        <div style={{ fontSize: 96, fontWeight: 600, marginTop: 24, lineHeight: 1.05 }}>Welcome to vibe coding.</div>
        <div style={{ fontSize: 38, marginTop: 32, opacity: 0.9 }}>Build a real app with AI. No coding experience needed.</div>
      </div>
    ),
    size,
  );
}
