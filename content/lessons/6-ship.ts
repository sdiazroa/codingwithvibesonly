import { approve, newPlanSession, pastePrompt } from "@/content/patterns";
import type { Part } from "@/lib/types";

export const ship: Part = {
  slug: "ship",
  title: "Ship",
  lessons: [
    {
      slug: "test-and-audit-before-launch",
      title: "Test and audit before launch",
      description: "Check your whole app before anyone else sees it, then keep checking as it grows.",
      blocks: [
        { type: "p", text: "Fast building creates drift: a second kind of button, the same logic written twice. Check everything before anyone else sees it, then run this again every few milestones." },
        newPlanSession(),
        pastePrompt({
          type: "prompt",
          id: "audit",
          title: "Audit the project",
          mode: "Plan",
          text: `Audit this project as a senior designer and engineer. Don't change anything yet. I'm not technical, so use plain language.

Testing: list the main things a person does in this app, try each one, and tell me what breaks.
Design: check every screen against docs/design.md, at phone and desktop size. Is it consistent? Does every word, button and visual earn its place?
Code: is it clean, and easy to change and grow? Look for duplication, dead code and drift from docs/architecture.md.
Security: look for exposed keys, data people shouldn't see, and outdated packages.

Rank what you find by how much it matters, and recommend the top three.`,
        }),
        { type: "step", text: "Read the report. Type \"Fix number one, then add a rule to CLAUDE.md so it doesn't come back.\"" },
        approve("Claude makes the fix."),
      ],
    },
    {
      slug: "back-it-up-on-github",
      title: "Back it up on GitHub",
      description: "GitHub keeps a copy of your project online.",
      blocks: [
        { type: "p", text: "GitHub keeps a copy of your project online, with every save point. It's also how your app gets to the internet." },
        { type: "step", text: "Create a free account.", then: [{ type: "link", label: "Sign up for GitHub", href: "https://github.com/signup" }] },
        { type: "step", text: "In the Claude app, click **+ New**. Check that your project folder is selected, and set the mode to **Manual** so you approve each step." },
        pastePrompt({
          type: "prompt",
          id: "github",
          title: "Put it on GitHub",
          mode: "Manual",
          text: `Put this project on GitHub as a private repository. If the GitHub CLI isn't installed, walk me through installing it and logging in, one step at a time.

Before uploading, check that no passwords or keys would be included, and tell me what you found. Then give me the link.`,
        }),
        { type: "step", text: "A browser window will ask you to log in to GitHub and authorize. Follow it, then return to Claude." },
        { type: "step", text: "Open the link Claude gives you. You should see your project's files." },
        { type: "p", text: "Never paste passwords or keys into a prompt. Ask Claude where they go." },
      ],
    },
    {
      slug: "go-live",
      title: "Go live",
      description: "Connect your project to a host once, and every update goes live on its own.",
      blocks: [
        { type: "p", text: "A host puts your app on the internet. Connect it once, and every update goes live by itself." },
        { type: "flow", items: ["Change", "Commit", "Push", "Live"] },
        { type: "step", text: "Check `docs/architecture.md` for the host Claude recommended. These steps are for Vercel. If yours is different, ask Claude to walk you through it." },
        { type: "step", text: "Sign up and choose **Continue with GitHub**.", then: [{ type: "link", label: "Sign up for Vercel", href: "https://vercel.com/signup" }] },
        { type: "step", text: "Add a new project. If asked to install Vercel on GitHub, allow it for your repository." },
        { type: "step", text: "Click **Import** next to your project, then **Deploy**. Wait about a minute, and you'll get a link." },
        pastePrompt({
          type: "prompt",
          id: "go-live",
          title: "Check the launch",
          mode: "Manual",
          text: `My app is live at [YOUR LINK]. Check that every push to GitHub will deploy automatically, tell me if the host needs any private keys and where they go, and add basic security headers. Then give me a short list of things to test on my phone and computer.`,
        }),
        { type: "step", text: "Open your link and try it yourself. Working on your computer doesn't prove it works online." },
        {
          type: "dive",
          title: "Add your own domain name",
          blocks: [
            { type: "p", text: "Domains are often under $20 a year. Changes can take a few hours to show up." },
            {
              type: "prompt",
              id: "custom-domain",
              title: "Connect a domain",
              mode: "Manual",
              text: "I bought the domain [YOUR DOMAIN]. Walk me through connecting it to this app, one step at a time, including the exact DNS settings. Then check that it works.",
            },
          ],
        },
      ],
    },
  ],
};
