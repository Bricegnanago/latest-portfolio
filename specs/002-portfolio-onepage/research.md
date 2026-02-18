# Research: Portfolio One-Page de Brice GNANAGO

**Feature**: 002-portfolio-onepage
**Date**: 2026-02-17

## Résumé

La constitution définit intégralement la stack technique. Aucun NEEDS CLARIFICATION. Les décisions ci-dessous documentent les choix techniques dérivés de la constitution et des bonnes pratiques.

## Décisions

### D1 — Gestion du thème dark/light

- **Décision** : Utiliser `next-themes` pour le basculement dark/light.
- **Rationale** : next-themes gère l'hydration SSR (évite le flash), persiste la préférence en localStorage, et s'intègre nativement avec les CSS variables de Tailwind. C'est la solution standard pour Next.js.
- **Alternatives considérées** :
  - Implémentation manuelle avec useContext + localStorage — rejetée car plus complexe et sujette aux problèmes d'hydration.
  - Tailwind `dark:` class sans gestion d'état — rejetée car ne permet pas le toggle utilisateur.

### D2 — Service d'envoi d'email

- **Décision** : Utiliser Resend comme service d'envoi d'email via un route handler Next.js (`/api/contact`).
- **Rationale** : Resend offre un tier gratuit suffisant pour un portfolio personnel, une API simple, et une bonne intégration avec Next.js. La route handler est un endpoint serverless Vercel, pas un backend séparé (conforme à la constitution).
- **Alternatives considérées** :
  - EmailJS (côté client) — rejeté car expose la clé API côté client.
  - Nodemailer + SMTP — rejeté car nécessite un serveur SMTP dédié, complexité accrue.
  - Formspree/Getform (services tiers) — rejeté car dépendance externe et moins de contrôle.

### D3 — Scroll spy pour la navigation

- **Décision** : Hook personnalisé `useScrollSpy` basé sur `IntersectionObserver`.
- **Rationale** : IntersectionObserver est natif au navigateur (pas de dépendance), performant (pas de calcul au scroll), et adapté à l'observation de sections. Un hook custom est plus léger qu'une librairie dédiée.
- **Alternatives considérées** :
  - react-intersection-observer (npm) — rejeté car dépendance supplémentaire pour un usage simple.
  - Calcul de scroll position avec `getBoundingClientRect` — rejeté car déclenche des layout recalculations au scroll.

### D4 — Composants UI

- **Décision** : shadcn/ui pour les composants primitifs (button, badge, card, input, textarea, label, toast).
- **Rationale** : La constitution impose shadcn/ui. Les composants sont copiés dans le projet (pas de dépendance npm), personnalisables via Tailwind, et typés TypeScript.
- **Alternatives considérées** : Aucune — imposé par la constitution.

### D5 — Polices typographiques

- **Décision** : Deux polices Google Fonts chargées via `next/font/google` — une police display pour les titres (type: Inter, Space Grotesk, ou similaire) et une police lisible pour le corps (type: Inter, ou similaire).
- **Rationale** : La constitution impose `next/font` (pas de CDN externe) et deux polices distinctes (display + corps). `next/font` optimise automatiquement le chargement (preload, font-display: swap).
- **Alternatives considérées** : Aucune pour le mécanisme — imposé par la constitution.

### D6 — Palette de couleurs

- **Décision** : Dark theme par défaut avec fond quasi-noir, texte blanc cassé, accent bleu électrique. Light theme avec fond blanc, texte sombre, même accent.
- **Rationale** : Le dark theme est imposé par défaut (constitution III). Les couleurs HSL via CSS variables permettent un basculement fluide et une personnalisation facile.
- **Alternatives considérées** : Aucune — le dark par défaut est imposé par la constitution.

### D7 — Variables d'environnement

- **Décision** : 3 variables requises : `RESEND_API_KEY` (serveur), `CONTACT_EMAIL` (serveur), `NEXT_PUBLIC_SITE_URL` (client + SEO).
- **Rationale** : Séparer les clés serveur (non exposées) des variables publiques. Documenter dans `.env.example`.
- **Alternatives considérées** : Aucune variable publique pour l'API key — rejeté car la clé serait exposée côté client.
