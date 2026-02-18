"use client"

import { motion } from "framer-motion"
import { MapPin, Languages, GraduationCap, Award } from "lucide-react"
import { SectionTitle } from "@/components/shared/SectionTitle"
import { personalInfo } from "@/data/personal"

interface InfoItemProps {
  icon: React.ReactNode
  label: string
  value: string
}

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-primary">{icon}</div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-sm">{value}</p>
      </div>
    </div>
  )
}

export function AboutSection() {
  return (
    <section id="a-propos" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle
          title="À propos"
          subtitle="En savoir plus sur mon parcours et ma personnalité"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2"
        >
          <div>
            <p className="leading-relaxed text-muted-foreground">
              {personalInfo.bio}
            </p>
          </div>

          <div className="space-y-4">
            <InfoItem
              icon={<MapPin size={18} />}
              label="Localisation"
              value={personalInfo.location}
            />
            <InfoItem
              icon={<Languages size={18} />}
              label="Langues"
              value={personalInfo.languages.join(", ")}
            />
            <InfoItem
              icon={<GraduationCap size={18} />}
              label="Formation"
              value={personalInfo.education}
            />
            {personalInfo.certifications.length > 0 && (
              <InfoItem
                icon={<Award size={18} />}
                label="Certifications"
                value={personalInfo.certifications.join(", ")}
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
