# Tasks: Fix Card Tilt Effect When Modal Is Open

**Input**: Design documents from `/specs/009-fix-tilt-modal/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, quickstart.md ✅

**Organization**: Bug fix — 2 fichiers, ~6 lignes.

---

## Phase 1: Setup

_N/A_

---

## Phase 2: Foundational

_N/A_

---

## Phase 3: User Story 1 — Card stays flat when modal is open (P1)

**Goal**: Aucune rotation de carte pendant qu'un modal est ouvert. La carte revient à la position neutre à l'ouverture et fonctionne normalement après fermeture.

**Independent Test**: Ouvrir la galerie ou le modal vidéo → déplacer la souris → carte plate et immobile → fermer → survol normal fonctionne.

- [x] T001 [US1] Ajouter `disabled?: boolean` à `TiltCardProps` et `useEffect` de reset dans `components/shared/TiltCard.tsx` — importer `useEffect`, ajouter prop `disabled`, appeler `onMouseLeave()` quand `disabled` devient `true`, passer `undefined` aux handlers quand `disabled`
- [x] T002 [US1] Passer `disabled={isVideoOpen || isGalleryOpen}` à `<TiltCard>` dans `components/shared/ProjectCard.tsx`

---

## Phase 4: Polish

- [x] T003 Vérifier TypeScript strict — `npx tsc --noEmit` sans erreur
- [x] T004 Valider le smoke test de `specs/009-fix-tilt-modal/quickstart.md`
