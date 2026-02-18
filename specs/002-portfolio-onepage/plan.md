# Implementation Plan: Portfolio One-Page de Brice GNANAGO

**Branch**: `002-portfolio-onepage` | **Date**: 2026-02-17 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/002-portfolio-onepage/spec.md`

## Summary

Créer un portfolio one-page pour Brice GNANAGO, ingénieur logiciel full-stack. Le site comprend 6 sections (Hero, À propos, Compétences, Expériences, Projets, Contact) avec navigation fixe, scroll spy, thème dark/light, formulaire de contact avec envoi email, animations Framer Motion et optimisation SEO/performance. Toutes les données sont statiques dans des fichiers TypeScript, sans CMS ni base de données.

## Technical Context

**Language/Version**: TypeScript 5.x strict (no `any`) + Next.js 14+ (App Router)
**Primary Dependencies**: React 18, Tailwind CSS 3.4, shadcn/ui, Framer Motion 11, Lucide React, React Hook Form 7, Zod 3, next-themes, Resend, clsx, tailwind-merge, class-variance-authority
**Storage**: Fichiers statiques TypeScript (`/data/*.ts`) — pas de base de données
**Testing**: Lighthouse > 90 (4 catégories), validation responsive manuelle (375px, 768px, 1280px), `tsc --noEmit`
**Target Platform**: Web — déploiement Vercel (gratuit)
**Project Type**: Web application (Next.js single-project)
**Performance Goals**: Lighthouse > 90 sur Performance, Accessibilité, Bonnes pratiques, SEO
**Constraints**: TypeScript strict, pas de CMS, pas de DB, pas de librairies CSS externes, données réelles uniquement, interface en français
**Scale/Scope**: 1 page, 6 sections, ~20 composants, 3 projets, 3 expériences, ~9 catégories de compétences

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principe                     | Statut | Détail                                                                        |
| ---------------------------- | ------ | ----------------------------------------------------------------------------- |
| I. Stack Technique Imposée   | PASS   | Next.js 14+, TS strict, Tailwind, shadcn/ui, Framer Motion, Lucide, RHF+Zod  |
| II. Architecture Imposée     | PASS   | App Router, components/ui/ + sections/, /data/*.ts, next/image, Lighthouse>90 |
| III. Design et UX            | PASS   | Dark default + toggle, mobile-first, ARIA, français, 2 polices, animations    |
| IV. Intégrité du Contenu     | PASS   | Données réelles CV Brice, 3 projets, 3 expériences, vrais contacts           |
| V. Qualité du Code           | PASS   | No console.log, no commented code, imports ordonnés, types par composant      |
| Contraintes et Interdictions | PASS   | Pas de DB, pas de CMS, pas de CSS externe, pas de contenu inventé             |

**Résultat** : PASS — Aucune violation. La route API `/api/contact` est un route handler Next.js (pas un backend séparé), conforme à la constitution.

## Project Structure

### Documentation (this feature)

```text
specs/002-portfolio-onepage/
├── plan.md              # Ce fichier
├── research.md          # Phase 0 — décisions techniques
├── data-model.md        # Phase 1 — modèle de données
├── quickstart.md        # Phase 1 — guide de démarrage
├── contracts/
│   └── contact-api.md   # Phase 1 — contrat API contact
└── checklists/
    └── requirements.md  # Checklist de validation spec
```

### Source Code (repository root)

```text
app/
├── layout.tsx                # Layout racine (fonts, metadata, ThemeProvider)
├── page.tsx                  # Page principale (assemblage des sections)
├── globals.css               # Variables CSS, reset, styles Tailwind
└── api/
    └── contact/
        └── route.ts          # Route handler envoi email (Resend)

components/
├── ui/                       # Composants primitifs (shadcn/ui)
│   ├── button.tsx
│   ├── badge.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── textarea.tsx
│   ├── label.tsx
│   └── toast.tsx
├── sections/                 # Blocs de page (1 par section)
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── SkillsSection.tsx
│   ├── ExperienceSection.tsx
│   ├── ProjectsSection.tsx
│   └── ContactSection.tsx
├── layout/                   # Composants de structure
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ThemeToggle.tsx
└── shared/                   # Composants réutilisables
    ├── SectionTitle.tsx
    ├── ProjectCard.tsx
    ├── ExperienceCard.tsx
    └── SkillBadge.tsx

data/
├── projects.ts               # Données des 3 projets
├── skills.ts                 # Compétences groupées par catégorie
├── experiences.ts            # 3 expériences professionnelles
└── personal.ts               # Infos personnelles (nom, bio, contact)

lib/
├── utils.ts                  # cn() helper (clsx + tailwind-merge)
└── validations.ts            # Schémas Zod (formulaire contact)

hooks/
└── useScrollSpy.ts           # Hook scroll spy (IntersectionObserver)

types/
└── index.ts                  # Types globaux (Project, Experience, Skill, etc.)

public/
├── images/
│   └── profile.jpg           # [À COMPLÉTER] Photo de profil
└── og-image.png              # [À COMPLÉTER] Image Open Graph
```

**Structure Decision** : Next.js single-project à la racine (pas de src/). L'App Router de Next.js impose le dossier `app/` pour le routing. Les composants suivent la convention constitution : `components/ui/` (primitives shadcn) + `components/sections/` (blocs de page) + `components/layout/` (structure) + `components/shared/` (réutilisables).

## Complexity Tracking

> Aucune violation de la constitution — section non applicable.
