// Every text and background pair on the site meets WCAG AA. A new color means a new line here.
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
const ratio = (a: string, b: string) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

let failed = 0;
const check = (what: string, fg: string, bg: string, min: number) => {
  if (!fg || !bg) {
    failed++;
    console.error(`FAIL ${what}: token missing`);
    return;
  }
  const r = ratio(fg, bg);
  if (r < min) {
    failed++;
    console.error(`FAIL ${what}: ${r.toFixed(2)}:1, needs ${min}`);
  }
};

check("body on the page", t.ink, t.bg, 4.5);
check("body on a card", t.ink, t.card, 4.5);
check("quiet text on the page", t.muted, t.bg, 4.5);
check("quiet text on a card", t.muted, t.card, 4.5);
check("quiet text on a tint", t.muted, t.tint, 4.5);
check("links on the page", t.accent, t.bg, 4.5);
check("links on a card", t.accent, t.card, 4.5);
check("links on a tint", t.accent, t.tint, 4.5);
check("button label", "#ffffff", t.accent, 4.5);
check("button label, hover", "#ffffff", t["accent-press"], 4.5);
check("white on the blueprint", "#ffffff", t.blueprint, 4.5);
check("gate text on its tint", t.gate, t["gate-tint"], 4.5);
check("gate text on the page", t.gate, t.bg, 4.5);
check("ink on the gate tint", t.ink, t["gate-tint"], 4.5);
check("prompt text", t["code-ink"], t["code-bg"], 4.5);
check("prompt fill-ins", t["code-mark"], t["code-bg"], 4.5);
check("mode chip", t["code-bg"], t["code-mark"], 4.5);
check("copy button", t["code-bg"], "#ffffff", 4.5);
check("copy button, hover", t["code-bg"], t.tint, 4.5);
check("edge of a control on the page", t.field, t.bg, 3);
check("edge of a control on a card", t.field, t.card, 3);
check("done dot on the page", t.done, t.bg, 3);

if (failed) process.exit(1);
console.log("contrast: every pair passes");
