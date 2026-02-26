# Feature Specification: Animations réactives à la souris

**Feature Branch**: `004-mouse-driven-animations`
**Created**: 2026-02-25
**Status**: Draft
**Input**: User description: "J'aimerais qu'on ajoute un peu plus d'animation. Et que l'animation peut vivre la direction de la souris. Mais le design doit rester cohérent."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Effet de suivi de souris sur les cartes (Priority: P1)

Quand un visiteur survole une carte (projet, compétence, expérience), celle-ci s'incline légèrement dans la direction du curseur, créant un effet 3D subtil de type "tilt". Cela rend le portfolio plus interactif et vivant tout en restant professionnel.

**Why this priority**: C'est l'interaction la plus visible et la plus impactante. Les cartes représentent le contenu principal du portfolio (projets, expériences). Un effet tilt directionnel donne immédiatement une impression de modernité et de soin du détail.

**Independent Test**: Peut être testé en survolant n'importe quelle carte du portfolio — l'inclinaison doit suivre la position du curseur de manière fluide et se réinitialiser en douceur quand le curseur quitte la carte.

**Acceptance Scenarios**:

1. **Given** un visiteur sur la page portfolio, **When** il déplace sa souris sur une carte projet, **Then** la carte s'incline subtilement vers la direction du curseur (max 10-15 degrés).
2. **Given** une carte inclinée par le survol, **When** le curseur quitte la carte, **Then** la carte revient à sa position initiale avec une transition douce (pas de saut brusque).
3. **Given** un visiteur déplaçant rapidement sa souris sur une carte, **When** le curseur change de direction, **Then** l'inclinaison suit le mouvement de façon fluide, sans saccades ni tremblement.

---

### User Story 2 - Effet de lumière directionnelle au survol (Priority: P2)

Quand un visiteur survole une carte, un reflet lumineux subtil suit la position du curseur, simulant une source de lumière qui se déplace. Cela renforce l'effet de profondeur et de matérialité des cartes.

**Why this priority**: Cet effet complète naturellement le tilt 3D (P1) en ajoutant une dimension visuelle supplémentaire. Seul, il apporte déjà de la profondeur au survol des cartes, même sans l'effet tilt.

**Independent Test**: Peut être testé en survolant une carte — un gradient lumineux semi-transparent doit apparaître et suivre la position de la souris sur la surface de la carte.

**Acceptance Scenarios**:

1. **Given** un visiteur survolant une carte, **When** la souris se déplace sur la carte, **Then** un reflet lumineux subtil (gradient radial semi-transparent) suit la position du curseur.
2. **Given** un reflet lumineux visible sur une carte, **When** le curseur quitte la carte, **Then** le reflet disparaît progressivement (fondu doux).
3. **Given** un visiteur en mode sombre, **When** il survole une carte, **Then** le reflet lumineux est adapté au thème sombre (intensité et couleur ajustées) pour rester visible mais pas éblouissant.

---

### User Story 3 - Animations de défilement enrichies (Priority: P3)

Quand un visiteur fait défiler la page, les éléments apparaissent avec des animations plus variées et expressives que les simples fondus actuels : entrées directionnelles alternées, effets de mise à l'échelle progressifs, et révélations séquentielles plus marquées.

**Why this priority**: Enrichit l'ensemble de l'expérience de navigation sans nécessiter d'interaction souris directe. Améliore la première impression lors du défilement initial.

**Independent Test**: Peut être testé en faisant défiler la page du haut vers le bas — chaque section doit avoir une animation d'entrée distincte et fluide, cohérente avec l'identité visuelle du site.

**Acceptance Scenarios**:

1. **Given** un visiteur qui défile vers la section compétences, **When** les badges de compétences entrent dans le viewport, **Then** ils apparaissent avec un effet progressif en cascade (léger décalage temporel entre chaque badge).
2. **Given** un visiteur qui défile vers la section projets, **When** les cartes projets entrent dans le viewport, **Then** elles apparaissent avec une combinaison fondu + translation + légère mise à l'échelle, avec un décalage progressif.
3. **Given** un visiteur revenant en haut de la page, **When** il défile à nouveau vers le bas, **Then** les animations ne se rejouent PAS (elles ne s'activent qu'une seule fois).

---

### User Story 4 - Effet de parallaxe subtil sur la section héro (Priority: P4)

Dans la section héro, les éléments de texte et décoratifs réagissent légèrement au mouvement de la souris, créant un effet de profondeur multicouche. Cela rend la première section immédiatement captivante.

**Why this priority**: Bien que visuellement impactant, cet effet est limité à une seule section. Il peut être ajouté indépendamment après les interactions plus globales.

**Independent Test**: Peut être testé en déplaçant la souris lentement dans la section héro — les différents éléments (titre, sous-titre, boutons) doivent se déplacer à des vitesses différentes, créant un effet de profondeur.

**Acceptance Scenarios**:

1. **Given** un visiteur sur la section héro, **When** il déplace sa souris, **Then** le titre principal se déplace légèrement dans la direction opposée au curseur (effet parallaxe inversé, max 10-20px de déplacement).
2. **Given** un visiteur sur la section héro, **When** il déplace sa souris, **Then** les éléments secondaires (sous-titre, boutons) se déplacent à des vitesses/amplitudes différentes du titre, créant des couches de profondeur.
3. **Given** un visiteur sur mobile ou tablette (pas de souris), **When** il consulte la section héro, **Then** un subtil effet d'animation au défilement remplace l'effet souris, sans dégradation de l'expérience.

---

### Edge Cases

- Que se passe-t-il sur les appareils tactiles (smartphones, tablettes) où il n'y a pas de curseur souris ? Les animations liées à la souris doivent être désactivées ou remplacées par des alternatives tactiles appropriées.
- Que se passe-t-il si l'utilisateur a activé les préférences de mouvement réduit (`prefers-reduced-motion`) ? Toutes les animations directionnelles doivent être désactivées pour respecter l'accessibilité.
- Que se passe-t-il si le curseur se déplace très rapidement d'une carte à l'autre ? Les transitions de sortie/entrée doivent se chevaucher sans glitch visuel.
- Que se passe-t-il sur des écrans très larges (> 2560px) ? L'amplitude des effets doit être proportionnelle et ne pas paraître exagérée.
- Que se passe-t-il si le navigateur ne supporte pas les transformations 3D ? Le site doit rester entièrement fonctionnel et lisible, sans animation plutôt qu'avec une animation cassée.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Le système DOIT appliquer un effet d'inclinaison 3D (tilt) sur les cartes interactives (projets, compétences) qui suit la position du curseur sur la surface de la carte.
- **FR-002**: L'inclinaison maximale DOIT être limitée à un angle subtil (10-15 degrés) pour rester professionnel et non distrayant.
- **FR-003**: Le système DOIT afficher un reflet lumineux (gradient radial) qui suit le curseur sur les cartes survolées, simulant une source de lumière directionnelle.
- **FR-004**: Le reflet lumineux DOIT s'adapter au thème actif (clair/sombre) pour garantir la cohérence visuelle.
- **FR-005**: Le système DOIT enrichir les animations de défilement existantes avec des variantes plus expressives (translations directionnelles, mises à l'échelle, cascades temporelles).
- **FR-006**: Les animations de défilement DOIVENT ne se déclencher qu'une seule fois par session (pas de ré-animation au scroll retour).
- **FR-007**: Le système DOIT appliquer un effet de parallaxe multicouche dans la section héro, réactif au mouvement de la souris.
- **FR-008**: Le système DOIT désactiver toutes les animations souris sur les appareils tactiles et les remplacer par des alternatives au défilement quand c'est pertinent.
- **FR-009**: Le système DOIT respecter la préférence `prefers-reduced-motion` en désactivant toutes les animations avancées tout en gardant le contenu entièrement accessible.
- **FR-010**: Toutes les transitions de retour à l'état initial (sortie de survol) DOIVENT être douces et progressives (pas de saut instantané).
- **FR-011**: Le système DOIT maintenir un taux de rafraîchissement fluide (pas de chute de performance perceptible) pendant les animations souris.
- **FR-012**: L'ensemble des animations DOIT rester cohérent avec le design existant du portfolio (couleurs, espacements, typographie inchangés).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Les effets de tilt et de lumière répondent au mouvement du curseur en temps réel (latence perçue inférieure à 50ms).
- **SC-002**: Toutes les animations s'exécutent sans chute de fluidité perceptible par l'utilisateur sur un appareil standard (ordinateur portable de moins de 5 ans).
- **SC-003**: La préférence `prefers-reduced-motion` désactive 100% des animations directionnelles — le site reste totalement utilisable et lisible.
- **SC-004**: Sur appareils tactiles, aucun effet souris n'est déclenché — les alternatives au défilement sont visuellement équivalentes en qualité.
- **SC-005**: Le design global (couleurs, typographie, espacements, structure) reste identique à la version actuelle — seuls les mouvements et effets visuels sont ajoutés.
- **SC-006**: Les animations enrichies améliorent la perception de modernité et d'interactivité du portfolio auprès des visiteurs (impression visuelle premium).

## Assumptions

- L'amplitude des effets (angles de tilt, distance de parallaxe) est calibrée pour être subtile et professionnelle — pas de mouvement exagéré qui pourrait paraître "gadget".
- Les animations de défilement existantes seront enrichies et non remplacées — l'approche est additive.
- Le taux de rafraîchissement des animations souris sera optimisé pour ne pas impacter les performances (throttling si nécessaire).
- Les effets 3D (perspective, rotateX/Y) sont bien supportés par les navigateurs modernes cibles (Chrome, Firefox, Safari, Edge des 3 dernières années).
- Sur mobile, les animations de défilement standard suffisent — aucun effet gyroscope ou tactile avancé n'est attendu.
