"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github, Images, Play } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { VideoModal } from "@/components/shared/VideoModal"
import { ImageGalleryModal } from "@/components/shared/ImageGalleryModal"
import { TiltCard } from "@/components/shared/TiltCard"
import { useLocale } from "@/contexts/LocaleContext"
import { Project } from "@/types"

interface ProjectCardProps {
  project: Project
  index: number
}

function isPlaceholder(url?: string): boolean {
  return !url || url === "[À COMPLÉTER]"
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const { t } = useLocale()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="h-full"
    >
      <TiltCard className="h-full" disabled={isVideoOpen || isGalleryOpen}>
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
          <div className="flex flex-wrap gap-2 pt-2">
            {project.images && project.images.length > 0 && (
              <>
                <Button variant="outline" size="sm" onClick={() => setIsGalleryOpen(true)}>
                  <Images className="mr-1 h-4 w-4" />
                  {t.projects.screenshots}
                </Button>
                <ImageGalleryModal
                  images={project.images}
                  title={project.title}
                  isOpen={isGalleryOpen}
                  onClose={() => setIsGalleryOpen(false)}
                />
              </>
            )}
            {project.videoUrl ? (
              <>
                <Button variant="outline" size="sm" onClick={() => setIsVideoOpen(true)}>
                  <Play className="mr-1 h-4 w-4" />
                  {t.projects.viewDemo}
                </Button>
                <VideoModal
                  videoUrl={project.videoUrl}
                  title={project.title}
                  isOpen={isVideoOpen}
                  onClose={() => setIsVideoOpen(false)}
                />
              </>
            ) : !isPlaceholder(project.demoUrl) ? (
              <Button variant="outline" size="sm" asChild>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-1 h-4 w-4" />
                  {t.projects.demo}
                </a>
              </Button>
            ) : (
              <Button variant="outline" size="sm" disabled>
                <ExternalLink className="mr-1 h-4 w-4" />
                {t.projects.demoComing}
              </Button>
            )}
            {!isPlaceholder(project.sourceUrl) ? (
              <Button variant="outline" size="sm" asChild>
                <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-1 h-4 w-4" />
                  {t.projects.code}
                </a>
              </Button>
            ) : (
              <Button variant="outline" size="sm" disabled>
                <Github className="mr-1 h-4 w-4" />
                {t.projects.codeComing}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      </TiltCard>
    </motion.div>
  )
}
