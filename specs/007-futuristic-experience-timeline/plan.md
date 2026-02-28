# Implementation Plan: Futuristic Animated Experience Timeline

**Branch**: `007-futuristic-experience-timeline` | **Date**: 2026-02-28 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/007-futuristic-experience-timeline/spec.md`

## Summary

Replace the current static `ExperienceCard` list with a vertical timeline: a glowing central axis, alternating left/right cards on desktop (single-side on mobile), and Framer Motion scroll-triggered animations that fire once per page load. The futuristic aesthetic uses the existing primary OKLCH color with new glow utilities added to `globals.css`. No new npm packages.

## Technical Context

**Language/Version**: TypeScript 5.x strict (no `any`)
**Primary Dependencies**: Next.js 14+ App Router, React 18, Framer Motion 12.x (`whileInView`, `useReducedMotion`, `AnimatePresence`), Tailwind CSS v4 (`@theme inline` in `globals.css`), shadcn/ui, Lucide React
**Storage**: N/A — data stays in `/data/experiences.ts` (no changes)
**Testing**: `npx tsc --noEmit` (TypeScript strict, zero `any`)
**Target Platform**: Web (320px–1440px), dark mode + light mode
**Project Type**: Single Next.js application
**Performance Goals**: Animation sequence completes in < 2 s; Lighthouse score ≥ 90 (no parallax, no heavy effects)
**Constraints**: `prefers-reduced-motion` must disable all animations; no new npm packages; glow effects must not reduce text contrast below 4.5:1 AA ratio

## Constitution Check

| Gate | Status | Note |
|------|--------|------|
| No new npm packages without justification | ✅ PASS | All tooling already installed (Framer Motion, Tailwind, Lucide) |
| TypeScript strict — no `any` | ✅ PASS | All new code will be fully typed |
| Responsive 320px–1440px | ✅ PASS | Mobile single-side, desktop alternating via `md:` breakpoint |
| `prefers-reduced-motion` handled | ✅ PASS | `useReducedMotion()` from Framer Motion wraps all animations |
| Dark mode + light mode | ✅ PASS | Glow uses CSS custom property `--color-primary`; adapts automatically |
| Lighthouse ≥ 90 | ✅ PASS | `viewport={{ once: true }}` prevents re-animation; no parallax |
| No changes to data layer | ✅ PASS | `data/experiences.ts` untouched |

## Project Structure

### Documentation (this feature)

```text
specs/007-futuristic-experience-timeline/
├── plan.md              # This file
├── research.md          # Phase 0 research findings
├── data-model.md        # Component props and data contracts
├── quickstart.md        # Integration guide and smoke tests
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
app/
└── globals.css                          # Add @layer utilities: .glow-primary, .glow-primary-sm, .timeline-axis

components/
├── sections/
│   └── ExperienceSection.tsx            # Refactor: timeline container + vertical axis
└── shared/
    └── ExperienceCard.tsx               # Refactor: alternating layout + node + side animations
```

**Structure Decision**: Single-project layout. Only two components are modified — no new files needed. Glow utilities are added to the existing `globals.css` via `@layer utilities`.

## Architecture

### Timeline Layout (ExperienceSection)

```
<section id="experiences">
  <SectionTitle />
  <div class="relative">                        ← timeline root, position: relative
    <div class="timeline-axis" />               ← absolute, vertical glowing line
    {experiences.map((exp, i) =>
      <ExperienceCard index={i} />              ← positions itself left or right of axis
    )}
  </div>
</section>
```

- Container expands from `max-w-3xl` → `max-w-5xl` on desktop to give room for the alternating layout
- The axis line is an absolutely positioned `<div>` centered horizontally, `top-0 bottom-0 left-1/2`
- On mobile (`< md`), axis moves to `left-4` (16px from edge) and all cards sit to its right

### ExperienceCard Layout (per card)

```
<motion.div>                                    ← scroll-triggered entrance animation
  <div class="timeline-node-wrapper">           ← positions the node on the axis
    <div class="node-pulse" />                  ← animated outer ring (scale + opacity)
    <div class="node-core" />                   ← solid inner circle with glow
  </div>
  <Card class="...">                            ← content, no border-l-4 (node replaces it)
    ...existing content...
  </Card>
</motion.div>
```

**Desktop alternation** (index determines side):
- Even index (0, 2, …): card on LEFT, node on center, card slides in from left
- Odd index (1, 3, …): card on RIGHT, node on center, card slides in from right

**Mobile**: all cards on RIGHT of axis (node always on left edge `left-4`)

### Animation Strategy

```typescript
// Scroll trigger (fires once)
whileInView={{ opacity: 1, x: 0 }}
viewport={{ once: true, margin: "-50px" }}
initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
transition={{ duration: 0.5, delay: index * 0.15 }}

// Node pulse (infinite, paused if reduced motion)
animate={reducedMotion ? {} : { scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}

// prefers-reduced-motion
const reducedMotion = useReducedMotion() // from framer-motion
// When true: no initial offset, no pulse animation, content visible immediately
```

### Glow Utilities (globals.css)

```css
@layer utilities {
  .glow-primary {
    box-shadow: 0 0 12px 2px oklch(0.55 0.2 260 / 0.6),
                0 0 24px 4px oklch(0.55 0.2 260 / 0.3);
  }
  .glow-primary-sm {
    box-shadow: 0 0 6px 1px oklch(0.55 0.2 260 / 0.5);
  }
  .timeline-axis {
    background: linear-gradient(
      to bottom,
      transparent,
      oklch(0.55 0.2 260 / 0.8) 10%,
      oklch(0.55 0.2 260) 50%,
      oklch(0.55 0.2 260 / 0.8) 90%,
      transparent
    );
    box-shadow: 0 0 8px 2px oklch(0.55 0.2 260 / 0.4);
  }
}
```

In dark mode, the primary variable automatically shifts to `oklch(0.65 0.2 260)` via existing `@theme inline` dark overrides — no extra code needed.

## Complexity Tracking

*No constitution violations.*
