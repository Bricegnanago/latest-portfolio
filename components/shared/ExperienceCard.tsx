"use client"

import { motion } from "framer-motion"
import { Briefcase, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Experience } from "@/types"

interface ExperienceCardProps {
  experience: Experience
  index: number
}

export function ExperienceCard({ experience, index }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <Card className="relative border-l-4 border-l-primary">
        <CardHeader>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-lg">{experience.position}</CardTitle>
            <span className="text-sm text-muted-foreground">
              {experience.startDate} — {experience.endDate}
            </span>
          </div>
          <CardDescription className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            {experience.company}
            {experience.location && (
              <>
                <span className="text-muted-foreground">·</span>
                <MapPin className="h-4 w-4" />
                {experience.location}
              </>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-3 text-muted-foreground">{experience.description}</p>
          <ul className="space-y-2">
            {experience.responsibilities.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  )
}
