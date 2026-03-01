# Tasks: Fond Particulaire Animé (Hero)

**Input**: Design documents from `/specs/011-hero-particles/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, quickstart.md ✅

**Organization**: Nouvelle dépendance + 1 nouveau composant + 1 modification légère. 8 tâches.

---

## Phase 1: Setup

**Purpose**: Installer les packages nécessaires avant toute implémentation.

- [x] T001 Installer `@tsparticles/react` et `@tsparticles/slim` via `npm install @tsparticles/react @tsparticles/slim` à la racine du projet

**Checkpoint**: `package.json` contient les deux nouvelles entrées, `node_modules/@tsparticles/` existe.

---

## Phase 2: Foundational (Prerequisite Component Shell)

**Purpose**: Créer la structure du composant `ParticlesBackground` avec l'initialisation du moteur — bloquant avant les user stories.

**⚠️ CRITIQUE** : T001 doit être terminé avant T002.

- [x] T002 Créer `components/shared/ParticlesBackground.tsx` avec `"use client"`, tous les imports (`@tsparticles/react`, `@tsparticles/slim`, `next-themes`, `framer-motion`, `@tsparticles/engine`), `useState(false)` pour `engineReady`, `useEffect` appelant `initParticlesEngine(async (engine: Engine) => { await loadSlim(engine) }).then(() => setEngineReady(true))`, et `if (!engineReady) return null`

**Checkpoint**: Le fichier compile sans erreur TypeScript, le moteur s'initialise côté client.

---

## Phase 3: User Story 1 — Particules visibles dans la section Hero (P1) 🎯 MVP

**Goal**: Des particules flottantes avec lignes de connexion sont visibles dans le fond du Hero sur desktop, adaptées au thème clair/sombre.

**Independent Test**: Ouvrir le portfolio sur desktop → particules visibles dans le fond du Hero → texte et boutons lisibles par-dessus.

- [x] T003 [US1] Ajouter dans `components/shared/ParticlesBackground.tsx` : `useTheme()` + `resolvedTheme`, couleur `color = resolvedTheme === "dark" ? "#8875e8" : "#6655cc"`, options complètes (`background.color.value:"transparent"`, `particles.color.value:color`, `links(enable:true, color, distance:130, opacity:0.3, width:1)`, `move(enable:true, speed:0.6, direction:"none", random:true, outModes:{default:"bounce"})`, `number(value:45, density:{enable:true,area:800})`, `opacity({min:0.2,max:0.5})`, `size({min:1,max:2.5})`, `detectRetina:false`, `fpsLimit:60`) et rendre `<Particles id="hero-particles" className="pointer-events-none absolute inset-0 -z-10" options={options} />`
- [x] T004 [US1] Ajouter dans `components/sections/HeroSection.tsx` : import `dynamic` de `"next/dynamic"`, constante `const ParticlesBackground = dynamic(() => import("@/components/shared/ParticlesBackground").then((m) => ({ default: m.ParticlesBackground })), { ssr: false })`, et rendre `<ParticlesBackground />` à l'intérieur du `<section>` après les deux blobs et avant le main content `<div>`

**Checkpoint**: US1 complète et testable — particules visibles, flottement lent, lignes de connexion, couleur thème adaptée.

---

## Phase 4: User Story 2 — Interactivité souris (P2)

**Goal**: Les particules s'écartent du curseur lorsque la souris se déplace dans le Hero.

**Independent Test**: Déplacer la souris lentement sur le Hero → particules proches s'écartent du curseur dans un rayon de ~100 px.

- [x] T005 [US2] Ajouter le bloc `interactivity` aux options dans `components/shared/ParticlesBackground.tsx` : `interactivity: { events: { onHover: { enable: true, mode: "repulse" }, resize: { enable: true } }, modes: { repulse: { distance: 100, duration: 0.4 } } }` (insérer dans l'objet `options` de type `ISourceOptions` après `detectRetina` et `fpsLimit`)

**Checkpoint**: Hover sur le Hero → particules s'écartent. Redimensionnement → canvas s'adapte.

---

## Phase 5: User Story 3 — Accessibilité et performance (P3)

**Goal**: Particules désactivées automatiquement sur mobile (touch device) et avec `prefers-reduced-motion`.

**Independent Test**: Activer prefers-reduced-motion → pas de particules. Ouvrir sur mobile → pas de particules.

- [x] T006 [US3] Ajouter dans `components/shared/ParticlesBackground.tsx` : `const reducedMotion = useReducedMotion()` (framer-motion), `const [canHover, setCanHover] = useState(false)` avec `useEffect(() => { setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches) }, [])`, et remplacer le guard existant par `if (!engineReady || !canHover || reducedMotion) return null`

**Checkpoint**: Sur mobile et avec prefers-reduced-motion, `ParticlesBackground` retourne `null` sans erreur.

---

## Phase 6: Polish

- [x] T007 Vérifier TypeScript strict — `npx tsc --noEmit` sans erreur
- [x] T008 Valider les 14 smoke tests de `specs/011-hero-particles/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)** : Aucune dépendance — commencer immédiatement
- **Foundational (Phase 2)** : Dépend de T001 (packages installés)
- **US1 (Phase 3)** : Dépend de T002 (composant shell créé)
- **US2 (Phase 4)** : Dépend de T003 + T004 (composant avec options de base)
- **US3 (Phase 5)** : Dépend de T002 (peut s'appliquer à tout moment après le shell)
- **Polish (Phase 6)** : Dépend de toutes les phases précédentes

### Ordre strict des tâches

```
T001 → T002 → T003 → T004 → T005 → T006 → T007 → T008
```

T003–T006 modifient les mêmes fichiers de façon cumulative — exécution séquentielle.

T007 et T008 sont indépendants entre eux :

```
T006 → T007 [P]
     → T008 [P]
```

---

## Parallel Example

```bash
# T001 peut démarrer immédiatement (installation npm)
# T002 attend T001

# Une fois T006 terminé, T007 et T008 peuvent s'exécuter en parallèle :
Task: "npx tsc --noEmit"
Task: "Valider smoke tests quickstart.md"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Terminer **Phase 1** : T001 (npm install)
2. Terminer **Phase 2** : T002 (shell composant)
3. Terminer **Phase 3** : T003 + T004 (particules visibles + intégration Hero)
4. **VALIDER** : particules dans le Hero, couleur thème, lisibilité du contenu
5. Continuer avec US2 (interactivité) et US3 (accessibilité) si MVP validé

### Incremental Delivery

1. T001 → packages disponibles
2. T002 → shell prêt
3. T003 + T004 → Hero avec particules (MVP ✅)
4. T005 → interactivité souris ajoutée
5. T006 → mobile + reduced-motion protégés
6. T007 + T008 → qualité validée, prêt pour merge
