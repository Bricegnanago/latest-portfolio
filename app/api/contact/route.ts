import { NextResponse } from "next/server"
import { Resend } from "resend"
import { contactFormSchema } from "@/lib/validations"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = contactFormSchema.safeParse(body)

    if (!parsed.success) {
      const errors = parsed.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }))

      return NextResponse.json(
        { success: false, message: "Données invalides.", errors },
        { status: 400 }
      )
    }

    const { name, email, message } = parsed.data

    const resendApiKey = process.env.RESEND_API_KEY
    const contactEmail = process.env.CONTACT_EMAIL

    if (!resendApiKey || !contactEmail) {
      return NextResponse.json(
        { success: false, message: "Configuration email manquante." },
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
      message: "Votre message a été envoyé avec succès.",
    })
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Une erreur est survenue lors de l'envoi. Veuillez réessayer.",
      },
      { status: 500 }
    )
  }
}
