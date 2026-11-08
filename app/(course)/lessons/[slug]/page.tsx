import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/Blocks";
import { CompleteOnEnd, NextLink } from "@/components/LessonEnd";
import { lessonBySlug, lessons, nextLesson } from "@/lib/course";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return lessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lesson = lessonBySlug((await params).slug);
  return lesson ? { title: lesson.title, description: lesson.description } : {};
}

// Job: teach one idea. A title, the lesson, and the next step.
export default async function LessonPage({ params }: Props) {
  const { slug } = await params;
  const lesson = lessonBySlug(slug);
  if (!lesson) notFound();
  const next = nextLesson(slug);

  return (
    <article className="lesson">
      <h1>{lesson.title}</h1>
      <Blocks blocks={lesson.blocks} words={lesson.words} />
      <CompleteOnEnd slug={slug} />
      {next ? (
        <NextLink slug={slug} href={`/lessons/${next.slug}`}>
          Next: {next.title}
        </NextLink>
      ) : (
        <NextLink slug={slug} href="/prompts">
          See all prompts
        </NextLink>
      )}
    </article>
  );
}
