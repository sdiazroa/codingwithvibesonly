// Every text and background pair meets WCAG AA. A new color means a new line here.
import fs from "node:fs";

const css = fs.readFileSync("styles/base.css", "utf8");
const t = Object.fromEntries([...css.matchAll(/--([a-z-]+):\s*(#[0-9a-f]{6});/g)].map((m) => [m[1], m[2]]));

const channel = (c: number) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const lum = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};

let failed = 0;
const check = (what: string, fg: string, bg: string, min: number) => {
  if (!fg || !bg) {
    failed++;
    console.error(`FAIL ${what}: token missing`);
    return;
  }
  const [hi, lo] = [lum(fg), lum(bg)].sort((x, y) => y - x);
  const r = (hi + 0.05) / (lo + 0.05);
  if (r < min) {
    failed++;
    console.error(`FAIL ${what}: ${r.toFixed(2)}:1, needs ${min}`);
  }
};

for (const [name, bg] of [["page", t.bg], ["card", t.card]] as const) {
  check(`text on ${name}`, t.ink, bg, 4.5);
  check(`quiet text on ${name}`, t.muted, bg, 4.5);
  check(`links on ${name}`, t.accent, bg, 4.5);
}
check("button label", "#ffffff", t.accent, 4.5);
check("button label, hover", "#ffffff", t["accent-press"], 4.5);
check("marked control in a drawing", t["accent-press"], t.tint, 4.5);
check("step number", t.bg, t.ink, 4.5);
check("landing text", t.moon, t.night, 4.5);
check("landing quiet text", t["moon-muted"], t.night, 4.5);
check("landing button", "#ffffff", t.electric, 4.5);

if (failed) process.exit(1);
console.log("contrast: every pair passes");
