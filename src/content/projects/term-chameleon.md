---
id: term-chameleon
title: Term Chameleon
shortDescription: An open-source Python CLI that keeps text readable on translucent "glass" terminals. It diagnoses readability failures, fixes palettes, and adapts iTerm2's colors and transparency live as the backdrop changes.
category: developer-tools
status: released
startDate: 2026-06
importance: 1
featured: true
tags: [Python, CLI, iTerm2, macOS, Accessibility, WCAG, Terminal, OSC, ScreenCaptureKit, PyPI, Open Source, Developer Tools]
gradient: var(--gradient-quaternary)
thumbnail: /assets/img/projects/term-chameleon/thumbnail.svg
heroImage: /assets/img/projects/term-chameleon/hero.svg
imageLayout: stacked
images:
  - path: /assets/img/projects/term-chameleon/adaptation.gif
    caption: A real screen recording of the live watcher switching the terminal between glassy (dark backdrop) and opaque (bright backdrop) readability modes — the same sample → decide → apply loop the daemon runs
  - path: /assets/img/projects/term-chameleon/demo.gif
    caption: The CLI walkthrough — diagnose a profile, preview a conservative fix, and apply an adaptive preset
github: https://github.com/connectwithprakash/term-chameleon
demo: https://pypi.org/project/term-chameleon/
relatedLinks:
  - title: PyPI
    url: https://pypi.org/project/term-chameleon/
  - title: GitHub
    url: https://github.com/connectwithprakash/term-chameleon
installation: |
  # Install with the iTerm2 integration
  pip install 'term-chameleon[iterm]'

  # Self-check and install the tuned "Adaptive Glass" profile
  term-chameleon setup --yes

  # Optional: install the background watcher for live auto-adaptation
  term-chameleon install-watch-daemon
---

## Overview

Glassy terminal themes look great until white text disappears over a bright browser window behind them, dim text vanishes over a dark blur, or iTerm2's Light/Dark profile variants silently override your palette. **Term Chameleon** diagnoses and fixes those readability failures, and can watch your screen to adapt the terminal's colors and transparency live as the background behind it changes.

It targets macOS and iTerm2 today, with OSC color sequences that also work on Kitty, Ghostty, and Alacritty. The package ships with zero runtime dependencies and installs from PyPI. The whole happy path is two commands to a tuned, readable glass terminal, three for live auto-adaptation.

## Problem Statement

Translucency and readability pull in opposite directions, and terminals give you only blunt, window-wide controls to reconcile them:

- **Backdrop washout** — light text over a bright window behind the glass loses all contrast; dim text over a dark blur disappears.
- **Profile drift** — iTerm2's Light/Dark profile variants quietly override a carefully chosen palette.
- **No per-region fix exists** — every lever a terminal exposes (palette, transparency, blur) is a single value for the whole window, and macOS owns the backdrop, so no app receives the see-through pixels to correct against.
- **Manual tuning doesn't hold** — a setting that's readable over one backdrop fails the moment you switch windows behind the terminal.

## Technical Approach

Term Chameleon is a Python 3.11+ CLI with a small, layered architecture: profile diagnosis and fixing, an OSC color-sequence applier, and a live screen-sampling watcher driven through the iTerm2 Python API.

### How live adaptation works

`watch-live` samples the screen (or the iTerm window region) on an interval, estimates background luminance, and runs a risk classifier: bright backgrounds raise washout risk, dark backgrounds lower it. A **hysteresis selector** with a stable-sample count and a cooldown decides when to switch modes, avoiding thrash on transient changes. On a switch it applies the chosen preset to the live iTerm2 session-local profile — adjusting foreground colors and window transparency together.

The presets form a calibrated **glassiness ladder**, ordered most-translucent to opaque. As a rung trades transparency for readability it raises iTerm2's per-glyph Minimum Contrast and blur in step, so the watcher steps toward opacity exactly as far as a brighter or busier backdrop demands — and no further. A splotchy/high-variance backdrop (the case where a colored glyph can collide with a same-colored patch behind the glass) routes to a higher-blur rung that homogenizes the backdrop, drops transparency, and overrides the cooldown so readability is restored at once.

### A note on what is and isn't possible

True per-glyph correction, fixing each character against the exact pixels behind it, is **not achievable** through any terminal's controls: every lever is a single window-wide value, and macOS owns the backdrop, so no app (including GPU-shader terminals) receives the see-through pixels. Term Chameleon therefore enforces a *worst-case readable* configuration with the levers it does have, rather than pretending to solve an unobservable per-pixel problem. Being honest about that boundary, then engineering the best solution that fits inside it, was the core design decision.

## Key Features

- **Diagnose** — `doctor <profile>.json` reports readability failures (low ANSI-black contrast, Light/Dark variant drift, transparency-vs-contrast tradeoffs) with WCAG ratios and concrete suggestions.
- **Fix conservatively** — `fix <profile>.json` previews and applies a readable palette, with a backup and explainable changes.
- **Apply a mode over OSC** — `osc apply dark-glass --write` and friends (`balanced`, `bright-safe`, `accessibility`, `high-variance-safe`, `presentation`). Works on iTerm2, Kitty, Ghostty, and Alacritty.
- **Adapt live** — `watch-live` samples the screen, classifies background-brightness risk with hysteresis, and applies the matching preset to the current iTerm2 session, reducing transparency when a bright background would wash out text and restoring it when the background is dark.
- **Set-and-forget daemon** — `install-watch-daemon` installs a single background `watch-live` process that starts itself every time iTerm2 launches; inspect it with `watch-daemon-status`, remove it with `uninstall-watch-daemon`.
- **WCAG-grounded** — contrast decisions use WCAG 2 ratios throughout, so "readable" means a measurable threshold, not a guess.

## Challenges & Solutions

**1. The per-region ideal is platform-impossible**
- **Challenge:** Ideally each glyph would be corrected against the exact backdrop pixels behind it — but macOS's compositor owns the backdrop and never hands it to the app.
- **Solution:** Adopted a worst-case-background model: enforce a configuration readable against the hardest backdrop the current scene presents, using the window-wide levers that *are* available.

**2. Avoiding visible thrash**
- **Challenge:** Naively reacting to every sample makes the terminal flicker between modes as transient windows pass behind it.
- **Solution:** A hysteresis selector with a stable-sample count and cooldown, plus a high-risk override that bypasses the cooldown only when readability is genuinely at stake.

**3. Same-color collisions**
- **Challenge:** A colored glyph can vanish against a same-colored patch showing through the glass.
- **Solution:** A variance branch routes high-variance backdrops to a higher-blur rung that homogenizes the backdrop; colored cell backgrounds render opaque so a bright backdrop can't bleed through and bury their text, while empty space stays glassy.

**4. Effortless onboarding for a niche tool**
- **Challenge:** A readability tool is only useful if setup is trivial.
- **Solution:** A permission-free `setup --yes` self-check that installs a tuned profile, and an optional daemon so live adaptation needs no recurring commands — two commands to a readable terminal, three for full auto-adaptation.

## Technologies

**Language:** Python 3.11+

**Integration:** iTerm2 Python API, OSC terminal color sequences, ScreenCaptureKit (optional, for a more accurate true-backdrop sampling path)

**Standards:** WCAG 2 contrast ratios

**Packaging:** Zero runtime dependencies, distributed on PyPI with OIDC trusted publishing; extensive automated test suite and CI across multiple jobs

**Platforms:** macOS + iTerm2 (primary); OSC presets on Kitty, Ghostty, Alacritty

## Impact

- **Open source** under a permissive license, installable in one `pip` command.
- **Accessibility-first** — every adaptation decision is grounded in measurable WCAG contrast, not aesthetic guesswork.
- **Honest engineering** — ships a solution scoped to what the platform actually allows, documenting the platform limits rather than papering over them.
- **Cross-terminal reach** — the preset/OSC layer extends beyond iTerm2 to other modern terminals.

## Links

- **PyPI:** https://pypi.org/project/term-chameleon/
- **GitHub:** https://github.com/connectwithprakash/term-chameleon
