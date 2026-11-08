import Link from "next/link";
import { Author } from "@/components/Author";
import { ContinueLink } from "@/components/Continue";
import { firstLesson, lessons } from "@/lib/course";

// Job: welcome people and send them into the first lesson. One action, one screen, no scrolling.
export default function Home() {
  return (
    <main id="main" className="landing">
      <div className="horizon" aria-hidden="true">
        <i />
      </div>
      <div className="landing-main">
        <h1>Welcome to vibe coding</h1>
        <p>No coding experience needed.</p>
        <Link href={`/lessons/${firstLesson.slug}`} className="btn btn-primary btn-start">
          Start vibe coding
        </Link>
        <ContinueLink lessons={lessons.map((l) => ({ slug: l.slug, title: l.title }))} />
      </div>
      <Author />
    </main>
  );
}
