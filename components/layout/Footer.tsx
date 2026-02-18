import { Github, Linkedin, Mail } from "lucide-react"
import { personalInfo } from "@/data/personal"

const ICON_MAP: Record<string, React.ReactNode> = {
  Github: <Github size={20} />,
  Linkedin: <Linkedin size={20} />,
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 sm:flex-row sm:justify-between sm:px-6">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} {personalInfo.name}. Tous droits réservés.
        </p>

        <div className="flex items-center gap-4">
          <a
            href={`mailto:${personalInfo.email}`}
            aria-label="Envoyer un email"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Mail size={20} />
          </a>
          {personalInfo.socials.map((social) => {
            const isPlaceholder = social.url.includes("À COMPLÉTER")
            return (
              <a
                key={social.name}
                href={isPlaceholder ? "#" : social.url}
                target={isPlaceholder ? undefined : "_blank"}
                rel={isPlaceholder ? undefined : "noopener noreferrer"}
                aria-label={social.name}
                className="text-muted-foreground transition-colors hover:text-primary"
                title={isPlaceholder ? `${social.name} — lien à venir` : social.name}
              >
                {ICON_MAP[social.icon] ?? <Github size={20} />}
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
