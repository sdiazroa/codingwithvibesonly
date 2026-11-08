import { parts } from "@/content/course";
import type { Block, Lesson, Part } from "@/lib/types";

export { parts };

export type FlatLesson = Lesson & { part: Part; number: number };

export const lessons: FlatLesson[] = parts.flatMap((part) => part.lessons.map((l) => ({ ...l, part }))).map((l, i) => ({ ...l, number: i + 1 }));

export const lessonBySlug = (slug: string) => lessons.find((l) => l.slug === slug);

export const neighbors = (slug: string) => {
  const i = lessons.findIndex((l) => l.slug === slug);
  return { prev: lessons[i - 1], next: lessons[i + 1] };
};

export const firstLesson = lessons[0];

const allBlocks = (blocks: Block[]): Block[] => blocks.flatMap((b) => (b.type === "dive" ? [b, ...allBlocks(b.blocks)] : [b]));

export const lessonBlocks = (l: Lesson) => allBlocks(l.blocks);

// Prompts have one home: the lesson that teaches them. The Prompts page is built from these.
export const promptsByPart = parts.map((part) => ({
  part,
  items: part.lessons.flatMap((lesson) =>
    lessonBlocks(lesson).flatMap((b) => (b.type === "prompt" ? [{ lesson, prompt: b }] : [])),
  ),
}));

// Reading time counts what people read. Prompts get pasted, so they don't count.
const blockWords = (b: Block): number => {
  const count = (s: string) => s.trim().split(/\s+/).length;
  switch (b.type) {
    case "p":
      return count(b.text);
    case "steps":
      return b.items.reduce((n, s) => n + count(s), 0);
    case "rule":
    case "myth":
      return count(b.title) + count(b.text);
    case "flow":
    case "cards":
    case "layers":
      return b.items.reduce((n, i) => n + count(i.title) + count(i.note ?? ""), 0);
    case "compare":
      return [...b.left.items, ...b.right.items].reduce((n, s) => n + count(s), 0);
    case "files":
      return b.items.reduce((n, i) => n + count(i.note) + 1, 0);
    case "checklist":
      return b.items.reduce((n, s) => n + count(s), 0);
    default:
      return 0;
  }
};

export const readMinutes = (l: Lesson) => Math.max(1, Math.round((l.blocks.reduce((n, b) => n + blockWords(b), 0) + l.recap.join(" ").split(/\s+/).length) / 200));
