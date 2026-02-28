# Research: Futuristic Animated Experience Timeline

**Feature**: `007-futuristic-experience-timeline`
**Date**: 2026-02-28

---

## R-001: Framer Motion scroll-triggered animation pattern

**Decision**: Use `whileInView` + `viewport={{ once: true, margin: "-50px" }}` directly on `motion.div`

**Rationale**: Already used everywhere in the codebase (`ExperienceCard`, `ProjectCard`, `SkillCard`). `once: true` ensures animation fires exactly once per page load (FR-007). `margin: "-50px"` triggers slightly before the element fully enters the viewport for a smoother reveal.

**Alternatives considered**:
- `useInView` hook + manual state: More boilerplate, same result
- Intersection Observer directly: Adds complexity, no advantage

---

## R-002: prefers-reduced-motion handling

**Decision**: `useReducedMotion()` from `framer-motion` (already used in `useTilt.ts` and `useMouseParallax.ts`)

**Rationale**: Consistent with the existing codebase pattern. When `reducedMotion` is `true`:
- `initial` prop receives `{ opacity: 1, x: 0 }` (no offset) instead of `{ opacity: 0, x: ±40 }`
- Node pulse animation receives `animate={{}}` (empty, static)
- Content is immediately visible — no animation, no information loss (FR-008)

**Alternatives considered**:
- CSS `@media (prefers-reduced-motion: reduce)`: Would still flash the initial hidden state; JS approach is cleaner
- `AnimatePresence` with conditional: Overkill for entrance animations

---

## R-003: Glow / neon CSS utilities

**Decision**: Add `.glow-primary`, `.glow-primary-sm`, and `.timeline-axis` to `globals.css` via `@layer utilities`

**Rationale**: Tailwind v4 uses `globals.css` exclusively — no `tailwind.config.ts` exists. The existing `@layer utilities` block already has custom classes (`animate-pulse-slow`, etc.). Adding glow utilities here keeps all custom CSS centralized and theme-aware. The primary color OKLCH value is `oklch(0.55 0.2 260)` (light) / `oklch(0.65 0.2 260)` (dark), read from `@theme inline` in `globals.css`.

**Alternatives considered**:
- Inline `style` prop with `boxShadow`: Works but not reusable, harder to maintain
- Tailwind `shadow-` utilities with custom config: No config file in v4; `@layer utilities` is the correct approach
- New npm package (e.g., `tailwindcss-glow`): Rejected — adds a dependency for 3 CSS rules

---

## R-004: Timeline alternating layout strategy

**Decision**: CSS Grid with two columns on desktop; single column on mobile

**Rationale**: The axis line is `absolute` centered (`left-1/2`). Cards use `md:w-[calc(50%-2rem)]` and `md:ml-auto` / `md:mr-auto` to sit left or right of the axis. The `index % 2` determines which side. On mobile (`< md`), the axis moves to `left-4` and all cards use `ml-10` to sit to its right.

**Alternatives considered**:
- CSS Grid `grid-template-columns: 1fr auto 1fr`: More semantic but harder to animate correctly with Framer Motion transforms
- Absolute positioning for all cards: Breaks document flow, inaccessible

---

## R-005: Node animation (pulsing glow)

**Decision**: Two nested `<div>` elements — outer ring (animated scale+opacity) + inner core (static with `glow-primary-sm`)

```jsx
// Outer ring — pulses infinitely
<motion.div
  className="absolute inset-0 rounded-full bg-primary/30"
  animate={reducedMotion ? {} : { scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
/>
// Inner core — solid with glow
<div className="relative z-10 h-4 w-4 rounded-full bg-primary glow-primary-sm" />
```

**Rationale**: Pure CSS `@keyframes` pulse doesn't integrate with `useReducedMotion`. Framer Motion's `animate` with empty object `{}` cleanly disables all motion when reduced motion is preferred.

**Alternatives considered**:
- CSS `animation: pulse 2s infinite` with `prefers-reduced-motion: reduce` override: Would work but requires duplicating the glow logic between JS and CSS
- Single element with CSS `box-shadow` animation: Less visually impactful, harder to create the "ring expands outward" effect

---

## R-006: Container width

**Decision**: `max-w-5xl` on desktop (was `max-w-3xl`)

**Rationale**: The alternating layout needs horizontal space. `max-w-3xl` (48rem / 768px) would make each card only ~300px wide, too narrow for readable content. `max-w-5xl` (64rem / 1024px) gives each side ~460px after accounting for the axis. On mobile the container behavior is unchanged.

**Alternatives considered**:
- Keep `max-w-3xl` and stack vertically: Spec explicitly requires alternating layout on desktop (FR-002)
- `max-w-7xl`: Too wide for a portfolio — content would feel sparse

---

## R-007: TiltCard removal decision

**Decision**: Remove `TiltCard` wrapper from `ExperienceCard`

**Rationale**: The tilt effect conflicts with the alternating grid layout (tilt uses mouse position relative to element center, which behaves oddly when cards are offset left/right of the timeline axis). The futuristic aesthetic is achieved via the node glow and entrance animation instead. The spec does not require tilt.

**Alternatives considered**:
- Keep TiltCard: Creates layout shift issues with `position: relative` on the node wrapper
- Reduce tilt intensity: Still conflicts; removing is simpler and cleaner

---

## Summary Table

| Topic | Decision | Key Constraint |
|-------|----------|----------------|
| Scroll animation | `whileInView` + `once: true` | Fires once, triggered at `-50px` margin |
| Reduced motion | `useReducedMotion()` from framer-motion | No `any`, consistent with codebase |
| Glow CSS | `@layer utilities` in `globals.css` | Tailwind v4, no config file |
| Layout | CSS positioning + `index % 2` | md breakpoint for alternation |
| Node animation | Nested divs, Framer Motion animate | Respects `useReducedMotion` |
| Container width | `max-w-5xl` desktop | Enough width for alternating cards |
| TiltCard | Removed from ExperienceCard | Conflicts with alternating layout |
