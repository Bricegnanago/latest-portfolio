# Feature Specification: Vidéo de démo — QR Order System

**Feature Branch**: `003-qr-order-demo-video`
**Created**: 2026-02-21
**Status**: Draft
**Input**: User description: "j'aimerais ajouter une video de demo pour le projet QR Order System"

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Visionner la démo du projet QR Order System (Priority: P1)

Un visiteur du portfolio parcourt la section Projets et souhaite voir concrètement comment fonctionne le système QR Order. Il clique sur un bouton "Voir la démo" sur la fiche du projet QR Order System, et une vidéo de démonstration se lance, lui permettant de découvrir le produit sans quitter la page.

**Why this priority**: C'est la valeur centrale de la feature — permettre à un recruteur ou client de voir la démo du projet en un clic. Sans cela, la feature n'existe pas.

**Independent Test**: Peut être validé en ouvrant la page portfolio, en localisant la carte QR Order System et en cliquant "Voir la démo" pour vérifier que la vidéo démarre correctement.

**Acceptance Scenarios**:

1. **Given** le visiteur est sur la page portfolio (section Projets), **When** il clique sur le bouton "Voir la démo" de la carte QR Order System, **Then** la vidéo `event_project.mp4` se lance et est visible.
2. **Given** la vidéo est en cours de lecture, **When** le visiteur appuie sur Pause ou ferme le lecteur, **Then** la lecture s'arrête immédiatement.
3. **Given** le visiteur est sur un appareil mobile, **When** il accède à la carte QR Order System, **Then** le bouton "Voir la démo" est visible et la vidéo peut être lue sans problème.

---

### User Story 2 — Fermer la vidéo et revenir au portfolio (Priority: P2)

Le visiteur a terminé de visionner la démo et souhaite revenir à la navigation normale du portfolio sans recharger la page.

**Why this priority**: Essentiel pour l'expérience utilisateur — la vidéo ne doit pas piéger l'utilisateur.

**Independent Test**: Peut être validé en ouvrant la vidéo puis en la fermant (croix, clic extérieur, touche Échap) pour vérifier que le visiteur retrouve l'état initial de la page.

**Acceptance Scenarios**:

1. **Given** la vidéo est ouverte, **When** le visiteur clique en dehors du lecteur ou sur un bouton "Fermer", **Then** la vidéo se ferme et la page portfolio reprend son état normal.
2. **Given** la vidéo est ouverte, **When** le visiteur appuie sur la touche Échappement (Escape), **Then** la vidéo se ferme.

---

### Edge Cases

- Que se passe-t-il si le fichier vidéo est absent ou corrompu ? Le bouton reste visible mais un message d'erreur approprié s'affiche.
- Que se passe-t-il si le visiteur ouvre plusieurs onglets simultanément ? Chaque instance est indépendante.
- Le bouton "Voir la démo" doit uniquement apparaître sur la carte QR Order System, pas sur les autres projets.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La fiche du projet QR Order System DOIT afficher un bouton "Voir la démo" permettant de lancer la vidéo de démonstration.
- **FR-002**: La vidéo de démonstration DOIT être la vidéo existante `event_project.mp4` hébergée localement dans le dossier public.
- **FR-003**: La vidéo DOIT s'afficher dans un lecteur intégré (modal/lightbox) superposé à la page, sans navigation vers une nouvelle page.
- **FR-004**: Le lecteur vidéo DOIT proposer les contrôles de lecture standards (lecture, pause, volume, plein écran).
- **FR-005**: Le visiteur DOIT pouvoir fermer le lecteur via un bouton "Fermer", un clic à l'extérieur du lecteur, ou la touche Échappement.
- **FR-006**: La lecture de la vidéo DOIT s'arrêter automatiquement à la fermeture du lecteur.
- **FR-007**: La feature DOIT être fonctionnelle sur les appareils mobiles et les navigateurs modernes (responsive).
- **FR-008**: Le modèle de données du projet DOIT supporter un champ optionnel pour référencer une vidéo de démo, afin que seul le projet QR Order System affiche ce bouton.

### Key Entities

- **Projet (Project)**: Entité représentant un projet du portfolio. Enrichie d'un champ optionnel `videoUrl` pointant vers le fichier vidéo local.
- **Vidéo de démo**: Fichier vidéo MP4 déjà présent (`event_project.mp4`), référencé par le projet QR Order System.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un visiteur peut lancer la vidéo de démo du projet QR Order System en moins de 2 clics depuis la section Projets.
- **SC-002**: La vidéo se charge et commence à se lire en moins de 3 secondes sur une connexion standard.
- **SC-003**: Le bouton "Voir la démo" apparaît uniquement sur la carte QR Order System — aucun autre projet ne l'affiche (à moins qu'une vidéo lui soit explicitement associée).
- **SC-004**: La fermeture du lecteur (par tout moyen disponible) interrompt systématiquement la lecture.
- **SC-005**: La feature est accessible et utilisable sur mobile, tablette et desktop sans dégradation fonctionnelle.

## Assumptions

- La vidéo `public/images/event_project.mp4` est la vidéo finale et ne sera pas remplacée dans le cadre de cette feature.
- La vidéo s'affiche dans une modale (lightbox) plutôt qu'en ligne dans la carte, afin de ne pas modifier le layout existant de la grille de projets.
- Les autres projets (Ticket System, ZoomStudent) ne bénéficient pas de vidéo de démo dans cette itération.
- La lecture automatique (autoplay) au chargement de la modal est acceptée, car c'est le comportement attendu pour une démo.
