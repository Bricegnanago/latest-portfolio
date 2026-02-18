import { z } from "zod"

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom est requis (2 à 100 caractères)")
    .max(100, "Le nom est requis (2 à 100 caractères)"),
  email: z
    .string()
    .email("Veuillez entrer une adresse email valide"),
  message: z
    .string()
    .min(10, "Le message est requis (10 à 1000 caractères)")
    .max(1000, "Le message est requis (10 à 1000 caractères)"),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>
