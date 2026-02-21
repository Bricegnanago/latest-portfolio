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
