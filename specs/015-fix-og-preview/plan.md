# Implementation Plan: Correction de la Prévisualisation OG

**Branch**: `015-fix-og-preview` | **Date**: 2026-03-03 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/015-fix-og-preview/spec.md`

## Summary

Le fichier `/og-image.png` référencé dans `app/layout.tsx` n'existe pas dans `public/`, ce qui empêche WhatsApp et les autres plateformes sociales d'afficher une image de prévisualisation. La correction consiste à : (1) créer `app/opengraph-image.tsx` utilisant `ImageResponse` de `next/og` pour générer une image OG dynamique aux bonnes dimensions (1200×630 px), (2) nettoyer `layout.tsx` en supprimant le tableau `images` brisé et en ajoutant les métadonnées Twitter Card. Aucune nouvelle dépendance npm.

## Technical Context

**Language/Version**: TypeScript 5.x strict (no `any`)
**Primary Dependencies**: `next/og` (inclus dans Next.js 14, aucune installation)
**Storage**: N/A — génération server-side, aucune donnée persistée
**Testing**: Smoke tests manuels + outil OG en ligne (opengraph.xyz)
**Target Platform**: Web — Next.js 14 App Router, Vercel (Edge Runtime)
**Project Type**: Web application (Next.js monorepo)
**Performance Goals**: Image OG générée < 500 ms, poids < 500 Ko
**Constraints**: Aucune nouvelle dépendance npm, TypeScript strict, respect constitution
**Scale/Scope**: 2 fichiers modifiés / créés

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principe | Statut | Justification |
|----------|--------|---------------|
| I. Stack — TypeScript strict, Next.js | ✅ PASS | `next/og` est natif Next.js 14, aucune lib externe |
| I. Stack — `next/image` obligatoire | ✅ PASS | Pas d'image statique, génération via ImageResponse |
| II. Architecture — App Router | ✅ PASS | `app/opengraph-image.tsx` est la convention App Router |
| II. Pas de CMS / backend | ✅ PASS | Génération côté serveur Vercel Edge, pas de backend |
| III. Responsive / SEO | ✅ PASS | C'est précisément l'objet de cette correction |
| IV. Intégrité du contenu — vraies informations | ✅ PASS | Nom, titre et domaine réels de Brice |
| V. Pas de `console.log`, TypeScript strict | ✅ PASS | À vérifier `npx tsc --noEmit` post-implémentation |
| Interdictions — Sur-ingénierie | ✅ PASS | 1 nouveau fichier minimal, 1 modification ciblée |

**GATE RESULT**: ✅ Toutes les gates passent. Pas de violation.

## Project Structure

### Documentation (this feature)

```text
specs/015-fix-og-preview/
├── plan.md       ✅ Ce fichier
├── research.md   ✅ Decisions techniques
├── quickstart.md ✅ Code complet + smoke tests
└── tasks.md      (généré par /speckit.tasks)
```

*Pas de `data-model.md` ni `contracts/` — aucune entité ni API.*

### Source Code — 2 fichiers

```text
app/
├── opengraph-image.tsx   ← CRÉER (image OG dynamique 1200×630)
└── layout.tsx            ← MODIFIER (supprimer images brisé, ajouter Twitter Card)
```

**Structure Decision**: Convention Next.js App Router — `app/opengraph-image.tsx` est détecté automatiquement et sert l'image à `/opengraph-image`. Aucun autre fichier impacté.
