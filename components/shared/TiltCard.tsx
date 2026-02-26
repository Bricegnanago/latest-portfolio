"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { useTilt, type UseTiltOptions } from "@/hooks/useTilt"

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  tiltOptions?: UseTiltOptions
}

export function TiltCard({ children, className, tiltOptions }: TiltCardProps) {
  const { resolvedTheme } = useTheme()

  const themeAwareOptions = useMemo<UseTiltOptions>(() => ({
    ...tiltOptions,
    glareOpacity: resolvedTheme === "dark" ? 0.15 : 0.25,
  }), [tiltOptions, resolvedTheme])

  const { ref, style, glareStyle, onMouseMove, onMouseLeave } = useTilt(themeAwareOptions)

  return (
    <motion.div
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn("relative", className)}
    >
      <motion.div
        style={glareStyle}
        className="pointer-events-none absolute inset-0 z-10 rounded-xl"
      />
      {children}
    </motion.div>
  )
}
