export interface BioExercise {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  benefits: string;
  imagePrompt: string; // Used to generate the image
  imageBase64?: string; // The generated image data
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  exerciseId: string;
  completed: boolean;
  happinessRating?: number; // 1-5
  timestamp: number;
}

export enum AppView {
  DAILY = 'DAILY',
  HISTORY = 'HISTORY',
  PROFILE = 'PROFILE'
}

export interface UserPreferences {
  notificationEnabled: boolean;
  lastNotificationDate?: string;
}