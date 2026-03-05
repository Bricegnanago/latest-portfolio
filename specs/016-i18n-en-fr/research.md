# Research: Bilingual Portfolio (FR/EN)

**Feature**: 016-i18n-en-fr
**Date**: 2026-03-05

## Decision 1: i18n Approach — Custom React Context vs Library

**Decision**: Custom React Context with TypeScript dictionaries

**Rationale**:
- Only 2 languages (FR/EN), ~41 UI strings, ~80 data strings — a full i18n library is overkill
- No URL-based routing needed (`/en/`, `/fr/`) — this is a single-page portfolio
- No complex pluralization, date formatting, or number formatting requirements
- Constitution mandates "no over-engineering" and minimizing dependencies
- Custom context gives full TypeScript type-safety with zero bundle size overhead
- `next-intl` would add ~12KB gzipped + middleware + route restructuring for minimal benefit

**Alternatives considered**:
- `next-intl`: Production-grade, supports App Router, but requires route-based locale switching (`/[locale]/page.tsx`), middleware, and significant restructuring. Overkill for a 2-language single-page app.
- `react-i18next`: Popular but designed for larger apps with dynamic loading, namespaces, and backends. Adds unnecessary complexity.
- `next/intl` (built-in Next.js): Next.js has no built-in i18n for App Router — was removed after Pages Router.

## Decision 2: Data Architecture — Parallel Files vs Inline Localization

**Decision**: Parallel data files (`data/personal.ts` stays French, `data/personal.en.ts` added for English)

**Rationale**:
- Keeps existing French data files 100% unchanged (zero regression risk)
- Constitution requires data in `/data/*.ts` — parallel files respect this
- Each language file exports the same type/shape, ensuring type-safety
- A locale-aware getter function selects the correct data based on current locale
- Cleaner separation than embedding `{ fr: "...", en: "..." }` into every field (which would require changing every type and every consumer)

**Alternatives considered**:
- Inline `LocalizedString` type (`{ fr: string, en: string }`): Requires changing all types in `types/index.ts`, all data files, and all components that read fields. Very high blast radius.
- Single translation JSON files: Doesn't fit the TypeScript-first `/data/*.ts` pattern mandated by constitution.
- Re-exporting French data as default: Adds indirection with no benefit.

## Decision 3: Language Preference Persistence

**Decision**: `localStorage` with key `"locale"`

**Rationale**:
- Simplest client-side persistence mechanism
- Survives page refreshes and browser restarts
- No cookies needed (no server-side rendering dependency for locale)
- Already a common pattern in the codebase (next-themes uses similar approach)

**Alternatives considered**:
- Cookie-based: Would enable server-side locale detection in middleware, but unnecessary since there's no route-based locale switching
- URL parameter (`?lang=en`): Makes sharing language-specific links possible but adds URL complexity to a single-page site

## Decision 4: Browser Language Detection

**Decision**: Check `navigator.language` on first load, only if no stored preference exists

**Rationale**:
- `navigator.language` returns the browser's primary language (e.g., "en-US", "fr-FR")
- Checking `startsWith('en')` catches all English variants (en-US, en-GB, en-AU)
- Default to French for any non-English language (as specified in the feature spec)
- Only runs once (on first visit when localStorage is empty)

**Alternatives considered**:
- `Accept-Language` header via middleware: Server-side detection, but requires Next.js middleware and adds complexity for a client-rendered single-page app
- No auto-detection: Simpler but worse UX for English-speaking visitors

## Decision 5: Metadata Updates (SEO)

**Decision**: Client-side `document.title` and meta tag updates via `useEffect`

**Rationale**:
- Next.js `generateMetadata()` runs server-side and can't react to client-side locale state
- Since locale is stored in `localStorage` (client-only), metadata must be updated client-side
- `document.title` and `document.querySelector('meta[name="description"]')` updates are straightforward
- OG tags won't update for social media crawlers (they don't execute JS), but the initial French metadata is acceptable as fallback — this is documented as a known limitation

**Alternatives considered**:
- Route-based locale with `generateMetadata`: Would require restructuring to `/[locale]/page.tsx`, which is over-engineering for this use case
- Server-side cookie detection: Adds middleware complexity for marginal SEO benefit on a personal portfolio

## Decision 6: Contact API Response Messages

**Decision**: Accept a `locale` field in the contact form POST body and return localized response messages

**Rationale**:
- The API route (`/api/contact/route.ts`) currently returns French messages like "Votre message a été envoyé avec succès"
- The client knows the current locale and can send it with the form data
- The API can select the correct response message based on the locale
- Minimal change to the existing API — just add locale parameter and a small translation map

**Alternatives considered**:
- Client-side message override: Ignore API response message and use client-side translations. Simpler but loses server-side error specificity.
- Status-code-only responses: Return only success/failure status codes and let client handle all messages. Would require refactoring error handling.

## Decision 7: Zod Validation Messages

**Decision**: Create a locale-aware factory function `getContactFormSchema(locale)` that returns the Zod schema with localized error messages

**Rationale**:
- Zod error messages are defined at schema creation time
- A factory function keeps the existing validation pattern intact
- Caller passes the current locale, gets back a schema with the right messages
- Only 3 error messages to localize

**Alternatives considered**:
- Zod error map: Global error map override — too broad, affects all schemas
- Post-validation message replacement: Parse errors and replace messages — fragile and hard to maintain

## String Inventory Summary

| Category              | Count | Location                            |
|-----------------------|-------|-------------------------------------|
| Navigation labels     | 6     | `Navbar.tsx`                        |
| Section titles        | 6     | `*Section.tsx` components           |
| Section subtitles     | 6     | `*Section.tsx` components           |
| Hero text             | 3     | `HeroSection.tsx`                   |
| Form labels           | 6     | `ContactSection.tsx`                |
| Button labels         | 6     | `ProjectCard.tsx`                   |
| Footer text           | 2     | `Footer.tsx`                        |
| Aria labels           | 8     | Various                             |
| Validation messages   | 3     | `validations.ts`                    |
| API response messages | 3     | `route.ts`                          |
| Metadata strings      | 3     | `layout.tsx`                        |
| **Total UI strings**  | **~52** |                                   |
| Data content strings  | ~80+  | `data/*.ts` (4 files)               |
