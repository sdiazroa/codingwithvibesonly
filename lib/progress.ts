"use client";
import { useSyncExternalStore } from "react";

// Progress stays on the device. There are no accounts and nothing is sent anywhere.
const KEY = "cwvo:progress:v1";

export type Progress = {
  completed: Record<string, string>; // lesson slug -> date first finished
  checks: Record<string, boolean>; // checklist item -> ticked
};

const EMPTY: Progress = { completed: {}, checks: {} };
let cache: Progress = EMPTY;
let raw: string | null = null;
const listeners = new Set<() => void>();

function read(): Progress {
  try {
    const next = localStorage.getItem(KEY);
    if (next !== raw) {
      raw = next;
      cache = next ? { ...EMPTY, ...JSON.parse(next) } : EMPTY;
    }
  } catch {
    /* storage blocked: progress simply isn't saved */
  }
  return cache;
}

function write(p: Progress) {
  cache = p;
  try {
    const next = JSON.stringify(p);
    localStorage.setItem(KEY, next);
    raw = next;
  } catch {
    /* keep it for this visit */
  }
  listeners.forEach((l) => l());
}

export function markComplete(slug: string) {
  const p = read();
  if (p.completed[slug]) return; // keep the first date
  write({ ...p, completed: { ...p.completed, [slug]: new Date().toISOString() } });
}

export function setCheck(id: string, on: boolean) {
  const p = read();
  write({ ...p, checks: { ...p.checks, [id]: on } });
}

export function useProgress(): Progress {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      window.addEventListener("storage", cb);
      return () => {
        listeners.delete(cb);
        window.removeEventListener("storage", cb);
      };
    },
    read,
    () => EMPTY,
  );
}
