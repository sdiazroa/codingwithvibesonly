"use client";
import Link from "next/link";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main" className="missing">
      <h1>Something went wrong on this page.</h1>
      <p>Try again, or head back to the lessons.</p>
      <div className="links">
        <button type="button" className="btn btn-primary" onClick={reset}>
          Try again
        </button>
        <Link href="/lessons" className="btn btn-ghost">
          All lessons
        </Link>
      </div>
    </main>
  );
}
