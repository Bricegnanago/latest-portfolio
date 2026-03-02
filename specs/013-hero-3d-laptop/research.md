# Research: Laptop 3D Tournant dans le Hero

**Feature**: `013-hero-3d-laptop`
**Date**: 2026-03-02

---

## R-001: Approche constructive — procédurale vs modèle GLB

**Decision**: **Laptop procédural** — construit entièrement à partir de primitives `BoxGeometry` de three.js, sans fichier asset externe.

**Rationale**:
- L'utilisateur a explicitement demandé une « Version 3D light » — zéro fichier à télécharger = 0 KB d'asset
- `@react-three/fiber` et `three` sont **déjà installés** (feature 012) — aucune nouvelle dépendance
- Un laptop reconnaissable peut être construit avec 3 boîtes : base (keyboard) + screen body + screen face
- Personnalisation de couleur triviale (prop `color` directement sur `meshStandardMaterial`)
- Chargement instantané, pas de Suspense/fallback nécessaire, pas de glitch au premier render
- Pas de `@react-three/drei` nécessaire — évite ~100 KB gzippé supplémentaire

**Alternative rejetée — modèle GLB externe**:
- Nécessite de sourcer un fichier CC0 (Poly Pizza, Sketchfab), l'optimiser (gltfpack), le placer dans `public/models/`
- Ajoute `@react-three/drei` comme dépendance pour `useGLTF`
- Requiert Suspense + fallback null + gestion d'erreur de chargement
- Poids minimum réaliste : 40–80 KB après compression meshopt + gzip
- Incompatible avec « light » quand l'alternative procédurale est 0 KB

---

## R-002: Géométrie du laptop procédural

**Decision**: 3 meshes imbriqués — base (keyboard body), screen body, screen face (emissive).

**Rationale**:
- La combinaison base + écran incliné est immédiatement reconnaissable comme laptop
- L'écran ouvert à ~120° (rotation.x = 1.1 rad depuis l'axe du charnière) montre à la fois le clavier et l'écran
- Une face avant de l'écran avec `emissiveIntensity` suggère un écran allumé
- Structure de groupe pour découpler auto-rotation et tilt souris (identique à feature 012)

**Géométrie** :
```
Outer group (tilt souris)
└── Inner group (auto-rotation Y + inclinaison initiale)
    ├── Base mesh: BoxGeometry(2.4, 0.1, 1.6) à y=0
    └── Screen group pivot: position=[0, 0.05, -0.8]
        └── Screen group rotation: rotation.x = 1.1 rad (~63° vers arrière)
            ├── Screen body: BoxGeometry(2.3, 1.4, 0.08) à y=0.72
            └── Screen face: BoxGeometry(2.1, 1.2, 0.01) à y=0.72, z=0.045
                (emissive, opacity 0.2 — suggère un écran allumé)
```

**Rotation initiale du groupe inner** : `rotation={[-0.2, 0.3, 0.1]}` → inclinaison dynamique dès l'ouverture de la page.

**Auto-rotation** : Y uniquement (`innerRef.current.rotation.y += delta * 0.4`) → la rotation Y permet de voir le laptop sous tous les angles (face, côté, dos) de façon naturelle.

---

## R-003: Animation — rotation et tilt souris

**Decision**: Identique à feature 012 — outer group pour tilt souris (lerp), inner group pour rotation continue (delta).

**Rationale**:
- Pattern établi et validé dans feature 012
- Rotation Y uniquement pour le laptop (vs X+Y pour l'icosaèdre) : tourne sur l'axe vertical → très naturel pour un objet avec un "devant" et un "derrière"
- Tilt souris sur X et Z pour un effet 3D plus naturel (X = haut/bas, Z = légère rotation sur l'axe)
- Max tilt : 0.35 rad (~20°) — identique à 012

**Pattern useFrame** :
```tsx
useFrame((state, delta) => {
  if (!innerRef.current || !groupRef.current) return
  // Auto-rotation Y uniquement
  innerRef.current.rotation.y += delta * 0.4
  // Mouse tilt sur outer group (lerp smooth)
  groupRef.current.rotation.x +=
    (state.pointer.y * 0.35 - groupRef.current.rotation.x) * 0.05
  groupRef.current.rotation.z +=
    (-state.pointer.x * 0.2 - groupRef.current.rotation.z) * 0.05
})
```

---

## R-004: Dépendances — aucune nouvelle dépendance nécessaire

**Decision**: Utiliser uniquement `@react-three/fiber` et `three` déjà installés par feature 012.

**Rationale**:
- `BoxGeometry`, `meshStandardMaterial`, `Canvas`, `useFrame` → tous dans `@react-three/fiber` + `three`
- `@react-three/drei` serait nécessaire uniquement pour `useGLTF` (modèle GLB) — non retenu
- Imports TypeScript : `type { Group, Mesh }` depuis `three` (idem 012)

---

## R-005: Guards, SSR, et lazy loading

**Decision**: Pattern identique à 012 — `next/dynamic({ ssr: false })` + triple guard (WebGL + desktop + reducedMotion).

**Rationale**:
- WebGL detection dans `useEffect`, matchMedia `(hover: hover) and (pointer: fine)`, `useReducedMotion()`
- Pas de GLB = pas de Suspense needed → code encore plus simple que si on utilisait useGLTF
- `next/dynamic({ ssr: false })` : le Canvas R3F ne doit pas s'exécuter côté serveur

---

## R-006: Adaptation au thème et rendu visuel

**Decision**: Couleurs hex fixes via `useTheme()` — identique à 012. Matériau metallic translucide.

**Rationale**:
- Dark : `#8875e8` (violet clair) | Light : `#6655cc` (violet foncé)
- `meshStandardMaterial` avec `opacity: 0.45`, `roughness: 0.3`, `metalness: 0.7` → rendu métallique translucide
- La face de l'écran : `emissiveIntensity: 0.3` → suggestion d'écran allumé
- Camera : `position={[0, 1.5, 5]}`, `fov={40}` → angle légèrement surplombant qui montre base + écran

---

## R-007: Positionnement et intégration dans HeroSection

**Decision**: Remplace `<Hero3DObject />` (012) dans `HeroSection.tsx` — même div container `absolute right-0 top-0 -z-10 h-[500px] w-[500px]`.

**Rationale**:
- Feature 013 est une **alternative** à feature 012, pas un ajout cumulatif
- Même classe CSS container → déplacement vers l'intégration nul
- `pointer-events-none` et `aria-hidden` → identiques à 012

---

## Résumé des décisions

| Sujet | Décision |
|-------|----------|
| Approche 3D | Procédurale — BoxGeometry (0 KB d'asset) |
| Nouvelles dépendances | Aucune — R3F + three déjà installés |
| Géométrie | Base box + screen box + screen emissive face |
| Rotation | Y uniquement (delta), inclinaison initiale [-0.2, 0.3, 0.1] |
| Mouse tilt | Outer group lerp sur X + Z (max 0.35 rad) |
| Guards | Identiques à 012 (WebGL + desktop + reducedMotion) |
| SSR | `next/dynamic({ ssr: false })` depuis HeroSection.tsx |
| Thème | `useTheme()` + hex dark `#8875e8` / light `#6655cc` |
| Matériau | metalness 0.7, roughness 0.3, opacity 0.45, transparent |
| Screen face | emissive, opacity 0.2, emissiveIntensity 0.3 |
| Camera | `position={[0, 1.5, 5]}`, `fov={40}` |
| Canvas | `dpr={[1,2]}`, `antialias:false`, `alpha:true` — identique à 012 |
| Intégration | Remplace Hero3DObject dans HeroSection.tsx |
| Nouveaux fichiers | `components/shared/Hero3DLaptop.tsx` |
| Fichiers modifiés | `components/sections/HeroSection.tsx` |
