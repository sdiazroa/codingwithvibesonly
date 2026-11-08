"use client";
import Link from "next/link";
import { useProgress } from "@/lib/progress";

// Shows only for people coming back.
export function ContinueLink({ lessons }: { lessons: { slug: string; title: string }[] }) {
  const { completed } = useProgress();
  if (!lessons.some((l) => completed[l.slug])) return null;
  const next = lessons.find((l) => !completed[l.slug]);
  if (!next) return null;
  return (
    <Link href={`/lessons/${next.slug}`} className="continue">
      Continue: {next.title}
    </Link>
  );
}
