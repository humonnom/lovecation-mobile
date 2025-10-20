export const LOCALES = {
  KO: 'ko',
  JA: 'ja',
} as const;

export type Locale = typeof LOCALES[keyof typeof LOCALES];

export const SUPPORTED_LOCALES = Object.values(LOCALES);
