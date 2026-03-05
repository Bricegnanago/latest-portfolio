"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useScrollSpy } from "@/hooks/useScrollSpy"
import { useLocale } from "@/contexts/LocaleContext"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { labelKey: "home", href: "#accueil", sectionId: "accueil" },
  { labelKey: "about", href: "#a-propos", sectionId: "a-propos" },
  { labelKey: "skills", href: "#competences", sectionId: "competences" },
  { labelKey: "experiences", href: "#experiences", sectionId: "experiences" },
  { labelKey: "projects", href: "#projets", sectionId: "projets" },
  { labelKey: "contact", href: "#contact", sectionId: "contact" },
] as const

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const activeSection = useScrollSpy()
  const { t } = useLocale()

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
          aria-label={t.nav.backToHome}
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
                  {t.nav[link.labelKey]}
                </a>
              </li>
            ))}
          </ul>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
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
                  {t.nav[link.labelKey]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
