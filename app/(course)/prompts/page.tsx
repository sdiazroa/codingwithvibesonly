import type { Metadata } from "next";
import { Prompt } from "@/components/Prompt";
import { promptsByPart } from "@/lib/course";

export const metadata: Metadata = {
  title: "All prompts",
  description: "Every prompt from the course in one place, ready to copy into Claude Code.",
};

// Job: find a prompt and copy it.
export default function AllPrompts() {
  return (
    <article className="lesson">
      <h1>All prompts</h1>
      {promptsByPart
        .filter((g) => g.items.length)
        .map(({ part, items }) => (
          <section key={part.slug} className="prompt-group">
            <h2>{part.title}</h2>
            {items.map((prompt) => (
              <div key={prompt.id}>
                <p>{prompt.title}</p>
                <Prompt label={prompt.mode ? `${prompt.mode} mode` : undefined} text={prompt.text} />
              </div>
            ))}
          </section>
        ))}
    </article>
  );
}
