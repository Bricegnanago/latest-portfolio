# Tasks: Laptop 3D Tournant dans le Hero

**Input**: Design documents from `/specs/013-hero-3d-laptop/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, quickstart.md ✅

**Organization**: 0 nouvelle dépendance + 1 nouveau composant + 1 modification légère. 9 tâches.

---

## Phase 1: Setup

**Purpose**: Vérifier les prérequis avant implémentation.

- [x] T001 Vérifier que `@react-three/fiber` et `three` sont installés depuis feature 012 — `node -e "require('@react-three/fiber'); require('three'); console.log('OK')"` à la racine du projet

**Checkpoint**: La commande retourne `OK` sans erreur.

---

## Phase 2: Foundational (Prerequisite Component Shell)

**Purpose**: Créer la structure du composant `Hero3DLaptop` avec imports, état et guards — bloquant avant les user stories.

**⚠️ CRITIQUE** : T001 doit être terminé avant T002.

- [x] T002 Créer `components/shared/Hero3DLaptop.tsx` avec `"use client"`, imports complets (`useRef, useEffect, useState` depuis `react`; `Canvas, useFrame` depuis `@react-three/fiber`; `useTheme` depuis `next-themes`; `useReducedMotion` depuis `framer-motion`; `type { Group }` depuis `three`), `const [canRender, setCanRender] = useState(false)`, `const reducedMotion = useReducedMotion()`, `const { resolvedTheme } = useTheme()`, `useEffect(() => {}, [])` vide (placeholder), et `if (!canRender || reducedMotion) return null` — sans Canvas ni scène pour l'instant

**Checkpoint**: Le fichier compile sans erreur TypeScript. Le composant retourne `null` (canRender = false par défaut).

---

## Phase 3: User Story 1 — Laptop 3D visible et animé dans le Hero (P1) 🎯 MVP

**Goal**: Un laptop 3D procédural (BoxGeometry) tourne lentement sur l'axe Y dans le coin supérieur droit du Hero, en couleurs thème-adaptatives, derrière le contenu.

**Independent Test**: Ouvrir le portfolio sur desktop (avec `setCanRender(true)` temporaire pour test) → laptop visible dans le coin droit → base + écran incliné reconnaissables → rotation continue → texte et boutons lisibles par-dessus.

- [x] T003 [US1] Ajouter dans `components/shared/Hero3DLaptop.tsx` la fonction `LaptopScene({ color }: { color: string })` : `const innerRef = useRef<Group>(null)`, `useFrame((_, delta) => { if (!innerRef.current) return; innerRef.current.rotation.y += delta * 0.4 })`, et retourner le JSX suivant : `<group><group ref={innerRef} rotation={[-0.2, 0.3, 0.1]}><mesh position={[0,0,0]}><boxGeometry args={[2.4,0.1,1.6]} /><meshStandardMaterial color={color} opacity={0.45} transparent roughness={0.3} metalness={0.7} /></mesh><group position={[0,0.05,-0.8]}><group rotation={[1.1,0,0]}><mesh position={[0,0.72,0]}><boxGeometry args={[2.3,1.4,0.08]} /><meshStandardMaterial color={color} opacity={0.45} transparent roughness={0.3} metalness={0.7} /></mesh><mesh position={[0,0.72,0.045]}><boxGeometry args={[2.1,1.2,0.01]} /><meshStandardMaterial color={color} opacity={0.2} transparent emissive={color} emissiveIntensity={0.3} /></mesh></group></group></group></group>`

- [x] T004 [US1] Compléter la fonction `Hero3DLaptop` exportée dans `components/shared/Hero3DLaptop.tsx` : calculer `const color = resolvedTheme === "dark" ? "#8875e8" : "#6655cc"` et retourner `<div aria-hidden className="pointer-events-none absolute right-0 top-0 -z-10 h-[500px] w-[500px]"><Canvas dpr={[1, 2]} camera={{ position: [0, 1.5, 5], fov: 40 }} gl={{ antialias: false, alpha: true }}><ambientLight intensity={0.7} /><pointLight position={[5, 5, 5]} intensity={1.2} /><pointLight position={[-5, 3, 2]} intensity={0.4} /><LaptopScene color={color} /></Canvas></div>`

- [x] T005 [US1] Modifier `components/sections/HeroSection.tsx` : remplacer le bloc `const Hero3DObject = dynamic(...)` par `const Hero3DLaptop = dynamic(() => import("@/components/shared/Hero3DLaptop").then((m) => ({ default: m.Hero3DLaptop })), { ssr: false })`, et remplacer `<Hero3DObject />` par `<Hero3DLaptop />` dans le JSX de la section

**Checkpoint**: US1 complète et testable — laptop visible dans le coin droit du Hero, rotation Y lente, base + écran reconnaissables, couleur adaptée au thème actif.

---

## Phase 4: User Story 2 — Tilt souris (P2)

**Goal**: Le laptop s'oriente légèrement vers le curseur (max 20°) pendant que la rotation Y continue.

**Independent Test**: Déplacer lentement la souris dans le Hero → laptop s'incline doucement vers le curseur → sortir la souris → inclinaison revient progressivement à zéro.

- [x] T006 [US2] Dans `LaptopScene` de `components/shared/Hero3DLaptop.tsx` : ajouter `const groupRef = useRef<Group>(null)`, envelopper le `<group>` (actuel outermost) dans `<group ref={groupRef}>`, et dans `useFrame` changer la signature en `(state, delta)` et ajouter après la rotation du innerRef : `if (groupRef.current) { groupRef.current.rotation.x += (state.pointer.y * 0.35 - groupRef.current.rotation.x) * 0.05; groupRef.current.rotation.z += (-state.pointer.x * 0.2 - groupRef.current.rotation.z) * 0.05 }`

**Checkpoint**: Hover sur le Hero → laptop s'incline vers le curseur (max ~20°). Sortie de souris → retour progressif à la rotation de base.

---

## Phase 5: User Story 3 — Accessibilité et performance (P3)

**Goal**: Le laptop ne se charge pas sur mobile, avec prefers-reduced-motion actif, ou si WebGL est indisponible.

**Independent Test**: Ouvrir sur mobile → aucun laptop. Activer prefers-reduced-motion → aucun laptop. Désactiver WebGL → aucun laptop, aucune erreur console.

- [x] T007 [US3] Dans `components/shared/Hero3DLaptop.tsx`, compléter le `useEffect` (actuellement vide) avec : `const hasWebGL = (() => { try { const c = document.createElement("canvas"); return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl"))) } catch { return false } })()` et `const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches` et `setCanRender(hasWebGL && isDesktop)`

**Checkpoint**: Sur mobile et avec prefers-reduced-motion, `Hero3DLaptop` retourne `null` sans erreur. En l'absence de WebGL, idem.

---

## Phase 6: Polish

- [x] T008 Vérifier TypeScript strict — `npx tsc --noEmit` sans erreur
- [x] T009 Valider les 15 smoke tests de `specs/013-hero-3d-laptop/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)** : Aucune dépendance — commencer immédiatement
- **Foundational (Phase 2)** : Dépend de T001 (packages vérifiés)
- **US1 (Phase 3)** : Dépend de T002 (composant shell créé)
- **US2 (Phase 4)** : Dépend de T003 + T004 + T005 (US1 complète — tilt s'ajoute à la rotation existante)
- **US3 (Phase 5)** : Dépend de T002 (peut s'appliquer dès que le shell existe)
- **Polish (Phase 6)** : Dépend de toutes les phases précédentes

### Ordre strict des tâches

```
T001 → T002 → T003 → T004 → T005 → T006 → T007 → T008
                                                  → T009
```

T003, T004, T005 modifient des fichiers séquentiellement.
T008 et T009 sont indépendants entre eux :

```
T007 → T008 [P]
     → T009 [P]
```

---

## Parallel Example

```bash
# T001 peut démarrer immédiatement (vérification packages)
# T002 attend T001

# Une fois T007 terminé, T008 et T009 peuvent s'exécuter en parallèle :
Task: "npx tsc --noEmit"
Task: "Valider smoke tests quickstart.md"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Terminer **Phase 1** : T001 (vérification packages)
2. Terminer **Phase 2** : T002 (shell composant)
3. Terminer **Phase 3** : T003 + T004 + T005 (laptop visible + intégration Hero)
4. **VALIDER** : laptop dans le Hero, rotation Y, couleur thème, lisibilité du contenu
5. Continuer avec US2 (tilt souris) et US3 (accessibilité) si MVP validé

### Incremental Delivery

1. T001 → packages vérifiés
2. T002 → shell prêt
3. T003 + T004 + T005 → Hero avec laptop (MVP ✅)
4. T006 → tilt souris ajouté
5. T007 → mobile + WebGL + reduced-motion protégés
6. T008 + T009 → qualité validée, prêt pour merge
