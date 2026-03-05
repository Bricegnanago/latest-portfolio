# Quickstart: Bilingual Portfolio (FR/EN)

**Feature**: 016-i18n-en-fr
**Date**: 2026-03-05

## Overview

Add French/English language switching to the portfolio. No new dependencies required — implemented with a custom React Context, TypeScript translation dictionaries, and parallel data files.

## Implementation Order

### Step 1: Create Locale Types and Translation Dictionaries

**File**: `i18n/types.ts`

```typescript
export type Locale = 'fr' | 'en'
export const DEFAULT_LOCALE: Locale = 'fr'
export const SUPPORTED_LOCALES: Locale[] = ['fr', 'en']
```

**File**: `i18n/translations/fr.ts`

```typescript
import type { TranslationDictionary } from '@/i18n/types'

export const fr: TranslationDictionary = {
  nav: {
    home: 'Accueil',
    about: 'À propos',
    skills: 'Compétences',
    experiences: 'Expériences',
    projects: 'Projets',
    contact: 'Contact',
    backToHome: 'Retour à l\'accueil',
    closeMenu: 'Fermer le menu',
    openMenu: 'Ouvrir le menu',
  },
  hero: {
    welcome: 'Bienvenue',
    viewProjects: 'Voir mes projets',
    contactMe: 'Me contacter',
    scrollDown: 'Défiler vers le bas',
  },
  about: {
    title: 'À propos',
    subtitle: 'En savoir plus sur mon parcours et ma personnalité',
    location: 'Localisation',
    languages: 'Langues',
    education: 'Formation',
    certifications: 'Certifications',
  },
  skills: {
    title: 'Compétences',
    subtitle: 'Technologies et outils que je maîtrise',
  },
  experience: {
    title: 'Expériences',
    subtitle: 'Mon parcours professionnel',
  },
  projects: {
    title: 'Projets',
    subtitle: 'Quelques réalisations concrètes',
    screenshots: 'Captures',
    viewDemo: 'Voir la démo',
    demo: 'Démo',
    demoComing: 'Démo à venir',
    code: 'Code',
    codeComing: 'Code à venir',
  },
  contact: {
    title: 'Contact',
    subtitle: 'Envoyez-moi un message ou contactez-moi directement',
    name: 'Nom',
    namePlaceholder: 'Votre nom',
    email: 'Email',
    emailPlaceholder: 'votre@email.com',
    message: 'Message',
    messagePlaceholder: 'Votre message...',
    sending: 'Envoi en cours...',
    send: 'Envoyer',
    directContact: 'Coordonnées directes',
    sendEmail: 'Envoyer un email',
  },
  footer: {
    allRightsReserved: 'Tous droits réservés.',
    sendEmail: 'Envoyer un email',
  },
  theme: {
    changeTheme: 'Changer le thème',
    lightMode: 'Passer en mode clair',
    darkMode: 'Passer en mode sombre',
  },
  validation: {
    nameRequired: 'Le nom est requis (2 à 100 caractères)',
    emailInvalid: 'Veuillez entrer une adresse email valide',
    messageRequired: 'Le message est requis (10 à 1000 caractères)',
  },
  api: {
    invalidData: 'Données invalides.',
    configError: 'Configuration email manquante.',
    success: 'Votre message a été envoyé avec succès.',
    error: 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.',
    emailSubject: 'Portfolio — Nouveau message de',
  },
  metadata: {
    title: 'Brice GNANAGO — Ingénieur Logiciel Full-Stack',
    description: 'Portfolio de Brice GNANAGO, ingénieur full-stack spécialisé React, Node.js, AWS et DevOps. Basé à Abidjan, Côte d\'Ivoire.',
    ogLocale: 'fr_FR',
  },
}
```

**File**: `i18n/translations/en.ts` — same structure with English values.

---

### Step 2: Create Locale Context Provider

**File**: `contexts/LocaleContext.tsx`

```typescript
'use client'

import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import type { Locale, TranslationDictionary } from '@/i18n/types'
import { DEFAULT_LOCALE } from '@/i18n/types'
import { fr } from '@/i18n/translations/fr'
import { en } from '@/i18n/translations/en'

const dictionaries: Record<Locale, TranslationDictionary> = { fr, en }

interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: TranslationDictionary
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined)

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)

  // Initialize from localStorage or browser language
  useEffect(() => {
    const stored = localStorage.getItem('locale') as Locale | null
    if (stored && (stored === 'fr' || stored === 'en')) {
      setLocaleState(stored)
    } else if (navigator.language.startsWith('en')) {
      setLocaleState('en')
    }
  }, [])

  // Update HTML lang and metadata when locale changes
  useEffect(() => {
    document.documentElement.lang = locale
    const t = dictionaries[locale]
    document.title = t.metadata.title
    document.querySelector('meta[name="description"]')
      ?.setAttribute('content', t.metadata.description)
    document.querySelector('meta[property="og:title"]')
      ?.setAttribute('content', t.metadata.title)
    document.querySelector('meta[property="og:description"]')
      ?.setAttribute('content', t.metadata.description)
    document.querySelector('meta[property="og:locale"]')
      ?.setAttribute('content', t.metadata.ogLocale)
  }, [locale])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
  }

  const value = useMemo(
    () => ({ locale, setLocale, t: dictionaries[locale] }),
    [locale]
  )

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) throw new Error('useLocale must be used within LocaleProvider')
  return context
}
```

---

### Step 3: Create English Data Files

Create parallel English data files. Each exports the same type as the French original.

**File**: `data/personal.en.ts` — English version of `data/personal.ts`
**File**: `data/experiences.en.ts` — English version of `data/experiences.ts`
**File**: `data/projects.en.ts` — English version of `data/projects.ts`
**File**: `data/skills.en.ts` — English version of `data/skills.ts`

**File**: `data/index.ts` — Locale-aware data getter:

```typescript
import { personalInfo as personalInfoFr } from './personal'
import { personalInfo as personalInfoEn } from './personal.en'
import { experiences as experiencesFr } from './experiences'
import { experiences as experiencesEn } from './experiences.en'
import { projects as projectsFr } from './projects'
import { projects as projectsEn } from './projects.en'
import { skillCategories as skillCategoriesFr } from './skills'
import { skillCategories as skillCategoriesEn } from './skills.en'
import type { Locale } from '@/i18n/types'

export function getLocalizedData(locale: Locale) {
  if (locale === 'en') {
    return {
      personalInfo: personalInfoEn,
      experiences: experiencesEn,
      projects: projectsEn,
      skillCategories: skillCategoriesEn,
    }
  }
  return {
    personalInfo: personalInfoFr,
    experiences: experiencesFr,
    projects: projectsFr,
    skillCategories: skillCategoriesFr,
  }
}
```

---

### Step 4: Create Language Switcher Component

**File**: `components/layout/LanguageSwitcher.tsx`

```typescript
'use client'

import { useLocale } from '@/contexts/LocaleContext'
import { Languages } from 'lucide-react'

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()
  const nextLocale = locale === 'fr' ? 'en' : 'fr'

  return (
    <button
      onClick={() => setLocale(nextLocale)}
      className="relative p-2 rounded-full hover:bg-accent transition-colors"
      aria-label={`Switch to ${nextLocale === 'en' ? 'English' : 'Français'}`}
    >
      <Languages className="h-5 w-5" />
      <span className="absolute -top-1 -right-1 text-[10px] font-bold uppercase">
        {nextLocale}
      </span>
    </button>
  )
}
```

---

### Step 5: Integrate Provider in Layout

**File**: `app/layout.tsx` — wrap children with `<LocaleProvider>` (inside `<ThemeProvider>`).

---

### Step 6: Update Components to Use Translations

For each component with hardcoded strings, replace with `useLocale()` hook:

```typescript
// Example: Navbar.tsx
const { t } = useLocale()
// Replace "Accueil" with t.nav.home
// Replace "À propos" with t.nav.about
// etc.
```

For data-driven components, use `getLocalizedData(locale)`:

```typescript
// Example: AboutSection.tsx
const { locale, t } = useLocale()
const { personalInfo } = getLocalizedData(locale)
```

---

### Step 7: Update Validation Schema

**File**: `lib/validations.ts` — convert to factory function:

```typescript
import { z } from 'zod'
import type { Locale } from '@/i18n/types'
import { fr } from '@/i18n/translations/fr'
import { en } from '@/i18n/translations/en'

const dictionaries = { fr, en }

export function getContactFormSchema(locale: Locale) {
  const t = dictionaries[locale].validation
  return z.object({
    name: z.string().min(2, t.nameRequired).max(100, t.nameRequired),
    email: z.string().email(t.emailInvalid),
    message: z.string().min(10, t.messageRequired).max(1000, t.messageRequired),
  })
}

export type ContactFormValues = z.infer<ReturnType<typeof getContactFormSchema>>
```

---

### Step 8: Update Contact API Route

**File**: `app/api/contact/route.ts` — accept `locale` in request body, return localized messages.

---

## Files Changed (Summary)

| Action   | File                                   | Change                                    |
|----------|----------------------------------------|-------------------------------------------|
| Create   | `i18n/types.ts`                        | Locale type, TranslationDictionary type   |
| Create   | `i18n/translations/fr.ts`              | French translation dictionary             |
| Create   | `i18n/translations/en.ts`              | English translation dictionary            |
| Create   | `contexts/LocaleContext.tsx`           | Locale context provider + useLocale hook  |
| Create   | `data/personal.en.ts`                  | English personal info                     |
| Create   | `data/experiences.en.ts`               | English experiences                       |
| Create   | `data/projects.en.ts`                  | English projects                          |
| Create   | `data/skills.en.ts`                    | English skill categories                  |
| Create   | `data/index.ts`                        | Locale-aware data getter                  |
| Create   | `components/layout/LanguageSwitcher.tsx`| Language toggle button                   |
| Modify   | `app/layout.tsx`                       | Add LocaleProvider, dynamic lang attr     |
| Modify   | `components/layout/Navbar.tsx`         | Use translations for nav labels           |
| Modify   | `components/layout/Footer.tsx`         | Use translations for footer text          |
| Modify   | `components/layout/ThemeToggle.tsx`    | Use translations for aria-labels          |
| Modify   | `components/sections/HeroSection.tsx`  | Use translations + localized data         |
| Modify   | `components/sections/AboutSection.tsx` | Use translations + localized data         |
| Modify   | `components/sections/SkillsSection.tsx`| Use translations + localized data         |
| Modify   | `components/sections/ExperienceSection.tsx` | Use translations + localized data    |
| Modify   | `components/sections/ProjectsSection.tsx`  | Use translations + localized data     |
| Modify   | `components/sections/ContactSection.tsx`   | Use translations + localized validation|
| Modify   | `components/shared/ProjectCard.tsx`    | Use translations for button labels        |
| Modify   | `lib/validations.ts`                   | Locale-aware schema factory               |
| Modify   | `app/api/contact/route.ts`            | Accept locale, return localized messages   |

## Smoke Tests

1. **Language switch**: Click language toggle → all visible text changes to the other language
2. **Persistence**: Switch to EN, refresh page → site stays in EN
3. **Browser detection**: Clear localStorage, set browser to English, visit site → displays in EN
4. **Fallback**: Clear localStorage, set browser to German, visit site → displays in FR
5. **Form validation**: Switch to EN, submit empty form → error messages in English
6. **Contact form**: Switch to EN, submit valid form → success message in English
7. **Metadata**: Switch to EN, check `document.title` → English title
8. **Data content**: Switch to EN, check project descriptions → all in English
9. **No flash**: On first load, no visible flash of wrong language content
