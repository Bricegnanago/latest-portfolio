# Feature Specification: Project Demo Images Gallery

**Feature Branch**: `005-project-demo-images`
**Created**: 2026-02-26
**Status**: Draft
**Input**: User description: "Je veux pouvoir ajouter des images de demo pour chaque projet."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visitor Views Project Demo Images (Priority: P1)

Un visiteur du portfolio consulte la section Projets et souhaite voir à quoi ressemble un projet. Il peut voir une ou plusieurs images de démonstration associées à chaque projet directement depuis la liste des projets.

**Why this priority**: L'affichage visuel d'un projet est le cœur de cette fonctionnalité. Sans cela, rien d'autre ne peut être testé.

**Independent Test**: Peut être testé en vérifiant qu'un projet avec des images de démo affiche une vignette ou un indicateur cliquable, et que le visiteur peut accéder aux images sans quitter la page.

**Acceptance Scenarios**:

1. **Given** un projet avec au moins une image de démo, **When** le visiteur consulte la section projets, **Then** une image ou un indicateur visuel est visible pour ce projet.
2. **Given** un projet sans image de démo, **When** le visiteur consulte la section projets, **Then** le projet s'affiche normalement sans image, sans erreur ni espace vide incohérent.
3. **Given** un projet avec plusieurs images de démo, **When** le visiteur clique sur l'image ou l'indicateur, **Then** toutes les images sont accessibles via une galerie ou une vue agrandie.

---

### User Story 2 - Visitor Navigates Between Multiple Demo Images (Priority: P2)

Un visiteur souhaite parcourir les différentes captures d'écran d'un projet pour mieux comprendre ses fonctionnalités. Il peut naviguer d'une image à l'autre sans fermer la vue.

**Why this priority**: La valeur différenciatrice vient de la galerie multi-images. Un projet avec 3-4 captures raconte une histoire que le texte seul ne peut pas faire.

**Independent Test**: Peut être testé en vérifiant qu'avec un projet à 3 images de démo, le visiteur peut passer de l'image 1 à l'image 2 puis à l'image 3 via des contrôles de navigation (flèches, points, clavier).

**Acceptance Scenarios**:

1. **Given** une galerie ouverte avec plusieurs images, **When** le visiteur clique sur la navigation suivante, **Then** l'image suivante s'affiche.
2. **Given** une galerie ouverte avec plusieurs images, **When** le visiteur est sur la dernière image, **Then** la navigation revient à la première image (navigation circulaire).
3. **Given** une galerie ouverte, **When** le visiteur appuie sur la touche Échap ou clique en dehors, **Then** la galerie se ferme.

---

### User Story 3 - Portfolio Owner Adds Demo Images to a Project (Priority: P3)

Le propriétaire du portfolio (Brice) veut associer des images de démo à un projet. Il peut définir une liste d'images dans le fichier de données du projet.

**Why this priority**: Permet au propriétaire de maintenir et d'enrichir son portfolio sans toucher aux composants UI.

**Independent Test**: Peut être testé en ajoutant deux images à un projet dans le fichier de données et en vérifiant que les deux images apparaissent dans la galerie.

**Acceptance Scenarios**:

1. **Given** un projet sans images de démo, **When** le propriétaire ajoute un tableau d'images dans le fichier de données, **Then** ces images s'affichent dans la galerie pour ce projet.
2. **Given** un projet avec une seule image de démo, **When** le propriétaire en ajoute une deuxième, **Then** la navigation entre les deux images est disponible.

---

### Edge Cases

- Qu'arrive-t-il si une image référencée est manquante ou inaccessible ? L'image manquante est ignorée ou remplacée par un placeholder neutre.
- Qu'arrive-t-il si un projet a une seule image ? La navigation entre images n'est pas affichée (inutile avec une seule image).
- Qu'arrive-t-il si un projet a un très grand nombre d'images (> 10) ? La galerie affiche un maximum raisonnable ou pagine les images sans dégrader les performances.
- Qu'arrive-t-il sur mobile avec un swipe ? La navigation doit fonctionner par geste tactile.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Chaque projet DOIT pouvoir être associé à une liste de zéro ou plusieurs images de démo.
- **FR-002**: Les visiteurs DOIVENT pouvoir voir les images de démo d'un projet via un aperçu ou une galerie accessible sans quitter la page.
- **FR-003**: Les projets sans images de démo DOIVENT continuer à s'afficher normalement, sans erreur ni espace vide.
- **FR-004**: Quand plusieurs images sont présentes, les visiteurs DOIVENT pouvoir naviguer entre elles (précédent/suivant).
- **FR-005**: La navigation dans la galerie DOIT être accessible au clavier (flèches directionnelles, touche Échap pour fermer).
- **FR-006**: La galerie DOIT se fermer quand le visiteur clique en dehors de la zone d'image.
- **FR-007**: Le propriétaire du portfolio DOIT pouvoir définir les images de démo dans le fichier de données des projets (liste de chemins ou URLs).
- **FR-008**: Chaque image de démo PEUT avoir un texte alternatif descriptif (optionnel) pour l'accessibilité.

### Key Entities

- **Project**: représente un projet du portfolio. Acquiert une nouvelle propriété : liste ordonnée d'images de démo (chaque image ayant un chemin/URL et un texte alternatif optionnel).
- **Demo Image**: représente une capture d'écran ou une image illustrant un projet. Attributs : source (chemin local ou URL externe), texte alternatif optionnel.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un visiteur peut voir toutes les images de démo d'un projet en moins de 3 clics depuis la section projets.
- **SC-002**: 100% des projets sans images de démo continuent de s'afficher sans régression visuelle.
- **SC-003**: La navigation entre images fonctionne sur mobile (gestes tactiles) et sur desktop (clavier et souris).
- **SC-004**: Le propriétaire peut ajouter ou retirer des images de démo en modifiant uniquement le fichier de données, sans toucher aux composants UI.
- **SC-005**: Les images de démo se chargent sans dégrader les performances perçues de la page (chargement différé si la galerie n'est pas ouverte).

## Assumptions

- Les images sont stockées dans le répertoire statique du projet (dossier public) ou référencées via des URLs externes.
- Le nombre d'images par projet est raisonnable (1 à 10 maximum recommandé).
- L'accessibilité de base (navigation clavier, textes alternatifs) est requise mais pas une conformité WCAG complète à ce stade.
- La galerie remplace ou complète le champ `image` existant dans le type `Project` — les deux peuvent coexister pendant la transition.
