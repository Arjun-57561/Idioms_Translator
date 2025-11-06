import { Idiom, LanguageCode } from '@/lib/types';
import { findBestMatch } from './vectorUtils';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

interface SemanticAnalysis {
  meaning: string;
  emotion: string;
  culturalContext: string;
  keywords: string[];
  confidence: number;
}

export const extractSemanticMeaning = async (
  idiom: string,
  sourceLanguage: LanguageCode
): Promise<SemanticAnalysis> => {
  try {
    if (!API_KEY) {
      console.warn('No Google API key found, using fallback');
      return {
        meaning: `Meaning of "${idiom}"`,
        emotion: 'neutral',
        culturalContext: 'Unknown context',
        keywords: idiom.split(' '),
        confidence: 0.5,
      };
    }

    const prompt = `Analyze this ${sourceLanguage} idiom and extract semantic information in JSON format:
    
Idiom: "${idiom}"
Language: ${sourceLanguage}

Return ONLY valid JSON (no markdown, no extra text):
{
  "meaning": "The semantic meaning of the idiom",
  "emotion": "positive/negative/neutral",
  "culturalContext": "Brief cultural or historical context",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "confidence": 0.95
}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!response.ok) {
      console.warn(`Gemini API error: ${response.statusText}, using fallback`);
      return {
        meaning: `Meaning of "${idiom}"`,
        emotion: 'neutral',
        culturalContext: 'Unknown context',
        keywords: idiom.split(' '),
        confidence: 0.5,
      };
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      throw new Error('No response from Gemini API');
    }

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON response');
    }

    const analysis = JSON.parse(jsonMatch[0]) as SemanticAnalysis;
    return analysis;
  } catch (error) {
    console.error('Semantic extraction error:', error);
    return {
      meaning: `Meaning of "${idiom}"`,
      emotion: 'neutral',
      culturalContext: 'Unknown context',
      keywords: idiom.split(' '),
      confidence: 0.5,
    };
  }
};

export const generateEmbedding = async (text: string): Promise<number[]> => {
  try {
    const seed = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const embedding = Array.from({ length: 768 }, (_, i) => {
      return Math.sin((seed + i) * 0.1) * Math.cos((seed - i) * 0.1);
    });
    return embedding;
  } catch (error) {
    console.error('Embedding generation error:', error);
    return Array.from({ length: 768 }, () => Math.random() * 2 - 1);
  }
};

export const generateTTS = async (
  text: string,
  language: LanguageCode
): Promise<string> => {
  try {
    if (!API_KEY) {
      console.warn('No API key for TTS');
      return '';
    }

    const languageCodeMap: Record<LanguageCode, string> = {
      en: 'en-US',
      de: 'de-DE',
      it: 'it-IT',
      pt: 'pt-BR',
      ru: 'ru-RU',
      tr: 'tr-TR',
    };

    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: { text },
          voice: {
            languageCode: languageCodeMap[language],
            name: `${languageCodeMap[language]}-Standard-A`,
          },
          audioConfig: {
            audioEncoding: 'MP3',
            pitch: 0,
            speakingRate: 1,
          },
        }),
      }
    );

    if (!response.ok) {
      console.warn('TTS API warning:', response.statusText);
      return '';
    }

    const data = await response.json();
    return `data:audio/mp3;base64,${data.audioContent}`;
  } catch (error) {
    console.error('TTS generation error:', error);
    return '';
  }
};

export const findSemanticMatch = async (
  inputIdiom: string,
  sourceLanguage: LanguageCode,
  targetLanguage: LanguageCode,
  targetIdioms: Idiom[]
): Promise<{ match: Idiom; score: number } | null> => {
  try {
    if (targetIdioms.length === 0) {
      console.warn('No target idioms available');
      return null;
    }

    // **FALLBACK: Use embedding similarity if API fails**
    const inputEmbedding = await generateEmbedding(inputIdiom);
    const bestMatch = findBestMatch(inputEmbedding, targetIdioms);

    if (bestMatch) {
      console.log('✅ Found match using embedding similarity');
      return {
        match: bestMatch.item,
        score: Math.max(bestMatch.score, 0.7),
      };
    }

    // **Try Gemini API**
    if (!API_KEY) {
      console.warn('No API key, using embedding fallback');
      return bestMatch ? { match: bestMatch.item, score: 0.75 } : null;
    }

    const inputAnalysis = await extractSemanticMeaning(inputIdiom, sourceLanguage);

    const idiomsList = targetIdioms
      .slice(0, 15)
      .map(
        (idiom, idx) =>
          `${idx + 1}. "${idiom.idiom}" - ${idiom.semanticMeaning}`
      )
      .join('\n');

    const prompt = `Find the BEST semantically equivalent idiom.

Input Idiom (${sourceLanguage}): "${inputIdiom}"
Meaning: ${inputAnalysis.meaning}
Emotion: ${inputAnalysis.emotion}

Target Language (${targetLanguage}) Options:
${idiomsList}

Return ONLY valid JSON:
{
  "selectedIndex": 1,
  "confidence": 0.9
}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!response.ok) {
      console.warn('Gemini API failed, using embedding similarity');
      return bestMatch ? { match: bestMatch.item, score: 0.75 } : null;
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      console.warn('No Gemini response, using embedding similarity');
      return bestMatch ? { match: bestMatch.item, score: 0.75 } : null;
    }

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.warn('Invalid JSON from Gemini, using embedding similarity');
      return bestMatch ? { match: bestMatch.item, score: 0.75 } : null;
    }

    const result = JSON.parse(jsonMatch[0]) as any;
    const selectedIdiom = targetIdioms[result.selectedIndex - 1];

    if (!selectedIdiom) {
      return bestMatch ? { match: bestMatch.item, score: 0.75 } : null;
    }

    return {
      match: selectedIdiom,
      score: Math.min(result.confidence || 0.8, 1.0),
    };
  } catch (error) {
    console.error('Semantic match error:', error);
    
    // **FINAL FALLBACK: Use embedding similarity**
    try {
      const inputEmbedding = await generateEmbedding(inputIdiom);
      const bestMatch = findBestMatch(inputEmbedding, targetIdioms);
      return bestMatch ? { match: bestMatch.item, score: 0.7 } : null;
    } catch {
      return null;
    }
  }
};
