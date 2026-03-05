"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, Phone, Send, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { SectionTitle } from "@/components/shared/SectionTitle"
import { useLocale } from "@/contexts/LocaleContext"
import { getLocalizedData } from "@/data"
import { getContactFormSchema, ContactFormValues } from "@/lib/validations"

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { locale, t } = useLocale()
  const { personalInfo } = getLocalizedData(locale)
  const contactFormSchema = getContactFormSchema(locale)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  })

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      })

      const result = await response.json()

      if (result.success) {
        toast.success(result.message)
        reset()
      } else {
        toast.error(result.message)
      }
    } catch {
      toast.error(t.api.error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionTitle
          title={t.contact.title}
          subtitle={t.contact.subtitle}
        />

        <div className="grid gap-12 md:grid-cols-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t.contact.name}</Label>
              <Input
                id="name"
                placeholder={t.contact.namePlaceholder}
                {...register("name")}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t.contact.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t.contact.emailPlaceholder}
                {...register("email")}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">{t.contact.message}</Label>
              <Textarea
                id="message"
                placeholder={t.contact.messagePlaceholder}
                rows={5}
                {...register("message")}
                aria-invalid={!!errors.message}
              />
              {errors.message && (
                <p className="text-sm text-destructive">{errors.message.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              {isSubmitting ? t.contact.sending : t.contact.send}
            </Button>
          </form>

          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold">{t.contact.directContact}</h3>
              <div className="space-y-3">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="h-5 w-5 text-primary" />
                  {personalInfo.email}
                </a>
                <a
                  href={`tel:${personalInfo.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Phone className="h-5 w-5 text-primary" />
                  {personalInfo.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
