# Data Model: Portfolio One-Page de Brice GNANAGO

**Feature**: 002-portfolio-onepage
**Date**: 2026-02-17
**Source**: spec.md Key Entities + constitution IV (Intégrité du Contenu)

## Entités

### PersonalInfo

Informations personnelles de Brice affichées dans Hero et À propos.

| Champ          | Type     | Requis | Description                                |
| -------------- | -------- | ------ | ------------------------------------------ |
| name           | string   | Oui    | Nom complet : "Brice GNANAGO"              |
| title          | string   | Oui    | Titre professionnel                        |
| email          | string   | Oui    | Email de contact                           |
| phone          | string   | Oui    | Numéro de téléphone avec indicatif         |
| bio            | string   | Oui    | Biographie courte                          |
| location       | string   | Oui    | Localisation (ville, pays)                 |
| languages      | string[] | Oui    | Langues parlées                            |
| education      | string   | Oui    | Formation académique                       |
| certifications | string[] | Non    | Certifications (ex: AWS)                   |
| socials        | Social[] | Non    | Liens sociaux (GitHub, LinkedIn)           |

### Social

Lien vers un réseau social ou profil en ligne.

| Champ | Type   | Requis | Description                                |
| ----- | ------ | ------ | ------------------------------------------ |
| name  | string | Oui    | Nom du réseau (GitHub, LinkedIn, etc.)     |
| url   | string | Oui    | URL du profil ou `[À COMPLÉTER]`           |
| icon  | string | Oui    | Identifiant d'icône Lucide React           |

### Skill

Compétence technique ou transversale.

| Champ    | Type   | Requis | Description                                |
| -------- | ------ | ------ | ------------------------------------------ |
| name     | string | Oui    | Nom de la compétence (ex: "React")         |
| category | string | Oui    | Catégorie de regroupement                  |

### SkillCategory

Groupe de compétences par domaine.

| Champ  | Type    | Requis | Description                                |
| ------ | ------- | ------ | ------------------------------------------ |
| name   | string  | Oui    | Nom de la catégorie (ex: "Frontend")       |
| icon   | string  | Non    | Identifiant d'icône Lucide React           |
| skills | Skill[] | Oui    | Liste des compétences dans cette catégorie |

### Experience

Expérience professionnelle.

| Champ            | Type     | Requis | Description                                  |
| ---------------- | -------- | ------ | -------------------------------------------- |
| company          | string   | Oui    | Nom de l'entreprise                          |
| position         | string   | Oui    | Intitulé du poste                            |
| startDate        | string   | Oui    | Date de début (format: "Mois Année")         |
| endDate          | string   | Non    | Date de fin ou "Présent"                     |
| description      | string   | Oui    | Description courte du rôle                   |
| responsibilities | string[] | Oui    | Liste des responsabilités et réalisations    |
| location         | string   | Non    | Localisation du poste                        |

### Project

Projet réalisé.

| Champ        | Type     | Requis | Description                                  |
| ------------ | -------- | ------ | -------------------------------------------- |
| title        | string   | Oui    | Nom du projet                                |
| description  | string   | Oui    | Description du projet                        |
| technologies | string[] | Oui    | Liste des technologies utilisées             |
| metrics      | string[] | Non    | Métriques/résultats clés                     |
| demoUrl      | string   | Non    | URL de démo ou `[À COMPLÉTER]`               |
| sourceUrl    | string   | Non    | URL du code source ou `[À COMPLÉTER]`        |
| image        | string   | Non    | Chemin vers la capture d'écran               |

### ContactFormData

Données du formulaire de contact (validation côté client).

| Champ   | Type   | Requis | Validation                            |
| ------- | ------ | ------ | ------------------------------------- |
| name    | string | Oui    | Min 2 caractères, max 100             |
| email   | string | Oui    | Format email valide                   |
| message | string | Oui    | Min 10 caractères, max 1000           |

## Relations

```text
PersonalInfo
├── socials: Social[] (0..n)
└── certifications: string[] (0..n)

SkillCategory
└── skills: Skill[] (1..n)

Experience (standalone, ordered by date)

Project (standalone, ordered by priority)

ContactFormData → API /api/contact → Resend email
```

## Données réelles (Constitution IV)

Les données DOIVENT provenir du CV de Brice :

- **Expériences** : Barnoin/CNPS, MONBOLIDE, EBURTIS
- **Projets** : Ticket System, QR Order System, ZoomStudent
- **Contact** : gnanagobrice@gmail.com, (+225) 0778127421
- **Liens non disponibles** : marqués `[À COMPLÉTER]`
