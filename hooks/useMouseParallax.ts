"use client"

import { useEffect, useState } from "react"
import {
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion"

export interface UseMouseParallaxOptions {
  strength?: number
  inverted?: boolean
}

export interface UseMouseParallaxReturn {
  x: MotionValue<number>
  y: MotionValue<number>
}

export function useMouseParallax(
  options: UseMouseParallaxOptions = {}
): UseMouseParallaxReturn {
  const { strength = 1, inverted = true } = options
  const prefersReducedMotion = useReducedMotion()

  const [canHover, setCanHover] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches)
    }
  }, [])

  const isDisabled = prefersReducedMotion || !canHover

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const direction = inverted ? -1 : 1

  const transformedX = useTransform(mouseX, (v) => v * strength * direction)
  const transformedY = useTransform(mouseY, (v) => v * strength * direction)

  const springConfig = { stiffness: 100, damping: 30 }
  const x = useSpring(transformedX, springConfig)
  const y = useSpring(transformedY, springConfig)

  useEffect(() => {
    if (isDisabled) return

    function handleMouseMove(e: MouseEvent) {
      const normalizedX = (e.clientX / window.innerWidth - 0.5)
      const normalizedY = (e.clientY / window.innerHeight - 0.5)
      mouseX.set(normalizedX)
      mouseY.set(normalizedY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isDisabled, mouseX, mouseY])

  return { x, y }
}
