import { answerQuestions, approve, newPlanSession, pastePrompt, readFile } from "@/content/patterns";
import type { Part } from "@/lib/types";

export const architecture: Part = {
  slug: "architecture",
  title: "Architecture",
  lessons: [
    {
      slug: "what-architecture-means",
      title: "What architecture means",
      description: "Architecture is how the parts of an app fit together, and it's the foundation of everything you build.",
      blocks: [
        { type: "p", text: "Architecture is how the parts of an app fit together. It's the foundation, and the hardest thing to change later." },
        {
          type: "rows",
          items: [
            { title: "Front end", note: "What people see and tap." },
            { title: "Back end", note: "The logic that runs out of sight." },
            { title: "Database", note: "Where information is kept." },
            { title: "Hosting", note: "Where the app lives online." },
            { title: "Outside services", note: "Login, payments and email from other companies." },
          ],
        },
        { type: "p", text: "Simple apps don't need every part." },
      ],
    },
    {
      slug: "choose-your-architecture",
      title: "Choose your architecture",
      description: "Your goals decide the architecture. Ask for the simplest one that meets them.",
      blocks: [
        { type: "p", text: "Your goals decide what you need. Every extra part adds cost and something else that can break, so ask for the simplest setup that works." },
        newPlanSession(),
        pastePrompt({
          type: "prompt",
          id: "architecture",
          title: "Choose the architecture",
          mode: "Plan",
          text: `Act as a senior software architect. I'm not technical, so use plain language. Read docs/product.md and docs/design.md. Ask me what you need to know, one question at a time: accounts, what data we store, payments, expected users, and budget.

Recommend the simplest architecture that meets these goals, using popular tools. Include a simple diagram, the monthly cost now and at 1,000 users, how people's data stays safe, and what would change if we grew 100 times.

Then challenge your own recommendation: what's most likely to cause pain in six months? Don't write any app code. Save this as docs/architecture.md.`,
        }),
        answerQuestions,
        approve("Claude creates the document."),
        readFile("docs/architecture.md"),
      ],
    },
    {
      slug: "finish-the-blueprint",
      title: "Finish the blueprint",
      description: "Give Claude its house rules and a step-by-step plan, then check that you're ready to build.",
      blocks: [
        { type: "p", text: "Claude starts every session fresh. `CLAUDE.md` is how it remembers your project, and a plan breaks the build into milestones." },
        newPlanSession(),
        pastePrompt({
          type: "prompt",
          id: "rulebook",
          title: "Write the rules and the plan",
          mode: "Plan",
          text: `Read everything in docs/. Don't build anything yet.

Create a short CLAUDE.md that says what this app is, points to each file in docs/, and sets these rules:
- read the docs before changing anything
- follow docs/design.md and reuse what exists
- ask me before adding a new tool or service
- only build what's in Version 1
- keep the code simple, and explain things in plain language
- when a decision changes, update the docs

Then break Version 1 into 3 to 6 small milestones I can see and test, in docs/plan.md.`,
        }),
        approve("Claude creates both files."),
        { type: "step", text: "Before you build, make sure you can check all of these:" },
        {
          type: "checklist",
          id: "blueprint-check",
          items: [
            "I can explain who this is for in two sentences.",
            "Version 1 is small.",
            "Every screen has one job.",
            "I've seen a mockup I like.",
            "I can explain the architecture and what it costs.",
          ],
          done: "Your foundation is ready. Time to build.",
        },
      ],
      words: [{ term: "milestones", meaning: "Small, finished pieces of the app that you can see and test." }],
    },
  ],
};
