# Quickstart: Zoom sur les Images de Projet

**Feature**: `014-project-image-zoom`
**Date**: 2026-03-03

---

## Changes Summary

### Installation

**Aucune nouvelle dépendance** — Framer Motion 12 et React 18 déjà installés.

### Seul fichier modifié : `components/shared/ImageGalleryModal.tsx`

Remplacer le fichier entier par :

```tsx
"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { DemoImage } from "@/types"

interface ImageGalleryModalProps {
  images: DemoImage[]
  title: string
  isOpen: boolean
  onClose: () => void
}

const ZOOM_SCALE = 2.5

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
}

export function ImageGalleryModal({ images, title, isOpen, onClose }: ImageGalleryModalProps) {
  const reducedMotion = useReducedMotion()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  // Zoom / pan state
  const [zoomed, setZoomed] = useState(false)
  const [scale, setScale] = useState(1)
  const [panX, setPanX] = useState(0)
  const [panY, setPanY] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const startXRef = useRef(0)
  const startYRef = useRef(0)
  const startPanXRef = useRef(0)
  const startPanYRef = useRef(0)
  const hasDraggedRef = useRef(false)

  // Pinch tracking
  const pointersRef = useRef<Map<number, { x: number; y: number }>>(new Map())
  const initialPinchDistRef = useRef(0)
  const initialPinchScaleRef = useRef(1)
  const initialPinchPanRef = useRef({ x: 0, y: 0 })

  const hasMultiple = images.length > 1

  // ── Helpers ──────────────────────────────────────────────────────────────

  function getDistance(p1: { x: number; y: number }, p2: { x: number; y: number }) {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y)
  }

  function clampPan(px: number, py: number, sc: number): { x: number; y: number } {
    const el = containerRef.current
    if (!el) return { x: px, y: py }
    const maxX = (el.clientWidth * (sc - 1)) / 2
    const maxY = (el.clientHeight * (sc - 1)) / 2
    return {
      x: Math.max(-maxX, Math.min(maxX, px)),
      y: Math.max(-maxY, Math.min(maxY, py)),
    }
  }

  function resetZoom() {
    setZoomed(false)
    setScale(1)
    setPanX(0)
    setPanY(0)
  }

  // ── Navigation ───────────────────────────────────────────────────────────

  const goPrev = useCallback(() => {
    resetZoom()
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  const goNext = useCallback(() => {
    resetZoom()
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  function goTo(index: number) {
    resetZoom()
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  function handleOpenChange(open: boolean) {
    if (!open) onClose()
  }

  // ── Reset on close / image change ────────────────────────────────────────

  useEffect(() => {
    if (!isOpen) {
      setCurrentIndex(0)
      setDirection(1)
      resetZoom()
    }
  }, [isOpen])

  // ── Keyboard ─────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!isOpen) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && zoomed) {
        // Intercept Escape before Dialog closes the modal
        e.preventDefault()
        e.stopPropagation()
        resetZoom()
        return
      }
      if (e.key === "ArrowLeft") goPrev()
      else if (e.key === "ArrowRight") goNext()
    }
    // Capture phase to intercept before Radix/Dialog
    window.addEventListener("keydown", handleKeyDown, true)
    return () => window.removeEventListener("keydown", handleKeyDown, true)
  }, [isOpen, goPrev, goNext, zoomed])

  // ── Pointer handlers (unified: click / swipe / pan / pinch) ─────────────

  function handlePointerDown(e: React.PointerEvent) {
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY })

    if (pointersRef.current.size === 1) {
      startXRef.current = e.clientX
      startYRef.current = e.clientY
      startPanXRef.current = panX
      startPanYRef.current = panY
      hasDraggedRef.current = false
    }

    if (pointersRef.current.size === 2) {
      const pts = Array.from(pointersRef.current.values())
      initialPinchDistRef.current = getDistance(pts[0], pts[1])
      initialPinchScaleRef.current = scale
      initialPinchPanRef.current = { x: panX, y: panY }
    }
  }

  function handlePointerMove(e: React.PointerEvent) {
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY })

    if (pointersRef.current.size === 2) {
      // Pinch-to-zoom
      const pts = Array.from(pointersRef.current.values())
      const dist = getDistance(pts[0], pts[1])
      const newScale = Math.max(1, Math.min(4, initialPinchScaleRef.current * (dist / initialPinchDistRef.current)))
      setScale(newScale)
      setZoomed(newScale > 1)
      const clamped = clampPan(initialPinchPanRef.current.x, initialPinchPanRef.current.y, newScale)
      setPanX(clamped.x)
      setPanY(clamped.y)
      return
    }

    if (pointersRef.current.size === 1 && zoomed) {
      // Pan when zoomed
      const dx = e.clientX - startXRef.current
      const dy = e.clientY - startYRef.current
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) hasDraggedRef.current = true
      const clamped = clampPan(startPanXRef.current + dx, startPanYRef.current + dy, scale)
      setPanX(clamped.x)
      setPanY(clamped.y)
    }
  }

  function handlePointerUp(e: React.PointerEvent) {
    const dx = e.clientX - startXRef.current
    const dy = e.clientY - startYRef.current
    const wasPinch = pointersRef.current.size >= 2

    pointersRef.current.delete(e.pointerId)

    if (wasPinch) return

    const hasMoved = Math.abs(dx) > 5 || Math.abs(dy) > 5

    if (!hasMoved && !hasDraggedRef.current) {
      // Click → toggle zoom
      if (zoomed) {
        resetZoom()
      } else {
        setZoomed(true)
        setScale(ZOOM_SCALE)
      }
      return
    }

    if (!zoomed && Math.abs(dx) >= 50) {
      // Swipe to navigate (only when not zoomed)
      if (dx < 0) goNext()
      else goPrev()
    }
  }

  function handlePointerLeave(e: React.PointerEvent) {
    pointersRef.current.delete(e.pointerId)
  }

  // ── Cursor ───────────────────────────────────────────────────────────────

  const cursor = zoomed ? "cursor-zoom-out" : "cursor-zoom-in"

  if (images.length === 0) return null

  const currentImage = images[currentIndex]

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden select-none">
        <DialogTitle className="sr-only">{title} — Captures de démonstration</DialogTitle>

        <div
          ref={containerRef}
          className={`relative aspect-video w-full overflow-hidden bg-black touch-none ${cursor}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={reducedMotion ? { duration: 0 } : { duration: 0.25, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <motion.div
                className="absolute inset-0"
                animate={{ scale, x: panX, y: panY }}
                transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
              >
                <Image
                  src={currentImage.src}
                  alt={currentImage.alt ?? `${title} — capture ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  draggable={false}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {hasMultiple && (
            <>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Image précédente"
                onClick={(e) => { e.stopPropagation(); goPrev() }}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white h-10 w-10 rounded-full"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Image suivante"
                onClick={(e) => { e.stopPropagation(); goNext() }}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white h-10 w-10 rounded-full"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}
        </div>

        {hasMultiple && (
          <div className="flex justify-center gap-2 py-3 px-4 bg-background">
            {images.map((_, index) => (
              <button
                key={index}
                aria-label={`Image ${index + 1} de ${images.length}`}
                tabIndex={0}
                onClick={() => goTo(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") goTo(index)
                }}
                className={`h-2 w-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  index === currentIndex
                    ? "bg-primary"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                }`}
              />
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
```

---

## Smoke Test Checklist

- [ ] `npx tsc --noEmit` — 0 erreur TypeScript
- [ ] Ouvrir la galerie d'un projet avec images → curseur loupe (+) visible
- [ ] Cliquer sur l'image → image agrandie à ~2.5× (base + écran reconnaissables)
- [ ] Curseur passe en loupe (−) quand zoomé
- [ ] Cliquer à nouveau sur l'image zoomée → retour à la taille normale
- [ ] Image zoomée → glisser la souris → l'image se déplace, révèle les bords
- [ ] Pan : l'image ne dépasse pas les limites du conteneur (clamp effectif)
- [ ] Appuyer sur ← ou → quand zoomé → navigation vers autre image, zoom réinitialisé
- [ ] Appuyer sur Échap quand zoomé → dézoom uniquement (modale reste ouverte)
- [ ] Appuyer sur Échap quand non zoomé → modale se ferme
- [ ] Cliquer sur bouton flèche (prev/next) → navigation fonctionne, zoom réinitialisé
- [ ] Cliquer sur un point de pagination → navigation fonctionne, zoom réinitialisé
- [ ] Ouvrir sur mobile → swipe horizontal fonctionne (sans zoom actif)
- [ ] Sur mobile : pincer deux doigts → image s'agrandit proportionnellement
- [ ] Sur mobile : pincer + pan avec un doigt → déplacement possible quand zoomé
- [ ] `prefers-reduced-motion` actif → zoom reste fonctionnel, animations désactivées

---

## Non-Regression Check

| Comportement | Attendu |
|--------------|---------|
| Swipe navigation (mobile) | ✅ Inchangé quand non zoomé |
| Navigation clavier ← → | ✅ Inchangée |
| Boutons prev/next | ✅ Inchangés |
| Pagination (dots) | ✅ Inchangée |
| Dialog shadcn — fermeture sur Échap | ✅ Fonctionne quand non zoomé |
| Dialog shadcn — fermeture clic extérieur | ✅ Inchangée |
| `npx tsc --noEmit` | ✅ 0 erreur |
| Lighthouse accessibilité | ✅ `aria-label` + curseur visuel maintenus |
