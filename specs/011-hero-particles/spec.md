# Feature Specification: Fond Particulaire Animé (Hero)

**Feature Branch**: `011-hero-particles`
**Created**: 2026-02-28
**Status**: Draft
**Input**: Particules / fond animé subtil — enrichissement visuel de la section Hero d'un portfolio développeur tech.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Immersion visuelle : particules visibles dans la section Hero (Priority: P1)

Un visiteur ouvre le portfolio sur desktop. La section Hero affiche un fond animé composé de petites particules qui flottent lentement. Des lignes de connexion apparaissent entre les particules proches. L'ensemble respire la "tech" sans distraire du contenu — nom, titre, boutons CTA restent parfaitement lisibles au premier plan. Le fond particulaire s'intègre harmonieusement aux couleurs du thème (cyan/violet) et au mode clair comme sombre.

**Why this priority**: C'est la valeur principale de la feature — l'effet visuel distinctif qui positionne le portfolio comme un portfolio de développeur tech moderne. Sans cette story, la feature n'existe pas.

**Independent Test**: Ouvrir le portfolio → voir des particules animées dans le fond du Hero → contenu Hero lisible sans obstruction → particules cohérentes avec le thème visuel.

**Acceptance Scenarios**:

1. **Given** le portfolio est ouvert sur desktop, **When** la section Hero est visible, **Then** des particules flottantes sont présentes dans le fond, en mouvement lent et continu
2. **Given** les particules sont affichées, **When** deux particules sont proches, **Then** une ligne de connexion subtile les relie temporairement
3. **Given** le mode sombre est actif, **When** les particules s'affichent, **Then** les particules et lignes utilisent la teinte primaire du thème (cyan/violet) avec une opacité réduite
4. **Given** le mode clair est actif, **When** les particules s'affichent, **Then** les particules s'adaptent au fond clair en restant discrètes et lisibles
5. **Given** le contenu Hero est au premier plan, **When** les particules bougent derrière, **Then** le texte, les boutons et l'avatar restent parfaitement lisibles — aucune particule ne masque ni ne perturbe le contenu

---

### User Story 2 — Interactivité : particules réagissent à la souris (Priority: P2)

Un visiteur déplace sa souris sur la section Hero. Les particules proches du curseur s'écartent légèrement ou sont attirées vers lui, créant une sensation d'interaction avec le fond. Cet effet est doux et ne perturbe pas la navigation.

**Why this priority**: Cette interactivité renforce l'impression de profondeur et d'immersion tech. Elle est secondaire car les particules statiquement animées (US1) ont déjà la valeur principale.

**Independent Test**: Déplacer lentement la souris sur le Hero → particules proches réagissent au curseur (répulsion ou attraction légère) → effet visible mais non intrusif.

**Acceptance Scenarios**:

1. **Given** les particules sont affichées, **When** le visiteur déplace sa souris dans le Hero, **Then** les particules à moins de 120 px du curseur se déplacent légèrement en s'écartant ou s'approchant
2. **Given** la souris sort du Hero, **When** le visiteur scrolle vers le bas, **Then** les particules reprennent leur dérive normale sans artefact visuel

---

### User Story 3 — Accessibilité et performance : désactivation automatique (Priority: P3)

Un visiteur sur mobile ou ayant activé "préférer les animations réduites" accède au portfolio. Les particules ne s'affichent pas — la section Hero reste visuellement propre, avec seulement le fond gradient CSS existant. Les performances ne sont pas dégradées (pas de chargement de script de particules sur mobile).

**Why this priority**: Critique pour l'accessibilité et les Lighthouse scores. Les particules sur mobile consomment inutilement de la batterie et peuvent causer des lags sur appareils bas de gamme.

**Independent Test**: Ouvrir sur mobile (viewport < 768 px) → pas de particules, fond propre → activer prefers-reduced-motion → pas de particules → Lighthouse Performance > 90 maintenu.

**Acceptance Scenarios**:

1. **Given** le visiteur est sur mobile (écran tactile, viewport < 768 px), **When** le Hero s'affiche, **Then** aucune particule n'est chargée ni affichée
2. **Given** prefers-reduced-motion est activé, **When** le Hero s'affiche, **Then** les particules sont désactivées, le fond reste statique
3. **Given** les particules sont actives sur desktop, **When** la page charge, **Then** le score Lighthouse Performance reste supérieur à 90

---

### Edge Cases

- Que se passe-t-il si le module de particules échoue à charger (réseau lent, JS désactivé) ? → Le Hero s'affiche normalement avec son fond par défaut, aucune erreur visible.
- Que se passe-t-il si les particules se chevauchent avec l'avatar ou les boutons ? → Les particules sont positionnées en arrière-plan avec `z-index` négatif — elles ne couvrent jamais le contenu.
- Que se passe-t-il si l'utilisateur redimensionne la fenêtre pendant l'animation ? → Le canvas de particules s'adapte à la nouvelle taille sans rechargement de page.
- Que se passe-t-il sur un écran très large (2K/4K) ? → La densité de particules s'adapte à la taille de l'écran pour éviter un fond trop chargé.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Le fond particulaire DOIT être limité à la section Hero — aucune autre section ne doit en afficher
- **FR-002**: Les particules DOIVENT flotter en continu, lentement, dans des directions variées et aléatoires
- **FR-003**: Des lignes de connexion DOIVENT apparaître entre deux particules situées à moins d'une distance seuil l'une de l'autre
- **FR-004**: L'opacité des lignes de connexion DOIT diminuer à mesure que les particules s'éloignent, pour un effet de fondu naturel
- **FR-005**: Les particules DOIVENT utiliser la couleur primaire du thème (cyan/violet) avec une opacité basse (< 60 %) pour rester discrètes
- **FR-006**: Le fond particulaire DOIT fonctionner en mode sombre et en mode clair, en s'adaptant automatiquement aux couleurs du thème actif
- **FR-007**: Les particules DOIVENT réagir au mouvement de la souris sur desktop (répulsion ou attraction légère dans un rayon d'environ 120 px)
- **FR-008**: Les particules DOIVENT être désactivées automatiquement sur les appareils tactiles (mobile/tablette)
- **FR-009**: Les particules DOIVENT être désactivées automatiquement si `prefers-reduced-motion` est activé
- **FR-010**: Le chargement du module de particules DOIT être différé (lazy) pour ne pas bloquer le chargement initial de la page
- **FR-011**: Le fond particulaire DOIT être entièrement en arrière-plan — jamais au-dessus du contenu textuel, des boutons ou de l'avatar
- **FR-012**: En cas d'échec du chargement (réseau, JS désactivé), la section Hero DOIT s'afficher normalement sans erreur visible

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Le fond particulaire est visible dans la section Hero sur desktop dans les 2 premières secondes de chargement
- **SC-002**: Le score Lighthouse Performance reste supérieur à 90 avec les particules actives (pas de régression vs. sans particules)
- **SC-003**: Le texte et les boutons du Hero ont un ratio de contraste conforme WCAG AA (≥ 4,5:1) malgré la présence des particules en fond
- **SC-004**: Sur mobile (viewport < 768 px), aucune particule ne charge — la section Hero s'affiche sans dégradation de performance
- **SC-005**: Avec prefers-reduced-motion actif, aucune particule ni animation ne s'affiche
- **SC-006**: Le canvas de particules se redimensionne sans rechargement de page lors d'un changement de taille de fenêtre
- **SC-007**: Les particules sont visuellement cohérentes avec le thème (couleur primaire, opacité subtile) en mode clair et sombre

## Assumptions

- Les particules sont limitées à la section Hero uniquement (pas de fond global sur toute la page)
- La densité de particules par défaut est faible (30–60 particules pour un viewport 1920×1080) — "subtil" prime sur "impressionnant"
- La couleur des particules reprend le token `--primary` du thème existant (oklch violet/cyan)
- Une bibliothèque d'animation de particules sera nécessaire — son impact sur le poids de la page doit être mesuré et contrôlé
- Le module de particules est chargé de façon différée pour ne pas bloquer l'affichage initial de la page
- La section Hero existante (`HeroSection.tsx`) sera modifiée pour accueillir le fond particulaire
