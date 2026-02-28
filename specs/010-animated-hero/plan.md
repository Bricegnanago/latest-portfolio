# Implementation Plan: Animated Hero Section

**Branch**: `010-animated-hero` | **Date**: 2026-02-28 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/010-animated-hero/spec.md`

## Summary

Réécriture de `components/sections/HeroSection.tsx` pour introduire une cinétique typographique complète (nom lettre par lettre, bio mot par mot), un layout split desktop (texte gauche / avatar droit), des micro-interactions hover, une animation de lévitation d'avatar, et un halo de background subtil. Aucun nouveau package requis — tout est réalisé avec la stack existante (Framer Motion + Tailwind CSS v4 + next/image).

## Technical Context

**Language/Version**: TypeScript 5.x strict (no `any`)
**Primary Dependencies**: Framer Motion 11+, Next.js 14+ App Router, Tailwind CSS v4, next/image, Lucide React
**Storage**: N/A — données depuis `data/personal.ts` (fichier statique existant)
**Testing**: Smoke test visuel (quickstart.md checklist) + `npx tsc --noEmit`
**Target Platform**: Web — Next.js App Router, Vercel
**Project Type**: Web application (single monorepo Next.js)
**Performance Goals**: 60 fps pour toutes les animations, LCP < 2,5 s (avatar `priority`), CLS = 0
**Constraints**: Aucun layout shift, aucun nouveau package, `useReducedMotion` respecté
**Scale/Scope**: 1 composant Hero, 1 fichier CSS utilities

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principe | Statut | Notes |
|----------|--------|-------|
| I — Stack technique | ✅ PASS | TypeScript strict, Framer Motion, Tailwind CSS, next/image |
| II — Architecture | ✅ PASS | `components/sections/HeroSection.tsx` — architecture respectée |
| III — Design & UX | ✅ PASS | mobile-first, `useReducedMotion`, dark/light adaptatif |
| IV — Intégrité contenu | ✅ PASS | `personalInfo` réel, `profile.jpg` existant |
| V — Qualité code | ✅ PASS | TypeScript strict, imports organisés, pas de `console.log` |
| Interdictions | ✅ PASS | Pas de CSS externe, pas de lib sup., pas de `useEffect` inutiles |

**Résultat**: Aucune violation — gate franchie.

## Project Structure

### Documentation (this feature)

```text
specs/010-animated-hero/
├── plan.md              ✅ Ce fichier
├── research.md          ✅ Phase 0
├── quickstart.md        ✅ Phase 1
└── tasks.md             ⬜ Créé par /speckit.tasks
```

### Source Code (repository root)

```text
components/
└── sections/
    └── HeroSection.tsx          ← réécriture complète (seul fichier modifié)

app/
└── globals.css                  ← ajout @keyframes hero-bg-pulse + .hero-bg-blob

public/
└── images/
    └── profile.jpg              ← existant, aucune modification

data/
└── personal.ts                  ← existant, aucune modification

hooks/
└── useMouseParallax.ts          ← existant, réutilisé (aucune modification)
```

**Structure Decision**: Single project Next.js — un seul fichier de composant à modifier, une addition CSS mineure.

## Implementation Details

### HeroSection.tsx — Architecture interne

```
HeroSection
├── background blob (div aria-hidden, CSS animated)
├── main content wrapper (flex col → flex row md+)
│   ├── text block (flex-1)
│   │   ├── "Bienvenue" label
│   │   ├── h1 — letter stagger (motion.span × n)
│   │   ├── title p — slide-up with delay
│   │   ├── bio p — word stagger (motion.span × n)
│   │   └── CTA div — pop animation
│   │       ├── Button "Voir mes projets"
│   │       └── Button variant="outline" "Me contacter"
│   └── avatar block (shrink-0, right on md+)
│       └── motion.div (float loop + parallax)
│           └── Image profile.jpg (rounded-full, priority)
└── scroll indicator (absolute bottom, ArrowDown)
```

### Animations timing

| Élément | Début | Durée | Type |
|---------|-------|-------|------|
| Lettre du nom (1ère) | 0,2 s | 0,4 s | spring stiffness=300 |
| Lettre du nom (dernière, ~13 chars) | ~0,72 s | 0,4 s | spring |
| Titre professionnel | 1,0 s | 0,4 s | ease-out |
| Bio (mots) | 1,4 s | stagger 0,03 s/mot | ease |
| Boutons CTA | 1,8 s | 0,35 s | spring pop |
| Avatar appear | 0,4 s | 0,6 s | ease |
| Avatar float (loop) | immédiat | 4 s cycle | easeInOut |
| Background blob | immédiat | 8 s cycle | easeInOut |
| Flèche scroll | 1,5 s | 1 s fade | ease |

### Micro-interactions

| Élément | Hover | Implémentation |
|---------|-------|----------------|
| h1 (nom) | `filter: drop-shadow(glow)` | `whileHover` Framer Motion |
| p (titre) | `filter: drop-shadow(glow)` | `whileHover` Framer Motion |
| Button "Voir mes projets" | `scale(1.04)` + `.glow-primary` | `whileHover` wrapper |
| Button "Me contacter" | `scale(1.04)` | `whileHover` wrapper |

### Reduced Motion

```tsx
// Appliqué sur toutes les animations de mouvement
const prefersReducedMotion = useReducedMotion()

// Letter variants
const letterVariants = prefersReducedMotion
  ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
  : { hidden: { opacity: 0, y: 20, scale: 0.8 }, visible: { ... spring } }

// Float animation
animate={prefersReducedMotion ? {} : { y: [0, -14, 0] }}
```

## Complexity Tracking

Aucune violation de constitution — section non applicable.
