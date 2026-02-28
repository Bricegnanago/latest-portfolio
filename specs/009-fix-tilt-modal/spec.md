# Feature Specification: Fix Card Tilt Effect When Modal Is Open

**Feature Branch**: `009-fix-tilt-modal`
**Created**: 2026-02-28
**Status**: Draft
**Input**: User description: "je constate que lorsque je survole la modal des videos de projet ou les images d'un projet, la souris en mouvement fais tourner le Card de projet sur lui meme. Il faut generalement fermer le modal survoler le card de projet pour qu'il revienne a l'endroit"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visitor Views Modal Without Card Rotating Behind It (Priority: P1)

Un visiteur ouvre le modal de démonstration vidéo ou la galerie d'images d'un projet. Pendant qu'il navigue dans le modal (déplace la souris, fait défiler, clique sur les boutons du modal), la carte de projet derrière le modal reste immobile et plate. Le visiteur peut consulter les captures ou la vidéo sans perturbation visuelle de la carte en arrière-plan.

**Why this priority**: C'est le problème central signalé. La rotation involontaire de la carte pendant l'utilisation du modal est visuellement dérangeante et dégrade l'expérience utilisateur de façon immédiate et visible.

**Independent Test**: Ouvrir le modal vidéo ou galerie d'images d'une carte projet → déplacer la souris dans tous les sens à l'intérieur du modal → la carte de projet derrière le modal reste plate et immobile (aucune rotation, aucun effet de tilt, aucun reflet brillant).

**Acceptance Scenarios**:

1. **Given** qu'un modal de galerie d'images est ouvert sur une carte projet, **When** le visiteur déplace la souris à l'intérieur du modal, **Then** la carte de projet en arrière-plan ne tourne pas et ne réagit pas aux mouvements de souris.
2. **Given** qu'un modal de démonstration vidéo est ouvert sur une carte projet, **When** le visiteur déplace la souris à l'intérieur du modal, **Then** la carte de projet en arrière-plan reste parfaitement immobile et plate.
3. **Given** qu'un modal est ouvert, **When** le visiteur ferme le modal, **Then** la carte de projet est dans sa position neutre (plate, sans rotation) — elle n'est pas figée dans un état incliné.
4. **Given** qu'un modal est fermé, **When** le visiteur survole à nouveau la carte de projet, **Then** l'effet de tilt fonctionne normalement — la carte réagit aux mouvements de souris comme avant.

---

### Edge Cases

- Qu'arrive-t-il si le visiteur ouvre et ferme rapidement le modal plusieurs fois de suite ? L'état de la carte doit toujours revenir à plat correctement.
- Qu'arrive-t-il si l'effet de tilt est déjà engagé (carte inclinée) au moment où le visiteur ouvre le modal ? La carte doit retourner à la position neutre à l'ouverture du modal.
- Qu'arrive-t-il sur mobile (où il n'y a pas d'effet de tilt puisque le tilt est désactivé sur les appareils sans souris précise) ? Aucune régression — le comportement mobile ne doit pas changer.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Lorsqu'un modal (galerie d'images ou vidéo) est ouvert sur une carte projet, l'effet de tilt de cette carte DOIT être suspendu — aucune rotation ni reflet brillant ne doit se produire.
- **FR-002**: À l'ouverture d'un modal, la carte de projet DOIT retourner immédiatement à sa position neutre (plate, sans inclinaison).
- **FR-003**: À la fermeture du modal, la carte de projet DOIT être dans sa position neutre et prête à réactiver l'effet de tilt dès le prochain survol.
- **FR-004**: L'effet de tilt DOIT fonctionner normalement sur toutes les cartes projet lorsqu'aucun modal n'est ouvert.
- **FR-005**: La correction NE DOIT PAS affecter le comportement des boutons du modal ni l'expérience de navigation dans la galerie ou la vidéo.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 0 cas où la carte de projet tourne ou s'incline pendant qu'un modal est ouvert, testé en déplaçant la souris dans toutes les directions à l'intérieur du modal.
- **SC-002**: À la fermeture de tout modal, 100% des cartes concernées sont dans leur position neutre (plate) sans action supplémentaire de l'utilisateur.
- **SC-003**: L'effet de tilt fonctionne normalement sur toutes les cartes après fermeture du modal — aucune régression de l'expérience de survol.

## Assumptions

- Le problème concerne uniquement les modaux de la section Projets (galerie d'images et modal vidéo) — les autres sections du portfolio ne sont pas affectées.
- Le comportement sur mobile ne change pas — l'effet de tilt est déjà désactivé sur les appareils sans souris précise.
- La correction est apportée dans la logique des composants existants sans modifier l'expérience visuelle des modaux eux-mêmes.
