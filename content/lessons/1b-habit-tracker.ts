import { approve, newPlanSession, pastePrompt, readFile } from "@/content/patterns";
import type { Part } from "@/lib/types";

// A guided first build. The prompts are specific on purpose, so everyone gets a working app.
export const habitTracker: Part = {
  slug: "habit-tracker",
  title: "Build a habit tracker",
  lessons: [
    {
      slug: "plan-the-habit-tracker",
      title: "Plan the habit tracker",
      description: "Practice the whole process on a small app, starting with a one-page plan.",
      blocks: [
        { type: "p", text: "Let's build one small app together, from start to finish. You'll see how it all works before you try your own idea." },
        { type: "p", text: "Good apps start on paper, so Claude writes the plan first." },
        newPlanSession(),
        pastePrompt({
          type: "prompt",
          id: "habit-product",
          title: "Plan the habit tracker",
          mode: "Plan",
          text: `I'm learning to build apps by making a simple habit tracker. Don't ask me questions and don't write any code. Save a one-page plan as docs/product.md:

Who it's for: someone who wants to keep a few daily habits.
Problem: it's easy to forget a habit and lose track of how long you've kept it up.
Version 1: add a habit, check it off for today, see how many days in a row, delete a habit.
Later: reminders and charts.
Not doing: accounts and payments.`,
        }),
        approve("Claude creates the document."),
        readFile("docs/product.md"),
      ],
    },
    {
      slug: "design-the-habit-tracker",
      title: "Design the habit tracker",
      description: "Decide what the screen does and how it looks, before any code.",
      blocks: [
        { type: "p", text: "This app needs one screen with one job: checking off today's habits. Writing that down keeps the design simple." },
        newPlanSession(),
        pastePrompt({
          type: "prompt",
          id: "habit-design",
          title: "Design the screen",
          mode: "Plan",
          text: `Read docs/product.md. Don't ask me questions and don't write any code. Save a short design as docs/design.md:

Screen: one screen, and its main action is checking off a habit.
Each habit shows its name, a large checkbox and how many days in a row.
Empty: when there are no habits, show a friendly line and the box to add one.
Look: calm and clean, one accent color, plenty of space, large text. It works on phones and computers.`,
        }),
        approve("Claude creates the document."),
        readFile("docs/design.md"),
      ],
    },
    {
      slug: "choose-how-it-works",
      title: "Choose how it works",
      description: "Pick the simplest setup that does the job, and give Claude its rules.",
      blocks: [
        { type: "p", text: "Architecture is how the parts of an app fit together. This one is simple: one web page, with habits saved in your browser. There's no database and nothing to install." },
        newPlanSession(),
        pastePrompt({
          type: "prompt",
          id: "habit-architecture",
          title: "Set the architecture and rules",
          mode: "Plan",
          text: `Read everything in docs/. Don't ask me questions and don't write any app code yet.

Save docs/architecture.md: one index.html file using plain HTML, CSS and JavaScript, with no packages to install. Habits are saved in the browser with localStorage.

Save docs/plan.md with two milestones: 1) add, check off and delete habits, 2) days in a row.

Create a short CLAUDE.md that says what this app is, points to the files in docs/, and says to read them before changing anything, follow the design, and keep the code simple.`,
        }),
        approve("Claude creates the files."),
        readFile("docs/plan.md"),
      ],
    },
    {
      slug: "build-the-habit-tracker",
      title: "Build it",
      description: "Claude builds the app from your plan, and you try it yourself.",
      blocks: [
        { type: "p", text: "The plan is done, so now Claude can build." },
        newPlanSession(),
        pastePrompt({
          type: "prompt",
          id: "habit-build",
          title: "Build the app",
          mode: "Plan",
          text: `Read CLAUDE.md and everything in docs/. Build both milestones from docs/plan.md in index.html, and follow docs/design.md. Then tell me how to open it.`,
        }),
        approve("Claude writes the code."),
        { type: "step", text: "Click `index.html` in the chat. It opens in the app's browser. Yours won't look exactly like this, because Claude makes its own choices.", then: [{ type: "image", src: "/lessons/habit-tracker.jpg", alt: "The finished habit tracker: a box to add a habit, and a list of habits with checkboxes and days in a row." }] },
        { type: "step", text: "Try it. Add a habit called **Read**, check it off and refresh the page. It should still be there." },
      ],
    },
    {
      slug: "change-the-habit-tracker",
      title: "Change it",
      description: "Practice asking for changes, and undoing them.",
      blocks: [
        { type: "p", text: "Most of vibe coding is this part: look at what you have, say what to change, and look again." },
        { type: "step", text: "In the same session, set the mode to **Manual**, so you approve each change." },
        { type: "step", text: "Copy this, paste it and press Enter. When Claude shows the change, choose **Yes**.", then: [{ type: "command", label: "A small change", text: "At the top of the page, show how many habits are done today, like \"2 of 3 done today.\"" }] },
        { type: "step", text: "Look at the page in the app's browser. If you don't see the change, click `index.html` again." },
        { type: "step", text: "Now change your mind. Claude can undo anything you haven't saved yet.", then: [{ type: "command", label: "Undo it", text: "I don't like that. Undo that last change." }] },
        { type: "step", text: "Now make a change of your own. Pick a color, or a new line of text, and be specific." },
      ],
    },
    {
      slug: "save-the-habit-tracker",
      title: "Save your work",
      description: "Make a save point, so you can always come back to this version.",
      blocks: [
        { type: "p", text: "Git saves your project at each step, and each save is called a commit. You can always go back to one." },
        { type: "step", text: "In the same session, copy this, paste it and press Enter. Choose **Yes** when Claude asks to run a command. On a Mac, if a window offers to install developer tools, click **Install**.", then: [{ type: "prompt", id: "habit-save", title: "Save your work", text: "Set up Git in this project, and make a commit called \"First working version.\" If Git isn't installed, walk me through installing it, one step at a time." }] },
        { type: "p", text: "That's the whole loop: plan, design, choose how it works, build, change, save. Next, you'll do it with your own idea and more thinking at each step." },
      ],
      words: [
        { term: "Git", meaning: "A tool that saves the full history of a project." },
        { term: "commit", meaning: "One save point in Git." },
      ],
    },
  ],
};
