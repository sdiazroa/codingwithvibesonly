# Decisions

What's true now, and why. Newest first. A reversed decision gets deleted; git has the history.

- **2026-11-08** The course has two paths in order: build a habit tracker together, then build your own app with the full process. *Why:* Silvia's call: people learn the loop on something concrete, and then think harder on their own idea. Other beginner courses also build a specific project.
- **2026-11-08** The landing is dark blue with an arc that moves: light travels along it, its glow breathes, and a cursor blinks. The lessons stay light for reading. *Why:* Silvia's call: clean, with movement, and dark reads as more vibey and engineer coded. Blue tones, not orange.
- **2026-11-08** The favicon is a prompt and cursor, `>_`. *Why:* that's what you type into when you vibe code.
- **2026-11-08** Testing and the audit come before launch. *Why:* a review of other beginner courses (LinkedIn Learning, DeepLearning.AI, DataCamp) showed they all review before going live, and we had it after.
- **2026-11-08** Removed the "Why the blueprint comes first" lesson and the house drawing. Its one idea is now two sentences at the start of the Product stage. *Why:* Silvia's review: the page was unnecessary and the visual too big.
- **2026-11-08** The author credit, "By Silvia Diaz-Roa," links to her LinkedIn from the landing page and the bottom of the navigation.
- **2026-11-08** The course starts by downloading Claude. Lessons are numbered walkthroughs with drawings of where to click, and Mac and Windows steps where they differ. The concept lesson on vibe coding became one sentence in the first lesson. GitHub and going live are separate lessons again, using steps from the original site. *Why:* Silvia's review: instructions must walk people through each step, and clean doesn't mean vague.
- **2026-11-08** The site is for anyone, not only product managers. *Why:* Silvia confirmed the audience.
- **2026-11-08** Where-to-click visuals are drawings, not screenshots. *Why:* they're clean, show no private data, and are quick to update when the app changes.
- **2026-11-08** Stripped the lessons to a title, one idea, at most one prompt, and Next. Removed the stage bar, lesson counts, read times, badges, takeaways, recaps, Words to know boxes, callouts, the All lessons page and colored accents. *Why:* Silvia's review: the lessons were cluttered, and every word, button and visual has to earn its place. `tests/content.test.ts` now enforces the limits.
- **2026-11-08** Rebuilt the site from one long page into a landing page and short lessons in 7 stages. *Why:* the old page taught tools first and building right away. The most important skill now is understanding what you're building before you build it.
- **2026-11-08** Setup starts with the Claude desktop app. The terminal is an optional pop-up. *Why:* the app includes Claude Code, so Homebrew, Node and the terminal aren't needed on day one.
- **2026-11-08** Product, Design and Architecture all come before Build, in that order. *Why:* the architecture is chosen from the product and design goals, even though it's the foundation of what gets built.
- **2026-11-08** No quizzes or exams. *Why:* the student's own project is the test.
- **2026-11-08** Lessons are typed data instead of markdown. *Why:* prompts and visuals are the core of each lesson, and types catch mistakes at build time.
- **2026-11-08** Plain CSS replaced Tailwind. *Why:* a small set of tokens and components is easier to keep consistent.
- **2026-11-08** Fonts are bundled. *Why:* a Vercel build on The Class We Missed once failed fetching them from Google.
