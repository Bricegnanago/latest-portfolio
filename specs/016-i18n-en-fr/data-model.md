# Data Model: Bilingual Portfolio (FR/EN)

**Feature**: 016-i18n-en-fr
**Date**: 2026-03-05

## Entities

### Locale

Represents a supported language in the application.

| Attribute     | Type               | Description                                         |
|---------------|--------------------|-----------------------------------------------------|
| code          | `'fr' \| 'en'`    | Language code (ISO 639-1)                           |

**Constraints**:
- Only two values: `'fr'` and `'en'`
- Default value: `'fr'`
- Stored in `localStorage` under key `"locale"`

---

### TranslationDictionary

A strongly-typed object containing all UI strings for a given locale.

```
TranslationDictionary
├── nav
│   ├── home: string
│   ├── about: string
│   ├── skills: string
│   ├── experiences: string
│   ├── projects: string
│   ├── contact: string
│   ├── backToHome: string      (aria-label)
│   ├── closeMenu: string       (aria-label)
│   └── openMenu: string        (aria-label)
├── hero
│   ├── welcome: string
│   ├── viewProjects: string
│   ├── contactMe: string
│   └── scrollDown: string      (aria-label)
├── about
│   ├── title: string
│   ├── subtitle: string
│   ├── location: string
│   ├── languages: string
│   ├── education: string
│   └── certifications: string
├── skills
│   ├── title: string
│   └── subtitle: string
├── experience
│   ├── title: string
│   └── subtitle: string
├── projects
│   ├── title: string
│   ├── subtitle: string
│   ├── screenshots: string
│   ├── viewDemo: string
│   ├── demo: string
│   ├── demoComing: string
│   ├── code: string
│   └── codeComing: string
├── contact
│   ├── title: string
│   ├── subtitle: string
│   ├── name: string
│   ├── namePlaceholder: string
│   ├── email: string
│   ├── emailPlaceholder: string
│   ├── message: string
│   ├── messagePlaceholder: string
│   ├── sending: string
│   ├── send: string
│   ├── directContact: string
│   └── sendEmail: string       (aria-label)
├── footer
│   ├── allRightsReserved: string
│   └── sendEmail: string       (aria-label)
├── theme
│   ├── changeTheme: string     (aria-label)
│   ├── lightMode: string       (aria-label)
│   └── darkMode: string        (aria-label)
├── validation
│   ├── nameRequired: string
│   ├── emailInvalid: string
│   └── messageRequired: string
├── api
│   ├── invalidData: string
│   ├── configError: string
│   ├── success: string
│   ├── error: string
│   └── emailSubject: string
└── metadata
    ├── title: string
    ├── description: string
    └── ogLocale: string
```

**Relationships**:
- One `TranslationDictionary` per `Locale`
- All keys are mandatory — no optional fields
- TypeScript enforces completeness at compile time

---

### Localized Data Files

Existing data types remain unchanged. Each type gets a parallel English data file.

#### PersonalInfo (unchanged type)

| Field          | Translatable? | Notes                                      |
|----------------|---------------|---------------------------------------------|
| name           | No            | Proper noun                                 |
| title          | Yes           | "Ingénieur Logiciel Full-Stack" → "Full-Stack Software Engineer" |
| email          | No            | Contact info                                |
| phone          | No            | Contact info                                |
| bio            | Yes           | Full paragraph                              |
| location       | Yes           | "Abidjan, Côte d'Ivoire" → "Abidjan, Ivory Coast" |
| languages      | Yes           | "Français (natif)" → "French (native)"     |
| education      | Yes           | Degree name                                 |
| certifications | No            | Already in English (AWS, GitLab)            |
| socials        | No            | URLs and platform names                     |

#### Experience (unchanged type)

| Field            | Translatable? | Notes                                     |
|------------------|---------------|-------------------------------------------|
| company          | No            | Proper noun                               |
| website          | No            | URL                                       |
| position         | Yes           | Job title                                 |
| startDate        | Yes           | Locale-formatted date string              |
| endDate          | Yes           | Locale-formatted date string or "Present" |
| description      | Yes           | Full sentence                             |
| responsibilities | Yes           | Array of sentences                        |
| location         | Yes           | City/country name                         |

#### Project (unchanged type)

| Field        | Translatable? | Notes                              |
|--------------|---------------|------------------------------------|
| title        | Yes           | Project name/title                 |
| description  | Yes           | Full paragraph                     |
| technologies | No            | Technical names (React, Node.js)   |
| metrics      | Yes           | Achievement descriptions           |
| demoUrl      | No            | URL                                |
| sourceUrl    | No            | URL                                |
| image        | No            | File path                          |
| videoUrl     | No            | File path                          |
| images       | No            | File paths (alt text is optional)  |

#### SkillCategory (unchanged type)

| Field  | Translatable? | Notes                                      |
|--------|---------------|--------------------------------------------|
| name   | Yes           | "Langages" → "Languages", "Bases de données" → "Databases" |
| icon   | No            | Icon identifier                            |
| skills | No            | Technical names (Java, React, etc.)        |

---

## State Management

### LocaleContext State

```
LocaleContext
├── locale: Locale               — current active language
├── setLocale: (l: Locale) → void — switch language + persist to localStorage
└── t: TranslationDictionary     — current translation dictionary
```

**State Transitions**:

```
Initial Load:
  localStorage has "locale"?
    YES → use stored value
    NO  → navigator.language starts with "en"?
      YES → set "en"
      NO  → set "fr" (default)

User Switches Language:
  setLocale("en" | "fr")
    → update React state
    → write to localStorage
    → update document.documentElement.lang
    → update document.title + meta tags
```
