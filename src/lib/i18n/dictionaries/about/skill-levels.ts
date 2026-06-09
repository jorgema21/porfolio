export type SkillLevelsContent = {
  advanced: string;
  proficient: string;
  intermediate: string;
  learning: string;
  nextup: string;
};

export type SkillLevelsI18n = {
  es: SkillLevelsContent;
  en: SkillLevelsContent;
};

export const skillLevels = {
  es: {
    advanced: "Avanzado",
    proficient: "Competente",
    intermediate: "Intermedio",
    learning: "Aprendiendo",
    nextup: "Próximo objetivo",
  },
  en: {
    advanced: "Advanced",
    proficient: "Proficient",
    intermediate: "Intermediate",
    learning: "Learning",
    nextup: "Next Up",
  },
} as const satisfies SkillLevelsI18n;
