# Data Model: Futuristic Animated Experience Timeline

**Feature**: `007-futuristic-experience-timeline`
**Date**: 2026-02-28

---

## Entities

### Experience (existing — unchanged)

Source: `types/index.ts` + `data/experiences.ts`

```typescript
interface Experience {
  company: string           // e.g. "Monbolide"
  position: string          // e.g. "Développeur Full Stack"
  startDate: string         // e.g. "Septembre 2023"
  endDate: string           // e.g. "Présent"
  description: string       // Short paragraph
  responsibilities: string[] // Bulleted list items
  location?: string         // Optional — omitted gracefully if absent
}
```

**Note**: No changes to this type or to `data/experiences.ts`.

---

## Component Props

### ExperienceSection (modified)

```typescript
// No props — data comes from `import { experiences } from "@/data/experiences"`
// Renders the timeline container + vertical axis + list of ExperienceCard
```

### ExperienceCard (modified)

```typescript
interface ExperienceCardProps {
  experience: Experience   // unchanged
  index: number            // determines left/right alternation: even = left, odd = right
  total: number            // total number of experiences (used for last-node styling)
}
```

**Derived state** (computed inside component, no useState):
- `isLeft: boolean` = `index % 2 === 0` (desktop only — always right on mobile)
- `reducedMotion: boolean` = `useReducedMotion()` from framer-motion

---

## Animation State Model

All animation state is handled declaratively by Framer Motion — no `useState` for animation.

| Animation | Trigger | Condition | Props |
|-----------|---------|-----------|-------|
| Card entrance | Enter viewport | `!reducedMotion` | `initial={{ opacity:0, x: ±40 }}` → `whileInView={{ opacity:1, x:0 }}` |
| Card entrance (reduced) | Immediate | `reducedMotion` | `initial={{ opacity:1, x:0 }}` |
| Node pulse outer | Continuous | `!reducedMotion` | `animate={{ scale:[1,1.8,1], opacity:[0.8,0,0.8] }}` |
| Node pulse (reduced) | Static | `reducedMotion` | `animate={{}}` |

---

## CSS Utilities (globals.css additions)

| Class | Purpose | Applied To |
|-------|---------|------------|
| `.glow-primary` | Strong glow halo | Timeline axis line |
| `.glow-primary-sm` | Subtle glow | Node inner circle |
| `.timeline-axis` | Gradient + glow line | Axis `<div>` |

---

## Layout Tokens

| Token | Mobile | Desktop (`md:`) |
|-------|--------|-----------------|
| Axis position | `left-4` (16px) | `left-1/2` (center) |
| Card margin-left | `ml-10` (40px) | `ml-0` or `mr-0` (alternating) |
| Card width | `w-[calc(100%-3rem)]` | `w-[calc(50%-2.5rem)]` |
| Container max-width | `max-w-3xl` (unchanged) | `max-w-5xl` |
