# Feature Specification: Fix Experience Card Header Layout

**Feature Branch**: `008-fix-experience-card-header`
**Created**: 2026-02-28
**Status**: Draft
**Input**: User description: "Je constate que la disposition en entete du card pour les experiences s'entre mele. Le titre du poste et la periode du poste ne s'affiche pas en parfait harmonie"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visitor Reads a Clean, Aligned Card Header (Priority: P1)

Un visiteur consulte la section Expériences. Pour chaque carte, le titre du poste et la période d'emploi s'affichent de manière harmonieuse : peu importe la longueur du titre (court ou long, tenant sur une ou plusieurs lignes), la date ne "flotte" jamais à côté d'un titre tronqué ni ne se mêle à lui. La hiérarchie visuelle est immédiatement lisible.

**Why this priority**: Le problème est visuellement immédiat et visible sur la première carte dès l'ouverture de la section. Il dégrade la crédibilité du portfolio. C'est le seul problème à corriger.

**Independent Test**: Afficher la section Expériences avec un titre long (ex: "Ingénieur de Developpement Web et Mobile") → le titre s'affiche entièrement → la date s'affiche de manière distincte, sans chevauchement ni flottement visuel avec le titre.

**Acceptance Scenarios**:

1. **Given** une carte d'expérience avec un titre long (≥ 4 mots), **When** le visiteur la voit sur desktop, **Then** le titre du poste s'affiche entièrement sur sa propre ligne et la date apparaît clairement positionnée en dessous — aucun chevauchement, aucun flottement à côté d'une ligne interrompue.
2. **Given** une carte d'expérience avec un titre court (2-3 mots), **When** le visiteur la voit, **Then** titre et date restent alignés de façon cohérente avec les autres cartes.
3. **Given** la section sur mobile, **When** le visiteur la consulte, **Then** le titre et la date sont empilés verticalement — le titre en premier, la date en dessous — sans aucun chevauchement.
4. **Given** la section en dark mode ou light mode, **When** le visiteur lit les en-têtes, **Then** la correction s'applique dans les deux thèmes sans régression visuelle.

---

### Edge Cases

- Qu'arrive-t-il si le titre est très court (1-2 mots) ? La mise en page doit rester cohérente sans espace vide excessif.
- Qu'arrive-t-il si la date est longue (ex: "Septembre 2022 — Décembre 2023") ? La date doit rester lisible et ne pas déborder.
- Qu'arrive-t-il avec 4 expériences ou plus dans la liste ? La correction doit s'appliquer uniformément à toutes les cartes.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Le titre du poste et la période d'emploi DOIVENT toujours s'afficher de manière visuellement distincte et non entremêlée, quelle que soit la longueur du titre.
- **FR-002**: Sur mobile, le titre et la date DOIVENT être empilés verticalement (titre en premier, date en dessous).
- **FR-003**: Sur desktop, même un titre très long NE DOIT PAS provoquer de chevauchement ou de mauvais alignement avec la date.
- **FR-004**: La correction NE DOIT PAS affecter les autres éléments de la carte (nom de l'entreprise, localisation, description, responsabilités).
- **FR-005**: La correction NE DOIT PAS affecter les animations, les nœuds de timeline, ni l'alternance gauche/droite introduits par la feature 007.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% des en-têtes de cartes d'expérience affichent le titre et la date sans chevauchement, sur toutes les tailles d'écran de 320px à 1440px.
- **SC-002**: Un observateur externe, en regardant la section Expériences, décrit spontanément les en-têtes comme "propres" et "lisibles" sans qu'on lui signale la correction.
- **SC-003**: Aucune régression sur les autres éléments de la carte (entreprise, localisation, description, responsabilités) ni sur la timeline animée — leur affichage reste identique avant et après la correction.

## Assumptions

- La correction porte uniquement sur la disposition titre + date dans le `CardHeader` — aucun changement de couleur, typographie ou contenu.
- Les données des expériences restent inchangées.
- Le comportement des animations d'entrée et des nœuds de timeline n'est pas affecté.
- La solution adoptée sera : titre et date empilés verticalement dans tous les cas (mobile et desktop), ce qui élimine tout problème d'alignement quelle que soit la longueur du titre.
