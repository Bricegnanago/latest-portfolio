# Implementation Plan: Fond Particulaire Animé (Hero)

**Branch**: `011-hero-particles` | **Date**: 2026-02-28 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/011-hero-particles/spec.md`

## Summary

Ajout d'un fond particulaire animé (45 particules flottantes avec lignes de connexion, interactivité souris) dans la section Hero uniquement. Implémenté via `@tsparticles/react` + `@tsparticles/slim`, chargé en lazy avec `next/dynamic({ ssr: false })`. Désactivé automatiquement sur mobile (touch device) et avec `prefers-reduced-motion`. Couleur adaptée au thème via `useTheme()` de next-themes.

## Technical Context

**Language/Version**: TypeScript 5.x strict (no `any`)
**Primary Dependencies**: `@tsparticles/react@3`, `@tsparticles/slim@3` (nouveaux), Framer Motion (existant), next-themes (existant), Next.js 14+ dynamic import
**Storage**: N/A
**Testing**: Smoke test visuel (quickstart.md) + `npx tsc --noEmit`
**Target Platform**: Web — Next.js App Router, Vercel
**Project Type**: Web application (single monorepo Next.js)
**Performance Goals**: Lighthouse Performance > 90 maintenu ; 60 fps sur desktop ; LCP non affecté (lazy loading)
**Constraints**: Canvas API → no SSR ; lazy load obligatoire ; désactivé mobile + reduced motion ; `detectRetina: false` + `fpsLimit: 60`
**Scale/Scope**: 1 nouveau composant, 1 modification de composant existant

## Constitution Check

| Principe | Statut | Notes |
|----------|--------|-------|
| I — Stack technique | ✅ PASS | TypeScript strict, Next.js dynamic, Framer Motion (reducedMotion) |
| II — Architecture | ✅ PASS | `components/shared/ParticlesBackground.tsx` — architecture respectée |
| III — Design & UX | ✅ PASS | mobile-first (désactivé mobile), prefers-reduced-motion, subtil |
| IV — Intégrité contenu | ✅ PASS | Effet visuel pur, aucune donnée fictive |
| V — Qualité code | ✅ PASS | TypeScript strict, types explicites (`ISourceOptions`, `Engine`) |
| Interdictions | ✅ PASS | Pas de CSS externe, pas de lib CSS sup. — tsparticles est une lib d'animation JS |
| Animation subtile | ✅ PASS | speed 0.6, opacity 0.2–0.5, désactivé reduced motion |

**Complexité justifiée** : `@tsparticles/slim` pèse ~350–400 KB gzippé. Mitigation : lazy-loading (`next/dynamic ssr:false`) → chargé après paint initial → LCP et FCP non affectés. Mobile exclu → Lighthouse mobile non dégradé.

## Project Structure

### Documentation (this feature)

```text
specs/011-hero-particles/
├── plan.md              ✅ Ce fichier
├── research.md          ✅ Phase 0
├── quickstart.md        ✅ Phase 1
└── tasks.md             ⬜ Créé par /speckit.tasks
```

### Source Code (repository root)

```text
components/
└── shared/
    └── ParticlesBackground.tsx          ← nouveau composant (client only, lazy-loaded)

components/
└── sections/
    └── HeroSection.tsx                  ← ajout dynamic import + <ParticlesBackground />

package.json                             ← ajout @tsparticles/react, @tsparticles/slim
```

**Structure Decision**: Single project Next.js — 1 nouveau fichier de composant, 1 modification légère du composant existant, 1 commande npm install.

## Implementation Details

### `components/shared/ParticlesBackground.tsx` — Composant complet

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

### Modification de `HeroSection.tsx`

**Ajouter les imports** (après les imports existants) :

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

**Ajouter dans `<section>`, après les blobs, avant le main content** :

```tsx
<ParticlesBackground />
```

### Z-index Architecture

```
<section> position:relative
  ├── blob 1       z:-10  (bg-primary/10, blur-3xl)
  ├── blob 2       z:-10  (bg-primary/10, blur-3xl)
  ├── <Particles>  z:-10  (pointer-events-none, canvas absolute inset-0)
  └── main content z:auto (texte, avatar, boutons — au-dessus de tout)
```

## Complexity Tracking

| Contexte | Justification |
|----------|---------------|
| Nouvelle dépendance (~400 KB gzip) | Demande explicite utilisateur ; lazy-loaded après paint → impact LCP nul ; mobile exclu → Lighthouse mobile préservé |
