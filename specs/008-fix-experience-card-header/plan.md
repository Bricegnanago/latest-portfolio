# Implementation Plan: Fix Experience Card Header Layout

**Branch**: `008-fix-experience-card-header` | **Date**: 2026-02-28 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/008-fix-experience-card-header/spec.md`

## Summary

Single-line fix in `ExperienceCard.tsx`: remove the `sm:flex-row sm:items-center sm:justify-between` responsive classes on the title+date container so that the job title and date always stack vertically. Eliminates the visual collision when the title is long enough to wrap.

## Technical Context

**Language/Version**: TypeScript 5.x strict (no `any`)
**Primary Dependencies**: Next.js 14+ App Router, Tailwind CSS v4, shadcn/ui (`Card`, `CardHeader`, `CardTitle`, `CardDescription`)
**Storage**: N/A
**Testing**: `npx tsc --noEmit` (zero errors)
**Target Platform**: Web (320px–1440px), dark + light mode
**Project Type**: Single Next.js application
**Performance Goals**: No impact — pure CSS class change, no JS
**Constraints**: Must not regress feature 007 (timeline animation, alternating layout, nodes)
**Scale/Scope**: 1 file, 1 line changed

## Constitution Check

| Gate | Status | Note |
|------|--------|------|
| Tailwind CSS only — no external CSS | ✅ PASS | Removing classes, no new file |
| TypeScript strict — no `any` | ✅ PASS | No TypeScript changes |
| Responsive mobile-first | ✅ PASS | `flex-col` is mobile-first; desktop inherits same behaviour |
| Accessible contrast | ✅ PASS | No color or contrast changes |
| No over-engineering | ✅ PASS | 1-line fix |

## Root Cause

In `components/shared/ExperienceCard.tsx`, the `CardHeader` title row uses:

```tsx
<div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
  <CardTitle className="text-lg">{experience.position}</CardTitle>
  <span className="text-sm text-muted-foreground">...</span>
</div>
```

At `sm:` breakpoint, this switches to `flex-row`. When the title is long (e.g., "Ingénieur de Developpement Web et Mobile"), it wraps to 2 lines while the date floats beside the first line — creating visual collision.

## Fix

Remove the three `sm:` overrides — keep `flex-col gap-1` always:

```tsx
<div className="flex flex-col gap-1">
  <CardTitle className="text-lg">{experience.position}</CardTitle>
  <span className="text-sm text-muted-foreground">...</span>
</div>
```

This makes title and date always stack vertically, which is clean for any title length.

## Project Structure

### Documentation (this feature)

```text
specs/008-fix-experience-card-header/
├── plan.md              # This file
├── research.md          # Root cause analysis
├── quickstart.md        # Before/after and smoke test
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code

```text
components/
└── shared/
    └── ExperienceCard.tsx    # Only file modified
```

**Structure Decision**: Single project. One file, one targeted change. No new files.

## Complexity Tracking

*No constitution violations.*
