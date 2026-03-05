"use client"

import { SectionTitle } from "@/components/shared/SectionTitle"
import { ProjectCard } from "@/components/shared/ProjectCard"
import { useLocale } from "@/contexts/LocaleContext"
import { getLocalizedData } from "@/data"

export function ProjectsSection() {
  const { locale, t } = useLocale()
  const { projects } = getLocalizedData(locale)

  return (
    <section id="projets" className="py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionTitle
          title={t.projects.title}
          subtitle={t.projects.subtitle}
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
