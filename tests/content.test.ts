// Restraint and clarity are the design, so a test protects both.
import { firstLesson, flatten, lessonBlocks, lessons, parts } from "@/lib/course";
import type { Block } from "@/lib/types";

let failed = 0;
const ok = (cond: unknown, what: string) => {
  if (!cond) {
    failed++;
    console.error(`FAIL ${what}`);
  }
};

const count = (s: string) => s.trim().split(/\s+/).length;

const slugs = lessons.map((l) => l.slug);
ok(new Set(slugs).size === slugs.length, "lesson slugs are unique");

const promptIds = lessons.flatMap((l) => lessonBlocks(l).flatMap((b) => (b.type === "prompt" ? [b.id] : [])));
ok(new Set(promptIds).size === promptIds.length, "prompt ids are unique");

ok(firstLesson.slug === "download-claude", "the first step is downloading Claude");
const order = parts.map((p) => p.slug);
for (const step of ["product", "design", "architecture"]) ok(order.indexOf(step) < order.indexOf("build"), `${step} comes before build`);

// What the page shows on one computer, without opening a pop-up.
const visible = (blocks: Block[]): Block[] =>
  blocks.flatMap((b) => {
    if (b.type === "dive") return [];
    if (b.type === "step") return [b, ...visible(b.then ?? [])];
    if (b.type === "os") return visible(b.mac);
    return [b];
  });

for (const l of lessons) {
  const page = visible(l.blocks);
  ok(!JSON.stringify(l).includes("—"), `${l.slug}: no em dashes`);
  ok(l.description.length <= 140, `${l.slug}: description is short`);

  const prose = page.flatMap((b) => (b.type === "p" ? [b.text] : [])).join(" ");
  ok(count(prose) <= 60, `${l.slug}: ${count(prose)} words of explanation (limit 60)`);

  for (const b of flatten(l.blocks)) {
    if (b.type === "step") {
      ok(count(b.text) <= 40, `${l.slug}: a step is ${count(b.text)} words (limit 40): ${b.text.slice(0, 40)}`);
      ok((b.then ?? []).filter((t) => t.type === "mock").length <= 1, `${l.slug}: one drawing per step`);
    }
  }

  ok(page.filter((b) => b.type === "step").length <= 8, `${l.slug}: at most 8 steps`);
  ok(page.filter((b) => b.type === "prompt").length <= 1, `${l.slug}: at most one prompt on the page`);
  ok(page.filter((b) => ["flow", "compare", "rows", "house", "checklist"].includes(b.type)).length <= 1, `${l.slug}: at most one diagram`);
  ok(l.blocks.filter((b) => b.type === "dive").length <= 1, `${l.slug}: at most one pop-up`);

  const body = flatten(l.blocks).flatMap((b) => (b.type === "p" || b.type === "step" ? [b.text] : [])).join(" ").toLowerCase();
  for (const w of l.words ?? []) ok(body.includes(w.term.toLowerCase()), `${l.slug}: "${w.term}" is used in the text`);
}

if (failed) process.exit(1);
console.log(`content: ${lessons.length} lessons and ${promptIds.length} prompts OK`);
