# Implementation Plan: Fix Card Tilt Effect When Modal Is Open

**Branch**: `009-fix-tilt-modal` | **Date**: 2026-02-28 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/009-fix-tilt-modal/spec.md`

## Summary

When a modal (image gallery or video) opens over a project card, mouse movements inside the modal bubble through React's component tree and trigger the `TiltCard`'s `onMouseMove` handler — causing the card to tilt even though it's hidden behind the modal. Fix: add a `disabled` prop to `TiltCard` that (1) calls `onMouseLeave()` on mount to reset tilt to neutral, and (2) stops accepting new mouse events. `ProjectCard` passes `disabled={isVideoOpen || isGalleryOpen}`.

## Technical Context

**Language/Version**: TypeScript 5.x strict (no `any`)
**Primary Dependencies**: React 18 (`useEffect`), Framer Motion 12.x (motion values), Next.js 14+ App Router
**Storage**: N/A
**Testing**: `npx tsc --noEmit` (zero errors)
**Target Platform**: Web (desktop — tilt already disabled on mobile/touch via `hover: hover` media query)
**Project Type**: Single Next.js application
**Performance Goals**: No impact — adding a boolean prop check
**Constraints**: Must not change `useTilt.ts` (minimal blast radius); must not break existing tilt behaviour when no modal is open
**Scale/Scope**: 2 files, ~5 lines changed total

## Constitution Check

| Gate | Status | Note |
|------|--------|------|
| TypeScript strict — no `any` | ✅ PASS | `disabled?: boolean` is fully typed |
| No over-engineering | ✅ PASS | 2 files, ~5 lines, no new abstractions |
| No useEffect inutiles | ✅ PASS | `useEffect` is necessary — imperative reset of Framer Motion values |
| Framer Motion for animations | ✅ PASS | Existing motion values reset via `onMouseLeave()` |
| Un composant = un fichier | ✅ PASS | No new files |

## Root Cause

React portals propagate events **up through the React component tree** (not the DOM tree). The `VideoModal` and `ImageGalleryModal` use shadcn/ui `Dialog`, which renders in a portal. Mouse events (`mousemove`) within the portal bubble to their React parent — `ProjectCard` → `TiltCard` — triggering `onMouseMove` on the card even though the modal visually covers it.

Additionally, `onMouseLeave` never fires while the modal is open (the user's pointer never "leaves" the card from React's perspective since the modal is inside the same React tree), so the card freezes in a tilted state until the user manually hovers off and back on.

## Fix

### `TiltCard.tsx` — add `disabled` prop

```tsx
interface TiltCardProps {
  children: React.ReactNode
  className?: string
  tiltOptions?: UseTiltOptions
  disabled?: boolean        // ← NEW: suspend tilt when modal is open
}

export function TiltCard({ children, className, tiltOptions, disabled }: TiltCardProps) {
  // ...existing code...

  // Reset tilt to neutral immediately when disabled becomes true
  useEffect(() => {
    if (disabled) {
      onMouseLeave()
    }
  }, [disabled, onMouseLeave])

  return (
    <motion.div
      ref={ref}
      style={style}
      onMouseMove={disabled ? undefined : onMouseMove}   // ← stop receiving events
      onMouseLeave={disabled ? undefined : onMouseLeave}
      className={cn("relative", className)}
    >
      ...
    </motion.div>
  )
}
```

### `ProjectCard.tsx` — pass `disabled` to TiltCard

```tsx
<TiltCard className="h-full" disabled={isVideoOpen || isGalleryOpen}>
```

## Why this approach

| Alternative | Why rejected |
|-------------|--------------|
| `e.stopPropagation()` inside Dialog | Would require modifying `ImageGalleryModal` and `VideoModal` — more files, fragile if new modals are added |
| Adding `disabled` to `useTilt` hook | More complex, changes the hook API; `TiltCard` is the right layer to add this |
| `pointer-events: none` on TiltCard when modal is open | Doesn't reset the tilt value already set; card stays frozen in tilted position |
| Global state / context for "modal is open" | Massive over-engineering for a 2-component fix |

## Project Structure

### Documentation (this feature)

```text
specs/009-fix-tilt-modal/
├── plan.md              # This file
├── research.md          # Root cause analysis
├── quickstart.md        # Before/after and smoke test
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code

```text
components/
└── shared/
    ├── TiltCard.tsx          # Add disabled prop + useEffect reset + conditional handlers
    └── ProjectCard.tsx       # Pass disabled={isVideoOpen || isGalleryOpen}
```

**Structure Decision**: Single project. Two files, minimal targeted changes.

## Complexity Tracking

*No constitution violations.*
