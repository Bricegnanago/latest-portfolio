# my-portefolio Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-02-17

## Active Technologies
- TypeScript 5.x strict (no `any`) + Next.js 14+ (App Router) + React 18, Tailwind CSS 3.4, shadcn/ui, Framer Motion 11, Lucide React, React Hook Form 7, Zod 3, next-themes, Resend, clsx, tailwind-merge, class-variance-authority (002-portfolio-onepage)
- Fichiers statiques TypeScript (`/data/*.ts`) — pas de base de données (002-portfolio-onepage)

- Markdown (documentation uniquement) + Aucune — modification de fichier Markdown (001-enrich-constitution)

## Project Structure

```text
src/
tests/
```

## Commands

# Add commands for Markdown (documentation uniquement)

## Code Style

Markdown (documentation uniquement): Follow standard conventions

## Recent Changes
- 002-portfolio-onepage: Added TypeScript 5.x strict (no `any`) + Next.js 14+ (App Router) + React 18, Tailwind CSS 3.4, shadcn/ui, Framer Motion 11, Lucide React, React Hook Form 7, Zod 3, next-themes, Resend, clsx, tailwind-merge, class-variance-authority

- 001-enrich-constitution: Added Markdown (documentation uniquement) + Aucune — modification de fichier Markdown

<!-- MANUAL ADDITIONS START -->
## 012-hero-3d

- Nouvelle dépendance : `@react-three/fiber@9` + `three` + `@types/three` (devDep)
- Nouveau composant : `components/shared/Hero3DObject.tsx` — Canvas R3F avec icosaèdre animé
- Fichier modifié : `components/sections/HeroSection.tsx` — ajout dynamic import `Hero3DObject`
- Guard triple : `hasWebGL && isDesktop && !reducedMotion` → retourne null si l'une des conditions échoue
- Positionnement : `absolute right-0 top-0 -z-10 pointer-events-none` (derrière tout le contenu Hero)
- Voir [quickstart](specs/012-hero-3d/quickstart.md) pour le code complet et smoke tests

## 003-qr-order-demo-video

- Ajouter `videoUrl?: string` au type `Project` dans `types/index.ts`
- Composant `VideoModal` à créer dans `components/shared/VideoModal.tsx` (shadcn/ui `Dialog` + `<video>` natif)
- `dialog` shadcn/ui **non installé** — à ajouter avant implémentation : `npx shadcn@latest add dialog`
- Vidéo source : `public/images/event_project.mp4` (existant)
- Voir [quickstart](specs/003-qr-order-demo-video/quickstart.md) pour l'ordre d'implémentation
<!-- MANUAL ADDITIONS END -->
