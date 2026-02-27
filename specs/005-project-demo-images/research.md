# Research: Project Demo Images Gallery

**Branch**: `005-project-demo-images` | **Date**: 2026-02-26

## Résumé des questions résolues

Toutes les questions techniques ont été résolues par analyse directe du code existant — aucun `[NEEDS CLARIFICATION]` ne subsiste.

---

## Décision 1 — Pattern de galerie modale

**Question**: Quel pattern utiliser pour la galerie ? (Dialog custom, librairie tiers, page dédiée ?)

**Decision**: Réutiliser le pattern `VideoModal` existant — `Dialog` de shadcn/ui + état contrôlé `isOpen`/`onClose`.

**Rationale**: `VideoModal` est déjà fonctionnel, accessible (sr-only title, Dialog Radix), et suit les conventions du projet. Créer `ImageGalleryModal` avec la même interface Props minimise la surface de changement dans `ProjectCard`.

**Alternatives considérées**:
- Librairie Lightbox (react-image-lightbox, yet-another-react-lightbox) → rejetée : ajout de dépendances, contraire à la constitution « ne pas sur-ingénierer »
- Page dédiée par projet → rejetée : rupture UX, non nécessaire pour un portfolio simple

---

## Décision 2 — Affichage des images dans la modale

**Question**: `next/image` avec quelles dimensions ? `fill` ou dimensions explicites ?

**Decision**: `next/image` avec `fill` dans un conteneur `relative` à ratio fixe (`aspect-video` ou `aspect-[4/3]`).

**Rationale**: Pattern déjà établi dans `AboutSection.tsx` (`fill` + `object-cover` + conteneur avec dimensions). `aspect-video` (16:9) est le bon ratio pour des captures d'écran d'applications web. Le conteneur a une hauteur max (`max-h-[70vh]`) pour ne pas déborder sur mobile.

**Alternatives considérées**:
- Dimensions explicites (width/height) → rejetées : impossible à connaître à l'avance pour des images hétérogènes
- `<img>` natif → rejetée : interdit par la constitution (principe II)

---

## Décision 3 — Transitions entre images

**Question**: Quelle animation pour la navigation entre images ?

**Decision**: `AnimatePresence` de Framer Motion 12.x + `motion.div` avec `key={currentIndex}`. Direction de slide basée sur la direction de navigation (gauche/droite).

**Rationale**: Framer Motion 12.x est déjà dans le projet. `AnimatePresence` est l'outil idiomatique pour animer les composants qui se montent/démontent. La direction du slide est fournie via un `custom` prop ou une variable de direction.

**Alternatives considérées**:
- Transition CSS pure (opacity fade) → moins immersive, pas de direction de slide
- Aucune animation → contraire à l'esprit du projet (Framer Motion imposé par constitution)

**Implémentation concrète**:
```tsx
// direction: -1 = précédent, +1 = suivant
const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
}
```

---

## Décision 4 — Navigation clavier

**Question**: Comment implémenter la navigation clavier (ArrowLeft, ArrowRight, Escape) ?

**Decision**: `useEffect` avec `window.addEventListener('keydown', handler)` + cleanup, activé uniquement quand `isOpen === true`.

**Rationale**: Pattern établi dans `useMouseParallax.ts`. Escape est déjà géré par le Dialog Radix via `onOpenChange`, mais ArrowLeft/ArrowRight nécessitent un listener. Le listener n'est actif que quand la modale est ouverte pour éviter les conflits.

**Alternatives considérées**:
- `onKeyDown` sur un div focusable → requiert de gérer le focus manuellement, plus complexe
- Hook dédié `useGalleryKeyboard` → sur-ingénierie pour un seul usage dans ce composant

---

## Décision 5 — Swipe mobile (sans nouvelle librairie)

**Question**: Comment implémenter le swipe tactile sans ajouter `react-swipeable` ou équivalent ?

**Decision**: Pointer Events natifs (`onPointerDown`/`onPointerUp`) sur le conteneur d'image. Si `deltaX > 50px`, naviguer dans la direction correspondante.

**Rationale**: Les Pointer Events unifient touch, souris et stylet. Seuil de 50px évite les faux positifs. Aucune nouvelle dépendance — conforme à la constitution.

**Implémentation concrète**:
```tsx
const startXRef = useRef(0)

function handlePointerDown(e: React.PointerEvent) {
  startXRef.current = e.clientX
}

function handlePointerUp(e: React.PointerEvent) {
  const delta = e.clientX - startXRef.current
  if (Math.abs(delta) < 50) return
  delta < 0 ? goNext() : goPrev()
}
```

**Alternatives considérées**:
- Touch Events (`onTouchStart`/`onTouchEnd`) → moins universel que Pointer Events, pas de support stylet
- `react-swipeable` → nouvelle dépendance inutile pour ce cas simple

---

## Décision 6 — Bouton déclencheur dans ProjectCard

**Question**: Comment intégrer le déclencheur dans `ProjectCard` sans casser le layout existant ?

**Decision**: Ajouter un bouton "Voir les captures" (`Images` icon Lucide) dans la zone des boutons (`flex gap-2 pt-2`), en priorité sur le bouton "Voir la démo" vidéo si les deux coexistent.

**Rationale**: La zone de boutons dans `ProjectCard` accepte déjà plusieurs boutons côte à côte. L'icône `Images` de Lucide est explicite. Priorité : images > vidéo > lien démo > placeholder.

**Alternatives considérées**:
- Miniature d'image cliquable directement dans la carte → plus riche visuellement mais modifie davantage le layout actuel
- Onglets dans la carte → sur-ingénierie

---

## Décision 7 — Structure du type `DemoImage`

**Question**: Le type `DemoImage` doit-il inclure une description/caption ?

**Decision**: `DemoImage = { src: string; alt?: string }` — pas de caption pour l'instant.

**Rationale**: Le texte alternatif (`alt`) est suffisant pour l'accessibilité. Une caption visible n'est pas demandée dans la spec. Garder simple.

**Alternatives considérées**:
- `{ src, alt, caption }` → prévu dans la spec comme optionnel mais non demandé explicitement ; éviter l'over-engineering
