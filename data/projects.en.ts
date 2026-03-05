import { Project } from "@/types"

export const projects: Project[] = [
  {
    title: "Monbolide",
    description:
      "Monbolide is an innovative vehicle rental and car-sharing platform in Ivory Coast, based in Abidjan. It allows individuals and businesses to book standard and premium vehicles online (Mercedes GLE, Range Rover, Porsche Cayenne, etc.), with or without a driver, available 24/7.",
    technologies: [
      "React.js",
      "TypeScript",
      "Node.js / Express",
      "MongoDB",
      "Socket.io",
      "Redis",
    ],
    metrics: [
      "Startup of 2 to 10 employees, operating across the entire Ivorian territory",
      "Catalog of over 1,000 vehicles available for rental",
      "Over 2,000 active users on the platform",
      "Integration of local mobile payment solutions",
      "Vision of expansion into West Africa and the French-speaking world",
    ],
    demoUrl: "[À COMPLÉTER]",
    sourceUrl: "https://www.monbolide.com",
    videoUrl:
      "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/demo_monbolide.mp4",
    images: [
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/monbolide-demo/banner.png",
        alt: "Client interface — menu viewed via QR code",
      },
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/monbolide-demo/win_money.png",
        alt: "Client interface — placing an order",
      },
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/monbolide-demo/last_car_added.png",
        alt: "Client interface — latest car added",
      },
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/monbolide-demo/list_car.png",
        alt: "Client interface — vehicle listing",
      },
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/monbolide-demo/vue_map.png",
        alt: "Client interface — map view",
      },
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/monbolide-demo/valide_location.png",
        alt: "Client interface — booking validation",
      },
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/monbolide-demo/screencapture-monbolide-booking-request-2026-02-27-11_22_37.png",
        alt: "Client interface — booking request",
      },
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/monbolide-demo/chat.png",
        alt: "Chat between owner and customer",
      },
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/monbolide-demo/boost_modal_paiement.png",
        alt: "Client interface — boost payment modal",
      },
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/monbolide-demo/boost_modal_paiement2.png",
        alt: "Client interface — boost payment confirmation",
      },
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/monbolide-demo/boost_choose_method_payment.png",
        alt: "Client interface — choose payment method",
      },
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/monbolide-demo/wallet_paiement.png",
        alt: "Client interface — wallet payment",
      },
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/monbolide-demo/payment_mobilie_money.png",
        alt: "Client interface — mobile money payment",
      },
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/monbolide-demo/card_payment_boost.png",
        alt: "Client interface — card payment boost",
      },
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/monbolide-demo/portefeuille_view.png",
        alt: "Client interface — wallet view",
      },
    ],
  },
  {
    title: "Event Ticketing System with QR Code Validation",
    description:
      "Automated event ticketing system built with Google Forms, Google Sheets and Google Apps Script. Users book via a form, automatically receive a PDF ticket with a unique QR Code by email, and tickets are verified in real time on event day with automatic status updates.",
    technologies: [
      "Google Apps Script",
      "Google Forms",
      "Google Sheets",
      "HTML/CSS",
      "QR Code API",
      "PDF Generation",
    ],
    metrics: [
      "Full automation of the booking and ticket sending process",
      "Real-time QR Code generation and validation",
      "Automatic ticket status update after scanning",
      "100% serverless solution with no external infrastructure",
    ],
    demoUrl: "/images/event_project.mp4",
    sourceUrl: "[À COMPLÉTER - GitHub ou description technique]",
    images: [
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/EventTicketingQRCodeValidation/1-screencapture-docs-google-forms-d-17sPiab4FQNrTIWXzXEggG1g-zxPhMVI7aKFr1MiTtoQ-edit-2026-03-03-17_54_05.png",
        alt: "Google Forms booking form",
      },
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/EventTicketingQRCodeValidation/2-screencapture-docs-google-spreadsheets-d-1YPAH7i1j695IqaRn9ylgnda0L22L-lR9pn3D40SVA0E-edit-2026-03-03-17_55_55.png",
        alt: "Google Sheet used as database and status tracking",
      },
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/EventTicketingQRCodeValidation/3-AppScript.png",
        alt: "Ticket editing script and business logic",
      },
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/EventTicketingQRCodeValidation/4-email_recu_rdv.png",
        alt: "User ticket reception email",
      },
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/EventTicketingQRCodeValidation/5-ticket_rvd.png",
        alt: "Generated event ticket",
      },
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/EventTicketingQRCodeValidation/6-ticket_already_used.jpeg",
        alt: "QR Code validation interface on event day",
      },
    ],
  },
  {
    title: "QR Order System",
    description:
      "QR code ordering system for restaurants. Customers scan a QR code at their table to browse the menu, place orders and pay directly from their phone.",
    technologies: ["Next.js", "TypeScript", "Nodejs/Express", "MongoDB", "AWS"],
    metrics: [
      "Order time reduced by 60%",
      "Dynamic React components with advanced stock and promotion management",
      "Smart pricing calculation (discounts, bundles, displayed savings)",
      "Quantity control based on real stock availability",
      "User role management system (Server, Bartender, Administrator)",
      "Complete admin interface with management dashboard and real-time statistics",
      "Secure API implementation (Axios + admin authentication) with full CRUD",
    ],
    demoUrl: "https://qr-order-system-one.vercel.app",
    sourceUrl: "https://qr-order-system-one.vercel.app",
    videoUrl:
      "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/demo_event_qr/event_project.mp4",
    images: [
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/demo_event_qr/screencapture-qr-order-system-one-vercel-app-order-2026-03-01-00_27_06.png",
        alt: "Drink list",
      },
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/demo_event_qr/screencapture-qr-order-system-one-vercel-app-tracking.png",
        alt: "Restaurant dashboard — order tracking",
      },
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/demo_event_qr/qr-order-system-one-vercel-app-login.png",
        alt: "Restaurant dashboard — admin login",
      },
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/demo_event_qr/qr-order-system-one-vercel-app-list_des_commandes-4.png",
        alt: "Restaurant dashboard — order list",
      },
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/demo_event_qr/qr-order-system-one-vercel-app-gestion_des_evenements-5.png",
        alt: "Restaurant dashboard — order management",
      },
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/demo_event_qr/qr-order-system-one-vercel-app-details_evenement-6.png",
        alt: "Restaurant dashboard — event details",
      },
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/demo_event_qr/qr-order-system-one-vercel-app-new-event-7.png",
        alt: "Restaurant dashboard — new event",
      },
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/demo_event_qr/qr-order-system-one-vercel-app-admin-analytics-8.png",
        alt: "Restaurant dashboard — analytics",
      },
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/demo_event_qr/qr-order-system-one-vercel-app-admin-drinks-9.png",
        alt: "Restaurant dashboard — drink management",
      },
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/demo_event_qr/order-system-one-vercel-app-admin-manage-stock-10.png",
        alt: "Restaurant dashboard — stock management",
      },
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/demo_event_qr/qr-order-system-one-vercel-app-admin-update-drink-11.png",
        alt: "Restaurant dashboard — update drink",
      },
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/demo_event_qr/qr-order-system-one-vercel-app-admin-add-drink-12.png",
        alt: "Restaurant dashboard — add drink",
      },
      {
        src: "https://portfolio-bricegnanago.s3.us-east-1.amazonaws.com/demo_event_qr/qr-order-system-one-vercel-app-admin-historique-drink-13.png",
        alt: "Restaurant dashboard — drink history",
      },
    ],
  },
  {
    title: "ZoomStudent",
    description:
      "Educational platform facilitating connections between students and tutors. Advanced search features, session scheduling and progress tracking.",
    technologies: [
      "Vue.js",
      "Next.js",
      "Django Rest Framework",
      "PostgreSQL",
      "Docker",
      "CI/CD",
      "Redis",
      "Socket.io",
    ],
    metrics: [
      "Course & schedule management",
      "School management",
      "User & role management",
      "School settings",
      "Schedule management",
      "Exam management",
      "Grades & evaluations",
      "Attendance tracking",
      "Communication & messaging",
      "Educational resources",
      "Student portal",
      "Parent portal",
      "Security & compliance",
      "Async tasks & automation",
    ],
    demoUrl: "[À COMPLÉTER]",
    sourceUrl: "[À COMPLÉTER]",
    images: [],
  },
]
