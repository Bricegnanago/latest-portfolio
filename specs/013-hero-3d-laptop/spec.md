# Feature Specification: Laptop 3D Tournant dans le Hero

**Feature Branch**: `013-hero-3d-laptop`
**Created**: 2026-03-01
**Status**: Draft
**Input**: Version 3D light : Option avancée : intégrer un élément 3D léger avec @react-three/fiber laptop tournant

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Immersion visuelle : laptop 3D animé dans le fond du Hero (Priority: P1)

Un visiteur ouvre le portfolio sur desktop. Dans la section Hero, un laptop 3D low-poly est visible en arrière-plan — il tourne lentement sur lui-même, donnant une profondeur visuelle distinctement "dev/tech" à la page. La rotation est douce et continue. L'objet s'intègre à la palette de couleurs du thème (teintes primaires translucides) et fonctionne en mode clair comme sombre. Le texte, l'avatar et les boutons CTA restent parfaitement lisibles au premier plan.

**Why this priority**: C'est la valeur principale de la feature — un laptop 3D identifie immédiatement le portfolio comme celui d'un développeur. Sans cet objet animé, la feature n'a pas de raison d'être.

**Independent Test**: Ouvrir le portfolio sur desktop → voir un laptop 3D animé en arrière-plan du Hero → rotation lente et continue → texte et boutons parfaitement lisibles par-dessus.

**Acceptance Scenarios**:

1. **Given** le portfolio est ouvert sur desktop, **When** la section Hero est visible, **Then** un laptop 3D est présent en arrière-plan, en rotation lente et continue
2. **Given** le laptop 3D est affiché, **When** le visiteur observe la section, **Then** l'objet utilise les couleurs du thème actif avec une opacité basse (< 50 %)
3. **Given** le mode sombre est actif, **When** le laptop 3D s'affiche, **Then** ses couleurs s'adaptent au fond sombre
4. **Given** le mode clair est actif, **When** le laptop 3D s'affiche, **Then** ses couleurs s'adaptent au fond clair
5. **Given** le laptop 3D est visible, **When** le visiteur lit le contenu du Hero, **Then** le texte, l'avatar et les boutons restent parfaitement lisibles — le laptop ne masque rien

---

### User Story 2 — Interactivité douce : le laptop réagit au mouvement de la souris (Priority: P2)

Un visiteur déplace sa souris dans la section Hero. Le laptop 3D s'oriente légèrement dans la direction de la souris, ajoutant une dimension interactive. L'effet est discret — une légère inclinaison (max 15–20°), pas une révolution complète. Lorsque la souris quitte la section, le laptop reprend sa rotation normale sans secousse.

**Why this priority**: L'interactivité souris renforce l'impression que le laptop est "vivant". Elle est secondaire car la rotation seule (US1) a déjà la valeur principale.

**Independent Test**: Déplacer lentement la souris sur le Hero → le laptop s'incline légèrement vers le curseur → sortir la souris → retour progressif à la rotation de base.

**Acceptance Scenarios**:

1. **Given** le laptop 3D est affiché, **When** le visiteur déplace sa souris dans le Hero, **Then** le laptop s'oriente légèrement vers le curseur (inclinaison max 15–20°)
2. **Given** la souris sort de la section Hero, **When** le visiteur scrolle, **Then** le laptop reprend sa rotation normale sans secousse visible

---

### User Story 3 — Performance et accessibilité : désactivation automatique (Priority: P3)

Un visiteur sur mobile ou avec prefers-reduced-motion accède au portfolio. Le laptop 3D n'est pas chargé — ni le modèle, ni le moteur de rendu. La section Hero s'affiche normalement avec ses autres éléments. Le score Lighthouse reste supérieur à 90.

**Why this priority**: Critique pour maintenir les scores de performance et l'accessibilité. Un modèle 3D non optimisé peut dégrader significativement les performances sur mobile.

**Independent Test**: Ouvrir sur mobile → aucun laptop 3D → Lighthouse > 90. Activer prefers-reduced-motion → aucun laptop 3D.

**Acceptance Scenarios**:

1. **Given** le visiteur est sur mobile (appareil tactile), **When** le Hero s'affiche, **Then** aucun élément 3D n'est chargé ni rendu
2. **Given** prefers-reduced-motion est activé, **When** le Hero s'affiche, **Then** le laptop 3D est désactivé
3. **Given** le laptop 3D est actif sur desktop, **When** la page charge, **Then** le score Lighthouse Performance reste supérieur à 90

---

### Edge Cases

- Que se passe-t-il si le fichier du modèle 3D échoue à charger (réseau lent, fichier manquant) ? → Le laptop ne s'affiche pas, le Hero fonctionne normalement sans erreur visible.
- Que se passe-t-il si le GPU du visiteur ne supporte pas le rendu 3D (WebGL désactivé) ? → Le laptop ne s'affiche pas, le Hero fonctionne normalement.
- Que se passe-t-il si le laptop se chevauche avec l'avatar ou les boutons CTA ? → Le laptop est positionné derrière le contenu (z-index négatif) et ne capture aucun clic.
- Que se passe-t-il lors d'un redimensionnement de fenêtre ? → Le canvas 3D s'adapte à la nouvelle taille sans rechargement.
- Que se passe-t-il si le modèle 3D est trop lourd et dégrade Lighthouse ? → Un modèle low-poly (< 500 KB) doit être utilisé, chargé de façon différée.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Un laptop 3D low-poly DOIT être visible en arrière-plan de la section Hero sur desktop uniquement
- **FR-002**: Le laptop 3D DOIT effectuer une rotation lente et continue (automatique, sans action utilisateur)
- **FR-003**: Le laptop 3D DOIT utiliser la couleur primaire du thème avec une opacité basse pour rester subtil
- **FR-004**: Le laptop 3D DOIT s'adapter automatiquement au mode clair et au mode sombre
- **FR-005**: Le laptop 3D DOIT réagir au mouvement de la souris avec une légère inclinaison (max 15–20°)
- **FR-006**: Le laptop 3D DOIT être positionné en arrière-plan — jamais au-dessus du texte, de l'avatar ou des boutons CTA
- **FR-007**: Le modèle 3D et son moteur de rendu DOIVENT être chargés de façon différée pour ne pas bloquer l'affichage initial
- **FR-008**: Le laptop 3D DOIT être désactivé automatiquement sur les appareils tactiles (mobile/tablette)
- **FR-009**: Le laptop 3D DOIT être désactivé automatiquement si `prefers-reduced-motion` est activé
- **FR-010**: En l'absence de support WebGL ou en cas d'échec de chargement du modèle, le Hero DOIT s'afficher normalement sans erreur visible
- **FR-011**: Le modèle 3D utilisé DOIT être low-poly (taille de fichier < 500 KB) pour minimiser l'impact sur les performances
- **FR-012**: Le canvas de rendu 3D DOIT se redimensionner automatiquement lors d'un changement de taille de fenêtre

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Le laptop 3D est visible dans le Hero en moins de 3 secondes après le chargement de la page sur desktop
- **SC-002**: Le score Lighthouse Performance reste supérieur à 90 avec le laptop 3D actif (pas de régression)
- **SC-003**: Le texte et les boutons du Hero maintiennent un ratio de contraste WCAG AA (≥ 4,5:1) avec le laptop 3D en fond
- **SC-004**: Sur mobile, aucun modèle 3D ne se charge — la section Hero s'affiche sans dégradation de performance
- **SC-005**: Avec prefers-reduced-motion actif, aucun laptop 3D ni animation n'est affiché
- **SC-006**: Le laptop 3D tourne à 60 fps sur desktop moderne sans drop visible
- **SC-007**: Le canvas 3D se redimensionne correctement lors d'un changement de taille de fenêtre, sans rechargement de page
- **SC-008**: En cas d'échec de chargement du modèle, le Hero s'affiche normalement sans erreur visible pour le visiteur

## Assumptions

- Le modèle 3D du laptop est un fichier **low-poly libre de droits** (format GLB/GLTF standard) — poids cible < 500 KB — à sourcer depuis des bibliothèques royalty-free (ex : Poly Pizza, Kenney.nl, Sketchfab Free)
- Le laptop est positionné dans le coin droit du Hero, partiellement visible, en arrière-plan
- Cette feature est une **alternative visuelle** à la feature 012 (icosaèdre géométrique) — les deux ne s'affichent pas simultanément ; l'une remplace l'autre dans `HeroSection.tsx`
- Le moteur de rendu 3D (WebGL) est déjà installé dans le projet via la feature 012
- Un chargeur de modèle GLTF/GLB sera nécessaire en dépendance supplémentaire
- Le laptop est affiché légèrement incliné (écran ouvert à ~45–60°) pour montrer à la fois le clavier et l'écran
- La couleur du modèle est teintée avec la couleur primaire du thème (violet translucide) pour s'intégrer à l'identité visuelle du portfolio
