import type { Metadata } from "next";
import { PromptSearch } from "@/components/PromptSearch";
import { promptsByPart } from "@/lib/course";

export const metadata: Metadata = {
  title: "All prompts",
  description: "Every prompt from the course in one place, ready to copy into Claude Code.",
};

// Job: find a prompt and copy it.
export default function AllPrompts() {
  const groups = promptsByPart
    .filter((g) => g.items.length)
    .map(({ part, items }) => ({
      slug: part.slug,
      title: part.title,
      items: items.map(({ id, title, mode, text }) => ({ id, title, mode, text })),
    }));
  return (
    <article className="lesson">
      <h1>All prompts</h1>
      <PromptSearch groups={groups} />
    </article>
  );
}
