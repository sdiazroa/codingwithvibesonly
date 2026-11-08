import type { Block } from "@/lib/types";

// The same few steps every time a student works with Claude, so it quickly becomes second nature.
export const newPlanSession = (): Block => ({
  type: "step",
  text: "In the Claude app, click **+ New**. Check that your project folder is selected, and set the mode to **Plan**.",
});

export const pastePrompt = (prompt: Block): Block => ({
  type: "step",
  text: "Click **Copy**, paste into the prompt box and press Enter.",
  then: [prompt],
});

export const answerQuestions: Block = {
  type: "step",
  text: "Answer Claude's questions one at a time. Short answers are fine, and \"I don't know\" is a good answer. Claude will suggest options.",
};

export const approve = (result: string): Block => ({
  type: "step",
  text: `Read the plan Claude shows you. To change something, choose the option to keep planning and type what you'd change. When it looks right, approve it. ${result}`,
});

export const readFile = (file: string): Block => ({
  type: "step",
  text: `Click \`${file}\` in the chat to read it. If something's wrong, tell Claude what to change.`,
});
