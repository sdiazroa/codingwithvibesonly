# Architecture

The simplest thing that works: a static site. No back end, no database, no accounts, no monthly cost beyond hosting.

```
content/lessons/*.ts  →  Next.js builds static pages  →  Vercel serves them
                                                              ↓
                                     progress stays in the browser (localStorage)
```

## Parts
- **Next.js (App Router) and TypeScript.** Every page is generated at build time.
- **Lessons as typed data** in `content/lessons/`, one file per stage. `lib/course.ts` reads them. The All prompts page is built from the lessons, so a prompt has one home.
- **Plain CSS** in `styles/`, one file per area, with color tokens in `base.css`. Change the existing rule instead of adding an override below it.
- **Fonts are bundled** in `fonts/`, so a build never depends on fetching them.
- **Security headers** are set in `next.config.ts`. The site loads nothing from other domains, and the policy keeps it that way. Adding an outside script or font means changing the policy on purpose.

## Folders
`app/` pages · `components/` UI · `content/` lessons · `lib/` helpers · `styles/` CSS · `tests/` checks · `tools/` audit script

## Checks
`npm test` runs `tests/content.test.ts` (lesson rules) and `tests/contrast.test.ts` (every color pair). GitHub runs lint, types, tests and build on every pull request and push to `main`.

## Releasing
- GitHub: `sdiazroa/codingwithvibesonly`. Vercel project: `codingwithvibesonly`. DNS is in Cloudflare.
- `main` deploys to www.codingwithvibesonly.com. Other domains redirect there.
- Any other branch gets a preview link. Do bigger changes on a branch and review the preview first.
- After pushing, confirm the deployment is Ready and open the live site. A passing local build doesn't prove it.
