"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useProgress } from "@/lib/progress";

export type NavPart = { slug: string; title: string; blueprint?: boolean; lessons: { slug: string; title: string }[] };

function Tree({ parts, path, onNavigate }: { parts: NavPart[]; path: string; onNavigate?: () => void }) {
  const { completed } = useProgress();
  return (
    <ol className="tree">
      {parts.map((part, i) => {
        const startsBlueprint = part.blueprint && !parts[i - 1]?.blueprint;
        return (
          <li key={part.slug} className={part.blueprint ? "tree-part tree-blueprint" : "tree-part"}>
            {startsBlueprint ? <span className="tree-tag">The blueprint</span> : null}
            <span className="tree-title">{part.title}</span>
            <ol>
              {part.lessons.map((l) => {
                const href = `/lessons/${l.slug}`;
                const here = path === href;
                const done = Boolean(completed[l.slug]);
                return (
                  <li key={l.slug}>
                    <Link href={href} onClick={onNavigate} aria-current={here ? "page" : undefined} className={here ? "tree-link here" : "tree-link"}>
                      <span className={done ? "dot dot-done" : "dot"} aria-hidden="true" />
                      <span>{l.title}</span>
                      {done ? <span className="sr">(done)</span> : null}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </li>
        );
      })}
    </ol>
  );
}

const Top = ({ path, onNavigate }: { path: string; onNavigate?: () => void }) => (
  <div className="nav-top">
    <Link href="/lessons" onClick={onNavigate} aria-current={path === "/lessons" ? "page" : undefined} className={path === "/lessons" ? "nav-top-link here" : "nav-top-link"}>
      All lessons
    </Link>
    <Link href="/prompts" onClick={onNavigate} aria-current={path === "/prompts" ? "page" : undefined} className={path === "/prompts" ? "nav-top-link here" : "nav-top-link"}>
      All prompts
    </Link>
  </div>
);

export function SideNav({ parts }: { parts: NavPart[] }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="phonebar">
        <Link href="/" className="brand">
          Coding with Vibes Only
        </Link>
        <button type="button" className="btn btn-ghost" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"}
        </button>
      </header>
      {open ? (
        <nav className="phonemenu" aria-label="Lessons">
          <Top path={path} onNavigate={() => setOpen(false)} />
          <Tree parts={parts} path={path} onNavigate={() => setOpen(false)} />
        </nav>
      ) : null}
      <aside className="sidebar">
        <Link href="/" className="brand">
          Coding with Vibes Only
        </Link>
        <nav aria-label="Lessons">
          <Top path={path} />
          <Tree parts={parts} path={path} />
        </nav>
      </aside>
    </>
  );
}
