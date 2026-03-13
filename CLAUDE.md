# Project: Vibe Coding Lesson

## Tech Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Linting**: ESLint

## Project Rules
- Use the App Router (`app/` directory), not Pages Router
- Prefer Server Components by default; add `"use client"` only when needed
- Use Tailwind CSS for all styling — no inline styles or CSS modules unless necessary
- Keep components small and focused; extract reusable pieces to `app/components/`
- TypeScript strict mode is on — no `any` types
- Run `npm run lint` before considering a feature complete

## File Structure
```
app/
  layout.tsx       # Root layout
  page.tsx         # Home page
  components/      # Shared UI components
public/            # Static assets
```

## Progress
- [x] Next.js project initialized with TypeScript + Tailwind CSS
- [ ] ...
