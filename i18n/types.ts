export type Locale = "fr" | "en"
export const DEFAULT_LOCALE: Locale = "fr"
export const SUPPORTED_LOCALES: Locale[] = ["fr", "en"]

export interface TranslationDictionary {
  nav: {
    home: string
    about: string
    skills: string
    experiences: string
    projects: string
    contact: string
    backToHome: string
    closeMenu: string
    openMenu: string
  }
  hero: {
    welcome: string
    viewProjects: string
    contactMe: string
    scrollDown: string
  }
  about: {
    title: string
    subtitle: string
    location: string
    languages: string
    education: string
    certifications: string
  }
  skills: {
    title: string
    subtitle: string
  }
  experience: {
    title: string
    subtitle: string
  }
  projects: {
    title: string
    subtitle: string
    screenshots: string
    viewDemo: string
    demo: string
    demoComing: string
    code: string
    codeComing: string
  }
  contact: {
    title: string
    subtitle: string
    name: string
    namePlaceholder: string
    email: string
    emailPlaceholder: string
    message: string
    messagePlaceholder: string
    sending: string
    send: string
    directContact: string
    sendEmail: string
  }
  footer: {
    allRightsReserved: string
    sendEmail: string
  }
  theme: {
    changeTheme: string
    lightMode: string
    darkMode: string
  }
  validation: {
    nameRequired: string
    emailInvalid: string
    messageRequired: string
  }
  api: {
    invalidData: string
    configError: string
    success: string
    error: string
    emailSubject: string
  }
  metadata: {
    title: string
    description: string
    ogLocale: string
  }
}
