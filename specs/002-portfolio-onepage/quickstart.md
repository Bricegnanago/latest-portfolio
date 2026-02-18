# Quickstart: Portfolio One-Page de Brice GNANAGO

## Prérequis

- Node.js 18+ installé
- npm ou pnpm
- Compte Resend (gratuit) pour l'envoi d'emails
- Compte Vercel (gratuit) pour le déploiement

## Installation

```bash
# 1. Créer le projet Next.js
npx create-next-app@latest portfolio --typescript --tailwind --app --src-dir=false --import-alias="@/*"
cd portfolio

# 2. Installer les dépendances
npm install framer-motion react-hook-form zod @hookform/resolvers lucide-react clsx tailwind-merge class-variance-authority next-themes resend

# 3. Initialiser shadcn/ui
npx shadcn-ui@latest init

# 4. Ajouter les composants shadcn/ui
npx shadcn-ui@latest add button badge card input textarea label toast

# 5. Configurer les variables d'environnement
cp .env.example .env.local
# Remplir RESEND_API_KEY et CONTACT_EMAIL
```

## Lancement en développement

```bash
npm run dev
# Ouvrir http://localhost:3000
```

## Vérification

```bash
# TypeScript sans erreurs
npx tsc --noEmit

# Build de production
npm run build

# Lancer Lighthouse
# Ouvrir Chrome DevTools → Lighthouse → Generate report
```

## Variables d'environnement

Créer un fichier `.env.local` basé sur `.env.example` :

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
CONTACT_EMAIL=gnanagobrice@gmail.com
NEXT_PUBLIC_SITE_URL=https://votre-domaine.vercel.app
```

## Déploiement Vercel

```bash
# Via CLI
npx vercel

# Ou connecter le repo GitHub à Vercel Dashboard
# et configurer les variables d'environnement dans Settings > Environment Variables
```

## Éléments à compléter après déploiement

- `public/images/profile.jpg` — Photo de profil de Brice
- `public/og-image.png` — Image Open Graph pour le partage social
- Liens GitHub, LinkedIn, URL de démo des projets dans `data/personal.ts` et `data/projects.ts`
- Domaine personnalisé dans Vercel (optionnel)
