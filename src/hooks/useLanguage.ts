import { useState, useEffect, useCallback } from 'react';
import { LanguageKey } from '@/constants/languageOptions';

export const useLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageKey>('javascript');
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // ローカルストレージから言語設定を読み込み
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') as LanguageKey;

    if (savedLanguage && ['javascript', 'typescript', 'python'].includes(savedLanguage)) {
      setSelectedLanguage(savedLanguage);
    } else {
      setSelectedLanguage('javascript');
    }

    setIsInitialized(true);
  }, []);

  // 言語選択を保存（同期的に処理）
  const selectLanguage = useCallback((language: LanguageKey) => {
    // 即座にローカルストレージに保存
    localStorage.setItem('selectedLanguage', language);

    // 状態を更新
    setSelectedLanguage(language);
    setIsLanguageModalOpen(false);
  }, []);

  // 言語選択モーダルを開く
  const openLanguageModal = useCallback(() => {
    setIsLanguageModalOpen(true);
  }, []);

  // 言語選択モーダルを閉じる
  const closeLanguageModal = useCallback(() => {
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