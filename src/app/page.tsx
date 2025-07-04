"use client";
import { Button } from "@/components/ui/index";
import { languageOptions, LanguageKey } from "@/constants/languageOptions";
import { useState, useEffect } from "react";
import { LanguageSelectModal } from "@/components/index";
import Link from "next/link";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<LanguageKey | null>(null);

  // ローカルストレージから言語設定を読み込み
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') as LanguageKey;
    if (savedLanguage && ['javascript', 'typescript', 'python'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const selectedLanguage = languageOptions.find((option) => option.key === language)?.name ?? "まだ選ばれていません";

  const handleLanguageSelect = (selectedLanguage: LanguageKey) => {
    setLanguage(selectedLanguage);
    localStorage.setItem('selectedLanguage', selectedLanguage);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to Clyper</h1>
      <p className="mb-6 text-gray-500">エンジニア向けタイピング練習アプリ</p>
      <p>選択された言語: {selectedLanguage}</p>
      <Button onClick={() => setIsOpen(true)}>言語を選ぶ</Button>

      <LanguageSelectModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onSelect={handleLanguageSelect}
        currentLanguage={language || 'javascript'}
      />

      <Link href="/practice">
        <Button>練習する</Button>
      </Link>
    </div>
  )
}