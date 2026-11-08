# Decisions

What's true now, and why. Newest first. A reversed decision gets deleted; git has the history.

- **2026-11-08** The house shows architecture as the foundation, design spanning the whole house, and product as the line running through it. *Why:* architecture is the foundation, design is considered everywhere, and product management keeps things running. An earlier version stacked them as numbered layers with product at the bottom, which was wrong.
- **2026-11-08** Stripped the lessons to a title, one idea, at most one prompt, and Next. Removed the stage bar, lesson counts, read times, badges, takeaways, recaps, Words to know boxes, callouts, the All lessons page and colored accents. *Why:* Silvia's review: the lessons were cluttered, and every word, button and visual has to earn its place. `tests/content.test.ts` now enforces the limits.
- **2026-11-08** Rebuilt the site from one long page into a landing page and short lessons in 7 stages. *Why:* the old page taught tools first and building right away. The most important skill now is understanding what you're building before you build it.
- **2026-11-08** Setup starts with the Claude desktop app. The terminal is an optional pop-up. *Why:* the app includes Claude Code, so Homebrew, Node and the terminal aren't needed on day one.
- **2026-11-08** Product, Design and Architecture all come before Build, in that order. *Why:* the architecture is chosen from the product and design goals, even though it's the foundation of what gets built.
- **2026-11-08** No quizzes or exams. *Why:* the student's own project is the test.
- **2026-11-08** Lessons are typed data instead of markdown. *Why:* prompts and visuals are the core of each lesson, and types catch mistakes at build time.
- **2026-11-08** Plain CSS replaced Tailwind. *Why:* a small set of tokens and components is easier to keep consistent.
- **2026-11-08** Fonts are bundled. *Why:* a Vercel build on The Class We Missed once failed fetching them from Google.
