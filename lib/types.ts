// The shape of every lesson. Content lives in content/lessons/, one file per part.
// Inline text supports **bold**, `code` and [links](https://...).

export type Mode = "Plan" | "Manual" | "Accept edits";

export type Item = { title: string; note?: string };

export type Block =
  | { type: "p"; text: string }
  | { type: "steps"; items: string[] }
  | { type: "links"; items: { label: string; href: string }[] }
  | { type: "prompt"; id: string; title: string; mode?: Mode; saves?: string; text: string }
  | { type: "command"; label: string; text: string }
  | { type: "flow"; items: Item[]; loop?: boolean; caption?: string }
  | { type: "compare"; left: { title: string; items: string[] }; right: { title: string; items: string[] }; caption?: string }
  | { type: "cards"; items: Item[]; caption?: string }
  | { type: "layers"; items: Item[]; caption?: string }
  | { type: "files"; items: { path: string; note: string }[]; caption?: string }
  | { type: "house"; caption?: string }
  | { type: "rule"; title: string; text: string }
  | { type: "myth"; title: string; text: string }
  | { type: "dive"; id: string; title: string; blocks: Block[] }
  | { type: "checklist"; id: string; title: string; items: string[]; done: string };

export type Word = { term: string; meaning: string };

export type Lesson = {
  slug: string; // the address: /lessons/<slug>
  title: string;
  takeaway: string; // one line: shown under the title and used as the page description
  handsOn?: string; // how long the work with Claude takes, when longer than reading
  blocks: Block[];
  recap: string[]; // three or four sentences, no new claims
  words?: Word[]; // each becomes a hover or tap definition on first use
};

export type Part = {
  slug: string;
  title: string; // a stage on the path
  summary: string;
  blueprint?: boolean; // part of the blueprint: nothing gets built yet
  lessons: Lesson[];
};
