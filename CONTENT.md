# Writing a lesson

Each part of the course is one file in `content/lessons/`. A lesson is typed data (`lib/types.ts`), so a mistake fails the build. `tests/content.test.ts` checks the rest.

## Every lesson
- One idea. Prose stays under 170 words, and most of it should be shorter.
- A takeaway of one line, and a recap of three or four sentences with no new claims.
- A visual, a prompt or both.
- Ends with one next step. The page adds it.

## Words
- Plain words first, then the term. Say why before how.
- Add a term to `words:` if a beginner may not know it. Its first use in the text gets a hover definition.
- Extra detail goes in a `dive` pop-up, not in the lesson.
- Run external prose through `/humanizer`. No em dashes.
- A caveat has to earn its place: keep it only if it changes what the student does.

## Prompts
- Anything to copy is a `prompt` or `command` block, so it always has a copy button.
- Prompts in stages 2 to 4 never build the app. They interview the student and leave a document behind.
- Ask Claude to ask questions one at a time, and to explain in plain language.
- Say which mode to use. Audits and bug reports say "don't change anything yet."
- Prompts have one home, the lesson. The All prompts page is built from them.
- Fill-ins are in `[CAPITAL BRACKETS]`, and they're highlighted automatically. Use them only when Claude can't ask instead.

## Correcting myths
Use a `myth` block. Say it made sense to believe it, then say what's true. Never "actually" or "wrong."

## Keep it true
Tools change fast. When a lesson names a button, a command or a plan, check it against the [Claude Code docs](https://code.claude.com/docs/en/overview). Recheck the setup lessons whenever the docs change.

## Not in this course
No quizzes, no exams, no streaks. The Blueprint check is for the student's own use, and it's never graded.
