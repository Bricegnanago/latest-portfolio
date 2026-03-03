# Quickstart: Correction de la Prévisualisation OG

**Feature**: `015-fix-og-preview`
**Date**: 2026-03-03

---

## Root Cause

`app/layout.tsx` déclare `openGraph.images: ["/og-image.png"]` mais ce fichier **n'existe pas** dans `public/`. WhatsApp (et toutes les plateformes sociales) tentent de charger cette URL → 404 → pas d'image dans la prévisualisation.

---

## Changes Summary

### Installation

**Aucune nouvelle dépendance** — `next/og` est inclus dans Next.js 14.

---

### Nouveau fichier : `app/opengraph-image.tsx`

```tsx
import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Brice GNANAGO — Ingénieur Logiciel Full-Stack"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        {/* Accent line top */}
        <div
          style={{
            width: "80px",
            height: "4px",
            background: "#8875e8",
            borderRadius: "2px",
            marginBottom: "40px",
          }}
        />

        {/* Label */}
        <div
          style={{
            color: "#8875e8",
            fontSize: "18px",
            letterSpacing: "6px",
            textTransform: "uppercase",
            marginBottom: "24px",
          }}
        >
          Portfolio
        </div>

        {/* Name */}
        <div
          style={{
            color: "#ffffff",
            fontSize: "80px",
            fontWeight: 700,
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Brice GNANAGO
        </div>

        {/* Title */}
        <div
          style={{
            color: "#a0a0b0",
            fontSize: "32px",
            marginBottom: "48px",
            textAlign: "center",
          }}
        >
          Ingénieur Logiciel Full-Stack
        </div>

        {/* Domain badge */}
        <div
          style={{
            color: "#8875e8",
            fontSize: "20px",
            padding: "10px 28px",
            border: "1px solid #8875e8",
            borderRadius: "4px",
          }}
        >
          bricegnanago.dev
        </div>
      </div>
    ),
    { ...size }
  )
}
```

---

### Modification : `app/layout.tsx`

**Supprimer** le tableau `images` cassé dans `openGraph` et **ajouter** les métadonnées Twitter Card :

```ts
// AVANT
export const metadata: Metadata = {
  metadataBase: new URL("https://bricegnanago.dev"),
  title: "Brice GNANAGO — Ingénieur Logiciel Full-Stack",
  description: "...",
  icons: { ... },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Brice GNANAGO — Ingénieur Logiciel Full-Stack",
    description: "...",
    url: "https://bricegnanago.dev",
    images: ["/og-image.png"],   // ← FICHIER INEXISTANT, à supprimer
    type: "website",
    locale: "fr_FR",
  },
}

// APRÈS
export const metadata: Metadata = {
  metadataBase: new URL("https://bricegnanago.dev"),
  title: "Brice GNANAGO — Ingénieur Logiciel Full-Stack",
  description:
    "Portfolio de Brice GNANAGO, ingénieur full-stack spécialisé React, Node.js, AWS et DevOps. Basé à Abidjan, Côte d'Ivoire.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Brice GNANAGO — Ingénieur Logiciel Full-Stack",
    description:
      "Portfolio de Brice GNANAGO, ingénieur full-stack spécialisé React, Node.js, AWS et DevOps.",
    url: "https://bricegnanago.dev",
    // ← PAS de "images" ici : Next.js détecte app/opengraph-image.tsx automatiquement
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brice GNANAGO — Ingénieur Logiciel Full-Stack",
    description:
      "Portfolio de Brice GNANAGO, ingénieur full-stack spécialisé React, Node.js, AWS et DevOps.",
  },
}
```

---

## Smoke Test Checklist

- [ ] `npx tsc --noEmit` — 0 erreur TypeScript
- [ ] `npm run build` (ou `next build`) — build sans erreur
- [ ] Ouvrir `http://localhost:3000/opengraph-image` → l'image 1200×630 s'affiche (fond noir, texte "Brice GNANAGO")
- [ ] Vérifier le code source HTML de la page → `<meta property="og:image"` présent et pointe vers `/opengraph-image`
- [ ] Vérifier `<meta name="twitter:card" content="summary_large_image">` dans le HTML
- [ ] Inspecter avec opengraph.xyz ou metatags.io sur l'URL de prod → image visible, 0 erreur
- [ ] Partager `https://bricegnanago.dev` sur WhatsApp → carte de prévisualisation avec image apparaît
- [ ] Le favicon s'affiche correctement dans l'onglet navigateur (pas de régression)

---

## Non-Regression Check

| Comportement | Attendu |
|--------------|---------|
| Favicon navigateur | ✅ Inchangé (fichiers `public/` intacts) |
| Titre et description de la page | ✅ Inchangés |
| SEO général | ✅ Amélioré (Twitter Card ajouté) |
| `npx tsc --noEmit` | ✅ 0 erreur |
| Toutes les sections du portfolio | ✅ Non affectées |

---

## Note sur le cache WhatsApp

WhatsApp met en cache les métadonnées OG. Après le déploiement, si le lien a déjà été partagé, il peut falloir :
1. Partager le lien depuis un nouvel appareil ou une nouvelle conversation
2. Ou attendre l'expiration du cache (généralement quelques heures)
Il n'est pas possible de forcer la relecture du cache WhatsApp depuis le serveur.
