"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useScrollSpy } from "@/hooks/useScrollSpy"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { cn } from "@/lib/utils"

interface NavLink {
  label: string
  href: string
  sectionId: string
}

const NAV_LINKS: NavLink[] = [
  { label: "Accueil", href: "#accueil", sectionId: "accueil" },
  { label: "À propos", href: "#a-propos", sectionId: "a-propos" },
  { label: "Compétences", href: "#competences", sectionId: "competences" },
  { label: "Expériences", href: "#experiences", sectionId: "experiences" },
  { label: "Projets", href: "#projets", sectionId: "projets" },
  { label: "Contact", href: "#contact", sectionId: "contact" },
]

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const activeSection = useScrollSpy()

  const handleClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md"
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="#accueil"
          className="text-xl font-bold text-primary"
          aria-label="Retour à l'accueil"
        >
          BG
        </a>

        <div className="hidden items-center gap-1 md:flex">
          <ul className="flex items-center gap-1" role="menubar">
            {NAV_LINKS.map((link) => (
              <li key={link.sectionId} role="none">
                <a
                  href={link.href}
                  role="menuitem"
                  onClick={handleClick}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                    activeSection === link.sectionId
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-b border-border/40 bg-background md:hidden">
          <ul className="space-y-1 px-4 py-4" role="menu">
            {NAV_LINKS.map((link) => (
              <li key={link.sectionId} role="none">
                <a
                  href={link.href}
                  role="menuitem"
                  onClick={handleClick}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                    activeSection === link.sectionId
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
