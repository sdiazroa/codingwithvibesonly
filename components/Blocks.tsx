import type { ReactNode } from "react";
import { Checklist } from "@/components/Checklist";
import { Dive } from "@/components/Dive";
import { Cards, Compare, Files, Flow, HouseFigure, Layers } from "@/components/Figures";
import { Command, Prompt } from "@/components/Prompt";
import { Term } from "@/components/Term";
import type { Block, Word } from "@/lib/types";

type Ctx = { words: Word[]; seen: Set<string> };

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Definitions attach to the first use of a term in a lesson, never inside bold or code.
function withTerms(text: string, ctx: Ctx, key: string): ReactNode[] {
  const open = ctx.words.filter((w) => !ctx.seen.has(w.term));
  if (!open.length) return [text];
  const pattern = new RegExp(`\\b(${open.map((w) => escape(w.term)).join("|")})\\b`, "i");
  const m = pattern.exec(text);
  if (!m) return [text];
  const word = open.find((w) => w.term.toLowerCase() === m[1].toLowerCase());
  if (!word) return [text];
  ctx.seen.add(word.term);
  return [
    text.slice(0, m.index),
    <Term key={`${key}-${word.term}`} term={word.term} meaning={word.meaning}>
      {m[1]}
    </Term>,
    ...withTerms(text.slice(m.index + m[1].length), ctx, key),
  ];
}

export function Inline({ text, ctx }: { text: string; ctx?: Ctx }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
        if (part.startsWith("`")) return <code key={i}>{part.slice(1, -1)}</code>;
        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (link) {
          const external = link[2].startsWith("http");
          return (
            <a key={i} href={link[2]} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
              {link[1]}
            </a>
          );
        }
        return <span key={i}>{ctx ? withTerms(part, ctx, String(i)) : part}</span>;
      })}
    </>
  );
}

function BlockView({ block, ctx }: { block: Block; ctx: Ctx }) {
  switch (block.type) {
    case "p":
      return (
        <p>
          <Inline text={block.text} ctx={ctx} />
        </p>
      );
    case "steps":
      return (
        <ol className="steps">
          {block.items.map((s) => (
            <li key={s}>
              <Inline text={s} ctx={ctx} />
            </li>
          ))}
        </ol>
      );
    case "links":
      return (
        <div className="links">
          {block.items.map((l) => (
            <a key={l.href} className="btn btn-ghost" href={l.href} target="_blank" rel="noreferrer">
              {l.label}
            </a>
          ))}
        </div>
      );
    case "prompt":
      return <Prompt title={block.title} mode={block.mode} saves={block.saves} text={block.text} />;
    case "command":
      return <Command label={block.label} text={block.text} />;
    case "flow":
      return <Flow items={block.items} loop={block.loop} caption={block.caption} />;
    case "compare":
      return <Compare left={block.left} right={block.right} caption={block.caption} />;
    case "cards":
      return <Cards items={block.items} caption={block.caption} />;
    case "layers":
      return <Layers items={block.items} caption={block.caption} />;
    case "files":
      return <Files items={block.items} caption={block.caption} />;
    case "house":
      return <HouseFigure caption={block.caption} />;
    case "rule":
      return (
        <aside className="rule">
          <strong>{block.title}</strong>
          <p>
            <Inline text={block.text} ctx={ctx} />
          </p>
        </aside>
      );
    case "myth":
      return (
        <aside className="myth">
          <strong>{block.title}</strong>
          <p>
            <Inline text={block.text} ctx={ctx} />
          </p>
        </aside>
      );
    case "dive":
      return (
        <Dive title={block.title}>
          <Blocks blocks={block.blocks} />
        </Dive>
      );
    case "checklist":
      return <Checklist id={block.id} title={block.title} items={block.items} done={block.done} />;
  }
}

export function Blocks({ blocks, words = [] }: { blocks: Block[]; words?: Word[] }) {
  const ctx: Ctx = { words, seen: new Set() };
  return (
    <>
      {blocks.map((b, i) => (
        <BlockView key={i} block={b} ctx={ctx} />
      ))}
    </>
  );
}
