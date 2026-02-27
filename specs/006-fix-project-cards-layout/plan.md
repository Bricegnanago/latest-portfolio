# Implementation Plan: Fix Project Cards Layout

**Branch**: `006-fix-project-cards-layout` | **Date**: 2026-02-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/006-fix-project-cards-layout/spec.md`

## Summary

Corriger deux bugs de mise en page dans la section Projets : (1) les cartes n'ont pas toutes la même hauteur dans la grille car le `motion.div` enveloppant `TiltCard` n'a pas `h-full` — la hauteur ne se propage pas jusqu'à `Card` ; (2) les boutons d'action débordent de la carte car le conteneur utilise `flex` sans `flex-wrap`. Les deux corrections touchent uniquement `components/shared/ProjectCard.tsx` et ne nécessitent aucune autre modification.

## Technical Context

**Language/Version**: TypeScript 5.x strict (no `any`)
**Primary Dependencies**: Next.js 14+ (App Router), React 18, Tailwind CSS 4, Framer Motion 12.x
**Storage**: N/A — bug CSS pur, aucune donnée modifiée
**Testing**: N/A — aucun framework de test configuré
**Target Platform**: Web (Vercel), mobile-first responsive
**Project Type**: Next.js web application
**Performance Goals**: N/A — modifications CSS uniquement
**Constraints**: Tailwind CSS uniquement, ne pas casser les animations Framer Motion existantes

## Constitution Check

| Principe | Statut | Notes |
|----------|--------|-------|
| I – Tailwind CSS uniquement | ✅ PASS | Ajout de `h-full` et `flex-wrap` — classes Tailwind standard |
| I – Next.js App Router | ✅ PASS | Aucun changement de routing |
| II – Architecture `components/shared/` | ✅ PASS | Modification de `ProjectCard.tsx` existant |
| III – Responsive mobile-first | ✅ PASS | `flex-wrap` améliore le responsive ; `h-full` n'affecte pas mobile (colonne unique) |
| III – Animations subtiles et performantes | ✅ PASS | Les props Framer Motion (`initial`, `whileInView`, `transition`) sont inchangées |
| V – Qualité du code | ✅ PASS | Changements minimaux et ciblés, aucun `console.log` |

**Post-design re-check**: ✅ Aucune violation — plan conforme.

## Root Cause Analysis

### Bug 1 — Hauteurs de cartes inégales

Chaîne de hauteur actuelle dans `components/shared/ProjectCard.tsx` :

```
Grid cell (stretch par défaut → remplit la hauteur de la rangée)
└── motion.div [ProjectCard]         ← ❌ pas de h-full → s'effondre à la hauteur du contenu
    └── TiltCard (motion.div relative) ← ❌ pas de h-full passé en className
        └── Card (flex h-full flex-col) ← ✅ a h-full mais son parent n'est pas full-height
```

**Fix**: Ajouter `className="h-full"` sur le `motion.div` de ProjectCard **et** passer `className="h-full"` à `<TiltCard>` (qui accepte la prop `className` via `cn("relative", className)`).

### Bug 2 — Boutons débordants

Container actuel : `<div className="flex gap-2 pt-2">`

Avec 3 boutons (Captures + Voir la démo + Code), ils dépassent la largeur de la carte car `flex` sans `flex-wrap` n'autorise pas le retour à la ligne.

**Fix**: Changer en `flex flex-wrap gap-2 pt-2`.

## Project Structure

### Documentation (this feature)

```text
specs/006-fix-project-cards-layout/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
components/
└── shared/
    └── ProjectCard.tsx   ← SEUL fichier modifié (3 lignes)
```

**Structure Decision**: Modification ciblée d'un seul fichier. `TiltCard.tsx` et `ProjectsSection.tsx` ne nécessitent pas de modification car `TiltCard` accepte déjà `className` et la grille est déjà correcte.
