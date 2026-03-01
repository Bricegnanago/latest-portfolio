# Implementation Plan: Élément 3D Décoratif dans le Hero

**Branch**: `012-hero-3d` | **Date**: 2026-03-01 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/012-hero-3d/spec.md`

## Summary

Intégrer un icosaèdre 3D décoratif dans le fond de la section Hero — rotation continue automatique, tilt souris doux, couleurs thème-adaptatives (violet translucide), désactivé sur mobile/reduced-motion/WebGL indisponible. Rendu via `@react-three/fiber@9` + `three`, chargé en lazy (`next/dynamic ssr:false`) pour préserver Lighthouse > 90.

## Technical Context

**Language/Version**: TypeScript 5.x strict (no `any`)
**Framework**: Next.js 16 (App Router) + React 19
**3D Library**: `@react-three/fiber@9` + `three` (peer dep) — sans @react-three/drei
**TypeScript types**: `@types/three` (devDependency)
**Animations**: `useFrame` (R3F) + `useReducedMotion` (Framer Motion)
**Theme**: `useTheme()` de next-themes (déjà présent)
**Storage**: N/A — composant purement visuel, aucune donnée
**Testing**: `npx tsc --noEmit` + smoke tests manuels
**Target Platform**: Desktop web (désactivé mobile/tactile)
**Performance Goals**: 60 fps sur desktop moderne, Lighthouse Performance > 90 maintenu
**Constraints**: Bundle 3D lazy-loaded (aucun impact LCP/FCP), WebGL graceful fallback, prefers-reduced-motion respecté
**Scale/Scope**: 1 nouveau fichier + 3 lignes dans HeroSection.tsx

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principe | Status | Notes |
|----------|--------|-------|
| I. Stack Technique (TypeScript strict, Next.js, Tailwind, Framer Motion) | ✅ PASS | `@react-three/fiber` ajouté comme dépendance spécialisée 3D — non interdit par la constitution |
| II. Architecture (App Router, composants sections/shared) | ✅ PASS | Nouveau composant `components/shared/Hero3DObject.tsx` + modification `HeroSection.tsx` |
| II. Performance Lighthouse > 90 | ✅ PASS | Bundle lazy-loaded, aucun impact LCP/FCP |
| III. Design responsive mobile-first | ✅ PASS | Élément désactivé sur mobile (guard matchMedia) |
| III. Animations subtiles | ✅ PASS | Opacité 0.35, rotation lente, tilt max 20° |
| III. Accessibilité | ✅ PASS | `aria-hidden` sur le canvas, prefers-reduced-motion respecté |
| IV. Intégrité du contenu | ✅ PASS | Élément décoratif — pas de données, pas de contenu |
| V. Qualité code (no any, no console.log, imports organisés) | ✅ PASS | Types three importés via @types/three |

**Verdict**: Aucune violation. Implémentation autorisée.

## Project Structure

### Documentation (this feature)

```text
specs/012-hero-3d/
├── plan.md              ✅ Ce fichier
├── research.md          ✅ Phase 0 output
├── quickstart.md        ✅ Phase 1 output
├── spec.md              ✅ Spécification
└── tasks.md             📋 Phase 2 output (à générer via /speckit.tasks)
```

*(Pas de data-model.md ni contracts/ — composant purement visuel, aucune donnée ni API)*

### Source Code

```text
components/
├── sections/
│   └── HeroSection.tsx          # Modifié — ajout dynamic import + <Hero3DObject />
└── shared/
    └── Hero3DObject.tsx          # Nouveau — composant Canvas R3F + icosaèdre animé
```

**Structure Decision**: Monorepo Next.js existant — `Hero3DObject.tsx` dans `components/shared/` (pattern identique à `ParticlesBackground.tsx`).

## Architecture Decision

### Composant `Hero3DObject.tsx`

Deux objets Three.js imbriqués pour découpler rotation et tilt :

```
<group ref={groupRef}>    ← tilt souris (lerp vers state.pointer)
  <mesh ref={meshRef}>    ← rotation continue (useFrame delta)
    <icosahedronGeometry />
    <meshStandardMaterial />
  </mesh>
</group>
```

### Guards (order matters)

```
canRender = hasWebGL && isDesktop (from useEffect)
if (!canRender || reducedMotion) return null
```

### Integration dans HeroSection

```tsx
// Dynamic import (ssr: false) — après ParticlesBackground
const Hero3DObject = dynamic(...)

// Dans <section>:
<ParticlesBackground />
<Hero3DObject />           ← après les particules, avant le content div
```

## Canvas Configuration

```tsx
<Canvas
  dpr={[1, 2]}                           // cap DPR à 2 pour Retina
  camera={{ position: [0, 0, 4], fov: 45 }}
  gl={{ antialias: false, alpha: true }} // perf + fond transparent
>
  <ambientLight intensity={0.6} />
  <pointLight position={[5, 5, 5]} intensity={1.2} />
  <IcosahedronScene color={color} />
</Canvas>
```

## Artifacts générés

| Fichier | Description |
|---------|-------------|
| `research.md` | Décisions techniques (bibliothèque, forme, animation, guards) |
| `quickstart.md` | Code complet + smoke tests |
| `plan.md` | Ce fichier — architecture et contexte technique |
