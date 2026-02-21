# Implementation Plan: Vidéo de démo — QR Order System

**Branch**: `003-qr-order-demo-video` | **Date**: 2026-02-21 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-qr-order-demo-video/spec.md`

## Summary

Afficher la vidéo de démonstration existante (`event_project.mp4`) dans une modale accessible lorsque le visiteur clique sur "Voir la démo" depuis la fiche projet QR Order System. L'implémentation ajoute un champ `videoUrl` optionnel au type `Project`, l'assigne au projet QR Order System dans les données statiques, et crée un composant `VideoModal` basé sur `shadcn/ui Dialog` + `Framer Motion` intégré dans `ProjectCard`.

## Technical Context

**Language/Version**: TypeScript 5.x strict (no `any`)
**Primary Dependencies**: Next.js 14 (App Router), React 18, Framer Motion 11, shadcn/ui (Dialog), Lucide React, Tailwind CSS 3.4
**Storage**: N/A — vidéo servie statiquement depuis `/public/images/`
**Testing**: N/A — pas de test automatisé dans la stack actuelle
**Target Platform**: Web (desktop + mobile), déployé sur Vercel
**Project Type**: Web (Next.js monorepo)
**Performance Goals**: Vidéo accessible en < 3 secondes sur connexion standard ; pas de dégradation du score Lighthouse (> 90)
**Constraints**: Pas de lecture automatique forcée sur mobile (contrainte navigateur) ; fichier vidéo localement hébergé ; pas de librairie externe supplémentaire
**Scale/Scope**: Feature ciblée — 1 projet, 1 vidéo, 3 fichiers modifiés + 1 composant créé

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principe | Statut | Notes |
|----------|--------|-------|
| I. Stack Technique — Next.js, TypeScript strict, Tailwind, shadcn/ui, Framer Motion | ✅ PASS | `Dialog` shadcn/ui utilisé ; `<video>` HTML natif ; Framer Motion pour l'animation d'ouverture |
| I. Stack — Pas de CSS externe, pas de styled-components | ✅ PASS | Uniquement Tailwind CSS |
| II. Architecture — `components/shared/` pour composants de page | ✅ PASS | `VideoModal` dans `components/shared/` ; `ProjectCard` dans `components/shared/` |
| II. Data dans `/data/*.ts` | ✅ PASS | `videoUrl` ajouté dans `data/projects.ts` |
| II. Images via `next/image` | ✅ PASS (N/A) | Pas d'image statique — `<video>` natif HTML est la bonne approche pour les vidéos |
| III. Responsive mobile-first | ✅ PASS | Modale plein écran sur mobile, centrée sur desktop ; contrôles vidéo natifs |
| III. Accessibilité — attributs ARIA | ✅ PASS | `Dialog` Radix UI gère focus trap, `role="dialog"`, `aria-label` automatiquement |
| IV. Intégrité contenu — pas de placeholder | ✅ PASS | Vidéo réelle confirmée par l'utilisateur (`event_project.mp4`) |
| IV. Ne pas inventer de liens | ✅ PASS | `videoUrl` pointe vers fichier existant `/images/event_project.mp4` |
| V. Qualité code — pas de `any`, imports organisés | ✅ PASS | Types explicites ; pas de `any` |
| V. Un composant = un fichier | ✅ PASS | `VideoModal.tsx` créé séparément de `ProjectCard.tsx` |
| Contraintes — pas de sur-ingénierie | ✅ PASS | Solution minimale : 1 nouveau composant, 2 fichiers modifiés |

**Résultat : GATE PASSED — aucune violation de la constitution.**

## Project Structure

### Documentation (this feature)

```text
specs/003-qr-order-demo-video/
├── plan.md              # Ce fichier
├── research.md          # Phase 0
├── data-model.md        # Phase 1
├── quickstart.md        # Phase 1
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

```text
types/
└── index.ts                        # Modifier: ajouter videoUrl?: string à Project

data/
└── projects.ts                     # Modifier: ajouter videoUrl à QR Order System

components/
└── shared/
    ├── ProjectCard.tsx             # Modifier: intégrer VideoModal si videoUrl présent
    └── VideoModal.tsx              # Créer: modale vidéo avec Dialog shadcn/ui

public/
└── images/
    └── event_project.mp4           # Existant — aucune modification
```

**Structure Decision**: Next.js monorepo (Option Web, sans backend séparé). Modifications limitées à `types/`, `data/`, et `components/shared/`. Aucun nouveau répertoire de premier niveau créé.

## Complexity Tracking

> Aucune violation de la constitution — section non applicable.
