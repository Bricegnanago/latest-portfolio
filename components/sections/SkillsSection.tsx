"use client"

import { motion } from "framer-motion"
import {
  Code2,
  Layout,
  Server,
  Cloud,
  Database,
  Wrench,
} from "lucide-react"
import { SectionTitle } from "@/components/shared/SectionTitle"
import { SkillBadge } from "@/components/shared/SkillBadge"
import { skillCategories } from "@/data/skills"
import { SkillCategory } from "@/types"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2,
  Layout,
  Server,
  Cloud,
  Database,
  Wrench,
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

function CategoryCard({ category }: { category: SkillCategory }) {
  const Icon = iconMap[category.icon]

  return (
    <motion.div
      variants={item}
      className="rounded-xl border bg-card p-6"
    >
      <div className="mb-4 flex items-center gap-3">
        {Icon && <Icon className="h-5 w-5 text-primary" />}
        <h3 className="font-semibold">{category.name}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <SkillBadge key={skill.name} skill={skill} />
        ))}
      </div>
    </motion.div>
  )
}

export function SkillsSection() {
  return (
    <section id="competences" className="py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionTitle
          title="Compétences"
          subtitle="Technologies et outils que je maîtrise"
        />
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillCategories.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
