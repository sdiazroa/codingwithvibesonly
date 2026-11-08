# Writing a lesson

Each stage is one file in `content/lessons/`. `tests/content.test.ts` enforces the limits below.

## Every lesson
- One idea, with 60 words of explanation or fewer. Then the walkthrough.
- At most 8 steps, one prompt, one diagram and one pop-up.
- Before adding anything, ask: would the reader miss it?

## Steps
- One action per step, under 40 words. Name the exact control, what to type and what they'll see.
- Assume nothing. Someone may never have made a folder.
- Show where to click with a `mock` whenever it helps. One per step.
- Use an `os` block when Mac and Windows differ.
- Working with Claude uses the steps in `content/patterns.ts`. Don't reword them lesson by lesson.

## Words
- Plain words first. Say why before how.
- Add a term to `words:` only if a beginner would get stuck on it.
- Detail that most people can skip goes in a pop-up.
- Run external prose through `/humanizer`. No em dashes.

## Prompts
- Anything to copy is a `prompt` or `command`, so it always has a copy button.
- In the Your own app stages, prompts before Build never build the app. They interview the student and leave a document behind.
- Ask Claude to ask one question at a time and use plain language.
- Fill-ins are in `[CAPITAL BRACKETS]`. Use them only when Claude can't ask instead.
- A prompt has one home, its lesson. All prompts is built from them.

## The habit tracker
Its prompts are specific and don't interview the student, so everyone gets a working app. If you change one, test the result again.

## Keep it true
Check every button name, command and plan against the [Claude Code docs](https://code.claude.com/docs/en/overview). If the docs don't name a label, describe it instead of guessing.

## Not in this course
Quizzes, exams, streaks, recaps.
