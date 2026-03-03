# Research: Correction de la Prévisualisation OG

**Feature**: `015-fix-og-preview`
**Date**: 2026-03-03

---

## Decision 1 — Root cause confirmée

**Decision**: Le fichier `/og-image.png` référencé dans `app/layout.tsx` (`openGraph.images: ["/og-image.png"]`) n'existe pas dans `public/`. C'est la cause directe de l'absence d'image sur WhatsApp.

**Rationale**: En vérifiant `public/`, les fichiers présents sont : `apple-touch-icon.png`, `favicon-96x96.png`, `favicon.ico`, `favicon.svg`, `web-app-manifest-192x192.png`, `web-app-manifest-512x512.png`, `site.webmanifest`. Aucun `og-image.png`. WhatsApp tente de charger l'URL `https://bricegnanago.dev/og-image.png`, reçoit un 404, et n'affiche pas d'image dans la prévisualisation.

---

## Decision 2 — Approche : image OG dynamique via convention Next.js App Router

**Decision**: Créer `app/opengraph-image.tsx` avec `ImageResponse` de `next/og` (inclus dans Next.js, aucune dépendance supplémentaire). Supprimer le tableau `images: ["/og-image.png"]` de `metadata.openGraph` dans `layout.tsx` — Next.js détecte automatiquement le fichier de convention et génère la balise `og:image` correctement.

**Rationale**:
- `next/og` est inclus dans Next.js 14, aucune installation requise
- L'image est générée server-side, toujours à jour, sans fichier PNG à maintenir manuellement
- La convention `app/opengraph-image.tsx` est la méthode recommandée par Next.js pour les OG images dans l'App Router
- Vercel supporte nativement ce mécanisme (Edge Runtime)
- Élimine définitivement le problème du fichier manquant

**Alternatives considered**:
- **Fichier PNG statique dans `public/`** — nécessite que le développeur crée et maintienne une image PNG (pas scalable, risque de re-casser si le fichier est supprimé)
- **Pointer vers une image existante** (`/images/profile.jpg`) — hack temporaire, photo portrait ≠ OG image (format 1:1 vs 1.91:1), mauvais rendu sur les plateformes
- **`app/twitter-image.tsx` séparé** — non nécessaire si on déclare `twitter.images` dans les métadonnées

---

## Decision 3 — Dimensions et design de l'image OG

**Decision**: 1200×630 px (ratio 1.91:1 standard Open Graph). Design : fond sombre (`#0a0a0a`), texte blanc, accent violet (`#8875e8`). Contenu : "Brice GNANAGO" (grand), "Ingénieur Logiciel Full-Stack", "bricegnanago.dev". Pas de photo profil (risque de recadrage selon la plateforme).

**Rationale**: 1200×630 est la dimension minimale recommandée par Facebook, WhatsApp, LinkedIn et Twitter pour éviter tout recadrage. Le design sobre et cohérent avec le thème du portfolio (dark + violet primaire) renforce l'image de marque.

**Alternatives considered**:
- Inclure la photo de profil — risque de recadrage non prévisible selon la plateforme
- Fond clair — incohérent avec le dark theme par défaut du portfolio

---

## Decision 4 — Métadonnées Twitter Card

**Decision**: Ajouter `twitter: { card: "summary_large_image", title: "...", description: "...", images: ["/opengraph-image"] }` dans le `metadata` de `layout.tsx`.

**Rationale**: Twitter/X utilise ses propres balises `twitter:card` en plus des balises OG. Sans elles, Twitter peut refuser d'afficher une grande image. `summary_large_image` est le format optimal pour les portfolios. L'URL `/opengraph-image` est l'URL générée par Next.js pour le fichier de convention `app/opengraph-image.tsx`.

---

## Decision 5 — Cohérence des déclarations favicon

**Decision**: Vérifier et conserver les déclarations favicon existantes dans `layout.tsx`. Elles sont correctes : tous les fichiers référencés (`/favicon.ico`, `/favicon-96x96.png`, `/favicon.svg`, `/apple-touch-icon.png`) existent bien dans `public/`. Aucun changement nécessaire sur les icônes.

**Rationale**: Le problème de favicon signalé par l'utilisateur est probablement dû au cache navigateur post-changement, pas à une déclaration incorrecte. Les fichiers sont présents et les références sont valides.

---

## Fichiers concernés

| Fichier | Action | Raison |
|---------|--------|--------|
| `app/opengraph-image.tsx` | CRÉER | Image OG dynamique via convention Next.js |
| `app/layout.tsx` | MODIFIER | Supprimer `images: ["/og-image.png"]` + ajouter Twitter Card |
