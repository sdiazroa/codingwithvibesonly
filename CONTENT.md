# Writing a lesson

Each stage is one file in `content/lessons/`. `tests/content.test.ts` enforces the limits below. Tighten them; don't raise them.

## Every lesson
- One idea, in 80 words or fewer. Start with the fewest words that work.
- At most one prompt, one visual and one pop-up. Use none if the lesson works without them.
- Before adding anything, ask: would the reader miss it?

## Words
- Plain words first. Say why before how.
- Add a term to `words:` only if a beginner would get stuck on it.
- Detail that most people can skip goes in a pop-up.
- Run external prose through `/humanizer`. No em dashes.

## Prompts
- Anything to copy is a `prompt` or `command`, so it always has a copy button.
- Prompts before the Build stage never build the app. They interview the student and leave a document behind.
- Ask Claude to ask one question at a time and use plain language.
- Fill-ins are in `[CAPITAL BRACKETS]`. Use them only when Claude can't ask instead.
- A prompt has one home, its lesson. All prompts is built from them.

## Keep it true
When a lesson names a button, command or plan, check it against the [Claude Code docs](https://code.claude.com/docs/en/overview).

## Not in this course
Quizzes, exams, streaks, recaps.
