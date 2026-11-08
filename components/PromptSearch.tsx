"use client";
import { useState } from "react";
import { Prompt } from "@/components/Prompt";

type Item = { id: string; title: string; mode?: string; text: string };
type Group = { slug: string; title: string; items: Item[] };

// Every word typed has to appear in the prompt's stage, title or text.
export function PromptSearch({ groups }: { groups: Group[] }) {
  const [query, setQuery] = useState("");
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const matches = (group: Group, item: Item) => {
    const haystack = `${group.title} ${item.title} ${item.text}`.toLowerCase();
    return words.every((w) => haystack.includes(w));
  };
  const shown = groups.map((g) => ({ ...g, items: g.items.filter((i) => matches(g, i)) })).filter((g) => g.items.length);

  return (
    <>
      <input
        className="search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search prompts"
        aria-label="Search prompts"
      />
      {shown.length ? null : <p role="status">No prompts match that search.</p>}
      {shown.map((group) => (
        <section key={group.slug} className="prompt-group">
          <h2>{group.title}</h2>
          {group.items.map((item) => (
            <div key={item.id}>
              <p>{item.title}</p>
              <Prompt label={item.mode ? `${item.mode} mode` : undefined} text={item.text} />
            </div>
          ))}
        </section>
      ))}
    </>
  );
}
