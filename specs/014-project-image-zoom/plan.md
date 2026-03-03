# Implementation Plan: Zoom sur les Images de Projet

**Branch**: `014-project-image-zoom` | **Date**: 2026-03-03 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/014-project-image-zoom/spec.md`

## Summary

Ajouter le zoom et le déplacement (pan) dans la galerie modale d'images de projet. L'utilisateur peut cliquer pour zoomer à 2.5×, glisser pour explorer l'image, et utiliser le pincement (pinch) sur mobile. Toutes les modifications se concentrent dans un seul fichier : `components/shared/ImageGalleryModal.tsx`. Aucune nouvelle dépendance.

## Technical Context

**Language/Version**: TypeScript 5.x strict (no `any`)
**Primary Dependencies**: Framer Motion 12.34.1 (déjà installé), React 18, next/image
**Storage**: N/A — feature purement UI, aucune donnée persistée
**Testing**: Smoke tests manuels (quickstart.md)
**Target Platform**: Web — desktop + mobile (Next.js 14 App Router, Vercel)
**Project Type**: Web application (Next.js monorepo)
**Performance Goals**: Transitions zoom/pan à 60 fps, pas de jank visible
**Constraints**: Aucune nouvelle dépendance npm, TypeScript strict, `prefers-reduced-motion` respecté
**Scale/Scope**: 1 composant modifié, 0 fichier créé

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principe | Statut | Justification |
|----------|--------|---------------|
| I. Stack technique — TypeScript strict, Next.js, Framer Motion, Tailwind | ✅ PASS | Framer Motion déjà installé, pas de nouvelle lib |
| I. Stack — `next/image` obligatoire | ✅ PASS | `<Image fill>` maintenu, le zoom s'applique au wrapper |
| II. Architecture — `components/shared/` | ✅ PASS | `ImageGalleryModal.tsx` est dans `components/shared/` |
| II. Pas de CMS / backend | ✅ PASS | Feature purement frontend |
| III. Responsive mobile-first | ✅ PASS | Pinch-to-zoom géré nativement, swipe préservé |
| III. Accessibilité — attributs ARIA | ✅ PASS | `aria-hidden`, labels boutons, Échap clavier |
| III. `prefers-reduced-motion` | ✅ PASS | Animations désactivées si réduit, zoom reste fonctionnel |
| V. Pas de `console.log`, pas de `any` | ✅ PASS | À vérifier `npx tsc --noEmit` post-implémentation |
| Interdictions — Sur-ingénierie | ✅ PASS | 0 nouveau fichier, 0 nouveau composant, 0 nouveau hook |

**GATE RESULT**: ✅ Toutes les gates passent. Pas de violation.

## Project Structure

### Documentation (this feature)

```text
specs/014-project-image-zoom/
├── plan.md       ✅ Ce fichier
├── research.md   ✅ Decisions techniques
├── quickstart.md ✅ Code complet + smoke tests
└── tasks.md      (généré par /speckit.tasks)
```

*Pas de `data-model.md` ni `contracts/` — feature purement UI, aucune entité ni API.*

### Source Code — 1 seul fichier modifié

```text
components/
└── shared/
    └── ImageGalleryModal.tsx   ← SEUL fichier à modifier
```

**Structure Decision**: Feature entièrement contenue dans le composant existant `ImageGalleryModal.tsx`. Pas de nouveau fichier (pas de hook séparé, pas de sous-composant) — l'état de zoom est local au composant et n'a pas de valeur hors de ce contexte.
