import type { Part } from "@/lib/types";

export const product: Part = {
  slug: "product",
  title: "Product",
  summary: "Get clear on who you're building for, and what the first version does.",
  blueprint: true,
  lessons: [
    {
      slug: "why-the-blueprint-comes-first",
      title: "Why the blueprint comes first",
      takeaway: "Changing a plan takes a minute. Changing a built app takes much longer. So get the plan right first.",
      blocks: [
        { type: "p", text: "Nobody builds a house by laying bricks and seeing what happens. Moving a wall on paper is free. Moving it once the house is standing is a project." },
        { type: "house", caption: "Each stage rests on the one below it. Building comes last." },
        { type: "p", text: "Apps work the same way. Claude can write code faster than you can read it, so a weak idea turns into a lot of code very quickly. Then every fix sits on top of the last one." },
        { type: "rule", title: "The rule for this course", text: "No building until the blueprint is done. Claude will happily start sooner, so holding this line is your job." },
        { type: "p", text: "The blueprint is a few short documents in your project. Claude writes them with you, and it reads them before every task from then on." },
        {
          type: "files",
          items: [
            { path: "docs/product.md", note: "Who it's for, and what version 1 does" },
            { path: "docs/design.md", note: "The screens, and how they look" },
            { path: "docs/architecture.md", note: "How it works under the hood" },
            { path: "docs/plan.md", note: "The build, in small steps" },
            { path: "CLAUDE.md", note: "The house rules Claude follows" },
          ],
          caption: "Your blueprint, by the end of stage 4.",
        },
      ],
      recap: [
        "Mistakes cost little to fix in a plan and a lot to fix in code.",
        "Your blueprint is a few short documents that Claude reads before every task.",
        "Nothing gets built until the blueprint is done.",
      ],
    },
    {
      slug: "define-the-problem",
      title: "Define the problem",
      takeaway: "A good app starts with a specific person and a specific problem. Let Claude interview you until you have both.",
      handsOn: "15 min",
      blocks: [
        { type: "p", text: "Most ideas start as a feature, like \"an app with a calendar.\" Good products start with a person who has a problem." },
        {
          type: "compare",
          left: { title: "Vague", items: ["A fitness app", "For everyone", "Has lots of features"] },
          right: { title: "Clear", items: ["Tells runners coming back from injury how far to run this week", "For one kind of runner", "Does that one thing well"] },
        },
        {
          type: "dive",
          id: "no-idea-yet",
          title: "Don't have an idea yet?",
          blocks: [
            { type: "p", text: "Skip the world-changing app. Look for a small frustration in your own day, something you do by hand or keep forgetting." },
            {
              type: "compare",
              left: { title: "Hard for a first project", items: ["Social networks", "Marketplaces", "Anything that needs lots of users to work"] },
              right: { title: "A good first project", items: ["A habit tracker", "A calculator for something at work", "A tool for one annoying task"] },
            },
            {
              type: "prompt",
              id: "find-an-idea",
              title: "Find an idea",
              mode: "Plan",
              text: "Help me find a good first app to build. Ask me one question at a time about my work, my routines and what annoys me. Then suggest three small, single-purpose ideas I could finish in a weekend, and tell me which one you'd pick and why. Don't write any code, and don't save anything yet.",
            },
          ],
        },
        { type: "p", text: "Don't try to write this yourself. Switch to Plan mode, paste the prompt and answer honestly. Short answers are fine." },
        {
          type: "prompt",
          id: "product-interview",
          title: "The product interview",
          mode: "Plan",
          saves: "docs/product.md",
          text: `I have an idea for an app and I'm not technical. Act as a senior product manager and interview me about it.

Ask one question at a time and wait for my answer. Cover:
- who it's for, and the problem they have today
- how they deal with that problem now
- why they would switch to this
- what success looks like three months after launch

Push back if I'm vague, and tell me if a simpler idea would work. Don't write any code.

When we're done, summarize it on one page and save it as docs/product.md.`,
        },
        { type: "p", text: "Read the summary when it's done. **Could you explain the idea to a friend in two sentences?** If not, keep talking to Claude." },
      ],
      recap: [
        "Start with a specific person and a specific problem, not a list of features.",
        "Let Claude interview you, and let it push back.",
        "You should be able to explain the idea in two sentences.",
      ],
    },
    {
      slug: "cut-to-the-smallest-version",
      title: "Cut to the smallest version",
      takeaway: "Version 1 should do one job well. Everything else can wait.",
      handsOn: "10 min",
      blocks: [
        { type: "p", text: "Every feature is something to design, build, test and fix forever. Cutting scope gets the app into real hands sooner, and real users will change your mind about the rest." },
        {
          type: "cards",
          items: [
            { title: "Version 1", note: "Without this, the app can't solve the core problem." },
            { title: "Later", note: "Good ideas that can wait for real feedback." },
            { title: "Not doing", note: "Things you've decided against, so they stop coming back." },
          ],
        },
        {
          type: "prompt",
          id: "scope",
          title: "Cut the scope",
          mode: "Plan",
          saves: "docs/product.md",
          text: `Read docs/product.md. List every feature this app could have, then sort them into three groups: Version 1, Later and Not doing.

Version 1 should be the smallest version that solves the core problem for one kind of person. For anything I want to keep in Version 1, ask me: what breaks if we leave this out?

Add the final lists to docs/product.md.`,
        },
        { type: "rule", title: "Say no to Claude, too", text: "Claude likes to suggest extras. If it isn't on the Version 1 list, it goes on Later." },
      ],
      recap: [
        "Every feature has a cost that never goes away.",
        "Sort features into Version 1, Later and Not doing.",
        "Real users will tell you what belongs in Later.",
      ],
      words: [{ term: "scope", meaning: "Everything a version of the product includes. Cutting scope means building less, on purpose." }],
    },
  ],
};
