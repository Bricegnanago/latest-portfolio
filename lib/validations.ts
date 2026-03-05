import { z } from "zod"
import type { Locale } from "@/i18n/types"
import { fr } from "@/i18n/translations/fr"
import { en } from "@/i18n/translations/en"

const dictionaries = { fr, en }

export function getContactFormSchema(locale: Locale) {
  const t = dictionaries[locale].validation
  return z.object({
    name: z.string().min(2, t.nameRequired).max(100, t.nameRequired),
    email: z.string().email(t.emailInvalid),
    message: z.string().min(10, t.messageRequired).max(1000, t.messageRequired),
  })
}

export type ContactFormValues = z.infer<ReturnType<typeof getContactFormSchema>>
