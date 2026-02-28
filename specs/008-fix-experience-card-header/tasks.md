# Tasks: Fix Experience Card Header Layout

**Input**: Design documents from `/specs/008-fix-experience-card-header/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, quickstart.md ✅

**Organization**: Bug fix — 1 fichier, 1 changement.

---

## Phase 1: Setup

_N/A — aucune dépendance d'infrastructure._

---

## Phase 2: Foundational

_N/A — pas de prérequis bloquants._

---

## Phase 3: User Story 1 — Clean Card Header (P1)

**Goal**: Le titre du poste et la date s'affichent toujours en pile verticale, sans chevauchement quelle que soit la longueur du titre.

**Independent Test**: Ouvrir la section Expériences → titre long ("Ingénieur de Developpement Web et Mobile") s'affiche entièrement → date apparaît en dessous, bien séparée → aucun chevauchement.

- [x] T001 [US1] Supprimer `sm:flex-row sm:items-center sm:justify-between` du wrapper titre+date dans `components/shared/ExperienceCard.tsx` (ne garder que `flex flex-col gap-1`)

---

## Phase 4: Polish

- [x] T002 Vérifier TypeScript strict — `npx tsc --noEmit` sans erreur
- [x] T003 Valider les items de `specs/008-fix-experience-card-header/quickstart.md` (long titre, titre court, mobile, dark/light mode, non-régression feature 007)
