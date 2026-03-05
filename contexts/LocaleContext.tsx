"use client"

import { createContext, useContext, useState, useEffect, useMemo } from "react"
import type { Locale, TranslationDictionary } from "@/i18n/types"
import { DEFAULT_LOCALE } from "@/i18n/types"
import { fr } from "@/i18n/translations/fr"
import { en } from "@/i18n/translations/en"

const dictionaries: Record<Locale, TranslationDictionary> = { fr, en }

interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: TranslationDictionary
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined)

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)

  useEffect(() => {
    const stored = localStorage.getItem("locale") as Locale | null
    if (stored && (stored === "fr" || stored === "en")) {
      setLocaleState(stored)
    } else if (navigator.language.startsWith("en")) {
      setLocaleState("en")
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
    const t = dictionaries[locale]
    document.title = t.metadata.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t.metadata.description)
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", t.metadata.title)
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", t.metadata.description)
    document
      .querySelector('meta[property="og:locale"]')
      ?.setAttribute("content", t.metadata.ogLocale)
  }, [locale])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem("locale", newLocale)
  }

  const value = useMemo(
    () => ({ locale, setLocale, t: dictionaries[locale] }),
    [locale]
  )

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) throw new Error("useLocale must be used within LocaleProvider")
  return context
}
