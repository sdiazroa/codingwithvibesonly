import Link from "next/link";
import type { Part } from "@/lib/types";

// Where this lesson sits on the path. Repeated on every lesson, because the order is the point.
export function Path({ parts, current }: { parts: Part[]; current: string }) {
  const at = parts.findIndex((p) => p.slug === current);
  return (
    <nav className="path" aria-label="Stages of the course">
      <ol>
        {parts.map((p, i) => (
          <li key={p.slug} className={i === at ? "now" : i < at ? "past" : undefined}>
            <Link href={`/lessons/${p.lessons[0].slug}`} aria-current={i === at ? "step" : undefined}>
              {p.title}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
