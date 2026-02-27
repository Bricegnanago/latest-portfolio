"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const startXRef = useRef(0)

  const hasMultiple = images.length > 1

  const goPrev = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  const goNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  function goTo(index: number) {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  function handleOpenChange(open: boolean) {
    if (!open) onClose()
  }

  useEffect(() => {
    if (!isOpen) {
      setCurrentIndex(0)
      setDirection(1)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") goPrev()
      else if (e.key === "ArrowRight") goNext()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, goPrev, goNext])

  function handlePointerDown(e: React.PointerEvent) {
    startXRef.current = e.clientX
  }

  function handlePointerUp(e: React.PointerEvent) {
    const delta = e.clientX - startXRef.current
    if (Math.abs(delta) < 50) return
    if (delta < 0) goNext()
    else goPrev()
  }

  if (images.length === 0) return null

  const currentImage = images[currentIndex]

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden select-none">
        <DialogTitle className="sr-only">{title} — Captures de démonstration</DialogTitle>

        <div
          className="relative aspect-video w-full overflow-hidden bg-black touch-none"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={currentImage.src}
                alt={currentImage.alt ?? `${title} — capture ${currentIndex + 1}`}
                fill
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>

          {hasMultiple && (
            <>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Image précédente"
                onClick={goPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white h-10 w-10 rounded-full"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Image suivante"
                onClick={goNext}
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
