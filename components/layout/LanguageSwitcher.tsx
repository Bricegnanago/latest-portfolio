"use client"

import { useLocale } from "@/contexts/LocaleContext"
import { Languages } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()
  const nextLocale = locale === "fr" ? "en" : "fr"

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setLocale(nextLocale)}
      className="relative"
      aria-label={`Switch to ${nextLocale === "en" ? "English" : "Français"}`}
    >
      <Languages className="h-5 w-5" />
      <span className="absolute -right-1 -top-1 text-[10px] font-bold uppercase leading-none">
        {nextLocale}
      </span>
    </Button>
  )
}
