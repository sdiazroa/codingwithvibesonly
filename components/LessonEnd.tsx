"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { markComplete } from "@/lib/progress";

// A lesson counts as done when the student reached its end and spent a fair share of the reading time on it.
// Short lessons fit on one screen, so reaching the end alone would count before anyone read a word.
const dwell = (minutes: number) => Math.max(8_000, minutes * 60_000 * 0.25);

export function CompleteOnEnd({ slug, minutes }: { slug: string; minutes: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let reached = false;
    let timeUp = false;
    const finish = () => {
      if (reached && timeUp) markComplete(slug);
    };
    const timer = window.setTimeout(() => {
      timeUp = true;
      finish();
    }, dwell(minutes));
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        reached = true;
        finish();
      }
    });
    observer.observe(el);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [slug, minutes]);
  return <div ref={ref} aria-hidden="true" />;
}

// The main next step also marks the lesson done.
export function NextLink({ slug, href, children }: { slug: string; href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="btn btn-primary" onClick={() => markComplete(slug)}>
      {children}
    </Link>
  );
}
