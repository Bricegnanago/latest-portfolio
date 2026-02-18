# Feature Specification: Portfolio One-Page de Brice GNANAGO

**Feature Branch**: `002-portfolio-onepage`
**Created**: 2026-02-17
**Status**: Draft
**Input**: User description: "Créer le portfolio one-page de Brice GNANAGO avec hero, about, skills, experience, projets et contact"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Découverte du profil professionnel (Priority: P1)

Un recruteur ou un client potentiel arrive sur le portfolio et découvre immédiatement qui est Brice GNANAGO : son titre, sa spécialisation et une accroche engageante. Il peut naviguer vers les sections qui l'intéressent en un clic.

**Why this priority**: C'est la première impression. Si le visiteur ne comprend pas en 5 secondes qui est Brice et ce qu'il fait, il quitte le site. La section Hero + la navigation sont le socle de tout le portfolio.

**Independent Test**: Peut être testé en chargeant la page d'accueil et en vérifiant que le nom, le titre professionnel, une accroche et au moins 2 boutons d'action sont visibles sans scroller. La navigation permet d'atteindre chaque section.

**Acceptance Scenarios**:

1. **Given** un visiteur arrive sur la page, **When** la page se charge, **Then** il voit le nom "Brice GNANAGO", le titre "Ingénieur Logiciel Full-Stack", une description courte et 2 boutons d'appel à l'action (voir projets, me contacter).
2. **Given** un visiteur sur la page, **When** il clique sur un lien de navigation, **Then** la page défile en douceur vers la section correspondante.
3. **Given** un visiteur sur mobile, **When** il accède à la page, **Then** la navigation est accessible via un menu adapté et tout le contenu reste lisible.

---

### User Story 2 - Consultation des compétences et expériences (Priority: P2)

Un recruteur souhaite évaluer le profil technique de Brice. Il consulte les sections compétences et expériences pour comprendre son expertise, ses technologies maîtrisées et son parcours professionnel.

**Why this priority**: Après la première impression, le recruteur veut valider les compétences. Ces sections convertissent l'intérêt initial en considération concrète pour un poste ou une mission.

**Independent Test**: Peut être testé en naviguant vers les sections Compétences et Expériences et en vérifiant que toutes les données réelles de Brice sont affichées, groupées et lisibles.

**Acceptance Scenarios**:

1. **Given** un visiteur sur la page, **When** il consulte la section Compétences, **Then** il voit les compétences de Brice organisées par catégories (langages, frameworks, cloud, etc.) avec une présentation visuelle claire.
2. **Given** un visiteur sur la page, **When** il consulte la section Expériences, **Then** il voit les expériences professionnelles de Brice (CNPS/Barnoin, MONBOLIDE, EBURTIS) dans un format chronologique avec les responsabilités et réalisations.
3. **Given** un visiteur sur mobile, **When** il consulte les compétences, **Then** les catégories s'affichent de manière adaptée sans perte de lisibilité.

---

### User Story 3 - Exploration des projets réalisés (Priority: P3)

Un visiteur intéressé par le profil de Brice veut voir des exemples concrets de ses réalisations. Il consulte les projets avec leurs descriptions, technologies utilisées et résultats obtenus.

**Why this priority**: Les projets apportent la preuve concrète des compétences. Ils sont essentiels mais dépendent des sections précédentes pour contextualiser le profil.

**Independent Test**: Peut être testé en naviguant vers la section Projets et en vérifiant que les 3 projets réels sont affichés avec toutes les informations requises.

**Acceptance Scenarios**:

1. **Given** un visiteur sur la page, **When** il consulte la section Projets, **Then** il voit les 3 projets documentés (Ticket System, QR Order System, ZoomStudent) avec titre, description, technologies et métriques clés.
2. **Given** un projet affiché, **When** un lien de démo ou code source est disponible, **Then** le visiteur peut y accéder. Si le lien n'est pas encore disponible, un indicateur clair le mentionne.

---

### User Story 4 - Prise de contact (Priority: P4)

Un recruteur ou client convaincu par le profil de Brice souhaite le contacter. Il peut envoyer un message via un formulaire de contact ou utiliser les coordonnées affichées directement.

**Why this priority**: La conversion finale. Sans moyen de contact facile, tout le reste du portfolio perd son utilité. Priorité P4 car il dépend d'un parcours complet sur le site.

**Independent Test**: Peut être testé en remplissant le formulaire de contact avec des données valides et en vérifiant que le message est envoyé, et en testant la validation avec des données invalides.

**Acceptance Scenarios**:

1. **Given** un visiteur sur la section Contact, **When** il remplit le formulaire avec un nom, email et message valides et clique Envoyer, **Then** le message est envoyé et un retour de succès est affiché.
2. **Given** un visiteur sur la section Contact, **When** il soumet le formulaire avec un email invalide ou un champ vide, **Then** un message d'erreur clair s'affiche pour chaque champ invalide.
3. **Given** un visiteur sur la section Contact, **When** il préfère un contact direct, **Then** il voit l'email (`gnanagobrice@gmail.com`) et le téléphone (`(+225) 0778127421`) affichés lisiblement.

---

### User Story 5 - Basculement thème clair/sombre (Priority: P5)

Un visiteur souhaite passer du thème sombre (par défaut) au thème clair selon sa préférence ou son environnement.

**Why this priority**: Fonctionnalité d'accessibilité et confort secondaire. Le dark theme par défaut couvre la majorité des cas.

**Independent Test**: Peut être testé en cliquant sur le bouton de basculement et en vérifiant que toutes les sections changent de palette sans perte de lisibilité.

**Acceptance Scenarios**:

1. **Given** un visiteur sur la page en dark theme, **When** il clique sur le bouton de basculement, **Then** la page passe en thème clair avec un contraste suffisant sur tous les éléments.
2. **Given** un visiteur qui a choisi le thème clair, **When** il revient sur le site, **Then** sa préférence est conservée.

---

### Edge Cases

- Que se passe-t-il si l'envoi du formulaire de contact échoue (erreur serveur) ? Le visiteur voit un message d'erreur explicite et peut réessayer.
- Que se passe-t-il si un projet n'a pas encore de lien de démo ou de code source ? Un indicateur visuel clair mentionne que le lien est à venir, sans lien cassé.
- Que se passe-t-il sur un écran très large (> 1920px) ? Le contenu reste centré et lisible, sans étirement excessif.
- Que se passe-t-il si JavaScript est désactivé ? Le contenu textuel reste accessible (les animations sont un bonus, pas un prérequis).
- Que se passe-t-il si un visiteur utilise un lecteur d'écran ? Tous les éléments interactifs sont correctement étiquetés et navigables au clavier.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La page DOIT afficher une section Hero avec le nom complet, le titre professionnel, une description courte et au minimum 2 boutons d'appel à l'action.
- **FR-002**: La page DOIT contenir une navigation fixe permettant d'accéder à chaque section (Hero, À propos, Compétences, Expériences, Projets, Contact) par défilement fluide.
- **FR-003**: La navigation DOIT indiquer visuellement la section actuellement visible lors du défilement.
- **FR-004**: La section À propos DOIT afficher la biographie, la localisation (Abidjan, Côte d'Ivoire), les langues parlées, la formation et les certifications de Brice.
- **FR-005**: La section Compétences DOIT afficher toutes les compétences de Brice organisées par catégories avec une présentation visuelle distincte par catégorie.
- **FR-006**: La section Expériences DOIT afficher les 3 expériences professionnelles dans un format chronologique avec l'entreprise, le poste, les dates et les responsabilités détaillées.
- **FR-007**: La section Projets DOIT afficher les 3 projets réels (Ticket System, QR Order System, ZoomStudent) avec titre, description, technologies utilisées et métriques/résultats clés.
- **FR-008**: La section Contact DOIT contenir un formulaire avec les champs : nom, email, message. Le formulaire DOIT valider les entrées avant soumission.
- **FR-009**: La section Contact DOIT afficher les coordonnées directes : email et téléphone.
- **FR-010**: La page DOIT offrir un basculement entre thème sombre (défaut) et thème clair, avec mémorisation de la préférence du visiteur.
- **FR-011**: La page DOIT être entièrement responsive et optimisée mobile-first (écrans de 375px à 1920px+).
- **FR-012**: Tous les éléments interactifs DOIVENT être accessibles au clavier et correctement étiquetés pour les technologies d'assistance.
- **FR-013**: Les animations et transitions DOIVENT être subtiles, performantes et ne DOIVENT PAS bloquer l'accès au contenu.
- **FR-014**: L'interface DOIT être en français pour le contenu visible par le visiteur.
- **FR-015**: Aucune donnée fictive ne DOIT être affichée — uniquement les informations réelles du CV de Brice.
- **FR-016**: La page DOIT être optimisée pour le référencement avec des métadonnées complètes (titre, description, image de partage).
- **FR-017**: Chaque section DOIT déclencher des animations d'entrée subtiles lors du défilement (une seule fois par visite).

### Key Entities

- **PersonalInfo**: Informations personnelles de Brice — nom, titre, email, téléphone, biographie, localisation, langues, formation, certifications.
- **Skill**: Compétence technique ou transversale — nom, catégorie (Langages, Frameworks Frontend, Backend, Cloud/DevOps, etc.).
- **Experience**: Expérience professionnelle — entreprise, poste, dates de début/fin, description, liste de responsabilités et réalisations.
- **Project**: Projet réalisé — titre, description, technologies utilisées (liste), métriques/résultats, liens optionnels (démo, code source).
- **ContactMessage**: Message envoyé via le formulaire — nom de l'expéditeur, email, contenu du message.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un visiteur peut identifier le nom, le titre et la spécialisation de Brice en moins de 5 secondes après le chargement de la page.
- **SC-002**: Un visiteur peut naviguer de n'importe quelle section à une autre en moins de 2 secondes (défilement fluide inclus).
- **SC-003**: 100% des données affichées correspondent aux informations réelles du CV de Brice (3 projets, 3 expériences, compétences vérifiées).
- **SC-004**: Le formulaire de contact valide les entrées et affiche un retour (succès ou erreur) en moins de 3 secondes après soumission.
- **SC-005**: La page obtient un score supérieur à 90 sur les 4 catégories Lighthouse (Performance, Accessibilité, Bonnes pratiques, SEO).
- **SC-006**: La page est entièrement lisible et fonctionnelle sur 3 tailles d'écran : 375px (mobile), 768px (tablette), 1280px (desktop).
- **SC-007**: Le basculement de thème s'applique instantanément à toutes les sections sans rechargement de page.

## Assumptions

- Le portfolio est un site one-page avec défilement continu — pas de sous-pages séparées (sauf route d'envoi de contact côté serveur).
- Les données du portfolio (projets, compétences, expériences, infos personnelles) sont statiques et gérées comme fichiers de données, pas via un CMS.
- Le formulaire de contact nécessite un service d'envoi d'email côté serveur (via une route interne).
- Les liens manquants (GitHub, LinkedIn, URL de démo) sont marqués clairement comme à compléter plutôt que supprimés.
- Le profil de Brice inclut les expériences chez Barnoin/CNPS, MONBOLIDE et EBURTIS, et les projets Ticket System, QR Order System et ZoomStudent.
- La photo de profil peut être un placeholder prêt à être remplacé, avec les dimensions et le format documentés.
