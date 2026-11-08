"use client";
import { setCheck, useProgress } from "@/lib/progress";

// A check the student runs on their own work. It is never graded, and ticks stay on the device.
export function Checklist({ id, title, items, done }: { id: string; title: string; items: string[]; done: string }) {
  const { checks } = useProgress();
  const ticked = items.filter((_, i) => checks[`${id}:${i}`]).length;
  return (
    <section className="checklist" aria-label={title}>
      <div className="checklist-head">
        <h2>{title}</h2>
        <span>
          {ticked} of {items.length}
        </span>
      </div>
      <ul>
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
      </ul>
      {ticked === items.length ? <p className="checklist-done">{done}</p> : null}
    </section>
  );
}
