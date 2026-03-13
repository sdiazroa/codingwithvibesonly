/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";

// ─── Reusable UI pieces ───────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className={`shrink-0 px-3 py-1 text-xs font-semibold rounded-md transition-all ${
        copied
          ? "bg-green-500 text-white"
          : "bg-slate-700 text-slate-300 hover:bg-slate-600"
      }`}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

function CommandBlock({ command, label }: { command: string; label?: string }) {
  return (
    <div className="my-3">
      {label && (
        <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
      )}
      <div className="flex items-center justify-between gap-4 bg-slate-950 rounded-lg px-4 py-3">
        <code className="text-green-400 text-sm font-mono break-all leading-relaxed">
          {command}
        </code>
        <CopyButton text={command} />
      </div>
    </div>
  );
}

function TipBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-4 my-4 text-sm text-amber-800">
      <span className="font-semibold">Vibe Tip: </span>
      {children}
    </div>
  );
}

function NoteBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-lg p-4 my-4 text-sm text-blue-800">
      <span className="font-semibold">Note: </span>
      {children}
    </div>
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 mt-4">
      <span className="mt-0.5 flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
        {n}
      </span>
      <div className="flex-1 text-slate-700">{children}</div>
    </div>
  );
}

function PartBadge({ part, title }: { part: string; title: string }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-1">
        {part}
      </p>
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
    </div>
  );
}

function SubSection({
  id,
  number,
  color,
  title,
  children,
}: {
  id: string;
  number: number;
  color: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="mt-10 scroll-mt-4">
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${color}`}
        >
          {number}
        </span>
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      </div>
      {children}
    </div>
  );
}

// ─── Nav data ─────────────────────────────────────────────────────────────────

const navSections = [
  {
    id: "tool-setup",
    icon: "🔧",
    label: "Part 1: Tool Setup",
    children: [
      { id: "homebrew", label: "Homebrew" },
      { id: "git", label: "Git" },
      { id: "node", label: "Node.js" },
      { id: "github-cli", label: "GitHub CLI" },
      { id: "vercel-cli", label: "Vercel CLI" },
      { id: "claude-code", label: "Claude Code" },
    ],
  },
  {
    id: "project-foundation",
    icon: "📁",
    label: "Part 2: Project Foundation",
    children: [
      { id: "create-folder", label: "Create Project Folder" },
      { id: "verify-setup", label: "Verify Your Setup" },
    ],
  },
  {
    id: "claude-onboarding",
    icon: "🤖",
    label: "Part 3: Claude Onboarding",
    children: [
      { id: "launch-claude", label: "Launch Claude Code" },
      { id: "select-theme", label: "Select Your Theme" },
      { id: "complete-onboarding", label: "Complete Onboarding" },
      { id: "terminal-setup", label: "Terminal Setup" },
    ],
  },
  {
    id: "vibe-coding",
    icon: "✨",
    label: "Part 4: Start Vibe Coding!",
    children: [
      { id: "initializing-prompt", label: "Initializing Prompt" },
      { id: "dev-server", label: "Start Dev Server" },
      { id: "build-something", label: "Tell Claude What to Build" },
      { id: "brainstorming", label: "Brainstorming" },
    ],
  },
  {
    id: "shipping",
    icon: "🚀",
    label: "Part 5: Shipping to the World",
    children: [
      { id: "github-repo", label: "Create GitHub Repo" },
      { id: "deploy-vercel", label: "Deploy to Vercel" },
      { id: "custom-domain", label: "Custom Domain (Optional)" },
    ],
  },
  {
    id: "daily-standup",
    icon: "☀️",
    label: "Daily Standup Routine",
    children: [
      { id: "standup-folder", label: "Jump to Project Folder" },
      { id: "standup-claude", label: "Wake Up Claude" },
      { id: "standup-preview", label: "Start Local Preview" },
    ],
  },
  {
    id: "updates",
    icon: "🔄",
    label: "Pushing Updates",
    children: [
      { id: "push-changes", label: "Save & Push Changes" },
      { id: "auto-deploy", label: "Auto Deployment" },
    ],
  },
];

// ─── Main page ────────────────────────────────────────────────────────────────

export default function Home() {
  const [active, setActive] = useState("tool-setup");
  const [expanded, setExpanded] = useState<string[]>(["tool-setup"]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
  };

  const toggle = (id: string) =>
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* ── Sidebar ── */}
      <aside className="w-64 shrink-0 sticky top-0 h-screen bg-slate-900 overflow-y-auto flex flex-col">
        <div className="px-5 py-6 border-b border-slate-700">
          <p className="text-white font-bold text-base leading-snug">
            Vibe Coding for PMs
          </p>
          <p className="text-slate-400 text-xs mt-1">
            Your guide to building with AI
          </p>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {navSections.map((section) => {
            const isExpanded = expanded.includes(section.id);
            return (
              <div key={section.id}>
                <button
                  onClick={() => {
                    toggle(section.id);
                    scrollTo(section.id);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                    active === section.id
                      ? "bg-indigo-600 text-white"
                      : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-slate-400 text-[10px]">
                      {isExpanded ? "▼" : "▶"}
                    </span>
                    <span>{section.icon}</span>
                    <span className="leading-tight">{section.label}</span>
                  </span>
                </button>
                {isExpanded && (
                  <div className="ml-6 mt-0.5 space-y-0.5 mb-1">
                    {section.children.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => {
                          scrollTo(child.id);
                          setActive(child.id);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-md text-xs transition-colors ${
                          active === child.id
                            ? "text-indigo-400 bg-slate-800"
                            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                        }`}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 overflow-y-auto">
        {/* Hero */}
        <div className="bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 text-white px-10 py-14">
          <h1 className="text-4xl font-extrabold mb-2">Vibe Coding for PMs</h1>
          <p className="text-indigo-200 text-lg max-w-xl">
            A step-by-step guide to building your first app using AI-powered
            development. No prior coding experience required.
          </p>
        </div>

        <div className="px-10 py-10 max-w-3xl space-y-20">

          {/* ═══════════════════════════════════════════════════════════
              PART 1 – TOOL SETUP
          ═══════════════════════════════════════════════════════════ */}
          <section id="tool-setup" className="scroll-mt-4">
            <PartBadge part="Part 1" title="Setting Up Your Tools" />
            <p className="text-slate-600">
              Before you can vibe code, you need a few tools installed. Follow
              these steps carefully and you'll be ready in under 30 minutes.
            </p>

            {/* Homebrew */}
            <SubSection
              id="homebrew"
              number={1}
              color="bg-orange-100 text-orange-700"
              title="Install Homebrew"
            >
              <p className="text-slate-600 mb-3">
                <strong>Homebrew</strong> is the "App Store for the Terminal."
                It makes installing things like Git, Claude Code, Node.js, and
                Python much cleaner.
              </p>
              <Step n={1}>
                Paste this into your Terminal:
                <CommandBlock
                  command={`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`}
                />
              </Step>
              <Step n={2}>
                It'll ask you to enter your password. Enter your computer
                password (if you are the Administrator).
              </Step>
              <Step n={3}>
                Click <strong>Enter/Return</strong> to start the downloading
                process.
              </Step>
              <Step n={4}>
                You will get a message with{" "}
                <strong>"Installation Successful!"</strong> and next steps.
              </Step>
              <Step n={5}>
                <p className="mb-2">
                  <strong>Next Steps</strong> (this part is crucial for a
                  successful install). On modern Macs, Homebrew usually requires
                  two or three extra commands to actually "activate" it. These
                  will be listed under a section called{" "}
                  <strong>Next Steps</strong>.
                </p>
                <p className="text-slate-600 mb-2">
                  How to do it correctly:
                </p>
                <div className="text-slate-600 space-y-1 mb-2">
                  <p>
                    1. <strong>Copy the first two lines</strong> starting with{" "}
                    <code className="bg-slate-100 px-1 rounded">echo</code> and
                    paste them into your terminal, then hit{" "}
                    <strong>Enter</strong>.
                  </p>
                  <p>
                    2. <strong>Copy the third line</strong> starting with{" "}
                    <code className="bg-slate-100 px-1 rounded">eval</code> and
                    paste it, then hit <strong>Enter</strong>.
                  </p>
                </div>
                <NoteBox>
                  Don't ignore these! Without running those lines, the{" "}
                  <code>brew</code> command won't work in the next step.
                </NoteBox>
              </Step>
              <Step n={6}>
                <strong>The final confirmation</strong> — run this to make sure
                everything is connected properly:
                <CommandBlock command="brew doctor" />
                <p className="text-slate-600 mt-1">
                  If it says{" "}
                  <strong>"Your system is ready to brew,"</strong> you are
                  officially done with the hardest part! Any other messages are
                  usually just "housekeeping" suggestions you can ignore.
                </p>
              </Step>
            </SubSection>

            {/* Git */}
            <SubSection
              id="git"
              number={2}
              color="bg-orange-100 text-orange-700"
              title="Install Git"
            >
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4 text-slate-600">
                <p className="font-semibold text-slate-700 mb-2">
                  Why Git matters for Vibe Coding
                </p>
                <p className="mb-2">
                  Think of Git as the <strong>"Save Game" system</strong> for
                  your code.
                </p>
                <ul className="space-y-1">
                  <li>
                    <strong>Commit:</strong> Saving a snapshot of your progress.
                  </li>
                  <li>
                    <strong>Branch:</strong> Creating a "sandbox" to try a
                    crazy idea without breaking your main app.
                  </li>
                  <li>
                    <strong>Push:</strong> Sending your code to the internet
                    (GitHub/Vercel) so your app goes live.
                  </li>
                </ul>
              </div>
              <Step n={1}>
                Install Git using Homebrew:
                <CommandBlock command="brew install git" />
              </Step>
              <Step n={2}>
                <strong>Verification</strong> — run this test:
                <CommandBlock command="git --version" />
              </Step>
              <Step n={3}>
                <p className="mb-2">
                  <strong>Introduce yourself to Git</strong> — replace the
                  placeholder text with your own info:
                </p>
                <CommandBlock
                  command={`git config --global user.name "Your Name"`}
                  label="a. User Name (e.g., Jane Doe):"
                />
                <CommandBlock
                  command={`git config --global user.email "yourname@example.com"`}
                  label="b. User Email:"
                />
                <NoteBox>
                  If you plan to use GitHub (recommended), use the same email
                  for both. This allows GitHub to correctly link your local work
                  to your online profile.
                </NoteBox>
              </Step>
              <Step n={4}>
                <strong>How to Check if it Worked</strong> — the above commands
                don't return anything in your terminal, so don't panic! Run
                this to verify Git "remembered" you:
                <CommandBlock command="git config --list" />
                <p className="text-sm text-slate-500 mt-1">
                  You should see your name and email listed in the output.
                </p>
              </Step>
            </SubSection>

            {/* Node.js */}
            <SubSection
              id="node"
              number={3}
              color="bg-orange-100 text-orange-700"
              title="Install Node.js"
            >
              <p className="text-slate-600 mb-3">
                Node.js is the runtime environment that allows your computer to
                execute JavaScript outside of a web browser — required for most
                modern development tools.
              </p>
              <Step n={1}>
                Install Node.js using Homebrew:
                <CommandBlock command="brew install node" />
              </Step>
              <Step n={2}>
                <strong>Verification:</strong>
                <CommandBlock command="node -v" />
                <p className="text-sm text-slate-500 mt-1">
                  Should show a version like v20.x.x or higher — it might take
                  a few seconds to appear.
                </p>
              </Step>
            </SubSection>

            {/* GitHub CLI */}
            <SubSection
              id="github-cli"
              number={4}
              color="bg-orange-100 text-orange-700"
              title="Install GitHub CLI"
            >
              <p className="text-slate-600 mb-3">
                The <strong>GitHub CLI</strong> (
                <code className="bg-slate-100 px-1 rounded">gh</code>) is the
                tool that lets your terminal securely "talk" to your GitHub
                account without needing a password every time.
              </p>
              <Step n={1}>
                <p className="mb-2">
                  Go to <strong>GitHub.com</strong> and create a free account
                  if you don't have one already.
                </p>
                <TipBox>
                  Use the same email address you used when you introduced
                  yourself to Git in Step 2. This ensures your local "vibes"
                  and your online profile match up perfectly.
                </TipBox>
              </Step>
              <Step n={2}>
                <strong>Install GitHub CLI with Homebrew:</strong>
                <CommandBlock command="brew install gh" />
              </Step>
              <Step n={3}>
                <strong>Kick off the Authentication Process:</strong>
                <CommandBlock command="gh auth login" />
              </Step>
              <Step n={4}>
                <p className="mb-2">
                  <strong>Recommended Settings:</strong>
                </p>
                <ul className="text-slate-600 space-y-1">
                  <li>
                    <strong>What account?</strong> GitHub.com
                  </li>
                  <li>
                    <strong>Preferred protocol?</strong> HTTPS
                  </li>
                  <li>
                    <strong>Authenticate Git?</strong> Yes
                  </li>
                  <li>
                    <strong>How to authenticate?</strong> Login with a web
                    browser — then follow the steps to grant permission.
                  </li>
                </ul>
              </Step>
            </SubSection>

            {/* Vercel CLI */}
            <SubSection
              id="vercel-cli"
              number={5}
              color="bg-orange-100 text-orange-700"
              title="Install Vercel CLI (Optional)"
            >
              <p className="text-slate-600 mb-3">
                The <strong>Vercel CLI</strong> is the "remote control" for your
                website, allowing you to deploy code directly from your terminal
                to the internet. Only needed if you plan on shipping online.
              </p>
              <Step n={1}>
                Install with npm:
                <CommandBlock command="npm install -g vercel" />
              </Step>
              <Step n={2}>
                <strong>The Handshake (Authentication):</strong>
                <CommandBlock command="vercel login" />
              </Step>
              <Step n={3}>
                <p className="mb-2">
                  <strong>The Process:</strong>
                </p>
                <ul className="text-slate-600 space-y-1">
                  <li>
                    Choose your preferred login method (usually{" "}
                    <strong>GitHub</strong> to match your other accounts).
                  </li>
                  <li>
                    This will open a browser tab where you simply click
                    "Authorize" to link your Mac to your Vercel account.
                  </li>
                </ul>
              </Step>
            </SubSection>

            {/* Claude Code */}
            <SubSection
              id="claude-code"
              number={6}
              color="bg-orange-100 text-orange-700"
              title="Install Claude Code"
            >
              <p className="text-slate-600 mb-3">
                The official Claude CLI. This tool lets you "vibe code" by
                giving natural language instructions directly to an agent that
                can edit your files.
              </p>
              <NoteBox>
                If you already have the Claude app downloaded, skip sub-step 1
                and just verify with the command in sub-step 2.
              </NoteBox>
              <Step n={1}>
                Run this command:
                <CommandBlock command="npm install -g @anthropic-ai/claude-code" />
                <p className="text-sm text-slate-500 mt-1">
                  You'll see a "funding" message — safely ignore it.
                </p>
                <NoteBox>
                  If you get a "permission denied" error, type{" "}
                  <code>sudo</code> before the command and enter your Mac
                  password. When you type your password after 'sudo', you won't
                  see any stars or dots — just keep typing and hit Enter.
                </NoteBox>
              </Step>
              <Step n={2}>
                <strong>Verification:</strong>
                <CommandBlock command="claude --version" />
              </Step>
            </SubSection>
          </section>

          {/* ═══════════════════════════════════════════════════════════
              PART 2 – PROJECT FOUNDATION
          ═══════════════════════════════════════════════════════════ */}
          <section id="project-foundation" className="scroll-mt-4">
            <PartBadge part="Part 2" title="Setting Your Project" />
            <p className="text-slate-600">
              Now that your tools are ready, create a dedicated home for your
              app on your Mac.
            </p>

            <SubSection
              id="create-folder"
              number={1}
              color="bg-emerald-100 text-emerald-700"
              title="Create Your Project Folder"
            >
              <p className="text-slate-600 mb-1">
                Run these two commands one at a time:
              </p>
              <CommandBlock
                command="mkdir my-final-project"
                label="a. Create the folder:"
              />
              <CommandBlock
                command="cd my-final-project"
                label="b. Go into the folder:"
              />
              <NoteBox>
                These commands don't return any output in your terminal — that's
                completely normal!
              </NoteBox>
            </SubSection>

            <SubSection
              id="verify-setup"
              number={2}
              color="bg-emerald-100 text-emerald-700"
              title="Verification (optional)"
            >
              <p className="text-slate-600 mb-3">
                To verify that your project folder was created and that you are
                currently "inside" it:
              </p>
              <Step n={1}>
                <strong>Check Your Current Location:</strong>
                <CommandBlock command="pwd" />
                <p className="text-sm text-slate-500">
                  Stands for "Print Working Directory." The result should end
                  in{" "}
                  <code className="bg-slate-100 px-1 rounded">
                    /my-final-project
                  </code>
                  .
                </p>
              </Step>
              <Step n={2}>
                <strong>List the Contents:</strong>
                <CommandBlock command="ls -a" />
                <p className="text-sm text-slate-500">
                  If you just ran{" "}
                  <code className="bg-slate-100 px-1 rounded">mkdir</code>,
                  you'll only see{" "}
                  <code className="bg-slate-100 px-1 rounded">.</code> and{" "}
                  <code className="bg-slate-100 px-1 rounded">..</code>. Once
                  Claude initializes the project you'll see{" "}
                  <code className="bg-slate-100 px-1 rounded">package.json</code>
                  ,{" "}
                  <code className="bg-slate-100 px-1 rounded">app/</code>, and
                  more.
                </p>
              </Step>
              <TipBox>
                If you ever get lost in the terminal, type{" "}
                <code>cd ~/my-final-project</code> to jump straight back to
                your app's home base.
              </TipBox>
            </SubSection>
          </section>

          {/* ═══════════════════════════════════════════════════════════
              PART 3 – CLAUDE ONBOARDING
          ═══════════════════════════════════════════════════════════ */}
          <section id="claude-onboarding" className="scroll-mt-4">
            <PartBadge part="Part 3" title="Claude Code Onboarding" />
            <p className="text-slate-600">
              Let's get Claude Code set up and connected to your account.
            </p>

            <SubSection
              id="launch-claude"
              number={1}
              color="bg-purple-100 text-purple-700"
              title="Launch Claude Code"
            >
              <p className="text-slate-600 mb-3">
                Type the command to start your session:
              </p>
              <CommandBlock command="claude" />
              <p className="text-slate-600">
                You are officially in! The screen you're seeing is the Claude
                Code onboarding — it's asking you to pick a visual theme for
                your terminal.
              </p>
              <TipBox>
                You can usually just hit Enter to accept the defaults.
              </TipBox>
            </SubSection>

            <SubSection
              id="select-theme"
              number={2}
              color="bg-purple-100 text-purple-700"
              title="Select Your Theme"
            >
              <p className="text-slate-600">
                Since "Dark Mode" has the little green checkmark next to it,
                just hit <strong>Enter</strong> to accept it. If you prefer
                light mode, use your arrow keys to move the selection before
                hitting Enter.
              </p>
            </SubSection>

            <SubSection
              id="complete-onboarding"
              number={3}
              color="bg-purple-100 text-purple-700"
              title="Complete the Onboarding"
            >
              <p className="text-slate-600 mb-3">
                You will now see a screen to choose how you will be using Claude
                Code:
              </p>
              <div className="bg-slate-950 rounded-xl p-4 mb-4 text-sm font-mono">
                <p className="text-slate-500 mb-1">Select login method:</p>
                <p className="text-green-400">
                  › 1. Claude account with subscription · Pro, Max, Team, or
                  Enterprise
                </p>
                <p className="text-slate-500">
                  &nbsp; 2. Anthropic Console account · API usage billing
                </p>
                <p className="text-slate-500">
                  &nbsp; 3. 3rd-party platform · Amazon Bedrock, Microsoft
                  Foundry, or Vertex AI
                </p>
              </div>
              <p className="text-slate-700 text-sm font-semibold mb-2">
                Select Option 1: "Claude account with subscription"
              </p>
              <ul className="text-slate-600 space-y-1.5">
                <li>
                  <strong>Why:</strong> If you already pay{" "}
                  <strong>$20/month for Claude Pro</strong>, this is included —
                  no extra billing.
                </li>
                <li>
                  <strong>What happens:</strong> When you hit Enter, your
                  terminal will generate a unique login link or open your
                  browser. You'll just need to click{" "}
                  <strong>Authorize</strong> to link your terminal to your
                  Claude account.
                </li>
              </ul>
            </SubSection>

            <SubSection
              id="terminal-setup"
              number={4}
              color="bg-purple-100 text-purple-700"
              title="Claude Terminal Setup"
            >
              <p className="text-slate-600 mb-3">
                You will get a few security screens — just hit{" "}
                <strong>Enter</strong>. Then you will get to a terminal setup
                screen asking about recommended settings. Hit{" "}
                <strong>Enter</strong> to select{" "}
                <strong>"Yes, use recommended settings."</strong>
              </p>
              <p className="text-slate-600">
                It will then make you verify your project. Hit{" "}
                <strong>Enter</strong> for{" "}
                <strong>"Yes, I trust this folder."</strong>
              </p>
            </SubSection>
          </section>

          {/* ═══════════════════════════════════════════════════════════
              PART 4 – START VIBE CODING!
          ═══════════════════════════════════════════════════════════ */}
          <section id="vibe-coding" className="scroll-mt-4">
            <PartBadge part="Part 4" title="Start Vibe Coding!" />
            <p className="text-slate-600">
              Once you get past those intro screens, you'll see a prompt that
              looks like{" "}
              <code className="bg-slate-100 px-1.5 py-0.5 rounded">&gt;</code>.
              This is where the magic happens.
            </p>

            <SubSection
              id="initializing-prompt"
              number={1}
              color="bg-indigo-100 text-indigo-700"
              title="Initializing Prompt"
            >
              <p className="text-slate-600 mb-3">
                Once inside the Claude session, the first "vibe" prompt to run
                is:
              </p>
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-5">
                <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2">
                  Your First Vibe Prompt
                </p>
                <p className="text-slate-700 text-sm italic mb-3">
                  "Initialize a new Next.js project in this folder using
                  Tailwind CSS and TypeScript. Create a CLAUDE.md file to track
                  our project's rules and progress."
                </p>
                <CopyButton text="Initialize a new Next.js project in this folder using Tailwind CSS and TypeScript. Create a CLAUDE.md file to track our project's rules and progress." />
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4">
                <p className="text-sm font-semibold text-slate-700 mb-3">
                  What "Initializing" Actually Does
                </p>
                <ul className="text-slate-600 space-y-2">
                  <li>
                    <strong>Next.js Setup:</strong> Claude downloads a
                    framework that handles the "plumbing" of your app (routing,
                    performance, server logic) so you don't have to build it
                    from scratch.
                  </li>
                  <li>
                    <strong>Tailwind CSS:</strong> Installs a styling engine
                    that lets you design by "describing" elements (e.g., "make
                    this button rounded and blue") rather than writing complex
                    style sheets.
                  </li>
                  <li>
                    <strong>TypeScript:</strong> Sets up a "spell-check" for
                    your code that catches errors before you even run the app.
                  </li>
                  <li>
                    <strong>CLAUDE.md:</strong> A special file where Claude
                    stores "memory" about your project goals and rules.
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-slate-700 mb-2">
                  What to Watch For
                </p>
                <p className="text-slate-600">
                  Claude will start "thinking" and you'll see it automatically
                  running commands to install all the "lego blocks" for your
                  app. It might ask for your permission to run certain commands
                  — just type{" "}
                  <code className="bg-slate-100 px-1 rounded">y</code> or hit
                  Enter to let it proceed.
                </p>
              </div>
            </SubSection>

            <SubSection
              id="dev-server"
              number={2}
              color="bg-indigo-100 text-indigo-700"
              title="Start Your Dev Server"
            >
              <p className="text-slate-600 mb-3">
                To actually <strong>see</strong> the app on your computer, you
                need to start the "dev server." This turns your folder of code
                into a live website that only you can see for now.
              </p>
              <Step n={1}>
                Type this into the prompt (or just hit Enter if it's already
                pre-filled):
                <CommandBlock command="npm run dev" />
                <p className="text-sm text-slate-500 mt-1">
                  You might have to confirm to proceed. Just hit Enter.
                </p>
              </Step>
              <Step n={2}>
                <strong>Look for a URL:</strong> Once it runs, you will see a
                line that says something like{" "}
                <code className="bg-slate-100 px-1 rounded">
                  ready - started server on http://localhost:3000
                </code>
                .
              </Step>
              <Step n={3}>
                <strong>Open your browser:</strong> Copy that{" "}
                <strong>http://localhost:3000</strong> link and paste it into
                Chrome or Safari. You should see the default Next.js welcome
                page.
              </Step>
            </SubSection>

            <SubSection
              id="build-something"
              number={3}
              color="bg-indigo-100 text-indigo-700"
              title="Tell Claude What to Build!"
            >
              <p className="text-slate-600 mb-4">
                Just type in the command line a description of what you want to
                build. For example, here's a prompt for a personal habit tracker
                as your first project:
              </p>
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-5">
                <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2">
                  The "MVP" Habit Tracker Prompt
                </p>
                <p className="text-slate-700 text-sm italic mb-3">
                  "I want to build a simple Personal Habit Tracker as my MVP.
                  Please update the main page (app/page.tsx) to include: 1. A
                  Header: A clean title that says 'My Daily Habits'. 2. An
                  Input Field: A text box where I can type a new habit and an
                  'Add' button. 3. A Habit List: A vertical list of habits.
                  Each habit should have a checkbox to mark it as 'Done' for
                  the day and a 'Delete' icon. 4. Styling: Use a modern,
                  minimalist design with plenty of white space and a soft blue
                  primary color for the buttons."
                </p>
                <CopyButton text="I want to build a simple Personal Habit Tracker as my MVP. Please update the main page (app/page.tsx) to include: 1. A Header: A clean title that says 'My Daily Habits'. 2. An Input Field: A text box where I can type a new habit and an 'Add' button. 3. A Habit List: A vertical list of habits. Each habit should have a checkbox to mark it as 'Done' for the day and a 'Delete' icon. 4. Styling: Use a modern, minimalist design with plenty of white space and a soft blue primary color for the buttons." />
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4">
                <p className="text-sm font-semibold text-slate-700 mb-2">
                  Why this works for a first prompt:
                </p>
                <ul className="text-slate-600 space-y-2">
                  <li>
                    <strong>It defines the "CRUD" logic:</strong> You are asking
                    for Create (Add button), Read (The List), and Delete (Trash
                    icon) right away.
                  </li>
                  <li>
                    <strong>It targets specific files:</strong> By mentioning{" "}
                    <code className="bg-slate-100 px-1 rounded">
                      app/page.tsx
                    </code>
                    , you're helping Claude know exactly where the "front door"
                    of your app is.
                  </li>
                  <li>
                    <strong>It uses "Vibe" language:</strong> Instead of writing
                    CSS code, you are describing the "look and feel"
                    (minimalist, white space, soft blue).
                  </li>
                </ul>
              </div>

              <p className="text-slate-600">
                Once Claude writes the code, go back to your browser at{" "}
                <strong>http://localhost:3000</strong>. You should see your
                habit tracker live! If it looks good, your next prompt can be:{" "}
                <em>
                  "Now, make it so that when I refresh the page, my habits are
                  still there."
                </em>{" "}
                (This introduces the concept of <strong>Local Storage</strong>).
              </p>
            </SubSection>

            {/* Brainstorming */}
            <div id="brainstorming" className="mt-10 scroll-mt-4">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Brainstorming: When you don't know what to build yet
              </h3>
              <p className="text-slate-600 mb-6">
                This is the perfect moment to shift from{" "}
                <strong>Engineer Mode</strong> back into{" "}
                <strong>Product Mode</strong>. Now that your "plumbing" is done,
                you need to decide what to build on top of it.
              </p>

              {/* Problem-First */}
              <div id="problem-first" className="mt-8 scroll-mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold bg-amber-100 text-amber-700">
                    1
                  </span>
                  <h4 className="text-base font-semibold text-slate-800">
                    The "Problem-First" Framework
                  </h4>
                </div>
                <p className="text-slate-600 mb-4">
                  Instead of trying to think of a "world-changing" app, look for
                  a <strong>micro-frustration</strong> in your daily life.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                    <p className="text-sm font-semibold text-red-700 mb-2">
                      Avoid (too complex for first projects)
                    </p>
                    <ul className="text-sm text-red-600 space-y-1">
                      <li>Social Networks</li>
                      <li>Real-time Marketplaces</li>
                      <li>Multi-user platforms</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                    <p className="text-sm font-semibold text-green-700 mb-2">
                      Sweet Spot: Single-Purpose Tools
                    </p>
                    <ul className="text-sm text-green-600 space-y-1">
                      <li>Personal habit tracker</li>
                      <li>Calculator for work metrics</li>
                      <li>Simple resource directory</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Brainstorm with Claude */}
              <div id="brainstorm-claude" className="mt-8 scroll-mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold bg-amber-100 text-amber-700">
                    2
                  </span>
                  <h4 className="text-base font-semibold text-slate-800">
                    Leverage Claude (or Gemini) for Brainstorming
                  </h4>
                </div>
                <p className="text-slate-600 mb-4">
                  If you don't know yet what you want to build, take the time to
                  do a little brainstorming session. You can use the{" "}
                  <code className="bg-slate-100 px-1.5 py-0.5 rounded">
                    claude &gt;
                  </code>{" "}
                  prompt you are already in to help you brainstorm:
                </p>
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-5">
                  <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2">
                    Brainstorming Prompt
                  </p>
                  <p className="text-slate-700 text-sm italic mb-3">
                    "I have my environment set up, but I'm not sure what to
                    build yet. I am a [Your Role/Interest]. Can you suggest 3
                    simple 'Starter Projects' that would help me learn how to
                    handle user input and display data?"
                  </p>
                  <CopyButton text="I have my environment set up, but I'm not sure what to build yet. I am a [Your Role/Interest]. Can you suggest 3 simple 'Starter Projects' that would help me learn how to handle user input and display data?" />
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-sm font-semibold text-amber-800 mb-1">
                    Workflow for Saving Claude Tokens
                  </p>
                  <p className="text-xs text-amber-700 mb-3">
                    Note: At this stage it is very unlikely you could hit the
                    daily token limit.
                  </p>
                  <ol className="text-sm text-amber-700 space-y-2">
                    <li>
                      <strong>1. Brainstorm &amp; Plan:</strong> Use Gemini for
                      initial ideation, high-level architecture planning, and
                      pseudo-code generation.
                    </li>
                    <li>
                      <strong>2. Context Building:</strong> Use Gemini to
                      summarize large codebases or find relevant parts.
                    </li>
                    <li>
                      <strong>3. Execute:</strong> Feed the refined, high-level
                      plan into Claude to generate actual code.
                    </li>
                    <li>
                      <strong>4. Use Claude Wisely:</strong> Use{" "}
                      <code className="bg-amber-100 px-1 rounded">/clear</code>{" "}
                      to reset the session when moving to a new task to stop
                      accumulated chat history from consuming tokens.
                    </li>
                    <li>
                      <strong>5. Use Haiku for Simple Tasks:</strong> If you
                      have Claude Pro, use Claude Haiku for minor tasks,
                      documentation, or basic code adjustments.
                    </li>
                  </ol>
                  <p className="text-xs text-amber-700 mt-3 italic">
                    Restricting Claude to coding and using Gemini for
                    brainstorming can extend usage limits.
                  </p>
                </div>
              </div>

              {/* CRUD North Star */}
              <div id="crud-north-star" className="mt-8 scroll-mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold bg-amber-100 text-amber-700">
                    3
                  </span>
                  <h4 className="text-base font-semibold text-slate-800">
                    The "CRUD" North Star
                  </h4>
                </div>
                <p className="text-slate-600 mb-5">
                  Almost every successful consumer app is just a variation of{" "}
                  <strong>CRUD</strong>. If your idea lets you do these four
                  things, it's a great "technical" project:
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-black text-blue-400">C</span>
                      <span className="text-base font-bold text-blue-700">Create</span>
                    </div>
                    <p className="text-sm text-blue-700">Adding data</p>
                    <p className="text-xs text-blue-400 mt-0.5">
                      e.g., a "New Task" button
                    </p>
                  </div>
                  <div className="bg-green-50 border border-green-100 rounded-xl p-5">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-black text-green-400">R</span>
                      <span className="text-base font-bold text-green-700">Read</span>
                    </div>
                    <p className="text-sm text-green-700">Seeing data</p>
                    <p className="text-xs text-green-400 mt-0.5">
                      e.g., a "List of Tasks"
                    </p>
                  </div>
                  <div className="bg-purple-50 border border-purple-100 rounded-xl p-5">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-black text-purple-400">U</span>
                      <span className="text-base font-bold text-purple-700">Update</span>
                    </div>
                    <p className="text-sm text-purple-700">Changing data</p>
                    <p className="text-xs text-purple-400 mt-0.5">
                      e.g., "Edit Task"
                    </p>
                  </div>
                  <div className="bg-red-50 border border-red-100 rounded-xl p-5">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-black text-red-400">D</span>
                      <span className="text-base font-bold text-red-700">Delete</span>
                    </div>
                    <p className="text-sm text-red-700">Removing data</p>
                    <p className="text-xs text-red-400 mt-0.5">
                      e.g., a Trash icon
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
              PART 5 – SHIPPING TO THE WORLD
          ═══════════════════════════════════════════════════════════ */}
          <section id="shipping" className="scroll-mt-4">
            <PartBadge part="Part 5" title="Shipping to the World" />
            <p className="text-slate-600">
              To launch your website so the world can see it, you need to move
              your code from your local computer to a professional server and
              give it a "home address" (a domain).
            </p>

            {/* GitHub Repo */}
            <SubSection
              id="github-repo"
              number={1}
              color="bg-sky-100 text-sky-700"
              title='Create Your "Cloud Storage" (GitHub)'
            >
              <p className="text-slate-600 mb-4">
                Your code needs to live in a{" "}
                <strong>GitHub Repository</strong>.
              </p>
              <Step n={1}>
                <strong>Sign Up:</strong> Go to <strong>GitHub.com</strong> and
                create a free account if you don't have one already.
              </Step>
              <Step n={2}>
                <p className="mb-2">
                  <strong>Create a Repository:</strong> Click the "+" icon in
                  the top-right and select{" "}
                  <strong>"New repository."</strong>
                </p>
                <div className="mt-2 space-y-3">
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm">
                    <p className="font-semibold text-slate-700 mb-2">
                      1. General Settings
                    </p>
                    <ul className="text-slate-600 space-y-1">
                      <li>
                        <strong>Name:</strong> Give it a name (e.g.,{" "}
                        <code className="bg-slate-100 px-1 rounded">
                          my-vibe-project
                        </code>
                        ).
                      </li>
                      <li>
                        <strong>Description:</strong> Have Claude or Gemini
                        write a description for you based on what you are
                        building.
                      </li>
                    </ul>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm">
                    <p className="font-semibold text-slate-700 mb-2">
                      2. Configuration (The "Clean Slate" Strategy)
                    </p>
                    <p className="text-slate-600 mb-2">
                      Since you already have a working project folder built by
                      Claude Code,{" "}
                      <strong>
                        the most important step here is what NOT to check.
                      </strong>
                    </p>
                    <ul className="text-slate-600 space-y-1">
                      <li>
                        <strong>Public vs. Private:</strong> Leave as{" "}
                        <strong>Public</strong> only if you want others to see
                        your code, otherwise make it <strong>Private</strong>.
                      </li>
                      <li>
                        <strong>Add README:</strong> Leave{" "}
                        <strong>Unchecked (Off)</strong>. Your local project
                        already has a README.
                      </li>
                      <li>
                        <strong>Add .gitignore:</strong> Leave as{" "}
                        <strong>"None"</strong>. Claude Code already created a{" "}
                        <code className="bg-slate-100 px-1 rounded">
                          .gitignore
                        </code>{" "}
                        file for you.
                      </li>
                      <li>
                        <strong>Add license:</strong> Leave as{" "}
                        <strong>"None"</strong> for now.
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm text-slate-700 font-medium mt-3">
                  Click the green <strong>"Create repository"</strong> button.
                </p>
              </Step>
              <Step n={3}>
                <p className="mb-2">
                  <strong>Push your repository:</strong> GitHub will show you a
                  "Quick Setup" page. Look for the section titled{" "}
                  <strong>
                    "…or push an existing repository from the command line."
                  </strong>{" "}
                  Run these commands one at a time:
                </p>
                <CommandBlock command="git remote add origin https://github.com/[your-username]/[your-project-name].git" />
                <CommandBlock command="git branch -M main" />
                <CommandBlock command="git push -u origin main" />
              </Step>
            </SubSection>

            {/* Deploy to Vercel */}
            <SubSection
              id="deploy-vercel"
              number={2}
              color="bg-sky-100 text-sky-700"
              title="Deploy to the Web (Vercel)"
            >
              <p className="text-slate-600 mb-4">
                Vercel is the gold standard for hosting Next.js apps. It will
                turn your GitHub code into a real website.
              </p>
              <Step n={1}>
                <strong>Sign Up:</strong> Go to <strong>Vercel.com</strong> and
                click "Sign Up." Select{" "}
                <strong>Continue with GitHub</strong> — it will automatically
                link your accounts.
              </Step>
              <Step n={2}>
                <strong>Import Git Repository:</strong> You will see an
                "Install" button. Follow the steps. Choose{" "}
                <strong>"All Repositories"</strong> (this will make it easier
                in the future to deploy additional projects).
              </Step>
              <Step n={3}>
                <p className="mb-2">
                  <strong>Import Project:</strong> You will now see a list of
                  your GitHub repositories. Click <strong>"Import"</strong> next
                  to the repo you just created.
                </p>
                <ul className="text-slate-600 space-y-1">
                  <li>
                    <strong>Project Name:</strong> Ensure it matches your
                    GitHub repository name.
                  </li>
                  <li>
                    <strong>Environment Variables:</strong> Leave this blank for
                    now.
                  </li>
                  <li>
                    <strong>The "Deploy" Button:</strong> Vercel knows this is
                    a Next.js app. Just click <strong>"Deploy."</strong>
                  </li>
                  <li>
                    <strong>Success:</strong> In about 60 seconds, you'll see
                    fireworks! Vercel will give you a link like{" "}
                    <code className="bg-slate-100 px-1 rounded">
                      my-project.vercel.app
                    </code>
                    .
                  </li>
                </ul>
              </Step>
              <Step n={4}>
                <p className="mb-2">
                  <strong>IMPORTANT:</strong> Connect your Vercel project to
                  your local project.
                </p>
                <ol className="text-slate-600 space-y-1">
                  <li>a. Open a new tab in your terminal (Cmd + T)</li>
                  <li>
                    b. Type{" "}
                    <code className="bg-slate-100 px-1 rounded">
                      vercel link
                    </code>{" "}
                    and hit Enter.
                  </li>
                  <li>
                    c. It will ask: <em>"Set up '~/your-folder-path'?"</em>{" "}
                    Choose <strong>Y</strong>.
                  </li>
                  <li>
                    d. Select your personal project scope.
                  </li>
                  <li>
                    e. When asked "Link to existing project?", type{" "}
                    <strong>Y</strong>.
                  </li>
                  <li>
                    f. When asked "Which existing project?", select your new
                    project.
                  </li>
                  <li>
                    g. When asked "Would you like to pull environment variables
                    now?", type <strong>Y</strong>.
                  </li>
                </ol>
                <NoteBox>
                  This creates a hidden{" "}
                  <code>.env.local</code> file on your Mac so your local
                  version and the live version share the same settings (like AI
                  API keys).
                </NoteBox>
                <p className="text-slate-700 text-sm font-semibold mt-3">
                  You've successfully linked your local folder to your official
                  production project!
                </p>
              </Step>
            </SubSection>

            {/* Custom Domain */}
            <SubSection
              id="custom-domain"
              number={3}
              color="bg-sky-100 text-sky-700"
              title="Add a Custom Domain (Optional — CloudFlare)"
            >
              <p className="text-slate-600 mb-4">
                By default, Vercel gives you a name like{" "}
                <code className="bg-slate-100 px-1 rounded">
                  my-project.vercel.app
                </code>
                . To make it professional, purchase a domain from{" "}
                <strong>Cloudflare Registrar</strong> (lowest price and best
                security).
              </p>
              <Step n={1}>
                <p className="mb-2">
                  <strong>Add your Domain to Vercel:</strong>
                </p>
                <ul className="text-slate-600 space-y-1">
                  <li>
                    In Vercel: Go to your project → click{" "}
                    <strong>Domains</strong> → click{" "}
                    <strong>Add Existing</strong> (top right).
                  </li>
                  <li>
                    Type in your primary domain (e.g.,{" "}
                    <code className="bg-slate-100 px-1 rounded">
                      codingwithvibesonly.com
                    </code>
                    ).
                  </li>
                  <li>
                    Vercel will ask if you want to add the{" "}
                    <code className="bg-slate-100 px-1 rounded">www</code>{" "}
                    version too. Choose the recommended option to{" "}
                    <strong>add both and redirect one to the other</strong>.
                  </li>
                  <li>
                    Ensure <strong>Production</strong> is selected in the
                    environment dropdown.
                  </li>
                </ul>
              </Step>
              <Step n={2}>
                <p className="mb-2">
                  <strong>Get the "Technical Coordinates":</strong>
                </p>
                <p className="text-slate-600 mb-2">
                  Vercel will show "Invalid Configuration" in red — this is
                  normal! It will display two records to copy:
                </p>
                <ul className="text-slate-600 space-y-1">
                  <li>
                    <strong>A Record:</strong> A string of numbers (usually{" "}
                    <code className="bg-slate-100 px-1 rounded">
                      76.76.21.21
                    </code>
                    ).
                  </li>
                  <li>
                    <strong>CNAME Record:</strong> A value like{" "}
                    <code className="bg-slate-100 px-1 rounded">
                      cname.vercel-dns.com
                    </code>
                    .
                  </li>
                </ul>
              </Step>
              <Step n={3}>
                <p className="mb-2">
                  <strong>Connect the Wires (DNS Setup):</strong>
                </p>
                <p className="text-slate-600 mb-1">
                  <strong>Automated way (recommended):</strong> Click
                  "Configure Automatically" — it will open your Cloudflare
                  page. Click Authorize.
                </p>
                <p className="text-slate-600">
                  <strong>Manual way:</strong> Go to Cloudflare DNS Management
                  and paste the values from Vercel:
                </p>
                <ul className="text-slate-600 mt-1 space-y-0.5">
                  <li>
                    Set the <strong>A Record</strong> (Host:{" "}
                    <code className="bg-slate-100 px-1 rounded">@</code>) to
                    point to the Vercel IP.
                  </li>
                  <li>
                    Set the <strong>CNAME Record</strong> (Host:{" "}
                    <code className="bg-slate-100 px-1 rounded">www</code>) to
                    point to the Vercel CNAME value.
                  </li>
                </ul>
              </Step>
              <Step n={4}>
                <p className="mb-1">
                  <strong>The Final "Vibe Check":</strong>
                </p>
                <p className="text-slate-600">
                  Go back to your Vercel tab and hit Refresh next to your
                  domain. When the "Invalid Configuration" turns into a green{" "}
                  <strong>"Valid Configuration"</strong> checkmark, your site
                  is officially live!
                </p>
              </Step>
              <TipBox>
                DNS changes are the only part of coding that isn't instant. It
                can take anywhere from a few minutes to a few hours for the
                "internet's phonebook" to update. If it doesn't work
                immediately, grab a coffee and check back in 15 minutes!
              </TipBox>
            </SubSection>
          </section>

          {/* ═══════════════════════════════════════════════════════════
              DAILY STANDUP ROUTINE
          ═══════════════════════════════════════════════════════════ */}
          <section id="daily-standup" className="scroll-mt-4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                The "Daily Standup" Routine
              </h2>
            </div>
            <p className="text-slate-600 mb-2">
              When you're ready to pick up where you left off, your terminal
              won't automatically be in your project folder. You need to
              "re-enter" your workspace and wake up your tools. Follow these
              three steps:
            </p>

            <SubSection
              id="standup-folder"
              number={1}
              color="bg-teal-100 text-teal-700"
              title="Jump Back into Your Project Folder"
            >
              <p className="text-slate-600 mb-3">
                The terminal always starts at your computer's "home" base. To
                work on your app, you must move the terminal's focus back to
                your specific project.
              </p>
              <CommandBlock command="cd my-final-project" />
              <TipBox>
                If you aren't sure where you are, type{" "}
                <code>pwd</code> (Print Working Directory) to see your current
                location. It should end in{" "}
                <code>/my-final-project</code>.
              </TipBox>
            </SubSection>

            <SubSection
              id="standup-claude"
              number={2}
              color="bg-teal-100 text-teal-700"
              title="Wake Up Your AI Partner"
            >
              <p className="text-slate-600 mb-3">
                Once your terminal is inside the correct folder, re-launch your
                AI session so Claude can see your files again.
              </p>
              <CommandBlock command="claude" />
              <p className="text-slate-600 mt-2">
                Claude will immediately scan your folder and read your{" "}
                <code className="bg-slate-100 px-1 rounded">CLAUDE.md</code>{" "}
                file to remember exactly what you were building and what rules
                you established.
              </p>
            </SubSection>

            <SubSection
              id="standup-preview"
              number={3}
              color="bg-teal-100 text-teal-700"
              title="Start Your Local Preview"
            >
              <p className="text-slate-600 mb-3">
                If you want to see your website in the browser, restart the
                engine that powers your local preview.
              </p>
              <CommandBlock command="npm run dev" />
              <p className="text-slate-600 mt-2">
                Open your browser and go to{" "}
                <strong>http://localhost:3000</strong>. Your app is now live on
                your machine again!
              </p>
            </SubSection>
          </section>

          {/* ═══════════════════════════════════════════════════════════
              UPDATES
          ═══════════════════════════════════════════════════════════ */}
          <section id="updates" className="scroll-mt-4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Updates</h2>
            </div>
            <p className="text-slate-600">
              To ensure your live website reflects your latest changes, you
              need to "push" your code from your local Mac to GitHub. Because
              you have set up Vercel to watch your repository, simply updating
              GitHub will trigger the live website to update automatically.
            </p>

            <SubSection
              id="push-changes"
              number={1}
              color="bg-rose-100 text-rose-700"
              title="Save and Push Your Changes"
            >
              <p className="text-slate-600 mb-3">
                Open your terminal, ensure you are in your project folder, and
                run these three commands in order:
              </p>
              <CommandBlock
                command="git add ."
                label="Stage your changes (tells Git which files to save):"
              />
              <CommandBlock
                command={`git commit -m "Update the dashboard and fix the header"`}
                label="Commit your changes (creates a save point with a description):"
              />
              <CommandBlock
                command="git push origin main"
                label="Push to the Cloud (sends your work to GitHub):"
              />
            </SubSection>

            <SubSection
              id="auto-deploy"
              number={2}
              color="bg-rose-100 text-rose-700"
              title='The "Automatic" Handshake'
            >
              <p className="text-slate-600 mb-3">
                Once you run the push command, you don't need to do anything
                else for the website itself:
              </p>
              <ul className="text-slate-600 space-y-2 mb-4">
                <li>GitHub receives your new code.</li>
                <li>Vercel detects that your GitHub repository was updated.</li>
                <li>
                  Vercel automatically starts a new "Build" and updates your
                  site within about <strong>60 seconds</strong>.
                </li>
              </ul>
              <p className="text-sm font-semibold text-slate-700 mb-2">
                How to Verify It Worked:
              </p>
              <ul className="text-slate-600 space-y-1">
                <li>
                  <strong>Check Vercel:</strong> Log into your Vercel dashboard
                  and you will see a loading bar on your project card indicating
                  a new deployment is in progress.
                </li>
                <li>
                  <strong>Visit Your Site:</strong> Open your website in your
                  browser. If the changes aren't there yet, wait a minute and
                  refresh.
                </li>
              </ul>
              <TipBox>
                If your changes don't appear immediately, remember that
                "internet phonebooks" (DNS) can sometimes take a few minutes to
                catch up — though with Vercel, it is usually nearly instant!
              </TipBox>
            </SubSection>
          </section>

          {/* Footer */}
          <div className="border-t border-slate-200 pt-8 pb-4 text-center text-slate-400 text-sm">
            Vibe Coding for PMs — You've got this!
          </div>
        </div>
      </main>
    </div>
  );
}
