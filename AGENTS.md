# Agent notes for connectwithprakash.github.io

Personal portfolio site: React 19 + Vite SPA, plain CSS per component, dark
glassmorphism design. Deploys automatically from `main` to
`https://www.connectwithprakash.com`, so **pushing is publishing**.

## Skill routing

Repo-specific knowledge lives in `skills/` and versions with the code. Load
the skill BEFORE making the change it governs:

| Touching | Load first |
|---|---|
| `src/content/projects/*` (add/update a project) | `skills/portfolio-project-page/SKILL.md` |
| `src/data/newsData.js` | `skills/portfolio-project-page/SKILL.md` (release cascade section) |
| Project images under `public/assets/img/projects/` | `skills/portfolio-project-page/SKILL.md` (images and captures sections) |

Adding a released project ALWAYS triggers the release cascade checklist in
that skill (news entry decision, featured budget, category check). Do not
skip it silently.

## Basics

- Dev: `npm run dev` · Build: `npm run build` · Lint: `npm run lint`
- Projects and blog posts auto-register from `src/content/`; no route edits.
- Verify rendering with a headless browser against the production build
  before pushing; check dark mode (the default) explicitly.
