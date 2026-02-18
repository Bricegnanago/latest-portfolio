import { SkillCategory } from "@/types"

export const skillCategories: SkillCategory[] = [
  {
    name: "Langages",
    icon: "Code2",
    skills: [
      { name: "Java" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "Python" },
      { name: "SQL" },
      { name: "HTML/CSS" },
    ],
  },
  {
    name: "Frontend",
    icon: "Layout",
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Angular" },
      { name: "Tailwind CSS" },
      { name: "Framer Motion" },
    ],
  },
  {
    name: "Backend",
    icon: "Server",
    skills: [
      { name: "Node.js" },
      { name: "Spring Boot" },
      { name: "Express" },
      { name: "REST API" },
    ],
  },
  {
    name: "Cloud & DevOps",
    icon: "Cloud",
    skills: [
      { name: "AWS" },
      { name: "Docker" },
      { name: "CI/CD" },
      { name: "GitHub Actions" },
      { name: "Vercel" },
    ],
  },
  {
    name: "Bases de données",
    icon: "Database",
    skills: [
      { name: "PostgreSQL" },
      { name: "MySQL" },
      { name: "MongoDB" },
      { name: "Redis" },
    ],
  },
  {
    name: "Outils & Méthodologies",
    icon: "Wrench",
    skills: [
      { name: "Git" },
      { name: "Jira" },
      { name: "Agile / Scrum" },
      { name: "TDD" },
    ],
  },
]
