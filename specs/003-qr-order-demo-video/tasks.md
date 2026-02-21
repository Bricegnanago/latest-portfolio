# Tasks: Vidéo de démo — QR Order System

**Input**: Design documents from `/specs/003-qr-order-demo-video/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, quickstart.md ✅

**Tests**: Aucun test automatisé requis — la spec ne demande pas de TDD ; validation manuelle via quickstart.md.

**Organisation**: Tâches groupées par user story pour permettre une implémentation et une validation indépendantes.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Peut être exécuté en parallèle (fichiers différents, pas de dépendances non résolues)
- **[Story]**: User story concernée (US1, US2)
- Chemins de fichiers exacts dans chaque description

---

## Phase 1: Setup

**Purpose**: Installer le prérequis bloquant avant tout développement

- [x] T001 Installer le composant `Dialog` de shadcn/ui via `npx shadcn@latest add dialog` et vérifier la création de `components/ui/dialog.tsx`

---

## Phase 2: Foundational (Prérequis bloquants)

**Purpose**: Extension du modèle de données — DOIT être complète avant toute implémentation de composant

**⚠️ CRITIQUE** : Aucun travail sur les composants ne peut commencer avant que cette phase soit terminée

- [x] T002 Ajouter le champ `videoUrl?: string` à l'interface `Project` dans `types/index.ts`
- [x] T003 Ajouter `videoUrl: "/images/event_project.mp4"` au projet QR Order System dans `data/projects.ts` (dépend de T002)

**Checkpoint**: Modèle de données prêt — les tâches US1 et US2 peuvent démarrer

---

## Phase 3: User Story 1 — Visionner la démo (Priority: P1) 🎯 MVP

**Goal**: Le visiteur clique "Voir la démo" sur la carte QR Order System → la vidéo `event_project.mp4` se lance dans une modale

**Independent Test**: Ouvrir `http://localhost:3000`, repérer la carte QR Order System, cliquer "Voir la démo" et vérifier que la vidéo démarre dans une modale. Les cartes Ticket System et ZoomStudent ne doivent PAS afficher ce bouton.

### Implémentation

- [x] T004 [US1] Créer le composant `VideoModal` avec `Dialog` shadcn/ui, balise `<video controls muted preload="metadata">`, `useRef` sur la vidéo, et callback `onOpenChange` pausant la vidéo à la fermeture — dans `components/shared/VideoModal.tsx`
- [x] T005 [US1] Modifier `ProjectCard` pour ajouter l'état local `isVideoOpen`, afficher le bouton "Voir la démo" (avec icône `Play` de Lucide) uniquement si `project.videoUrl` est défini, et rendre `<VideoModal>` conditionnellement — dans `components/shared/ProjectCard.tsx`

**Checkpoint**: US1 complète — un clic sur "Voir la démo" ouvre la vidéo ; les autres cartes sont inchangées

---

## Phase 4: User Story 2 — Fermeture du lecteur (Priority: P2)

**Goal**: Le visiteur peut fermer la modale vidéo via le bouton X, un clic sur l'overlay, ou la touche Échap — la vidéo s'arrête à chaque fois

**Independent Test**: Avec la modale ouverte et la vidéo en lecture, tester les 3 chemins de fermeture (bouton X, overlay, Échap) et vérifier que la vidéo est bien pausée après chaque fermeture.

### Implémentation

- [x] T006 [US2] Vérifier dans `components/shared/VideoModal.tsx` que `onOpenChange` appelle bien `videoRef.current?.pause()` avant `onClose()`, et que `DialogTitle` est présent avec `className="sr-only"` pour l'accessibilité (requis par Radix UI)

> ℹ️ Les 3 chemins de fermeture (X, overlay, Échap) sont gérés nativement par `Dialog` Radix UI — T006 valide et affine le comportement implémenté en T004.

**Checkpoint**: US2 complète — tous les chemins de fermeture fonctionnent et la vidéo s'arrête

---

## Phase 5: Polish & Accessibilité

**Purpose**: Conformité constitution (ARIA, responsive, qualité code)

- [x] T007 [P] Vérifier l'attribut `aria-label` sur la balise `<video>` et l'attribut `aria-label` ou titre accessible de la modale dans `components/shared/VideoModal.tsx`
- [x] T008 [P] Tester le rendu responsive en vue mobile (375px) via DevTools : bouton "Voir la démo" visible, modale utilisable sur petit écran — dans `components/shared/ProjectCard.tsx` et `VideoModal.tsx`
- [ ] T009 Valider l'ensemble selon `specs/003-qr-order-demo-video/quickstart.md` (checklist complète : 8 points de vérification manuelle)

---

## Dépendances & Ordre d'exécution

### Dépendances entre phases

- **Setup (Phase 1)** : Aucune dépendance — à démarrer immédiatement
- **Foundational (Phase 2)** : Dépend de Phase 1 (dialog installé) — BLOQUE US1 et US2
  - T002 et T003 sont séquentiels (T003 dépend de T002 pour TypeScript)
- **US1 (Phase 3)** : Dépend de Phase 2 complète
  - T004 et T005 sont séquentiels (T005 importe VideoModal de T004)
- **US2 (Phase 4)** : Dépend de T004 (affine le comportement de VideoModal)
- **Polish (Phase 5)** : Dépend de US1 + US2 complètes
  - T007 et T008 sont parallélisables entre eux

### Dépendances entre user stories

- **US1 (P1)** : Démarre après Phase 2 — aucune dépendance sur US2
- **US2 (P2)** : Démarre après T004 — affine le comportement initié en US1

### Opportunités de parallélisme

- T007 et T008 (Phase 5) peuvent être exécutés en parallèle
- US1 et US2 ne peuvent pas être parallélisés (US2 affine US1)

---

## Exemple d'exécution parallèle : Phase 5

```bash
# Lancer simultanément :
Task: "Vérifier les attributs ARIA dans VideoModal.tsx"
Task: "Tester le rendu responsive mobile"
```

---

## Stratégie d'implémentation

### MVP (User Story 1 uniquement)

1. Compléter Phase 1 : Setup (T001)
2. Compléter Phase 2 : Foundational (T002 → T003)
3. Compléter Phase 3 : US1 (T004 → T005)
4. **STOP et VALIDER** : Tester US1 indépendamment (`http://localhost:3000`)
5. Déployer ou démontrer si satisfaisant

### Livraison complète

1. Setup + Foundational → base prête
2. US1 (T004, T005) → MVP : bouton "Voir la démo" fonctionnel
3. US2 (T006) → fermeture propre validée
4. Polish (T007, T008, T009) → accessibilité et qualité confirmées

---

## Récapitulatif

| Phase | Tâches | Parallélisable | User Story |
|-------|--------|----------------|------------|
| 1 — Setup | T001 | Non | — |
| 2 — Foundational | T002, T003 | Non (séquentiel) | — |
| 3 — US1 | T004, T005 | Non (séquentiel) | US1 |
| 4 — US2 | T006 | N/A | US2 |
| 5 — Polish | T007, T008, T009 | T007//T008 | — |
| **Total** | **9 tâches** | | |

## Notes

- [P] = fichiers différents, sans dépendances non résolues
- [Story] relie chaque tâche à sa user story pour la traçabilité
- Chaque user story est testable indépendamment avant de passer à la suivante
- Committer après chaque phase ou tâche logique
- `Dialog` shadcn/ui gère nativement : Échap, clic overlay, bouton X, focus trap, ARIA role
