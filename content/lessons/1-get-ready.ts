import type { Part } from "@/lib/types";

export const getReady: Part = {
  slug: "get-ready",
  title: "Get ready",
  lessons: [
    {
      slug: "what-vibe-coding-is",
      title: "What vibe coding is",
      description: "You describe what you want and AI writes the code. Deciding what to build stays with you.",
      blocks: [
        { type: "p", text: "Vibe coding means building software by describing it in plain language. An AI tool called Claude Code writes the code." },
        {
          type: "compare",
          left: { title: "Claude", items: ["Writes the code", "Fixes what breaks", "Suggests options"] },
          right: { title: "You", items: ["Decide what to build", "Choose between options", "Judge whether it's right"] },
        },
        { type: "p", text: "Claude builds the wrong thing as fast as the right thing. So this course plans first and builds second." },
      ],
    },
    {
      slug: "set-up-claude-code",
      title: "Set up Claude Code",
      description: "Install one app and you're ready to start.",
      blocks: [
        {
          type: "steps",
          items: [
            "[Download the Claude app](https://claude.com/download) and sign in. You'll need a [paid plan](https://claude.com/pricing).",
            "Open the **Code** tab.",
            "Create an empty folder for your project.",
            "Under the prompt box, choose the top option under **Local**, then **Open folder…**, and pick your folder.",
            "Paste this prompt and press Enter:",
          ],
        },
        {
          type: "prompt",
          id: "first-hello",
          title: "Your first prompt",
          text: "Say hello, and tell me which folder you're working in. Don't change anything.",
        },
        {
          type: "dive",
          title: "Prefer the terminal?",
          blocks: [
            { type: "command", label: "Mac or Linux", text: "curl -fsSL https://claude.ai/install.sh | bash" },
            { type: "command", label: "Windows PowerShell", text: "irm https://claude.ai/install.ps1 | iex" },
            { type: "p", text: "Open a new terminal window, go to your project folder and type `claude`. Press Shift+Tab to change modes. The [setup guide](https://code.claude.com/docs/en/quickstart) can help if you get stuck." },
          ],
        },
      ],
    },
    {
      slug: "stay-in-control-with-modes",
      title: "Stay in control with modes",
      description: "Modes set how much Claude can do without asking you.",
      blocks: [
        { type: "p", text: "Modes set how much Claude can do without asking. The menu is under the prompt box." },
        {
          type: "rows",
          items: [
            { title: "Plan", note: "Proposes a plan and waits for your approval." },
            { title: "Manual", note: "Asks before each change." },
            { title: "Accept edits", note: "Changes files without asking. Use it once you trust the plan." },
          ],
        },
        { type: "p", text: "Start big tasks in Plan mode. If you don't understand a plan, ask Claude to explain it in plain language before you approve." },
      ],
    },
  ],
};
