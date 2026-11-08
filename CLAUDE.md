# Coding with Vibes Only

A hands-on course that teaches non-technical people to build real apps with AI, starting with the blueprint. This repo follows what the course teaches.

Read these before changing anything:
- [docs/product.md](docs/product.md): who it's for, what's in and out
- [docs/design.md](docs/design.md): design rules and the review checklist
- [docs/architecture.md](docs/architecture.md): how the site is built, and the release flow
- [docs/decisions.md](docs/decisions.md): what was decided and why
- [CONTENT.md](CONTENT.md): how to write a lesson

Rules:
- This version of Next.js may differ from what you remember. Read `node_modules/next/dist/docs/` before using an API.
- Lessons live in `content/lessons/`. Don't build lesson text into components.
- Reuse components and CSS tokens. A new color means a new line in `tests/contrast.test.ts`.
- Run `npm run lint`, `npm run typecheck`, `npm test` and `npm run build` before calling anything done.
- Look at every changed screen at 1440px and 375px before showing it to anyone.
- When a decision changes, update the docs and note why in `docs/decisions.md`.
- Commit messages end with the Co-Authored-By line for Claude.
