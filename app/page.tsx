import Link from "next/link";
import { ContinueLink } from "@/components/Continue";
import { House } from "@/components/House";
import { firstLesson, lessons } from "@/lib/course";

// Job: welcome people and send them into the first lesson. One action, one screen, no scrolling.
export default function Home() {
  return (
    <main id="main" className="landing">
      <div className="landing-copy">
        <p className="brand">Coding with Vibes Only</p>
        <div className="landing-main">
          <h1>Welcome to vibe coding.</h1>
          <p className="landing-sub">A hands-on lesson on building a real app with AI. No coding experience needed.</p>
          <div className="landing-actions">
            <Link href={`/lessons/${firstLesson.slug}`} className="btn btn-primary btn-large">
              Start vibe coding
            </Link>
            <ContinueLink lessons={lessons.map((l) => ({ slug: l.slug, title: l.title }))} />
          </div>
        </div>
      </div>
      <div className="landing-art" aria-hidden="false">
        <House animate />
      </div>
    </main>
  );
}
