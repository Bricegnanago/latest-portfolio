# Implementation Plan: Laptop 3D Tournant dans le Hero

**Branch**: `013-hero-3d-laptop` | **Date**: 2026-03-02 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/013-hero-3d-laptop/spec.md`

## Summary

Intégrer un laptop 3D procédural (construit à partir de BoxGeometry — 0 KB d'asset) dans le fond de la section Hero, en remplacement de l'icosaèdre géométrique (feature 012). Rotation continue sur l'axe Y, tilt souris doux (max 20°), couleurs thème-adaptatives (violet translucide), désactivé sur mobile/reduced-motion/WebGL indisponible. Aucune nouvelle dépendance — `@react-three/fiber` et `three` déjà installés.

## Technical Context

**Language/Version**: TypeScript 5.x strict (no `any`)
**Framework**: Next.js 16 (App Router) + React 19
**3D Library**: `@react-three/fiber@9` + `three` — déjà installés par feature 012
**Nouvelles dépendances**: Aucune
**Animations**: `useFrame` (R3F) + `useReducedMotion` (Framer Motion) + `useTheme` (next-themes)
**Storage**: N/A — composant purement visuel, aucun fichier asset externe
**Testing**: `npx tsc --noEmit` + smoke tests manuels
**Target Platform**: Desktop web (désactivé mobile/tactile)
**Performance Goals**: 60 fps sur desktop moderne, Lighthouse Performance > 90 maintenu, 0 KB d'asset supplémentaire
**Constraints**: Laptop procédural (BoxGeometry uniquement), WebGL graceful fallback, prefers-reduced-motion respecté
**Scale/Scope**: 1 nouveau fichier + modifications légères dans HeroSection.tsx

## Constitution Check

| Principe | Status | Notes |
|----------|--------|-------|
| I. Stack Technique (TypeScript strict, Next.js, Tailwind, Framer Motion) | ✅ PASS | R3F déjà autorisé depuis feature 012 |
| II. Architecture (App Router, components/shared) | ✅ PASS | Nouveau `Hero3DLaptop.tsx` dans `components/shared/` |
| II. Performance Lighthouse > 90 | ✅ PASS | 0 KB d'asset, lazy-loaded, même impact que feature 012 |
| III. Design responsive mobile-first | ✅ PASS | Désactivé sur mobile (guard matchMedia) |
| III. Animations subtiles | ✅ PASS | Opacity 0.45, rotation lente (0.4 delta), tilt max 20° |
| III. Accessibilité | ✅ PASS | `aria-hidden`, prefers-reduced-motion respecté |
| IV. Intégrité du contenu | ✅ PASS | Élément décoratif — pas de données, pas de contenu |
| V. Qualité code | ✅ PASS | TypeScript strict, imports organisés, pas de console.log |

**Verdict**: Aucune violation. Implémentation autorisée.

## Project Structure

### Documentation (this feature)

```text
specs/013-hero-3d-laptop/
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
│   └── HeroSection.tsx          # Modifié — swap Hero3DObject → Hero3DLaptop
└── shared/
    └── Hero3DLaptop.tsx          # Nouveau — laptop procédural BoxGeometry + animation
```

**Structure Decision**: Monorepo Next.js existant — `Hero3DLaptop.tsx` dans `components/shared/` (pattern identique à `Hero3DObject.tsx` et `ParticlesBackground.tsx`).

## Architecture Decision

### Composant `Hero3DLaptop.tsx`

Deux groupes Three.js imbriqués — identique au pattern de `Hero3DObject.tsx` :

```
<group ref={groupRef}>       ← mouse tilt (lerp X + Z)
  <group ref={innerRef}      ← auto-rotation Y + inclinaison initiale
    rotation={[-0.2, 0.3, 0.1]}>
    ├── Base mesh (2.4×0.1×1.6)
    └── Screen pivot group (position=[0, 0.05, -0.8])
        └── Screen rotation (rotation.x = 1.1)
            ├── Screen body (2.3×1.4×0.08)
            └── Screen face emissive (2.1×1.2×0.01)
```

### useFrame pattern

```tsx
// Auto-rotation Y on inner group
innerRef.current.rotation.y += delta * 0.4
// Mouse tilt on outer group — X + Z for natural 3D feel
groupRef.current.rotation.x +=
  (state.pointer.y * 0.35 - groupRef.current.rotation.x) * 0.05
groupRef.current.rotation.z +=
  (-state.pointer.x * 0.2 - groupRef.current.rotation.z) * 0.05
```

### Guards

```
canRender = hasWebGL && isDesktop (from useEffect)
if (!canRender || reducedMotion) return null
```

### Integration dans HeroSection

Swap du dynamic import et du composant rendu :
```tsx
// Avant (012) :
const Hero3DObject = dynamic(...)
<Hero3DObject />

// Après (013) :
const Hero3DLaptop = dynamic(...)
<Hero3DLaptop />
```

## Canvas Configuration

```tsx
<Canvas
  dpr={[1, 2]}
  camera={{ position: [0, 1.5, 5], fov: 40 }}  // angle surplombant — montre base + écran
  gl={{ antialias: false, alpha: true }}
>
  <ambientLight intensity={0.7} />
  <pointLight position={[5, 5, 5]} intensity={1.2} />
  <pointLight position={[-5, 3, 2]} intensity={0.4} />  // contrelumière pour profondeur
  <LaptopScene color={color} />
</Canvas>
```

## Artifacts générés

| Fichier | Description |
|---------|-------------|
| `research.md` | Décisions : procédural vs GLB, géométrie, animation, dépendances |
| `quickstart.md` | Code complet `Hero3DLaptop.tsx` + modifications HeroSection + smoke tests |
| `plan.md` | Ce fichier — architecture et contexte technique |
