export interface PracticeText {
  id: string;
  text: string;
  category: 'code' | 'token';
  tags: string[];
  language: string | null;
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: string;
  updatedAt: string;
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
  difficulty?: 'easy' | 'medium' | 'hard';
  category?: string;
}

export interface KeyMistake {
  key: string;
  mistakeCount: number;
  expectedKey: string;
  position: number;
}

export interface WeakKeyAnalysis {
  totalMistakes: number;
  keyMistakes: Record<string, number>; // キー -> ミス回数
  mostMistakenKeys: Array<{
    key: string;
    count: number;
    percentage: number;
  }>;
}