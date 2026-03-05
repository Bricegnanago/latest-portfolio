# Tasks: Bilingual Portfolio (FR/EN)

**Input**: Design documents from `/specs/016-i18n-en-fr/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md, contracts/

**Tests**: Not requested — no test tasks included.

**Organization**: Tasks are grouped by user story. US1 (Language Switch) and US2 (Translated Data) are merged into a single MVP phase because they modify the same components (each section component needs both UI translations and localized data). US3 (Browser Detection) and US4 (Metadata/SEO) are fully covered by the foundational LocaleContext implementation (T004) and require no additional tasks.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Translation Infrastructure)

**Purpose**: Create the i18n type system and translation dictionaries that all other tasks depend on

- [x] T001 Create Locale type, TranslationDictionary interface, DEFAULT_LOCALE and SUPPORTED_LOCALES constants in i18n/types.ts — see quickstart.md Step 1 and data-model.md for the full TranslationDictionary shape
- [x] T002 [P] Create French translation dictionary in i18n/translations/fr.ts — extract all hardcoded French strings from existing components into the TranslationDictionary structure (see quickstart.md Step 1 for complete dictionary)
- [x] T003 [P] Create English translation dictionary in i18n/translations/en.ts — same structure as fr.ts with English translations for all ~52 UI strings (see quickstart.md Step 1)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY component can be updated

**Depends on**: Phase 1 complete

- [x] T004 Create LocaleProvider context and useLocale hook in contexts/LocaleContext.tsx — includes browser language detection (US3: navigator.language), localStorage persistence, and client-side metadata updates (US4: document.title, meta tags, og:locale, HTML lang attribute). See quickstart.md Step 2 for complete implementation and contracts/locale-context.md for the API contract
- [x] T005 [P] Create English personal info data in data/personal.en.ts — translate title, bio, location, languages, education from data/personal.ts. Keep name, email, phone, certifications, socials unchanged. Must export same PersonalInfo type
- [x] T006 [P] Create English experiences data in data/experiences.en.ts — translate position, description, responsibilities, location, startDate, endDate for all 3 entries from data/experiences.ts. Keep company, website unchanged. Must export same Experience[] type
- [x] T007 [P] Create English projects data in data/projects.en.ts — translate title, description, metrics for all 4 projects from data/projects.ts. Keep technologies, URLs, images unchanged. Must export same Project[] type
- [x] T008 [P] Create English skill categories data in data/skills.en.ts — translate category names (Langages→Languages, Bases de données→Databases, etc.) from data/skills.ts. Keep skill names and icons unchanged. Must export same SkillCategory[] type
- [x] T009 Create locale-aware data getter function getLocalizedData(locale) in data/index.ts — imports both FR and EN data files, returns the correct set based on locale parameter. See quickstart.md Step 3 and contracts/locale-context.md for the return type
- [x] T010 Create LanguageSwitcher toggle component in components/layout/LanguageSwitcher.tsx — uses useLocale() hook, Lucide Languages icon, toggles between FR/EN, shows next locale badge. See quickstart.md Step 4
- [x] T011 Integrate LocaleProvider in app/layout.tsx — wrap page content with LocaleProvider inside the existing ThemeProvider. See quickstart.md Step 5

**Checkpoint**: Foundation ready — LocaleProvider active, dictionaries loaded, English data available, language switcher component created. US3 (browser detection) and US4 (metadata/SEO) are now functional via T004.

---

## Phase 3: US1 + US2 — Language Switch + Translated Data (Priority: P1) — MVP

**Goal**: All visible text on the site switches between French and English when the user clicks the language toggle. Both UI labels (nav, titles, buttons, form labels) and data content (bio, projects, experiences, skills) are translated.

**Independent Test**: Click the language switcher in the navbar → every piece of visible text on the page displays in the selected language. Refresh the page → language persists.

### Implementation for US1 + US2

- [x] T012 [US1+US2] Update components/layout/Navbar.tsx — import useLocale hook, replace 6 hardcoded nav labels (Accueil, À propos, etc.) with t.nav.* translations, replace aria-labels with t.nav.backToHome/closeMenu/openMenu, add LanguageSwitcher component next to ThemeToggle
- [x] T013 [P] [US1] Update components/layout/Footer.tsx — import useLocale hook, replace "Tous droits réservés." with t.footer.allRightsReserved, replace "Envoyer un email" aria-label with t.footer.sendEmail
- [x] T014 [P] [US1] Update components/layout/ThemeToggle.tsx — import useLocale hook, replace aria-labels "Changer le thème"/"Passer en mode clair"/"Passer en mode sombre" with t.theme.* translations
- [x] T015 [P] [US1+US2] Update components/sections/HeroSection.tsx — import useLocale + getLocalizedData, replace "Bienvenue" with t.hero.welcome, replace button labels with t.hero.viewProjects/contactMe, replace scroll aria-label with t.hero.scrollDown, use getLocalizedData(locale).personalInfo for title and bio
- [x] T016 [P] [US1+US2] Update components/sections/AboutSection.tsx — import useLocale + getLocalizedData, replace SectionTitle props with t.about.title/subtitle, replace labels (Localisation, Langues, Formation, Certifications) with t.about.* translations, use getLocalizedData(locale).personalInfo for bio, location, languages, education, certifications
- [x] T017 [P] [US1+US2] Update components/sections/SkillsSection.tsx — import useLocale + getLocalizedData, replace SectionTitle props with t.skills.title/subtitle, use getLocalizedData(locale).skillCategories for category names
- [x] T018 [P] [US1+US2] Update components/sections/ExperienceSection.tsx — import useLocale + getLocalizedData, replace SectionTitle props with t.experience.title/subtitle, use getLocalizedData(locale).experiences for positions, descriptions, responsibilities
- [x] T019 [P] [US1+US2] Update components/sections/ProjectsSection.tsx — import useLocale + getLocalizedData, replace SectionTitle props with t.projects.title/subtitle, use getLocalizedData(locale).projects for titles, descriptions, metrics
- [x] T020 [P] [US1] Update components/shared/ProjectCard.tsx — import useLocale hook, replace button labels "Captures"/"Voir la démo"/"Démo"/"Démo à venir"/"Code"/"Code à venir" with t.projects.* translations. ProjectCard must accept translations via useLocale (not props) since it's a shared component
- [x] T021 [US1] Refactor lib/validations.ts — replace static contactFormSchema with getContactFormSchema(locale) factory function that returns a Zod schema with localized error messages from the translation dictionary. Export ContactFormValues type. See quickstart.md Step 7
- [x] T022 [US1+US2] Update components/sections/ContactSection.tsx — import useLocale + getLocalizedData, replace all form labels (Nom, Email, Message, placeholders, button text) with t.contact.* translations, replace error toast message with t.api.error, call getContactFormSchema(locale) instead of static schema, pass locale in form submission body, use getLocalizedData(locale).personalInfo for direct contact info
- [x] T023 [US1] Update app/api/contact/route.ts — extract locale from request body (default 'fr'), use locale to select response messages (success, error, invalidData, configError) from a server-side translation map, keep email notification to site owner in French. See contracts/contact-api.md for the full contract

**Checkpoint**: MVP complete. All visible text switches between FR and EN. Language preference persists across refreshes (US1). All data content displays in the selected language (US2). Browser detection works on first visit (US3 via T004). Metadata updates on switch (US4 via T004).

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and cleanup

- [x] T024 Run all 9 smoke tests from quickstart.md — verify: (1) language switch toggles all text, (2) persistence across refresh, (3) browser detection for English, (4) fallback to French for unsupported languages, (5) form validation messages in English, (6) contact form success message in English, (7) document.title updates, (8) project descriptions in English, (9) no flash of wrong language on first load
- [x] T025 Verify TypeScript strict compliance — run build to confirm no type errors, no `any` types, all TranslationDictionary keys are used, no missing translations

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 (T001 specifically for types). T005-T008 can start in parallel with T004.
- **US1+US2 (Phase 3)**: Depends on Phase 2 completion (needs LocaleContext + data files + data getter)
- **Polish (Phase 4)**: Depends on Phase 3 completion

### User Story Dependencies

- **US1 (Language Switch, P1)**: Requires Phase 2 complete. Core MVP story.
- **US2 (Translated Data, P1)**: Requires Phase 2 complete. Merged with US1 since they touch the same files.
- **US3 (Browser Detection, P2)**: **No dedicated tasks** — fully implemented by T004 (LocaleContext initialization logic: localStorage check → navigator.language fallback → 'fr' default).
- **US4 (Metadata/SEO, P3)**: **No dedicated tasks** — fully implemented by T004 (useEffect updates document.title, meta description, og:title, og:description, og:locale, HTML lang attribute).

### Within Phase 3

- T012 must run first (Navbar — adds LanguageSwitcher to the page)
- T013-T020 can all run in parallel (different component files, no interdependencies)
- T021 must complete before T022 (ContactSection depends on refactored validation schema)
- T023 can run in parallel with T022 (different files: API route vs component)

### Parallel Opportunities

```
Phase 1 parallel:
  T002 (fr.ts) ‖ T003 (en.ts)    — after T001

Phase 2 parallel:
  T005 (personal.en) ‖ T006 (experiences.en) ‖ T007 (projects.en) ‖ T008 (skills.en)    — after T001
  T004 (LocaleContext) — after T001, T002, T003
  T009 (data/index.ts) — after T005-T008
  T010 (LanguageSwitcher) — after T004
  T011 (layout.tsx) — after T004

Phase 3 parallel:
  T013 (Footer) ‖ T014 (ThemeToggle) ‖ T015 (Hero) ‖ T016 (About) ‖ T017 (Skills) ‖ T018 (Experience) ‖ T019 (Projects) ‖ T020 (ProjectCard)    — after T012
  T023 (API route) — after T021, parallel with T022
```

---

## Parallel Example: Phase 3 Component Updates

```bash
# After T012 (Navbar) completes, launch all independent component updates:
Task: "Update Footer.tsx with translations"           # T013
Task: "Update ThemeToggle.tsx with translations"       # T014
Task: "Update HeroSection.tsx with translations+data"  # T015
Task: "Update AboutSection.tsx with translations+data" # T016
Task: "Update SkillsSection.tsx with translations+data"# T017
Task: "Update ExperienceSection.tsx with translations+data" # T018
Task: "Update ProjectsSection.tsx with translations+data"   # T019
Task: "Update ProjectCard.tsx with translations"       # T020
```

---

## Implementation Strategy

### MVP First (Phase 1 + 2 + 3)

1. Complete Phase 1: Setup — create types and dictionaries (~3 files)
2. Complete Phase 2: Foundational — create context, English data, switcher, integrate provider (~8 files)
3. Complete Phase 3: US1+US2 — update all components to use translations + localized data (~12 files)
4. **STOP and VALIDATE**: Run smoke tests (T024) — all 4 user stories should be functional
5. Deploy if ready

### Incremental Delivery

1. Phase 1 + 2 → Foundation ready (LanguageSwitcher visible but components still hardcoded French)
2. Phase 3: T012 (Navbar) → First visible proof of language switching
3. Phase 3: T013-T020 (all sections) → Full site translates
4. Phase 3: T021-T023 (validation + API) → Forms work in both languages
5. Phase 4: Smoke tests + build verification → Ship

---

## Notes

- [P] tasks = different files, no dependencies on each other
- US3 and US4 have no dedicated tasks because their logic is embedded in the LocaleContext (T004)
- English data files (T005-T008) should contain accurate translations based on Brice's real CV — mark any uncertain translations with `// TODO: verify translation` comments for owner review
- The contact API route (T023) keeps the email notification to the site owner in French (internal communication)
- No new npm dependencies are installed — zero changes to package.json
- Commit after each phase or logical group of parallel tasks
