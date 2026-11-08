"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main" className="missing">
      <h1>Something went wrong on this page.</h1>
      <button type="button" className="btn btn-primary" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
