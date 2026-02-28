# Research: Fix Experience Card Header Layout

**Feature**: `008-fix-experience-card-header`
**Date**: 2026-02-28

---

## R-001: Root cause identification

**Decision**: The bug is caused by `sm:flex-row sm:items-center sm:justify-between` on the title+date wrapper in `CardHeader`.

**Rationale**: At `sm:` (≥640px), the container switches from `flex-col` to `flex-row`, placing the title and date side-by-side. When the title is long enough to wrap (e.g., 5 words), `flex-row` makes the date float beside the first line of the title. The `sm:items-center` aligns both elements to the vertical midpoint of the container — which looks correct for short one-line titles, but breaks for wrapping titles.

**Evidence**: Screenshot shows "Ingénieur de Developpement Web et Mobile" wrapping to 2 lines with "Juin 2023 — Présent" floating to the right of line 1.

---

## R-002: Fix selection

**Decision**: Remove `sm:flex-row sm:items-center sm:justify-between` → keep `flex-col gap-1` always.

**Rationale**:
- Title and date stacked vertically works for all title lengths (short, long, wrapping)
- Title stays prominent (larger, bold), date is subordinate (small, muted) — correct visual hierarchy
- No information loss — both elements remain visible
- Zero risk of regression on any other layout

**Alternatives considered**:

| Alternative | Why rejected |
|-------------|--------------|
| Keep `sm:flex-row` but use `sm:items-start` | Date still floats to the right of a wrapping title — position improves (top-aligned) but visual collision remains |
| Truncate title with `truncate` class | Hides content — unacceptable for a portfolio |
| Put date in `CardDescription` row | Changes the semantic structure unnecessarily; description row already has company + location |
| `flex-wrap` on the row | Would wrap the date below the title, but only when it doesn't fit — inconsistent behavior across cards |

---

## R-003: No other files affected

**Decision**: Only `components/shared/ExperienceCard.tsx` needs to change.

**Rationale**:
- The fix is purely within the `CardHeader` layout
- `ExperienceSection.tsx` (timeline container) is not affected
- `globals.css` (glow utilities) is not affected
- `data/experiences.ts` is not affected
- `TiltCard` was already removed in feature 007 — no interaction

---

## Summary

| Topic | Decision |
|-------|----------|
| Root cause | `sm:flex-row sm:items-center sm:justify-between` on title+date div |
| Fix | Remove those 3 sm: classes → always `flex-col gap-1` |
| Files changed | 1 (`ExperienceCard.tsx`) |
| Lines changed | 1 (the `className` of the wrapper div) |
