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
  metadataBase: new URL("https://bricegnanago.dev"),
  title: "Brice GNANAGO — Ingénieur Logiciel Full-Stack",
  description:
    "Portfolio de Brice GNANAGO, ingénieur full-stack spécialisé React, Node.js, AWS et DevOps. Basé à Abidjan, Côte d'Ivoire.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Brice GNANAGO — Ingénieur Logiciel Full-Stack",
    description:
      "Portfolio de Brice GNANAGO, ingénieur full-stack spécialisé React, Node.js, AWS et DevOps.",
    url: "https://bricegnanago.dev",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brice GNANAGO — Ingénieur Logiciel Full-Stack",
    description:
      "Portfolio de Brice GNANAGO, ingénieur full-stack spécialisé React, Node.js, AWS et DevOps.",
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
        suppressHydrationWarning
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
