# Design

## The rule
**Every word, button and visual earns its place, or it goes.** Clean is the goal. Passing an automated check doesn't mean a screen is clean. Ask: would the reader miss this?

## Principles
1. **One idea per screen.** A lesson teaches one thing, with at most one prompt and one visual.
2. **One clear action.** Copy the prompt, then Next.
3. **Say it once.** No summary of what the page just said. No label for what's already obvious.
4. **Space before lines, lines before boxes.** The only box in a lesson is a prompt, because that's what the student acts on.
5. **Consistent everywhere.** The same thing always looks the same. Use the tokens and components below, and don't add new ones without removing something.
6. **A visual has to be true.** If a diagram's logic is off, fix it or cut it.

## How the course sees it
Architecture is the foundation. Design shapes everything people touch. Good product management keeps it all running smoothly. Any visual of these should say that.

## The system
- **Color:** paper, white for prompts, ink, one quiet gray, one blue for action. Deep blue only for the blueprint drawing.
- **Type:** Source Serif 4 for headings, Inter for everything else, monospace for text to copy. Four sizes: 15, 17, 20 and 40. The landing headline is the one exception.
- **Components:** one button, one quiet text control, prompt, flow, compare, rows, the house, checklist, pop-up.
- **Motion:** only the landing drawing. It's complete without the animation.

## Screens
- **Landing:** one screen, no scrolling, at any size. Headline, one line, one button. Returning students also get a quiet continue link.
- **Lesson:** title, content, Next. Nothing above the title.
- **Sidebar:** stages, with only the current stage's lessons open. Dots show progress. Phones get the same list behind Menu.
- **All prompts:** the prompts, grouped by stage.

## Review before showing anyone
1. Say the screen's job in one sentence, then look at each element and ask whether it helps that job. Remove what doesn't.
2. Look at it at 1440px and 375px, in screenshots.
3. Compare it to the principles above. Say honestly where it falls short.
4. Copy `tools/ui-audit.js` to `public/__audit.js`, serve the production build, add it to the page with a script tag and run `window.__audit()`. Delete the copy afterward. Tap targets on phones are at least 40px.
