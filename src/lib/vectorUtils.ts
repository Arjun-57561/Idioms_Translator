import { Idiom } from '@/lib/types';

export const generateRandomEmbedding = (dimension: number = 512): number[] => {
  const vec = Array.from({ length: dimension }, () => Math.random() * 2 - 1);
  const magnitude = Math.sqrt(vec.reduce((sum, val) => sum + val * val, 0));
  return vec.map(val => val / magnitude);
};

export const cosineSimilarity = (a: number[], b: number[]): number => {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  return denominator === 0 ? 0 : dotProduct / denominator;
};

export const findBestMatch = (queryEmbedding: number[], targetIdioms: Idiom[]) => {
  if (targetIdioms.length === 0) {
    return null;
  }

  let bestMatch = targetIdioms[0];
  let bestScore = cosineSimilarity(queryEmbedding, bestMatch.embedding);

  for (let i = 1; i < targetIdioms.length; i++) {
    const score = cosineSimilarity(queryEmbedding, targetIdioms[i].embedding);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = targetIdioms[i];
    }
  }

  return { item: bestMatch, score: bestScore };
};

export const calculateIdiomsStats = (idiomDatabase: Record<string, Idiom[]>) => {
  const stats = {
    totalIdioms: 0,
    idiomsByLanguage: {} as Record<string, number>,
    categoriesCount: {} as Record<string, number>,
  };

  for (const [lang, idioms] of Object.entries(idiomDatabase)) {
    stats.idiomsByLanguage[lang] = idioms.length;
    stats.totalIdioms += idioms.length;

    for (const idiom of idioms) {
      stats.categoriesCount[idiom.category] =
        (stats.categoriesCount[idiom.category] || 0) + 1;
    }
  }

  return stats;
};
