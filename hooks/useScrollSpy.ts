"use client"

import { useState, useEffect } from "react"

const SECTION_IDS = [
  "accueil",
  "a-propos",
  "competences",
  "experiences",
  "projets",
  "contact",
]

export function useScrollSpy() {
  const [activeSection, setActiveSection] = useState<string>(SECTION_IDS[0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      }
    )

    for (const id of SECTION_IDS) {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    }

    return () => observer.disconnect()
  }, [])

  return activeSection
}
