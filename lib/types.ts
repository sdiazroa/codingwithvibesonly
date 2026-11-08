// The shape of every lesson. Content lives in content/lessons/, one file per stage.
// Inline text supports **bold**, `code` and [links](https://...).

export type Mode = "Plan" | "Manual";

export type Block =
  | { type: "p"; text: string }
  | { type: "steps"; items: string[] }
  | { type: "prompt"; id: string; title: string; mode?: Mode; text: string }
  | { type: "command"; label: string; text: string }
  | { type: "flow"; items: string[] }
  | { type: "compare"; left: { title: string; items: string[] }; right: { title: string; items: string[] } }
  | { type: "rows"; items: { title: string; note: string }[] }
  | { type: "house" }
  | { type: "dive"; title: string; blocks: Block[] }
  | { type: "checklist"; id: string; items: string[]; done: string };

export type Word = { term: string; meaning: string };

export type Lesson = {
  slug: string; // the address: /lessons/<slug>
  title: string;
  description: string; // for search results and link previews only
  blocks: Block[];
  words?: Word[]; // each becomes a hover or tap definition on first use
};

export type Part = {
  slug: string;
  title: string;
  lessons: Lesson[];
};
