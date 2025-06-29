import practiceTexts from '@/data/practice-texts.json';
import { PracticeText, UserPreferences } from '@/types/practice';

class PracticeService {
  private texts: PracticeText[];

  constructor() {
    this.texts = practiceTexts.texts as PracticeText[];
  }

  /**
   * 全ての練習問題を取得
   */
  getAllTexts(): PracticeText[] {
    return this.texts;
  }

  /**
   * 言語でフィルタリング
   */
  getTextsByLanguage(language: string): PracticeText[] {
    return this.texts.filter(text => text.language === language);
  }

  /**
   * 難易度でフィルタリング
   */
  getTextsByDifficulty(difficulty: PracticeText['difficulty']): PracticeText[] {
    return this.texts.filter(text => text.difficulty === difficulty);
  }

  /**
   * カテゴリでフィルタリング
   */
  getTextsByCategory(category: string): PracticeText[] {
    return this.texts.filter(text => text.category === category);
  }

  /**
   * タグでフィルタリング
   */
  getTextsByTags(tags: string[]): PracticeText[] {
    return this.texts.filter(text =>
      tags.some(tag => text.tags.includes(tag))
    );
  }

  /**
   * ユーザーの設定に基づいて問題を取得
   */
  getTextsByPreferences(preferences: UserPreferences): PracticeText[] {
    return this.texts.filter(text => {
      const languageMatch = text.language === preferences.language;
      const difficultyMatch = text.difficulty === preferences.difficulty;
      const categoryMatch = !preferences.category || text.category === preferences.category;

      return languageMatch && difficultyMatch && categoryMatch;
    });
  }

  /**
   * ランダムに問題を選択
   */
  getRandomText(preferences?: UserPreferences): PracticeText {
    const availableTexts = preferences
      ? this.getTextsByPreferences(preferences)
      : this.texts;

    if (availableTexts.length === 0) {
      // 設定に合う問題がない場合は、言語のみでフィルタリング
      const fallbackTexts = preferences
        ? this.getTextsByLanguage(preferences.language)
        : this.texts;

      if (fallbackTexts.length === 0) {
        // それでもない場合は最初の問題を返す
        return this.texts[0];
      }

      return fallbackTexts[Math.floor(Math.random() * fallbackTexts.length)];
    }

    return availableTexts[Math.floor(Math.random() * availableTexts.length)];
  }

  /**
   * IDで問題を取得
   */
  getTextById(id: string): PracticeText | undefined {
    return this.texts.find(text => text.id === id);
  }

  /**
   * 利用可能な言語の一覧を取得
   */
  getAvailableLanguages(): string[] {
    return [...new Set(this.texts.map(text => text.language).filter((lang): lang is string => lang !== null))];
  }

  /**
   * 利用可能な難易度の一覧を取得
   */
  getAvailableDifficulties(): PracticeText['difficulty'][] {
    return [...new Set(this.texts.map(text => text.difficulty))];
  }

  /**
   * 利用可能なカテゴリの一覧を取得
   */
  getAvailableCategories(): string[] {
    return [...new Set(this.texts.map(text => text.category))];
  }

  /**
   * 利用可能なタグの一覧を取得
   */
  getAvailableTags(): string[] {
    const allTags = this.texts.flatMap(text => text.tags);
    return [...new Set(allTags)];
  }

  /**
   * 将来的なFirestore統合用のメソッド
   */
  async savePracticeSession(session: {
    textId?: string;
    startTime: number;
    endTime: number;
    input: string;
    isComplete: boolean;
    mistakes: number;
    elapsedTime: number;
    wpm: number;
    accuracy: number;
  }): Promise<void> {
    // TODO: Firestoreにセッションを保存
    console.log('Saving practice session:', session);
  }

  /**
   * 将来的なFirestore統合用のメソッド
   */
  async getPracticeHistory(userId: string): Promise<{
    textId?: string;
    startTime: number;
    endTime: number;
    input: string;
    isComplete: boolean;
    mistakes: number;
    elapsedTime: number;
    wpm: number;
    accuracy: number;
  }[]> {
    // TODO: Firestoreから練習履歴を取得
    console.log('Getting practice history for user:', userId);
    return [];
  }
}

// シングルトンインスタンスを作成
export const practiceService = new PracticeService();