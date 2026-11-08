import type { Part } from "@/lib/types";

export const getReady: Part = {
  slug: "get-set-up",
  title: "Get set up",
  lessons: [
    {
      slug: "download-claude",
      title: "Download Claude",
      description: "The first step in vibe coding: install the Claude desktop app.",
      blocks: [
        { type: "p", text: "Vibe coding means building software by describing it in plain language. Claude Code is the AI that writes the code, and it comes inside the Claude desktop app." },
        { type: "step", text: "Download the app. Claude Code needs a [paid plan](https://claude.com/pricing) (Pro or higher).", then: [{ type: "link", label: "Go to the download page", href: "https://claude.com/download" }] },
        {
          type: "os",
          mac: [
            { type: "step", text: "Open your **Downloads** folder and double-click the Claude file. A window opens.", then: [] },
            { type: "step", text: "Drag the **Claude** icon onto **Applications**.", then: [{ type: "mock", show: "install-mac" }] },
            { type: "step", text: "Open **Applications** and double-click **Claude**. If your Mac asks whether you're sure, click **Open**." },
          ],
          windows: [
            { type: "step", text: "Open your **Downloads** folder and double-click the Claude setup file.", then: [{ type: "mock", show: "install-windows" }] },
            { type: "step", text: "Follow the prompts until it finishes. If Claude doesn't open by itself, find it in the **Start** menu." },
          ],
        },
        { type: "step", text: "Sign in with your Claude account, or create one." },
      ],
    },
    {
      slug: "create-your-project-folder",
      title: "Create your project folder",
      description: "Every project lives in its own folder on your computer.",
      blocks: [
        { type: "p", text: "Everything you build lives in one folder on your computer." },
        {
          type: "os",
          mac: [
            { type: "step", text: "Click the **Finder** icon (the blue smiling face) in your Dock." },
            { type: "step", text: "Click **Documents** in the left sidebar." },
            { type: "step", text: "Right-click an empty spot in the window (or tap with two fingers), and choose **New Folder**.", then: [{ type: "mock", show: "folder-mac" }] },
            { type: "step", text: "Type `my-first-app` as the name and press **Return**." },
          ],
          windows: [
            { type: "step", text: "Press the **Windows** key and **E** together to open File Explorer." },
            { type: "step", text: "Click **Documents** in the left sidebar." },
            { type: "step", text: "Right-click an empty spot in the window, then choose **New** and **Folder**.", then: [{ type: "mock", show: "folder-windows" }] },
            { type: "step", text: "Type `my-first-app` as the name and press **Enter**." },
          ],
        },
      ],
    },
    {
      slug: "open-your-folder-in-claude",
      title: "Open your folder in Claude",
      description: "Point Claude Code at your project folder and say hello.",
      blocks: [
        { type: "step", text: "In the Claude app, click **Code** in the sidebar. If you only see icons, hover over them to see their names.", then: [{ type: "mock", show: "code-tab" }] },
        { type: "step", text: "Look at the row under the prompt box. Click the first menu and choose the top option under **Local**.", then: [{ type: "mock", show: "local" }] },
        { type: "step", text: "Click the folder menu beside it and choose **Open folder…** Then find `my-first-app` in Documents and open it.", then: [{ type: "mock", show: "open-folder" }] },
        {
          type: "step",
          text: "Click **Copy**, paste into the prompt box and press Enter.",
          then: [{ type: "prompt", id: "first-hello", title: "Your first prompt", text: "Say hello, and tell me which folder you're working in. Don't change anything." }],
        },
        { type: "step", text: "Claude should reply with `my-first-app`. If it does, you're set up." },
      ],
    },
    {
      slug: "turn-on-plan-mode",
      title: "Turn on Plan mode",
      description: "Plan mode makes Claude show you its plan before it changes anything.",
      blocks: [
        { type: "p", text: "In Plan mode, Claude shows you what it wants to do and waits for your approval. You'll use it for everything big." },
        { type: "step", text: "Click the mode menu in the row under the prompt box, and choose **Plan**.", then: [{ type: "mock", show: "mode" }] },
        { type: "p", text: "The mode resets when you start a new session, so check it each time." },
        { type: "p", text: "Don't understand something Claude shows you? Type \"Explain that in plain language.\" No question is too basic." },
      ],
    },
  ],
};
