---
id: lazyflow
title: Lazyflow
shortDescription: A free, open-source iOS app for AI-powered task management with Apple Calendar integration, time blocking, and smart "What should I do next?" recommendations.
category: mobile-apps
status: released
startDate: 2025-12
endDate: 2026-01
importance: 1
featured: true
tags: [iOS, Swift, SwiftUI, Core Data, CloudKit, EventKit, AI, Apple Intelligence, Apple Watch, Widgets, Live Activities, Open Source]
gradient: var(--gradient-primary)
thumbnail: /assets/img/projects/lazyflow/thumbnail.svg
heroImage: /assets/img/projects/lazyflow/hero.svg
images:
  - path: /assets/img/projects/lazyflow/01-today-view.png
    caption: Today view showing tasks alongside calendar events in a unified timeline
  - path: /assets/img/projects/lazyflow/02-ai-priority.png
    caption: AI-powered "What should I do next?" recommendations with priority scores
  - path: /assets/img/projects/lazyflow/03-daily-summary.png
    caption: Daily summary with completion stats and AI-generated productivity insights
  - path: /assets/img/projects/lazyflow/04-apple-watch.png
    caption: Apple Watch app for quick task management on the go
github: https://github.com/connectwithprakash/lazyflow
demo: https://apps.apple.com/us/app/lazyflow/id6757427688
---

## Overview

Lazyflow is a calendar-first todo app that seamlessly integrates with Apple Calendar. Unlike traditional task managers that treat tasks and calendar events separately, Lazyflow helps users plan their day by viewing everything in one place and getting AI-powered recommendations for what to work on next.

The app is completely free, open-source, and privacy-focused - all data stays on the user's device with optional iCloud sync.

## Problem Statement

Most todo apps fail at helping users actually plan their day:
- **Fragmented Experience** - Tasks live separately from calendar, forcing users to context-switch
- **No Prioritization Help** - Users must manually decide what to work on next
- **No Time Awareness** - Tasks don't account for available time between meetings
- **Privacy Concerns** - Most productivity apps track user data and require subscriptions

## Technical Approach

Built a native iOS app with a focus on seamless Apple ecosystem integration:

### Architecture

![Clean architecture with MVVM pattern and multi-provider AI support](/assets/img/projects/lazyflow/architecture.svg)

**Core Technologies:**
- **SwiftUI** - Modern declarative UI with MVVM architecture
- **Core Data + CloudKit** - Offline-first with seamless iCloud sync
- **EventKit** - Native Apple Calendar integration
- **App Intents** - Siri Shortcuts and system integration
- **WidgetKit** - Home Screen widgets (small, medium, large)
- **ActivityKit** - Live Activities and Dynamic Island support
- **WatchConnectivity** - Real-time sync with Apple Watch

**AI Integration:**
- Apple Intelligence (on-device, private)
- Claude API (Anthropic)
- OpenAI API
- User brings their own API keys - no data leaves device without consent

## Key Features

- **Calendar Integration** - View tasks alongside calendar events, schedule tasks as time blocks
- **AI Priority** - "What should I do next?" recommendations with scores and reasoning
- **Daily Summary** - Completion streaks and AI-generated productivity insights
- **Multi-Platform** - iPhone, iPad, Apple Watch with real-time sync
- **Widgets** - Home Screen widgets in 3 sizes for quick task access
- **Live Activities** - Track current task in Dynamic Island
- **Siri Shortcuts** - Voice commands for hands-free task management
- **Privacy First** - All data on-device, no tracking, no analytics

## Challenges & Solutions

**1. Calendar + Tasks Unified View**
- **Challenge:** EventKit and Core Data have different data models and update patterns
- **Solution:** Built unified data layer that merges both sources with real-time Combine publishers

**2. AI Without Privacy Compromise**
- **Challenge:** Users want AI features but are concerned about data privacy
- **Solution:** Support multiple providers including on-device Apple Intelligence; user provides their own API keys

**3. Cross-Device Sync**
- **Challenge:** Tasks need to sync seamlessly across iPhone, iPad, and Apple Watch
- **Solution:** CloudKit with NSPersistentCloudKitContainer for automatic sync, WatchConnectivity for immediate Watch updates

**4. Widget Performance**
- **Challenge:** Widgets need to show current data without draining battery
- **Solution:** Timeline-based updates with intelligent refresh scheduling

## Technologies

**Languages:** Swift 5.9

**Frameworks:** SwiftUI, Core Data, CloudKit, EventKit, WidgetKit, ActivityKit, WatchConnectivity, App Intents

**Architecture:** MVVM with Combine for reactive data flow

**AI:** Apple Intelligence, Claude API, OpenAI API

**Platforms:** iOS 17+, iPadOS 17+, watchOS 10+

## Impact

**User-Focused:**
- 100% free with no ads or subscriptions
- Privacy-first design with on-device data storage
- Open source under MIT license for transparency and community contributions

**Technical Achievement:**
- Full Apple ecosystem integration (iPhone, iPad, Watch, Widgets, Siri, Live Activities)
- Multi-provider AI support with privacy-preserving architecture
- Production app on App Store with automated CI/CD via Fastlane

**Open Source:**
- Complete codebase available on GitHub
- Demonstrates modern SwiftUI patterns and best practices
- Built entirely with Claude Code (AI-assisted development)

## Links

- **App Store:** https://apps.apple.com/us/app/lazyflow/id6757427688
- **Website:** https://lazyflow.netlify.app
- **GitHub:** https://github.com/connectwithprakash/lazyflow
