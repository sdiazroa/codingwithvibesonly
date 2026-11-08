import type { ReactNode } from "react";
import type { Item } from "@/lib/types";
import { House } from "@/components/House";

// Diagrams are built from text and CSS, so they reflow on a phone and the words stay readable.
function Figure({ caption, children, label }: { caption?: string; children: ReactNode; label?: string }) {
  return (
    <figure className="fig" aria-label={label}>
      {children}
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

export function Flow({ items, loop, caption }: { items: Item[]; loop?: boolean; caption?: string }) {
  return (
    <Figure caption={caption}>
      <ol className={`flow flow-${Math.min(items.length, 7)}`}>
        {items.map((s, i) => (
          <li key={s.title}>
            <span className="flow-n">{i + 1}</span>
            <strong>{s.title}</strong>
            {s.note ? <span className="flow-note">{s.note}</span> : null}
          </li>
        ))}
      </ol>
      {loop ? (
        <p className="flow-loop">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.5 6.2L3 16M3 21v-5h5" />
          </svg>
          Then start again
        </p>
      ) : null}
    </Figure>
  );
}

export function Compare({ left, right, caption }: { left: { title: string; items: string[] }; right: { title: string; items: string[] }; caption?: string }) {
  return (
    <Figure caption={caption}>
      <div className="compare">
        {[left, right].map((side, i) => (
          <div key={side.title} className={i === 1 ? "compare-side compare-strong" : "compare-side"}>
            <strong>{side.title}</strong>
            <ul>
              {side.items.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Figure>
  );
}

export function Cards({ items, caption }: { items: Item[]; caption?: string }) {
  return (
    <Figure caption={caption}>
      <ul className={`cards cards-${Math.min(items.length, 4)}`}>
        {items.map((c) => (
          <li key={c.title}>
            <strong>{c.title}</strong>
            {c.note ? <span>{c.note}</span> : null}
          </li>
        ))}
      </ul>
    </Figure>
  );
}

export function Layers({ items, caption }: { items: Item[]; caption?: string }) {
  return (
    <Figure caption={caption}>
      <ol className="layers">
        {items.map((l) => (
          <li key={l.title}>
            <strong>{l.title}</strong>
            {l.note ? <span>{l.note}</span> : null}
          </li>
        ))}
      </ol>
    </Figure>
  );
}

export function Files({ items, caption }: { items: { path: string; note: string }[]; caption?: string }) {
  return (
    <Figure caption={caption}>
      <ul className="files">
        {items.map((f) => (
          <li key={f.path}>
            <code>{f.path}</code>
            <span>{f.note}</span>
          </li>
        ))}
      </ul>
    </Figure>
  );
}

export function HouseFigure({ caption }: { caption?: string }) {
  return (
    <Figure caption={caption}>
      <div className="house-fig">
        <House />
      </div>
    </Figure>
  );
}
