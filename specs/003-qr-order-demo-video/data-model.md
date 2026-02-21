# Data Model: Vidéo de démo — QR Order System

**Feature**: `003-qr-order-demo-video`
**Date**: 2026-02-21

---

## Entités modifiées

### Project (extension)

**Fichier**: `types/index.ts`

```ts
export interface Project {
  title: string
  description: string
  technologies: string[]
  metrics: string[]
  demoUrl?: string
  sourceUrl?: string
  image?: string
  videoUrl?: string   // NOUVEAU — chemin vers la vidéo de démo (relatif à /public)
}
```

**Règles de validation**:
- `videoUrl` est optionnel — sa présence active le bouton "Voir la démo" dans `ProjectCard`
- La valeur doit être un chemin relatif au dossier `/public` (ex: `/images/event_project.mp4`)
- Ne peut pas être un placeholder `"[À COMPLÉTER]"` — le champ doit être absent ou pointer vers une vidéo réelle

**Impact sur les projets existants**:

| Projet | videoUrl | Effet |
|--------|----------|-------|
| Ticket System | absent | Comportement inchangé |
| QR Order System | `/images/event_project.mp4` | Bouton "Voir la démo" activé |
| ZoomStudent | absent | Comportement inchangé |

---

## Données statiques modifiées

### QR Order System (`data/projects.ts`)

```ts
{
  title: "QR Order System",
  description: "Système de commande par QR code pour la restauration...",
  technologies: ["Next.js", "TypeScript", "Spring Boot", "MySQL", "AWS"],
  metrics: [
    "Temps de commande réduit de 60%",
    "Intégration paiement mobile",
    "Support multi-restaurant",
  ],
  demoUrl: "[À COMPLÉTER]",
  sourceUrl: "[À COMPLÉTER]",
  videoUrl: "/images/event_project.mp4",   // NOUVEAU
}
```

---

## Composants nouveaux

### VideoModal

**Fichier**: `components/shared/VideoModal.tsx`

**Props**:

```ts
interface VideoModalProps {
  videoUrl: string      // Chemin vers la vidéo (ex: "/images/event_project.mp4")
  title: string         // Titre du projet — utilisé pour aria-label de la modale
  isOpen: boolean       // Contrôle l'affichage de la modale
  onClose: () => void   // Callback de fermeture
}
```

**Comportements**:
- À l'ouverture : la modale s'affiche, la vidéo démarre en lecture (muted sur mobile)
- À la fermeture : la vidéo est mise en pause via `videoRef.current.pause()`
- Fermeture possible via : bouton "Fermer" (icône X), clic sur l'overlay, touche Échap
- La vidéo expose les contrôles natifs du navigateur (lecture, pause, volume, plein écran, progression)

---

## Composants modifiés

### ProjectCard

**Fichier**: `components/shared/ProjectCard.tsx`

**Changements**:
- État local ajouté : `const [isVideoOpen, setIsVideoOpen] = useState(false)`
- Logique : si `project.videoUrl` est défini → afficher le bouton "Voir la démo" (actif) plutôt que "Démo à venir" (disabled)
- `VideoModal` rendu conditionnellement quand `project.videoUrl` est défini

**Aucun changement de signature** — `ProjectCardProps` reste identique (passe `project: Project` qui contient maintenant `videoUrl?`)

---

## Flux de données

```
data/projects.ts
  └─ projects[].videoUrl: "/images/event_project.mp4"
       ↓
ProjectsSection.tsx  (aucun changement)
  └─ projects.map(project => <ProjectCard project={project} />)
       ↓
ProjectCard.tsx  (modifié)
  ├─ project.videoUrl ? <Button "Voir la démo"> : <Button disabled "Démo à venir">
  └─ project.videoUrl ? <VideoModal videoUrl={...} isOpen={...} onClose={...}> : null
       ↓
VideoModal.tsx  (nouveau)
  └─ Dialog > <video src={videoUrl} controls muted preload="metadata">
```

---

## Assets statiques

| Fichier | Chemin public | Status |
|---------|--------------|--------|
| event_project.mp4 | `/images/event_project.mp4` | Existant — aucune modification |
