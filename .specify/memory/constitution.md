<!--
  Sync Impact Report
  ===================
  Version change: 1.0.0 → 1.1.0
  Type: MINOR — Ajout des liens GitHub, LinkedIn et de la photo officielle
  dans le Principe IV (Intégrité du Contenu).

  Modified principles:
    - "IV. Intégrité du Contenu" → contenu enrichi (liens réels + photo)

  Added sections:
    - (none)

  Removed sections:
    - (none)

  Templates requiring updates:
    - .specify/templates/plan-template.md ✅ no update needed
    - .specify/templates/spec-template.md ✅ no update needed
    - .specify/templates/tasks-template.md ✅ no update needed

  Follow-up TODOs:
    - Copier la photo dans le dossier public/ du projet lors de
      l'implémentation (source locale fournie).
-->

# Constitution — Portfolio de Brice GNANAGO

> Ces principes sont non-négociables. Tout agent IA DOIT les respecter
> en permanence, quelle que soit la tâche demandée.

## Core Principles

### I. Stack Technique Imposée

- **Framework** : Next.js 14+ (App Router)
- **Langage** : TypeScript strict (no `any`, no implicit `any`)
- **Styling** : Tailwind CSS uniquement — pas de CSS externe, pas de styled-components
- **UI Components** : shadcn/ui pour les composants réutilisables
- **Animations** : Framer Motion pour les transitions et micro-interactions
- **Icons** : Lucide React
- **Fonts** : Google Fonts via `next/font` (jamais de CDN externe)
- **Formulaire de contact** : React Hook Form + Zod
- **Déploiement cible** : Vercel (gratuit)

### II. Architecture Imposée

- **Monorepo simple** : tout dans un seul dépôt Next.js
- **App Router** : utiliser exclusivement le système de routing de Next.js 14
- **Composants** : architecture `components/ui/` (primitives) + `components/sections/` (blocs de page)
- **Data** : les données du portfolio (projets, compétences, expériences) sont dans `/data/*.ts` — pas de CMS, pas de base de données
- **Images** : `next/image` obligatoire pour toutes les images
- **SEO** : métadonnées complètes via `generateMetadata()` sur chaque page
- **Performance** : Lighthouse score > 90 sur toutes les métriques

### III. Design et UX

- **Design system** : dark theme par défaut avec possibilité de light mode (toggle)
- **Responsive** : mobile-first, breakpoints Tailwind standard (sm, md, lg, xl)
- **Accessibilité** : attributs ARIA sur tous les éléments interactifs, contraste suffisant
- **Langue** : interface en **français** (contenu) + code en anglais (variables, fonctions)
- **Typographie** : une police display distinctive pour les titres, une police lisible pour le corps
- **Animations** : subtiles et performantes — pas d'animation qui bloque l'UX ou ralentit le chargement
- **Pas de spinner infini** : tout le contenu DOIT être accessible rapidement

### IV. Intégrité du Contenu

- **Aucune donnée fictive** : utiliser uniquement les vraies informations du CV de Brice
- **Aucun placeholder** : pas de "Lorem ipsum", pas de "Coming soon" sans justification
- **Projets réels uniquement** : les 3 projets documentés (Ticket System, QR Order System, ZoomStudent) + les expériences CNPS/MONBOLIDE/EBURTIS
- **Contact réel** : email `gnanagobrice@gmail.com`, téléphone `(+225) 0778127421`
- **GitHub** : `https://github.com/Bricegnanago` — lien vérifié et officiel
- **LinkedIn** : `https://www.linkedin.com/in/aime-brice-cesar-gnanago-7b908a157` — lien vérifié et officiel
- **Photo officielle** : source locale `c:\Users\Utilisateur\OneDrive\Documents\DOCUMENTS_RP\BRICE\AIME BRICE CESAR GNANAGO.jpeg` — DOIT être copiée dans `public/` et servie via `next/image`
- **Ne pas inventer** d'URL de démo ou d'autres informations personnelles non fournies — laisser des placeholders clairs marqués `[À COMPLÉTER]`

### V. Qualité du Code

- **Pas de `console.log`** en production
- **Pas de code commenté** laissé dans les fichiers finaux
- **Imports organisés** : React, next, libs externes, composants internes, types, styles
- **Nommage** : PascalCase pour les composants, camelCase pour les fonctions/variables, SCREAMING_SNAKE pour les constantes
- **Un composant = un fichier** (sauf exceptions justifiées)
- **Chaque composant** DOIT avoir ses propres types TypeScript définis

## Contraintes et Interdictions

Les actions suivantes sont strictement interdites pour tout agent IA :

- Créer une base de données ou un backend
- Ajouter un CMS (Sanity, Contentful, etc.)
- Utiliser des librairies CSS supplémentaires (Bootstrap, Material UI, Chakra)
- Générer du contenu inventé sur Brice
- Créer des pages de blog ou de tutoriels
- Utiliser des `useEffect` inutiles
- Sur-ingénierer la solution — garder ça simple et maintenable

## Workflow de Développement

- Tout développement DOIT respecter la stack définie au Principe I sans exception
- Les données du portfolio DOIVENT être modifiées uniquement dans les fichiers `/data/*.ts`
- Chaque composant créé DOIT suivre l'architecture `components/ui/` ou `components/sections/` (Principe II)
- Tout composant DOIT être responsive mobile-first avant d'être considéré comme terminé (Principe III)
- Aucun contenu ne DOIT être mergé sans vérification de son authenticité par rapport au CV de Brice (Principe IV)
- Le code DOIT passer les règles de qualité (Principe V) avant toute livraison

## Governance

- Cette constitution a autorité sur toutes les autres pratiques du projet
- Tout amendement DOIT être documenté, justifié et versionné dans ce fichier
- Les principes fondamentaux (I à V) ne peuvent être supprimés — uniquement enrichis ou précisés
- Les contraintes et interdictions peuvent être ajustées si un besoin réel et justifié se présente
- Tout agent IA DOIT vérifier la conformité de son travail avec cette constitution avant de livrer

**Version**: 1.1.0 | **Ratified**: 2026-02-17 | **Last Amended**: 2026-02-18
