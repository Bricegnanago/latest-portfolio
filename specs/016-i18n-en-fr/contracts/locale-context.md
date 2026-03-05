# Contract: LocaleContext API

**Feature**: 016-i18n-en-fr
**Type**: React Context

## Provider

```
<LocaleProvider>
  {children}
</LocaleProvider>
```

Must be placed inside `<ThemeProvider>` in `app/layout.tsx`. All components consuming locale must be descendants.

## Hook: useLocale()

```
const { locale, setLocale, t } = useLocale()
```

### Return Value

| Property    | Type                        | Description                              |
|-------------|-----------------------------|------------------------------------------|
| `locale`    | `'fr' \| 'en'`             | Current active locale                    |
| `setLocale` | `(locale: Locale) => void`  | Switch locale + persist to localStorage  |
| `t`         | `TranslationDictionary`     | Current translation dictionary object    |

### Behavior

- **Initial state**: Reads from `localStorage('locale')`, falls back to `navigator.language` detection, defaults to `'fr'`
- **setLocale()**: Updates React state, writes to `localStorage`, updates `document.documentElement.lang`, updates document title and meta tags
- **t**: Memoized — only recomputes when `locale` changes

### Error Handling

- Throws `Error('useLocale must be used within LocaleProvider')` if used outside provider

## Helper: getLocalizedData(locale)

```
import { getLocalizedData } from '@/data'

const { personalInfo, experiences, projects, skillCategories } = getLocalizedData(locale)
```

### Return Value

| Property          | Type               | Description                     |
|-------------------|--------------------|---------------------------------|
| `personalInfo`    | `PersonalInfo`     | Localized personal information  |
| `experiences`     | `Experience[]`     | Localized work experiences      |
| `projects`        | `Project[]`        | Localized project descriptions  |
| `skillCategories` | `SkillCategory[]`  | Localized skill categories      |

### Behavior

- Returns English data when `locale === 'en'`, French data otherwise
- Types are identical to existing types in `types/index.ts` — no type changes needed
- All non-translatable fields (URLs, tech names, images) are identical in both locales

## Helper: getContactFormSchema(locale)

```
import { getContactFormSchema } from '@/lib/validations'

const schema = getContactFormSchema(locale)
```

### Return Value

Returns a `z.ZodObject` with localized error messages for the given locale.

### Behavior

- Replaces the current static `contactFormSchema` export
- Error messages are pulled from the translation dictionary for the given locale
- Schema shape is unchanged — same fields, same constraints
