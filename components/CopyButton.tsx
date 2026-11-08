"use client";
import { useRef, useState } from "react";

// If the browser refuses to copy, the button says so, and the text is still on screen to select.
export function CopyButton({ text }: { text: string }) {
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
    timer.current = window.setTimeout(() => setState("idle"), 2000);
  };

  return (
    <button type="button" className="btn btn-primary copy" onClick={copy}>
      <span aria-live="polite">{state === "copied" ? "Copied" : state === "failed" ? "Select to copy" : "Copy"}</span>
    </button>
  );
}
