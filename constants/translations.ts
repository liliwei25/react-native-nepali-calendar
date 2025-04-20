import NepaliDate from 'nepali-date-converter'

const ENGLISH_TRANSLATIONS = {
  today: 'Today',
  days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
}

const NEPALESE_TRANSLATION: typeof ENGLISH_TRANSLATIONS = {
  today: 'आज',
  days: ['आइत', 'सोम', 'मंगल', 'बुध', 'बिहि', 'शुक्र', 'शनि'],
}

export const TRANSLATIONS: Record<typeof NepaliDate.language, typeof ENGLISH_TRANSLATIONS> = {
  en: ENGLISH_TRANSLATIONS,
  np: NEPALESE_TRANSLATION,
} as const
