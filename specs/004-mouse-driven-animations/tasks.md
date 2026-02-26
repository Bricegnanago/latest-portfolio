# Tasks: Animations réactives à la souris

**Input**: Design documents from `/specs/004-mouse-driven-animations/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, quickstart.md

**Tests**: No automated tests requested — validation is manual/visual (DevTools Performance + visual inspection).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

---

## Phase 1: Setup

**Purpose**: Verify existing environment is ready for implementation

- [x] T001 Verify dev server starts correctly and existing animations work — run `npm run dev` and confirm all 6 sections render with current Framer Motion animations intact

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Create shared hooks and components that multiple user stories depend on

**⚠️ CRITICAL**: US1 and US2 both depend on these — must complete before either story begins

- [x] T002 Create `useTilt` hook in `hooks/useTilt.ts` — implement `useMotionValue` for mouseX/mouseY, `useTransform` to map position to rotateX/rotateY (max 12°), `useSpring` for smooth transitions, glare position calculation (gradient center x%/y%), `useReducedMotion()` from framer-motion to return neutral values when reduced motion is active, `matchMedia('(hover: hover) and (pointer: fine)')` check to disable on touch devices, and spring reset to (0,0) on mouse leave. Export `UseTiltOptions` and `UseTiltReturn` interfaces per plan.md API specification.

- [x] T003 Create `TiltCard` component in `components/shared/TiltCard.tsx` — wrapper using `useTilt` hook, render `<motion.div>` with tilt style (perspective, rotateX, rotateY, scale, transformStyle: preserve-3d), nested `<motion.div>` for glare overlay (absolute positioned, pointer-events-none, rounded-xl, radial-gradient background driven by glareStyle), and `{children}` for card content. Accept `className` and `tiltOptions` props per plan.md `TiltCardProps` interface.

**Checkpoint**: TiltCard can be imported and tested standalone — hover any div with it to see tilt + glare effect.

---

## Phase 3: User Story 1 — Effet de suivi de souris sur les cartes (Priority: P1) 🎯 MVP

**Goal**: Cards tilt subtly toward cursor direction on hover, creating a 3D effect (max 12°, spring-animated return).

**Independent Test**: Hover any project or skill card — it should tilt toward the cursor position smoothly and return to flat when mouse leaves.

### Implementation for User Story 1

- [x] T004 [P] [US1] Integrate TiltCard in `components/shared/ProjectCard.tsx` — wrap the `<Card>` element inside `<TiltCard>`, ensure the existing `<motion.div>` scroll animation remains on the outer wrapper and TiltCard wraps only the inner Card. Verify card content (buttons, links, badges) remains clickable.

- [x] T005 [P] [US1] Integrate TiltCard in `components/sections/SkillsSection.tsx` — wrap the `CategoryCard` inner content with `<TiltCard>`, keeping the existing `<motion.div variants={item}>` for scroll animation as the outer wrapper. Ensure skill badges remain readable and icon alignment is preserved.

- [x] T006 [US1] Evaluate and optionally integrate TiltCard in `components/shared/ExperienceCard.tsx` — the `border-l-4 border-l-primary` style may conflict with tilt perspective. If tilt looks good with the left border accent, wrap `<Card>` with `<TiltCard tiltOptions={{ maxTilt: 8 }}>` (reduced angle). If it looks awkward, skip tilt on this card and document the decision.

**Checkpoint**: All project cards and skill category cards tilt smoothly on hover. The portfolio feels more interactive. Tilt effect is disabled on mobile (verify with DevTools device emulation).

---

## Phase 4: User Story 2 — Effet de lumière directionnelle au survol (Priority: P2)

**Goal**: A subtle radial gradient light reflection follows the cursor on card hover, adapting to dark/light theme.

**Independent Test**: Hover a card — a semi-transparent radial gradient should appear at cursor position and fade out smoothly on mouse leave. Toggle theme — glare intensity should adapt.

### Implementation for User Story 2

- [x] T007 [US2] Add theme-aware glare adaptation in `components/shared/TiltCard.tsx` — import `useTheme` from `next-themes`, read `resolvedTheme`, pass theme to `useTilt` options or adjust glare overlay opacity: dark mode uses `rgba(255,255,255,0.15)` max opacity, light mode uses `rgba(255,255,255,0.25)` max opacity. Ensure the glare gradient radius is `60%` for a natural falloff.

- [x] T008 [US2] Verify glare smooth fade-out behavior in `hooks/useTilt.ts` — ensure the glare opacity `useSpring` has appropriate `stiffness` (~300) and `damping` (~30) so the glare fades out naturally over ~200-300ms when mouse leaves, not instantly. Test by hovering and quickly leaving a card.

**Checkpoint**: Cards show a moving light reflection on hover that follows the cursor. Switching between dark and light themes produces visually appropriate glare intensity. Glare disappears smoothly, not abruptly.

---

## Phase 5: User Story 3 — Animations de défilement enrichies (Priority: P3)

**Goal**: Scroll-triggered animations become more expressive with added scale transforms, while remaining subtle and playing only once.

**Independent Test**: Reload the page, scroll slowly from top to bottom — each section should have a richer entry animation (fade + translate + scale) compared to the current simple fade-up.

### Implementation for User Story 3

- [x] T009 [P] [US3] Enrich scroll animation in `components/sections/AboutSection.tsx` — change `initial={{ opacity: 0, y: 30 }}` to `initial={{ opacity: 0, y: 30, scale: 0.97 }}` and add `scale: 1` to the `whileInView` target. Keep `viewport={{ once: true }}` and `duration: 0.6`. Verify the profile image and info items animate together smoothly.

- [x] T010 [P] [US3] Enrich scroll animation items in `components/sections/SkillsSection.tsx` — change the `item` variant `hidden` from `{ opacity: 0, y: 20 }` to `{ opacity: 0, y: 20, scale: 0.95 }` and `show` to `{ opacity: 1, y: 0, scale: 1 }`. Keep stagger timing at `0.1s`. Verify all 6 category cards animate with the enhanced effect.

- [x] T011 [P] [US3] Enrich scroll animation in `components/shared/ProjectCard.tsx` — change `initial={{ opacity: 0, y: 30 }}` to `initial={{ opacity: 0, y: 30, scale: 0.97 }}` and add `scale: 1` to `whileInView`. Keep `delay: index * 0.15` stagger and `viewport={{ once: true }}`. Verify cards don't jump or clip when scaling.

- [x] T012 [P] [US3] Enrich scroll animation in `components/shared/ExperienceCard.tsx` — change `initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}` to add `scale: 0.98`, and add `scale: 1` to `whileInView`. Keep the alternating left/right directional entry and `viewport={{ once: true }}`.

**Checkpoint**: Scrolling through the full page shows enriched animations — elements feel like they "grow into place" rather than just fading in. Animations still play only once (verify by scrolling up and back down).

---

## Phase 6: User Story 4 — Effet de parallaxe subtil sur la section héro (Priority: P4)

**Goal**: Hero section elements react to mouse movement with different speeds, creating a depth illusion.

**Independent Test**: Move the mouse slowly across the hero section — title, subtitle, bio, and buttons should move in the opposite direction at different speeds (title most, buttons least).

### Implementation for User Story 4

- [x] T013 [US4] Create `useMouseParallax` hook in `hooks/useMouseParallax.ts` — listen to `mousemove` on `window` via `useEffect` (single listener), normalize mouse position to range -0.5 to 0.5 (center of viewport = 0) using `useMotionValue`, apply `useTransform` with `strength` factor (px) to produce x/y translation values, apply `useSpring` (stiffness: 100, damping: 30) for smooth movement, return `{ x: MotionValue<number>, y: MotionValue<number> }`. Include `useReducedMotion()` check — return static `{ x: 0, y: 0 }` if active. Include `matchMedia('(hover: hover) and (pointer: fine)')` check — disable on touch devices. Accept `UseMouseParallaxOptions` with `strength` (default: 1) and `inverted` (default: true) per plan.md API.

- [x] T014 [US4] Integrate parallax in `components/sections/HeroSection.tsx` — call `useMouseParallax` with 4 different strength values: title "Bienvenue" + name (strength: 15), title/role subtitle (strength: 10), bio paragraph (strength: 7), CTA buttons container (strength: 5). Apply `style={{ x, y }}` from each hook call to the corresponding `<motion.p>`, `<motion.h1>`, `<motion.div>` elements. Ensure the existing `containerVariants`/`itemVariants` stagger animation still works on page load (parallax should layer on top, not replace the initial entrance animation).

**Checkpoint**: Moving the mouse across the hero creates a subtle layered depth effect. Title moves most, buttons move least. On mobile (no mouse), the hero section looks and works identically to before (no parallax, no errors).

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Verify accessibility, performance, and cross-cutting quality across all stories

- [x] T015 Verify `prefers-reduced-motion` across all components — enable `prefers-reduced-motion: reduce` in browser DevTools (Rendering tab), reload page: tilt should be disabled (no rotation on hover), glare should be disabled, parallax should be disabled, scroll animations should be simple fade-only (no scale/translate). Document any component that doesn't respect the preference and fix it.

- [x] T016 Verify touch device behavior across all hooks — use DevTools device toolbar to simulate a touch device (e.g., iPhone 14), reload page: no tilt effect on tap, no parallax effect, scroll animations should work normally. Confirm `matchMedia('(hover: hover) and (pointer: fine)')` correctly returns false in simulation.

- [x] T017 Performance check — open DevTools Performance panel, record while moving mouse rapidly over cards and hero section for 10 seconds: verify no frame drops below 50fps, verify no layout thrashing (forced reflow) in the timeline. If performance issues found, add `will-change: transform` to TiltCard or reduce spring stiffness.

- [x] T018 Run quickstart.md validation checklist in `specs/004-mouse-driven-animations/quickstart.md` — go through all 9 verification items and confirm each passes. Fix any failing items before marking feature complete.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — verify environment first
- **Foundational (Phase 2)**: Depends on Phase 1 — creates shared hooks/components that BLOCK US1 and US2
- **US1 (Phase 3)**: Depends on Phase 2 (needs `useTilt` + `TiltCard`)
- **US2 (Phase 4)**: Depends on Phase 2 (needs `useTilt` + `TiltCard`) — can run in parallel with US1
- **US3 (Phase 5)**: No dependency on Phase 2 — can start after Phase 1 (modifies existing variants only)
- **US4 (Phase 6)**: No dependency on Phase 2 — can start after Phase 1 (creates independent `useMouseParallax` hook)
- **Polish (Phase 7)**: Depends on ALL user stories being complete

### User Story Dependencies

```
Phase 1 (Setup)
    │
    ├──→ Phase 2 (Foundational: useTilt + TiltCard)
    │       │
    │       ├──→ Phase 3 (US1: Tilt integration) ──┐
    │       └──→ Phase 4 (US2: Glare theme)    ──┤
    │                                              │
    ├──→ Phase 5 (US3: Scroll enrichi) ───────────┤
    ├──→ Phase 6 (US4: Hero parallax) ────────────┤
    │                                              │
    └──────────────────────────────────────────────└──→ Phase 7 (Polish)
```

### Parallel Opportunities

**After Phase 1**:
- T002 + T003 (foundational) can start
- T009, T010, T011, T012 (US3 — scroll enrichi) can start in parallel with Phase 2
- T013 (US4 — useMouseParallax) can start in parallel with Phase 2

**After Phase 2**:
- T004 + T005 (US1) can run in parallel (different files)
- T007 (US2) can run in parallel with US1 tasks

**Within US3** (Phase 5):
- T009, T010, T011, T012 are ALL parallelizable (different files, no dependencies)

---

## Parallel Example: Maximum Parallelism

```text
# After Phase 1 verified, launch these in parallel:

# Track A: Foundational
Task T002: "Create useTilt hook in hooks/useTilt.ts"
  → then T003: "Create TiltCard component in components/shared/TiltCard.tsx"
    → then T004 + T005 in parallel (US1 integration)
    → then T007 (US2 theme glare)

# Track B: Scroll (independent, no Phase 2 dependency)
Task T009: "Enrich scroll in AboutSection.tsx"
Task T010: "Enrich scroll in SkillsSection.tsx"
Task T011: "Enrich scroll in ProjectCard.tsx"
Task T012: "Enrich scroll in ExperienceCard.tsx"

# Track C: Hero Parallax (independent, no Phase 2 dependency)
Task T013: "Create useMouseParallax hook in hooks/useMouseParallax.ts"
  → then T014: "Integrate parallax in HeroSection.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Verify environment
2. Complete Phase 2: Create `useTilt` + `TiltCard`
3. Complete Phase 3: Integrate tilt in ProjectCard + SkillsSection
4. **STOP and VALIDATE**: Hover cards to see tilt effect, check mobile, check reduced motion
5. This alone makes the portfolio feel significantly more interactive

### Incremental Delivery

1. Phase 1 + Phase 2 → Foundation ready
2. Add US1 (tilt on cards) → Test → **MVP shipped** 🎯
3. Add US2 (glare + theme) → Test → Enhanced hover experience
4. Add US3 (scroll enrichi) → Test → Richer scroll-through experience
5. Add US4 (hero parallax) → Test → Premium first impression
6. Polish → Final quality pass

### Fastest Full Delivery (Parallel)

1. Phase 1 → verify
2. Phase 2 + US3 + US4-hook in parallel → 3 tracks simultaneously
3. US1 + US2 (after Phase 2) + US4-integration → complete all stories
4. Phase 7 → final quality pass

---

## Notes

- All hooks use Framer Motion's `useMotionValue`/`useTransform`/`useSpring` — no `useState` for animation values, no unnecessary re-renders
- `useReducedMotion()` is imported directly from `framer-motion` — no custom hook needed (see research.md R6)
- Touch detection uses `matchMedia('(hover: hover) and (pointer: fine)')` — checked once at hook init (see research.md R3)
- No new npm dependencies — everything uses Framer Motion 12 already installed
- `viewport={{ once: true }}` MUST be preserved on all scroll animations (FR-006)
- Design (colors, typography, spacing) MUST remain identical — only motion/transform properties are added (FR-012)
