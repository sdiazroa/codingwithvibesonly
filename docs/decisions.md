# Decisions

What's true now, and why. Newest first. A reversed decision gets deleted; git has the history.

- **2026-11-08** Rebuilt the site from one long page into a landing page and 20 short lessons across 7 stages. *Why:* the old page taught tools first and building right away. The most important skill now is understanding what you're building before you build it.
- **2026-11-08** Setup starts with the Claude desktop app. The terminal is an optional pop-up. *Why:* the app includes Claude Code, so Homebrew, Node and the terminal are no longer needed on day one.
- **2026-11-08** Stages 2 to 4 are the blueprint. Their prompts make documents, and the build starts only after the Blueprint check. *Why:* AI builds the wrong thing as fast as the right thing.
- **2026-11-08** No quizzes or exams. *Why:* the student's own project is the test.
- **2026-11-08** Lessons are typed data instead of markdown. *Why:* prompts, diagrams and checklists are the core of each lesson, and types catch mistakes at build time. No extra packages needed.
- **2026-11-08** Diagrams are built from text and CSS, not image files. *Why:* they reflow on a phone without a second version of each drawing.
- **2026-11-08** Plain CSS replaced Tailwind. *Why:* a small set of named components and color tokens is easier to keep consistent, and it's what The Class We Missed settled on.
- **2026-11-08** Fonts are bundled. *Why:* a Vercel build on The Class We Missed once failed fetching them from Google.
