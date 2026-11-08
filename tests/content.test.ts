// Content mistakes fail here, before they reach a student.
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

// The whole point of the course: everything that gets built comes after the blueprint.
const order = parts.map((p) => p.slug);
for (const step of ["product", "design", "architecture"]) ok(order.indexOf(step) < order.indexOf("build"), `${step} comes before build`);
ok(parts.filter((p) => p.blueprint).map((p) => p.slug).join() === "product,design,architecture", "the blueprint is product, design and architecture");

for (const l of lessons) {
  const text = JSON.stringify(l);
  ok(l.takeaway.length > 0 && l.takeaway.length <= 140, `${l.slug}: takeaway is one short line`);
  ok(l.recap.length >= 3 && l.recap.length <= 4, `${l.slug}: recap has 3 or 4 points`);
  ok(!text.includes("—"), `${l.slug}: no em dashes`);

  const prose = lessonBlocks(l).flatMap((b) => (b.type === "p" ? [b.text] : [])).join(" ");
  const words = prose.split(/\s+/).length;
  ok(words <= 170, `${l.slug}: prose stays short (${words} words)`);

  const visual = lessonBlocks(l).some((b) => ["flow", "compare", "cards", "layers", "files", "house", "checklist"].includes(b.type));
  const hasPrompt = lessonBlocks(l).some((b) => b.type === "prompt");
  ok(visual || hasPrompt, `${l.slug}: has a visual or a prompt`);

  const body = lessonBlocks(l)
    .flatMap((b) =>
      b.type === "p"
        ? [b.text]
        : b.type === "steps"
          ? b.items
          : b.type === "rule" || b.type === "myth"
            ? [b.text]
            : b.type === "layers"
              ? b.items.map((i) => i.title)
              : [],
    )
    .join(" ")
    .toLowerCase();
  for (const w of l.words ?? []) ok(body.includes(w.term.toLowerCase()), `${l.slug}: "${w.term}" is used in the lesson text`);
}

// A blueprint-stage prompt may never start the real app.
for (const part of parts.filter((p) => p.blueprint)) {
  for (const l of part.lessons) {
    for (const b of lessonBlocks(l)) {
      if (b.type === "prompt" && b.mode === "Plan") ok(/save|add|update|create/i.test(b.text), `${l.slug}/${b.id}: blueprint prompts leave something written down`);
    }
  }
}

if (failed) process.exit(1);
console.log(`content: ${lessons.length} lessons and ${promptIds.length} prompts OK`);
