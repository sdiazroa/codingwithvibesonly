import type { Part } from "@/lib/types";

export const grow: Part = {
  slug: "grow",
  title: "Grow",
  summary: "Keep the app healthy, keep learning from users, and keep building.",
  lessons: [
    {
      slug: "your-daily-routine",
      title: "Your daily routine",
      takeaway: "Start each session by getting caught up. End it by writing down what changed.",
      blocks: [
        { type: "p", text: "Claude won't remember yesterday's conversation, but your docs and save points will. Two short prompts keep you and Claude on the same page." },
        {
          type: "flow",
          items: [
            { title: "Open the folder" },
            { title: "Catch up", note: "Where did we leave off?" },
            { title: "Pick one thing", note: "Then run the build loop." },
            { title: "Wrap up", note: "Update docs and commit." },
          ],
        },
        {
          type: "prompt",
          id: "start-session",
          title: "Start a session",
          mode: "Plan",
          text: "Read CLAUDE.md and docs/plan.md, and check the recent commits. Tell me in plain language where we left off, what's next, and anything unfinished. Recommend the one thing I should do today. Don't change anything yet.",
        },
        {
          type: "prompt",
          id: "end-session",
          title: "End a session",
          text: "Before I stop: update docs/plan.md with where we are, note any decisions and why in docs/decisions.md, make sure the other docs still match what we built, and commit everything.",
        },
      ],
      recap: [
        "Your docs and commits are Claude's memory, so keep them up to date.",
        "Start by catching up, and work on one thing at a time.",
        "End every session with updated docs and a commit.",
      ],
    },
    {
      slug: "audit-your-project",
      title: "Audit your project",
      takeaway: "Every so often, ask Claude to inspect the whole project. Small problems get fixed before they pile up.",
      handsOn: "20 min",
      blocks: [
        { type: "p", text: "Fast building creates drift. A second kind of button appears. The same logic gets written twice. Nothing looks wrong on any given day, until every change gets harder. An audit catches it early." },
        {
          type: "cards",
          items: [
            { title: "Every few milestones", note: "A regular habit, so it stays quick." },
            { title: "Before launch", note: "Run all three audits." },
            { title: "Before a big feature", note: "Start from solid ground." },
          ],
          caption: "When to run an audit.",
        },
        { type: "p", text: "Use a new session for each one. Ask for a report first, and decide what to fix after you've read it." },
        {
          type: "prompt",
          id: "design-audit",
          title: "Design audit",
          mode: "Plan",
          text: `Audit this app against docs/design.md. Don't change anything yet.

Look at every screen at phone and desktop size and list:
- colors, fonts, spacing or buttons that don't follow the rules
- screens with more than one main action
- missing empty, loading and error states
- text that's hard to read, and buttons too small to tap

Rank what you find by how much it hurts the people using the app, and suggest the smallest fix for each.`,
        },
        {
          type: "prompt",
          id: "code-audit",
          title: "Code audit",
          mode: "Plan",
          text: `Act as a senior engineer who just joined this project. Audit the code against docs/architecture.md. Don't change anything yet.

Look for:
- duplicated code, and files that do too much
- dead code and confusing names
- anything that drifted from the architecture
- what would break first if we had 100 times the users
- important paths with no automated test

I'm not technical, so explain each problem in plain language: why it matters and how much work it is to fix. Then recommend the top three.`,
        },
        {
          type: "prompt",
          id: "security-audit",
          title: "Security audit",
          mode: "Plan",
          text: `Audit the security of this app. Don't change anything yet.

Check for:
- passwords or keys in the code or the Git history
- whether anyone can see or change data that isn't theirs
- forms and inputs that trust whatever people type
- outdated packages with known vulnerabilities
- missing security headers

Rank what you find by risk and explain each one in plain language.`,
        },
        { type: "p", text: "Then fix the most important problem first, and make sure it can't come back." },
        {
          type: "prompt",
          id: "audit-fix",
          title: "Fix and prevent",
          mode: "Plan",
          text: "Fix the number one problem from the audit, and nothing else. Then update CLAUDE.md or the docs with a rule so it doesn't come back.",
        },
        {
          type: "dive",
          id: "built-in-reviews",
          title: "Claude Code's built-in reviews",
          blocks: [
            { type: "p", text: "Claude Code also has built-in review commands. Type one into the prompt box." },
            { type: "command", label: "Check recent changes for bugs", text: "/code-review" },
            { type: "command", label: "Check your branch for security problems", text: "/security-review" },
            { type: "command", label: "Clean up and simplify recent code", text: "/simplify" },
            { type: "p", text: "If your app handles payments or sensitive information, have a security professional look at it as well." },
          ],
        },
      ],
      recap: [
        "Fast building creates drift, and audits catch it.",
        "Run design, code and security audits every few milestones and before launch.",
        "Ask for the report first, then fix the top problem and add a rule to prevent it.",
      ],
      words: [{ term: "drift", meaning: "When a project slowly stops following its own rules, one small change at a time." }],
    },
    {
      slug: "grow-with-your-users",
      title: "Grow with your users",
      takeaway: "Launching is the start. Now real people show you what to build next.",
      blocks: [
        { type: "p", text: "Show the app to five real people and watch them use it without helping. You'll learn more in an hour than in a week of building." },
        { type: "p", text: "Then measure one thing: the moment your app delivers its value. Pick one number, so you can tell whether a change helped." },
        {
          type: "prompt",
          id: "feedback",
          title: "Turn feedback into a decision",
          mode: "Plan",
          text: `Here's what people told me and what I saw:

[PASTE YOUR NOTES]

Read docs/product.md. Group this feedback by the underlying problem, not by what people asked for. Recommend the one thing to build next and one thing we should not build, and explain why. Update the Later list.`,
        },
        { type: "p", text: "**Every new feature follows the same order as your first version.** It's a smaller blueprint each time, so the foundation stays solid." },
        {
          type: "flow",
          loop: true,
          items: [{ title: "Learn from users" }, { title: "Product" }, { title: "Design" }, { title: "Architecture" }, { title: "Build" }, { title: "Ship" }],
        },
        {
          type: "prompt",
          id: "new-feature",
          title: "Plan a new feature",
          mode: "Plan",
          text: `I want to add: [THE FEATURE]

Before any code, read CLAUDE.md and docs/. Interview me, one question at a time, about who needs this and why. Tell me if a simpler version would work.

Then update docs/product.md, docs/design.md and docs/architecture.md if they need to change, and add the work to docs/plan.md as small milestones. Don't build anything yet.`,
        },
      ],
      recap: [
        "Watch real people use the app, and measure one thing that matters.",
        "Group feedback by the underlying problem, not by what people asked for.",
        "Every new feature gets a small blueprint before it gets built.",
      ],
    },
  ],
};
