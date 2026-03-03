# Tasks: Zoom sur les Images de Projet

**Input**: Design documents from `/specs/014-project-image-zoom/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, quickstart.md ✅

**Organization**: 0 nouvelle dépendance + 1 fichier modifié (`ImageGalleryModal.tsx`). 9 tâches.

---

## Phase 1: Setup

**Purpose**: Vérifier les prérequis avant implémentation.

- [x] T001 Vérifier que `components/shared/ImageGalleryModal.tsx` compile sans erreur en état actuel — `npx tsc --noEmit` avant tout changement

**Checkpoint**: 0 erreur TypeScript sur l'état existant du projet.

---

## Phase 2: Foundational (État, refs et helpers partagés)

**Purpose**: Ajouter les fondations de l'état zoom dans `ImageGalleryModal.tsx` — bloquant pour toutes les user stories.

**⚠️ CRITIQUE** : T001 doit être terminé avant T002. T002 doit être terminé avant T003.

- [x] T002 Dans `components/shared/ImageGalleryModal.tsx` : (a) ajouter l'import `useReducedMotion` depuis `"framer-motion"` ; (b) ajouter la constante `const ZOOM_SCALE = 2.5` avant le composant ; (c) ajouter les états `const [zoomed, setZoomed] = useState(false)`, `const [scale, setScale] = useState(1)`, `const [panX, setPanX] = useState(0)`, `const [panY, setPanY] = useState(0)` ; (d) ajouter le hook `const reducedMotion = useReducedMotion()` ; (e) ajouter les refs `containerRef` (`useRef<HTMLDivElement>(null)`), `startYRef` (`useRef(0)`), `startPanXRef` (`useRef(0)`), `startPanYRef` (`useRef(0)`), `hasDraggedRef` (`useRef(false)`), `pointersRef` (`useRef<Map<number, { x: number; y: number }>>(new Map())`), `initialPinchDistRef` (`useRef(0)`), `initialPinchScaleRef` (`useRef(1)`), `initialPinchPanRef` (`useRef({ x: 0, y: 0 })`).

- [x] T003 Dans `components/shared/ImageGalleryModal.tsx` : (a) ajouter la fonction helper `function getDistance(p1: { x: number; y: number }, p2: { x: number; y: number }) { return Math.hypot(p1.x - p2.x, p1.y - p2.y) }` ; (b) ajouter `function clampPan(px: number, py: number, sc: number): { x: number; y: number } { const el = containerRef.current; if (!el) return { x: px, y: py }; const maxX = (el.clientWidth * (sc - 1)) / 2; const maxY = (el.clientHeight * (sc - 1)) / 2; return { x: Math.max(-maxX, Math.min(maxX, px)), y: Math.max(-maxY, Math.min(maxY, py)) } }` ; (c) ajouter `function resetZoom() { setZoomed(false); setScale(1); setPanX(0); setPanY(0) }` ; (d) dans `goPrev`, `goNext` et `goTo`, appeler `resetZoom()` comme première instruction ; (e) dans le `useEffect` qui écoute `isOpen`, ajouter `resetZoom()` dans le bloc `if (!isOpen)`.

**Checkpoint**: Le fichier compile sans erreur. Le composant se comporte identiquement à avant (le zoom ne fait rien encore).

---

## Phase 3: User Story 1 — Zoom au clic (P1) 🎯 MVP

**Goal**: Cliquer sur une image dans la galerie modale l'agrandit à 2.5×. Un second clic revient à la taille normale.

**Independent Test**: Ouvrir la galerie → cliquer sur une image → agrandissement à ~2.5× → cliquer à nouveau → retour à la taille normale. Testable seul, sans US2 ni US3.

- [x] T004 [US1] Dans `components/shared/ImageGalleryModal.tsx` : remplacer les fonctions `handlePointerDown` et `handlePointerUp` existantes par les quatre nouveaux handlers unifiés suivants (garder le `startXRef` existant pour la compatibilité). `handlePointerDown` : enregistre le pointeur dans `pointersRef`, si 1 pointeur → sauvegarde `startXRef.current`, `startYRef.current`, `startPanXRef.current`, `startPanYRef.current`, `hasDraggedRef.current = false` ; si 2 pointeurs → calcule distance initiale via `getDistance`, sauvegarde `initialPinchDistRef.current`, `initialPinchScaleRef.current = scale`, `initialPinchPanRef.current = { x: panX, y: panY }`. `handlePointerMove` : met à jour le pointeur dans `pointersRef` (implémentation vide pour l'instant, les détails sont ajoutés en T005 et T006). `handlePointerUp` : calcule `dx = e.clientX - startXRef.current`, `dy = e.clientY - startYRef.current`, `wasPinch = pointersRef.current.size >= 2`, supprime le pointeur de `pointersRef` ; si `wasPinch` → return ; `hasMoved = Math.abs(dx) > 5 || Math.abs(dy) > 5` ; si `!hasMoved && !hasDraggedRef.current` → toggle zoom (si zoomed → `resetZoom()`, sinon → `setZoomed(true); setScale(ZOOM_SCALE)`) → return ; si `!zoomed && Math.abs(dx) >= 50` → navigation swipe existante. `handlePointerLeave` : supprime le pointeur de `pointersRef`.

- [x] T005 [US1] Dans `components/shared/ImageGalleryModal.tsx` : (a) sur le `<div>` conteneur de l'image (`className="relative aspect-video w-full overflow-hidden bg-black touch-none"`), ajouter `ref={containerRef}`, remplacer `onPointerDown={handlePointerDown}` par les quatre handlers : `onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerLeave={handlePointerLeave}`, et ajouter la classe dynamique `cursor-zoom-in` / `cursor-zoom-out` : `className={\`relative aspect-video w-full overflow-hidden bg-black touch-none \${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}\`}` ; (b) dans le JSX, ajouter un `<motion.div className="absolute inset-0" animate={{ scale, x: panX, y: panY }} transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}>` entre le `<motion.div key={currentIndex} ...>` existant et le `<Image>`, et fermer cette balise après `</Image>` ; (c) ajouter `draggable={false}` sur le composant `<Image>`.

- [x] T006 [US1] Dans `components/shared/ImageGalleryModal.tsx` : remplacer le `useEffect` du keyboard listener existant par la version avec capture phase. L'écouteur doit être ajouté avec `window.addEventListener("keydown", handleKeyDown, true)` (troisième argument `true` = capture phase). Dans la fonction `handleKeyDown`, ajouter en premier : `if (e.key === "Escape" && zoomed) { e.preventDefault(); e.stopPropagation(); resetZoom(); return }`. Ajouter `zoomed` et `resetZoom` dans le tableau de dépendances du `useEffect`. Ajouter aussi `e.stopPropagation()` dans le `onClick` des deux boutons de navigation (`<Button aria-label="Image précédente">` et `<Button aria-label="Image suivante">`) via : `onClick={(e) => { e.stopPropagation(); goPrev() }}` et `onClick={(e) => { e.stopPropagation(); goNext() }}`.

**Checkpoint**: US1 complète — clic → zoom à 2.5×, reclic → dézoom, curseur change, Échap dézoome sans fermer, navigation réinitialise le zoom.

---

## Phase 4: User Story 2 — Pan (déplacement) dans l'image agrandie (P2)

**Goal**: Lorsque l'image est zoomée, faire glisser la souris/le doigt déplace l'image pour explorer les zones hors cadre.

**Independent Test**: Zoomer une image → faire glisser → les bords masqués deviennent visibles. Sortir du conteneur → l'image ne dépasse pas les limites.

- [x] T007 [US2] Dans `components/shared/ImageGalleryModal.tsx`, compléter la logique `handlePointerMove` pour le cas 1 pointeur + zoomed : `if (pointersRef.current.size === 1 && zoomed) { const dx = e.clientX - startXRef.current; const dy = e.clientY - startYRef.current; if (Math.abs(dx) > 4 || Math.abs(dy) > 4) hasDraggedRef.current = true; const clamped = clampPan(startPanXRef.current + dx, startPanYRef.current + dy, scale); setPanX(clamped.x); setPanY(clamped.y) }` (ajouter AVANT la logique pinch qui sera ajoutée en T008).

**Checkpoint**: Image zoomée → drag → déplacement fluide limité aux bords du conteneur. Image non zoomée → swipe horizontal → navigation inchangée.

---

## Phase 5: User Story 3 — Pinch-to-zoom mobile (P3)

**Goal**: Sur mobile, le geste de pincement à deux doigts zoome et dézoome l'image proportionnellement.

**Independent Test**: Ouvrir sur mobile → pincer → scale change proportionnellement au pincement (min 1×, max 4×). Tester aussi que le swipe navigation reste fonctionnel quand non zoomé.

- [x] T008 [US3] Dans `components/shared/ImageGalleryModal.tsx`, compléter la logique `handlePointerMove` pour le cas 2 pointeurs (ajouter AVANT le bloc pan de T007) : `if (pointersRef.current.size === 2) { const pts = Array.from(pointersRef.current.values()); const dist = getDistance(pts[0], pts[1]); const newScale = Math.max(1, Math.min(4, initialPinchScaleRef.current * (dist / initialPinchDistRef.current))); setScale(newScale); setZoomed(newScale > 1); const clamped = clampPan(initialPinchPanRef.current.x, initialPinchPanRef.current.y, newScale); setPanX(clamped.x); setPanY(clamped.y); return }`.

**Checkpoint**: Sur mobile (ou DevTools touch simulation) : pinch out → scale augmente → image s'agrandit. Pinch in → scale diminue → retour à 1× minimum. Swipe 1 doigt sans zoom → navigation inchangée.

---

## Phase 6: Polish

- [x] T009 Vérifier TypeScript strict — `npx tsc --noEmit` sans erreur dans `components/shared/ImageGalleryModal.tsx`
- [x] T010 Valider les 16 smoke tests de `specs/014-project-image-zoom/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)** : Aucune dépendance — commencer immédiatement
- **Foundational (Phase 2)** : Dépend de T001 (vérification état initial)
- **US1 (Phase 3)** : Dépend de T002 + T003 (état + helpers créés)
- **US2 (Phase 4)** : Dépend de T004 + T005 + T006 (US1 complète — `handlePointerMove` doit exister)
- **US3 (Phase 5)** : Dépend de T004 (handlers unifiés créés — pinch s'ajoute dans `handlePointerMove`)
- **Polish (Phase 6)** : Dépend de toutes les phases précédentes

### Ordre strict des tâches

```
T001 → T002 → T003 → T004 → T005 → T006 → T007 → T008 → T009
                                                           → T010
```

Toutes les tâches modifient le même fichier → exécution strictement séquentielle.
T009 et T010 sont indépendants entre eux :

```
T008 → T009 [P]
     → T010 [P]
```

---

## Parallel Example

```bash
# T009 et T010 peuvent s'exécuter en parallèle une fois T008 terminé :
Task: "npx tsc --noEmit"
Task: "Valider smoke tests quickstart.md"
```

---

## Implementation Strategy

### MVP First (User Story 1 uniquement)

1. Terminer **Phase 1** : T001 (vérification)
2. Terminer **Phase 2** : T002 + T003 (état + helpers)
3. Terminer **Phase 3** : T004 + T005 + T006 (zoom clic + wrapper image + clavier)
4. **VALIDER** : cliquer sur image → zoom 2.5×, reclic → dézoom, Échap dézoome, navigation réinitialise
5. Continuer avec US2 (pan) et US3 (pinch) si MVP validé

### Incremental Delivery

1. T001 → état initial vérifié
2. T002 + T003 → fondations prêtes
3. T004 + T005 + T006 → US1 ✅ (zoom toggle au clic, MVP livrable)
4. T007 → US2 ✅ (pan dans l'image agrandie)
5. T008 → US3 ✅ (pinch-to-zoom mobile)
6. T009 + T010 → qualité validée, prêt pour merge
