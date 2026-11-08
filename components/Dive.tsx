"use client";
import { useRef, type ReactNode } from "react";

// Extra detail most people can skip. It opens over the lesson, so nobody loses their place.
export function Dive({ title, children }: { title: string; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button type="button" className="dive-open" onClick={() => ref.current?.showModal()}>
        <span>{title}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
      <dialog ref={ref} className="dive" aria-label={title} onClick={(e) => e.target === ref.current && ref.current?.close()}>
        <div className="dive-body">
          <div className="dive-head">
            <h2>{title}</h2>
            <button type="button" className="btn btn-ghost" onClick={() => ref.current?.close()}>
              Close
            </button>
          </div>
          {children}
        </div>
      </dialog>
    </>
  );
}
