import { approve, newPlanSession, pastePrompt } from "@/content/patterns";
import type { Block, Part } from "@/lib/types";

const checkItYourself: Block = {
  type: "step",
  text: "Click **Browser** at the top of the session to see your app (**Command+Shift+B** on Mac, **Ctrl+Shift+B** on Windows). Click everything. You're the first user.",
  then: [{ type: "mock", show: "browser" }],
};

export const build: Part = {
  slug: "build",
  title: "Build",
  lessons: [
    {
      slug: "build-your-first-milestone",
      title: "Build your first milestone",
      description: "Set up save points, then build one milestone. Only one.",
      blocks: [
        { type: "p", text: "Now you build. Git saves your project at each step as a commit, so you can always go back." },
        newPlanSession(),
        pastePrompt({
          type: "prompt",
          id: "first-milestone",
          title: "Build milestone 1",
          mode: "Plan",
          text: `Set up Git in this project, and walk me through installing it if needed. Make sure passwords and keys are never saved. Commit what we have.

Then read CLAUDE.md and docs/, and build milestone 1 from docs/plan.md and nothing else. Show me your plan first. When you're done, open the app in the preview and tell me what to check.`,
        }),
        approve("Claude starts building."),
        { type: "step", text: "Claude may ask permission to run commands. Read each one and allow it. If you're unsure, ask what it does. On a Mac, if a window offers to install developer tools, click **Install**." },
        checkItYourself,
        { type: "step", text: "If something's off, tell Claude. When it works, say \"This works. Commit it.\"" },
      ],
      words: [
        { term: "Git", meaning: "A tool that saves the full history of a project." },
        { term: "commit", meaning: "One save point in Git." },
      ],
    },
    {
      slug: "the-build-loop",
      title: "The build loop",
      description: "Plan, build, look, save. Repeat until Version 1 is done.",
      blocks: [
        { type: "flow", items: ["Plan", "Build", "Look", "Save"] },
        { type: "p", text: "Repeat this for each milestone, in a new session. Your documents carry everything over." },
        newPlanSession(),
        pastePrompt({
          type: "prompt",
          id: "next-milestone",
          title: "Build the next milestone",
          mode: "Plan",
          text: `Read CLAUDE.md and docs/plan.md, and look at what's built. Propose how to build the next milestone, reusing what exists. Build nothing else. Open the preview and tell me what to check.

When I say it works, mark it done in docs/plan.md and commit.`,
        }),
        approve("Claude starts building."),
        checkItYourself,
        { type: "step", text: "When it works, say \"This works.\" Claude saves your progress." },
        { type: "p", text: "New idea while building? Add it to the Later list and finish the milestone." },
      ],
    },
    {
      slug: "when-something-breaks",
      title: "When something breaks",
      description: "Things will break. Find the cause before you fix anything.",
      blocks: [
        { type: "p", text: "Things will break, and that's normal. Find the cause first, because every guess adds more code on top of the problem." },
        { type: "step", text: "Set the mode to **Plan**." },
        {
          type: "step",
          text: "Click **Copy**, paste into the prompt box, and replace the parts in brackets. Add a screenshot if you have one.",
          then: [
            {
              type: "prompt",
              id: "debug",
              title: "Fix a bug",
              mode: "Plan",
              text: `Something's wrong.

What I did: [WHAT YOU DID]
What I expected: [WHAT SHOULD HAVE HAPPENED]
What happened: [WHAT HAPPENED]

Find the cause before changing anything. Explain it in plain language, then propose the smallest fix.`,
            },
          ],
        },
        approve("Claude makes the fix."),
        { type: "step", text: "Try it again yourself. If two fixes don't work, say \"Go back to my last commit,\" and start a new session." },
      ],
    },
  ],
};
