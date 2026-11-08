"use client";
import { useSyncExternalStore, type ReactNode } from "react";

// Steps that differ on Mac and Windows. Starts on the student's computer and remembers a change.
type Os = "mac" | "windows";
const KEY = "cwvo:os";
const listeners = new Set<() => void>();

const read = (): Os => {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "mac" || saved === "windows") return saved;
  } catch {
    /* storage blocked */
  }
  return /Win/.test(navigator.userAgent) ? "windows" : "mac";
};

const choose = (os: Os) => {
  try {
    localStorage.setItem(KEY, os);
  } catch {
    /* the choice just isn't remembered */
  }
  listeners.forEach((l) => l());
};

export function OsTabs({ mac, windows }: { mac: ReactNode; windows: ReactNode }) {
  const os = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => void listeners.delete(cb);
    },
    read,
    (): Os => "mac",
  );
  return (
    <div className="os">
      <div className="os-tabs" role="group" aria-label="Your computer">
        <button type="button" aria-pressed={os === "mac"} onClick={() => choose("mac")}>
          Mac
        </button>
        <button type="button" aria-pressed={os === "windows"} onClick={() => choose("windows")}>
          Windows
        </button>
      </div>
      <div hidden={os !== "mac"}>{mac}</div>
      <div hidden={os !== "windows"}>{windows}</div>
    </div>
  );
}
