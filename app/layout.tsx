import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "@/styles/index.css";

// Fonts are bundled so a build never depends on fetching them.
const sans = localFont({
  variable: "--font-sans",
  src: [
    { path: "../fonts/inter-latin-400-normal.woff2", weight: "400" },
    { path: "../fonts/inter-latin-500-normal.woff2", weight: "500" },
    { path: "../fonts/inter-latin-600-normal.woff2", weight: "600" },
  ],
});

const serif = localFont({
  variable: "--font-serif",
  src: [
    { path: "../fonts/source-serif-4-latin-500-normal.woff2", weight: "500" },
    { path: "../fonts/source-serif-4-latin-600-normal.woff2", weight: "600" },
  ],
});

const description = "Learn to build a real app with AI. No coding experience needed.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.codingwithvibesonly.com"),
  title: { default: "Coding with Vibes Only: learn to vibe code", template: "%s | Coding with Vibes Only" },
  description,
  openGraph: { title: "Welcome to vibe coding", description, siteName: "Coding with Vibes Only", type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#eef3ff" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
