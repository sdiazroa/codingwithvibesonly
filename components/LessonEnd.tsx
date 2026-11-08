"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { markComplete } from "@/lib/progress";

// A lesson counts as done once the student reaches its end and has stayed at least 8 seconds.
// Short lessons fit on one screen, so reaching the end alone would count before anyone read a word.
export function CompleteOnEnd({ slug }: { slug: string }) {
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
    }, 8_000);
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
  }, [slug]);
  return <div ref={ref} aria-hidden="true" />;
}

// Moving on also marks the lesson done.
export function NextLink({ slug, href, children }: { slug: string; href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="next" onClick={() => markComplete(slug)}>
      {children}
    </Link>
  );
}
