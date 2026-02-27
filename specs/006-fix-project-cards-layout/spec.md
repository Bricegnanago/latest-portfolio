# Feature Specification: Fix Project Cards Layout

**Feature Branch**: `006-fix-project-cards-layout`
**Created**: 2026-02-27
**Status**: Draft
**Input**: User description: "je constate que le bloc Projet n'affiche pas bien les block les Card de chaque projet. En plus les boutons deborde du card."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visitor Sees Uniform Card Heights in the Grid (Priority: P1)

Un visiteur consulte la section "Projets" du portfolio. Les projets sont affichés en grille. Actuellement, la carte Monbolide est beaucoup plus grande que les cartes adjacentes — donnant une impression de désordre visuel. Les cartes ne s'alignent pas à la même hauteur dans une même rangée.

**Why this priority**: L'alignement des cartes est le problème visuel le plus flagrant. Il dégrade directement la perception de professionnalisme du portfolio.

**Independent Test**: Sur desktop, ouvrir la section Projets → les cartes d'une même rangée ont toutes la même hauteur → les boutons d'action sont alignés en bas de chaque carte.

**Acceptance Scenarios**:

1. **Given** une grille de projets avec des contenus de longueurs variées, **When** un visiteur affiche la section sur desktop (≥ 1024px), **Then** toutes les cartes d'une même rangée ont la même hauteur.
2. **Given** une carte avec peu de contenu et une carte avec beaucoup de contenu sur la même rangée, **When** le visiteur voit la section, **Then** les zones de boutons d'action sont visuellement alignées en bas des deux cartes.
3. **Given** la même grille sur mobile, **When** le visiteur affiche la section en colonne unique, **Then** chaque carte a la hauteur de son contenu sans espace vide inutile.

---

### User Story 2 - Buttons Never Overflow the Card (Priority: P1)

Un visiteur consulte la carte QR Order System qui affiche 3 boutons d'action (Captures, Voir la démo, Code). Ces boutons dépassent actuellement les limites de la carte et sont partiellement coupés.

**Why this priority**: Un bouton coupé est non fonctionnel et immédiatement visible — problème de premier ordre pour un portfolio professionnel.

**Independent Test**: La carte QR Order System (3 boutons) n'a aucun bouton coupé. Sur une largeur réduite, les boutons se répartissent sur plusieurs lignes plutôt que de déborder.

**Acceptance Scenarios**:

1. **Given** une carte projet avec 3 boutons d'action, **When** le visiteur affiche la section à n'importe quelle taille d'écran, **Then** tous les boutons sont entièrement visibles et cliquables.
2. **Given** une carte avec 3 boutons sur une largeur réduite où ils ne tiennent pas sur une ligne, **When** il n'y a pas assez d'espace, **Then** les boutons passent à la ligne suivante sans déborder de la carte.
3. **Given** une carte avec 1 ou 2 boutons seulement, **When** le visiteur la consulte, **Then** les boutons s'affichent normalement sur une seule ligne.

---

### Edge Cases

- Qu'arrive-t-il si un projet futur a 4 boutons ou plus ? Les boutons doivent toujours s'adapter sans déborder.
- Qu'arrive-t-il sur les écrans très étroits (320px) ? Les boutons doivent rester accessibles même en passant à la ligne.
- Qu'arrive-t-il si le contenu d'une carte est vide (zéro métriques, zéro technologies) ? La mise en page ne doit pas se casser.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Toutes les cartes d'une même rangée de grille DOIVENT avoir la même hauteur, quelle que soit la quantité de contenu de chaque carte.
- **FR-002**: La zone des boutons d'action DOIT toujours être positionnée en bas de chaque carte.
- **FR-003**: Les boutons d'action ne DOIVENT jamais déborder ou être coupés par les limites de la carte.
- **FR-004**: Quand plusieurs boutons ne tiennent pas sur une ligne, ils DOIVENT passer à la ligne suivante en restant dans les limites de la carte.
- **FR-005**: Les effets visuels existants (animations, effets au survol) NE DOIVENT PAS être affectés par la correction.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% des boutons d'action sont entièrement visibles et cliquables sur toutes les tailles d'écran, de 320px à 1440px de large.
- **SC-002**: Sur desktop (≥ 1024px), les bas de toutes les cartes d'une même rangée sont visuellement alignés — mesurable en comparant les positions verticales des zones de boutons.
- **SC-003**: Aucune régression sur les cartes à 1 ou 2 boutons — leur disposition reste identique à l'état actuel sans débordement.
- **SC-004**: Les effets visuels existants (tilt au survol, animation d'entrée) restent fonctionnels après la correction.

## Assumptions

- La correction s'applique uniquement à la mise en page — aucun changement de style (couleurs, typographie, espacement interne) n'est requis.
- Le comportement mobile (colonne unique) est actuellement correct et ne doit pas changer.
- La solution doit être robuste pour les ajouts futurs de boutons ou de contenu.
