import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="missing">
      <h1>This page isn&apos;t here.</h1>
      <p>The lesson may have moved. All of them are one click away.</p>
      <Link href="/lessons" className="btn btn-primary">
        See all lessons
      </Link>
    </main>
  );
}
