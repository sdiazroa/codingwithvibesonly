// Restraint is the design, so a test protects it. Tighten these limits; don't raise them.
import { lessonBlocks, lessons, parts } from "@/lib/course";

let failed = 0;
const ok = (cond: unknown, what: string) => {
  if (!cond) {
    failed++;
    console.error(`FAIL ${what}`);
  }
};

const slugs = lessons.map((l) => l.slug);
ok(new Set(slugs).size === slugs.length, "lesson slugs are unique");

const promptIds = lessons.flatMap((l) => lessonBlocks(l).flatMap((b) => (b.type === "prompt" ? [b.id] : [])));
ok(new Set(promptIds).size === promptIds.length, "prompt ids are unique");

const order = parts.map((p) => p.slug);
for (const step of ["product", "design", "architecture"]) ok(order.indexOf(step) < order.indexOf("build"), `${step} comes before build`);

for (const l of lessons) {
  const blocks = l.blocks; // what the page shows without opening a pop-up
  ok(!JSON.stringify(l).includes("—"), `${l.slug}: no em dashes`);
  ok(l.description.length <= 140, `${l.slug}: description is short`);

  const words = blocks.flatMap((b) => (b.type === "p" ? [b.text] : b.type === "steps" ? b.items : [])).join(" ").split(/\s+/).length;
  ok(words <= 80, `${l.slug}: ${words} words of text (limit 80)`);

  ok(blocks.filter((b) => b.type === "prompt").length <= 1, `${l.slug}: at most one prompt on the page`);
  ok(blocks.filter((b) => ["flow", "compare", "rows", "house", "checklist"].includes(b.type)).length <= 1, `${l.slug}: at most one visual`);
  ok(blocks.filter((b) => b.type === "dive").length <= 1, `${l.slug}: at most one pop-up`);

  const body = blocks.flatMap((b) => (b.type === "p" ? [b.text] : [])).join(" ").toLowerCase();
  for (const w of l.words ?? []) ok(body.includes(w.term.toLowerCase()), `${l.slug}: "${w.term}" is used in the text`);
}

if (failed) process.exit(1);
console.log(`content: ${lessons.length} lessons and ${promptIds.length} prompts OK`);
