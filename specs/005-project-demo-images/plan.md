# Implementation Plan: Project Demo Images Gallery

**Branch**: `005-project-demo-images` | **Date**: 2026-02-26 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-project-demo-images/spec.md`

## Summary

Ajouter la prise en charge de plusieurs images de démonstration par projet, affichées dans une galerie modale accessible (clavier, swipe mobile) en réutilisant le pattern `VideoModal` existant avec `Dialog` + `next/image` + `AnimatePresence` de Framer Motion.

## Technical Context

**Language/Version**: TypeScript 5.x strict (no `any`)
**Primary Dependencies**: Next.js 14+ (App Router), React 18, Tailwind CSS 4, shadcn/ui (Dialog déjà installé), Framer Motion 12.x, Lucide React, next/image
**Storage**: Fichiers statiques TypeScript (`/data/*.ts`) — pas de base de données
**Testing**: N/A — aucun framework de test configuré dans le projet
**Target Platform**: Web (Vercel), mobile-first responsive
**Project Type**: Next.js web application (single Next.js monorepo)
**Performance Goals**: Lighthouse > 90, chargement différé des images hors-modal
**Constraints**: `next/image` obligatoire, Tailwind CSS uniquement, pas de nouvelles librairies, pas de `useEffect` inutiles

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principe | Statut | Notes |
|----------|--------|-------|
| I – Stack TypeScript strict | ✅ PASS | Nouveaux types `DemoImage` + extension de `Project` |
| I – Next.js App Router | ✅ PASS | Composants client uniquement pour l'interactivité |
| I – Tailwind CSS uniquement | ✅ PASS | Aucun CSS externe |
| I – shadcn/ui pour les composants | ✅ PASS | `Dialog` déjà installé, réutilisé |
| I – Framer Motion pour les animations | ✅ PASS | `AnimatePresence` pour les transitions entre images |
| I – Lucide React pour les icônes | ✅ PASS | `ChevronLeft`, `ChevronRight`, `Images` |
| II – `next/image` obligatoire | ✅ PASS | `fill` + conteneur `relative` avec ratio fixe |
| II – Données dans `/data/*.ts` | ✅ PASS | Images définies dans `data/projects.ts` |
| II – Architecture `components/shared/` | ✅ PASS | `ImageGalleryModal` dans `components/shared/` |
| III – Responsive mobile-first | ✅ PASS | Swipe natif (Pointer Events), breakpoints Tailwind |
| III – Accessibilité ARIA | ✅ PASS | Navigation clavier, `aria-label`, indicateurs |
| IV – Aucune donnée fictive | ✅ PASS | Chemins `[À COMPLÉTER]` marqués explicitement si manquants |
| V – Qualité du code | ✅ PASS | Pas de `console.log`, imports organisés, un composant = un fichier |

**Post-design re-check**: ✅ Aucune violation — plan conforme à la constitution.

## Project Structure

### Documentation (this feature)

```text
specs/005-project-demo-images/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
types/
└── index.ts                              ← Ajouter DemoImage + images?: DemoImage[] sur Project

data/
└── projects.ts                           ← Ajouter images[] à chaque projet

components/
└── shared/
    ├── ImageGalleryModal.tsx             ← NOUVEAU composant (Dialog + next/image + nav)
    └── ProjectCard.tsx                   ← Mise à jour : bouton "Voir les captures"
```

**Structure Decision**: Single Next.js project (Option 1 adaptée web). Aucun backend, aucune API. Toute la logique est dans les composants React client et les fichiers de données.
