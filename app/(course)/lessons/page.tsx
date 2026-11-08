import type { Metadata } from "next";
import Link from "next/link";
import { ContinueLink, DoneDot, ProgressSummary } from "@/components/Continue";
import { lessons, parts, readMinutes } from "@/lib/course";

export const metadata: Metadata = {
  title: "All lessons",
  description: "The full path from your first prompt to a live app: product, design, architecture, then build.",
};

export default function AllLessons() {
  const list = lessons.map((l) => ({ slug: l.slug, title: l.title }));
  return (
    <div className="page">
      <h1>All lessons</h1>
      <p className="page-sub">Start anywhere. The order matters, though: the blueprint comes before the build.</p>
      <ProgressSummary lessons={list} />
      <ContinueLink lessons={list} />
      <ol className="parts">
        {parts.map((part, i) => (
          <li key={part.slug} className={part.blueprint ? "part part-blueprint" : "part"}>
            <div className="part-head">
              <span className="part-n">Stage {i + 1}</span>
              <h2>{part.title}</h2>
              <p>{part.summary}</p>
              {part.blueprint ? <p className="badge">Blueprint stage</p> : null}
            </div>
            <ol className="part-lessons">
              {part.lessons.map((l) => (
                <li key={l.slug}>
                  <Link href={`/lessons/${l.slug}`}>
                    <DoneDot slug={l.slug} />
                    <span className="part-lesson-title">{l.title}</span>
                    <span className="part-lesson-min">{readMinutes(l)} min</span>
                  </Link>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </div>
  );
}
