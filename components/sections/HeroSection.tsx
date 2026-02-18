"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { personalInfo } from "@/data/personal"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function HeroSection() {
  return (
    <section
      id="accueil"
      className="relative flex min-h-screen items-center justify-center px-4"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-3xl text-center"
      >
        <motion.p
          variants={itemVariants}
          className="mb-4 text-sm font-medium uppercase tracking-widest text-primary"
        >
          Bienvenue
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
        >
          {personalInfo.name}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-4 text-xl text-primary sm:text-2xl"
        >
          {personalInfo.title}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="mx-auto mt-6 max-w-2xl text-muted-foreground"
        >
          {personalInfo.bio}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Button asChild size="lg">
            <a href="#projets">Voir mes projets</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#contact">Me contacter</a>
          </Button>
        </motion.div>
      </motion.div>

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
