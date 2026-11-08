import type { Part } from "@/lib/types";

export const getReady: Part = {
  slug: "get-ready",
  title: "Get ready",
  summary: "What vibe coding is, and the one tool you need.",
  lessons: [
    {
      slug: "what-vibe-coding-is",
      title: "What vibe coding is",
      takeaway: "You describe what you want and AI writes the code. Deciding what to build stays with you.",
      blocks: [
        { type: "p", text: "Vibe coding means building software by describing it in plain language. An AI tool called Claude Code writes the code, runs it and fixes it." },
        { type: "p", text: "That makes you the product manager, the designer and the architect. **Claude is fast, and it builds exactly what it's told.** So what you tell it matters more than anything else." },
        {
          type: "compare",
          left: { title: "Claude's job", items: ["Write the code", "Run it and fix what breaks", "Explain its choices", "Suggest options"] },
          right: { title: "Your job", items: ["Decide who it's for and why", "Decide how it should feel", "Choose between the options", "Judge whether it's right"] },
        },
        {
          type: "flow",
          items: [{ title: "Get ready" }, { title: "Product" }, { title: "Design" }, { title: "Architecture" }, { title: "Build" }, { title: "Ship" }, { title: "Grow" }],
          caption: "The path. Building is stage 5, on purpose.",
        },
        { type: "myth", title: "Myth: with AI, you can skip the planning.", text: "It's easy to believe, because a first version can appear in minutes. Planning matters more with AI, since Claude will build the wrong thing just as quickly as the right one." },
      ],
      recap: [
        "Vibe coding is building software by describing it in plain language.",
        "Claude writes the code. You decide what gets built and whether it's right.",
        "This course plans first and builds second.",
      ],
    },
    {
      slug: "set-up-claude-code",
      title: "Set up Claude Code",
      takeaway: "Install one app and you're ready. There's nothing else to set up today.",
      handsOn: "10 min",
      blocks: [
        { type: "p", text: "The Claude desktop app includes Claude Code, so you can skip the terminal. It needs a [paid Claude plan](https://claude.com/pricing) (Pro or higher)." },
        { type: "links", items: [{ label: "Download the Claude app", href: "https://claude.com/download" }] },
        {
          type: "steps",
          items: [
            "Install the app, open it and sign in.",
            "Click the **Code** tab.",
            "Make a new, empty folder for your project. `my-first-app` in Documents is fine.",
            "Under the prompt box, open the first menu and choose the top option under **Local**. In the menu beside it, choose **Open folder…** and pick your new folder.",
            "Paste this first prompt and press Enter.",
          ],
        },
        {
          type: "prompt",
          id: "first-hello",
          title: "Your first prompt",
          text: "Say hello, tell me which folder you're working in, and list what's in it. Don't change anything.",
        },
        { type: "p", text: "If Claude names your folder, you're set up." },
        {
          type: "dive",
          id: "terminal",
          title: "Prefer the terminal?",
          blocks: [
            { type: "p", text: "Claude Code also runs in a terminal. The lessons work the same way. To turn on Plan mode there, press Shift+Tab." },
            { type: "command", label: "Mac or Linux", text: "curl -fsSL https://claude.ai/install.sh | bash" },
            { type: "command", label: "Windows PowerShell", text: "irm https://claude.ai/install.ps1 | iex" },
            { type: "p", text: "Open a new terminal window, go to your project folder, then start Claude Code:" },
            { type: "command", label: "Start Claude Code", text: "claude" },
            { type: "p", text: "Stuck? See the [official setup guide](https://code.claude.com/docs/en/quickstart) and the [terminal guide for new users](https://code.claude.com/docs/en/terminal-guide)." },
          ],
        },
      ],
      recap: [
        "The Claude desktop app includes Claude Code, so there's nothing else to install today.",
        "Each project gets its own folder.",
        "Open that folder in the Code tab before you start.",
      ],
      words: [{ term: "terminal", meaning: "A text window for giving a computer typed commands." }],
    },
    {
      slug: "stay-in-control-with-modes",
      title: "Stay in control with modes",
      takeaway: "Modes set how much Claude can do without asking you. Start every big task in Plan mode.",
      blocks: [
        { type: "p", text: "You'll find the mode menu under the prompt box. You can change it any time, even in the middle of a task. These are the three you need." },
        {
          type: "cards",
          items: [
            { title: "Plan", note: "Claude reads and proposes a plan. It doesn't edit your project until you approve." },
            { title: "Manual", note: "Claude asks before each change or command." },
            { title: "Accept edits", note: "Claude edits files without asking each time. Use it once you trust the plan." },
          ],
        },
        { type: "p", text: "When Claude shows you a plan, read it. Approve it to go ahead, or type what you'd change." },
        { type: "rule", title: "You can always ask", text: "Never approve something you don't understand. Claude is patient, and no question is too basic." },
        {
          type: "prompt",
          id: "explain-plainly",
          title: "When you're lost",
          text: "Explain what you just proposed in plain language, as if I've never written code. What will change, why does it matter, and what could go wrong?",
        },
      ],
      recap: [
        "Plan mode lets Claude think without touching your project.",
        "Start big tasks in Plan, then move to Manual or Accept edits.",
        "Ask for a plain explanation before you approve anything unclear.",
      ],
    },
  ],
};
