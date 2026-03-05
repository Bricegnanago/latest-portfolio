import { NextResponse } from "next/server"
import { Resend } from "resend"
import { getContactFormSchema } from "@/lib/validations"
import type { Locale } from "@/i18n/types"

const apiMessages = {
  fr: {
    invalidData: "Données invalides.",
    configError: "Configuration email manquante.",
    success: "Votre message a été envoyé avec succès.",
    error: "Une erreur est survenue lors de l'envoi. Veuillez réessayer.",
    emailSubject: "Portfolio — Nouveau message de",
  },
  en: {
    invalidData: "Invalid data.",
    configError: "Email configuration missing.",
    success: "Your message has been sent successfully.",
    error: "An error occurred while sending. Please try again.",
    emailSubject: "Portfolio — New message from",
  },
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const locale: Locale =
      body.locale === "en" ? "en" : "fr"
    const messages = apiMessages[locale]

    const contactFormSchema = getContactFormSchema(locale)
    const parsed = contactFormSchema.safeParse(body)

    if (!parsed.success) {
      const errors = parsed.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }))

      return NextResponse.json(
        { success: false, message: messages.invalidData, errors },
        { status: 400 }
      )
    }

    const { name, email, message } = parsed.data

    const resendApiKey = process.env.RESEND_API_KEY
    const contactEmail = process.env.CONTACT_EMAIL

    if (!resendApiKey || !contactEmail) {
      return NextResponse.json(
        { success: false, message: messages.configError },
        { status: 500 }
      )
    }

    const resend = new Resend(resendApiKey)

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: contactEmail,
      subject: `Portfolio — Nouveau message de ${name}`,
      text: `Nom : ${name}\nEmail : ${email}\n\nMessage :\n${message}`,
    })

    return NextResponse.json({
      success: true,
      message: messages.success,
    })
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: apiMessages.fr.error,
      },
      { status: 500 }
    )
  }
}
