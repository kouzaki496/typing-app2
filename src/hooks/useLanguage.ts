import { useState, useEffect } from 'react';
import { LanguageKey } from '@/constants/languageOptions';

export const useLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageKey>('javascript');
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  // ローカルストレージから言語設定を読み込み
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') as LanguageKey;
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  // 言語選択を保存
  const selectLanguage = (language: LanguageKey) => {
    setSelectedLanguage(language);
    localStorage.setItem('selectedLanguage', language);
    setIsLanguageModalOpen(false);
  };

  // 言語選択モーダルを開く
  const openLanguageModal = () => {
    setIsLanguageModalOpen(true);
  };

  // 言語選択モーダルを閉じる
  const closeLanguageModal = () => {
    setIsLanguageModalOpen(false);
  };

  return {
    selectedLanguage,
    selectLanguage,
    isLanguageModalOpen,
    openLanguageModal,
    closeLanguageModal,
  };
};