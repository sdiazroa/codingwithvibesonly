import type { Part } from "@/lib/types";

export const build: Part = {
  slug: "build",
  title: "Build",
  summary: "Now you build, one small piece at a time, with a save point after each.",
  lessons: [
    {
      slug: "build-your-first-milestone",
      title: "Build your first milestone",
      takeaway: "Set up save points, then build one milestone. Only one.",
      handsOn: "30 min",
      blocks: [
        { type: "p", text: "This is the fun part, and all your planning pays off here. First, set up save points. Git keeps a copy of your project every time you save, and each save is called a commit. You can always go back, so experimenting is safe." },
        {
          type: "prompt",
          id: "git-setup",
          title: "Set up save points",
          mode: "Manual",
          text: `Set up Git in this project. If Git isn't installed, walk me through installing it, one step at a time.

Make sure passwords, keys and other private files are never saved. Then make the first commit with everything we have so far, and explain in plain language what you did.`,
        },
        { type: "p", text: "Now build. Start in Plan mode so you can check Claude's approach. Once you approve the plan, Claude starts building." },
        {
          type: "prompt",
          id: "first-milestone",
          title: "Build milestone 1",
          mode: "Plan",
          text: `Read CLAUDE.md and everything in docs/. Build milestone 1 from docs/plan.md and nothing else.

Show me your plan first. When you're done, start the app, open it in the preview, and tell me exactly what to check.`,
        },
        { type: "p", text: "Then try it yourself in the preview (**Cmd+Shift+B** on Mac, **Ctrl+Shift+B** on Windows). You're the first user, so click everything." },
      ],
      recap: [
        "Git gives you save points, so experimenting is safe.",
        "Build one milestone at a time, starting in Plan mode.",
        "Always try it yourself before moving on.",
      ],
      words: [
        { term: "Git", meaning: "A tool that saves the full history of a project, so you can go back to any earlier version." },
        { term: "commit", meaning: "One save point in Git, with a short note about what changed." },
      ],
    },
    {
      slug: "the-build-loop",
      title: "The build loop",
      takeaway: "Plan, build, look, save. Repeat this small loop until Version 1 is done.",
      blocks: [
        { type: "p", text: "Everything from here is the same four steps. Small loops keep problems small, because you always know what just changed." },
        {
          type: "flow",
          loop: true,
          items: [
            { title: "Plan", note: "Claude proposes. You check." },
            { title: "Build", note: "One milestone only." },
            { title: "Look", note: "Try it in the preview." },
            { title: "Save", note: "Commit and update the plan." },
          ],
        },
        { type: "p", text: "Start a new session for each milestone. Your docs carry everything over, and a fresh session stays focused." },
        {
          type: "prompt",
          id: "next-milestone",
          title: "Start the next milestone",
          mode: "Plan",
          text: `Read CLAUDE.md and docs/plan.md, then look at what's already built. Propose how to build the next unfinished milestone, reusing what exists. Build nothing outside that milestone.

When you're done, start the app and tell me exactly what to check.`,
        },
        {
          type: "prompt",
          id: "save-point",
          title: "Save your progress",
          text: "This works. Check it against docs/design.md, mark the milestone done in docs/plan.md, note any decisions in docs/decisions.md, and make a commit with a clear message.",
        },
        { type: "rule", title: "Got a new idea while building?", text: "You will. Add it to the Later list in docs/product.md and finish the milestone first." },
      ],
      recap: [
        "The loop is plan, build, look, save.",
        "Small steps make problems easy to find.",
        "New ideas go on the Later list until the milestone is done.",
      ],
    },
    {
      slug: "when-something-breaks",
      title: "When something breaks",
      takeaway: "Things will break, and that's normal. Find the cause before you fix anything.",
      blocks: [
        { type: "p", text: "Breaking things is part of building, for everyone, at every level. The mistake to avoid is asking Claude to \"just fix it\" over and over. Each guess adds more code on top of the problem." },
        {
          type: "flow",
          items: [
            { title: "Describe it", note: "What you expected, and what happened." },
            { title: "Find the cause", note: "Nothing changes yet." },
            { title: "Smallest fix", note: "Change as little as possible." },
            { title: "Check it", note: "Try it again yourself." },
          ],
        },
        {
          type: "prompt",
          id: "debug",
          title: "Fix a bug properly",
          mode: "Plan",
          text: `Something's wrong.

What I did: [WHAT YOU CLICKED OR TYPED]
What I expected: [WHAT SHOULD HAVE HAPPENED]
What happened: [WHAT HAPPENED INSTEAD, PLUS ANY ERROR MESSAGE OR SCREENSHOT]

Find the cause before changing anything. Explain it in plain language, then propose the smallest fix.`,
        },
        { type: "p", text: "If two fixes in a row don't work, stop. Go back to your last save point and start a new session." },
        {
          type: "prompt",
          id: "go-back",
          title: "Go back to a save point",
          mode: "Manual",
          text: "These changes aren't working. Show me my recent commits in plain language, and tell me what I would lose by going back to the last good one. Don't do anything until I confirm.",
        },
      ],
      recap: [
        "Breaking things is a normal part of building.",
        "Ask for the cause first, then the smallest fix.",
        "After two failed fixes, go back to a save point and start fresh.",
      ],
    },
  ],
};
