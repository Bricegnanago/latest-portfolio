"use client"

import { useEffect, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import { useTheme } from "next-themes"
import { useReducedMotion } from "framer-motion"
import type { Engine, ISourceOptions } from "@tsparticles/engine"

export function ParticlesBackground() {
  const [engineReady, setEngineReady] = useState(false)
  const [canHover, setCanHover] = useState(false)
  const { resolvedTheme } = useTheme()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches)
  }, [])

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine)
    }).then(() => setEngineReady(true))
  }, [])

  if (!engineReady || !canHover || reducedMotion) return null

  const color = resolvedTheme === "dark" ? "#8875e8" : "#6655cc"

  const options: ISourceOptions = {
    background: { color: { value: "transparent" } },
    particles: {
      color: { value: color },
      links: {
        enable: true,
        color,
        distance: 130,
        opacity: 0.3,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.6,
        direction: "none",
        random: true,
        outModes: { default: "bounce" },
      },
      number: { value: 45, density: { enable: true } },
      opacity: { value: { min: 0.2, max: 0.5 } },
      size: { value: { min: 1, max: 2.5 } },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        resize: { enable: true },
      },
      modes: { repulse: { distance: 100, duration: 0.4 } },
    },
    detectRetina: false,
    fpsLimit: 60,
  }

  return (
    <Particles
      id="hero-particles"
      className="pointer-events-none absolute inset-0 -z-10"
      options={options}
    />
  )
}
