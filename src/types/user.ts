import { PracticeLog } from '@/types/practiceLog';

export interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  language: string;
  practiceLogs: PracticeLog[];
}
