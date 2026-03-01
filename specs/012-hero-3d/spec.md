# Feature Specification: Élément 3D Décoratif dans le Hero

**Feature Branch**: `012-hero-3d`
**Created**: 2026-03-01
**Status**: Draft
**Input**: Intégrer un élément 3D léger et décoratif (forme géométrique abstraite ou représentation d'un appareil tech) dans le fond de la section Hero pour renforcer l'identité visuelle tech du portfolio.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Immersion visuelle : objet 3D animé dans le fond du Hero (Priority: P1)

Un visiteur ouvre le portfolio sur desktop. Dans la section Hero, un objet 3D décoratif est visible en arrière-plan — une forme géométrique abstraite qui tourne lentement. La rotation est douce, continue, et donne une profondeur visuelle subtile à la page sans distraire du contenu principal (nom, titre, boutons CTA). L'objet s'intègre à la palette de couleurs du thème (teintes primaires translucides) et fonctionne en mode clair comme sombre.

**Why this priority**: C'est la valeur principale de la feature — l'identité visuelle 3D distinctive. Sans cet objet animé, la feature n'existe pas.

**Independent Test**: Ouvrir le portfolio sur desktop → voir un objet 3D animé en arrière-plan du Hero → texte, avatar et boutons parfaitement lisibles devant → rotation lente et continue.

**Acceptance Scenarios**:

1. **Given** le portfolio est ouvert sur desktop, **When** la section Hero est visible, **Then** un objet 3D géométrique est présent en arrière-plan, en rotation lente et continue
2. **Given** l'objet 3D est affiché, **When** le visiteur observe la section, **Then** l'objet utilise les couleurs du thème actif (primaire translucide) avec une opacité basse (< 50 %)
3. **Given** le mode sombre est actif, **When** l'objet 3D s'affiche, **Then** les couleurs s'adaptent automatiquement au fond sombre
4. **Given** le mode clair est actif, **When** l'objet 3D s'affiche, **Then** les couleurs s'adaptent automatiquement au fond clair
5. **Given** l'objet 3D est visible, **When** le visiteur lit le contenu du Hero, **Then** le texte, l'avatar et les boutons restent parfaitement lisibles — l'objet 3D ne masque rien

---

### User Story 2 — Interactivité douce : l'objet 3D réagit au mouvement de la souris (Priority: P2)

Un visiteur déplace sa souris dans la section Hero. L'objet 3D s'oriente légèrement dans la direction de la souris, ajoutant une dimension de profondeur interactive. L'effet est discret — une légère inclinaison, pas une révolution complète. Cette réactivité renforce l'impression que l'objet est "vivant" et réel.

**Why this priority**: L'interactivité souris transforme un simple élément décoratif en élément engageant. Elle est secondaire car l'animation de rotation seule (US1) a déjà la valeur principale.

**Independent Test**: Déplacer lentement la souris sur le Hero → l'objet 3D s'incline légèrement dans la direction du curseur → effet discret, non intrusif.

**Acceptance Scenarios**:

1. **Given** l'objet 3D est affiché, **When** le visiteur déplace sa souris dans le Hero, **Then** l'objet s'oriente légèrement vers le curseur (inclinaison max 15–20°)
2. **Given** la souris sort de la section Hero, **When** le visiteur scrolle, **Then** l'objet reprend sa rotation normale sans secousse

---

### User Story 3 — Accessibilité et performance : désactivation automatique (Priority: P3)

Un visiteur sur mobile ou avec prefers-reduced-motion accède au portfolio. L'objet 3D n'est pas chargé — la section Hero s'affiche normalement avec ses autres éléments (blobs CSS, particules). Le rendu 3D ne pèse pas sur le chargement initial de la page ni sur la batterie des appareils mobiles.

**Why this priority**: Indispensable pour maintenir les scores de performance (Lighthouse > 90) et l'accessibilité.

**Independent Test**: Ouvrir sur mobile → aucun objet 3D → Lighthouse > 90. Activer prefers-reduced-motion → aucun objet 3D.

**Acceptance Scenarios**:

1. **Given** le visiteur est sur mobile (viewport < 768 px ou appareil tactile), **When** le Hero s'affiche, **Then** aucun élément 3D n'est chargé ni rendu
2. **Given** prefers-reduced-motion est activé, **When** le Hero s'affiche, **Then** l'élément 3D est désactivé
3. **Given** l'élément 3D est actif sur desktop, **When** la page charge, **Then** le score Lighthouse Performance reste supérieur à 90

---

### Edge Cases

- Que se passe-t-il si le GPU du visiteur ne supporte pas le rendu 3D (WebGL désactivé) ? → L'objet 3D ne s'affiche pas, le Hero fonctionne normalement sans erreur visible.
- Que se passe-t-il si l'objet 3D se chevauche avec l'avatar ou les boutons CTA ? → L'objet est positionné derrière le contenu (z-index négatif) et ne capture aucun clic.
- Que se passe-t-il lors d'un redimensionnement de fenêtre ? → Le canvas 3D s'adapte à la nouvelle taille sans rechargement.
- Que se passe-t-il sur un écran très large (2K/4K) ? → L'objet garde une taille proportionnelle au viewport, pas de débordement.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Un objet 3D décoratif DOIT être visible dans le fond de la section Hero sur desktop uniquement
- **FR-002**: L'objet 3D DOIT effectuer une rotation lente et continue (automatique, sans action utilisateur)
- **FR-003**: L'objet 3D DOIT utiliser la couleur primaire du thème avec une opacité basse pour rester subtil
- **FR-004**: L'objet 3D DOIT s'adapter automatiquement au mode clair et au mode sombre
- **FR-005**: L'objet 3D DOIT réagir au mouvement de la souris avec une légère inclinaison (max 15–20°)
- **FR-006**: L'objet 3D DOIT être positionné en arrière-plan — jamais au-dessus du texte, de l'avatar ou des boutons CTA
- **FR-007**: L'objet 3D DOIT être chargé de façon différée pour ne pas bloquer l'affichage initial de la page
- **FR-008**: L'objet 3D DOIT être désactivé automatiquement sur les appareils tactiles (mobile/tablette)
- **FR-009**: L'objet 3D DOIT être désactivé automatiquement si `prefers-reduced-motion` est activé
- **FR-010**: En l'absence de support WebGL ou en cas d'erreur de rendu, le Hero DOIT s'afficher normalement sans message d'erreur visible
- **FR-011**: Le canvas de rendu 3D DOIT se redimensionner automatiquement lors d'un changement de taille de fenêtre

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: L'objet 3D est visible dans le Hero en moins de 2 secondes après le chargement de la page sur desktop
- **SC-002**: Le score Lighthouse Performance reste supérieur à 90 avec l'élément 3D actif (pas de régression)
- **SC-003**: Le texte et les boutons du Hero maintiennent un ratio de contraste WCAG AA (≥ 4,5:1) avec l'objet 3D en fond
- **SC-004**: Sur mobile, aucun élément 3D ne se charge — la section Hero s'affiche sans dégradation de performance
- **SC-005**: Avec prefers-reduced-motion actif, aucun objet 3D ni animation n'est affiché
- **SC-006**: L'objet 3D tourne à 60 fps sur desktop moderne sans drop visible
- **SC-007**: Le canvas 3D se redimensionne correctement lors d'un changement de taille de fenêtre, sans rechargement de page

## Assumptions

- L'objet 3D est une **forme géométrique abstraite** (tore, sphère facettée, cristal, icosaèdre ou anneau) — option plus légère qu'un modèle 3D complexe (laptop), sans fichier asset externe nécessaire
- La forme est générée procéduralement (code, pas de fichier .glb/.obj) pour minimiser le bundle
- L'objet est positionné dans le coin droit-haut ou droit-bas du Hero, partiellement visible, en arrière-plan
- Un moteur de rendu 3D basé sur WebGL sera nécessaire — son poids doit être chargé de façon différée
- La section Hero existante (`HeroSection.tsx`) sera modifiée pour accueillir l'élément 3D
- Le laptop 3D (cité dans la description) est une alternative possible mais non retenue par défaut car elle nécessite un fichier de modèle 3D externe (poids supplémentaire)
