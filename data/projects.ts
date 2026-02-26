import { Project } from "@/types"

export const projects: Project[] = [
  {
    title: "Monbolide",
    description:
      "Monbolide est une plateforme innovante de location de véhicules et d’autopartage en Côte d’Ivoire, basée à Abidjan. Elle permet aux particuliers et aux entreprises de réserver en ligne des véhicules standards et haut de gamme (Mercedes GLE, Range Rover, Porsche Cayenne, etc.), avec ou sans chauffeur, disponible 24h/24 et 7j/7.",
    technologies: [
      "React.js",
      "TypeScript",
      "Node.js / Express",
      "MongoDB",
      "Socket.io",
      "Redis"
    ],
    metrics: [
      "Startup composée de 2 à 10 employés, opérant sur l’ensemble du territoire ivoirien",
      "Catalogue de plus de 1 000 véhicules disponibles à la location",
      "Plus de 2 000 utilisateurs actifs sur la plateforme",
      "Intégration de solutions de paiement mobile locales",
      "Vision d’expansion vers l’Afrique de l’Ouest et l’espace francophone"
    ],
    demoUrl: "[À COMPLÉTER]",
    sourceUrl: "https://www.monbolide.com",
    videoUrl: "/images/demo_monbolide.mp4"
  },
 
  {
    title: "QR Order System",
    description:
      "Système de commande par QR code pour la restauration. Les clients scannent un QR code à leur table pour consulter le menu, passer commande et payer directement depuis leur téléphone.",
    technologies: ["Next.js", "TypeScript", "Nodejs/Express", "MongoDB", "AWS"],
    metrics: [
      "Temps de commande réduit de 60%",
      "Intégration paiement mobile",
      "Support multi-restaurant",
    ],
    demoUrl: "https://qr-order-system-one.vercel.app",
    sourceUrl: "https://qr-order-system-one.vercel.app",
    videoUrl: "/images/event_project.mp4",
  },
  {
    title: "ZoomStudent",
    description:
      "Plateforme éducative facilitant la mise en relation entre étudiants et tuteurs. Fonctionnalités de recherche avancée, planification de sessions et suivi de progression.",
    technologies: ["Vue.js", "Next.js", "Django Rest Framework", "PostgreSQL", "Docker", "CI/CD", "Redis", "Socket.io"],
    metrics: [
      "Système de matching intelligent",
      "Tableau de bord de progression",
    ],
    demoUrl: "[À COMPLÉTER]",
    sourceUrl: "[À COMPLÉTER]",
  },
   {
    title: "Ticket System",
    description:
      "Système de billetterie en ligne permettant la création, la gestion et le suivi des tickets de support. Interface intuitive avec tableau de bord temps réel et notifications automatiques.",
    technologies: ["Apps Script", "Google Form", "Google Sheet"],
    metrics: [
      "Réduction de 40% du temps de traitement des tickets",
      "Interface utilisée par plus de 50 agents",
      "Disponibilité de 99.5%",
    ],
    demoUrl: "/images/event_project.mp4",
    sourceUrl: "[À COMPLÉTER]",
  },
]
