# Quickstart: Project Demo Images Gallery

**Branch**: `005-project-demo-images` | **Date**: 2026-02-26

## Vue d'ensemble

4 étapes dans cet ordre strict (chaque étape dépend de la précédente) :

```
Step 1 → types/index.ts           (ajouter DemoImage + images sur Project)
Step 2 → ImageGalleryModal.tsx    (nouveau composant — dépend du type)
Step 3 → ProjectCard.tsx          (mise à jour — dépend du composant)
Step 4 → data/projects.ts         (ajouter les images — dépend du type)
```

---

## Step 1 — Étendre les types TypeScript

**Fichier** : `types/index.ts`

Ajouter l'interface `DemoImage` **avant** `Project`, puis ajouter le champ `images` à `Project` :

```typescript
// Ajouter avant l'interface Project
export interface DemoImage {
  src: string
  alt?: string
}

// Dans l'interface Project, ajouter :
images?: DemoImage[]
```

**Vérification** : TypeScript ne lève aucune erreur après modification.

---

## Step 2 — Créer ImageGalleryModal

**Fichier** : `components/shared/ImageGalleryModal.tsx` *(nouveau fichier)*

**Référence pattern** : `components/shared/VideoModal.tsx`

**Interface Props** :
```typescript
interface ImageGalleryModalProps {
  images: DemoImage[]
  title: string
  isOpen: boolean
  onClose: () => void
}
```

**Comportement attendu** :
- `Dialog` avec `open={isOpen}` et `onOpenChange` qui appelle `onClose`
- `DialogTitle` en `sr-only` (accessibilité, identique à `VideoModal`)
- `next/image` avec `fill` dans un conteneur `relative aspect-video max-h-[70vh]`
- Boutons `ChevronLeft` / `ChevronRight` (Lucide) masqués si 1 seule image
- Points indicateurs (1 point par image) en bas, coloré sur l'index actif
- Navigation clavier : `useEffect` activé quand `isOpen`, écoute `ArrowLeft`, `ArrowRight`, `Escape`
- Navigation tactile : `onPointerDown` / `onPointerUp` sur le conteneur, seuil 50px
- Transitions : `AnimatePresence` + `motion.div` avec `key={currentIndex}` + variante slide directionnel
- Réinitialisation de `currentIndex` à `0` quand la modale se ferme (`onOpenChange`)

**Icônes Lucide à importer** : `ChevronLeft`, `ChevronRight`

---

## Step 3 — Mettre à jour ProjectCard

**Fichier** : `components/shared/ProjectCard.tsx`

**Ajouts** :
1. Importer `ImageGalleryModal` depuis `@/components/shared/ImageGalleryModal`
2. Importer `Images` depuis `lucide-react`
3. Ajouter `useState` pour `isGalleryOpen` (booléen)
4. Dans la zone des boutons, ajouter **avant** le bouton vidéo :

```tsx
{project.images && project.images.length > 0 && (
  <>
    <Button variant="outline" size="sm" onClick={() => setIsGalleryOpen(true)}>
      <Images className="mr-1 h-4 w-4" />
      Captures
    </Button>
    <ImageGalleryModal
      images={project.images}
      title={project.title}
      isOpen={isGalleryOpen}
      onClose={() => setIsGalleryOpen(false)}
    />
  </>
)}
```

**Ordre des boutons dans la carte** : Captures → Voir la démo (vidéo) → Démo (lien) → Code

---

## Step 4 — Ajouter les images dans les données

**Fichier** : `data/projects.ts`

Ajouter le champ `images` aux projets qui ont des captures disponibles. Si les images ne sont pas encore disponibles, ne pas ajouter le champ (le bouton n'apparaîtra pas).

```typescript
// Exemple pour QR Order System
{
  title: "QR Order System",
  // ...autres champs...
  images: [
    { src: "/images/qr-order-1.png", alt: "Interface client — menu par QR code" },
    { src: "/images/qr-order-2.png", alt: "Dashboard restaurant" },
  ],
}
```

Placer les images dans `public/images/` (elles sont servies depuis `/images/...`).

---

## Checklist de validation finale

Avant de considérer la feature terminée :

- [ ] TypeScript strict : aucun `any`, tous les types explicites
- [ ] `next/image` utilisé (pas de `<img>` natif)
- [ ] Navigation clavier fonctionnelle (ArrowLeft/Right/Escape)
- [ ] Swipe mobile fonctionnel (tester sur Chrome DevTools mobile)
- [ ] Responsive : galerie correctement dimensionnée sur mobile (375px) et desktop (1280px)
- [ ] Projets sans `images` : aucun bouton affiché, aucune régression
- [ ] Un seul image : navigation précédent/suivant masquée, pas d'indicateurs
- [ ] ARIA : `sr-only` title, `aria-label` sur les boutons de navigation
- [ ] Aucun `console.log` dans le code final
- [ ] Lighthouse score maintenu > 90

---

## Notes d'implémentation

**next/image et Dialog** : Le `DialogContent` de shadcn/ui utilise `position: fixed`. Utiliser `position: relative` sur le conteneur parent de l'image pour que `fill` fonctionne correctement à l'intérieur du Dialog.

**AnimatePresence et reinitialisation** : Utiliser `mode="wait"` sur `AnimatePresence` pour que l'image sortante disparaisse avant que l'entrante apparaisse (évite le chevauchement).

**Indicateurs accessibles** : Les points doivent avoir `role="button"`, `aria-label="Image N"`, et être navigables au clavier (`tabIndex={0}`).
