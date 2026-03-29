---
context_version: 2
slug: diskard-project
project_path: /Users/prakash/Developer/diskard
created: 2026-02-21
updated: 2026-02-21 19:05
tags: [rust, cli, tui, disk-cleanup, developer-tools, crates-io, homebrew, ratatui]
sessions_analyzed: 4
session_ids: [cf9c7ec1-55bc-45ad-a9b2-ff27e30acf56, 1a853b30-37a0-4868-87bc-a4fb8816fdbb, eef799e5-8a03-4ea4-9ae0-6c635e5a6e02, 3c7732dd-3565-4947-bc49-4ec93a51de00]
keywords: [diskard, diskard project]
source_agent: claude
---
# Context: diskard project

## Summary
`diskard` is an open-source Rust CLI tool for developer-aware disk cleanup, located at `/Users/prakash/Developer/diskard`. It scans a developer's machine for reclaimable disk space from build caches, AI model caches, package managers, IDE artifacts, and more. The tool has 18 recognizers covering Xcode, Node, Homebrew, Python, Rust, Docker, Ollama, HuggingFace, Claude, VS Code, Gradle, CocoaPods, and generic caches. It provides both a CLI interface (scan, clean, list, config, completions) and an interactive TUI built with ratatui. The project is published on crates.io and installable via `cargo install diskard` and `brew install connectwithprakash/tap/diskard`. Current version is v0.2.0. The TUI features drill-down directory inspection, disk usage visualization with gauge headers, inline size bars, and a select-all/confirm cleanup workflow.

## Current State
- Version v0.2.0 is the latest release (tagged `diskard-v0.2.0` and `v0.2.0`)
- Published on crates.io as three crates: `diskard-core`, `diskard-tui`, `diskard`
- Installable via `cargo install diskard` and `brew install connectwithprakash/tap/diskard`
- GitHub repo: `connectwithprakash/diskard`
- Homebrew tap repo: `connectwithprakash/homebrew-tap`
- Working tree is clean on `main` branch (only untracked `.agents/` directory)
- CI passes (GitHub Actions: fmt, clippy, test on macOS + Ubuntu)
- Release Please is configured for automated versioning and changelog
- TUI features implemented: scan view, results list with checkboxes, drill-down directory inspector, disk summary header with gauge, inline size bars, confirmation dialog, help overlay
- The `-i` flag is a shortcut for `diskard interactive` to launch the TUI
- 18 recognizers are active, parallel scanning with rayon + jwalk
- Safe deletion via `trash` crate (moves to Trash by default)

## Next Steps
- Write fixture-based integration tests (identified as incomplete in continuation summary)
- Potentially add more recognizers (Android SDK, JetBrains, .NET, etc.)
- Get accepted into homebrew-core for `brew install diskard` without tap prefix
- Add README demo/GIF showing the tool in action
- Consider adding a `--watch` mode or scheduled scanning
- Shell completions are implemented but README instructions may need updating

## Open Questions
- Whether to pursue homebrew-core acceptance (requires community adoption metrics)
- Whether `cargo publish` should be fully automated via CI (CARGO_REGISTRY_TOKEN secret was added but Release Please workflow integration may need verification)
- Whether to add a `--json` output mode for scripting/piping
- How to handle the flaky test that was identified during the drill-down session

## Errors & Blockers
- Initial GitHub push failed because OAuth token lacked `workflow` scope (resolved by user re-authenticating)
- The `-i` flag was initially not recognized because the CLI subcommand was `interactive` not `-i` (resolved by adding `-i` as a shortcut flag)
- A flaky test was identified during the drill-down feature session; user asked to fix it and it was addressed in PR #2
- Release Please configuration needed iteration (component prefix in tags had to be excluded via `release-please-config.json`)

## Key Decisions
- [2026-02-19] Chose Rust as the implementation language for performance and cross-platform support
- [2026-02-19] Used workspace structure with three crates: `diskard` (binary), `diskard-core` (library), `diskard-tui` (TUI feature)
- [2026-02-19] Used `trash` crate for safe deletion (Trash by default, not permanent delete)
- [2026-02-19] Used Codex MCP as a peer reviewer for feature prioritization (recommended: more recognizers > CLI filters > distribution, then TUI > tests > completions)
- [2026-02-19] Published to crates.io in dependency order: core -> tui -> binary
- [2026-02-19] Created Homebrew tap at `connectwithprakash/homebrew-tap` with auto-update GitHub Action
- [2026-02-19] No AI attribution in commits or PRs (per user's CLAUDE.md rules)
- [2026-02-19] TUI is an optional feature flag (`tui = ["dep:diskard-tui"]`)
- [2026-02-19] Used `fs2` crate for disk usage statistics in the TUI header
- [2026-02-19] Added Release Please for automated versioning and changelog generation

## Recent Completed
1. Initial project scaffold with 15 recognizers, scanner, cleaner, CLI, CI/CD, tests
2. Added 4 more recognizers (node_modules, Xcode Archives, CocoaPods, Gradle/Maven) - total 18
3. Added `--category`, `--sort`, `--older-than` CLI flags
4. Published v0.1.0 to crates.io (all three crates)
5. Created Homebrew tap and formula, verified `brew install` works
6. Added GitHub Actions workflow to auto-update Homebrew formula on release
7. Implemented interactive TUI with ratatui (scan view, results, confirm, help)
8. Added shell completions subcommand via `clap_complete`
9. Bumped to v0.1.1, then v0.1.2, published to crates.io
10. Implemented drill-down directory inspector (PR #1)
11. Implemented disk usage visualization with gauge header and inline size bars (PR #2)
12. Added `-i` flag as shortcut for interactive TUI mode
13. Configured Release Please for automated versioning
14. Released v0.2.0

## Critical Files
- `/Users/prakash/Developer/diskard/Cargo.toml` - Root workspace config, binary crate definition, version, dependencies
- `/Users/prakash/Developer/diskard/crates/diskard-core/src/finding.rs` - Central data types (Finding, Category, RiskLevel)
- `/Users/prakash/Developer/diskard/crates/diskard-core/src/recognizer.rs` - Recognizer trait definition
- `/Users/prakash/Developer/diskard/crates/diskard-core/src/scanner.rs` - Parallel scanner with ScanOptions, ScanResult, SortOrder
- `/Users/prakash/Developer/diskard/crates/diskard-tui/src/app.rs` - TUI application state (App struct with all UI state)
- `/Users/prakash/Developer/diskard/crates/diskard-tui/src/lib.rs` - TUI event loop and rendering orchestration
- `/Users/prakash/Developer/diskard/src/cli.rs` - CLI argument definitions (clap derive)
- `/Users/prakash/Developer/diskard/src/main.rs` - Entry point

## Files Modified
- `/Users/prakash/Developer/diskard/Cargo.toml` - Workspace + binary crate config
- `/Users/prakash/Developer/diskard/crates/diskard-core/Cargo.toml` - Core library dependencies
- `/Users/prakash/Developer/diskard/crates/diskard-core/src/cleaner.rs` - Deletion logic (Trash/Permanent/DryRun)
- `/Users/prakash/Developer/diskard/crates/diskard-core/src/config.rs` - Config system (~/.config/diskard/config.toml)
- `/Users/prakash/Developer/diskard/crates/diskard-core/src/error.rs` - Error types
- `/Users/prakash/Developer/diskard/crates/diskard-core/src/finding.rs` - Finding, Category, RiskLevel types
- `/Users/prakash/Developer/diskard/crates/diskard-core/src/lib.rs` - Core library re-exports
- `/Users/prakash/Developer/diskard/crates/diskard-core/src/recognizer.rs` - Recognizer trait
- `/Users/prakash/Developer/diskard/crates/diskard-core/src/recognizers/` - All 18 recognizer implementations
- `/Users/prakash/Developer/diskard/crates/diskard-core/src/scanner.rs` - Parallel scanner
- `/Users/prakash/Developer/diskard/crates/diskard-core/src/size.rs` - Size utilities and disk_usage()
- `/Users/prakash/Developer/diskard/crates/diskard-tui/Cargo.toml` - TUI dependencies (ratatui, crossterm)
- `/Users/prakash/Developer/diskard/crates/diskard-tui/src/app.rs` - TUI application state
- `/Users/prakash/Developer/diskard/crates/diskard-tui/src/components/` - All TUI components (results, confirm, help, header, drilldown, scan_view)
- `/Users/prakash/Developer/diskard/crates/diskard-tui/src/event.rs` - Event handling
- `/Users/prakash/Developer/diskard/crates/diskard-tui/src/lib.rs` - TUI main loop
- `/Users/prakash/Developer/diskard/crates/diskard-tui/src/tui.rs` - Terminal setup/teardown
- `/Users/prakash/Developer/diskard/src/cli.rs` - CLI definitions
- `/Users/prakash/Developer/diskard/src/commands/` - Command implementations (scan, clean, list, config)
- `/Users/prakash/Developer/diskard/src/main.rs` - Entry point
- `/Users/prakash/Developer/diskard/src/output.rs` - Output formatting
- `/Users/prakash/Developer/diskard/tests/integration.rs` - Integration tests
- `/Users/prakash/Developer/diskard/README.md` - Documentation
- `/Users/prakash/Developer/diskard/.github/workflows/ci.yml` - CI workflow
- `/Users/prakash/Developer/diskard/.github/workflows/release.yml` - Release workflow
- `/Users/prakash/Developer/diskard/.github/workflows/homebrew.yml` - Homebrew auto-update
- `/Users/prakash/Developer/diskard/.github/workflows/release-please.yml` - Release Please config
- `/Users/prakash/Developer/diskard/release-please-config.json` - Release Please settings
- `/Users/prakash/Developer/diskard/.release-please-manifest.json` - Version manifest
- `/Users/prakash/Developer/diskard/clippy.toml` - Clippy configuration
- `/Users/prakash/Developer/diskard/rustfmt.toml` - Rustfmt configuration
- `/Users/prakash/Developer/diskard/CONTRIBUTING.md` - Contributing guide
- `/Users/prakash/Developer/diskard/LICENSE-APACHE` - Apache 2.0 license
- `/Users/prakash/Developer/diskard/LICENSE-MIT` - MIT license
- `/Users/prakash/Developer/homebrew-tap/Formula/diskard.rb` - Homebrew formula

## Architecture / Design
- **Workspace structure**: Three Rust crates in a Cargo workspace
  - `diskard` (binary) - CLI entry point, command routing
  - `diskard-core` (library) - Recognizers, scanner, cleaner, config, data types
  - `diskard-tui` (optional feature) - ratatui-based interactive TUI
- **Recognizer pattern**: Trait `Recognizer: Send + Sync` with `name()`, `id()`, `category()`, `scan() -> Result<Vec<Finding>>`
- **Parallel scanning**: `rayon` par_iter over all recognizers, `jwalk` for filesystem traversal
- **TUI architecture**: ratatui + crossterm with explicit event loop
  - App state machine with modes: Scanning, Browse, DrillDown, Confirm, Help
  - Component-based rendering (header, results, drilldown, confirm, help, scan_view)
  - Keyboard-driven navigation (j/k/arrows, space to toggle, 'a' select all, Enter to clean, 'l'/'h' for drill-down)
- **Config system**: TOML config at `~/.config/diskard/config.toml` with serde
- **Deletion**: Three modes - Trash (default, uses `trash` crate), Permanent, DryRun
- **Data types**: Finding (path, category, risk, size_bytes, description, last_modified), Category enum (13 variants), RiskLevel enum (Safe, Moderate, Risky)
- **Disk visualization**: fs2 crate for total/free space, LineGauge widget, color-coded thresholds (green <70%, yellow 70-85%, red >85%)

## Environment / Tooling
- **Language**: Rust (installed via rustup during initial session)
- **Build**: Cargo workspace
- **Key dependencies**: clap (CLI), ratatui + crossterm (TUI), rayon + jwalk (parallelism), trash (safe delete), serde + toml (config), bytesize (formatting), fs2 (disk stats), chrono (timestamps), thiserror (errors), dirs (XDG paths), log (logging), clap_complete (shell completions)
- **CI/CD**: GitHub Actions - fmt, clippy, test on macOS + Ubuntu; release workflow for cross-platform binaries; Release Please for versioning
- **Distribution**: crates.io (cargo install diskard), Homebrew tap (brew install connectwithprakash/tap/diskard)
- **GitHub**: `connectwithprakash/diskard` (main repo), `connectwithprakash/homebrew-tap` (Homebrew formula)
- **Secrets needed**: CARGO_REGISTRY_TOKEN (crates.io), HOMEBREW_TAP_TOKEN (for cross-repo Homebrew formula updates)

## Timeline / Changelog
- **2026-02-19 (Session 1a853b30)**: User explored disk space usage on their Mac, discovered reclaimable space from various dev tools. Researched existing tools (kondo, etc.). Decided to build diskard combining smart developer-aware scanning with a TUI. Collaborated with Codex MCP for planning.
- **2026-02-19 (Session cf9c7ec1)**: Built the entire diskard project from scratch. Created workspace structure, 15 initial recognizers, scanner, cleaner, CLI, CI/CD. Added 4 more recognizers (18 total). Added CLI filters (--category, --sort, --older-than). Published to crates.io (v0.1.0, then v0.1.1). Created Homebrew tap and formula. Implemented interactive TUI, shell completions. Bumped to v0.1.2.
- **2026-02-19 (Session eef799e5)**: Implemented drill-down directory inspector for the TUI. Added l/h/arrow key navigation, breadcrumb path display, subdirectory listing with sizes. Fixed flaky test. Created PR #1. Added -i flag shortcut for interactive mode.
- **2026-02-19 (Session 3c7732dd)**: Implemented disk usage visualization. Added disk summary header with LineGauge, inline size bars using block characters, color-coded thresholds. Added fs2 dependency. Created PR #2. Set up Release Please for automated versioning. Configured cargo publish in release workflow. Released v0.2.0.
