# Contract: Contact API — Localized Responses

**Feature**: 016-i18n-en-fr
**Endpoint**: `POST /api/contact`

## Request

The existing request body is extended with an optional `locale` field.

```
POST /api/contact
Content-Type: application/json

{
  "name": "string (2-100 chars, required)",
  "email": "string (valid email, required)",
  "message": "string (10-1000 chars, required)",
  "locale": "string ('fr' | 'en', optional, default: 'fr')"
}
```

## Responses

### 200 — Success

```json
{
  "success": true,
  "message": "Votre message a été envoyé avec succès."
}
```

When `locale: "en"`:
```json
{
  "success": true,
  "message": "Your message has been sent successfully."
}
```

### 400 — Validation Error

```json
{
  "success": false,
  "message": "Données invalides.",
  "errors": [
    { "field": "name", "message": "Le nom est requis (2 à 100 caractères)" }
  ]
}
```

When `locale: "en"`:
```json
{
  "success": false,
  "message": "Invalid data.",
  "errors": [
    { "field": "name", "message": "Name is required (2 to 100 characters)" }
  ]
}
```

### 500 — Server Error

```json
{
  "success": false,
  "message": "Une erreur est survenue lors de l'envoi. Veuillez réessayer."
}
```

When `locale: "en"`:
```json
{
  "success": false,
  "message": "An error occurred while sending. Please try again."
}
```

## Notes

- The `locale` field is optional for backwards compatibility; omitting it defaults to French
- Email notification sent to the site owner is always in French (internal communication)
- The `locale` field is NOT validated by the Zod schema — it is extracted separately before validation
