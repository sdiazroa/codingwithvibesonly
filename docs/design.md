# Design

## North star
A blueprint on a clean desk: calm, precise, a little bit crafted. Welcoming to beginners and grown-up about it. Clear like Notion, structured like Khan Academy. Not a noisy game and not a default AI template.

## Principles
1. **One clear next step.** Each screen has one main action.
2. **Show, then tell.** A diagram or prompt beats a paragraph.
3. **Few words.** If a sentence doesn't help someone learn or act, cut it.
4. **Copying is one click.** Anything to paste has a button.
5. **Progress without pressure.** No grades, no streaks, no guilt.
6. **Practice what we teach.** The site should pass its own audits.

## Visual system
- **Color:** tokens in `styles/base.css`. Paper background, ink text, one blue for actions and links. Amber means blueprint stage, and nothing else. The only dark element is a prompt, because it's what the student acts on.
- **Type:** Source Serif 4 for headings, Inter for everything else, the system monospace for prompts. Sizes: 13, 15, 17, 20 and 26, plus one large heading. At most six on a screen.
- **Space:** generous between ideas. Prefer space or a tint over a border.
- **Diagrams:** built from text and CSS in `components/Figures.tsx`, so they reflow on a phone and the words stay readable. The house is the one drawing.
- **Motion:** short, and only to orient. The landing house draws itself from the foundation up. Off under `prefers-reduced-motion`, and the drawing is complete without it.

## Controls
- Every control has hover, keyboard focus and pressed states. Copy says "Copied."
- On a phone, buttons are full width and tap targets are at least 40px. Links inside running text are exempt.

## Screens
- **Landing:** one screen with no scrolling at any size. Headline, one line, one button, and a quiet continue link for returning students. Checked at 1280x720, 1440x800, 1920x1080, 1024x600, 768x1024, 375x812, 375x667, 320x568 and 667x375. On very short screens the drawing gives way to the words.
- **Lesson:** path, title, takeaway, blocks, recap, words to know, next step. Never hide lesson content in accordions.
- **Sidebar:** every lesson, with a dot that fills when done. The blueprint stages are marked. Phones get a Menu button with the same list.

## Review before showing anyone
1. Say the screen's job and its one main action in a sentence.
2. Look at it at 1440px and 375px, in screenshots.
3. Competing buttons? Too many sizes? Anything that looks like a default AI template (everything centered, floating cards, gradient blobs)?
4. Copy `tools/ui-audit.js` to `public/__audit.js`, serve the production build, add it to the page with a script tag and run `window.__audit()`. It checks contrast, tap targets, sideways scrolling and text sizes. Delete the copy afterward.
