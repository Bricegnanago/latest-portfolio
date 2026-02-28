# Feature Specification: Animated Hero Section

**Feature Branch**: `010-animated-hero`
**Created**: 2026-02-28
**Status**: Draft
**Input**: Refonte complète de la section Hero avec cinétique typographique, micro-interactions, background subtil animé, layout splitté, et animations d'entrée élaborées pour un rendu portfolio 2026 ultra-moderne.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Première impression animée au chargement (Priority: P1)

Un visiteur atterrit sur le portfolio. La section Hero occupe tout l'écran et l'accueille avec une séquence d'animations soignée : le prénom et nom apparaissent lettre par lettre, le titre professionnel glisse vers le haut, la description s'affiche mot par mot, et les boutons d'action surgissent avec un léger effet de rebond. L'avatar ou illustration apparaît avec un halo subtil. Le tout se déroule en 2 à 3 secondes maximum, sans aucun saut de layout.

**Why this priority**: C'est la première chose que voit chaque visiteur. Une entrée animée pro et fluide établit immédiatement la crédibilité et retient l'attention le temps de lire le contenu.

**Independent Test**: Charger la page à froid → observer la séquence d'animation complète → vérifier que tout le contenu textuel est lisible une fois les animations terminées.

**Acceptance Scenarios**:

1. **Given** la page se charge, **When** le Hero entre dans le viewport, **Then** le nom s'anime lettre par lettre avec un effet de ressort sur une durée de 0,8 à 1,2 s
2. **Given** le nom a fini de s'afficher, **When** le délai suit, **Then** le titre professionnel glisse vers le haut et devient visible en 0,4 s
3. **Given** le titre est visible, **When** le délai suit, **Then** la description s'affiche mot par mot ou en fade-in progressif
4. **Given** la description est visible, **When** le délai suit, **Then** les deux boutons CTA apparaissent avec un léger effet pop
5. **Given** toutes les animations sont terminées, **When** le visiteur lit le contenu, **Then** tout le texte est parfaitement lisible, sans artefact, ni superposition

---

### User Story 2 — Micro-interactions et interactivité au survol (Priority: P2)

Un visiteur explore la section Hero avec sa souris sur desktop. Passer sur le nom ou le titre produit un effet de lueur subtil (glow). Les boutons CTA réagissent au survol avec une légère mise à l'échelle et un halo coloré. L'avatar flotte doucement en continu et réagit au déplacement de la souris avec un léger parallaxe.

**Why this priority**: Ces détails transforment une section statique en expérience interactive, signalant le soin apporté aux détails — exactement ce qu'un recruteur ou client potentiel remarque.

**Independent Test**: Survoler chaque élément interactif (nom, titre, boutons, avatar) → chaque élément répond visuellement de façon cohérente et fluide, sans décalage perceptible.

**Acceptance Scenarios**:

1. **Given** les animations d'entrée sont terminées, **When** le visiteur survole le nom ou le titre, **Then** un glow cyan/violet subtil apparaît autour du texte
2. **Given** le visiteur survole le bouton "Voir mes projets", **When** sa souris entre dans la zone du bouton, **Then** le bouton augmente légèrement de taille et un halo coloré s'affiche
3. **Given** le visiteur survole le bouton "Me contacter", **When** sa souris entre dans la zone du bouton, **Then** même comportement, visuellement cohérent avec le premier bouton
4. **Given** l'avatar est visible, **When** la page est chargée, **Then** l'avatar effectue une lévitation douce et continue (animation loopée)
5. **Given** le visiteur déplace sa souris dans le Hero, **When** la souris se déplace, **Then** l'avatar effectue un micro-parallaxe suivant la direction du curseur

---

### User Story 3 — Accessibilité, performance et adaptation mobile (Priority: P3)

Un visiteur sur mobile ou ayant activé "préférer les animations réduites" dans son système accède au Hero. La section s'affiche correctement sans animations intrusives, avec le contenu immédiatement lisible. Sur mobile, le layout passe en colonne unique centré. Les animations, si actives, tournent à 60 fps sans à-coups.

**Why this priority**: Un portfolio non-responsive ou qui lag sur mobile donne une image négative. L'accessibilité protège tous les visiteurs.

**Independent Test**: Ouvrir sur mobile (viewport < 768 px) → contenu lisible, layout adapté en colonne → activer prefers-reduced-motion → animations supprimées ou réduites à de simples fades.

**Acceptance Scenarios**:

1. **Given** le visiteur est sur mobile (< 768 px), **When** le Hero s'affiche, **Then** le layout est en colonne unique centrée, texte lisible, aucun débordement horizontal
2. **Given** prefers-reduced-motion est activé, **When** le Hero se charge, **Then** toutes les animations cinétiques sont désactivées ou remplacées par un simple fade global
3. **Given** le Hero est affiché sur desktop, **When** les animations sont actives, **Then** le rendu se fait à 60 fps sans drop notable (mesuré via DevTools)
4. **Given** le background animé est actif, **When** la page charge, **Then** aucun Cumulative Layout Shift (CLS) n'est provoqué par les éléments animés

---

### Edge Cases

- Que se passe-t-il si l'avatar/photo n'est pas encore fourni ? → Le layout reste stable avec un placeholder ou l'espace est omis proprement.
- Que se passe-t-il sur très petit écran (< 360 px) ? → Le texte et boutons restent lisibles, pas de débordement.
- Que se passe-t-il si JavaScript est désactivé ? → Le contenu est immédiatement visible (pas de texte caché en permanence), les animations sont simplement absentes.
- Que se passe-t-il si l'utilisateur scrolle très vite dès l'arrivée ? → Le Hero ne bloque pas le scroll; les animations hors-viewport s'arrêtent proprement.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Le Hero DOIT occuper au minimum la hauteur complète du viewport à l'arrivée sur la page
- **FR-002**: Le Hero DOIT afficher : prénom et nom, titre professionnel, courte description, deux boutons CTA ("Voir mes projets" et "Me contacter"), un avatar ou illustration
- **FR-003**: Le Hero DOIT animer le prénom/nom lettre par lettre avec un effet de ressort au chargement de la page
- **FR-004**: Le titre professionnel DOIT apparaître en glissement vertical après le nom, avec un délai
- **FR-005**: La description DOIT apparaître en stagger par mots ou en fade progressif après le titre
- **FR-006**: Les boutons CTA DOIT surgir avec un effet pop (scale + opacity) après la description
- **FR-007**: Le Hero DOIT afficher un fond animé subtil (gradient pulsant lent, sans flashy)
- **FR-008**: L'avatar DOIT effectuer une animation de lévitation continue au repos
- **FR-009**: Le survol du nom, titre ou boutons DOIT déclencher un effet visuel (glow, scale, ou halo) sur desktop
- **FR-010**: Sur desktop (≥ 768 px), le layout DOIT être splitté : contenu textuel + CTAs à gauche, avatar à droite
- **FR-011**: Sur mobile (< 768 px), le layout DOIT être en colonne unique, centré
- **FR-012**: Toutes les animations DOIT être désactivées ou remplacées par un simple fade lorsque prefers-reduced-motion est activé
- **FR-013**: Le Hero DOIT inclure un indicateur de scroll vers le bas (flèche ou chevron animé) pour inviter à continuer la lecture

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: La séquence d'animation d'entrée complète (nom → titre → description → CTAs → avatar) se termine en moins de 3 secondes après le début du chargement de la page
- **SC-002**: La section s'affiche sans Cumulative Layout Shift (CLS > 0) — aucun repositionnement de contenu après rendu initial
- **SC-003**: Toutes les animations tournent à 60 fps sur desktop moderne — aucune animation ne provoque de drop visible dans DevTools
- **SC-004**: Sur mobile (375 px × 812 px), tout le contenu Hero est visible et lisible sans scroll horizontal
- **SC-005**: Avec prefers-reduced-motion activé, aucune animation de mouvement (translation, rotation, scale) n'est déclenchée — seuls des fades sont autorisés
- **SC-006**: Les deux boutons CTA sont cliquables et fonctionnels dès la fin des animations (aucune superposition invisible ne bloque les clics)
- **SC-007**: Le Hero est entièrement autonome — son retrait ou ajout n'impacte aucune autre section du portfolio

## Assumptions

- Le contenu (nom, titre, description, avatar) sera fourni sous forme de constantes dans le composant ou dans un fichier de données existant
- L'avatar est une image statique dans `/public/images/` (à confirmer lors du plan)
- Les couleurs primaires cyan/violet correspondent aux tokens CSS existants (`--primary`) dans le thème du projet
- Framer Motion est déjà installé dans le projet
- Aucun nouveau package externe (particles, custom cursor) n'est requis — tout est réalisé via CSS/Framer Motion natif
