# Tasks: Animated Hero Section

**Input**: Design documents from `/specs/010-animated-hero/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, quickstart.md ✅

**Organization**: Refonte UI — 2 fichiers, ~12 tâches séquentielles (même composant).

---

## Phase 1: Setup

_N/A — stack existante, aucune installation requise (Framer Motion, next/image, Tailwind CSS déjà présents)._

---

## Phase 2: Foundational (Prerequisite CSS)

**Purpose**: Ajouter les utilitaires CSS nécessaires avant que `HeroSection.tsx` puisse les utiliser.

**⚠️ CRITIQUE** : Cette tâche doit être terminée avant toute modification de `HeroSection.tsx`.

- [x] T001 Ajouter `@keyframes hero-bg-pulse` et classe `.hero-bg-blob` dans `app/globals.css` (dans le bloc `@layer utilities` existant, après `.timeline-axis`)

**Checkpoint**: `globals.css` compile sans erreur, classe `.hero-bg-blob` disponible.

---

## Phase 3: User Story 1 — Séquence d'animations d'entrée au chargement (P1) 🎯 MVP

**Goal**: L'intégralité du contenu Hero (nom, titre, bio, CTAs, avatar) s'anime à l'arrivée sur la page selon la séquence définie dans `plan.md`. Layout split desktop fonctionnel.

**Independent Test**: Charger la page → observer la séquence complète en < 3 s → tout le contenu lisible une fois les animations terminées.

- [x] T002 [US1] Réécrire la structure de `components/sections/HeroSection.tsx` : layout `flex flex-col md:flex-row`, `max-w-5xl`, bloc texte (flex-1 gauche), bloc avatar (`shrink-0` droite), `<div aria-hidden className="hero-bg-blob ...">`, `<ArrowDown>` scroll indicator — supprimer les 4 appels `useMouseParallax` existants
- [x] T003 [US1] Implémenter l'animation lettre par lettre sur `personalInfo.name` dans `components/sections/HeroSection.tsx` : `name.split("")` → tableau de `<motion.span>` avec `initial={{ opacity: 0, y: 20, scale: 0.8 }}`, `animate={{ opacity: 1, y: 0, scale: 1 }}`, `transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.2 + index * 0.04 }}`
- [x] T004 [US1] Implémenter slide-up du titre professionnel (delay 1,0 s) et word stagger sur `personalInfo.bio` (`bio.split(" ")` → `<motion.span>` par mot, delay 1,4 s + index × 0,03 s) dans `components/sections/HeroSection.tsx`
- [x] T005 [US1] Implémenter pop animation des boutons CTA (`initial={{ opacity: 0, scale: 0.9 }}`, spring, delay 1,8 s) et avatar `<Image src="/images/profile.jpg" ... priority>` dans `<motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>` dans `components/sections/HeroSection.tsx`

**Checkpoint**: À ce stade, la page affiche le Hero complet avec animations d'entrée et layout split. Smoke tests US1 validables.

---

## Phase 4: User Story 2 — Micro-interactions et interactivité au survol (P2)

**Goal**: Chaque élément interactif (nom, titre, CTA) répond visuellement au survol. L'avatar suit la souris en parallaxe.

**Independent Test**: Survoler nom → glow subtil. Survoler boutons → scale. Déplacer souris → avatar parallaxe.

- [x] T006 [US2] Ajouter `whileHover={{ filter: "drop-shadow(0 0 10px color-mix(in oklch, var(--primary) 70%, transparent))" }}` sur le `<motion.h1>` (nom) et le `<motion.p>` (titre professionnel) dans `components/sections/HeroSection.tsx`
- [x] T007 [US2] Envelopper chaque bouton CTA dans `<motion.div whileHover={{ scale: 1.04 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>` dans `components/sections/HeroSection.tsx` ; ajouter `className="hover:glow-primary"` sur le `<Button>` principal
- [x] T008 [US2] Ajouter `const avatarParallax = useMouseParallax({ strength: 12, inverted: false })` et `style={{ x: avatarParallax.x, y: avatarParallax.y }}` sur le `<motion.div>` englobant l'avatar dans `components/sections/HeroSection.tsx`

**Checkpoint**: Micro-interactions fonctionnelles sur desktop. Smoke tests US2 validables.

---

## Phase 5: User Story 3 — Accessibilité, performance et adaptation mobile (P3)

**Goal**: `prefers-reduced-motion` désactive toutes les animations de mouvement. Mobile affiche un layout colonne sans débordement. LCP optimisé.

**Independent Test**: Activer prefers-reduced-motion → animations de mouvement absentes. Viewport 375 px → layout colonne propre.

- [x] T009 [US3] Appliquer `const prefersReducedMotion = useReducedMotion()` dans `components/sections/HeroSection.tsx` et conditionner toutes les variantes d'animation : letter variants, float avatar (`animate={prefersReducedMotion ? {} : { y: [0,-14,0] }}`), word stagger delays, CTA pop — remplacer par `{ opacity: 0 } → { opacity: 1 }` si `prefersReducedMotion === true`
- [x] T010 [US3] Vérifier dans `components/sections/HeroSection.tsx` : `<Image>` avec `priority` prop, `width={320} height={320}`, `className="rounded-full object-cover w-56 h-56 md:w-72 md:h-72"`, et que le bloc avatar passe bien en dessous du texte sur mobile (`flex-col` → avatar après le bloc texte dans le DOM)

**Checkpoint**: Tous les smoke tests US3 validables (prefers-reduced-motion + mobile).

---

## Phase 6: Polish

- [x] T011 Vérifier TypeScript strict — `npx tsc --noEmit` sans erreur
- [x] T012 Valider le smoke test de `specs/010-animated-hero/quickstart.md` (14 points)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Foundational (Phase 2)** : Aucune dépendance — commencer immédiatement
- **US1 (Phase 3)** : Dépend de T001 (CSS prêt)
- **US2 (Phase 4)** : Dépend de US1 complet (T002–T005) — ajoute des interactions sur les éléments créés
- **US3 (Phase 5)** : Dépend de US1 + US2 complets — applique les guards sur les animations existantes
- **Polish (Phase 6)** : Dépend de toutes les phases précédentes

### Ordre strict des tâches

```
T001 → T002 → T003 → T004 → T005 → T006 → T007 → T008 → T009 → T010 → T011 → T012
```

Toutes les tâches modifient `HeroSection.tsx` de façon cumulative — exécution strictement séquentielle.

### Opportunités parallèles

- **T011** et **T012** peuvent s'exécuter en parallèle (TypeScript check + validation visuelle).
- Les phases US2 et US3 sont indépendantes des autres sections — un second développeur pourrait travailler en parallèle sur d'autres features.

---

## Parallel Example: Phase 3 (US1)

```bash
# Les tâches T002-T005 s'enchaînent sur le même fichier :
# T002: squelette layout (structure, avatar Image, bg blob)
# T003: lettre par lettre sur le nom
# T004: titre slide-up + bio word stagger
# T005: CTA pop + avatar float
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Terminer **Phase 2** : T001 (CSS)
2. Terminer **Phase 3** : T002–T005 (animations d'entrée + layout split)
3. **VALIDER** : séquence d'animation complète, layout desktop/mobile, avatar visible
4. Continuer avec US2 et US3 si le MVP est approuvé

### Incremental Delivery

1. T001 → Foundation CSS
2. T002–T005 → Hero fonctionnel avec animations (MVP ✅)
3. T006–T008 → Micro-interactions ajoutées
4. T009–T010 → Accessibilité et performance solidifiées
5. T011–T012 → Qualité validée, prêt pour merge
