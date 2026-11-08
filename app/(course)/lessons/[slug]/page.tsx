import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/Blocks";
import { CompleteOnEnd, NextLink } from "@/components/LessonEnd";
import { Path } from "@/components/Path";
import { lessonBySlug, lessons, neighbors, parts, readMinutes } from "@/lib/course";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return lessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lesson = lessonBySlug((await params).slug);
  return lesson ? { title: lesson.title, description: lesson.takeaway } : {};
}

export default async function LessonPage({ params }: Props) {
  const { slug } = await params;
  const lesson = lessonBySlug(slug);
  if (!lesson) notFound();
  const { prev, next } = neighbors(slug);
  const minutes = readMinutes(lesson);

  return (
    <article className="lesson">
      <Path parts={parts} current={lesson.part.slug} />
      <header className="lesson-head">
        <p className="lesson-meta">
          Lesson {lesson.number} of {lessons.length} · {minutes} min read
          {lesson.handsOn ? ` · ${lesson.handsOn} with Claude` : ""}
        </p>
        <h1>{lesson.title}</h1>
        <p className="lesson-takeaway">{lesson.takeaway}</p>
        {lesson.part.blueprint ? <p className="badge">Blueprint stage: no app code yet</p> : null}
      </header>

      <div className="lesson-body">
        <Blocks blocks={lesson.blocks} words={lesson.words} />
      </div>

      <section className="recap" aria-label="Recap">
        <h2>Recap</h2>
        <ul>
          {lesson.recap.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      {lesson.words?.length ? (
        <section className="words" aria-label="Words to know">
          <h2>Words to know</h2>
          <dl>
            {lesson.words.map((w) => (
              <div key={w.term}>
                <dt>{w.term}</dt>
                <dd>{w.meaning}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      <CompleteOnEnd slug={slug} minutes={minutes} />

      <nav className="lesson-nav" aria-label="Next and previous lesson">
        {next ? (
          <NextLink slug={slug} href={`/lessons/${next.slug}`}>
            Next: {next.title}
          </NextLink>
        ) : (
          <NextLink slug={slug} href="/prompts">
            Keep your prompts handy
          </NextLink>
        )}
        {prev ? (
          <Link href={`/lessons/${prev.slug}`} className="back">
            Back to {prev.title}
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
