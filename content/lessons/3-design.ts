import type { Part } from "@/lib/types";

export const design: Part = {
  slug: "design",
  title: "Design",
  summary: "Map the screens, set the look, and see it before you build it.",
  blueprint: true,
  lessons: [
    {
      slug: "give-every-screen-one-job",
      title: "Give every screen one job",
      takeaway: "Map the path a person takes through the app. Each screen does one job and has one main action.",
      handsOn: "10 min",
      blocks: [
        { type: "p", text: "Good design starts before anyone picks a color. First, map the user flow: how a person gets from opening the app to getting what they came for. Fewer screens is almost always better." },
        {
          type: "flow",
          items: [
            { title: "Home", note: "Main action: Start" },
            { title: "Add your run", note: "Main action: Save" },
            { title: "This week's plan", note: "The moment it pays off" },
          ],
          caption: "A user flow for the running app. Three screens, one main action each.",
        },
        { type: "p", text: "New builders tend to design only the happy version. Real screens also get empty, slow and broken, so plan for those now." },
        {
          type: "prompt",
          id: "user-flow",
          title: "Map the screens",
          mode: "Plan",
          saves: "docs/design.md",
          text: `Act as a senior product designer. Read docs/product.md.

Map the shortest path from a person's first visit to the moment they get value, using as few screens as possible. For each screen, write:
- its one job, in a sentence
- its one main action
- what it shows when it's empty, loading or has an error

Draw the flow as a simple diagram. Tell me about any screen you think we can remove. Save it as docs/design.md.`,
        },
      ],
      recap: [
        "Map the path through the app before you think about how it looks.",
        "Each screen has one job and one main action.",
        "Plan the empty, loading and error versions too.",
      ],
      words: [
        { term: "user flow", meaning: "The path a person takes through an app to get something done." },
        { term: "empty", meaning: "How a screen looks before there's anything to show, like an empty list on day one." },
      ],
    },
    {
      slug: "set-the-look",
      title: "Set the look",
      takeaway: "Write down a few design rules once. That's what keeps the app looking like one product as it grows.",
      handsOn: "15 min",
      blocks: [
        { type: "p", text: "Without rules, Claude makes a fresh choice on each screen, and you end up with three kinds of button. A short design system stops that." },
        {
          type: "cards",
          items: [
            { title: "Color", note: "A few colors, each with one job." },
            { title: "Type", note: "One or two fonts, and a few sizes." },
            { title: "Spacing", note: "A set scale, so gaps look deliberate." },
            { title: "Components", note: "One button, one card, one form field." },
          ],
          caption: "What goes in a design system.",
        },
        { type: "p", text: "Before you paste the prompt, find **two or three apps you like** and take screenshots. You can drag them straight into Claude Code. Showing works better than describing." },
        {
          type: "prompt",
          id: "design-system",
          title: "Create the design system",
          mode: "Plan",
          saves: "docs/design.md",
          text: `Act as a senior product designer. Read docs/product.md and docs/design.md. I've attached screenshots of apps I like.

Ask me a few questions, one at a time, about how this app should feel. Then write simple design rules:
- colors, and what each one is for
- fonts and text sizes
- a spacing scale
- how buttons, cards and form fields look, including hover, focus and disabled
- how it adapts to phone and desktop
- accessibility basics: readable contrast and large tap targets

Avoid the generic AI look: no gradient blobs, no floating cards, not everything centered. Add a short review checklist we can use for every new screen. Add all of this to docs/design.md.`,
        },
      ],
      recap: [
        "Rules are what keep an app consistent as it grows.",
        "Show Claude screenshots of what you like.",
        "Include a review checklist for every new screen.",
      ],
      words: [{ term: "design system", meaning: "The shared rules and parts that make every screen look like the same product." }],
    },
    {
      slug: "see-it-before-you-build-it",
      title: "See it before you build it",
      takeaway: "A mockup shows you what's wrong while it's still cheap to change.",
      handsOn: "15 min",
      blocks: [
        { type: "p", text: "Reading about a screen and seeing it are very different things. Ask Claude for a mockup of the most important screen: a picture you can click, with fake data and nothing behind it." },
        {
          type: "prompt",
          id: "mockup",
          title: "Make a throwaway mockup",
          mode: "Manual",
          text: `Read docs/product.md and docs/design.md. Make a throwaway mockup of the main screen in one HTML file, mockups/main.html, at phone and desktop sizes.

This is only for looking at. Use fake data, with no login and no database. Don't start the real app. Open it in the preview so I can see it.`,
        },
        { type: "p", text: "Now react to it. Claude can't guess what's in your head, so be specific." },
        {
          type: "compare",
          left: { title: "Hard to act on", items: ["Make it pop", "It feels off", "Make it more modern"] },
          right: { title: "Easy to act on", items: ["The Save button gets lost. Make it the strongest thing on the screen.", "The text feels cramped. Add more space between sections.", "Use less color, like the second screenshot I sent."] },
        },
        { type: "p", text: "When you land on something you like, make sure the rules behind it are written down." },
        {
          type: "prompt",
          id: "mockup-rules",
          title: "Save what you learned",
          saves: "docs/design.md",
          text: "Update docs/design.md with every design decision we just made, so future screens follow them.",
        },
      ],
      recap: [
        "A mockup is a drawing you can click. It isn't the app.",
        "Specific feedback gets better results than general feelings.",
        "Write what you decided into your design rules.",
      ],
      words: [{ term: "mockup", meaning: "A realistic picture of a screen with nothing working behind it." }],
    },
  ],
};
