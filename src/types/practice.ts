export interface PracticeText {
  id: string;
  text: string;
  language: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category?: string;
  description?: string;
}

export interface PracticeSession {
  id: string;
  userId: string;
  textId: string;
  startTime: number;
  endTime?: number;
  input: string;
  isComplete: boolean;
  mistakes: number;
  wpm?: number;
  accuracy?: number;
}

export interface UserPreferences {
  language: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category?: string;
}