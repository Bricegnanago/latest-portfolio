import { Experience } from "@/types"

export const experiences: Experience[] = [
  {
  company: "Barnoin / CNPS",
  position: "Ingénieur de Developpement Web et Mobile",
  startDate: "Juin 2023",
  endDate: "Présent",
  location: "Abidjan, Côte d'Ivoire",
  description:
    "Conception, développement et maintenance de solutions numériques critiques pour la Caisse Nationale de Prévoyance Sociale (CNPS), en environnement institutionnel à forte exigence métier et réglementaire.",
  responsibilities: [
    "Implémentation de processus métiers clés de la CNPS, notamment l’Attestation de Régularité et la Clôture Journalière Comptable",
    "Implémentation de règles métiers complexes en Java, conformes aux exigences réglementaires et fonctionnelles",
    "Maintenance évolutive et corrective des processus métiers existants",
    "Conception et développement d’APIs permettant la synchronisation des encaissements entre les systèmes EBS et PROGRES (progiciel de gestion des relations sociales) sur plusieurs environnements CNPS Côte d’Ivoire",
    "Mise en place et exploitation d’architectures microservices avec déploiement sur AWS",
    "Optimisation des performances, de la sécurité et de la scalabilité des applications existantes",
    "Collaboration étroite avec les équipes métiers pour l’analyse des besoins, la rédaction des spécifications techniques et la validation fonctionnelle"
  ]
},
  {
    company: "MONBOLIDE",
    position: "Développeur Full Stack",
    startDate: "Juin 2021",
    endDate: "Mai 2023",
    location: "Abidjan, Côte d'Ivoire",
    description:
      "Conception et développement d’une plateforme web de location de véhicules en ligne, orientée performance, sécurité et expérience utilisateur.",
    responsibilities: [
      "Développement du frontend avec React et TypeScript, en mettant l’accent sur l’ergonomie et la performance",
      "Conception et implémentation d’APIs REST robustes avec Node.js et Express",
      "Migration et optimisation du stockage des images depuis Cloudinary vers AWS",
      "Intégration de systèmes de paiement pour la gestion des frais de location",
      "Mise en place d’un système de géolocalisation permettant d’identifier les véhicules les plus proches du client",
      "Conception et déploiement d’environnements applicatifs distincts (DEV, TEST, PROD)",
      "Intégration d’un système de messagerie en temps réel entre propriétaires de véhicules et clients",
      "Automatisation des déploiements via des pipelines CI/CD avec GitLab"
    ]
  },
  {
    company: "EBURTIS",
    position: "Développeur Web Junior",
    startDate: "Septembre 2022",
    endDate: "Février 2023",
    description:
      "Développement d'applications web et participation à des projets de transformation digitale.",
    responsibilities: [
      "Développement de composants frontend avec Angular et TypeScript",
      "Création d'APIs backend avec Spring Boot et PostgreSQL",
      "Participation aux revues de code et aux sprints Agile",
      "Rédaction de documentation technique et de tests unitaires",
    ],
    location: "Abidjan, Côte d'Ivoire",
  },
]
