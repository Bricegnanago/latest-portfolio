# Feature Specification: Correction de la Prévisualisation du Site (OG Image)

**Feature Branch**: `015-fix-og-preview`
**Created**: 2026-03-03
**Status**: Draft
**Input**: User description: "je constate que lorsque je tape https://bricegnanago.dev je pouvais voir la description du site et le favicon. Maintenant que j'ai changé le favicon dans app/ et public/ je ne vois plus d'image s'afficher à l'autocompletion du site sur WhatsApp"

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Image de prévisualisation visible lors du partage d'un lien (Priority: P1)

Quand un visiteur partage le lien `https://bricegnanago.dev` sur WhatsApp, iMessage, Telegram, LinkedIn ou toute autre plateforme sociale, une carte de prévisualisation s'affiche avec : une image représentative du portfolio, le titre du site, et sa description. Cela donne une impression professionnelle et incite le destinataire à cliquer.

**Why this priority**: C'est le problème signalé directement. Sans image OG, le lien partagé apparaît comme du texte brut sans visuel, ce qui réduit fortement l'impact et le taux de clic. C'est la régression principale à corriger.

**Independent Test**: Partager `https://bricegnanago.dev` dans une conversation WhatsApp → une carte apparaît avec image + titre + description. Vérifiable aussi via un outil de débogage OG en ligne (ex. opengraph.xyz).

**Acceptance Scenarios**:

1. **Given** le lien du portfolio est partagé sur WhatsApp, **When** WhatsApp génère l'aperçu, **Then** une image de prévisualisation du portfolio s'affiche avec le titre et la description du site
2. **Given** le lien est partagé sur LinkedIn, **When** LinkedIn génère l'aperçu, **Then** la même image, le même titre et la même description s'affichent
3. **Given** un outil de vérification OG analyse le site, **When** il lit les métadonnées, **Then** `og:image`, `og:title` et `og:description` sont tous présents et résolus vers des ressources accessibles

---

### User Story 2 — Cohérence favicon / icônes dans le navigateur (Priority: P2)

Le favicon s'affiche correctement dans l'onglet du navigateur, dans les favoris, et sur l'écran d'accueil mobile — en cohérence avec la nouvelle identité visuelle après le changement de favicon.

**Why this priority**: Secondaire au problème OG mais lié à la même session de modification. Un favicon manquant ou cassé après les changements dans `app/` et `public/` donnerait une impression d'abandon.

**Independent Test**: Ouvrir `https://bricegnanago.dev` dans Chrome, Firefox et Safari → l'onglet affiche le bon favicon → ajouter en favoris → l'icône de favori est correcte.

**Acceptance Scenarios**:

1. **Given** le site est ouvert dans un navigateur, **When** l'onglet est visible, **Then** le favicon personnalisé de Brice s'affiche (pas l'icône par défaut du navigateur)
2. **Given** le site est ajouté à l'écran d'accueil sur mobile, **When** l'icône s'affiche, **Then** c'est l'icône correcte (apple-touch-icon ou web-app-manifest icon)

---

### Edge Cases

- Que se passe-t-il si les plateformes ont mis en cache l'ancienne image (ou l'absence d'image) ? → La mise en cache OG est gérée par chaque plateforme ; WhatsApp relit après un délai ou si le lien est partagé pour la première fois depuis un appareil. Hors du contrôle du site, mais le débogueur OG permet de forcer la relecture.
- Que se passe-t-il si l'image OG est trop lourde ? → L'image doit être optimisée pour rester sous 1 Mo afin d'éviter les rejets par certaines plateformes.
- Que se passe-t-il si le chemin de l'image OG ne correspond pas à ce qui est déclaré dans les métadonnées ? → L'image n'apparaîtra pas malgré la balise — le chemin déclaré et le fichier physique doivent être identiques.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Le site DOIT exposer une image de prévisualisation accessible publiquement à une URL stable (`/og-image.png` ou équivalent)
- **FR-002**: Les métadonnées Open Graph du site DOIVENT référencer une image existante et accessible (pas un chemin vers un fichier manquant)
- **FR-003**: L'image OG DOIT respecter les dimensions recommandées par les plateformes sociales (1200×630 px minimum) pour éviter un recadrage indésirable
- **FR-004**: L'image OG DOIT représenter visuellement le portfolio de Brice (nom, titre, identité visuelle)
- **FR-005**: Les métadonnées Open Graph DOIVENT inclure au minimum : image, titre, description et URL canonique
- **FR-006**: Le favicon DOIT s'afficher correctement dans les navigateurs courants (Chrome, Firefox, Safari, Edge)
- **FR-007**: La déclaration des icônes dans les métadonnées du site DOIT correspondre aux fichiers physiquement présents dans le dossier public

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Partager le lien sur WhatsApp affiche une carte de prévisualisation avec image + titre + description (0 étapes supplémentaires requises)
- **SC-002**: Un outil de vérification OG en ligne retourne 0 erreur pour `og:image`, `og:title`, `og:description` sur `https://bricegnanago.dev`
- **SC-003**: Le favicon est visible dans l'onglet du navigateur dans 100% des navigateurs principaux (Chrome, Firefox, Safari, Edge)
- **SC-004**: L'image OG est disponible en moins d'une seconde (poids inférieur à 500 Ko)

## Assumptions

- Le problème principal est que le fichier `og-image.png` référencé dans les métadonnées n'existe pas physiquement dans le dossier public — c'est la cause de l'absence d'image sur WhatsApp
- L'image OG doit être créée ou générée manuellement et placée dans le dossier public sous le nom attendu
- Les métadonnées Open Graph actuelles (titre, description, URL) sont correctes — seule l'image est manquante
- Le favicon en lui-même est fonctionnel (les fichiers .ico, .svg, .png existent dans public/) — il s'agit surtout de vérifier la cohérence des déclarations
