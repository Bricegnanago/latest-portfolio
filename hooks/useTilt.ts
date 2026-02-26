"use client"

import { useRef, useCallback, useState, useEffect } from "react"
import {
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionStyle,
} from "framer-motion"

export interface UseTiltOptions {
  maxTilt?: number
  perspective?: number
  scale?: number
  speed?: number
  glare?: boolean
  glareOpacity?: number
}

export interface UseTiltReturn {
  ref: React.RefObject<HTMLDivElement | null>
  style: MotionStyle
  glareStyle: MotionStyle
  onMouseMove: (e: React.MouseEvent) => void
  onMouseLeave: () => void
}

const DEFAULT_OPTIONS: Required<UseTiltOptions> = {
  maxTilt: 12,
  perspective: 800,
  scale: 1.02,
  speed: 400,
  glare: true,
  glareOpacity: 0.15,
}

export function useTilt(options: UseTiltOptions = {}): UseTiltReturn {
  const opts = { ...DEFAULT_OPTIONS, ...options }
  const ref = useRef<HTMLDivElement | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const [canHover, setCanHover] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches)
    }
  }, [])

  const isDisabled = prefersReducedMotion || !canHover

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const scaleVal = useMotionValue(1)

  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)
  const glareOpacity = useMotionValue(0)

  const springConfig = { stiffness: opts.speed, damping: 30 }

  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)
  const springScale = useSpring(scaleVal, springConfig)

  const glareSpringConfig = { stiffness: 300, damping: 30 }
  const springGlareOpacity = useSpring(glareOpacity, glareSpringConfig)

  const background = useTransform(
    [glareX, glareY],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,${opts.glareOpacity}), transparent 60%)`
  )

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDisabled || !ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const mouseX = e.clientX - centerX
      const mouseY = e.clientY - centerY

      const normalizedX = mouseX / (rect.width / 2)
      const normalizedY = mouseY / (rect.height / 2)

      rotateX.set(-normalizedY * opts.maxTilt)
      rotateY.set(normalizedX * opts.maxTilt)
      scaleVal.set(opts.scale)

      if (opts.glare) {
        const percentX = ((e.clientX - rect.left) / rect.width) * 100
        const percentY = ((e.clientY - rect.top) / rect.height) * 100
        glareX.set(percentX)
        glareY.set(percentY)
        glareOpacity.set(1)
      }
    },
    [isDisabled, opts.maxTilt, opts.scale, opts.glare, rotateX, rotateY, scaleVal, glareX, glareY, glareOpacity]
  )

  const onMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
    scaleVal.set(1)
    glareOpacity.set(0)
  }, [rotateX, rotateY, scaleVal, glareOpacity])

  const style: MotionStyle = isDisabled
    ? {}
    : {
        perspective: opts.perspective,
        rotateX: springRotateX,
        rotateY: springRotateY,
        scale: springScale,
        transformStyle: "preserve-3d" as const,
      }

  const glareStyle: MotionStyle =
    isDisabled || !opts.glare
      ? { display: "none" as const }
      : {
          background,
          opacity: springGlareOpacity,
        }

  return { ref, style, glareStyle, onMouseMove, onMouseLeave }
}
