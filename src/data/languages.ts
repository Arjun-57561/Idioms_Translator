import { Language } from '@/lib/types';

export const languages: Language[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    color: 'hsl(217 91% 60%)',
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    color: 'hsl(0 84% 60%)',
  },
  {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    color: 'hsl(142 76% 36%)',
  },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇵🇹',
    color: 'hsl(38 92% 50%)',
  },
  {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    flag: '🇷🇺',
    color: 'hsl(270 60% 65%)',
  },
  {
    code: 'tr',
    name: 'Turkish',
    nativeName: 'Türkçe',
    flag: '🇹🇷',
    color: 'hsl(340 82% 52%)',
  },
];

export const getLanguageByCode = (code: string) => {
  return languages.find((lang) => lang.code === code);
};

export const getAllLanguageCodes = (): string[] => {
  return languages.map(lang => lang.code);
};
