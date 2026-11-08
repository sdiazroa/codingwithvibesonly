import type { Metadata } from "next";
import Link from "next/link";
import { Prompt } from "@/components/Prompt";
import { promptsByPart } from "@/lib/course";

export const metadata: Metadata = {
  title: "All prompts",
  description: "Every prompt from the course in one place, ready to copy into Claude Code.",
};

export default function AllPrompts() {
  return (
    <div className="page page-narrow">
      <h1>All prompts</h1>
      <p className="page-sub">Every prompt from the course, in order. Come back here on your next project.</p>
      {promptsByPart
        .filter((g) => g.items.length)
        .map(({ part, items }) => (
          <section key={part.slug} className="prompt-group">
            <h2>{part.title}</h2>
            {items.map(({ lesson, prompt }) => (
              <div key={prompt.id} className="prompt-item">
                <Prompt title={prompt.title} mode={prompt.mode} saves={prompt.saves} text={prompt.text} />
                <Link href={`/lessons/${lesson.slug}`} className="back">
                  From: {lesson.title}
                </Link>
              </div>
            ))}
          </section>
        ))}
    </div>
  );
}
