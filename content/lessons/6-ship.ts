import type { Part } from "@/lib/types";

export const ship: Part = {
  slug: "ship",
  title: "Ship",
  summary: "Back it up, put it online, and share it.",
  lessons: [
    {
      slug: "back-it-up-on-github",
      title: "Back it up on GitHub",
      takeaway: "GitHub keeps a copy of your project online. It's also how your app gets to the internet.",
      handsOn: "10 min",
      blocks: [
        { type: "p", text: "So far, your project only lives on your computer. GitHub stores a copy online in a repository, along with every save point." },
        { type: "links", items: [{ label: "Create a free GitHub account", href: "https://github.com/signup" }] },
        {
          type: "prompt",
          id: "github",
          title: "Put the project on GitHub",
          mode: "Manual",
          text: `Put this project on GitHub as a private repository. If the GitHub CLI isn't installed, walk me through installing it and logging in, one step at a time.

Before you upload anything, check that no passwords, API keys or .env files would be included, and tell me what you found. Then push it and give me the link.`,
        },
        { type: "rule", title: "Keep secrets out of chat and code", text: "Never paste passwords or API keys into a prompt or a code file. Ask Claude where a key should go, and it will show you how to store it safely." },
      ],
      recap: [
        "GitHub keeps your project and its history safe online.",
        "Check for secrets before anything gets uploaded.",
        "Passwords and keys never go in code or in chat.",
      ],
      words: [
        { term: "repository", meaning: "A project's folder on GitHub, with its full history." },
        { term: "API keys", meaning: "Secret codes that let an app use another company's service. Treat them like passwords." },
      ],
    },
    {
      slug: "go-live",
      title: "Go live",
      takeaway: "Connect your project to a host once, and every saved change goes live on its own.",
      handsOn: "15 min",
      blocks: [
        { type: "p", text: "Claude can walk you through this using the hosting in your architecture plan. Once it's connected, every push deploys your app, and Claude can add security headers to help protect it." },
        {
          type: "flow",
          items: [
            { title: "Change", note: "Build and check it." },
            { title: "Commit", note: "Make a save point." },
            { title: "Push", note: "Send it to GitHub." },
            { title: "Live", note: "The host updates by itself." },
          ],
          caption: "How an update reaches the world.",
        },
        {
          type: "prompt",
          id: "go-live",
          title: "Put it on the internet",
          mode: "Manual",
          text: `Read docs/architecture.md and walk me through putting this app live, one step at a time. Tell me exactly what to click on any website you send me to.

Set it up so every push to GitHub deploys automatically. Tell me which private keys the host needs and where they go. Add basic security headers.

When it's live, give me the link and a short list of things to test on my phone and my computer.`,
        },
        { type: "rule", title: "Check the real site", text: "Working on your computer doesn't prove it's working online. After every release, open the live link and try the main path yourself." },
        {
          type: "dive",
          id: "custom-domain",
          title: "Add your own domain name",
          blocks: [
            { type: "p", text: "Your app starts with a free address from your host. A custom domain is often under $20 a year, and you can buy one from your host or a registrar like Cloudflare." },
            {
              type: "prompt",
              id: "custom-domain",
              title: "Connect a domain",
              mode: "Manual",
              text: "I bought the domain [YOUR DOMAIN]. Walk me through connecting it to this app, one step at a time, including the exact DNS settings. Make the www and non-www versions go to the same place, then check that it works.",
            },
            { type: "p", text: "Domain changes aren't instant. If it doesn't work right away, check back in 15 minutes. It can take a few hours." },
          ],
        },
      ],
      recap: [
        "Connect your project to a host once, and each push goes live automatically.",
        "Keys go in the host's settings, not in your code.",
        "Check the live site yourself after every release.",
      ],
      words: [
        { term: "deploys", meaning: "Puts the latest version of an app online." },
        { term: "security headers", meaning: "Instructions a site sends to browsers to help block common attacks." },
      ],
    },
  ],
};
