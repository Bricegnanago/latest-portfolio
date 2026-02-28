# Tasks: Futuristic Animated Experience Timeline

**Input**: Design documents from `/specs/007-futuristic-experience-timeline/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, quickstart.md ✅

**Organization**: 2 files modified, 1 file augmented — sequential within each file.

---

## Phase 1: Setup

**Purpose**: Add CSS utilities that all components depend on before any visual work begins.

- [x] T001 Add `.glow-primary`, `.glow-primary-sm`, and `.timeline-axis` utilities to `app/globals.css` via `@layer utilities` (OKLCH values: `oklch(0.55 0.2 260)`)

---

## Phase 2: Foundational

**Purpose**: Restructure `ExperienceSection.tsx` to provide the timeline container and axis that `ExperienceCard` positions itself against.

**⚠️ CRITICAL**: `ExperienceCard` cannot implement alternating layout until this container exists.

- [x] T002 Refactor `components/sections/ExperienceSection.tsx` — change container to `max-w-3xl md:max-w-5xl`, replace `<div className="space-y-6">` with `<div className="relative">` containing an absolute axis `<div className="timeline-axis absolute left-4 top-0 bottom-0 w-0.5 md:left-1/2 md:-translate-x-1/2 z-0" />` and inner `<div className="space-y-12 py-4">`, pass `total={experiences.length}` to each `<ExperienceCard />`

**Checkpoint**: Section renders a visible vertical glowing line — cards still render in their current (non-alternating) layout at this point.

---

## Phase 3: User Story 1 — Timeline Structure (Priority: P1) 🎯 MVP

**Goal**: Visitors see a proper vertical timeline with alternating left/right cards on desktop, single-side on mobile, and a glowing node at each experience entry.

**Independent Test**: Open the Experiences section on desktop → a glowing vertical axis is visible → card 1 (Monbolide) is on the LEFT → card 2 is on the RIGHT → card 3 is on the LEFT → each has a glowing circular node on the axis at its vertical center → all content (position, company, dates, description, responsibilities) is readable.

### Implementation for User Story 1

- [x] T003 [US1] Refactor `components/shared/ExperienceCard.tsx` — add `total: number` to `ExperienceCardProps`, compute `isLeft = index % 2 === 0`, remove `TiltCard` wrapper entirely, implement alternating outer wrapper with `cn("relative flex items-start", "pl-10 md:pl-0", isLeft ? "md:flex-row-reverse md:pr-[calc(50%+1.5rem)]" : "md:pl-[calc(50%+1.5rem)]")`, add node wrapper `<div className="absolute left-4 top-6 -translate-x-1/2 z-10 md:left-1/2">` with outer ring `<div className="absolute inset-0 rounded-full bg-primary/30" />` and inner core `<div className="relative z-10 h-3 w-3 rounded-full bg-primary glow-primary-sm" />`, remove `border-l-4 border-l-primary` from `Card` className, wrap card content in `<div className="w-full">`

**Checkpoint**: Desktop shows alternating cards with static glowing nodes. Mobile shows all cards right of the axis. Content is fully readable. No animation yet.

---

## Phase 4: User Story 2 — Animated Reveal on Scroll (Priority: P1)

**Goal**: Each experience card slides in from its side when scrolled into view, sequentially, exactly once per page load. Node pulses continuously. All motion respects `prefers-reduced-motion`.

**Independent Test**: Scroll to the Experiences section from above → card 1 slides in from the LEFT with a delay of 0ms → card 2 slides in from the RIGHT with a delay of 150ms → card 3 slides in from the LEFT with a delay of 300ms → nodes pulse (outer ring expands and fades) → scrolling back up and down again does NOT re-trigger the animation.

### Implementation for User Story 2

- [x] T004 [US2] Add card entrance animation to `components/shared/ExperienceCard.tsx` — import `useReducedMotion` from `framer-motion`, compute `const reducedMotion = useReducedMotion()`, wrap the card content `<div>` in `<motion.div className="w-full" initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: index * 0.15 }}>`

- [x] T005 [US2] Add node pulse animation to `components/shared/ExperienceCard.tsx` — change outer ring `<div>` to `<motion.div className="absolute inset-0 rounded-full bg-primary/30" animate={reducedMotion ? {} : { scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }} />`

**Checkpoint**: All animations work correctly. `prefers-reduced-motion` disables all motion. Animation fires exactly once.

---

## Phase 5: User Story 3 — Content Readability in Dark/Light Mode (Priority: P2)

**Goal**: The futuristic aesthetic does not compromise readability. All content fields are visually distinct and legible in both themes.

**Independent Test**: In dark mode — position, company, dates, description, and responsibilities are all readable with sufficient contrast. In light mode — same check. Toggle theme → visual coherence maintained in both.

### Implementation for User Story 3

- [x] T006 [P] [US3] Verify content hierarchy in `components/shared/ExperienceCard.tsx` — confirm `CardTitle` (position), `CardDescription` (company + location), dates (muted text), `<p>` (description), `<ul>` (responsibilities with `bg-primary` bullet) are all visually distinct after the structural refactor; fix any class conflicts introduced by removing `border-l-4 border-l-primary`

- [x] T007 [P] [US3] Verify glow effect contrast in `app/globals.css` — toggle dark/light mode in browser and confirm `.glow-primary-sm` on the node and `.timeline-axis` gradient do not bleed into or behind text areas; reduce opacity values if any glow causes text contrast to fall below 4.5:1 AA ratio

**Checkpoint**: Section is visually polished and readable across both themes and all screen sizes.

---

## Phase 6: Polish

- [x] T008 Run `npx tsc --noEmit` from repo root and confirm zero TypeScript errors (strict mode — no `any`)
- [x] T009 Manually validate all smoke test items in `specs/007-futuristic-experience-timeline/quickstart.md` (desktop alternation, mobile stacking, dark mode, light mode, reduced motion, 320px min-width)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on T001 (CSS utilities must exist before axis renders visibly)
- **US1 (Phase 3)**: Depends on T002 (container must exist before card can position itself)
- **US2 (Phase 4)**: Depends on T003 (card structure must exist before animations are layered)
- **US3 (Phase 5)**: Depends on T004 + T005 (full component must be built before readability is verified)
- **Polish (Phase 6)**: Depends on all phases complete

### Task Dependencies (sequential within ExperienceCard.tsx)

```
T001 → T002 → T003 → T004 → T005 → T006 [P]
                                  → T007 [P]
                                            → T008 → T009
```

### Parallel Opportunities

- T006 and T007 (Phase 5) can run in parallel — different concerns, different files
- All other tasks are sequential (same file chain)

---

## Implementation Strategy

### MVP First (User Stories 1 + 2 — both P1)

1. Complete Phase 1: CSS utilities
2. Complete Phase 2: Section container restructure
3. Complete Phase 3: Card alternating layout + node
4. Complete Phase 4: Animations + reduced motion
5. **STOP and VALIDATE**: Scroll test on desktop and mobile
6. Deploy if ready

### Incremental Delivery

1. T001 + T002 → Glowing axis appears in the section
2. T003 → Alternating cards with static glowing nodes (MVP structure)
3. T004 + T005 → Full animated reveal (MVP complete)
4. T006 + T007 → Readability polish (P2 complete)
5. T008 + T009 → Quality gate passed

---

## Notes

- [P] tasks = different files or independent concerns, no blocking dependencies
- `TiltCard` is intentionally removed (research decision R-007 — conflicts with alternating layout)
- `useReducedMotion()` is imported from `framer-motion` — already used in `useTilt.ts` and `useMouseParallax.ts`
- OKLCH glow values use the light-mode primary; dark mode automatically uses `oklch(0.65 0.2 260)` via existing `@theme inline` overrides
- Container width: `max-w-5xl` on desktop only — mobile keeps `max-w-3xl` behaviour (full-width in practice)
