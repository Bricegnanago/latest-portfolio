# Research: Vidéo de démo — QR Order System

**Feature**: `003-qr-order-demo-video`
**Date**: 2026-02-21
**Status**: Complete — aucun NEEDS CLARIFICATION non résolu

---

## Décision 1 — Mécanisme d'affichage de la vidéo

**Decision**: Modale (`Dialog` de shadcn/ui) ouverte au clic du bouton "Voir la démo"

**Rationale**:
- Preserves l'intégrité visuelle de la grille de projets (pas de rupture de layout)
- `Dialog` de shadcn/ui (basé sur Radix UI) gère nativement : focus trap, fermeture via Échap, clic extérieur, `role="dialog"` et `aria-labelledby` — conformité accessibilité sans code supplémentaire
- Compatible avec les animations Framer Motion (prop `asChild` ou wrapping de l'overlay)
- Pattern éprouvé sur les portfolios et sites de présentation de produit

**Alternatives considérées**:
- Lecture inline dans la carte projet → rejetée car modifie trop profondément le layout de `ProjectCard` et rend la vidéo difficile à voir dans une carte de taille réduite
- Redirection vers une page dédiée → rejetée car contraire à l'esprit one-page du portfolio et crée une rupture de navigation
- Lecteur YouTube/Vimeo embedé → rejeté car la vidéo est hébergée localement et l'ajout de dépendances externes est contraire à la constitution (pas de CDN externe)

---

## Décision 2 — Balise HTML pour la vidéo

**Decision**: Élément `<video>` HTML natif avec `controls`, `preload="metadata"`, et `muted` par défaut

**Rationale**:
- `next/image` est obligatoire pour les images (constitution Principe II) mais ne s'applique pas aux vidéos — `<video>` natif est la bonne pratique Next.js pour les fichiers vidéo statiques
- `preload="metadata"` évite de télécharger la vidéo complète au chargement de la page (performance)
- `muted` permet l'autoplay sur mobile (contrainte navigateur) — l'utilisateur peut démufer depuis les contrôles
- `controls` fournis nativement par le navigateur : lecture/pause, volume, plein écran, barre de progression
- Pas d'autoplay forcé sans mute pour respecter les politiques navigateur (Chrome, Safari, Firefox)

**Alternatives considérées**:
- `react-player` (lib externe) → rejeté : librairie supplémentaire inutile pour un seul fichier MP4 local
- `autoPlay` sans `muted` → rejeté : bloqué par tous les navigateurs modernes sur mobile

---

## Décision 3 — Arrêt de la vidéo à la fermeture de la modale

**Decision**: Utiliser un `ref` sur l'élément `<video>` et appeler `videoRef.current.pause()` dans le callback `onOpenChange(false)` du Dialog

**Rationale**:
- Solution directe sans état supplémentaire
- `onOpenChange` est le hook natif de shadcn/ui Dialog pour réagir aux changements d'état (ouverture/fermeture)
- Évite les `useEffect` inutiles (interdits par la constitution sauf si nécessaires)

**Alternatives considérées**:
- Remonter la vidéo à la fermeture (`key` prop) → rejeté : provoque un re-mount complet de la balise video, moins fluide
- `useEffect` sur `isOpen` → rejeté : `onOpenChange` suffit, `useEffect` serait inutile ici

---

## Décision 4 — Extension du type `Project`

**Decision**: Ajouter `videoUrl?: string` au type `Project` dans `types/index.ts`

**Rationale**:
- Champ optionnel : ne casse pas les 2 autres projets (Ticket System, ZoomStudent)
- Symétrique avec `demoUrl?: string` et `sourceUrl?: string` déjà présents
- Permet à terme d'ajouter des vidéos à d'autres projets sans modifier la logique de `ProjectCard`
- Naming `videoUrl` cohérent avec `demoUrl` / `sourceUrl`

**Alternatives considérées**:
- Passer la vidéo comme prop directe à `ProjectCard` sans l'intégrer au type → rejeté : viole l'architecture data-first (`/data/*.ts`)

---

## Décision 5 — Localisation du composant VideoModal

**Decision**: `components/shared/VideoModal.tsx` (composant shared réutilisable)

**Rationale**:
- `components/shared/` = composants de niveau page réutilisables entre sections (pattern existant : `ProjectCard`, `ExperienceCard`, `SectionTitle`)
- Séparation claire de responsabilité : `ProjectCard` gère la carte, `VideoModal` gère la lecture vidéo
- Respect du principe "un composant = un fichier" (constitution Principe V)

**Alternatives considérées**:
- Intégrer la modale directement dans `ProjectCard` → rejeté : composant trop long, logique mélangée
- `components/ui/VideoModal.tsx` → rejeté : les composants `ui/` sont des primitives headless (boutons, inputs) — une modale avec logique vidéo est un composant "shared"

---

## Résumé des décisions

| ID | Sujet | Décision |
|----|-------|----------|
| D1 | Affichage vidéo | Modale `Dialog` shadcn/ui |
| D2 | Balise vidéo | `<video controls muted preload="metadata">` natif |
| D3 | Arrêt à la fermeture | `videoRef.current.pause()` dans `onOpenChange` |
| D4 | Modèle de données | `videoUrl?: string` ajouté au type `Project` |
| D5 | Localisation composant | `components/shared/VideoModal.tsx` |

Aucun NEEDS CLARIFICATION non résolu — phase de design peut démarrer.
