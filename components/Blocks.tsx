import type { ReactNode } from "react";
import { Checklist } from "@/components/Checklist";
import { Dive } from "@/components/Dive";
import { Mock } from "@/components/Mock";
import { OsTabs } from "@/components/OsTabs";
import { Prompt } from "@/components/Prompt";
import { Term } from "@/components/Term";
import type { Block, Word } from "@/lib/types";

type Ctx = { words: Word[]; seen: Set<string> };

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// A definition attaches to the first use of a term in a lesson, never inside bold or code.
function withTerms(text: string, ctx: Ctx, key: string): ReactNode[] {
  const open = ctx.words.filter((w) => !ctx.seen.has(w.term));
  if (!open.length) return [text];
  const m = new RegExp(`\\b(${open.map((w) => escape(w.term)).join("|")})\\b`, "i").exec(text);
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

function Inline({ text, ctx }: { text: string; ctx: Ctx }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
        if (part.startsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
        if (part.startsWith("`")) return <code key={i}>{part.slice(1, -1)}</code>;
        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (link) {
          return (
            <a key={i} href={link[2]} target="_blank" rel="noreferrer">
              {link[1]}
            </a>
          );
        }
        return <span key={i}>{withTerms(part, ctx, String(i))}</span>;
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
    case "step":
      return (
        <div className="step">
          <p>
            <Inline text={block.text} ctx={ctx} />
          </p>
          {block.then?.map((b, i) => <BlockView key={i} block={b} ctx={ctx} />)}
        </div>
      );
    case "os":
      return (
        <OsTabs
          mac={block.mac.map((b, i) => (
            <BlockView key={i} block={b} ctx={ctx} />
          ))}
          windows={block.windows.map((b, i) => (
            <BlockView key={i} block={b} ctx={ctx} />
          ))}
        />
      );
    case "mock":
      return <Mock show={block.show} />;
    case "link":
      return (
        <a className="btn btn-primary" href={block.href} target="_blank" rel="noreferrer">
          {block.label}
        </a>
      );
    case "prompt":
      return <Prompt label={block.mode ? `${block.mode} mode` : undefined} text={block.text} />;
    case "command":
      return <Prompt label={block.label} text={block.text} />;
    case "flow":
      return (
        <ol className="flow">
          {block.items.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      );
    case "compare":
      return (
        <div className="compare">
          {[block.left, block.right].map((side) => (
            <div key={side.title}>
              <h2>{side.title}</h2>
              <ul>
                {side.items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    case "rows":
      return (
        <dl className="rows">
          {block.items.map((r) => (
            <div key={r.title}>
              <dt>{r.title}</dt>
              <dd>{r.note}</dd>
            </div>
          ))}
        </dl>
      );
    case "dive":
      return (
        <Dive title={block.title}>
          <Blocks blocks={block.blocks} />
        </Dive>
      );
    case "checklist":
      return <Checklist id={block.id} items={block.items} done={block.done} />;
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
