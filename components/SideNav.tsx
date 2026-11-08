"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Author } from "@/components/Author";
import { Brand } from "@/components/Brand";
import { useProgress } from "@/lib/progress";

export type NavPart = { slug: string; title: string; group?: string; lessons: { slug: string; title: string }[] };

// Every stage, with only the current stage's lessons open.
function Tree({ parts, path, onNavigate }: { parts: NavPart[]; path: string; onNavigate?: () => void }) {
  const { completed } = useProgress();
  return (
    <>
      <ol className="tree">
        {parts.map((part) => {
          const open = part.lessons.some((l) => path === `/lessons/${l.slug}`);
          return (
            <li key={part.slug}>
              {part.group ? (
                <Link href={`/lessons/${part.lessons[0].slug}`} onClick={onNavigate} className="tree-group">
                  {part.group}
                </Link>
              ) : null}
              <Link href={`/lessons/${part.lessons[0].slug}`} onClick={onNavigate} className={open ? "tree-stage open" : "tree-stage"}>
                {part.title}
              </Link>
              {open ? (
                <ol>
                  {part.lessons.map((l) => {
                    const href = `/lessons/${l.slug}`;
                    const done = Boolean(completed[l.slug]);
                    return (
                      <li key={l.slug}>
                        <Link href={href} onClick={onNavigate} aria-current={path === href ? "page" : undefined} className="tree-lesson">
                          <span className={done ? "dot dot-done" : "dot"} aria-hidden="true" />
                          {l.title}
                          {done ? <span className="sr"> (done)</span> : null}
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              ) : null}
            </li>
          );
        })}
      </ol>
      <Link href="/prompts" onClick={onNavigate} aria-current={path === "/prompts" ? "page" : undefined} className="tree-stage tree-prompts">
        All prompts
      </Link>
      <Author />
    </>
  );
}

export function SideNav({ parts }: { parts: NavPart[] }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="phonebar">
        <Brand />
        <button type="button" className="dive-open" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"}
        </button>
      </header>
      {open ? (
        <nav className="phonemenu" aria-label="Lessons">
          <Tree parts={parts} path={path} onNavigate={() => setOpen(false)} />
        </nav>
      ) : null}
      <aside className="sidebar">
        <Brand />
        <nav aria-label="Lessons">
          <Tree parts={parts} path={path} />
        </nav>
      </aside>
    </>
  );
}
