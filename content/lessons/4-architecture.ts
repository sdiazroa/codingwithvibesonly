import type { Part } from "@/lib/types";

export const architecture: Part = {
  slug: "architecture",
  title: "Architecture",
  summary: "Choose how it works under the hood, and set the rules for building.",
  blueprint: true,
  lessons: [
    {
      slug: "what-architecture-means",
      title: "What architecture means",
      takeaway: "Architecture is how the parts of an app fit together. You don't need to code it, but you do need to understand it.",
      blocks: [
        { type: "p", text: "Almost every app is made of the same few parts. If you know what each one does, you can follow what Claude proposes and ask good questions." },
        {
          type: "layers",
          items: [
            { title: "Front end", note: "What people see and tap. The rooms of the house." },
            { title: "Back end", note: "The logic that runs out of sight. The wiring and plumbing." },
            { title: "Database", note: "Where information is kept. The storage room." },
            { title: "Hosting", note: "Where the app lives online. The land under the house." },
            { title: "Outside services", note: "Login, payments and email from other companies. The utilities." },
          ],
          caption: "The parts of an app. Simple apps don't need all of them.",
        },
        { type: "p", text: "These choices matter because they're the hardest to change later. Repainting a screen takes minutes. Moving all your users to a new database takes planning." },
        { type: "myth", title: "Myth: serious apps need complicated technology.", text: "Big companies' setups get a lot of attention, so this one is easy to pick up. Most new apps do better with the simplest setup that works, and it can grow when there's a reason to." },
      ],
      recap: [
        "Most apps have a front end, a back end, a database, hosting and outside services.",
        "Simple apps use fewer of these parts.",
        "These decisions are the hardest to change later, so make them early.",
      ],
      words: [
        { term: "Front end", meaning: "The part of an app people see and tap." },
        { term: "Back end", meaning: "The part that runs on a server, out of sight, and handles the logic." },
        { term: "Database", meaning: "Where an app stores information so it's still there tomorrow." },
        { term: "Hosting", meaning: "The service that keeps an app online." },
      ],
    },
    {
      slug: "choose-your-architecture",
      title: "Choose your architecture",
      takeaway: "Your goals decide the architecture. Have Claude recommend the simplest one that meets them, and explain why.",
      handsOn: "20 min",
      blocks: [
        { type: "p", text: "What you're building decides how much architecture you need. Each new need adds a part, and each part adds cost and things that can break." },
        {
          type: "flow",
          items: [
            { title: "Shows information", note: "Front end and hosting" },
            { title: "Remembers each person", note: "Add login and a database" },
            { title: "Takes money", note: "Add a payment service" },
          ],
          caption: "Add a part only when your goal needs it.",
        },
        {
          type: "prompt",
          id: "architecture",
          title: "Choose the architecture",
          mode: "Plan",
          saves: "docs/architecture.md",
          text: `Act as a senior software architect. I'm not technical, so explain everything in plain language.

Read docs/product.md and docs/design.md. Then ask me what you need to know, one question at a time: whether people need accounts, what data we store, whether we take payments, how many users to expect in the first year, and my monthly budget.

Recommend the simplest architecture that meets these goals. Prefer popular, well-documented tools. Include:
- a simple diagram, and what each part does
- the monthly cost today and at 1,000 users
- how people's data is kept safe
- one alternative, and why you didn't pick it
- what would have to change if we grew 100 times

Don't write any app code. Save this as docs/architecture.md.`,
        },
        { type: "p", text: "Then ask Claude to argue against itself. You'll learn more from this than from the recommendation." },
        {
          type: "prompt",
          id: "architecture-challenge",
          title: "Stress-test the plan",
          mode: "Plan",
          saves: "docs/architecture.md",
          text: "Now challenge your own recommendation. What's most likely to cause us pain in six months? What are we choosing that would be hard to undo? Update docs/architecture.md if this changes anything.",
        },
      ],
      recap: [
        "Your goals decide what the app needs, and every extra part has a cost.",
        "Ask for the simplest setup that works, with popular tools.",
        "Have Claude challenge its own recommendation before you accept it.",
      ],
      words: [{ term: "architecture", meaning: "How the parts of an app fit together and talk to each other." }],
    },
    {
      slug: "finish-the-blueprint",
      title: "Finish the blueprint",
      takeaway: "Give Claude its house rules and a step-by-step plan. Then check that the foundation is ready.",
      handsOn: "10 min",
      blocks: [
        { type: "p", text: "Claude starts each new session fresh. A file called `CLAUDE.md` is how it remembers your project: it's read at the start of every session. A plan breaks the build into milestones: pieces small enough to check." },
        {
          type: "prompt",
          id: "rulebook",
          title: "Write the house rules and the plan",
          mode: "Plan",
          saves: "CLAUDE.md and docs/plan.md",
          text: `Read everything in docs/. Don't build anything yet.

1. Create a short CLAUDE.md that says what this app is, points to each file in docs/, and sets these rules:
- read the relevant docs before changing anything
- follow docs/design.md and reuse existing components
- follow docs/architecture.md, and ask me before adding a new tool or service
- only build what's on the Version 1 list in docs/product.md
- keep the code simple and easy to change
- explain things to me in plain language, and ask when something is unclear
- when a decision changes, update the docs and note why in docs/decisions.md

2. Break Version 1 into 3 to 6 milestones in docs/plan.md. Each one should be small and something I can see and test myself. Put the riskiest or most important part first.`,
        },
        {
          type: "checklist",
          id: "blueprint-check",
          title: "Blueprint check",
          items: [
            "I can say who this is for and what problem it solves in two sentences.",
            "Version 1 is small, and I've written down what we're not doing.",
            "Every screen has one job and one main action.",
            "I've seen a mockup and I like where it's going.",
            "I can explain the architecture to a friend, including what it costs.",
            "The plan is split into small milestones I can test.",
          ],
          done: "Your foundation is ready. Time to build.",
        },
      ],
      recap: [
        "CLAUDE.md gives every session the same rules.",
        "A plan breaks the build into small pieces you can test.",
        "Finish the Blueprint check before you start building.",
      ],
      words: [{ term: "milestones", meaning: "Small, finished pieces of the app that you can see and test." }],
    },
  ],
};
