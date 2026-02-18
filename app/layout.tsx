import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/sonner"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import "./globals.css"

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
})

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://brice-gnanago.vercel.app"),
  title: "Brice GNANAGO — Ingénieur Logiciel Full-Stack",
  description:
    "Portfolio de Brice GNANAGO, ingénieur full-stack spécialisé React, Node.js, AWS et DevOps. Basé à Abidjan, Côte d'Ivoire.",
  openGraph: {
    title: "Brice GNANAGO — Ingénieur Logiciel Full-Stack",
    description:
      "Portfolio de Brice GNANAGO, ingénieur full-stack spécialisé React, Node.js, AWS et DevOps.",
    images: ["/og-image.png"],
    type: "website",
    locale: "fr_FR",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
