# Tasks: Élément 3D Décoratif dans le Hero

**Input**: Design documents from `/specs/012-hero-3d/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, quickstart.md ✅

**Organization**: Nouvelle dépendance + 1 nouveau composant + 1 modification légère. 9 tâches.

---

## Phase 1: Setup

**Purpose**: Installer les packages nécessaires avant toute implémentation.

- [x] T001 Installer `@react-three/fiber`, `three`, et `@types/three` via `npm install @react-three/fiber three && npm install -D @types/three` à la racine du projet

**Checkpoint**: `package.json` contient `@react-three/fiber`, `three` en dependencies et `@types/three` en devDependencies, `node_modules/@react-three/` existe.

---

## Phase 2: Foundational (Prerequisite Component Shell)

**Purpose**: Créer la structure du composant `Hero3DObject` — imports, état, guards — bloquant avant les user stories.

**⚠️ CRITIQUE** : T001 doit être terminé avant T002.

- [x] T002 Créer `components/shared/Hero3DObject.tsx` avec `"use client"`, imports complets (`useRef, useEffect, useState` depuis `react`; `Canvas, useFrame` depuis `@react-three/fiber`; `useTheme` depuis `next-themes`; `useReducedMotion` depuis `framer-motion`; `type { Group, Mesh }` depuis `three`), `const [canRender, setCanRender] = useState(false)`, `const reducedMotion = useReducedMotion()`, `const { resolvedTheme } = useTheme()`, `useEffect(() => {}, [])` vide (placeholder), et `if (!canRender || reducedMotion) return null` — sans Canvas ni scène pour l'instant

**Checkpoint**: Le fichier compile sans erreur TypeScript. Le composant retourne `null` (canRender = false par défaut).

---

## Phase 3: User Story 1 — Objet 3D animé visible dans le Hero (P1) 🎯 MVP

**Goal**: Un icosaèdre 3D tourne lentement dans le coin supérieur droit du Hero, en couleurs thème-adaptatives, derrière le contenu.

**Independent Test**: Ouvrir le portfolio sur desktop (avec `setCanRender(true)` temporaire pour test) → icosaèdre visible dans le coin droit du Hero → rotation continue → texte et boutons lisibles par-dessus.

- [x] T003 [US1] Ajouter dans `components/shared/Hero3DObject.tsx` la fonction `IcosahedronScene({ color }: { color: string })` : `const meshRef = useRef<Mesh>(null)`, `useFrame((_, delta) => { if (!meshRef.current) return; meshRef.current.rotation.x += delta * 0.3; meshRef.current.rotation.y += delta * 0.5 })`, et retourner `<group><mesh ref={meshRef}><icosahedronGeometry args={[1.5, 1]} /><meshStandardMaterial color={color} opacity={0.35} transparent roughness={0.4} metalness={0.6} /></mesh></group>`

- [x] T004 [US1] Compléter la fonction `Hero3DObject` exportée dans `components/shared/Hero3DObject.tsx` : calculer `const color = resolvedTheme === "dark" ? "#8875e8" : "#6655cc"` et retourner `<div aria-hidden className="pointer-events-none absolute right-0 top-0 -z-10 h-[500px] w-[500px]"><Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 45 }} gl={{ antialias: false, alpha: true }}><ambientLight intensity={0.6} /><pointLight position={[5, 5, 5]} intensity={1.2} /><IcosahedronScene color={color} /></Canvas></div>`

- [x] T005 [US1] Modifier `components/sections/HeroSection.tsx` : ajouter `const Hero3DObject = dynamic(() => import("@/components/shared/Hero3DObject").then((m) => ({ default: m.Hero3DObject })), { ssr: false })` après l'import `ParticlesBackground` existant, et rendre `<Hero3DObject />` à l'intérieur de la `<section>` juste après `<ParticlesBackground />`

**Checkpoint**: US1 complète et testable — icosaèdre visible dans le coin droit du Hero, rotation lente, couleur adaptée au thème actif.

---

## Phase 4: User Story 2 — Tilt souris (P2)

**Goal**: L'icosaèdre s'oriente légèrement vers le curseur (max 20°) pendant que la rotation continue.

**Independent Test**: Déplacer lentement la souris dans le Hero → icosaèdre s'incline doucement vers le curseur → sortir la souris → l'inclinaison revient progressivement à zéro.

- [x] T006 [US2] Dans `IcosahedronScene` de `components/shared/Hero3DObject.tsx` : ajouter `const groupRef = useRef<Group>(null)`, envelopper le `<mesh>` dans `<group ref={groupRef}>`, et dans `useFrame` ajouter après la rotation du mesh les deux lignes de lerp souris : `groupRef.current.rotation.x += (state.pointer.y * 0.35 - groupRef.current.rotation.x) * 0.05` et `groupRef.current.rotation.y += (state.pointer.x * 0.35 - groupRef.current.rotation.y) * 0.05` (changer la signature de `useFrame` en `(state, delta)`)

**Checkpoint**: Hover sur le Hero → icosaèdre s'incline vers le curseur (max ~20°). Sortie de souris → retour progressif à la rotation de base.

---

## Phase 5: User Story 3 — Accessibilité et performance (P3)

**Goal**: L'icosaèdre ne se charge pas sur mobile, avec prefers-reduced-motion actif, ou si WebGL est indisponible.

**Independent Test**: Ouvrir sur mobile → aucun icosaèdre. Activer prefers-reduced-motion → aucun icosaèdre. Désactiver WebGL → aucun icosaèdre, aucune erreur console.

- [x] T007 [US3] Dans `components/shared/Hero3DObject.tsx`, compléter le `useEffect` (actuellement vide) avec : `const hasWebGL = (() => { try { const c = document.createElement("canvas"); return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl"))) } catch { return false } })()` et `const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches` et `setCanRender(hasWebGL && isDesktop)`

**Checkpoint**: Sur mobile et avec prefers-reduced-motion, `Hero3DObject` retourne `null` sans erreur. En l'absence de WebGL, idem.

---

## Phase 6: Polish

- [x] T008 Vérifier TypeScript strict — `npx tsc --noEmit` sans erreur
- [x] T009 Valider les 14 smoke tests de `specs/012-hero-3d/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)** : Aucune dépendance — commencer immédiatement
- **Foundational (Phase 2)** : Dépend de T001 (packages installés)
- **US1 (Phase 3)** : Dépend de T002 (composant shell créé)
- **US2 (Phase 4)** : Dépend de T003 + T004 + T005 (US1 complète — tilt s'ajoute à la rotation existante)
- **US3 (Phase 5)** : Dépend de T002 (peut s'appliquer dès que le shell existe)
- **Polish (Phase 6)** : Dépend de toutes les phases précédentes

### Ordre strict des tâches

```
T001 → T002 → T003 → T004 → T005 → T006 → T007 → T008
                                                  → T009
```

T003, T004, T005 modifient des fichiers séquentiellement (T003 ajoute IcosahedronScene, T004 complète Hero3DObject, T005 intègre dans HeroSection).

T008 et T009 sont indépendants entre eux :

```
T007 → T008 [P]
     → T009 [P]
```

---

## Parallel Example

```bash
# T001 peut démarrer immédiatement
# T002 attend T001

# Une fois T007 terminé, T008 et T009 peuvent s'exécuter en parallèle :
Task: "npx tsc --noEmit"
Task: "Valider smoke tests quickstart.md"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Terminer **Phase 1** : T001 (npm install)
2. Terminer **Phase 2** : T002 (shell composant)
3. Terminer **Phase 3** : T003 + T004 + T005 (icosaèdre visible + intégration Hero)
4. **VALIDER** : icosaèdre dans le Hero, couleur thème, lisibilité du contenu
5. Continuer avec US2 (tilt souris) et US3 (accessibilité) si MVP validé

### Incremental Delivery

1. T001 → packages disponibles
2. T002 → shell prêt
3. T003 + T004 + T005 → Hero avec icosaèdre (MVP ✅)
4. T006 → tilt souris ajouté
5. T007 → mobile + WebGL + reduced-motion protégés
6. T008 + T009 → qualité validée, prêt pour merge
