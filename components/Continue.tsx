"use client";
import Link from "next/link";
import { useProgress } from "@/lib/progress";

const nextUp = (slugs: string[], completed: Record<string, string>) => slugs.find((s) => !completed[s]);

// Quiet link for people coming back. Nothing shows for someone new.
export function ContinueLink({ lessons }: { lessons: { slug: string; title: string }[] }) {
  const { completed } = useProgress();
  const done = lessons.filter((l) => completed[l.slug]).length;
  if (!done) return null;
  const next = nextUp(lessons.map((l) => l.slug), completed);
  const lesson = lessons.find((l) => l.slug === next);
  if (!lesson) return <Link href="/lessons" className="continue">Review the lessons</Link>;
  return (
    <Link href={`/lessons/${lesson.slug}`} className="continue">
      Continue: {lesson.title}
    </Link>
  );
}

export function ProgressSummary({ lessons }: { lessons: { slug: string }[] }) {
  const { completed } = useProgress();
  const done = lessons.filter((l) => completed[l.slug]).length;
  const share = Math.round((done / lessons.length) * 100);
  return (
    <div className="progress">
      <span>
        {done} of {lessons.length} lessons done
      </span>
      <div className="bar" role="progressbar" aria-valuenow={done} aria-valuemin={0} aria-valuemax={lessons.length} aria-label="Lessons done">
        <i style={{ width: `${share}%` }} />
      </div>
    </div>
  );
}

export function DoneDot({ slug }: { slug: string }) {
  const { completed } = useProgress();
  const done = Boolean(completed[slug]);
  return (
    <>
      <span className={done ? "dot dot-done" : "dot"} aria-hidden="true" />
      {done ? <span className="sr">(done)</span> : null}
    </>
  );
}
