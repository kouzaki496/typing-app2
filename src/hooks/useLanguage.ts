import { useState, useEffect, useCallback } from 'react';
import { LanguageKey } from '@/constants/languageOptions';

export const useLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageKey>('javascript');
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // ローカルストレージから言語設定を読み込み
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') as LanguageKey;
    console.log('useLanguage: Loading saved language:', savedLanguage);

    if (savedLanguage && ['javascript', 'typescript', 'python'].includes(savedLanguage)) {
      console.log('useLanguage: Setting saved language:', savedLanguage);
      setSelectedLanguage(savedLanguage);
    } else {
      console.log('useLanguage: No valid saved language, using default: javascript');
      setSelectedLanguage('javascript');
    }

    setIsInitialized(true);
  }, []);

  // 言語選択を保存（同期的に処理）
  const selectLanguage = useCallback((language: LanguageKey) => {
    console.log('useLanguage: Selecting language:', language);

    // 即座にローカルストレージに保存
    localStorage.setItem('selectedLanguage', language);

    // 状態を更新
    setSelectedLanguage(language);
    setIsLanguageModalOpen(false);

    console.log('useLanguage: Language saved to localStorage:', language);
  }, []);

  // 言語選択モーダルを開く
  const openLanguageModal = useCallback(() => {
    console.log('useLanguage: Opening language modal');
    setIsLanguageModalOpen(true);
  }, []);

  // 言語選択モーダルを閉じる
  const closeLanguageModal = useCallback(() => {
    console.log('useLanguage: Closing language modal');
    setIsLanguageModalOpen(false);
  }, []);

  return {
    selectedLanguage,
    selectLanguage,
    isLanguageModalOpen,
    openLanguageModal,
    closeLanguageModal,
    isInitialized,
  };
};