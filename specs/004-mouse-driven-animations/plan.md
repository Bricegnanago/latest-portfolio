# Implementation Plan: Animations réactives à la souris

**Branch**: `004-mouse-driven-animations` | **Date**: 2026-02-25 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-mouse-driven-animations/spec.md`

## Summary

Enrichir le portfolio avec des animations interactives réactives à la position de la souris : effet tilt 3D + reflet lumineux sur les cartes, parallaxe souris dans la section héro, et animations de défilement enrichies. Toutes les animations sont basées sur Framer Motion (imposé par la constitution), désactivées sur mobile/tactile, et respectent `prefers-reduced-motion`.

## Technical Context

**Language/Version**: TypeScript 5.x strict (no `any`) + React 19 + Next.js 16 (App Router)
**Primary Dependencies**: Framer Motion 12 (déjà installé — `useMotionValue`, `useTransform`, `useSpring`, `motion`), Tailwind CSS 4, shadcn/ui
**Storage**: N/A — pas de données, fonctionnalité purement UI
**Testing**: Vérification manuelle visuelle + contrôle de performance navigateur (DevTools Performance)
**Target Platform**: Web — navigateurs modernes desktop + mobile (Chrome, Firefox, Safari, Edge dernières 3 versions)
**Project Type**: Web — monorepo Next.js existant
**Performance Goals**: 60 fps constant pendant les animations souris, latence perçue < 50ms
**Constraints**: Animations subtiles (max 15° tilt, max 20px parallaxe), pas de dépendance supplémentaire, pas de `useEffect` inutile
**Scale/Scope**: 6 sections existantes, ~4 composants modifiés, ~3 nouveaux hooks/composants

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principe | Statut | Détail |
|----------|--------|--------|
| I. Stack Technique | ✅ Pass | Framer Motion (imposé), Tailwind CSS, TypeScript strict — aucune lib externe ajoutée |
| II. Architecture | ✅ Pass | Hooks dans `hooks/`, composants partagés dans `components/shared/`, sections dans `components/sections/` |
| III. Design & UX | ✅ Pass | Animations subtiles et performantes, responsive mobile-first, `prefers-reduced-motion` respecté, dark/light adapté |
| IV. Intégrité Contenu | ✅ Pass | Aucun contenu modifié — fonctionnalité purement visuelle/interactive |
| V. Qualité Code | ✅ Pass | Pas de `console.log`, TypeScript strict, nommage PascalCase/camelCase, un composant = un fichier |
| Contraintes | ✅ Pass | Pas de lib CSS supplémentaire, pas de `useEffect` inutile (Framer Motion hooks natifs), pas de sur-ingénierie |

**Gate result**: ✅ PASS — Aucune violation.

## Project Structure

### Documentation (this feature)

```text
specs/004-mouse-driven-animations/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (repository root)

```text
hooks/
├── useScrollSpy.ts         # Existant — pas modifié
├── useTilt.ts              # NOUVEAU — hook tilt 3D + reflet lumineux
├── useMouseParallax.ts     # NOUVEAU — hook parallaxe souris héro
└── useReducedMotion.ts     # NOUVEAU — hook prefers-reduced-motion

components/
├── shared/
│   ├── TiltCard.tsx         # NOUVEAU — wrapper tilt 3D + reflet lumineux
│   ├── ProjectCard.tsx      # MODIFIÉ — intègre TiltCard
│   ├── ExperienceCard.tsx   # MODIFIÉ — intègre TiltCard
│   └── SectionTitle.tsx     # Existant — pas modifié
├── sections/
│   ├── HeroSection.tsx      # MODIFIÉ — parallaxe souris multicouche
│   ├── SkillsSection.tsx    # MODIFIÉ — tilt sur CategoryCard + scroll enrichi
│   ├── AboutSection.tsx     # MODIFIÉ — scroll enrichi (profil image scale)
│   ├── ProjectsSection.tsx  # Potentiellement modifié (variants scroll)
│   ├── ExperienceSection.tsx # Potentiellement modifié (variants scroll)
│   └── ContactSection.tsx   # Existant — pas modifié (formulaire = pas de tilt)
└── ui/
    └── (inchangés)
```

**Structure Decision**: Approche par hooks réutilisables (`useTilt`, `useMouseParallax`, `useReducedMotion`) + un composant wrapper `TiltCard`. Les hooks encapsulent toute la logique de tracking souris et calcul de transformation. Les composants existants intègrent ces hooks avec un minimum de modifications.

## Architecture technique

### Hook `useTilt` — Effet tilt 3D + reflet lumineux

**Responsabilité**: Calcule les valeurs de rotation X/Y et la position du reflet lumineux à partir de la position de la souris sur un élément.

**API**:
```typescript
interface UseTiltOptions {
  maxTilt?: number      // Angle max en degrés (défaut: 12)
  perspective?: number  // Perspective CSS en px (défaut: 800)
  scale?: number        // Scale au survol (défaut: 1.02)
  speed?: number        // Vitesse du spring (défaut: 400)
  glare?: boolean       // Activer le reflet lumineux (défaut: true)
  glareOpacity?: number // Opacité max du reflet (défaut: 0.15)
}

interface UseTiltReturn {
  ref: React.RefObject<HTMLDivElement>
  style: MotionStyle       // rotateX, rotateY, scale, transformStyle
  glareStyle: MotionStyle  // position, opacity, background du reflet
  onMouseMove: (e: MouseEvent) => void
  onMouseLeave: () => void
}
```

**Implémentation clé**:
- `useMotionValue` pour `mouseX` et `mouseY` (pas de re-render)
- `useTransform` pour mapper mouse position → rotation angles
- `useSpring` pour lisser les transitions (spring animation)
- Calcul de la position souris relative au centre de la carte
- Reset spring à (0, 0) sur `onMouseLeave`

### Hook `useMouseParallax` — Parallaxe section héro

**Responsabilité**: Calcule les translations X/Y pour chaque couche de parallaxe à partir de la position souris sur la fenêtre.

**API**:
```typescript
interface UseMouseParallaxOptions {
  strength?: number  // Multiplicateur de déplacement (défaut: 1)
  inverted?: boolean // Direction inversée (défaut: true)
}

interface UseMouseParallaxReturn {
  x: MotionValue<number>
  y: MotionValue<number>
}
```

**Implémentation clé**:
- Écoute `mousemove` sur `window` (une seule fois, pas sur chaque élément)
- `useMotionValue` pour la position souris normalisée (-0.5 à 0.5)
- `useTransform` avec facteur `strength` pour chaque couche
- `useSpring` pour transition fluide
- Chaque élément héro utilise un `strength` différent (titre: 15px, sous-titre: 10px, boutons: 5px)

### Hook `useReducedMotion` — Accessibilité

**Responsabilité**: Détecte la préférence `prefers-reduced-motion` et fournit un booléen.

**Note**: Framer Motion fournit déjà `useReducedMotion()` — ce hook existe nativement. On l'importera directement depuis `framer-motion` au lieu de le recréer.

### Composant `TiltCard` — Wrapper réutilisable

**Responsabilité**: Enveloppe un `Card` shadcn/ui avec l'effet tilt 3D + reflet lumineux.

**Props**:
```typescript
interface TiltCardProps {
  children: React.ReactNode
  className?: string
  tiltOptions?: Partial<UseTiltOptions>
}
```

**Structure DOM**:
```html
<motion.div style={tiltStyle} onMouseMove onMouseLeave>
  <!-- Reflet lumineux (div absolute avec gradient radial) -->
  <motion.div style={glareStyle} className="pointer-events-none absolute inset-0 rounded-xl" />
  <!-- Contenu Card -->
  {children}
</motion.div>
```

### Animations de défilement enrichies

**Approche**: Enrichir les variants Framer Motion existants dans chaque section plutôt que de créer un système centralisé.

| Section | Animation actuelle | Animation enrichie |
|---------|-------------------|-------------------|
| About | fade-up (y:30) | fade-up + scale (0.95→1) + légère rotation |
| Skills | stagger fade-up (y:20) | stagger fade-up + scale (0.9→1) + décalage horizontal alternant |
| Projects | fade-up (y:30) staggered | fade-up + scale (0.95→1) + perspective légère |
| Experience | alternating x:-30/+30 | Conservé tel quel (déjà directionnel) — ajout scale léger |
| SectionTitle | fade-up (y:20) | fade-up + tracking-letter reveal (clip-path ou scale subtle) |

### Détection tactile et `prefers-reduced-motion`

**Stratégie**:
- `useReducedMotion()` de Framer Motion pour détecter la préférence accessibilité
- Media query CSS `@media (hover: hover)` ou détection JS `matchMedia('(hover: hover)')` pour distinguer souris vs tactile
- Si `reducedMotion = true` → désactiver tous les effets souris ET simplifier les scroll animations (simple fade, pas de scale/rotation)
- Si tactile (pas de hover) → désactiver tilt/parallaxe, garder les scroll animations
- Le hook `useTilt` retourne des valeurs neutres (aucun effet) si reduced motion ou tactile détecté

### Adaptation thème clair/sombre

Le reflet lumineux utilise:
- **Thème sombre**: `radial-gradient(circle at {x}% {y}%, rgba(255,255,255,0.15), transparent 60%)`
- **Thème clair**: `radial-gradient(circle at {x}% {y}%, rgba(255,255,255,0.25), transparent 60%)`

L'adaptation se fait via les CSS custom properties existantes ou via `useTheme()` de `next-themes`.

## Complexity Tracking

> Aucune violation détectée — section non applicable.
