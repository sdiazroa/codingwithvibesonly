"use client";
import { useRef, useState } from "react";

// Copies text and says so. If the browser refuses, it says that too, and the text is still on screen to select.
export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<number | undefined>(undefined);

  const copy = async () => {
    window.clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("failed");
    }
    timer.current = window.setTimeout(() => setState("idle"), 2200);
  };

  return (
    <button type="button" className={`copy copy-${state}`} onClick={copy}>
      {state === "copied" ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m5 12.5 4.5 4.5L19 7" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="9" y="9" width="11" height="11" rx="2" />
          <path d="M5 15V6a2 2 0 0 1 2-2h9" />
        </svg>
      )}
      <span aria-live="polite">{state === "copied" ? "Copied" : state === "failed" ? "Select and copy" : label}</span>
    </button>
  );
}
