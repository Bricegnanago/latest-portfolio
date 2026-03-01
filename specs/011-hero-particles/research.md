# Research: Fond Particulaire Animé (Hero)

**Feature**: `011-hero-particles`
**Date**: 2026-02-28

---

## R-001: Choix de la bibliothèque — tsparticles vs alternatives

**Decision**: `@tsparticles/react@3` + `@tsparticles/slim@3`.

**Rationale**:
- Demande explicite de l'utilisateur ("tsparticles ou particles.js")
- `@tsparticles/slim` = bundle allégé (~350–400 KB gzippé) vs bundle complet (~600 KB)
- Chargé en lazy (voir R-002) — n'impacte pas LCP ni FCP
- API v3 stable, maintenée activement, compatible TypeScript strict
- `particles.js` est abandonné (dernier commit 2016) — éliminé d'emblée

**Alternatives considérées**:
- **Canvas custom** (0 dépendance, ~50 lignes) : rejeté car l'utilisateur a demandé une bibliothèque spécialisée; tsparticles offre gratuitement l'interactivité souris, le resize, le fallback retina
- **@tsparticles/engine** + presets isolés : configuration plus complexe, gain de bundle marginal
- **vanta.js** : dépend de THREE.js (~500 KB gzippé supplémentaires) — trop lourd

---

## R-002: Intégration Next.js — lazy loading et no-SSR

**Decision**: `next/dynamic(() => import("…"), { ssr: false })` sur le composant `ParticlesBackground`.

**Rationale**:
- Canvas API n'existe pas côté serveur → `ssr: false` obligatoire
- `next/dynamic` avec `ssr: false` génère un chunk JS séparé chargé après la page initiale → LCP et FCP non affectés
- `initParticlesEngine` s'appelle dans `useEffect` avec `useState(false)` → rendu `null` pendant hydratation, évite les warnings hydration mismatch

**Pattern d'initialisation correct** (TypeScript strict) :
```tsx
const [engineReady, setEngineReady] = useState(false)

useEffect(() => {
  initParticlesEngine(async (engine: Engine) => {
    await loadSlim(engine)
  }).then(() => setEngineReady(true))
}, [])

if (!engineReady) return null
```

---

## R-003: Désactivation sur mobile et prefers-reduced-motion

**Decision**: Guard double — `matchMedia("(hover: hover) and (pointer: fine)")` + `useReducedMotion()` de Framer Motion.

**Rationale**:
- `(hover: hover) and (pointer: fine)` = standard industrie pour détecter desktop avec souris précise (même pattern que `useMouseParallax` existant)
- `useReducedMotion()` déjà utilisé dans le projet (ExperienceCard, HeroSection) — cohérence de code
- Les deux checks se font côté client dans `useEffect` → pas de flash initial

**Pattern** :
```tsx
const reducedMotion = useReducedMotion()
const [canHover, setCanHover] = useState(false)

useEffect(() => {
  setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches)
}, [])

if (!engineReady || !canHover || reducedMotion) return null
```

---

## R-004: Adaptation au thème (dark/light)

**Decision**: `useTheme()` de next-themes + couleurs hexadécimales figées approximant les tokens oklch du projet.

**Rationale**:
- tsparticles accepte hex/rgb mais pas oklch → les CSS custom properties ne sont pas directement lisibles par la lib
- `useTheme()` est déjà dans le projet (ThemeToggle, HeroSection via TiltCard)
- Couleurs calculées depuis les tokens existants :
  - Dark : `oklch(0.65 0.2 260)` ≈ `#8875e8` (violet-cyan clair)
  - Light : `oklch(0.55 0.2 260)` ≈ `#6655cc` (violet-cyan sombre)
- Opacité réduite (0.3–0.5) pour rester subtil sur fond clair comme sombre

**Alternative rejetée**: `getComputedStyle(document.documentElement).getPropertyValue("--primary")` — retourne une valeur oklch() que tsparticles ne sait pas parser; nécessiterait une conversion oklch→hex à runtime (surcharge inutile).

---

## R-005: Configuration des particules pour rester subtiles et performantes

**Decision**: 45 particules max, speed 0.6, liens à distance 130 px, `detectRetina: false`, `fpsLimit: 60`.

**Rationale**:
- 45 particules pour un viewport 1920×1080 = densité légère, cohérente avec "subtil" demandé
- speed 0.6 = dérive très lente, presque atmosphérique
- `detectRetina: false` = économie GPU significative sur écrans haute densité
- `fpsLimit: 60` = cap explicite pour éviter la consommation excessive sur 120Hz+
- Liens à opacité 0.3 = barely visible, connexions fantomatiques

**Config complète** :
```tsx
particles: {
  color: { value: color },
  links: { enable: true, color, distance: 130, opacity: 0.3, width: 1 },
  move: { enable: true, speed: 0.6, direction: "none", random: true, outModes: { default: "bounce" } },
  number: { value: 45, density: { enable: true, area: 800 } },
  opacity: { value: { min: 0.2, max: 0.5 } },
  size: { value: { min: 1, max: 2.5 } },
},
interactivity: {
  events: { onHover: { enable: true, mode: "repulse" }, resize: { enable: true } },
  modes: { repulse: { distance: 100, duration: 0.4 } },
},
detectRetina: false,
fpsLimit: 60,
```

---

## R-006: Positionnement et z-index dans HeroSection

**Decision**: `className="pointer-events-none absolute inset-0 -z-10"` sur le wrapper Particles.

**Rationale**:
- La section Hero a déjà `position: relative` → l'absolute inset-0 couvre exactement la section
- `-z-10` = identique aux background blobs existants → particules en fond derrière tout le contenu
- `pointer-events-none` = les particules ne captent pas les clics/hover du reste du Hero
- Le canvas tsparticles hérite width/height du conteneur → resize automatique OK

---

## Résumé des décisions

| Sujet | Décision |
|-------|----------|
| Bibliothèque | `@tsparticles/react@3` + `@tsparticles/slim@3` |
| Bundle | ~350–400 KB gzippé, lazy-loaded — impact LCP nul |
| SSR | `next/dynamic({ ssr: false })` obligatoire |
| Mobile | `matchMedia("(hover: hover) and (pointer: fine)")` → désactivé |
| Reduced motion | `useReducedMotion()` → désactivé |
| Thème | `useTheme()` + hex approximatifs dark/light |
| Particules | 45 max, speed 0.6, detectRetina false, fpsLimit 60 |
| Z-index | `absolute inset-0 -z-10 pointer-events-none` |
| Nouveaux fichiers | `components/shared/ParticlesBackground.tsx` (nouveau) |
| Fichiers modifiés | `components/sections/HeroSection.tsx` (ajout dynamic import + render) |
