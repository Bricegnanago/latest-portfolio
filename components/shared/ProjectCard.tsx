"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Project } from "@/types"

interface ProjectCardProps {
  project: Project
  index: number
}

function isPlaceholder(url?: string): boolean {
  return !url || url === "[À COMPLÉTER]"
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <Card className="flex h-full flex-col">
        <CardHeader>
          <CardTitle className="text-xl">{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col justify-between gap-4">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
            {project.metrics.length > 0 && (
              <ul className="space-y-1">
                {project.metrics.map((metric) => (
                  <li key={metric} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {metric}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex gap-2 pt-2">
            {!isPlaceholder(project.demoUrl) ? (
              <Button variant="outline" size="sm" asChild>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-1 h-4 w-4" />
                  Démo
                </a>
              </Button>
            ) : (
              <Button variant="outline" size="sm" disabled>
                <ExternalLink className="mr-1 h-4 w-4" />
                Démo à venir
              </Button>
            )}
            {!isPlaceholder(project.sourceUrl) ? (
              <Button variant="outline" size="sm" asChild>
                <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-1 h-4 w-4" />
                  Code
                </a>
              </Button>
            ) : (
              <Button variant="outline" size="sm" disabled>
                <Github className="mr-1 h-4 w-4" />
                Code à venir
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
