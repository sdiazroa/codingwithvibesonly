import Link from "next/link";
import { firstLesson } from "@/lib/course";

export default function NotFound() {
  return (
    <main id="main" className="missing">
      <h1>This page isn&apos;t here.</h1>
      <Link href={`/lessons/${firstLesson.slug}`} className="btn btn-primary">
        Go to the first lesson
      </Link>
    </main>
  );
}
