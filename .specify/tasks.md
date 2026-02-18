# Tâches d'implémentation — Portfolio de Brice GNANAGO

> Exécuter les tâches dans l'ordre. Ne pas passer à la suivante sans que la précédente soit validée.
> Respecter la constitution en permanence.

---

## Phase 1 — Initialisation du projet

- [ ] **T01** — Créer le projet Next.js 14 avec TypeScript et Tailwind CSS
  ```bash
  npx create-next-app@latest portfolio --typescript --tailwind --app --src-dir=false --import-alias="@/*"
  ```

- [ ] **T02** — Installer les dépendances
  ```bash
  npm install framer-motion react-hook-form zod @hookform/resolvers lucide-react clsx tailwind-merge class-variance-authority next-themes resend
  ```

- [ ] **T03** — Initialiser shadcn/ui et installer les composants nécessaires
  ```bash
  npx shadcn-ui@latest init
  npx shadcn-ui@latest add button badge card input textarea label toast
  ```

- [ ] **T04** — Configurer la structure de dossiers telle que définie dans le plan technique

- [ ] **T05** — Configurer `tailwind.config.ts` avec les variables CSS du thème dark/light

- [ ] **T06** — Créer `globals.css` avec les variables CSS, le reset et les styles de base

---

## Phase 2 — Données et types

- [ ] **T07** — Créer `types/index.ts` avec les types TypeScript : `Project`, `Experience`, `Skill`, `SkillCategory`, `PersonalInfo`

- [ ] **T08** — Créer `data/personal.ts` avec les infos personnelles de Brice (nom, titre, email, téléphone, bio, localisation, langues, formation, certification)

- [ ] **T09** — Créer `data/skills.ts` avec toutes les compétences groupées par catégorie (9 catégories selon la spec)

- [ ] **T10** — Créer `data/experiences.ts` avec les 3 expériences professionnelles (Barnoin, MONBOLIDE, EBURTIS) avec toutes les bullet points

- [ ] **T11** — Créer `data/projects.ts` avec les 3 projets (Billetterie, QR Order System, ZoomStudent) avec stack, métriques, descriptions

---

## Phase 3 — Layout et navigation

- [ ] **T12** — Créer `hooks/useScrollSpy.ts` (IntersectionObserver pour détecter la section active)

- [ ] **T13** — Créer `components/layout/ThemeToggle.tsx` (bouton dark/light avec next-themes)

- [ ] **T14** — Créer `components/layout/Navbar.tsx` (fixe, liens d'ancre, logo BG, ThemeToggle, scroll spy)

- [ ] **T15** — Créer `components/layout/Footer.tsx` (copyright, liens rapides, icônes sociaux)

- [ ] **T16** — Créer `app/layout.tsx` (ThemeProvider, fonts via next/font, metadata globale, Navbar, Footer)

---

## Phase 4 — Composants partagés

- [ ] **T17** — Créer `lib/utils.ts` avec la fonction `cn()` (clsx + tailwind-merge)

- [ ] **T18** — Créer `lib/validations.ts` avec le schéma Zod pour le formulaire de contact

- [ ] **T19** — Créer `components/shared/SectionTitle.tsx` (titre + sous-titre réutilisable pour chaque section)

- [ ] **T20** — Créer `components/shared/SkillBadge.tsx` (badge visuel pour une compétence)

- [ ] **T21** — Créer `components/shared/ProjectCard.tsx` (card projet avec titre, description, stack badges, métriques, boutons)

- [ ] **T22** — Créer `components/shared/ExperienceCard.tsx` (card expérience pour la timeline)

---

## Phase 5 — Sections de la page

- [ ] **T23** — Créer `components/sections/HeroSection.tsx`
  - Nom, titre, sous-titre, description, 2 CTAs
  - Animation d'entrée staggered avec Framer Motion
  - Indicateur de scroll

- [ ] **T24** — Créer `components/sections/AboutSection.tsx`
  - Photo de profil (composant prêt avec placeholder)
  - Bio, localisation, langues
  - Formation et certification AWS mise en avant

- [ ] **T25** — Créer `components/sections/SkillsSection.tsx`
  - Grille des 9 catégories de compétences
  - Animation au scroll (whileInView + staggerChildren)

- [ ] **T26** — Créer `components/sections/ExperienceSection.tsx`
  - Timeline verticale avec les 3 expériences
  - Animation d'entrée au scroll

- [ ] **T27** — Créer `components/sections/ProjectsSection.tsx`
  - Grille de 3 ProjectCards
  - Animation staggered au scroll

- [ ] **T28** — Créer `components/sections/ContactSection.tsx`
  - Formulaire React Hook Form + Zod
  - Infos de contact directes
  - Liens sociaux avec placeholders

---

## Phase 6 — Page principale et API

- [ ] **T29** — Créer `app/page.tsx` (assemblage de toutes les sections dans l'ordre)

- [ ] **T30** — Créer `app/api/contact/route.ts` (API Route pour l'envoi d'email avec Resend)

---

## Phase 7 — Configuration et déploiement

- [ ] **T31** — Créer `.env.example` avec les variables documentées

- [ ] **T32** — Créer `vercel.json` avec la configuration de déploiement

- [ ] **T33** — Créer `README.md` avec :
  - Instructions d'installation
  - Liste de tous les `[À COMPLÉTER]` (photo, liens GitHub/LinkedIn/démo, variables d'env)
  - Instructions de déploiement sur Vercel

---

## Phase 8 — Qualité et validation

- [ ] **T34** — Vérifier TypeScript : `tsc --noEmit` sans erreurs

- [ ] **T35** — Tester le responsive sur 375px, 768px, 1280px

- [ ] **T36** — Vérifier que le formulaire de contact valide et envoie correctement

- [ ] **T37** — Vérifier le toggle dark/light sur toutes les sections

- [ ] **T38** — S'assurer qu'il n'y a aucun `console.log`, aucune donnée fictive, aucun Lorem ipsum

- [ ] **T39** — Vérifier les métadonnées SEO (title, description, og:image)

---

## Ordre de priorité si le temps est limité

1. T01 → T11 (fondations + données) — **Obligatoire**
2. T12 → T16 (layout) — **Obligatoire**
3. T17 → T22 (composants partagés) — **Obligatoire**
4. T23 → T29 (sections) — **Obligatoire**
5. T30 (API contact) — **Recommandé**
6. T31 → T39 (config + qualité) — **Recommandé**
