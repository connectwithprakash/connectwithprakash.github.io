---
name: portfolio-project-page
description: Add or update a project page on this portfolio site. Use when creating a project page, publishing a project, adding a project card, refreshing a project's images or description, or making any change under src/content/projects/ or src/data/newsData.js. Covers the content schema, the release cascade checklist (news, featured, categories), image conventions, palette validation, real-app capture techniques, and rendering verification.
---

# Portfolio Project Page

Publish a project as a case-study page on this site. The site is a React 19 + Vite SPA; projects are markdown files that auto-load, so a page is content plus assets, no route changes.

## Site facts

- A project = `src/content/projects/<id>.md`. `src/data/projectLoader.js` globs the directory; dropping the file in is registration. The `id` field must equal the filename slug and becomes `/project/<id>`.
- Images live in `public/assets/img/projects/<id>/`, referenced root-absolute (`/assets/img/projects/<id>/...`).
- News items live in `src/data/newsData.js` (`{date, icon, title, description, color}`; newest first).
- Categories are hardcoded in `src/pages/ProjectsPage.jsx`.
- Build: `npm run build`. Sitemap picks up content files automatically. Deploys automatically from `main` (live at `https://www.connectwithprakash.com`), so pushing IS publishing.

## Frontmatter schema

Title rule: portfolio visitors read titles with ZERO context, so the title
self-describes rather than using the brand short-form when they differ
("Agent Session Bridge", not "Session Bridge"); the `id`/URL and in-page
command references keep the short name.

Required-ish: `id`, `title`, `shortDescription` (1-2 sentence card text), `category`, `tags`, `startDate`/`endDate` (`YYYY-MM`), `status` (`completed`/`released`/`in-progress`; in-progress pins to top), `importance` (lower wins ties), `featured`, `gradient` (a `var(--gradient-*)`; check current usage counts and pick an underused one that harmonizes with the artwork), `thumbnail`/`heroImage`, `github`, `images: [{path, caption}]`. Quote any YAML value containing a colon.

`images` entries ending in `.mp4`/`.webm` render as muted looping autoplay video with native controls; static images open in a lightbox.

## Release cascade checklist

Run this whenever a project page is ADDED or its status changes to released/completed. Each row is a conscious decision; never skip one silently.

| Surface | Trigger | Action |
|---|---|---|
| `src/data/newsData.js` | New released project | Decide: news entry? Launches historically get one (diskard, Lazyflow, Session Bridge). Shape: `{date: 'Month YYYY', icon: 'rocket', title, description, color: 'var(--neon-green)'}`. Order strictly by event date, newest first, including within the same month; do not reorder by perceived significance |
| `featured` flag | Always | Budget check: the home section renders ALL featured projects, so each addition crowds it. Decide whether something else should un-feature |
| Categories in `src/pages/ProjectsPage.jsx` | Only if the project needs a new category | Add to the hardcoded list |
| Sitemap / routing | Never | Automatic; no action |
| Build + live page | Always | Verification section below |

## Content shape

Long-form case study in the owner's voice (load `authorship-voice`; no em dashes in prose, evidence over confidence, plain language). Mermaid renders in the body. Typical sections: Overview, a model/comparison section with a diagram, capability or asymmetry tables, Engineering Lessons (honest ones, including bugs found), Technologies. End with a `humanize-text` pass; captions are the usual comma-splice offenders.

## Images: vary style, fix entity colors

- Thumbnail convention: hand-authored SVG, viewBox `0 0 800 500`, dark background `#111118` with rounded corners. Keep decorative glows clipped to the card rect (a `clipPath`), or they haze outside it on light pages.
- Load `dataviz` before any artwork. Entities that appear across multiple images keep ONE hue everywhere (color follows the entity); style variation comes from geometry, background treatment, and typography, not from repainting entities. Validate the entity palette with the dataviz validator against the dark surface; site neon accents are usually too bright for marks and need darker steps.
- Fan out one agent per illustration with the palette and style spec pinned in the prompt; review each render before shipping (`qlmanage -t -s 1200 -o . file.svg` rasterizes SVGs for inspection).

## Real-app captures

- **Static screenshots of a textual TUI:** drive the app headlessly with `app.run_test()` + Pilot and call `app.save_screenshot("name.svg")` per screen. Seed realistic fake data first; point the app at fake home dirs, never real user stores.
- **Demo recordings:** `vhs` + `ttyd` record a real terminal run. Set `Env HOME "<seeded-fake-home>"` in the tape so discovery hits staged data. Quote Output paths and Env values. Keystroke counts are fragile: verify the exact key sequence in a Pilot script first (initial focus is often a container, not the first widget; Enter on a Select opens the dropdown). If the tape needs awkward key gymnastics, that is usually a real app UX bug; fix the app, then re-tape. End the recording on the final meaningful screen, not on the shell prompt after quit.
- **Format: MP4 for this site, GIF for the project's GitHub README.** Add `Output demo.mp4` alongside the GIF in the same tape. MP4 is sharper (no 256-color banding), smaller, and pausable/scrubbable here; GitHub READMEs autoplay GIFs inline, so the GIF's home is the project repo (`docs/media/`), not this site.
- Verify recording content frame-by-frame: `ffprobe -count_frames` for the total, then `ffmpeg -vf "select='eq(n\,N)'"` to extract frames at checkpoints and confirm each screen actually appears.
- **Driving a REAL third-party binary in the tape (the payoff shot):** a demo that ends inside the real tool (e.g. `codex resume` continuing an imported session) beats one that ends on your own success screen. Gotchas learned live: hand-built SQLite stores can satisfy a tool's read paths but fail its interactive TUI, which runs schema migrations (clone the real store's `.schema` minus `sqlite_sequence`, plus its migrations-ledger rows, instead of hand-writing DDL); trust/config entries must name the REALPATH (`/private/tmp/...`), not the `/tmp` symlink; pre-verify the interactive flow with the tool's non-interactive twin (`codex exec resume ...`) before taping; and pin any runtime-generated id by typing a fixed value into the form so later tape commands can reference it. Model responses on camera are genuinely live — budget a 40s+ Sleep and screenshot-verify the answer landed.

## Verification before commit

1. `node -e` with `gray-matter` to confirm the frontmatter parses (especially after quoting captions).
2. `npm run build`; confirm the assets land in `dist/` and the sitemap includes the page.
3. Screenshot the rendered page AND the projects-grid card via headless browser, in dark mode too (`localStorage.setItem('theme','dark')`; headless defaults to light).
4. `npm install` churn in `package-lock.json` from a newer local node is incidental; revert it rather than committing it.
5. Commit content + assets together (`feat(projects): add <name> project page`). Pushing `main` publishes the live site, so push deliberately, then spot-check the live URL.
