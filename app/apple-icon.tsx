import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// The favicon, for phone home screens: a prompt and a cursor.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0f1f" }}>
        <svg width="180" height="180" viewBox="0 0 32 32">
          <path d="m8 10 6 6-6 6" fill="none" stroke="#8fb0ff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="16.5" y="20" width="8" height="2.8" rx="1.2" fill="#ffffff" />
        </svg>
      </div>
    ),
    size,
  );
}
