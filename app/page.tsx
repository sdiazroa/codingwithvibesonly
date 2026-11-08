import type { Viewport } from "next";
import Link from "next/link";
import { ContinueLink } from "@/components/Continue";
import { firstLesson, lessons } from "@/lib/course";

export const viewport: Viewport = { themeColor: "#15100e" };

// Job: welcome people and send them into the first lesson. One action, one screen, no scrolling.
export default function Home() {
  return (
    <main id="main" className="landing">
      <div className="horizon" aria-hidden="true">
        <i />
      </div>
      <div className="landing-main">
        <h1>Welcome to vibe coding</h1>
        <p>A hands-on lesson on building a real app with AI. No coding experience needed.</p>
        <Link href={`/lessons/${firstLesson.slug}`} className="btn btn-glow">
          Start vibe coding
        </Link>
        <ContinueLink lessons={lessons.map((l) => ({ slug: l.slug, title: l.title }))} />
      </div>
      <p className="landing-name">Coding with Vibes Only</p>
    </main>
  );
}
