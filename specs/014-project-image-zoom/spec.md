# Feature Specification: Zoom sur les Images de Projet

**Feature Branch**: `014-project-image-zoom`
**Created**: 2026-03-03
**Status**: Draft
**Input**: User description: "je constate que les images des projet ne peuvent pas etre zoomé ni agrandi"

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Agrandissement au clic d'une image (Priority: P1)

Un visiteur du portfolio consulte les captures d'écran d'un projet dans la galerie modale. Il souhaite voir une image en détail : il clique dessus (ou tape sur mobile) et l'image s'agrandit dans la modale. Un second clic (ou tap) revient à la vue normale.

**Why this priority**: C'est le besoin fondamental exprimé — les images ne sont pas agrandissables. Sans cette fonctionnalité, le visiteur ne peut pas lire les détails des captures de démonstration. C'est le MVP.

**Independent Test**: Ouvrir la galerie de n'importe quel projet → cliquer sur l'image → l'image s'agrandit pour remplir davantage l'espace disponible → cliquer à nouveau → retour à la taille normale. Testable seul, sans aucune autre story.

**Acceptance Scenarios**:

1. **Given** la galerie modale est ouverte sur une image, **When** l'utilisateur clique sur l'image, **Then** l'image passe en mode agrandi (zoom avant) et le curseur indique l'état zoomé
2. **Given** l'image est en mode agrandi, **When** l'utilisateur clique à nouveau, **Then** l'image revient à sa taille normale
3. **Given** l'image est en mode agrandi, **When** l'utilisateur appuie sur Échap, **Then** l'image revient à sa taille normale (sans fermer la modale)
4. **Given** l'image est en mode agrandi, **When** l'utilisateur navigue vers l'image suivante ou précédente, **Then** la nouvelle image s'affiche en taille normale (le zoom est réinitialisé)

---

### User Story 2 — Déplacement dans l'image agrandie (Priority: P2)

Lorsqu'une image est zoomée, le visiteur peut faire glisser l'image (drag) pour en explorer les différentes parties, notamment les coins et les bords qui dépassent les limites de la modale.

**Why this priority**: Un zoom sans possibilité de se déplacer est peu utile si l'image dépasse les bords de la modale. Cette fonctionnalité complète l'expérience de zoom de manière naturelle.

**Independent Test**: Zoomer sur une image large → faire glisser l'image avec la souris ou le doigt → différentes parties de l'image deviennent visibles. Testable indépendamment de US3.

**Acceptance Scenarios**:

1. **Given** l'image est agrandie et dépasse les limites de la modale, **When** l'utilisateur clique-glisse (drag) sur l'image, **Then** l'image se déplace dans la direction du drag, révélant les parties masquées
2. **Given** l'image est en cours de déplacement, **When** l'utilisateur relâche, **Then** l'image s'immobilise à sa nouvelle position
3. **Given** l'image est agrandie mais tient entièrement dans la modale, **When** l'utilisateur tente de faire glisser, **Then** l'image ne sort pas des limites de la modale

---

### User Story 3 — Zoom au pincement sur mobile (Priority: P3)

Sur un appareil tactile, le visiteur utilise le geste de pincement à deux doigts (pinch) pour zoomer et dé-zoomer sur l'image affichée dans la galerie.

**Why this priority**: Le pinch-to-zoom est le geste natif attendu sur mobile. Sans lui, les utilisateurs mobiles ne bénéficient pas de la fonctionnalité de zoom de manière intuitive.

**Independent Test**: Ouvrir la galerie sur un appareil mobile → effectuer un pincement sur une image → l'image s'agrandit proportionnellement au pincement. Testable sur mobile indépendamment de US1 et US2.

**Acceptance Scenarios**:

1. **Given** la galerie est ouverte sur mobile, **When** l'utilisateur effectue un pincement en écartant deux doigts, **Then** l'image s'agrandit proportionnellement
2. **Given** l'image est agrandie, **When** l'utilisateur effectue un pincement en rapprochant deux doigts, **Then** l'image se réduit jusqu'à sa taille normale minimum
3. **Given** l'image est agrandie par pincement, **When** l'utilisateur fait glisser avec un doigt, **Then** l'image se déplace (pan) pour explorer les zones masquées

---

### Edge Cases

- Que se passe-t-il si l'image est déjà petite (moins large que la modale) ? → Le zoom s'applique quand même mais l'image reste centrée sans dépasser les bords.
- Que se passe-t-il quand il n'y a qu'une seule image dans la galerie ? → Le zoom fonctionne normalement sans interaction avec la navigation.
- Que se passe-t-il si l'utilisateur zoome sur mobile et tente de swiper pour changer d'image ? → Si l'image est zoomée, le swipe de navigation est désactivé pour ne pas entrer en conflit avec le pan. La navigation par flèches reste disponible.
- Que se passe-t-il avec `prefers-reduced-motion` ? → L'animation de transition du zoom est désactivée mais la fonctionnalité reste disponible.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: L'utilisateur DOIT pouvoir agrandir une image en cliquant/tapant dessus dans la galerie modale
- **FR-002**: L'utilisateur DOIT pouvoir revenir à la taille normale en cliquant/tapant à nouveau sur l'image agrandie
- **FR-003**: La touche Échap DOIT annuler le zoom sans fermer la modale
- **FR-004**: La navigation vers une autre image DOIT réinitialiser le niveau de zoom à la valeur normale
- **FR-005**: Lorsque l'image est agrandie et dépasse les limites de la modale, l'utilisateur DOIT pouvoir déplacer l'image par glisser-déposer
- **FR-006**: Sur les appareils tactiles, l'utilisateur DOIT pouvoir zoomer par le geste de pincement à deux doigts
- **FR-007**: Le curseur DOIT indiquer visuellement la possibilité de zoomer (loupe +) et l'état zoomé (loupe − ou main)
- **FR-008**: Le zoom par swipe de navigation et le déplacement d'image NE DOIVENT PAS entrer en conflit sur mobile

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un visiteur peut agrandir n'importe quelle image de projet en 1 interaction (clic ou tap)
- **SC-002**: Un visiteur peut explorer toutes les zones d'une image agrandie sans fermer la modale
- **SC-003**: La fonctionnalité de zoom est disponible sur desktop ET mobile sans friction
- **SC-004**: L'activation du zoom et le retour à la taille normale s'effectuent chacun en moins d'une interaction (1 clic/tap)
- **SC-005**: La navigation entre images reste fonctionnelle même après utilisation du zoom

## Assumptions

- La galerie modale existante est le seul point d'entrée pour cette fonctionnalité — pas de zoom directement sur les cartes projet
- Un niveau de zoom fixe prédéfini (ex : 2×) est suffisant pour un toggle clic ; le zoom progressif est réservé au pinch mobile
- L'image agrandie reste dans les limites de la modale (pas de plein écran natif)
- La fonctionnalité s'applique à toutes les images de tous les projets qui possèdent une galerie
