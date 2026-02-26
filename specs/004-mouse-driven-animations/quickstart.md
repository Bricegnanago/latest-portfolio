# Quickstart: 004 — Animations réactives à la souris

## Ordre d'implémentation

### Étape 1 — Hook `useTilt` + Composant `TiltCard`

**Fichiers à créer**:
- `hooks/useTilt.ts`
- `components/shared/TiltCard.tsx`

**Dépendances**: Aucune (Framer Motion déjà installé)

**Test rapide**: Importer `TiltCard` dans `SkillsSection` autour d'une `CategoryCard` et vérifier l'effet tilt au survol souris.

---

### Étape 2 — Intégration `TiltCard` dans les composants existants

**Fichiers à modifier**:
- `components/shared/ProjectCard.tsx` — envelopper le `<Card>` avec `<TiltCard>`
- `components/sections/SkillsSection.tsx` — envelopper le `CategoryCard` avec `<TiltCard>`

**Note**: `ExperienceCard` a un style spécifique (`border-l-4`) qui peut nécessiter un ajustement pour le tilt. Évaluer si le tilt convient à cette carte ou si seul le reflet lumineux est pertinent.

---

### Étape 3 — Hook `useMouseParallax` + Intégration héro

**Fichiers à créer**:
- `hooks/useMouseParallax.ts`

**Fichiers à modifier**:
- `components/sections/HeroSection.tsx` — appliquer l'effet parallaxe aux éléments texte

**Test rapide**: Déplacer la souris lentement dans la section héro et vérifier que le titre bouge dans la direction opposée.

---

### Étape 4 — Animations de défilement enrichies

**Fichiers à modifier**:
- `components/sections/AboutSection.tsx` — enrichir variants (ajout scale)
- `components/sections/SkillsSection.tsx` — enrichir variants items
- `components/shared/ProjectCard.tsx` — enrichir variants scroll
- `components/shared/ExperienceCard.tsx` — enrichir variants (ajout scale léger)

**Test rapide**: Recharger la page et défiler lentement vers le bas — vérifier que les animations sont plus expressives tout en restant subtiles.

---

### Étape 5 — Accessibilité et appareils tactiles

**Fichiers à modifier**:
- `hooks/useTilt.ts` — ajouter détection `prefers-reduced-motion` + `(hover: hover)`
- `hooks/useMouseParallax.ts` — même traitement
- Tous les composants avec scroll enrichi — simplifier les variants si `reducedMotion`

**Test rapide**:
1. Activer `prefers-reduced-motion: reduce` dans les DevTools → vérifier que les tilt/parallaxe sont désactivés
2. Simuler un appareil tactile dans les DevTools → vérifier que les effets souris n'apparaissent pas

---

### Étape 6 — Adaptation thème clair/sombre

**Fichiers à vérifier**:
- `components/shared/TiltCard.tsx` — vérifier que le reflet lumineux est correct en light mode et dark mode

**Test rapide**: Basculer le thème avec le toggle → vérifier que l'intensité du reflet est adaptée.

---

## Vérifications finales

- [ ] Tilt 3D fluide sur ProjectCard, CategoryCard
- [ ] Reflet lumineux suit le curseur, disparaît doucement en sortie
- [ ] Parallaxe héro multicouche réactif à la souris
- [ ] Animations de défilement enrichies (scale + fade + translate)
- [ ] `prefers-reduced-motion` respecté (aucun effet avancé)
- [ ] Appareils tactiles : pas d'effet souris
- [ ] Performance : 60 fps constant (vérifier dans DevTools Performance)
- [ ] Dark mode et light mode : reflet lumineux adapté
- [ ] Mobile responsive : pas de layout cassé
