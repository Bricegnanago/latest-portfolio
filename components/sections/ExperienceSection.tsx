"use client"

import { SectionTitle } from "@/components/shared/SectionTitle"
import { ExperienceCard } from "@/components/shared/ExperienceCard"
import { experiences } from "@/data/experiences"

export function ExperienceSection() {
  return (
    <section id="experiences" className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionTitle
          title="Expériences"
          subtitle="Mon parcours professionnel"
        />
        <div className="space-y-6">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.company}
              experience={experience}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
