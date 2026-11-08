import { parts } from "@/content/course";
import type { Block, Lesson } from "@/lib/types";

export { parts };

export const lessons: Lesson[] = parts.flatMap((part) => part.lessons);

export const firstLesson = lessons[0];

export const lessonBySlug = (slug: string) => lessons.find((l) => l.slug === slug);

export const nextLesson = (slug: string) => lessons[lessons.findIndex((l) => l.slug === slug) + 1];

export const flatten = (blocks: Block[]): Block[] =>
  blocks.flatMap((b) => {
    if (b.type === "dive") return [b, ...flatten(b.blocks)];
    if (b.type === "step") return [b, ...flatten(b.then ?? [])];
    if (b.type === "os") return [b, ...flatten(b.mac), ...flatten(b.windows)];
    return [b];
  });

export const lessonBlocks = (l: Lesson) => flatten(l.blocks);

// A prompt has one home: its lesson. The All prompts page is built from these.
export const promptsByPart = parts.map((part) => ({
  part,
  items: part.lessons.flatMap((lesson) => lessonBlocks(lesson).flatMap((b) => (b.type === "prompt" ? [b] : []))),
}));
