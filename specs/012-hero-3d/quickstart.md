# Quickstart: Élément 3D Décoratif dans le Hero

**Feature**: `012-hero-3d`
**Date**: 2026-03-01

---

## Changes Summary

### Installation (1 commande)

```bash
npm install @react-three/fiber three
npm install -D @types/three
```

### Nouveau fichier : `components/shared/Hero3DObject.tsx`

```tsx
"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useTheme } from "next-themes"
import { useReducedMotion } from "framer-motion"
import type { Group, Mesh } from "three"

interface SceneProps {
  color: string
}

function IcosahedronScene({ color }: SceneProps) {
  const groupRef = useRef<Group>(null)
  const meshRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (!meshRef.current || !groupRef.current) return
    // Continuous rotation on inner mesh
    meshRef.current.rotation.x += delta * 0.3
    meshRef.current.rotation.y += delta * 0.5
    // Mouse tilt on outer group (smooth lerp, max ~20° = 0.35 rad)
    groupRef.current.rotation.x +=
      (state.pointer.y * 0.35 - groupRef.current.rotation.x) * 0.05
    groupRef.current.rotation.y +=
      (state.pointer.x * 0.35 - groupRef.current.rotation.y) * 0.05
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color={color}
          opacity={0.35}
          transparent
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>
    </group>
  )
}

export function Hero3DObject() {
  const { resolvedTheme } = useTheme()
  const reducedMotion = useReducedMotion()
  const [canRender, setCanRender] = useState(false)

  useEffect(() => {
    const hasWebGL = (() => {
      try {
        const c = document.createElement("canvas")
        return !!(
          window.WebGLRenderingContext &&
          (c.getContext("webgl") || c.getContext("experimental-webgl"))
        )
      } catch {
        return false
      }
    })()
    const isDesktop = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches
    setCanRender(hasWebGL && isDesktop)
  }, [])

  if (!canRender || reducedMotion) return null

  const color = resolvedTheme === "dark" ? "#8875e8" : "#6655cc"

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute right-0 top-0 -z-10 h-[500px] w-[500px]"
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: false, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.2} />
        <IcosahedronScene color={color} />
      </Canvas>
    </div>
  )
}
```

### Modification : `components/sections/HeroSection.tsx`

Ajouter après l'import existant de `dynamic` (au-dessus de `ParticlesBackground`) :

```tsx
const Hero3DObject = dynamic(
  () =>
    import("@/components/shared/Hero3DObject").then((m) => ({
      default: m.Hero3DObject,
    })),
  { ssr: false }
)
```

Ajouter à l'intérieur de la `<section>`, après `<ParticlesBackground />` :

```tsx
<Hero3DObject />
```

---

## Smoke Test Checklist

- [ ] `npm install` complète sans erreur (packages @react-three/fiber, three, @types/three ajoutés)
- [ ] `npx tsc --noEmit` — 0 erreur TypeScript
- [ ] Ouvrir le portfolio sur desktop → icosaèdre visible dans le coin supérieur droit du Hero
- [ ] L'icosaèdre tourne lentement en continu (rotation douce)
- [ ] Déplacer la souris dans le Hero → icosaèdre s'incline légèrement vers le curseur
- [ ] Sortir la souris du Hero → icosaèdre revient progressivement à la rotation de base
- [ ] Redimensionner la fenêtre → canvas s'adapte sans rechargement de page
- [ ] Passer en mode clair → couleur de l'icosaèdre s'adapte (violet foncé)
- [ ] Passer en mode sombre → couleur de l'icosaèdre s'adapte (violet clair)
- [ ] Ouvrir sur mobile (375 px) → aucun icosaèdre (composant non rendu)
- [ ] Activer prefers-reduced-motion → aucun icosaèdre
- [ ] Le texte et boutons du Hero restent parfaitement lisibles avec l'icosaèdre en fond
- [ ] L'icosaèdre ne capture aucun clic (pointer-events-none)
- [ ] Désactiver WebGL (via DevTools > More Tools > Rendering > WebGL disabled) → Hero s'affiche normalement sans erreur console

---

## Non-Regression Check

| Comportement | Attendu |
|--------------|---------|
| Particules tsparticles | ✅ Inchangées (z-index cohérent, tous deux -z-10) |
| Animations d'entrée du Hero | ✅ Inchangées |
| Avatar lévitation + parallaxe | ✅ Inchangés |
| Background blobs CSS | ✅ Inchangés |
| Sections suivantes | ✅ Non affectées |
| `npx tsc --noEmit` | ✅ 0 erreur |
