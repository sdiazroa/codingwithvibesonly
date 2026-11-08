"use client";
import { useRef, type ReactNode } from "react";

// Detail most people can skip. It opens over the lesson, so nobody loses their place.
export function Dive({ title, children }: { title: string; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button type="button" className="dive-open" onClick={() => ref.current?.showModal()}>
        {title}
      </button>
      <dialog ref={ref} className="dive" aria-label={title} onClick={(e) => e.target === ref.current && ref.current?.close()}>
        <div className="dive-body">
          <div className="dive-head">
            <h2>{title}</h2>
            <button type="button" className="dive-open" onClick={() => ref.current?.close()}>
              Close
            </button>
          </div>
          {children}
        </div>
      </dialog>
    </>
  );
}
