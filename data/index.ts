import { personalInfo as personalInfoFr } from "./personal"
import { personalInfo as personalInfoEn } from "./personal.en"
import { experiences as experiencesFr } from "./experiences"
import { experiences as experiencesEn } from "./experiences.en"
import { projects as projectsFr } from "./projects"
import { projects as projectsEn } from "./projects.en"
import { skillCategories as skillCategoriesFr } from "./skills"
import { skillCategories as skillCategoriesEn } from "./skills.en"
import type { Locale } from "@/i18n/types"

export function getLocalizedData(locale: Locale) {
  if (locale === "en") {
    return {
      personalInfo: personalInfoEn,
      experiences: experiencesEn,
      projects: projectsEn,
      skillCategories: skillCategoriesEn,
    }
  }
  return {
    personalInfo: personalInfoFr,
    experiences: experiencesFr,
    projects: projectsFr,
    skillCategories: skillCategoriesFr,
  }
}
