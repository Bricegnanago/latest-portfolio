# Tasks: Correction de la Prévisualisation OG

**Input**: Design documents from `/specs/015-fix-og-preview/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, quickstart.md ✅

**Organization**: 0 nouvelle dépendance + 1 fichier créé + 1 fichier modifié. 7 tâches.

---

## Phase 1: Setup

**Purpose**: Confirmer la root cause et l'état initial avant toute modification.

- [x] T001 Confirmer que `public/og-image.png` est absent et que `app/layout.tsx` référence bien ce fichier manquant — `ls public/ | grep og` (attendu : aucun résultat) puis `grep "og-image" app/layout.tsx` (attendu : ligne `images: ["/og-image.png"]`)

**Checkpoint**: Root cause confirmée — le fichier `og-image.png` est manquant dans `public/`.

---

## Phase 2: Foundational

*Pas de phase foundationnelle requise — les deux user stories portent sur des fichiers indépendants et peuvent démarrer directement.*

---

## Phase 3: User Story 1 — Image OG visible lors du partage sur les réseaux sociaux (P1) 🎯 MVP

**Goal**: Partager `https://bricegnanago.dev` sur WhatsApp affiche une carte avec image (1200×630 px), titre et description. La 404 sur `/og-image.png` est éliminée.

**Independent Test**: Ouvrir `http://localhost:3000/opengraph-image` → image noir/violet 1200×630 avec "Brice GNANAGO" s'affiche. Vérifier le HTML source de la page → `<meta property="og:image"` présent. Testable seul, sans US2.

- [x] T002 [US1] Créer `app/opengraph-image.tsx` avec `export const runtime = "edge"`, `export const alt = "Brice GNANAGO — Ingénieur Logiciel Full-Stack"`, `export const size = { width: 1200, height: 630 }`, `export const contentType = "image/png"`, et `export default function OgImage()` retournant `new ImageResponse(...)` depuis `"next/og"` avec : fond `#0a0a0a`, barre accent `#8875e8` (80px × 4px), label "Portfolio" (18px, violet, uppercase, letter-spacing 6px), nom "Brice GNANAGO" (80px, blanc, bold), titre "Ingénieur Logiciel Full-Stack" (32px, `#a0a0b0`), badge domaine "bricegnanago.dev" (20px, bordure `#8875e8`, border-radius 4px) — voir code complet dans `specs/015-fix-og-preview/quickstart.md`

- [x] T003 [US1] Modifier `app/layout.tsx` : (a) supprimer la ligne `images: ["/og-image.png"],` du bloc `openGraph` (Next.js détecte automatiquement `app/opengraph-image.tsx`) ; (b) ajouter le bloc `twitter` dans l'objet `metadata` : `twitter: { card: "summary_large_image", title: "Brice GNANAGO — Ingénieur Logiciel Full-Stack", description: "Portfolio de Brice GNANAGO, ingénieur full-stack spécialisé React, Node.js, AWS et DevOps." }`

**Checkpoint**: US1 complète — `GET /opengraph-image` retourne une image PNG 1200×630. La page HTML n'a plus de référence à `/og-image.png`. `og:image` et `twitter:card` sont présents dans le HTML source.

---

## Phase 4: User Story 2 — Favicon cohérent dans les navigateurs (P2)

**Goal**: Confirmer que le favicon s'affiche correctement dans les navigateurs après les changements récents de l'utilisateur. Aucune modification de code n'est attendue — c'est une vérification.

**Independent Test**: Ouvrir le portfolio dans Chrome, Firefox et Safari → favicon visible dans l'onglet. Vérifier que tous les fichiers déclarés dans `layout.tsx` existent dans `public/`.

- [x] T004 [US2] Vérifier la cohérence des déclarations favicon dans `app/layout.tsx` avec les fichiers présents dans `public/` : exécuter `ls public/ | grep -E "favicon|apple-touch"` et confirmer que `favicon.ico`, `favicon-96x96.png`, `favicon.svg`, `apple-touch-icon.png` existent tous. Si un fichier est manquant, le copier depuis `app/` (où se trouvent des doublons) vers `public/`.

**Checkpoint**: Tous les fichiers favicon déclarés dans les métadonnées existent physiquement dans `public/`. Aucune 404 sur les ressources favicon.

---

## Phase 5: Polish

- [x] T005 [P] Vérifier TypeScript strict — `npx tsc --noEmit` sans erreur (valide notamment `app/opengraph-image.tsx`)
- [x] T006 [P] Vérifier le build Next.js — `npm run build` sans erreur (valide la génération Edge Runtime de l'image OG)
- [x] T007 Valider les 8 smoke tests de `specs/015-fix-og-preview/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)** : Aucune dépendance — commencer immédiatement
- **US1 (Phase 3)** : Dépend de T001 (root cause confirmée)
- **US2 (Phase 4)** : Indépendante de US1 — peut démarrer dès T001 terminé
- **Polish (Phase 5)** : Dépend de T002 + T003 + T004

### Ordre et parallélisme

```
T001 → T002 [P] → T005 [P]
     → T003 [P] → T006 [P]
     → T004      → T007
```

T002 et T003 modifient des fichiers différents → parallélisables.
T005 et T006 sont indépendants entre eux → parallélisables.

---

## Parallel Example

```bash
# T002 et T003 peuvent s'exécuter en parallèle (fichiers différents) :
Task: "Créer app/opengraph-image.tsx"
Task: "Modifier app/layout.tsx"

# T005 et T006 peuvent s'exécuter en parallèle une fois T002 + T003 terminés :
Task: "npx tsc --noEmit"
Task: "npm run build"
```

---

## Implementation Strategy

### MVP First (User Story 1 uniquement)

1. Terminer **Phase 1** : T001 (confirmation root cause)
2. Terminer **Phase 3** : T002 + T003 (image OG créée, layout corrigé)
3. **VALIDER** : `localhost:3000/opengraph-image` retourne l'image → HTML source contient `og:image`
4. Déployer sur Vercel → partager sur WhatsApp pour confirmer la correction
5. Continuer avec US2 (vérification favicon) si MVP validé

### Incremental Delivery

1. T001 → root cause confirmée
2. T002 + T003 → US1 ✅ (image OG fonctionnelle, MVP livrable)
3. T004 → US2 ✅ (favicon vérifié)
4. T005 + T006 + T007 → qualité validée, prêt pour merge
