# Tasks: Portfolio One-Page de Brice GNANAGO

**Input**: Design documents from `/specs/002-portfolio-onepage/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/contact-api.md

**Tests**: Non demandés dans la spec — pas de tâches de tests automatisés.

**Organization**: Tasks groupées par user story (P1→P5) pour permettre l'implémentation et le test indépendants de chaque story.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Peut être exécuté en parallèle (fichiers différents, pas de dépendances)
- **[Story]**: User story concernée (US1, US2, US3, US4, US5)
- Chemins relatifs à la racine du projet

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialisation du projet Next.js et installation de toutes les dépendances

- [x] T001 Créer le projet Next.js 14 avec TypeScript et Tailwind CSS via `npx create-next-app@latest . --typescript --tailwind --app --src-dir=false --import-alias="@/*"`
- [x] T002 Installer les dépendances de production : `npm install framer-motion react-hook-form zod @hookform/resolvers lucide-react clsx tailwind-merge class-variance-authority next-themes resend`
- [x] T003 Initialiser shadcn/ui (`npx shadcn-ui@latest init`) et installer les composants : `npx shadcn-ui@latest add button badge card input textarea label sonner`
- [x] T004 [P] Créer la structure de dossiers manquante : `components/sections/`, `components/layout/`, `components/shared/`, `data/`, `hooks/`, `types/`, `public/images/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Types, utilitaires, données partagées et configuration de thème — DOIT être complété avant toute user story

**⚠️ CRITICAL**: Aucune implémentation de user story ne peut commencer avant la fin de cette phase

- [x] T005 Créer les types TypeScript globaux dans `types/index.ts` : PersonalInfo, Social, Skill, SkillCategory, Experience, Project, ContactFormData (selon data-model.md)
- [x] T006 [P] Créer `lib/utils.ts` avec la fonction `cn()` (clsx + tailwind-merge)
- [x] T007 [P] Créer `data/personal.ts` avec les informations personnelles réelles de Brice : nom "Brice GNANAGO", titre "Ingénieur Logiciel Full-Stack", email `gnanagobrice@gmail.com`, téléphone `(+225) 0778127421`, bio, localisation "Abidjan, Côte d'Ivoire", langues, formation, certifications, liens sociaux marqués `[À COMPLÉTER]`
- [x] T008 [P] Configurer `tailwind.config.ts` avec les variables CSS du thème (couleurs dark/light, polices, breakpoints)
- [x] T009 [P] Créer `app/globals.css` avec les variables CSS HSL du thème dark (background, foreground, primary, muted, border, accent) et light, le reset et les styles de base Tailwind
- [x] T010 Créer `components/shared/SectionTitle.tsx` : composant réutilisable titre + sous-titre pour chaque section, avec types TypeScript propres

**Checkpoint**: Fondation prête — l'implémentation des user stories peut commencer

---

## Phase 3: User Story 1 — Découverte du profil professionnel (Priority: P1) 🎯 MVP

**Goal**: Le visiteur voit immédiatement qui est Brice (Hero), peut naviguer entre les sections (Navbar fixe + scroll spy), et découvre son profil détaillé (About)

**Independent Test**: Charger la page → vérifier nom, titre, CTAs visibles sans scroll → cliquer sur les liens de navigation → vérifier le défilement fluide et le menu mobile

### Implementation for User Story 1

- [x] T011 [P] [US1] Créer `hooks/useScrollSpy.ts` : hook personnalisé basé sur IntersectionObserver qui retourne l'ID de la section actuellement visible, avec types TypeScript
- [x] T012 [P] [US1] Créer `components/layout/Navbar.tsx` : navigation fixe avec logo/initiales "BG", liens d'ancre vers chaque section (Accueil, À propos, Compétences, Expériences, Projets, Contact), scroll spy pour le lien actif, menu hamburger responsive mobile, avec attributs ARIA
- [x] T013 [P] [US1] Créer `components/sections/HeroSection.tsx` : nom "Brice GNANAGO", titre "Ingénieur Logiciel Full-Stack", description courte, 2 boutons CTA (Voir mes projets → ancre #projets, Me contacter → ancre #contact), animation d'entrée staggered Framer Motion, indicateur de scroll
- [x] T014 [P] [US1] Créer `components/sections/AboutSection.tsx` : photo de profil via next/image (placeholder prêt avec dimensions documentées), biographie, localisation, langues, formation, certification AWS, utilisant SectionTitle et données de `data/personal.ts`
- [x] T015 [P] [US1] Créer `components/layout/Footer.tsx` : copyright avec année dynamique, liens de navigation rapides, icônes sociaux Lucide React avec URLs de `data/personal.ts`
- [x] T016 [US1] Créer `app/layout.tsx` : chargement de 2 polices Google Fonts via `next/font/google` (display + corps), metadata SEO globale (title "Brice GNANAGO — Ingénieur Logiciel Full-Stack", description, openGraph), intégration Navbar et Footer, `suppressHydrationWarning` sur `<html>`
- [x] T017 [US1] Créer `app/page.tsx` avec HeroSection et AboutSection assemblés, IDs d'ancre pour chaque section (`id="accueil"`, `id="a-propos"`)

**Checkpoint**: US1 fonctionnelle — le visiteur peut voir le Hero, naviguer, et consulter le profil détaillé

---

## Phase 4: User Story 2 — Consultation des compétences et expériences (Priority: P2)

**Goal**: Le visiteur voit les compétences groupées par catégorie et les expériences dans une timeline chronologique

**Independent Test**: Naviguer vers Compétences → vérifier toutes les catégories et compétences réelles → naviguer vers Expériences → vérifier les 3 expériences avec détails complets → tester sur mobile

### Implementation for User Story 2

- [x] T018 [P] [US2] Créer `data/skills.ts` avec toutes les compétences réelles de Brice groupées par catégories : Langages (Java, JavaScript, TypeScript, Python, etc.), Frameworks Frontend (React, Next.js, Angular, etc.), Backend (Node.js, Spring Boot, etc.), Cloud/DevOps (AWS, Docker, CI/CD, etc.), et autres catégories pertinentes du CV
- [x] T019 [P] [US2] Créer `data/experiences.ts` avec les 3 expériences réelles : Barnoin/CNPS (poste, dates, responsabilités), MONBOLIDE (poste, dates, responsabilités), EBURTIS (poste, dates, responsabilités) — toutes les données du CV de Brice
- [x] T020 [P] [US2] Créer `components/shared/SkillBadge.tsx` : badge visuel pour une compétence individuelle, utilisant le composant Badge de shadcn/ui, avec types TypeScript
- [x] T021 [P] [US2] Créer `components/shared/ExperienceCard.tsx` : card d'expérience pour la timeline verticale avec entreprise, poste, dates, description, liste de responsabilités, utilisant Card de shadcn/ui, avec types TypeScript
- [x] T022 [US2] Créer `components/sections/SkillsSection.tsx` : grille des catégories de compétences avec icônes Lucide, SkillBadge pour chaque compétence, animation whileInView + staggerChildren Framer Motion, responsive (grille adaptative), utilisant SectionTitle
- [x] T023 [US2] Créer `components/sections/ExperienceSection.tsx` : timeline verticale avec les ExperienceCard, animation d'entrée au scroll via Framer Motion, responsive, utilisant SectionTitle
- [x] T024 [US2] Ajouter SkillsSection (`id="competences"`) et ExperienceSection (`id="experiences"`) dans `app/page.tsx`

**Checkpoint**: US2 fonctionnelle — compétences et expériences visibles et navigables

---

## Phase 5: User Story 3 — Exploration des projets réalisés (Priority: P3)

**Goal**: Le visiteur voit les 3 projets réels avec descriptions, technologies et métriques

**Independent Test**: Naviguer vers Projets → vérifier les 3 projets (Ticket System, QR Order System, ZoomStudent) → vérifier technologies, métriques, et gestion des liens manquants

### Implementation for User Story 3

- [x] T025 [P] [US3] Créer `data/projects.ts` avec les 3 projets réels : Ticket System (description, stack, métriques), QR Order System (description, stack, métriques), ZoomStudent (description, stack, métriques) — liens démo/source marqués `[À COMPLÉTER]` si non disponibles
- [x] T026 [P] [US3] Créer `components/shared/ProjectCard.tsx` : card projet avec titre, description, badges technologies (SkillBadge), métriques/résultats, boutons liens démo/source (désactivés ou avec indicateur si URL est `[À COMPLÉTER]`), utilisant Card de shadcn/ui, avec types TypeScript
- [x] T027 [US3] Créer `components/sections/ProjectsSection.tsx` : grille de 3 ProjectCard, animation staggered au scroll via Framer Motion, responsive, utilisant SectionTitle
- [x] T028 [US3] Ajouter ProjectsSection (`id="projets"`) dans `app/page.tsx`

**Checkpoint**: US3 fonctionnelle — 3 projets réels visibles avec toutes les informations

---

## Phase 6: User Story 4 — Prise de contact (Priority: P4)

**Goal**: Le visiteur peut envoyer un message via formulaire ou voir les coordonnées directes

**Independent Test**: Remplir le formulaire avec données valides → vérifier envoi et toast de succès → tester validation avec données invalides → vérifier affichage email et téléphone

### Implementation for User Story 4

- [x] T029 [P] [US4] Créer `lib/validations.ts` : schéma Zod pour ContactFormData (name: min 2, max 100 ; email: format valide ; message: min 10, max 1000) avec messages d'erreur en français
- [x] T030 [P] [US4] Créer `.env.example` avec les variables documentées : `RESEND_API_KEY`, `CONTACT_EMAIL=gnanagobrice@gmail.com`, `NEXT_PUBLIC_SITE_URL`
- [x] T031 [US4] Créer `components/sections/ContactSection.tsx` : formulaire React Hook Form + Zod (champs nom, email, message avec validation), affichage des coordonnées directes (email et téléphone depuis `data/personal.ts`), liens sociaux, toast de succès/erreur via shadcn/ui, utilisant SectionTitle, avec types TypeScript
- [x] T032 [US4] Créer `app/api/contact/route.ts` : route handler POST avec validation Zod côté serveur, envoi email via Resend (sujet "Portfolio — Nouveau message de {name}"), réponses JSON 200/400/500 selon le contrat `contracts/contact-api.md`
- [x] T033 [US4] Ajouter ContactSection (`id="contact"`) dans `app/page.tsx`

**Checkpoint**: US4 fonctionnelle — formulaire avec validation et envoi d'email opérationnel

---

## Phase 7: User Story 5 — Basculement thème clair/sombre (Priority: P5)

**Goal**: Le visiteur peut basculer entre dark et light theme, sa préférence est mémorisée

**Independent Test**: Cliquer le toggle → vérifier que toutes les sections changent de palette → recharger la page → vérifier que la préférence est conservée

### Implementation for User Story 5

- [x] T034 [US5] Créer `components/layout/ThemeToggle.tsx` : bouton de basculement dark/light utilisant `next-themes` (useTheme), icônes Sun/Moon de Lucide React, attribut ARIA, avec types TypeScript
- [x] T035 [US5] Intégrer ThemeProvider (next-themes) dans `app/layout.tsx` et ajouter ThemeToggle dans Navbar

**Checkpoint**: US5 fonctionnelle — basculement de thème instantané avec mémorisation

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Configuration de déploiement, validation qualité et conformité constitution

- [x] T036 [P] Créer `next.config.ts` avec configuration d'optimisation d'images (formats, domaines si nécessaire)
- [x] T037 [P] Créer `vercel.json` avec configuration de déploiement (`buildCommand`, `outputDirectory`, `framework`)
- [x] T038 Vérifier la compilation TypeScript : `npx tsc --noEmit` sans erreurs
- [x] T039 Vérifier le responsive sur 3 tailles : 375px (mobile), 768px (tablette), 1280px (desktop)
- [ ] T040 Vérifier les scores Lighthouse > 90 sur Performance, Accessibilité, Bonnes pratiques, SEO
- [x] T041 Vérifier la conformité constitution : aucun `console.log`, aucune donnée fictive, aucun Lorem ipsum, aucun code commenté
- [x] T042 Vérifier les métadonnées SEO : title, description, og:image dans `app/layout.tsx`
- [x] T043 Exécuter le quickstart.md pour valider le guide d'installation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Pas de dépendances — peut commencer immédiatement
- **Foundational (Phase 2)**: Dépend de Setup — BLOQUE toutes les user stories
- **US1 (Phase 3)**: Dépend de Foundational — Premier MVP déployable
- **US2 (Phase 4)**: Dépend de Foundational — Peut commencer en parallèle de US1
- **US3 (Phase 5)**: Dépend de Foundational — Peut commencer en parallèle de US1/US2
- **US4 (Phase 6)**: Dépend de Foundational — Peut commencer en parallèle
- **US5 (Phase 7)**: Dépend de US1 (Navbar + layout.tsx existent) — Séquentiel après US1
- **Polish (Phase 8)**: Dépend de toutes les user stories complétées

### User Story Dependencies

- **US1 (P1)**: Après Phase 2 — Aucune dépendance sur d'autres stories — Crée layout.tsx et page.tsx
- **US2 (P2)**: Après Phase 2 — Ajoute des sections dans page.tsx (créé par US1)
- **US3 (P3)**: Après Phase 2 — Ajoute des sections dans page.tsx (créé par US1)
- **US4 (P4)**: Après Phase 2 — Ajoute des sections dans page.tsx (créé par US1)
- **US5 (P5)**: Après US1 — Modifie layout.tsx et Navbar.tsx (créés par US1)

### Within Each User Story

- Fichiers de données avant composants shared
- Composants shared avant composants sections
- Composants sections avant assemblage dans page.tsx
- Tous les fichiers marqués [P] dans un même phase peuvent être parallélisés

### Parallel Opportunities

- Phase 2 : T006, T007, T008, T009 en parallèle (après T005)
- Phase 3 : T011, T012, T013, T014, T015 en parallèle (fichiers indépendants)
- Phase 4 : T018, T019 en parallèle + T020, T021 en parallèle
- Phase 5 : T025, T026 en parallèle
- Phase 6 : T029, T030 en parallèle
- Phase 8 : T036, T037 en parallèle

---

## Parallel Example: User Story 1

```bash
# Lancer tous les composants US1 en parallèle (fichiers indépendants) :
Task: "Créer hooks/useScrollSpy.ts"
Task: "Créer components/layout/Navbar.tsx"
Task: "Créer components/sections/HeroSection.tsx"
Task: "Créer components/sections/AboutSection.tsx"
Task: "Créer components/layout/Footer.tsx"

# Puis séquentiellement (dépendent des composants ci-dessus) :
Task: "Créer app/layout.tsx"
Task: "Créer app/page.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Compléter Phase 1 : Setup
2. Compléter Phase 2 : Foundational (CRITIQUE — bloque toutes les stories)
3. Compléter Phase 3 : User Story 1 (Hero + Navigation + About)
4. **STOP et VALIDER** : Tester US1 indépendamment
5. Déployer sur Vercel si prêt → MVP visible

### Incremental Delivery

1. Setup + Foundational → Fondation prête
2. Ajouter US1 → Tester → Déployer (MVP !)
3. Ajouter US2 → Tester → Déployer (compétences + expériences)
4. Ajouter US3 → Tester → Déployer (projets)
5. Ajouter US4 → Tester → Déployer (contact fonctionnel)
6. Ajouter US5 → Tester → Déployer (thème toggle)
7. Polish → Validation finale → Déploiement production

---

## Notes

- [P] = fichiers différents, pas de dépendances
- [Story] = user story concernée pour la traçabilité
- Chaque user story est indépendamment complétable et testable
- Committer après chaque tâche ou groupe logique
- S'arrêter à chaque checkpoint pour valider la story indépendamment
- Toutes les données DOIVENT être réelles (Constitution IV — Intégrité du Contenu)
- Interface en français, code en anglais (Constitution III)
