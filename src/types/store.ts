import { User, PracticeLog } from '@/types/index';

export interface Store {
  user: User | null;
  language: string;
  practiceLogs: PracticeLog[];
  setUser: (user: User | null) => void;
  setLanguage: (language: string) => void;
  setPracticeLogs: (logs: PracticeLog[]) => void;
}
