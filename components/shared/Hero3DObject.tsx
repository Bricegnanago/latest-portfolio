"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useTheme } from "next-themes"
import { useReducedMotion } from "framer-motion"
import type { Group, Mesh } from "three"

interface SceneProps {
  color: string
}

function IcosahedronScene({ color }: SceneProps) {
  const groupRef = useRef<Group>(null)
  const meshRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (!meshRef.current || !groupRef.current) return
    // Continuous auto-rotation on inner mesh
    meshRef.current.rotation.x += delta * 0.3
    meshRef.current.rotation.y += delta * 0.5
    // Mouse tilt on outer group — smooth lerp, max ~20° (0.35 rad)
    groupRef.current.rotation.x +=
      (state.pointer.y * 0.35 - groupRef.current.rotation.x) * 0.05
    groupRef.current.rotation.y +=
      (state.pointer.x * 0.35 - groupRef.current.rotation.y) * 0.05
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color={color}
          opacity={0.35}
          transparent
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>
    </group>
  )
}

export function Hero3DObject() {
  const [canRender, setCanRender] = useState(false)
  const reducedMotion = useReducedMotion()
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const hasWebGL = (() => {
      try {
        const c = document.createElement("canvas")
        return !!(
          window.WebGLRenderingContext &&
          (c.getContext("webgl") || c.getContext("experimental-webgl"))
        )
      } catch {
        return false
      }
    })()
    const isDesktop = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches
    setCanRender(hasWebGL && isDesktop)
  }, [])

  if (!canRender || reducedMotion) return null

  const color = resolvedTheme === "dark" ? "#8875e8" : "#6655cc"

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute right-0 top-0 -z-10 h-[500px] w-[500px]"
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: false, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.2} />
        <IcosahedronScene color={color} />
      </Canvas>
    </div>
  )
}
