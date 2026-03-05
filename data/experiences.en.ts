import { Experience } from "@/types"

export const experiences: Experience[] = [
  {
    company: "Barnoin Informatique",
    website: "https://barnoininformatique.com",
    position: "Web & Mobile Development Engineer",
    startDate: "June 2023",
    endDate: "Present",
    location: "Abidjan, Ivory Coast",
    description:
      "Design, development and maintenance of critical digital solutions for the National Social Security Fund (CNPS), in an institutional environment with high business and regulatory requirements.",
    responsibilities: [
      "Implementation of key CNPS business processes, including the Certificate of Compliance and the Daily Accounting Closing",
      "Implementation of complex business rules in Java, compliant with regulatory and functional requirements",
      "Corrective and evolutive maintenance of existing business processes",
      "Design and development of APIs for synchronizing payments between EBS and PROGRES systems (social relations management software) across multiple CNPS Ivory Coast environments",
      "Setup and operation of microservices architectures with deployment on AWS",
      "Performance, security and scalability optimization of existing applications",
      "Close collaboration with business teams for requirements analysis, technical specifications writing and functional validation",
    ],
  },
  {
    company: "MONBOLIDE",
    website: "https://monbolide.com",
    position: "Full Stack Developer",
    startDate: "June 2021",
    endDate: "May 2023",
    location: "Abidjan, Ivory Coast",
    description:
      "Design and development of an online vehicle rental web platform, focused on performance, security and user experience.",
    responsibilities: [
      "Frontend development with React and TypeScript, emphasizing ergonomics and performance",
      "Design and implementation of robust REST APIs with Node.js and Express",
      "Migration and optimization of image storage from Cloudinary to AWS",
      "Integration of payment systems for rental fee management",
      "Implementation of a geolocation system to identify the nearest vehicles to the customer",
      "Design and deployment of distinct application environments (DEV, TEST, PROD)",
      "Integration of a real-time messaging system between vehicle owners and customers",
      "Deployment automation via CI/CD pipelines with GitLab",
    ],
  },
  {
    company: "EBURTIS",
    website: "https://eburtis.com",
    position: "Junior Web Developer",
    startDate: "September 2022",
    endDate: "February 2023",
    description:
      "Web application development and participation in digital transformation projects.",
    responsibilities: [
      "Frontend component development with Angular and TypeScript",
      "Backend API creation with Spring Boot and Oracle",
      "Participation in code reviews and Agile sprints",
      "Technical documentation writing and unit testing",
    ],
    location: "Abidjan, Ivory Coast",
  },
]
