export interface PracticeLog {
  language: string;   // 練習した言語（JS, TS, Pythonなど）
  accuracy: number;   // 正確さ（例：98%）
  timeSpent: number;  // 練習時間（秒）
  timestamp: number;  // 練習日時（UNIXタイムスタンプ）
}
