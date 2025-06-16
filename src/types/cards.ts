// Impact Card Interface
export interface ImpactCard {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  detailedDescription: string; // HTML content for the detailed page
}

// Achievement Card Interface
export interface AchievementCard {
  id: number;
  icon: string;
  number: string;
  title: string;
  description: string;
}

// Success Story Interface
export interface SuccessStory {
  id: number;
  quote: string;
  author: string;
  location: string;
}

// Media Card Interface
export interface MediaCard {
  id: number;
  title: string;
  date: string;
  source: string;
  description: string;
  imageUrl: string;
  link: string;
} 