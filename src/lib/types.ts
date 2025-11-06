export type LanguageCode = 'en' | 'de' | 'it' | 'pt' | 'ru' | 'tr';

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  color: string;
}

export interface Idiom {
  id: string;
  idiom: string;
  language: LanguageCode;
  literalMeaning: string;
  semanticMeaning: string;
  context: string;
  category: string;
  embedding: number[];
}

export interface TranslationResult {
  success?: boolean;
  source: {
    idiom: string;
    language: LanguageCode;
    meaning?: {
      literal?: string;
      semantic?: string;
      emotion?: string;
    };
  };
  target: Idiom;
  confidence: number;
  matchedVia?: 'exact' | 'semantic' | 'similarity';
  steps?: ProcessingStep[];
}

export interface ProcessingStep {
  step: string;
  status: 'pending' | 'processing' | 'complete' | 'error';
}

export interface AnalysisData {
  totalIdioms: number;
  idiomsByLanguage: Record<LanguageCode, number>;
  categoriesCount: Record<string, number>;
}
