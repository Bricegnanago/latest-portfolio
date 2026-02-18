# API Contract: Contact Form

**Endpoint**: `POST /api/contact`
**Purpose**: Recevoir un message de contact et l'envoyer par email à Brice via Resend.

## Request

**Method**: POST
**Content-Type**: application/json

### Body

```json
{
  "name": "string (required, 2-100 chars)",
  "email": "string (required, valid email format)",
  "message": "string (required, 10-1000 chars)"
}
```

### Validation Rules

| Champ   | Règle                  | Message d'erreur                              |
| ------- | ---------------------- | --------------------------------------------- |
| name    | requis, 2-100 chars    | "Le nom est requis (2 à 100 caractères)"      |
| email   | requis, format email   | "Veuillez entrer une adresse email valide"    |
| message | requis, 10-1000 chars  | "Le message est requis (10 à 1000 caractères)"|

## Responses

### 200 OK — Message envoyé

```json
{
  "success": true,
  "message": "Votre message a été envoyé avec succès."
}
```

### 400 Bad Request — Validation échouée

```json
{
  "success": false,
  "message": "Données invalides.",
  "errors": [
    { "field": "email", "message": "Veuillez entrer une adresse email valide" }
  ]
}
```

### 500 Internal Server Error — Échec envoi

```json
{
  "success": false,
  "message": "Une erreur est survenue lors de l'envoi. Veuillez réessayer."
}
```

## Environment Variables Required

| Variable       | Scope   | Description                     |
| -------------- | ------- | ------------------------------- |
| RESEND_API_KEY | Serveur | Clé API Resend                  |
| CONTACT_EMAIL  | Serveur | Email destinataire (Brice)      |

## Email envoyé

- **From** : noreply@resend.dev (ou domaine vérifié Resend)
- **To** : valeur de `CONTACT_EMAIL`
- **Subject** : "Portfolio — Nouveau message de {name}"
- **Body** : Nom, email de l'expéditeur, contenu du message
