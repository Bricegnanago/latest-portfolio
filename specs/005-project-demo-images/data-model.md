# Data Model: Project Demo Images Gallery

**Branch**: `005-project-demo-images` | **Date**: 2026-02-26

## Entités

### DemoImage (nouvelle entité)

Représente une image de démonstration associée à un projet.

| Champ | Type       | Requis | Description                                              |
|-------|------------|--------|----------------------------------------------------------|
| `src` | `string`   | Oui    | Chemin relatif (`/images/...`) ou URL externe absolue    |
| `alt` | `string`   | Non    | Texte alternatif pour l'accessibilité (screen readers)   |

**Contraintes de validation**:
- `src` ne doit pas être vide
- `src` commence par `/` (chemin local depuis `public/`) ou `http`/`https` (URL externe)
- `alt` recommandé mais non bloquant ; si absent, le système utilise le titre du projet comme fallback

**Stockage**: Inliné dans le tableau `images` de chaque `Project` dans `data/projects.ts`.

---

### Project (entité existante — extension)

Extension de l'interface existante dans `types/index.ts`.

**Champs existants** (inchangés) :

| Champ        | Type        | Requis | Description                    |
|--------------|-------------|--------|-------------------------------|
| `title`      | `string`    | Oui    | Titre du projet                |
| `description`| `string`    | Oui    | Description courte             |
| `technologies`| `string[]` | Oui    | Liste des technologies         |
| `metrics`    | `string[]`  | Oui    | Métriques / impacts clés       |
| `demoUrl`    | `string`    | Non    | URL de la démo en ligne        |
| `sourceUrl`  | `string`    | Non    | URL du dépôt source            |
| `image`      | `string`    | Non    | Image unique (usage futur/legacy) |
| `videoUrl`   | `string`    | Non    | URL de la vidéo de démo        |

**Nouveau champ** :

| Champ    | Type           | Requis | Description                                      |
|----------|----------------|--------|--------------------------------------------------|
| `images` | `DemoImage[]`  | Non    | Galerie de captures d'écran de démonstration     |

**Règles métier**:
- Si `images` est absent ou vide (`[]`), aucun bouton galerie n'est affiché dans `ProjectCard`
- Si `images` contient exactement 1 élément, la navigation précédent/suivant est masquée
- Si `images` contient N éléments (N ≥ 2), la navigation et les indicateurs sont affichés
- La coexistence de `videoUrl` et `images` est autorisée — deux boutons distincts s'affichent

---

## Définition TypeScript finale

```typescript
// À ajouter dans types/index.ts

export interface DemoImage {
  src: string
  alt?: string
}

// Modification de l'interface Project existante
export interface Project {
  title: string
  description: string
  technologies: string[]
  metrics: string[]
  demoUrl?: string
  sourceUrl?: string
  image?: string
  videoUrl?: string
  images?: DemoImage[]   // ← nouveau champ
}
```

---

## État de l'interface ImageGalleryModal

L'état interne du composant `ImageGalleryModal` n'est pas persistant (pas de stockage). Il est géré localement avec `useState`.

| État          | Type     | Valeur initiale | Description                            |
|---------------|----------|-----------------|----------------------------------------|
| `currentIndex`| `number` | `0`             | Index de l'image actuellement affichée |
| `direction`   | `number` | `1`             | Direction du slide : `1` = suivant, `-1` = précédent |

**Transitions d'état**:
- `goNext()` : `currentIndex = (currentIndex + 1) % images.length`, `direction = 1`
- `goPrev()` : `currentIndex = (currentIndex - 1 + images.length) % images.length`, `direction = -1`
- Fermeture de la modale : `currentIndex` remis à `0` (ou maintenu selon le choix d'UX — par défaut réinitialisé)

---

## Exemple de données (data/projects.ts)

```typescript
{
  title: "QR Order System",
  // ...champs existants...
  images: [
    { src: "/images/qr-order-1.png", alt: "Interface client — menu par QR code" },
    { src: "/images/qr-order-2.png", alt: "Interface cuisine — commandes en temps réel" },
    { src: "/images/qr-order-3.png", alt: "Dashboard restaurant — statistiques" },
  ],
}
```
