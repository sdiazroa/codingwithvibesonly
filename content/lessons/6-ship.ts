import type { Part } from "@/lib/types";

export const ship: Part = {
  slug: "ship",
  title: "Ship",
  lessons: [
    {
      slug: "go-live",
      title: "Go live",
      description: "Back up your project on GitHub, and every saved change goes live on its own.",
      blocks: [
        { type: "p", text: "[GitHub](https://github.com/signup) keeps a copy of your project online, and a host puts it on the internet. Connect them once, and every update goes live by itself." },
        { type: "flow", items: ["Change", "Commit", "Push", "Live"] },
        {
          type: "prompt",
          id: "go-live",
          title: "Put it on the internet",
          mode: "Manual",
          text: `Put this project on GitHub as a private repository. First check that no passwords or keys would be uploaded, and tell me what you found.

Then read docs/architecture.md and walk me through putting it live, one step at a time. Set it up so every push deploys automatically, and add basic security headers. When it's live, give me the link and a short list of things to test.`,
        },
        { type: "p", text: "Open the live link and try it yourself. Working on your computer doesn't prove it works online." },
        { type: "p", text: "Never paste passwords or keys into a prompt. Ask Claude where they go." },
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
