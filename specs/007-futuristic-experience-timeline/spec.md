# Feature Specification: Futuristic Animated Experience Timeline

**Feature Branch**: `007-futuristic-experience-timeline`
**Created**: 2026-02-28
**Status**: Draft
**Input**: User description: "Dans la rubrique Experience je souhaite qu'on les affiches sous forme de timeline futuriste et animé"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visitor Discovers the Timeline Structure (Priority: P1)

Un visiteur arrive sur la section "Expériences" du portfolio. Au lieu d'une liste de cartes statiques, il voit une timeline verticale avec un axe central lumineux et des nœuds marquant chaque expérience. La structure visuelle communique immédiatement un parcours chronologique et une identité tech/futuriste.

**Why this priority**: La timeline est le cœur de la feature — sans elle, rien d'autre ne peut être testé. C'est aussi ce qui différencie cette section du reste des portfolios.

**Independent Test**: Afficher la section "Expériences" → l'axe vertical de la timeline est visible → des nœuds (points ou losanges) marquent chaque expérience → le contenu de chaque expérience (poste, entreprise, dates) est lisible et correctement associé à son nœud.

**Acceptance Scenarios**:

1. **Given** la section Expériences chargée, **When** un visiteur la consulte sur desktop, **Then** une ligne verticale centrale est visible avec un nœud lumineux pour chacune des 3 expériences, et le contenu alterne de chaque côté de la ligne.
2. **Given** la même section sur mobile, **When** un visiteur la consulte, **Then** les expériences sont empilées verticalement à droite de la ligne (pas d'alternance), et l'ensemble reste lisible sans débordement.
3. **Given** le contenu de chaque expérience, **When** le visiteur lit la section, **Then** le poste, l'entreprise, les dates, la description et les responsabilités sont tous visibles pour chaque entrée.

---

### User Story 2 - Visitor Watches Animated Reveal on Scroll (Priority: P1)

En faisant défiler la page jusqu'à la section, le visiteur observe chaque expérience qui apparaît de façon animée : les éléments entrent depuis le côté (gauche ou droite selon leur position dans la timeline), accompagnés d'une animation sur le nœud et sur l'axe de la timeline.

**Why this priority**: L'animation est la seconde composante fondamentale de "timeline futuriste et animé". Sans elle, la feature est incomplète.

**Independent Test**: Faire défiler la page vers la section Expériences depuis le haut → chaque expérience entre en animation séquentiellement → l'axe de la timeline se dessine ou se révèle progressivement → les nœuds apparaissent avec un effet visuel distinctif (pulsation, éclat, glow).

**Acceptance Scenarios**:

1. **Given** la section hors du viewport, **When** le visiteur fait défiler jusqu'à elle, **Then** les expériences apparaissent séquentiellement avec un délai entre chaque (pas toutes en même temps).
2. **Given** une expérience qui entre en animation, **When** elle atteint sa position finale, **Then** le nœud associé sur la timeline s'illumine ou pulse.
3. **Given** un utilisateur qui préfère réduire les animations (paramètre système "prefers-reduced-motion"), **When** il consulte la section, **Then** le contenu est visible immédiatement sans animation, sans perte d'information.
4. **Given** que l'animation s'est déclenchée une fois, **When** le visiteur rescroll vers le bas sans recharger, **Then** l'animation ne se rejoue pas (déclenche une seule fois).

---

### User Story 3 - Visitor Reads Each Experience in Detail (Priority: P2)

Un visiteur intéressé par le parcours de Brice souhaite lire le détail de chaque expérience : rôle, entreprise, période, description et liste de responsabilités. L'esthétique futuriste ne doit pas nuire à la lisibilité.

**Why this priority**: Le contenu est la raison d'être de la section. La mise en forme doit sublimer, pas masquer.

**Independent Test**: Pour chaque expérience, tous les champs (poste, entreprise, dates, description, responsabilités) sont lisibles, avec un contraste suffisant, que ce soit en dark mode ou light mode.

**Acceptance Scenarios**:

1. **Given** une expérience affichée dans la timeline, **When** le visiteur lit son contenu, **Then** tous les champs (poste, entreprise, période, description, responsabilités) sont distincts et hiérarchisés visuellement.
2. **Given** la section en dark mode, **When** le visiteur la lit, **Then** le texte a un contraste suffisant sur le fond sombre — les effets lumineux/glow n'éblouissent pas ou ne rendent pas le texte illisible.
3. **Given** la section en light mode, **When** le visiteur la lit, **Then** les effets futuristes s'adaptent au thème clair sans paraître incohérents.

---

### Edge Cases

- Qu'arrive-t-il si une expérience n'a pas de localisation ? La localisation doit simplement être omise sans créer d'espace vide incohérent.
- Qu'arrive-t-il avec un nombre pair ou impair d'expériences dans l'alternance gauche/droite ? La timeline doit fonctionner pour 2, 3, 4 expériences ou plus.
- Qu'arrive-t-il sur un écran très étroit (320px) ? La ligne centrale et les cartes doivent rester lisibles.
- Qu'arrive-t-il si le contenu d'une expérience est très long (nombreuses responsabilités) ? La carte s'étend verticalement sans casser la ligne centrale.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La section Expériences DOIT afficher toutes les expériences sous forme de timeline verticale avec un axe et des nœuds visuels.
- **FR-002**: Sur desktop (≥ 768px), le contenu des expériences DOIT alterner de part et d'autre de l'axe central.
- **FR-003**: Sur mobile (< 768px), toutes les expériences DOIVENT être alignées d'un seul côté de la ligne verticale.
- **FR-004**: Chaque nœud de la timeline DOIT avoir un effet visuel distinctif (glow, pulsation ou autre marqueur lumineux) cohérent avec l'esthétique futuriste.
- **FR-005**: L'axe central de la timeline DOIT avoir une apparence premium (gradient, ligne lumineuse ou effet néon).
- **FR-006**: Chaque expérience DOIT s'animer à son entrée dans le viewport (apparition depuis le côté correspondant à sa position dans la timeline).
- **FR-007**: Les animations DOIVENT être séquentielles (délai progressif entre chaque entrée) et se déclencher une seule fois par chargement de page.
- **FR-008**: Les animations DOIVENT être désactivées ou réduites si l'utilisateur a activé "préférence de mouvements réduits" sur son système.
- **FR-009**: La section DOIT être entièrement responsive — lisible et fonctionnelle de 320px à 1440px.
- **FR-010**: L'esthétique futuriste DOIT fonctionner en dark mode ET en light mode sans perte de lisibilité.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% des expériences sont visibles et lisibles sur toutes les tailles d'écran (320px à 1440px).
- **SC-002**: L'animation d'entrée complète (toutes les expériences révélées) se termine en moins de 2 secondes après l'entrée dans le viewport.
- **SC-003**: Le contraste texte/fond respecte un ratio minimal de 4.5:1 (niveau AA) en dark mode et en light mode.
- **SC-004**: La section est fonctionnelle sans JavaScript (contenu statiquement accessible) — les animations sont une amélioration progressive.
- **SC-005**: L'effet visuel "futuriste" est immédiatement identifiable — un observateur externe décrit spontanément la section comme "moderne" ou "tech" sans indication préalable.

## Assumptions

- Les données des expériences restent dans `/data/experiences.ts` sans modification — seule la présentation visuelle change.
- L'axe de la timeline est purement décoratif et n'est pas cliquable.
- L'esthétique futuriste s'appuie sur les couleurs primaires déjà définies dans le design system du portfolio (pas de nouvelles couleurs hors palette).
- L'ordre d'affichage reste chronologique inverse (la plus récente en premier, comme actuellement).
- Aucun effet de parallaxe complexe — les animations restent subtiles et performantes (pas de dégradation du Lighthouse score sous 90).
