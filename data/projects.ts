import { Project } from "@/types"

export const projects: Project[] = [
  {
    title: "Ticket System",
    description:
      "Système de billetterie en ligne permettant la création, la gestion et le suivi des tickets de support. Interface intuitive avec tableau de bord temps réel et notifications automatiques.",
    technologies: ["React", "Node.js", "PostgreSQL", "Docker", "REST API"],
    metrics: [
      "Réduction de 40% du temps de traitement des tickets",
      "Interface utilisée par plus de 50 agents",
      "Disponibilité de 99.5%",
    ],
    demoUrl: "[À COMPLÉTER]",
    sourceUrl: "[À COMPLÉTER]",
  },
  {
    title: "QR Order System",
    description:
      "Système de commande par QR code pour la restauration. Les clients scannent un QR code à leur table pour consulter le menu, passer commande et payer directement depuis leur téléphone.",
    technologies: ["Next.js", "TypeScript", "Spring Boot", "MySQL", "AWS"],
    metrics: [
      "Temps de commande réduit de 60%",
      "Intégration paiement mobile",
      "Support multi-restaurant",
    ],
    demoUrl: "[À COMPLÉTER]",
    sourceUrl: "[À COMPLÉTER]",
  },
  {
    title: "ZoomStudent",
    description:
      "Plateforme éducative facilitant la mise en relation entre étudiants et tuteurs. Fonctionnalités de recherche avancée, planification de sessions et suivi de progression.",
    technologies: ["Angular", "Spring Boot", "PostgreSQL", "Docker", "CI/CD"],
    metrics: [
      "Plus de 200 utilisateurs actifs",
      "Système de matching intelligent",
      "Tableau de bord de progression",
    ],
    demoUrl: "[À COMPLÉTER]",
    sourceUrl: "[À COMPLÉTER]",
  },
]
