import { answerQuestions, approve, newPlanSession, pastePrompt } from "@/content/patterns";
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
        { type: "p", text: "Claude won't remember yesterday. Your documents and commits will." },
        newPlanSession(),
        pastePrompt({
          type: "prompt",
          id: "start-session",
          title: "Start a session",
          mode: "Plan",
          text: "Read CLAUDE.md and docs/plan.md, and check the recent commits. Tell me where we left off and the one thing to do today. Don't change anything yet.",
        }),
        { type: "step", text: "Work on that one thing." },
        { type: "step", text: "Before you stop, type \"Update the docs and commit.\"" },
      ],
    },
    {
      slug: "grow-with-your-users",
      title: "Grow with your users",
      description: "Launching is the start. Real people show you what to build next.",
      blocks: [
        { type: "step", text: "Show the app to five people and watch them use it without helping. Write down what you see." },
        newPlanSession(),
        {
          type: "step",
          text: "Click **Copy**, paste into the prompt box, and replace the brackets with your notes.",
          then: [
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
        answerQuestions,
        approve("Claude updates your documents."),
        { type: "p", text: "Every new feature gets the same treatment: a small blueprint first, then the build." },
      ],
    },
  ],
};
