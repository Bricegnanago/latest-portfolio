# Research: Animations réactives à la souris

**Feature**: 004-mouse-driven-animations
**Date**: 2026-02-25

## R1 — Approche performante pour le tracking souris avec Framer Motion

**Decision**: Utiliser `useMotionValue` + `useTransform` + `useSpring` de Framer Motion pour toutes les animations réactives à la souris.

**Rationale**:
- `useMotionValue` ne déclenche pas de re-render React — les mises à jour passent directement par le DOM, ce qui est essentiel pour des animations 60fps à chaque `mousemove`.
- `useTransform` permet de mapper une valeur source (position souris) vers une valeur de sortie (angle de rotation) de manière déclarative et performante.
- `useSpring` ajoute un lissage physique naturel aux transitions, évitant les mouvements mécaniques et assurant un retour doux à l'état initial.
- Framer Motion est déjà imposé par la constitution — pas de dépendance supplémentaire.

**Alternatives considérées**:
- **react-tilt / vanilla-tilt.js**: Lib dédiée au tilt effect. Rejeté car ajout d'une dépendance externe non autorisée par la constitution, et Framer Motion couvre déjà le besoin.
- **CSS :hover + transforms**: Simple mais ne permet pas le tracking directionnel de la souris (seulement hover on/off). Insuffisant pour l'effet tilt.
- **requestAnimationFrame manuel**: Plus de contrôle mais réinvente ce que Framer Motion fait déjà. Inutilement complexe.

---

## R2 — Effet de reflet lumineux (glare) sur les cartes

**Decision**: Overlay `<div>` positionné en absolu avec un `radial-gradient` dynamique dont le centre suit la position de la souris, piloté par `useMotionValue`.

**Rationale**:
- Un gradient radial CSS est nativement performant (rendu GPU).
- La position du centre du gradient est mise à jour via `style` Framer Motion sans re-render.
- L'opacité du gradient est contrôlée par un `useSpring` pour un fondu naturel à l'entrée/sortie.
- L'overlay est `pointer-events-none` pour ne pas interférer avec les clics sur la carte.

**Alternatives considérées**:
- **Canvas 2D / WebGL**: Trop lourd et complexe pour un simple reflet lumineux. Réservé aux effets visuels avancés.
- **CSS `mix-blend-mode`**: Peut créer des effets de lumière mais n'offre pas le contrôle dynamique nécessaire pour suivre la souris.
- **Pseudo-élément `::after`**: Ne peut pas être animé dynamiquement avec Framer Motion (pas d'accès au style).

---

## R3 — Détection appareils tactiles vs souris

**Decision**: Utiliser `matchMedia('(hover: hover) and (pointer: fine)')` pour détecter la présence d'un dispositif de pointage précis (souris). Les effets tilt/parallaxe sont activés uniquement si cette condition est vraie.

**Rationale**:
- La media query `(hover: hover)` est supportée par tous les navigateurs modernes ciblés (Chrome 38+, Firefox 64+, Safari 9+).
- `(pointer: fine)` affine la détection en excluant les appareils à pointeur grossier (tactile).
- Plus fiable que la détection `'ontouchstart' in window` qui retourne `true` sur les laptops tactiles avec souris.
- Vérification faite une seule fois à l'initialisation du hook, pas à chaque événement.

**Alternatives considérées**:
- **`'ontouchstart' in window`**: Faux positifs sur les laptops hybrides avec écran tactile et souris. Rejeté.
- **User-Agent parsing**: Fragile, non fiable, non recommandé. Rejeté.
- **Écouter `touchstart` et basculer dynamiquement**: Plus complexe, détecte le premier touch mais ne détecte pas le retour à la souris. Rejeté pour simplicité.

---

## R4 — Parallaxe souris dans la section héro

**Decision**: Écouter `mousemove` sur `window` une seule fois via un hook dédié `useMouseParallax`. Chaque élément héro reçoit un facteur `strength` différent pour créer l'effet multicouche.

**Rationale**:
- Un seul listener `mousemove` sur `window` est plus performant que des listeners individuels.
- La position souris est normalisée entre -0.5 et 0.5 (centre = 0), puis multipliée par le facteur de chaque couche.
- L'effet est inversé (souris va à droite → éléments vont à gauche) car c'est la convention la plus naturelle pour un effet parallaxe.
- `useSpring` avec un `damping` élevé crée un mouvement fluide et non mécanique.

**Facteurs par couche**:
| Élément | Strength (px) | Justification |
|---------|---------------|---------------|
| Titre principal | 15 | Élément le plus lourd visuellement, déplacement modéré |
| Sous-titre / rôle | 10 | Couche intermédiaire |
| Paragraphe bio | 7 | Arrière-plan textuel |
| Boutons CTA | 5 | Éléments interactifs, déplacement minimal pour ne pas nuire au clic |

**Alternatives considérées**:
- **Effet basé sur le scroll** (parallaxe de défilement): Différent de la demande — l'utilisateur veut spécifiquement un effet réactif au mouvement de la souris.
- **Gyroscope sur mobile**: Constitution dit "subtil et performant" + spec dit "pas d'effet gyroscope". Rejeté.

---

## R5 — Enrichissement des animations de défilement

**Decision**: Enrichir les variants Framer Motion existants directement dans chaque composant, sans créer de système centralisé.

**Rationale**:
- Les animations de défilement actuelles sont déjà implémentées avec le pattern `initial`/`whileInView`/`viewport={{ once: true }}` de Framer Motion.
- Chaque section a ses propres caractéristiques visuelles — des variants personnalisés par section sont plus expressifs qu'un système générique.
- La constitution interdit la sur-ingénierie. Un fichier `animationVariants.ts` centralisé serait du sur-engineering pour 5-6 variants.
- Les modifications sont additives : on enrichit `y: 30 → y: 30, scale: 0.95` plutôt que de réécrire.

**Changements prévus**:
| Composant | Avant | Après |
|-----------|-------|-------|
| `AboutSection` | `{ opacity: 0, y: 30 }` | `{ opacity: 0, y: 30, scale: 0.97 }` |
| `SkillsSection` items | `{ opacity: 0, y: 20 }` | `{ opacity: 0, y: 20, scale: 0.95 }` |
| `ProjectCard` | `{ opacity: 0, y: 30 }` | `{ opacity: 0, y: 30, scale: 0.97 }` |
| `ExperienceCard` | `{ opacity: 0, x: ±30 }` | `{ opacity: 0, x: ±30, scale: 0.98 }` |
| `SectionTitle` | `{ opacity: 0, y: 20 }` | `{ opacity: 0, y: 20 }` (inchangé — déjà épuré) |

**Alternatives considérées**:
- **Intersection Observer custom**: Réinventerait ce que Framer Motion fait nativement avec `whileInView`. Rejeté.
- **Fichier centralisé `motion-variants.ts`**: Sur-ingénierie pour le nombre limité de variantes. Rejeté.

---

## R6 — Respect de `prefers-reduced-motion`

**Decision**: Utiliser `useReducedMotion()` natif de Framer Motion. Si `true`, tous les hooks souris retournent des valeurs neutres (pas d'effet).

**Rationale**:
- Framer Motion fournit nativement `useReducedMotion()` qui écoute la media query `prefers-reduced-motion: reduce`.
- Ce hook est déjà intégré dans l'écosystème — pas besoin de recréer.
- Quand `reducedMotion = true` :
  - `useTilt` retourne `{ rotateX: 0, rotateY: 0, scale: 1 }` statiques
  - `useMouseParallax` retourne `{ x: 0, y: 0 }` statiques
  - Les scroll animations utilisent un simple `opacity: 0 → 1` sans transform

**Alternatives considérées**:
- **CSS-only `@media (prefers-reduced-motion: reduce)`**: Fonctionne pour les CSS transitions mais pas pour les animations JS Framer Motion. Insuffisant seul.
- **Hook custom**: Inutile puisque Framer Motion le fournit nativement.
