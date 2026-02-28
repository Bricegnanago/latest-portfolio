"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { personalInfo } from "@/data/personal"
import { useMouseParallax } from "@/hooks/useMouseParallax"

export function HeroSection() {
  const reducedMotion = useReducedMotion()
  const avatarParallax = useMouseParallax({ strength: 12, inverted: false })

  const nameChars = personalInfo.name.split("")
  const bioWords = personalInfo.bio.split(" ")

  return (
    <section
      id="accueil"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 sm:px-6"
    >
      {/* Background blobs */}
      <div
        aria-hidden
        className="hero-bg-blob pointer-events-none absolute -right-16 -top-32 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="hero-bg-blob pointer-events-none absolute -bottom-16 -left-16 -z-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
        style={{ animationDelay: "4s" }}
      />

      {/* Main split layout */}
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-12 md:flex-row md:items-center md:justify-between">
        {/* Left: text block */}
        <div className="flex-1 text-center md:text-left">
          {/* Welcome label */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-4 text-sm font-medium uppercase tracking-widest text-primary"
          >
            Bienvenue
          </motion.p>

          {/* Name — letter-by-letter spring */}
          <motion.h1
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            whileHover={
              reducedMotion
                ? undefined
                : {
                    filter:
                      "drop-shadow(0 0 10px color-mix(in oklch, var(--primary) 70%, transparent))",
                  }
            }
            transition={{ duration: 0.3 }}
          >
            {nameChars.map((char, i) => (
              <motion.span
                key={i}
                initial={
                  reducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 20, scale: 0.8 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={
                  reducedMotion
                    ? { duration: 0.4, delay: 0.2 + i * 0.02 }
                    : {
                        type: "spring",
                        stiffness: 300,
                        damping: 24,
                        delay: 0.2 + i * 0.04,
                      }
                }
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Professional title — slide up */}
          <motion.p
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.0 }}
            whileHover={
              reducedMotion
                ? undefined
                : {
                    filter:
                      "drop-shadow(0 0 8px color-mix(in oklch, var(--primary) 60%, transparent))",
                  }
            }
            className="mt-4 cursor-default text-xl text-primary sm:text-2xl"
          >
            {personalInfo.title}
          </motion.p>

          {/* Bio — word stagger */}
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground md:mx-0">
            {bioWords.map((word, i) => (
              <motion.span
                key={i}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 1.4 + i * 0.03,
                  ease: "easeOut",
                }}
                className="inline-block"
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </p>

          {/* CTA buttons — pop */}
          <motion.div
            initial={
              reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }
            }
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 20,
              delay: 1.8,
            }}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:justify-start"
          >
            <motion.div
              whileHover={reducedMotion ? undefined : { scale: 1.04 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Button asChild size="lg">
                <a href="#projets">Voir mes projets</a>
              </Button>
            </motion.div>
            <motion.div
              whileHover={reducedMotion ? undefined : { scale: 1.04 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Button asChild variant="outline" size="lg">
                <a href="#contact">Me contacter</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Right: avatar block */}
        <div className="shrink-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={
              reducedMotion
                ? undefined
                : { x: avatarParallax.x, y: avatarParallax.y }
            }
          >
            <motion.div
              animate={reducedMotion ? {} : { y: [0, -14, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="glow-primary-sm rounded-full ring-2 ring-primary/40">
                <Image
                  src="/images/profile.jpg"
                  alt="Brice GNANAGO"
                  width={320}
                  height={320}
                  priority
                  className="h-56 w-56 rounded-full object-cover md:h-72 md:w-72"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a
          href="#a-propos"
          aria-label="Défiler vers le bas"
          className="text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowDown className="animate-bounce" size={24} />
        </a>
      </motion.div>
    </section>
  )
}
