# Tasks: Project Demo Images Gallery

**Input**: Design documents from `/specs/005-project-demo-images/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, quickstart.md ✅

**Tests**: Aucun framework de test configuré dans ce projet — pas de tâches de test générées.

**Organization**: Tâches organisées par user story (US1 → US2 → US3) pour permettre une implémentation et un test indépendants de chaque story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Peut s'exécuter en parallèle (fichiers différents, pas de dépendances non complétées)
- **[Story]**: User story à laquelle appartient la tâche ([US1], [US2], [US3])
- Chemins exacts inclus dans chaque description

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Vérifier les prérequis — aucune nouvelle dépendance à installer (Dialog, Framer Motion, Lucide React, next/image déjà présents).

- [x] T001 Vérifier dans `next.config.ts` que les URLs d'images externes utilisées dans `data/projects.ts` sont autorisées dans la config `images.remotePatterns`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Définir le type `DemoImage` et étendre `Project` — toutes les phases suivantes en dépendent.

**⚠️ CRITIQUE**: Aucune user story ne peut démarrer avant que cette phase soit complète.

- [x] T002 Ajouter l'interface `DemoImage { src: string; alt?: string }` et le champ `images?: DemoImage[]` à l'interface `Project` dans `types/index.ts`

**Checkpoint**: TypeScript compile sans erreur → user stories peuvent démarrer.

---

## Phase 3: User Story 1 — Visitor Views Project Demo Images (Priority: P1) 🎯 MVP

**Goal**: Un visiteur voit un bouton "Captures" sur les projets avec des images, ouvre la modale et voit l'image de démonstration.

**Independent Test**: Ajouter `images: [{ src: "/images/test.png", alt: "Test" }]` à un projet dans `data/projects.ts` → un bouton "Captures" apparaît sur la card → cliquer dessus ouvre une modale qui affiche l'image via `next/image`.

### Implementation for User Story 1

- [x] T003 [P] [US1] Créer `components/shared/ImageGalleryModal.tsx` : composant Dialog (`isOpen`/`onClose`) affichant `images[0]` avec `next/image fill` dans un conteneur `relative aspect-video max-h-[70vh]` — sans navigation pour l'instant
- [x] T004 [US1] Mettre à jour `components/shared/ProjectCard.tsx` : importer `ImageGalleryModal` et `Images` (Lucide), ajouter état `isGalleryOpen`, afficher le bouton "Captures" + `<ImageGalleryModal>` quand `project.images && project.images.length > 0`
- [x] T005 [P] [US1] Ajouter un tableau `images` avec au moins 2 entrées au projet "QR Order System" dans `data/projects.ts` (chemins vers `public/images/` existants ou marqués `[À COMPLÉTER]`)

**Checkpoint**: US1 testable indépendamment — bouton visible, modale s'ouvre, image affichée.

---

## Phase 4: User Story 2 — Visitor Navigates Between Multiple Demo Images (Priority: P2)

**Goal**: Un visiteur avec 3 images disponibles peut naviguer précédent/suivant via boutons, points indicateurs, clavier (←→ Échap) et swipe mobile. Les transitions sont animées.

**Independent Test**: Configurer un projet avec 3 images → ouvrir la galerie → cliquer ChevronRight 2 fois arrive à l'image 3 → une fois de plus revient à l'image 1 (circulaire) → ArrowLeft revient à l'image 3 → swipe vers la gauche avance → Échap ferme.

### Implementation for User Story 2

- [x] T006 [US2] Ajouter `currentIndex` (useState), `direction` (useState), `goNext` et `goPrev` dans `components/shared/ImageGalleryModal.tsx` — afficher `images[currentIndex]` au lieu de `images[0]` — réinitialiser `currentIndex` à `0` à la fermeture
- [x] T007 [US2] Ajouter les boutons `ChevronLeft` / `ChevronRight` (Lucide) dans `components/shared/ImageGalleryModal.tsx` — masqués quand `images.length === 1`, avec `aria-label="Image précédente"` / `aria-label="Image suivante"`
- [x] T008 [US2] Ajouter les points indicateurs (1 par image) en bas de la modale dans `components/shared/ImageGalleryModal.tsx` — point actif visuellement distinct, chacun avec `role="button"`, `aria-label="Image N de M"`, `tabIndex={0}` et handler `onClick` pour naviguer directement à l'index
- [x] T009 [US2] Envelopper l'image dans `AnimatePresence mode="wait"` + `motion.div` avec `key={currentIndex}` et variantes de slide directionnel (`x: ±300` selon `direction`) dans `components/shared/ImageGalleryModal.tsx`
- [x] T010 [US2] Ajouter `useEffect` de navigation clavier dans `components/shared/ImageGalleryModal.tsx` : `window.addEventListener('keydown', handler)` actif quand `isOpen`, écoute `ArrowLeft` → `goPrev`, `ArrowRight` → `goNext`, `Escape` → `onClose`, avec cleanup
- [x] T011 [US2] Ajouter handlers Pointer Events swipe dans `components/shared/ImageGalleryModal.tsx` : `onPointerDown` mémorise `clientX`, `onPointerUp` calcule `deltaX` — si `|deltaX| ≥ 50px` : `deltaX < 0` → `goNext`, `deltaX > 0` → `goPrev`

**Checkpoint**: US2 testable indépendamment — navigation complète (boutons + clavier + swipe + animation + dots).

---

## Phase 5: User Story 3 — Portfolio Owner Adds Demo Images (Priority: P3)

**Goal**: Toutes les données de démo sont définies dans `data/projects.ts` — le propriétaire peut ajouter/retirer des images sans toucher aux composants UI.

**Independent Test**: Ajouter un second tableau `images` à un projet sans images existantes → la galerie apparaît sur ce projet sans aucune modification de composant.

### Implementation for User Story 3

- [x] T012 [P] [US3] Compléter `data/projects.ts` : ajouter des tableaux `images` pour tous les projets qui en ont (Monbolide, ZoomStudent, Ticket System) — utiliser des chemins réels vers `public/images/` ou des URLs vérifiées ; marquer `[À COMPLÉTER]` si les images ne sont pas encore disponibles
- [x] T013 [P] [US3] Vérifier la conformité TypeScript strict dans `types/index.ts` et `components/shared/ImageGalleryModal.tsx` : aucun `any` implicite ou explicite, tous les types de props explicites, `DemoImage[]` bien inféré depuis `data/projects.ts`

**Checkpoint**: US3 testable — ajouter/supprimer une entrée dans `images[]` se reflète immédiatement sans toucher aux composants.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Accessibilité, edge cases, performance, validation finale.

- [x] T014 [P] Vérifier le comportement edge case "1 seule image" dans `components/shared/ImageGalleryModal.tsx` : boutons ChevronLeft/ChevronRight masqués, points non affichés, pas d'erreur
- [x] T015 [P] Vérifier que `next/image` dans `ImageGalleryModal.tsx` n'a pas `priority={true}` (les images de galerie doivent être chargées à la demande, pas en priorité au chargement de page)
- [x] T016 Valider le rendu responsive dans `components/shared/ImageGalleryModal.tsx` : tester à 375px (mobile) — modale pleine largeur, boutons accessibles au doigt, aspect-video respecté
- [x] T017 Parcourir la checklist de validation de `specs/005-project-demo-images/quickstart.md` et cocher chaque point

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Aucune dépendance — peut démarrer immédiatement
- **Foundational (Phase 2)**: Dépend de Phase 1 — **BLOQUE toutes les user stories**
- **US1 (Phase 3)**: Dépend de Phase 2 (type `DemoImage`)
- **US2 (Phase 4)**: Dépend de Phase 3 (composant `ImageGalleryModal` existant à enrichir)
- **US3 (Phase 5)**: Dépend de Phase 2 (type) — peut démarrer en parallèle avec Phase 3 pour T012/T013
- **Polish (Phase 6)**: Dépend de Phase 4 (toutes les fonctionnalités présentes)

### User Story Dependencies

- **US1 (P1)**: Démarre après Phase 2 — aucune dépendance inter-story
- **US2 (P2)**: Démarre après Phase 3 (enrichit le composant créé en US1)
- **US3 (P3)**: Démarre après Phase 2 — T012 et T013 peuvent se faire en parallèle avec Phase 3

### Within Each User Story

- **US1**: T003 et T005 peuvent s'exécuter en parallèle [P] → T004 dépend de T003
- **US2**: T006 → T007, T008, T009, T010, T011 séquentiels dans le même fichier (dépendent de T006 pour `goNext`/`goPrev`/`currentIndex`)
- **US3**: T012 et T013 peuvent s'exécuter en parallèle [P]

---

## Parallel Example: User Story 1

```text
# Après T002 (Foundational), ces deux tâches peuvent démarrer en même temps :

[P] T003 — Créer ImageGalleryModal.tsx (composant de base)
[P] T005 — Ajouter images[] au projet QR Order System dans data/projects.ts

# Attendre T003 terminé, puis :
T004 — Mettre à jour ProjectCard.tsx (importe ImageGalleryModal)
```

## Parallel Example: User Story 3

```text
# Après T002 (Foundational), en parallèle avec Phase 3 :

[P] T012 — Compléter images[] dans data/projects.ts pour tous les projets
[P] T013 — Vérification TypeScript strict
```

---

## Implementation Strategy

### MVP First (User Story 1 seulement)

1. Compléter Phase 1 (Setup) + Phase 2 (Foundational)
2. Compléter Phase 3 (US1) : modal basique + bouton dans ProjectCard + 1 projet avec data
3. **STOP et VALIDE** : bouton visible, galerie s'ouvre, image affichée, projets sans images non impactés
4. Déployer/montrer si satisfaisant

### Incremental Delivery

1. Setup + Foundational → types prêts
2. US1 → galerie basique fonctionnelle → Demo MVP
3. US2 → navigation complète (flèches, keyboard, swipe, animation) → Demo enrichie
4. US3 → toutes les données complètes → Portfolio finalisé
5. Polish → validation finale

---

## Notes

- `[P]` = fichiers différents, pas de dépendances non complétées
- `[Story]` = traçabilité vers spec.md
- Chaque user story doit être testable indépendamment avant de passer à la suivante
- Ne pas utiliser `any` TypeScript — tous les types explicites
- Ne pas ajouter de `console.log` dans le code final
- Utiliser `next/image` uniquement — pas de `<img>` natif
- Commiter après chaque phase ou groupe logique de tâches
