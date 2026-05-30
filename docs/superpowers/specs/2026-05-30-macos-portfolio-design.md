# macOS Portfolio Website — Design Spec

**Date:** 2026-05-30  
**Status:** Approved for implementation

## Overview

Interactive macOS desktop portfolio built with Next.js 14, Tailwind CSS, Framer Motion, and Zustand. Users discover portfolio content by opening apps on a simulated Mac desktop.

## Decisions

- **Architecture:** Single-page client simulation (Approach A)
- **Messages:** Static keyword-based auto-replies (no API)
- **Content:** Centralized in `portfolio.config.ts`
- **Boot sequence:** First visit only via localStorage, skippable after 1s, respects `prefers-reduced-motion`

## Core Systems

### Window Manager (Zustand)
- Tracks open/minimized/fullscreen state, z-index, position, size
- Persists window positions to localStorage
- Actions: open, close, minimize, restore, focus, toggleFullscreen

### Window Component
- 44px title bar with traffic lights (close/minimize/fullscreen)
- Draggable via pointer events (disabled on mobile/tablet)
- Framer Motion spring open animation (stiffness 300, damping 30)
- FLIP minimize animation to dock icon position

### Dock
- Magnification on hover with neighbor scaling
- Bounce animation on click
- Active indicator dot for open apps

### MenuBar
- Apple menu dropdown, focused window title, live clock, decorative system tray

## Apps

| App | Purpose |
|-----|---------|
| Finder | About Me — sidebar + Quick Look bio preview |
| Projects | Grid cards with bottom sheet detail |
| Terminal | Auto-typing skills showcase |
| Messages | iMessage UI with static auto-replies |
| Resume | Preview-style CV with PDF download |

## System Features

- Boot sequence (Apple logo + progress bar)
- Spotlight search (Cmd+Space)
- Control Center panel
- Welcome notification
- Keyboard shortcuts (Escape closes window)

## Responsive

- **Desktop (>1024px):** Full macOS experience
- **Tablet (768–1024px):** Centered fixed windows
- **Mobile (<768px):** iOS springboard + fullscreen apps

## Accessibility

- focus-trap-react on active windows and Spotlight
- ARIA labels on dock icons and traffic lights
- prefers-reduced-motion disables animations

## File Structure

See implementation plan for full file tree. Key entry points:
- `app/page.tsx` — DesktopShell
- `portfolio.config.ts` — Personal content
- `hooks/useWindowManager.ts` — State management
- `components/macos/` — Shell components
- `components/apps/` — App content
