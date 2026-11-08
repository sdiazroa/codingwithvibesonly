import type { Part } from "@/lib/types";

export const design: Part = {
  slug: "design",
  title: "Design",
  lessons: [
    {
      slug: "give-every-screen-one-job",
      title: "Give every screen one job",
      description: "Each screen does one job and has one main action.",
      blocks: [
        { type: "p", text: "Map the shortest path from opening the app to getting what you came for. Each screen gets one job and one main action." },
        { type: "flow", items: ["Home", "Add your run", "This week's plan"] },
        {
          type: "prompt",
          id: "user-flow",
          title: "Map the screens",
          mode: "Plan",
          text: `Act as a senior product designer. Read docs/product.md and map the shortest path from a person's first visit to the moment they get value.

For each screen, write its one job, its one main action, and what it shows when it's empty, loading or has an error. Tell me if a screen can go. Save this as docs/design.md.`,
        },
      ],
    },
    {
      slug: "set-the-look",
      title: "Set the look",
      description: "Write down a few design rules so the app looks like one product as it grows.",
      blocks: [
        { type: "p", text: "Without rules, Claude makes a fresh choice on every screen. Write the rules once, and everything stays consistent." },
        { type: "p", text: "Screenshot two or three apps you like and drag them into Claude Code." },
        {
          type: "prompt",
          id: "design-system",
          title: "Set the design rules",
          mode: "Plan",
          text: `Act as a senior product designer. Read docs/product.md and docs/design.md, and look at the screenshots I attached. Ask me how the app should feel, one question at a time.

Then write simple rules: a few colors, a few text sizes, a spacing scale, one button, and how it adapts to phones. Every word, button and visual has to earn its place. Add the rules and a short review checklist to docs/design.md.`,
        },
      ],
    },
    {
      slug: "see-it-before-you-build-it",
      title: "See it before you build it",
      description: "A mockup shows you what's wrong while it's still cheap to change.",
      blocks: [
        { type: "p", text: "A mockup is a picture of a screen that you can click, with nothing behind it." },
        {
          type: "prompt",
          id: "mockup",
          title: "Make a mockup",
          mode: "Manual",
          text: `Read docs/product.md and docs/design.md. Make a throwaway mockup of the main screen in one file, mockups/main.html, with fake data. Don't start the real app. Open it in the preview.

When I'm happy with it, add what we decided to docs/design.md.`,
        },
        { type: "p", text: "Then react. Claude can't guess what's in your head, so be specific." },
        {
          type: "compare",
          left: { title: "Hard to act on", items: ["Make it pop"] },
          right: { title: "Easy to act on", items: ["The Save button gets lost. Make it the strongest thing on the screen."] },
        },
      ],
    },
  ],
};
