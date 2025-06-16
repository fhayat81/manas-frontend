// Fuzzy search utility functions
export interface SearchResult<T> {
  item: T;
  score: number;
  matches: string[];
}

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
  
  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
  
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + indicator // substitution
      );
    }
  }
  
  return matrix[str2.length][str1.length];
}

/**
 * Calculate similarity score between two strings (0-1, where 1 is exact match)
 */
function calculateSimilarity(str1: string, str2: string): number {
  const distance = levenshteinDistance(str1.toLowerCase(), str2.toLowerCase());
  const maxLength = Math.max(str1.length, str2.length);
  return maxLength === 0 ? 1 : (maxLength - distance) / maxLength;
}

/**
 * Check if a string contains all words from the search query
 */
function containsAllWords(text: string, searchQuery: string): boolean {
  const words = searchQuery.toLowerCase().split(/\s+/).filter(word => word.length > 0);
  const textLower = text.toLowerCase();
  return words.every(word => textLower.includes(word));
}

/**
 * Perform fuzzy search on an array of items
 */
export function fuzzySearch<T>(
  items: T[],
  searchQuery: string,
  getSearchableText: (item: T) => string | string[],
  options: {
    threshold?: number;
    maxResults?: number;
    includePartialMatches?: boolean;
  } = {}
): SearchResult<T>[] {
  const {
    threshold = 0.3,
    maxResults = 50,
    includePartialMatches = true
  } = options;

  if (!searchQuery.trim()) {
    return items.slice(0, maxResults).map(item => ({
      item,
      score: 1,
      matches: []
    }));
  }

  const results: SearchResult<T>[] = [];

  for (const item of items) {
    const searchableTexts = getSearchableText(item);
    const texts = Array.isArray(searchableTexts) ? searchableTexts : [searchableTexts];
    
    let bestScore = 0;
    const matches: string[] = [];

    for (const text of texts) {
      if (!text) continue;

      // Check for exact matches first
      if (text.toLowerCase() === searchQuery.toLowerCase()) {
        bestScore = 1;
        matches.push(text);
        break;
      }

      // Check for contains all words
      if (includePartialMatches && containsAllWords(text, searchQuery)) {
        const similarity = calculateSimilarity(text, searchQuery);
        if (similarity > bestScore) {
          bestScore = similarity;
          matches.push(text);
        }
      }

      // Check for fuzzy similarity
      const similarity = calculateSimilarity(text, searchQuery);
      if (similarity > bestScore) {
        bestScore = similarity;
        matches.push(text);
      }

      // Check for substring matches
      if (includePartialMatches && text.toLowerCase().includes(searchQuery.toLowerCase())) {
        const substringScore = 0.8;
        if (substringScore > bestScore) {
          bestScore = substringScore;
          matches.push(text);
        }
      }
    }

    if (bestScore >= threshold) {
      results.push({
        item,
        score: bestScore,
        matches: [...new Set(matches)]
      });
    }
  }

  // Sort by score (highest first) and limit results
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
}

/**
 * Extract unique values from an array of objects
 */
export function extractUniqueValues<T>(
  items: T[],
  getValue: (item: T) => string | undefined | null
): string[] {
  const values = new Set<string>();
  
  for (const item of items) {
    const value = getValue(item);
    if (value && value.trim()) {
      values.add(value.trim());
    }
  }
  
  return Array.from(values).sort();
}

/**
 * Filter profiles based on search query using fuzzy search
 */
export function filterProfiles<T extends { full_name: string; profession?: string; location?: { city: string; state: string } }>(
  profiles: T[],
  searchQuery: string
): T[] {
  if (!searchQuery.trim()) {
    return profiles;
  }

  const searchResults = fuzzySearch(
    profiles,
    searchQuery,
    (profile) => [
      profile.full_name,
      profile.profession || '',
      profile.location?.city || '',
      profile.location?.state || ''
    ],
    {
      threshold: 0.3,
      includePartialMatches: true
    }
  );

  return searchResults.map(result => result.item);
} 