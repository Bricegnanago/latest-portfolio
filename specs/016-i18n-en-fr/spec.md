# Feature Specification: Bilingual Portfolio (French / English)

**Feature Branch**: `016-i18n-en-fr`
**Created**: 2026-03-05
**Status**: Draft
**Input**: User description: "j'aimerais que les utilisateur puisse choisir entre l'anglais et le francais. Et site devrait pouvoir afficher les informations dans la langue souhaitée par l'utilisateur"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Switch Language on the Site (Priority: P1)

A visitor arrives on the portfolio site (defaulting to French) and wants to read the content in English. They locate a language switcher in the navigation bar, click on it, and the entire site content (navigation, section titles, descriptions, buttons, form labels, project details, experience descriptions, etc.) immediately switches to English without a full page reload. The user's choice persists if they navigate or refresh the page.

**Why this priority**: This is the core feature. Without the ability to switch languages, the entire feature has no value. It must work end-to-end across all visible content.

**Independent Test**: Can be fully tested by visiting the site, clicking the language toggle, and verifying all visible text appears in the selected language. Delivers immediate value to non-French-speaking visitors.

**Acceptance Scenarios**:

1. **Given** a visitor is on the site in French, **When** they click the language switcher and select English, **Then** all visible text (navigation, headings, body content, buttons, form labels) displays in English.
2. **Given** a visitor has switched to English, **When** they refresh the page or navigate to a different section, **Then** the site remains in English.
3. **Given** a visitor is on the English version, **When** they click the language switcher and select French, **Then** all content reverts to French.

---

### User Story 2 - Translated Data Content (Priority: P1)

A visitor browsing in English sees all portfolio data content (personal bio, project descriptions, experience descriptions, responsibilities, skill category names, education, certifications) displayed in English. The translations are natural and contextually accurate, not machine-translated placeholders.

**Why this priority**: The data content (projects, experiences, bio) represents the majority of the site's text. Without translated data, only UI labels would switch — leaving 80% of the page in French and making the feature effectively useless.

**Independent Test**: Can be tested by switching to English and verifying that project descriptions, experience details, bio text, skill categories, and education/certification labels all appear in English.

**Acceptance Scenarios**:

1. **Given** the site is set to English, **When** a visitor views the About section, **Then** the bio, location label, languages label, education, and certifications all display in English.
2. **Given** the site is set to English, **When** a visitor views the Projects section, **Then** project titles, descriptions, and metric labels display in English.
3. **Given** the site is set to English, **When** a visitor views the Experience section, **Then** company positions, descriptions, and responsibilities display in English.
4. **Given** the site is set to English, **When** a visitor views the Skills section, **Then** skill category names display in English.

---

### User Story 3 - Language Preference Detection (Priority: P2)

A first-time visitor whose browser is set to English arrives on the site. The site detects the browser's preferred language and automatically displays content in English (instead of defaulting to French). If the browser language is neither French nor English, the site defaults to French.

**Why this priority**: Improves the experience for English-speaking visitors who would otherwise see French first and have to manually switch. Less critical than the core switching mechanism.

**Independent Test**: Can be tested by changing browser language settings and visiting the site for the first time (no stored preference). Delivers smoother onboarding for English-speaking visitors.

**Acceptance Scenarios**:

1. **Given** a first-time visitor has browser language set to English, **When** they visit the site with no stored preference, **Then** the site displays in English.
2. **Given** a first-time visitor has browser language set to French, **When** they visit the site, **Then** the site displays in French.
3. **Given** a first-time visitor has browser language set to German (unsupported), **When** they visit the site, **Then** the site defaults to French.
4. **Given** a returning visitor has previously chosen English, **When** they revisit the site regardless of browser language, **Then** the site displays in English (stored preference overrides browser detection).

---

### User Story 4 - Translated Metadata and SEO (Priority: P3)

When the site is viewed in English, the page title, meta description, and Open Graph tags reflect the English content. This ensures that when the English version is shared on social media or indexed by search engines, the preview text appears in English.

**Why this priority**: Important for discoverability and professional presentation when shared internationally, but not essential for the core user experience of reading the site.

**Independent Test**: Can be tested by inspecting the HTML `<head>` tags when the site is in English mode, and verifying social media preview cards show English text.

**Acceptance Scenarios**:

1. **Given** the site is in English mode, **When** inspecting the page source, **Then** the `<title>`, `meta description`, and Open Graph `og:description` are in English.
2. **Given** the site is in English mode, **When** the HTML `lang` attribute is checked, **Then** it reads `"en"`.

---

### Edge Cases

- What happens when a translation key is missing for a given language? The system falls back to the French version of that text.
- What happens when the user clears their browser storage? The site reverts to browser language detection behavior (Story 3).
- What happens with content that should not be translated (proper nouns, technology names like "React", "AWS", company names)? These remain unchanged in both languages.
- What happens with the contact form validation messages when in English? Error messages display in the currently selected language.
- What happens with dates and date formatting in experience entries? Date formats adapt to locale conventions (e.g., "Jan 2024" in English vs "Janv. 2024" in French).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a visible language switcher accessible from all sections of the site.
- **FR-002**: System MUST support exactly two languages: French (fr) and English (en).
- **FR-003**: System MUST translate all UI text elements: navigation labels, section titles, section subtitles, button labels, form labels, form placeholders, and footer text.
- **FR-004**: System MUST translate all data content: personal bio, project titles, project descriptions, project metrics, experience positions, experience descriptions, experience responsibilities, skill category names, education entries, and certification entries.
- **FR-005**: System MUST persist the user's language preference across page refreshes and navigation within the same session.
- **FR-006**: System MUST detect the visitor's browser language on first visit and set the initial language accordingly (English if browser prefers English, French otherwise).
- **FR-007**: A manually selected language preference MUST override browser language detection on subsequent visits.
- **FR-008**: System MUST update the HTML `lang` attribute to match the selected language.
- **FR-009**: System MUST update page metadata (title, description, Open Graph tags) to match the selected language.
- **FR-010**: System MUST display form validation error messages in the selected language.
- **FR-011**: System MUST NOT translate proper nouns, technology names, company names, or URLs.
- **FR-012**: If a translation is missing for a given key, the system MUST fall back to the French version.

### Key Entities

- **Locale**: Represents a supported language (fr or en). Determines which set of translations is used across the entire site.
- **Translation Set**: A complete collection of all text strings for a given locale, covering both UI labels and data content.
- **Language Preference**: The user's selected language, stored locally to persist across sessions.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of visible text on the site displays in the selected language after switching (no untranslated strings remain visible).
- **SC-002**: Language switching happens within 300ms with no full page reload — the transition feels instant to the user.
- **SC-003**: The user's language preference persists across at least 5 consecutive page refreshes without reverting.
- **SC-004**: First-time visitors with an English browser see English content without any manual action.
- **SC-005**: Page metadata (title, description, OG tags) correctly reflects the selected language, verifiable via social media preview tools.

## Assumptions

- The site owner (Brice GNANAGO) will provide or validate the English translations for all data content (bio, project descriptions, experience details). The implementation will include placeholder English translations that can be refined later.
- The default/fallback language is French, as it is the current language of the site.
- Only two languages are supported (no future-proofing for additional languages needed, though a clean architecture will naturally support extension).
- Language preference is stored client-side (browser local storage or cookie) — no server-side user accounts exist.
- The language switcher is placed in the navigation bar alongside the existing theme toggle for consistency.
