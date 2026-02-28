"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Briefcase, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Experience } from "@/types"

interface ExperienceCardProps {
  experience: Experience
  index: number
  total: number
}

export function ExperienceCard({ experience, index, total: _total }: ExperienceCardProps) {
  const reducedMotion = useReducedMotion()
  const isLeft = index % 2 === 0

  return (
    <div
      className={cn(
        "relative flex items-start",
        // Mobile: all cards sit to the right of the left-edge axis
        "pl-10",
        // Desktop: alternate left / right of the centered axis
        isLeft
          ? "md:flex-row-reverse md:pl-0 md:pr-[calc(50%+1.5rem)]"
          : "md:pl-[calc(50%+1.5rem)]"
      )}
    >
      {/* Node on the axis */}
      <div className="absolute left-4 top-6 z-10 -translate-x-1/2 md:left-1/2">
        <div className="relative flex h-6 w-6 items-center justify-center">
          {/* Pulsing outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/30"
            animate={
              reducedMotion
                ? {}
                : { scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.3,
            }}
          />
          {/* Solid inner core */}
          <div className="relative z-10 h-3 w-3 rounded-full bg-primary glow-primary-sm" />
        </div>
      </div>

      {/* Content card */}
      <motion.div
        className="w-full"
        initial={
          reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -40 : 40 }
        }
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.15 }}
      >
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-1">
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
    </div>
  )
}
