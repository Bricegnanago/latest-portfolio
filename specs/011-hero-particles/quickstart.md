# Quickstart: Fond Particulaire Animé (Hero)

**Feature**: `011-hero-particles`
**Date**: 2026-02-28

---

## Changes Summary

### Installation (1 commande)

```bash
npm install @tsparticles/react @tsparticles/slim
```

### Nouveau fichier : `components/shared/ParticlesBackground.tsx`

Composant client complet :

```tsx
"use client"

import { useEffect, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import { useTheme } from "next-themes"
import { useReducedMotion } from "framer-motion"
import type { Engine, ISourceOptions } from "@tsparticles/engine"

export function ParticlesBackground() {
  const [engineReady, setEngineReady] = useState(false)
  const [canHover, setCanHover] = useState(false)
  const { resolvedTheme } = useTheme()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches)
  }, [])

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine)
    }).then(() => setEngineReady(true))
  }, [])

  if (!engineReady || !canHover || reducedMotion) return null

  const color = resolvedTheme === "dark" ? "#8875e8" : "#6655cc"

  const options: ISourceOptions = {
    background: { color: { value: "transparent" } },
    particles: {
      color: { value: color },
      links: { enable: true, color, distance: 130, opacity: 0.3, width: 1 },
      move: {
        enable: true,
        speed: 0.6,
        direction: "none",
        random: true,
        outModes: { default: "bounce" },
      },
      number: { value: 45, density: { enable: true, area: 800 } },
      opacity: { value: { min: 0.2, max: 0.5 } },
      size: { value: { min: 1, max: 2.5 } },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        resize: { enable: true },
      },
      modes: { repulse: { distance: 100, duration: 0.4 } },
    },
    detectRetina: false,
    fpsLimit: 60,
  }

  return (
    <Particles
      id="hero-particles"
      className="pointer-events-none absolute inset-0 -z-10"
      options={options}
    />
  )
}
```

### Modification : `components/sections/HeroSection.tsx`

Ajouter en haut du fichier (après les imports existants) :

```tsx
import dynamic from "next/dynamic"

const ParticlesBackground = dynamic(
  () =>
    import("@/components/shared/ParticlesBackground").then((m) => ({
      default: m.ParticlesBackground,
    })),
  { ssr: false }
)
```

Ajouter à l'intérieur de la `<section>`, juste après les background blobs (avant le main content div) :

```tsx
<ParticlesBackground />
```

---

## Smoke Test Checklist

- [ ] `npm install` complète sans erreur (packages tsparticles ajoutés)
- [ ] `npx tsc --noEmit` — 0 erreur TypeScript
- [ ] Ouvrir le portfolio sur desktop → particules visibles dans le fond du Hero
- [ ] Les particules flottent lentement (speed subtil)
- [ ] Des lignes de connexion apparaissent entre particules proches
- [ ] Survoler le Hero → particules proches du curseur s'écartent (repulse)
- [ ] Redimensionner la fenêtre → canvas s'adapte sans rechargement
- [ ] Passer en mode clair → couleur des particules s'adapte
- [ ] Passer en mode sombre → couleur des particules s'adapte
- [ ] Ouvrir sur mobile (375 px) → aucune particule (composant non rendu)
- [ ] Activer prefers-reduced-motion → aucune particule
- [ ] Le texte et boutons du Hero restent parfaitement lisibles avec les particules
- [ ] Les particules ne capturent pas les clics sur les boutons CTA (pointer-events-none)
- [ ] Lighthouse Performance desktop > 90 (test via DevTools)

---

## Non-Regression Check

| Comportement | Attendu |
|--------------|---------|
| Animations d'entrée du Hero (letter stagger, etc.) | ✅ Inchangées |
| Avatar lévitation + parallaxe | ✅ Inchangés |
| Background blobs CSS | ✅ Inchangés (z-index cohérent) |
| Sections suivantes (À propos, Compétences, etc.) | ✅ Non affectées |
| Navigation, liens d'ancrage | ✅ Inchangés |
| `npx tsc --noEmit` | ✅ 0 erreur |
