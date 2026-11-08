# Design

## The rule
**Every word, button and visual earns its place, or it goes. But clean is not vague: a beginner should never have to guess what to do next.** Cut decoration and repetition. Never cut a needed step.

## Principles
1. **One action per step.** Say where to click, what to type and what they'll see next.
2. **Show where to click.** A drawing with the one control marked beats a sentence about it.
3. **One clear next step.** Each screen has one main action.
4. **The same steps every time.** Working with Claude follows one pattern (`content/patterns.ts`), so it becomes second nature.
5. **Say it once.** No summary of what the page just said.
6. **Space before lines, lines before boxes.** Only a prompt or a drawing gets a box.
7. **Consistent everywhere.** The same thing always looks the same. Don't add a new component without removing one.
8. **A visual has to be true.** If its logic is off, fix it or cut it.

## How the course sees it
Architecture is the foundation. Design shapes everything people touch. Good product management keeps it all running smoothly.

## The system
- **Color:** paper, white for prompts and drawings, dark blue ink, one quiet gray, one blue for action. The landing is dark blue with an electric arc. Lessons stay light for reading.
- **Type:** Source Serif 4 for lesson headings, Inter for everything else, monospace for text to copy. Sizes: 15, 17, 20 and 40. The landing headline and the 13px text inside drawings are the exceptions.
- **Components:** one button, one quiet text link, step, drawing, Mac or Windows switch, prompt, flow, compare, rows, checklist, pop-up.
- **Motion:** only the landing: the arc rises, light travels along it, its glow breathes, and a cursor blinks. All of it stops for people who ask for less motion, and the page is complete without it.

## Screens
- **Landing:** one light full page, no split, no scrolling at any size. Moving blue arc, headline, one short line, one button, and the author credit.
- **Lesson:** title, then the walkthrough, then Next. Nothing above the title.
- **Sidebar:** the site mark, then stages with only the current stage's lessons open. Labels mark the optional exercise and the student's own app, and each label jumps to its start. All prompts and the author credit sit below. Phones get the same list behind Menu.
- **All prompts:** a search box above the prompts, grouped by stage. Search filters as you type.

## Drawings
`components/Mock.tsx` draws where to click, marking the control with `.hit`. They're simplified on purpose. Names come from the [Claude Code docs](https://code.claude.com/docs/en/desktop). When the app changes, update them.

## Review before showing anyone
1. Follow the lesson as someone who has never done this. Is any step a guess?
2. Say the screen's job, then ask whether each element helps it. Remove what doesn't.
3. Look at it at 1440px and 375px, in screenshots.
4. Compare it to the principles above. Say honestly where it falls short.
5. Copy `tools/ui-audit.js` to `public/__audit.js`, serve the production build, add it to the page with a script tag and run `window.__audit()`. Delete the copy afterward. Tap targets on phones are at least 40px.
