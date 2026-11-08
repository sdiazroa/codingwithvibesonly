"use client";
import { useEffect, useId, useRef, useState } from "react";

// A word from "Words to know": its meaning shows on hover, focus or tap.
export function Term({ term, meaning, children }: { term: string; meaning: string; children: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", close);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", close);
    };
  }, [open]);

  return (
    <span ref={ref} className="term" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button type="button" aria-describedby={open ? id : undefined} aria-expanded={open} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)} onClick={() => setOpen(true)}>
        {children}
      </button>
      {open ? (
        <span role="tooltip" id={id} className="term-pop">
          <strong>{term}</strong> {meaning}
        </span>
      ) : null}
    </span>
  );
}
