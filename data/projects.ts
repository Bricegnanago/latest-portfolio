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
    videoUrl: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/demo_monbolide.mp4",
    images: [
      { src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/monbolide-demo/banner.png", alt: "Interface client — menu consulté via QR code" },
      { src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/monbolide-demo/win_money.png", alt: "Interface client — passage de commande" },
      { src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/monbolide-demo/last_car_added.png", alt: "Interface client — passage de commande" },
      { src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/monbolide-demo/list_car.png", alt: "Interface client — passage de commande" },
      { src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/monbolide-demo/vue_map.png", alt: "Interface client — passage de commande" },
      { src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/monbolide-demo/valide_location.png", alt: "Interface client — passage de commande" },
      { src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/monbolide-demo/screencapture-monbolide-booking-request-2026-02-27-11_22_37.png", alt: "Interface client — passage de commande" },
      { src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/monbolide-demo/chat.png", alt: "Chat entre le proprietaire et le client" },
      { src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/monbolide-demo/boost_modal_paiement.png", alt: "Interface client — passage de commande" },
      { src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/monbolide-demo/boost_modal_paiement2.png", alt: "Interface client — passage de commande" },
      { src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/monbolide-demo/boost_choose_method_payment.png", alt: "Interface client — passage de commande" },
      { src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/monbolide-demo/wallet_paiement.png", alt: "Interface client — passage de commande" },
      { src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/monbolide-demo/payment_mobilie_money.png", alt: "Interface client — passage de commande" },
      { src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/monbolide-demo/card_payment_boost.png", alt: "Interface client — passage de commande" },
      { src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/monbolide-demo/portefeuille_view.png", alt: "Interface client — passage de commande" },
    ],
  },
  {
    title: "Event Ticketing System with QR Code Validation",
    description:
      "Système de billetterie événementielle automatisé développé avec Google Forms, Google Sheets et Google Apps Script. Les utilisateurs réservent via un formulaire, reçoivent automatiquement un ticket PDF avec QR Code unique par email, et les tickets sont vérifiés en temps réel le jour de l’événement avec mise à jour automatique du statut.",

    technologies: [
      "Google Apps Script",
      "Google Forms",
      "Google Sheets",
      "HTML/CSS",
      "QR Code API",
      "PDF Generation"
    ],

    metrics: [
      "Automatisation complète du processus de réservation et d’envoi des tickets",
      "Génération et validation en temps réel des QR Codes",
      "Mise à jour automatique du statut des tickets après scan",
      "Solution 100% serverless sans infrastructure externe"
    ],

    demoUrl: "/images/event_project.mp4",

    sourceUrl: "[À COMPLÉTER - GitHub ou description technique]",

    images: [
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/EventTicketingQRCodeValidation/1-screencapture-docs-google-forms-d-17sPiab4FQNrTIWXzXEggG1g-zxPhMVI7aKFr1MiTtoQ-edit-2026-03-03-17_54_05.png",
        alt: "Formulaire Google de réservation"
      },
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/EventTicketingQRCodeValidation/2-screencapture-docs-google-spreadsheets-d-1YPAH7i1j695IqaRn9ylgnda0L22L-lR9pn3D40SVA0E-edit-2026-03-03-17_55_55.png",
        alt: "Google Sheet servant de base de données et suivi des statuts"
      },
      {

        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/EventTicketingQRCodeValidation/3-AppScript.png",
        alt: "Script d'edition du ticket de toute la logique métier"
      },
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/EventTicketingQRCodeValidation/4-email_recu_rdv.png",
        alt: "L'email de reception du ticket de l'utilisateur"
      },
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/EventTicketingQRCodeValidation/5-ticket_rvd.png",
        alt: "Ticket de l'évènment généré"
      },
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/EventTicketingQRCodeValidation/6-ticket_already_used.jpeg",
        alt: "Interface de validation du QR Code le jour de l’événement"
      }
    ],
  },

  {
    title: "QR Order System",
    description:
      "Système de commande par QR code pour la restauration. Les clients scannent un QR code à leur table pour consulter le menu, passer commande et payer directement depuis leur téléphone.",
    technologies: ["Next.js", "TypeScript", "Nodejs/Express", "MongoDB", "AWS"],
    metrics: [
      "Temps de commande réduit de 60%",
      "Développement de composants React dynamiques avec gestion avancée du stock et des promotions",
      "Calcul intelligent des prix (remises, bundles, économies affichées)",
      "Contrôle des quantités basé sur la disponibilité réelle du stock",
      "Système de parametrage des utilisateurs (Serveur, Barman, Administrateur)",
      "Interface d’administration complète avec tableau de gestion et statistiques en temps réel",
      "Implémentation d’une API sécurisée (Axios + authentification admin) avec CRUD complet",

    ],
    demoUrl: "https://qr-order-system-one.vercel.app",
    sourceUrl: "https://qr-order-system-one.vercel.app",
    videoUrl: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/demo_event_qr/event_project.mp4",
    images: [
      { src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/demo_event_qr/screencapture-qr-order-system-one-vercel-app-order-2026-03-01-00_27_06.png", alt: "Liste des boissons" },
      { src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/demo_event_qr/screencapture-qr-order-system-one-vercel-app-tracking.png", alt: "Dashboard restaurant — suivi des commandes" },
      { src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/demo_event_qr/qr-order-system-one-vercel-app-login.png", alt: "Dashboard restaurant — Espace de connexion admin" },
      { src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/demo_event_qr/qr-order-system-one-vercel-app-list_des_commandes-4.png", alt: "Dashboard restaurant — List de commandes" },
      { src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/demo_event_qr/qr-order-system-one-vercel-app-gestion_des_evenements-5.png", alt: "Dashboard restaurant — Gestion des commandes" },
      { src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/demo_event_qr/qr-order-system-one-vercel-app-details_evenement-6.png", alt: "Dashboard restaurant — Espace de connexion admin" },
      { src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/demo_event_qr/qr-order-system-one-vercel-app-new-event-7.png", alt: "Dashboard restaurant — Espace de connexion admin" },
      { src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/demo_event_qr/qr-order-system-one-vercel-app-admin-analytics-8.png", alt: "Dashboard restaurant — Espace de connexion admin" },
      { src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/demo_event_qr/qr-order-system-one-vercel-app-admin-drinks-9.png", alt: "Dashboard restaurant — Espace de connexion admin" },
      { src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/demo_event_qr/order-system-one-vercel-app-admin-manage-stock-10.png", alt: "Dashboard restaurant — Espace de connexion admin" },
      { src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/demo_event_qr/qr-order-system-one-vercel-app-admin-update-drink-11.png", alt: "Dashboard restaurant — Espace de connexion admin" },
      { src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/demo_event_qr/qr-order-system-one-vercel-app-admin-add-drink-12.png", alt: "Dashboard restaurant — Espace de connexion admin" },
      { src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/demo_event_qr/qr-order-system-one-vercel-app-admin-historique-drink-13.png", alt: "Dashboard restaurant — Espace de connexion admin" },
    ],
  },
  {
    title: "ZoomStudent",
    description:
      "Plateforme éducative facilitant la mise en relation entre étudiants et tuteurs. Fonctionnalités de recherche avancée, planification de sessions et suivi de progression.",
    technologies: ["Vue.js", "Next.js", "Django Rest Framework", "PostgreSQL", "Docker", "CI/CD", "Redis", "Socket.io"],
    metrics: [
      "Gestion des cours & emploi du temps",
      "Gestion des établissements scolaires",
      "Gestion des utilisateurs & Roles",
      "Parametrage de l'ecole",
      "Gestion de l'emploi du temps",
      "Gestion des examens",
      "Notes & Evaluations",
      "Presences et absences",
      "Communication & messagie",
      "Ressources pedagogiques",
      "Espace Etudiants",
      "Espace Parents",
      "Securite & conformite",
      "Tache asynchrones & automatisation"

    ],
    demoUrl: "[À COMPLÉTER]",
    sourceUrl: "[À COMPLÉTER]",
    images: [
      // { src: "/images/zoomstudent-recherche.png", alt: "Recherche de tuteurs — filtres avancés" },
      // { src: "/images/zoomstudent-session.png", alt: "Planification d'une session de tutorat" },
      // { src: "/images/zoomstudent-progression.png", alt: "Tableau de bord — suivi de progression" },
    ],
  }
  
]
