# Quickstart: Laptop 3D Tournant dans le Hero

**Feature**: `013-hero-3d-laptop`
**Date**: 2026-03-02

---

## Changes Summary

### Installation

**Aucune nouvelle dépendance** — `@react-three/fiber` et `three` sont déjà installés (feature 012).

### Nouveau fichier : `components/shared/Hero3DLaptop.tsx`

```tsx
"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useTheme } from "next-themes"
import { useReducedMotion } from "framer-motion"
import type { Group } from "three"

interface SceneProps {
  color: string
}

function LaptopScene({ color }: SceneProps) {
  const groupRef = useRef<Group>(null)
  const innerRef = useRef<Group>(null)

  useFrame((state, delta) => {
    if (!innerRef.current || !groupRef.current) return
    // Auto-rotation on Y axis only — shows all sides of the laptop naturally
    innerRef.current.rotation.y += delta * 0.4
    // Mouse tilt on outer group — smooth lerp, max ~20° (0.35 rad)
    groupRef.current.rotation.x +=
      (state.pointer.y * 0.35 - groupRef.current.rotation.x) * 0.05
    groupRef.current.rotation.z +=
      (-state.pointer.x * 0.2 - groupRef.current.rotation.z) * 0.05
  })

  return (
    <group ref={groupRef}>
      {/* Initial tilt to show both base and screen on first render */}
      <group ref={innerRef} rotation={[-0.2, 0.3, 0.1]}>
        {/* Base (keyboard body) */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.4, 0.1, 1.6]} />
          <meshStandardMaterial
            color={color}
            opacity={0.45}
            transparent
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>

        {/* Screen assembly — pivot at the back edge of the base */}
        <group position={[0, 0.05, -0.8]}>
          <group rotation={[1.1, 0, 0]}>
            {/* Screen body */}
            <mesh position={[0, 0.72, 0]}>
              <boxGeometry args={[2.3, 1.4, 0.08]} />
              <meshStandardMaterial
                color={color}
                opacity={0.45}
                transparent
                roughness={0.3}
                metalness={0.7}
              />
            </mesh>
            {/* Screen display face — emissive glow to suggest a lit screen */}
            <mesh position={[0, 0.72, 0.045]}>
              <boxGeometry args={[2.1, 1.2, 0.01]} />
              <meshStandardMaterial
                color={color}
                opacity={0.2}
                transparent
                emissive={color}
                emissiveIntensity={0.3}
              />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  )
}

export function Hero3DLaptop() {
  const [canRender, setCanRender] = useState(false)
  const reducedMotion = useReducedMotion()
  const { resolvedTheme } = useTheme()

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
        camera={{ position: [0, 1.5, 5], fov: 40 }}
        gl={{ antialias: false, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, 3, 2]} intensity={0.4} />
        <LaptopScene color={color} />
      </Canvas>
    </div>
  )
}
```

### Modification : `components/sections/HeroSection.tsx`

Remplacer l'import `Hero3DObject` par `Hero3DLaptop` :

```tsx
// Remplacer :
const Hero3DObject = dynamic(
  () =>
    import("@/components/shared/Hero3DObject").then((m) => ({
      default: m.Hero3DObject,
    })),
  { ssr: false }
)

// Par :
const Hero3DLaptop = dynamic(
  () =>
    import("@/components/shared/Hero3DLaptop").then((m) => ({
      default: m.Hero3DLaptop,
    })),
  { ssr: false }
)
```

Et dans le JSX de la `<section>` :

```tsx
{/* Remplacer <Hero3DObject /> par : */}
<Hero3DLaptop />
```

---

## Smoke Test Checklist

- [ ] `npx tsc --noEmit` — 0 erreur TypeScript
- [ ] Ouvrir le portfolio sur desktop → laptop 3D visible dans le coin supérieur droit du Hero
- [ ] Le laptop est reconnaissable : base horizontale + écran incliné vers l'arrière
- [ ] Le laptop tourne lentement sur l'axe Y (rotation continue)
- [ ] L'écran affiche une légère lueur emissive (différent de la base)
- [ ] Déplacer la souris dans le Hero → laptop s'incline légèrement vers le curseur
- [ ] Sortir la souris du Hero → laptop revient progressivement à la rotation de base
- [ ] Redimensionner la fenêtre → canvas s'adapte sans rechargement de page
- [ ] Passer en mode clair → couleur du laptop s'adapte (violet foncé)
- [ ] Passer en mode sombre → couleur du laptop s'adapte (violet clair)
- [ ] Ouvrir sur mobile (375 px) → aucun laptop (composant non rendu)
- [ ] Activer prefers-reduced-motion → aucun laptop
- [ ] Le texte et boutons du Hero restent parfaitement lisibles avec le laptop en fond
- [ ] Le laptop ne capture aucun clic (pointer-events-none)
- [ ] Désactiver WebGL → Hero s'affiche normalement sans erreur console

---

## Non-Regression Check

| Comportement | Attendu |
|--------------|---------|
| Particules tsparticles | ✅ Inchangées (le laptop remplace Hero3DObject, pas les particules) |
| Animations d'entrée du Hero | ✅ Inchangées |
| Avatar lévitation + parallaxe | ✅ Inchangés |
| Background blobs CSS | ✅ Inchangés |
| Sections suivantes | ✅ Non affectées |
| `npx tsc --noEmit` | ✅ 0 erreur |
