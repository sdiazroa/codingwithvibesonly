"use client";
import { setCheck, useProgress } from "@/lib/progress";

// Students check their own work. It's never graded.
export function Checklist({ id, items, done }: { id: string; items: string[]; done: string }) {
  const { checks } = useProgress();
  const ticked = items.filter((_, i) => checks[`${id}:${i}`]).length;
  return (
    <ul className="checklist">
      {items.map((item, i) => {
        const key = `${id}:${i}`;
        return (
          <li key={key}>
            <label>
              <input type="checkbox" checked={Boolean(checks[key])} onChange={(e) => setCheck(key, e.target.checked)} />
              <span>{item}</span>
            </label>
          </li>
        );
      })}
      {ticked === items.length ? <li className="checklist-done">{done}</li> : null}
    </ul>
  );
}
