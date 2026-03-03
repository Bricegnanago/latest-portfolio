# Research: Zoom sur les Images de Projet

**Feature**: `014-project-image-zoom`
**Date**: 2026-03-03

---

## Decision 1 — Mécanisme de zoom (click-to-toggle)

**Decision**: Toggle scale 1× ↔ 2.5× via `animate={{ scale }}` sur un `motion.div` wrappant l'image.

**Rationale**: Framer Motion 12 (déjà installé, v12.34.1) fournit `animate` avec transitions fluides. Un toggle simple (1 clic = zoom, 1 reclic = dézoom) est le pattern le plus accessible et le plus prévisible pour un portfolio. Scale 2.5× permet de voir les détails d'une capture sans que l'image disparaisse hors du cadre.

**Alternatives considered**:
- `whileTap={{ scale: 2 }}` — insuffisant, revient à 1× dès que le doigt/clic est relâché
- Ouvrir une modale supplémentaire pour le zoom — surcharge UX, contre le principe "pas de complexité inutile"
- `@use-gesture/react` pour un zoom progressif — dépendance supplémentaire non justifiée (constitution : stack imposée)

---

## Decision 2 — Pan (déplacement dans l'image agrandie)

**Decision**: Tracking manuel des PointerEvents (pointerId, clientX/Y) dans le composant. Les deltas de position sont accumulés dans des refs et appliqués via `animate={{ x: panX, y: panY }}` sur le même `motion.div`. Les contraintes max sont calculées depuis la taille du conteneur : `maxPan = (scale - 1) * containerSize / 2`.

**Rationale**: Le `drag` Framer Motion est puissant mais entre en conflit avec la détection de swipe existante (même PointerEvents sur le conteneur). Une implémentation manuelle avec un seul jeu de gestionnaires (`onPointerDown/Move/Up`) unifie swipe, pan et pinch sans collisions. Pattern identique au `useTilt.ts` déjà dans le projet.

**Alternatives considered**:
- `drag={zoomed}` Framer Motion — conflit PointerEvent avec le swipe, nécessite `stopPropagation` dans 3 endroits
- `useDragControls()` — trop verbeux pour un besoin simple

---

## Decision 3 — Pinch-to-zoom (mobile)

**Decision**: Native PointerEvent API avec `Map<pointerId, {x,y}>`. Quand 2 pointeurs sont actifs, le ratio `newDistance / initialDistance` détermine la valeur de scale (clampée entre 1 et 4). Aucune dépendance supplémentaire.

**Rationale**: `@use-gesture/react` n'est pas installé. Framer Motion 12 n'a pas de `pinch` natif. L'API PointerEvent standard (supportée > 95% des navigateurs) permet de tracker plusieurs doigts avec `e.pointerId`. L'implémentation tient en ~25 lignes.

**Alternatives considered**:
- `@use-gesture/react` — aurait simplifié le code mais ajoute une dépendance (interdit par constitution sans besoin justifié)
- CSS `touch-action: pinch-zoom` — ne permet pas de contrôler la valeur de scale programmatiquement ni de la lier à l'état React

---

## Decision 4 — Conflit swipe navigation vs pan/pinch (FR-008)

**Decision**: Un seul jeu de gestionnaires PointerEvent unifié avec machine à états implicite basée sur le nombre de pointeurs actifs et le booléen `zoomed` :

| Pointeurs | `zoomed` | Comportement |
|-----------|----------|--------------|
| 1 | false | Swipe navigation (comportement existant) |
| 1 | true | Pan de l'image |
| 2 | any | Pinch-to-zoom (scale + pan) |

Le delta de déplacement (`hasMoved = |dx| > 5 || |dy| > 5`) distingue un clic d'un drag.

**Rationale**: Évite tout `stopPropagation` ou capture phase complexe. La logique de routage est centralisée dans `handlePointerUp`.

---

## Decision 5 — Touche Échap (sans fermer la modale)

**Decision**: Écouter `keydown` en **capture phase** (`addEventListener('keydown', fn, true)`) avec `e.preventDefault()` + `e.stopPropagation()` quand `zoomed === true`. Cela intercepte l'Échap avant que le Dialog shadcn/ui ne le reçoive.

**Rationale**: shadcn/ui `Dialog` ferme la modale sur Échap (comportement Radix UI natif). L'interception en capture phase est le seul moyen fiable de prendre la main avant Radix sans modifier le code shadcn.

**Alternatives considered**:
- Prop `onEscapeKeyDown` de `DialogContent` — ferme la modale même si Échap est géré par notre code (pas de moyen de le bloquer proprement depuis l'extérieur)
- Ne pas gérer Échap pour le zoom — moins accessible, spec FR-003 l'exige

---

## Decision 6 — Aucun nouveau fichier créé

**Decision**: Toutes les modifications s'appliquent uniquement à `components/shared/ImageGalleryModal.tsx`. Pas de nouveau hook, pas de nouveau composant.

**Rationale**: La fonctionnalité est entièrement localisée dans la galerie modale. Créer un hook `useImageZoom` serait une abstraction prématurée pour un seul usage. Constitution : "Sur-ingénierer la solution est interdit."

---

## Contraintes techniques identifiées

- `touch-none` Tailwind déjà appliqué sur le conteneur → empêche le scroll natif du browser, nos handlers PointerEvent gèrent tout ✅
- `<Image fill className="object-contain">` → le scale CSS appliqué au `motion.div` parent agrandit l'image naturellement ✅
- `AnimatePresence mode="wait"` sur les slides → réinitialiser pan + scale sur `key` change (navigation) ✅
- TypeScript strict : aucun `any`, les pointeurs sont typés `Map<number, {x: number; y: number}>` ✅
