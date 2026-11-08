import { pastePrompt } from "@/content/patterns";
import type { Part } from "@/lib/types";

export const ship: Part = {
  slug: "ship",
  title: "Ship",
  lessons: [
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
