import type { Part } from "@/lib/types";

export const grow: Part = {
  slug: "grow",
  title: "Grow",
  lessons: [
    {
      slug: "your-daily-routine",
      title: "Your daily routine",
      description: "Start each session by catching up. End it by writing down what changed.",
      blocks: [
        { type: "p", text: "Claude won't remember yesterday. Your docs and commits will." },
        {
          type: "prompt",
          id: "start-session",
          title: "Start a session",
          mode: "Plan",
          text: "Read CLAUDE.md and docs/plan.md, and check the recent commits. Tell me where we left off and the one thing to do today. Don't change anything yet.",
        },
        { type: "p", text: "Before you stop, ask Claude to update the docs and commit." },
      ],
    },
    {
      slug: "audit-your-project",
      title: "Audit your project",
      description: "Every so often, ask Claude to inspect the whole project, so small problems don't pile up.",
      blocks: [
        { type: "p", text: "Fast building creates drift: a second kind of button, the same logic written twice. Run an audit every few milestones and before launch." },
        {
          type: "prompt",
          id: "audit",
          title: "Audit the project",
          mode: "Plan",
          text: `Audit this project as a senior designer and engineer. Don't change anything yet. I'm not technical, so use plain language.

Design: check every screen against docs/design.md, at phone and desktop size. Is it consistent? Does every word, button and visual earn its place?
Code: is it clean, and easy to change and grow? Look for duplication, dead code and drift from docs/architecture.md.
Security: look for exposed keys, data people shouldn't see, and outdated packages.

Rank what you find by how much it matters, and recommend the top three.`,
        },
        { type: "p", text: "Fix the top problem, then add a rule to `CLAUDE.md` so it doesn't come back." },
      ],
    },
    {
      slug: "grow-with-your-users",
      title: "Grow with your users",
      description: "Launching is the start. Real people show you what to build next.",
      blocks: [
        { type: "p", text: "Show the app to five people and watch them use it without helping." },
        { type: "p", text: "Then give every new feature the same treatment: a small blueprint first, then the build." },
        {
          type: "prompt",
          id: "new-feature",
          title: "Plan what's next",
          mode: "Plan",
          text: `Here's what I learned from users: [YOUR NOTES]

Read CLAUDE.md and docs/. Group this by the underlying problem, then recommend one thing to build next and one thing not to build. Interview me, one question at a time, about who needs it and why.

Update the docs and add small milestones to docs/plan.md. Don't build anything yet.`,
        },
      ],
    },
  ],
};
