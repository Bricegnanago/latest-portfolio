"use client"

import { useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { useTilt, type UseTiltOptions } from "@/hooks/useTilt"

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  tiltOptions?: UseTiltOptions
  disabled?: boolean
}

export function TiltCard({ children, className, tiltOptions, disabled }: TiltCardProps) {
  const { resolvedTheme } = useTheme()

  const themeAwareOptions = useMemo<UseTiltOptions>(() => ({
    ...tiltOptions,
    glareOpacity: resolvedTheme === "dark" ? 0.15 : 0.25,
  }), [tiltOptions, resolvedTheme])

  const { ref, style, glareStyle, onMouseMove, onMouseLeave } = useTilt(themeAwareOptions)

  useEffect(() => {
    if (disabled) {
      onMouseLeave()
    }
  }, [disabled, onMouseLeave])

  return (
    <motion.div
      ref={ref}
      style={style}
      onMouseMove={disabled ? undefined : onMouseMove}
      onMouseLeave={disabled ? undefined : onMouseLeave}
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
