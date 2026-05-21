---
context_version: 2
slug: diskard-website-integration
project_path: /Users/prakash/Developer/personal-projects/website
created: 2026-02-21
updated: 2026-02-21 21:22
tags: [diskard, website, screenshots, tui, resume, cv, image-layout, developer-tools]
---
# Context: diskard website integration

## Summary
Added the diskard project (Rust CLI/TUI for developer-aware disk cleanup) to the personal portfolio website. This involved creating the project markdown page with full content, SVG hero/thumbnail images, TUI screenshots captured via tmux automation, news entry, resume/CV updates, and a new "Developer Tools" category. Also created a separate CV document alongside the targeted resume with a toggle on the website. Added a `imageLayout: stacked` frontmatter option so wide terminal screenshots display vertically instead of in a cramped 3-column grid. All changes are committed and pushed to main.

## Current State
- diskard project page is live with full content, SVG images, and 3 TUI screenshots
- Screenshots show: scan results, item selection, drill-down view (captured at 120x32 terminal via tmux)
- Resume includes diskard project and Rust skill; CV has all 5 projects
- Resume/CV toggle works on the website with pill-shaped segmented control
- "Developer Tools" and "Mobile Apps" categories added to project filter
- `imageLayout: stacked` works for diskard, stacking images vertically at max 800px
- No lightbox/fullscreen image viewer yet (images only have hover scale effect)
- All changes pushed to `origin/main`

## Next Steps
- Add lightbox/fullscreen click-to-expand for project images (benefits all projects)
- Consider optimizing screenshot file sizes further (currently 460KB-890KB each)
- Close old Terminal windows from screenshot capture sessions (3734, 3578, 3429, 3420)
- The `.agents/` directory is untracked — decide whether to gitignore or commit

## Open Questions
- Whether to add a lightbox library or build a simple modal overlay for image fullscreen
- Whether the `imageLayout` field should support more values beyond `stacked` (e.g., `carousel`, `masonry`)

## Errors & Blockers
None

## Key Decisions
- [2026-02-21] Created separate CV (comprehensive, all projects) and resume (targeted, 2 pages) with toggle on website
- [2026-02-21] Removed Sound Source Localization and Foxhound Security from resume to keep 2 pages; kept in CV
- [2026-02-21] Used tmux for programmatic TUI screenshot capture (AppleScript keystrokes blocked by macOS security)
- [2026-02-21] Added `imageLayout` frontmatter field for per-project layout control instead of hardcoding
- [2026-02-21] Used `var(--gradient-tertiary)` (blue/cyan) for diskard's color scheme
- [2026-02-21] Set diskard as `featured: false`, `importance: 1`, `category: developer-tools`
- [2026-02-21] Never mention Claude/AI in commits or PRs (saved to auto-memory)

## Recent Completed
- [2026-02-21] Retake TUI screenshots with tighter terminal (120x32) and add stacked layout
- [2026-02-21] Add TUI screenshots and project metadata (images, relatedLinks, demo)
- [2026-02-21] Add diskard project to website (page, SVGs, news, resume, categories)
- [2026-02-21] Add CV document and resume/CV toggle
- [2026-02-21] Fix Lazyflow end date (remove to reflect ongoing development)
- [2026-02-21] Fix SVG hero/thumbnail text overlap issues
- [2026-02-21] Increase hero SVG size from 800x500 to 900x420

## Critical Files
- `src/content/projects/diskard.md` - diskard project page with frontmatter and markdown content
- `src/pages/ProjectDetail.jsx` - Project detail component, renders images with layout class
- `src/pages/ProjectDetail.css` - Styles including `.project-images-stacked` layout
- `src/data/projectLoader.js` - Loads project markdown, passes `imageLayout` field
- `src/pages/Resume.jsx` - Resume/CV toggle with AnimatePresence transitions
- `src/pages/Resume.css` - Pill toggle styles
- `public/resume.md` - Targeted 2-page resume
- `public/cv.md` - Comprehensive CV with all projects
- `Makefile` - PDF generation targets for both resume and CV

## Files Modified
- `src/content/projects/diskard.md` - Created project page with full frontmatter and content
- `src/pages/ProjectsPage.jsx` - Added Developer Tools and Mobile Apps categories
- `src/pages/ProjectDetail.jsx` - Added imageLayout stacked class logic
- `src/pages/ProjectDetail.css` - Added .project-images-stacked styles
- `src/data/projectLoader.js` - Added imageLayout field to project loader
- `src/data/newsData.js` - Added diskard release news entry
- `src/pages/Resume.jsx` - Rewrote with Resume/CV toggle
- `src/pages/Resume.css` - Added pill toggle styles
- `public/resume.md` - Added diskard project, Rust skill, removed 2 older projects
- `public/cv.md` - Created comprehensive CV with all 5 projects
- `public/assets/img/projects/diskard/hero.svg` - Created terminal-style hero SVG (900x420)
- `public/assets/img/projects/diskard/thumbnail.svg` - Created compact thumbnail SVG (400x450)
- `public/assets/img/projects/diskard/01-scan-results.png` - TUI scan results screenshot
- `public/assets/img/projects/diskard/02-selected-items.png` - TUI item selection screenshot
- `public/assets/img/projects/diskard/03-drill-down.png` - TUI drill-down view screenshot
- `Makefile` - Added cv target and all default target
- `src/content/projects/lazyflow.md` - Removed endDate

## Architecture / Design
- **Project content**: Markdown files with YAML frontmatter in `src/content/projects/`, loaded via Vite's `import.meta.glob()` and `gray-matter`
- **Image layout system**: `imageLayout` frontmatter field controls CSS class on image grid. `stacked` = single column at max 800px centered. Default = responsive multi-column grid with 300px min.
- **Resume/CV toggle**: Segmented pill control in Resume.jsx using AnimatePresence. Modes object defines file paths, labels, PDF links for each mode. Both markdown files loaded, switched via state.
- **SVG images**: Hand-crafted terminal-style SVGs matching project aesthetics. Hero (900x420 viewBox), thumbnail (400x450 viewBox).
- **Screenshot capture pipeline**: tmux session with controlled dimensions -> Terminal.app attach -> screencapture -l <CGWindowID> -> PNG files in project assets

## Environment / Tooling
- **Framework**: React + Vite 7.2.2
- **Styling**: CSS with CSS variables, glass-card design system
- **Animation**: Framer Motion (AnimatePresence, motion.div)
- **Markdown**: gray-matter (frontmatter), react-markdown (rendering)
- **PDF generation**: pandoc + weasyprint via Makefile
- **Screenshot tools**: tmux, screencapture, pyobjc-framework-Quartz (for CGWindowID)
- **Deployment**: GitHub Pages at connectwithprakash.github.io

## Timeline / Changelog
- 2026-02-21 17:00: Fixed Lazyflow end date, regenerated resume PDF, committed and pushed
- 2026-02-21 17:30: Gathered diskard context from 4 previous sessions into `.agents/contexts/diskard-project-2026-02-21.md`
- 2026-02-21 18:00: Planned diskard website integration (project page, images, news, resume, categories)
- 2026-02-21 18:30: Implemented diskard project page, SVG images, news entry, resume updates, new categories
- 2026-02-21 19:00: Created CV document and resume/CV toggle on website
- 2026-02-21 19:30: Fixed SVG text overlap issues in hero and thumbnail
- 2026-02-21 20:00: Committed and pushed diskard website addition (7 files)
- 2026-02-21 20:15: Captured TUI screenshots via tmux automation (scan results, selected items, drill-down)
- 2026-02-21 20:35: Added images, relatedLinks, demo metadata to diskard.md frontmatter
- 2026-02-21 21:00: Retook screenshots with tighter terminal (120x32 vs 161x46)
- 2026-02-21 21:15: Added `imageLayout: stacked` for vertical screenshot layout, committed and pushed
