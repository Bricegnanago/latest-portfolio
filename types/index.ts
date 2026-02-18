export interface Social {
  name: string
  url: string
  icon: string
}

export interface PersonalInfo {
  name: string
  title: string
  email: string
  phone: string
  bio: string
  location: string
  languages: string[]
  education: string
  certifications: string[]
  socials: Social[]
}

export interface Skill {
  name: string
}

export interface SkillCategory {
  name: string
  icon: string
  skills: Skill[]
}

export interface Experience {
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
  responsibilities: string[]
  location?: string
}

export interface Project {
  title: string
  description: string
  technologies: string[]
  metrics: string[]
  demoUrl?: string
  sourceUrl?: string
  image?: string
}

export interface ContactFormData {
  name: string
  email: string
  message: string
}
