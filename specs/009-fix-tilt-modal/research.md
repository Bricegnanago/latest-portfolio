# Research: Fix Card Tilt Effect When Modal Is Open

**Feature**: `009-fix-tilt-modal`
**Date**: 2026-02-28

---

## R-001: Root cause — React portal event bubbling

**Decision**: The bug is caused by React's intentional design: events inside a portal bubble up through the **React component tree**, not the DOM tree.

**Evidence from code**:
- `ImageGalleryModal` and `VideoModal` use shadcn/ui `Dialog`, which renders in a React portal
- `TiltCard` has `onMouseMove={onMouseMove}` — a React synthetic event handler
- When the mouse moves inside the Dialog portal, React bubbles `mousemove` up the React tree: `Dialog → ImageGalleryModal → ProjectCard → TiltCard` → triggers tilt
- `onMouseLeave` on `TiltCard` never fires while the modal stays open (the pointer never "leaves" the card's React subtree)
- Result: card tilts during modal use, and stays frozen in tilted position after mouse settles

**Reference**: React docs — "Even though a portal can be anywhere in the DOM tree, it behaves like a normal React child in every other way."

---

## R-002: Fix location — TiltCard, not useTilt or the modals

**Decision**: The fix belongs in `TiltCard.tsx` (add `disabled` prop) and `ProjectCard.tsx` (pass the prop). `useTilt.ts` and the modal components are not modified.

**Rationale**:
- `TiltCard` is the boundary between the tilt system and the rest of the app — it's the right layer for an external "disable" control
- `useTilt` is a generic hook; adding UI-specific concerns (modal state) to it would couple it to `ProjectCard`'s business logic
- The modals should not know they're sitting on top of a tiltable card — that would be a leaky abstraction

---

## R-003: Reset mechanism — useEffect calling onMouseLeave()

**Decision**: Use `useEffect(() => { if (disabled) onMouseLeave() }, [disabled, onMouseLeave])` in `TiltCard`.

**Rationale**:
- `onMouseLeave()` from `useTilt` is the correct imperative reset — it calls `.set(0)` on all Framer Motion motion values (`rotateX`, `rotateY`, `scale`, `glareOpacity`)
- `useEffect` with `disabled` as dependency fires immediately after React commits the `disabled=true` render — the card snaps to neutral as the modal opens
- `onMouseLeave` is stable (wrapped in `useCallback` with stable motion value deps in `useTilt`) — safe in the `useEffect` dependency array

**Why not `useReducedMotion` pattern**: `useReducedMotion` is a read-only hook from Framer Motion that can't be externally controlled. The `disabled` prop is external state controlled by `ProjectCard`.

---

## R-004: Preventing new tilt events — conditional handlers

**Decision**: `onMouseMove={disabled ? undefined : onMouseMove}` and `onMouseLeave={disabled ? undefined : onMouseLeave}`.

**Rationale**:
- Setting handlers to `undefined` is the React-idiomatic way to remove event listeners
- This prevents any new tilt calculation while the modal is open, even if bubbled events somehow reach the card
- When `disabled` goes back to `false` (modal closes), the handlers are re-attached and tilt works normally on the next hover

---

## Summary

| Topic | Decision |
|-------|----------|
| Root cause | React portal event bubbling through React tree |
| Fix location | `TiltCard.tsx` + `ProjectCard.tsx` only |
| Reset mechanism | `useEffect` calling `onMouseLeave()` when `disabled=true` |
| Event blocking | Set handlers to `undefined` when `disabled=true` |
| Files changed | 2 (`TiltCard.tsx`, `ProjectCard.tsx`) |
| Lines changed | ~6 total |
