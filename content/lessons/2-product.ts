import { answerQuestions, approve, newPlanSession, pastePrompt, readFile } from "@/content/patterns";
import type { Part } from "@/lib/types";

export const product: Part = {
  slug: "product",
  title: "Product",
  group: "Your own app",
  lessons: [
    {
      slug: "define-the-problem",
      title: "Define the problem",
      description: "A good app starts with a specific person and a specific problem.",
      blocks: [
        { type: "p", text: "Now your own idea. This time, Claude interviews you before anything gets built, and writes three short documents: product, design and architecture. Moving a wall on paper is free. Moving it later is a project." },
        { type: "p", text: "Good products start with a person who has a problem." },
        {
          type: "compare",
          left: { title: "Vague", items: ["A fitness app for everyone"] },
          right: { title: "Clear", items: ["Tells runners coming back from injury how far to run this week"] },
        },
        { type: "step", text: "Create a new folder for your app, the same way you did for the habit tracker. In the Claude app, open it from the folder menu under the prompt box." },
        newPlanSession(),
        pastePrompt({
          type: "prompt",
          id: "product-interview",
          title: "The product interview",
          mode: "Plan",
          text: `I have an idea for an app and I'm not technical. Act as a senior product manager and interview me, one question at a time:
- who it's for, and the problem they have today
- how they deal with that problem now
- what success looks like three months after launch

Push back if I'm vague. Don't write any code. When we're done, save a one-page summary as docs/product.md.`,
        }),
        answerQuestions,
        approve("Claude creates the document."),
        {
          type: "step",
          text: "Click `docs/product.md` in the chat to read it. If something's wrong, tell Claude what to change.",
          then: [{ type: "mock", show: "file-link" }],
        },
        {
          type: "dive",
          title: "Don't have an idea yet?",
          blocks: [
            { type: "p", text: "Look for a small frustration in your own day. A habit tracker or a calculator for work is a better first project than a social network or a marketplace." },
            {
              type: "prompt",
              id: "find-an-idea",
              title: "Find an idea",
              mode: "Plan",
              text: "Help me find a good first app to build. Ask me one question at a time about my work, my routines and what annoys me. Then suggest three small ideas I could finish in a weekend, and tell me which you'd pick and why.",
            },
          ],
        },
      ],
    },
    {
      slug: "cut-to-the-smallest-version",
      title: "Cut to the smallest version",
      description: "Version 1 should do one job well. Everything else can wait.",
      blocks: [
        { type: "p", text: "Every feature is something to design, build and fix forever. Start with the smallest version that solves the problem. Real users will tell you what comes next." },
        newPlanSession(),
        pastePrompt({
          type: "prompt",
          id: "scope",
          title: "Cut the scope",
          mode: "Plan",
          text: `Read docs/product.md. List every feature this app could have, and sort them into Version 1, Later and Not doing.

Version 1 is the smallest version that solves the core problem for one kind of person. For anything I want to keep in it, ask what breaks if we leave it out. Add the lists to docs/product.md.`,
        }),
        answerQuestions,
        approve("Claude adds the lists to your document."),
        readFile("docs/product.md"),
      ],
    },
  ],
};
