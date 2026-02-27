# Tasks: Fix Project Cards Layout

**Input**: Design documents from `/specs/006-fix-project-cards-layout/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, quickstart.md ✅

**Organization**: Bug fix — 1 fichier, 3 changements.

---

## Phase 1: Setup

- [x] T001 Vérifier que la branche `006-fix-project-cards-layout` est active et que `components/shared/ProjectCard.tsx` est lisible

---

## Phase 2: Foundational

_N/A — pas de prérequis bloquants._

---

## Phase 3: User Story 1 — Uniform Card Heights (P1)

**Goal**: Les cartes ont la même hauteur dans la grille — `h-full` se propage correctement jusqu'à `Card`.

- [x] T002 [US1] Ajouter `className="h-full"` sur le `motion.div` wrapper dans `components/shared/ProjectCard.tsx`
- [x] T003 [US1] Passer `className="h-full"` à `<TiltCard>` dans `components/shared/ProjectCard.tsx`

---

## Phase 4: User Story 2 — Buttons No Overflow (P1)

**Goal**: Les boutons ne débordent jamais de la carte.

- [x] T004 [US2] Changer `flex gap-2 pt-2` en `flex flex-wrap gap-2 pt-2` sur le conteneur de boutons dans `components/shared/ProjectCard.tsx`

---

## Phase 5: Polish

- [x] T005 Vérifier TypeScript strict — `npx tsc --noEmit` sans erreur
- [x] T006 Valider les 7 points de la checklist de `specs/006-fix-project-cards-layout/quickstart.md`
