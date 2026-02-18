# Plan Technique — Portfolio de Brice GNANAGO

> Ce document décrit l'architecture et les décisions techniques à implémenter.
> Il est basé sur la constitution et la spécification validées.

---

## Architecture du projet

```
portfolio/
├── app/
│   ├── layout.tsx              # Layout racine (fonts, metadata globale, ThemeProvider)
│   ├── page.tsx                # Page principale (one-page, toutes les sections)
│   ├── globals.css             # Variables CSS, reset, classes globales Tailwind
│   └── api/
│       └── contact/
│           └── route.ts        # API Route pour l'envoi du formulaire de contact
│
├── components/
│   ├── ui/                     # Composants primitifs (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   └── ...
│   ├── sections/               # Blocs de page (one par section)
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   └── ContactSection.tsx
│   ├── layout/
│   │   ├── Navbar.tsx          # Navigation fixe avec scroll spy
│   │   ├── Footer.tsx
│   │   └── ThemeToggle.tsx     # Bouton dark/light
│   └── shared/
│       ├── SectionTitle.tsx    # Titre de section réutilisable
│       ├── ProjectCard.tsx     # Card de projet
│       ├── ExperienceCard.tsx  # Card d'expérience (timeline)
│       └── SkillBadge.tsx      # Badge de compétence
│
├── data/
│   ├── projects.ts             # Données des 3 projets
│   ├── skills.ts               # Données des compétences groupées
│   ├── experiences.ts          # Données des expériences professionnelles
│   └── personal.ts             # Infos personnelles (nom, email, bio, etc.)
│
├── lib/
│   ├── utils.ts                # cn() helper (clsx + tailwind-merge)
│   └── validations.ts          # Schemas Zod (formulaire contact)
│
├── hooks/
│   └── useScrollSpy.ts         # Hook pour activer le lien navbar actif au scroll
│
├── types/
│   └── index.ts                # Types TypeScript globaux (Project, Experience, Skill...)
│
├── public/
│   ├── images/
│   │   └── profile.jpg         # [À COMPLÉTER] Photo de profil
│   └── og-image.png            # [À COMPLÉTER] Image Open Graph
│
├── .env.example                # Variables d'env documentées
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json
```

---

## Dépendances

### Dépendances de production

```json
{
  "next": "^14.2.0",
  "react": "^18.3.0",
  "react-dom": "^18.3.0",
  "typescript": "^5.4.0",
  "tailwindcss": "^3.4.0",
  "framer-motion": "^11.0.0",
  "react-hook-form": "^7.51.0",
  "zod": "^3.23.0",
  "@hookform/resolvers": "^3.3.4",
  "lucide-react": "^0.370.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.3.0",
  "class-variance-authority": "^0.7.0",
  "resend": "^3.2.0"
}
```

### shadcn/ui components à installer

```bash
npx shadcn-ui@latest add button badge card input textarea label toast
```

---

## Décisions techniques

### Thème dark/light
- Utiliser `next-themes` pour la gestion du thème
- Variables CSS dans `globals.css` pour les couleurs du thème
- Hydration safe avec `suppressHydrationWarning` sur `<html>`

### Formulaire de contact
- Validation côté client : React Hook Form + Zod
- Envoi : Resend API via `/api/contact` route handler
- Feedback utilisateur : toast de succès/erreur avec shadcn/ui
- Variables d'env requises : `RESEND_API_KEY`, `CONTACT_EMAIL`

### Animations Framer Motion
- `motion.div` avec `initial`, `animate`, `whileInView` pour les sections
- `viewport={{ once: true }}` pour déclencher une seule fois au scroll
- `staggerChildren` sur les grilles de projets/compétences
- Pas d'animation sur les éléments de navigation (performance)

### Scroll spy pour la navbar
- Hook personnalisé `useScrollSpy` qui observe les sections via `IntersectionObserver`
- Met à jour l'état du lien actif en temps réel

### SEO
```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: "Brice GNANAGO — Ingénieur Logiciel Full-Stack",
  description: "Portfolio de Brice GNANAGO, ingénieur full-stack spécialisé React, Node.js, AWS et DevOps. Basé à Abidjan, Côte d'Ivoire.",
  openGraph: {
    title: "Brice GNANAGO — Ingénieur Logiciel Full-Stack",
    description: "...",
    images: ["/og-image.png"],
  },
}
```

---

## Variables d'environnement

```env
# .env.example
RESEND_API_KEY=re_xxxxxxxxxxxxx
CONTACT_EMAIL=gnanagobrice@gmail.com
NEXT_PUBLIC_SITE_URL=https://votre-domaine.vercel.app
```

---

## Configuration Vercel

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs"
}
```

---

## Palette de couleurs (dark theme)

```css
/* globals.css */
:root {
  --background: 0 0% 4%;          /* Presque noir */
  --foreground: 0 0% 95%;         /* Blanc cassé */
  --primary: 220 70% 60%;         /* Bleu électrique */
  --primary-foreground: 0 0% 100%;
  --muted: 0 0% 12%;              /* Gris foncé */
  --muted-foreground: 0 0% 55%;   /* Gris moyen */
  --border: 0 0% 15%;
  --accent: 220 70% 60%;
}
```

---

## Checklist avant livraison

- [ ] Toutes les sections sont présentes et correspondent à la spec
- [ ] Aucune donnée fictive — tout vient de `data/*.ts`
- [ ] Formulaire de contact fonctionnel avec validation
- [ ] Responsive vérifié sur 375px, 768px, 1280px
- [ ] Lighthouse > 90 sur Performance, Accessibilité, SEO
- [ ] `.env.example` complété
- [ ] Tous les `[À COMPLÉTER]` documentés dans un `README.md`
- [ ] TypeScript sans erreurs (`tsc --noEmit`)
- [ ] Pas de `console.log` en production
