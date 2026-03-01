# Research: Élément 3D Décoratif dans le Hero

**Feature**: `012-hero-3d`
**Date**: 2026-03-01

---

## R-001: Choix de la bibliothèque 3D

**Decision**: `@react-three/fiber@9` (R3F) + `three` (peer dep) — sans `@react-three/drei`.

**Rationale**:
- R3F v9 est conçu pour React 19 (version actuelle du projet) — compatibilité confirmée
- Pour un icosaèdre avec éclairage simple, `drei` n'est pas nécessaire : `<icosahedronGeometry>`, `<meshStandardMaterial>`, `<ambientLight>`, `<pointLight>` sont disponibles nativement via R3F + three
- Éviter `drei` réduit le bundle à ~406 KB gzippé total (R3F ~236 KB + three ~170 KB) vs ~500+ KB avec drei
- Bundle entièrement lazy-loaded (next/dynamic ssr:false) → aucun impact sur LCP/FCP
- `@react-three/drei` peut être ajouté ultérieurement si besoin d'effets avancés

**Alternatives considérées**:
- **Babylon.js** : beaucoup plus lourd (~800 KB gzippé), pas intégré à React nativement
- **Three.js brut (sans R3F)** : intégration manuelle dans useEffect, gestion du cycle de vie plus complexe
- **Spline (@splinetool/react-spline)** : nécessite un asset externe, dépendance externe
- **Canvas 2D custom** : ne donne pas un vrai rendu 3D

---

## R-002: Forme géométrique retenue

**Decision**: **Icosaèdre** (`icosahedronGeometry args={[1.5, 1]}`) — 20 faces, détail niveau 1.

**Rationale**:
- L'icosaèdre est la forme la plus "tech/géométrique" — angulaire, symétrique, reconnaissable
- `detail: 1` = légère subdivision (80 faces) → aspect plus sphérique que le niveau 0 brut (20 faces) mais reste performant
- Material : `meshStandardMaterial` avec `opacity: 0.35`, `transparent: true`, `roughness: 0.4`, `metalness: 0.6` → apparence métallique translucide
- Rotation continue : `rotation.x += delta * 0.3`, `rotation.y += delta * 0.5` dans `useFrame`

**Alternatives considérées**:
- **Torus** : plus de vertices, aspect "donut" moins tech
- **Octaèdre** : trop simple (8 faces), manque de profondeur visuelle
- **TorusKnot** : trop complexe visuellement pour un fond discret

---

## R-003: Lazy loading et SSR Next.js App Router

**Decision**: `next/dynamic(() => import("…"), { ssr: false })` depuis `HeroSection.tsx` (déjà un composant `"use client"`).

**Rationale**:
- `HeroSection.tsx` est déjà `"use client"` → on peut appeler `dynamic()` directement sans wrapper intermédiaire
- Canvas API et WebGL n'existent pas côté serveur → `ssr: false` obligatoire
- Le chunk R3F + three.js (~406 KB gzippé) est séparé et chargé après la page initiale → LCP/FCP non affectés
- Pattern identique à `ParticlesBackground` déjà en place dans le projet

**Pattern** :
```tsx
const Hero3DObject = dynamic(
  () => import("@/components/shared/Hero3DObject").then((m) => ({ default: m.Hero3DObject })),
  { ssr: false }
)
```

---

## R-004: Animation — rotation continue + tilt souris

**Decision**: Groupe parent (tilt souris) + mesh enfant (rotation continue) — deux objets séparés, pas de conflit.

**Rationale**:
- Combiner rotation continue (`rotation.y += delta * 0.5`) et tilt souris sur le même objet crée un conflit : l'un écrase l'autre
- Solution propre : outer `<group ref={groupRef}>` pour le tilt souris, inner `<mesh ref={meshRef}>` pour la rotation continue
- `state.pointer` de R3F donne la position de la souris normalisée (-1 à 1) relative au viewport — évite de passer des refs de l'extérieur
- Lerp manuel (sans `maath`) pour le tilt : `groupRef.current.rotation.x += (target - current) * 0.05` → smooth, 0 dépendance supplémentaire

**Pattern useFrame** :
```tsx
useFrame((state, delta) => {
  if (!meshRef.current || !groupRef.current) return
  // Rotation continue sur le mesh
  meshRef.current.rotation.x += delta * 0.3
  meshRef.current.rotation.y += delta * 0.5
  // Tilt souris (lerp) sur le groupe parent — max ~20° (0.35 rad)
  groupRef.current.rotation.x +=
    (state.pointer.y * 0.35 - groupRef.current.rotation.x) * 0.05
  groupRef.current.rotation.y +=
    (state.pointer.x * 0.35 - groupRef.current.rotation.y) * 0.05
})
```

---

## R-005: Désactivation mobile, reduced-motion, et fallback WebGL

**Decision**: Guard triple dans `useEffect` — `(hover: hover) and (pointer: fine)` + `useReducedMotion()` + détection WebGL native.

**Rationale**:
- Même pattern que `ParticlesBackground` et `useMouseParallax` pour la cohérence
- Ajout d'une vérification WebGL explicite (FR-010) : créer un canvas temporaire et tenter `getContext("webgl")` → `setCanRender(false)` si WebGL indisponible
- `useReducedMotion()` de Framer Motion — déjà dans le projet
- Résultat : si WebGL inactif → composant retourne `null` silencieusement

**Pattern** :
```tsx
useEffect(() => {
  const hasWebGL = (() => {
    try {
      const c = document.createElement("canvas")
      return !!(window.WebGLRenderingContext &&
        (c.getContext("webgl") || c.getContext("experimental-webgl")))
    } catch { return false }
  })()
  const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches
  setCanRender(hasWebGL && isDesktop)
}, [])

if (!canRender || reducedMotion) return null
```

---

## R-006: Paramètres Canvas (dpr, antialiasing)

**Decision**: `dpr={[1, 2]}`, `gl={{ antialias: false, alpha: true }}`.

**Rationale**:
- `dpr={[1, 2]}` : cap à 2× sur Retina — évite le surcoût GPU des écrans 3×/4× sur un élément purement décoratif
- `antialias: false` : gain GPU significatif pour un fond — les bords légèrement aliasés sont imperceptibles à faible opacité
- `alpha: true` : fond transparent du canvas → intégration seamless avec le fond Hero existant (blobs, particules)

---

## R-007: Positionnement dans le Hero

**Decision**: `absolute right-0 top-0 -z-10 h-[500px] w-[500px] pointer-events-none aria-hidden`.

**Rationale**:
- La section Hero a `relative overflow-hidden` → un div `absolute right-0 top-0` se positionne dans le coin droit
- `-z-10` identique aux background blobs → icosaèdre derrière tout le contenu Hero
- `pointer-events-none` → aucun clic capté par l'objet 3D (FR-006)
- `aria-hidden` → élément décoratif, invisible pour les lecteurs d'écran
- 500×500px : taille suffisante pour être visible sans déborder visuellement sur le contenu

---

## R-008: Adaptation au thème

**Decision**: `useTheme()` + couleurs hex fixes approximant les tokens oklch du projet.

**Rationale**:
- Identique à la décision de `ParticlesBackground` (R-004 de la feature 011)
- three.js `meshStandardMaterial` accepte hex — pas oklch
- Dark : `#8875e8` (violet clair) | Light : `#6655cc` (violet foncé)
- Opacité 0.35 → subtil sur fond clair comme sombre

---

## Résumé des décisions

| Sujet | Décision |
|-------|----------|
| Bibliothèque | `@react-three/fiber@9` + `three` (sans drei) |
| Bundle | ~406 KB gzippé, lazy-loaded — impact LCP nul |
| SSR | `next/dynamic({ ssr: false })` depuis HeroSection.tsx |
| Forme | Icosaèdre detail:1, opacity 0.35, metalness 0.6 |
| Animation | `useFrame` — outer group (tilt souris), inner mesh (rotation continue) |
| Mouse tilt | Lerp manuel, max 0.35 rad (~20°), via `state.pointer` |
| Mobile | `matchMedia("(hover: hover) and (pointer: fine)")` → retourne null |
| WebGL fallback | Détection WebGL via canvas temporaire → retourne null |
| Reduced motion | `useReducedMotion()` → retourne null |
| Canvas | `dpr={[1,2]}`, `antialias: false`, `alpha: true` |
| Positionnement | `absolute right-0 top-0 -z-10 h-[500px] w-[500px] pointer-events-none` |
| Thème | `useTheme()` + hex dark `#8875e8` / light `#6655cc` |
| Nouveaux fichiers | `components/shared/Hero3DObject.tsx` |
| Fichiers modifiés | `components/sections/HeroSection.tsx` |
| TypeScript | `@types/three` (devDependency) |
