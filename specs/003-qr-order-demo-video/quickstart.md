# Quickstart: Vidéo de démo — QR Order System

**Feature**: `003-qr-order-demo-video`
**Date**: 2026-02-21

---

## Prérequis

- Branch active : `003-qr-order-demo-video`
- Fichier vidéo en place : `public/images/event_project.mp4` ✅ (existant)
- Composant `Dialog` de shadcn/ui disponible : `components/ui/dialog.tsx` (vérifier ci-dessous)

### Vérifier que Dialog shadcn/ui est installé

```bash
# Si le composant n'existe pas encore :
npx shadcn@latest add dialog
```

---

## Ordre d'implémentation

### Étape 1 — Étendre le type `Project`

**Fichier**: `types/index.ts`

Ajouter `videoUrl?: string` à l'interface `Project` :

```ts
export interface Project {
  title: string
  description: string
  technologies: string[]
  metrics: string[]
  demoUrl?: string
  sourceUrl?: string
  image?: string
  videoUrl?: string  // ← AJOUTER
}
```

### Étape 2 — Référencer la vidéo dans les données

**Fichier**: `data/projects.ts`

Ajouter `videoUrl` au projet QR Order System uniquement :

```ts
{
  title: "QR Order System",
  // ... autres champs inchangés
  videoUrl: "/images/event_project.mp4",
}
```

### Étape 3 — Créer le composant VideoModal

**Fichier**: `components/shared/VideoModal.tsx` (nouveau)

```tsx
"use client"

import { useRef } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

interface VideoModalProps {
  videoUrl: string
  title: string
  isOpen: boolean
  onClose: () => void
}

export function VideoModal({ videoUrl, title, isOpen, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  function handleOpenChange(open: boolean) {
    if (!open) {
      videoRef.current?.pause()
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <DialogTitle className="sr-only">{title} — Démonstration</DialogTitle>
        <video
          ref={videoRef}
          src={videoUrl}
          controls
          muted
          preload="metadata"
          className="w-full h-auto"
          aria-label={`Vidéo de démonstration : ${title}`}
        />
      </DialogContent>
    </Dialog>
  )
}
```

### Étape 4 — Intégrer VideoModal dans ProjectCard

**Fichier**: `components/shared/ProjectCard.tsx`

1. Ajouter l'import et l'état :

```tsx
import { useState } from "react"
import { VideoModal } from "@/components/shared/VideoModal"
import { Play } from "lucide-react"

// Dans le composant ProjectCard :
const [isVideoOpen, setIsVideoOpen] = useState(false)
```

2. Remplacer le bouton "Démo à venir" conditionnel par la logique vidéo :

```tsx
{project.videoUrl ? (
  <>
    <Button variant="outline" size="sm" onClick={() => setIsVideoOpen(true)}>
      <Play className="mr-1 h-4 w-4" />
      Voir la démo
    </Button>
    <VideoModal
      videoUrl={project.videoUrl}
      title={project.title}
      isOpen={isVideoOpen}
      onClose={() => setIsVideoOpen(false)}
    />
  </>
) : !isPlaceholder(project.demoUrl) ? (
  <Button variant="outline" size="sm" asChild>
    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
      <ExternalLink className="mr-1 h-4 w-4" />
      Démo
    </a>
  </Button>
) : (
  <Button variant="outline" size="sm" disabled>
    <ExternalLink className="mr-1 h-4 w-4" />
    Démo à venir
  </Button>
)}
```

---

## Vérification manuelle

1. Démarrer le serveur de développement : `npm run dev`
2. Ouvrir `http://localhost:3000` et naviguer jusqu'à la section **Projets**
3. Vérifier que la carte **QR Order System** affiche "Voir la démo" (actif)
4. Vérifier que les cartes **Ticket System** et **ZoomStudent** affichent "Démo à venir" (disabled)
5. Cliquer "Voir la démo" → la modale s'ouvre avec la vidéo
6. Tester les fermetures :
   - Bouton X de la modale
   - Clic sur l'overlay (zone sombre autour de la modale)
   - Touche Échap
7. Vérifier que la vidéo s'arrête à chaque fermeture
8. Tester sur un viewport mobile (DevTools → 375px)

---

## Points d'attention

- `muted` est requis pour permettre l'autoplay futur — sans `muted`, Chrome/Safari bloquent `autoPlay`
- `DialogTitle` avec classe `sr-only` est obligatoire pour l'accessibilité (Radix UI affiche un warning sinon)
- S'assurer que `components/ui/dialog.tsx` existe avant d'implémenter (sinon : `npx shadcn@latest add dialog`)
