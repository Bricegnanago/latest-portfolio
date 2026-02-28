"use client"

import { SectionTitle } from "@/components/shared/SectionTitle"
import { ExperienceCard } from "@/components/shared/ExperienceCard"
import { experiences } from "@/data/experiences"

export function ExperienceSection() {
  return (
    <section id="experiences" className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 md:max-w-5xl">
        <SectionTitle
          title="Expériences"
          subtitle="Mon parcours professionnel"
        />
        <div className="relative">
          {/* Vertical timeline axis */}
          <div className="timeline-axis absolute left-4 top-0 bottom-0 z-0 w-0.5 md:left-1/2 md:-translate-x-1/2" />
          <div className="space-y-12 py-4">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.company}
                experience={experience}
                index={index}
                total={experiences.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
