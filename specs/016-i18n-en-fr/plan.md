# Implementation Plan: Bilingual Portfolio (FR/EN)

**Branch**: `016-i18n-en-fr` | **Date**: 2026-03-05 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/016-i18n-en-fr/spec.md`

## Summary

Add French/English language switching to the portfolio site. Users can toggle between languages via a switcher in the navbar; the entire site (UI labels, data content, form messages, metadata) updates instantly. Language preference is detected from the browser on first visit and persisted in localStorage.

**Technical approach**: Custom React Context (`LocaleProvider`) with typed TypeScript translation dictionaries for ~52 UI strings, parallel English data files for portfolio content (~80 strings), and a locale-aware Zod validation factory. No new npm dependencies — leverages existing React Context, localStorage, and TypeScript type system.

## Technical Context

**Language/Version**: TypeScript 5.x strict (no `any`) + Next.js 16 (App Router) + React 19
**Primary Dependencies**: No new dependencies. Uses existing: React Context, Zod 4, React Hook Form 7, Lucide React, Framer Motion 12, next-themes, shadcn/ui
**Storage**: `localStorage` for locale preference (key: `"locale"`)
**Testing**: Manual smoke tests (9 scenarios defined in quickstart.md)
**Target Platform**: Web — Vercel deployment, all modern browsers
**Project Type**: Single-page web application (Next.js App Router)
**Performance Goals**: Language switch < 300ms, no full page reload
**Constraints**: No new npm packages, no URL-based routing change, no database
**Scale/Scope**: 2 languages, ~52 UI strings, ~80 data strings, 23 files touched (10 created, 13 modified)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Research Gate (Phase 0)

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Stack Technique | PASS | No new dependencies. Uses existing React, TypeScript, Tailwind, Lucide, shadcn/ui |
| II. Architecture | PASS | Data stays in `/data/*.ts`. Components follow `components/sections/` + `components/layout/` pattern. New `i18n/` and `contexts/` directories for translation infrastructure |
| III. Design & UX | AMENDMENT | Constitution says "interface en **français**" — this feature explicitly adds English support as requested by the user. Amendment justified: user requirement |
| IV. Intégrité du Contenu | PASS | No fictional data. English translations will be marked as needing validation by site owner |
| V. Qualité du Code | PASS | No console.log, no commented code, proper TypeScript types, PascalCase components |
| No database/CMS | PASS | All translations in static TypeScript files |
| No over-engineering | PASS | Custom context (50 lines) vs full i18n library. Minimal abstraction |

### Post-Design Gate (Phase 1)

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Stack Technique | PASS | Confirmed: zero new packages |
| II. Architecture | PASS | `i18n/` directory for translations, `contexts/` for provider, `data/*.en.ts` for English content — all TypeScript files |
| III. Design & UX | PASS (amended) | Language switcher alongside theme toggle in navbar. Responsive, accessible (aria-labels). Mobile-first |
| IV. Intégrité du Contenu | PASS | English translations based on real CV content. Placeholder translations marked for owner validation |
| V. Qualité du Code | PASS | Full TypeScript types for TranslationDictionary. Type-safe locale context |

## Project Structure

### Documentation (this feature)

```text
specs/016-i18n-en-fr/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0: technical decisions
├── data-model.md        # Phase 1: entity & state model
├── quickstart.md        # Phase 1: implementation guide + code samples
├── contracts/
│   ├── contact-api.md   # Contact API localized response contract
│   └── locale-context.md # LocaleContext & helpers contract
└── checklists/
    └── requirements.md  # Spec quality checklist
```

### Source Code (repository root)

```text
i18n/
├── types.ts                        # Locale type, TranslationDictionary interface
└── translations/
    ├── fr.ts                       # French UI strings dictionary
    └── en.ts                       # English UI strings dictionary

contexts/
└── LocaleContext.tsx               # LocaleProvider + useLocale hook

data/
├── personal.ts                     # French personal info (existing, unchanged)
├── personal.en.ts                  # English personal info (new)
├── experiences.ts                  # French experiences (existing, unchanged)
├── experiences.en.ts               # English experiences (new)
├── projects.ts                     # French projects (existing, unchanged)
├── projects.en.ts                  # English projects (new)
├── skills.ts                       # French skills (existing, unchanged)
├── skills.en.ts                    # English skills (new)
└── index.ts                        # getLocalizedData(locale) helper (new)

components/
├── layout/
│   ├── LanguageSwitcher.tsx         # Language toggle button (new)
│   ├── Navbar.tsx                   # Use translations (modified)
│   ├── Footer.tsx                   # Use translations (modified)
│   └── ThemeToggle.tsx              # Use translations for aria-labels (modified)
├── sections/
│   ├── HeroSection.tsx              # Use translations + localized data (modified)
│   ├── AboutSection.tsx             # Use translations + localized data (modified)
│   ├── SkillsSection.tsx            # Use translations + localized data (modified)
│   ├── ExperienceSection.tsx        # Use translations + localized data (modified)
│   ├── ProjectsSection.tsx          # Use translations + localized data (modified)
│   └── ContactSection.tsx           # Use translations + localized validation (modified)
└── shared/
    └── ProjectCard.tsx              # Use translations for button labels (modified)

lib/
└── validations.ts                   # Locale-aware schema factory (modified)

app/
├── layout.tsx                       # Add LocaleProvider (modified)
└── api/contact/route.ts             # Accept locale param (modified)
```

**Structure Decision**: Extends existing Next.js App Router structure. New directories `i18n/` (translation infrastructure) and `contexts/` (React context) follow standard Next.js patterns. English data files placed alongside French originals in `data/` with `.en.ts` suffix for clear association.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Amendment to Principle III (French-only interface) | User explicitly requested bilingual FR/EN support | N/A — direct user requirement |
