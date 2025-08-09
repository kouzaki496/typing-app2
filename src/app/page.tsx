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
    <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-8 py-12">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* ヘッダーセクション */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-foreground dark:bg-gradient-to-r dark:from-primary dark:to-primary/60 dark:bg-clip-text dark:text-transparent">
            Welcome to KeyCoder
          </h1>
          <p className="text-xl text-muted-foreground">
            エンジニア向けタイピング練習アプリ
          </p>
        </div>

        {/* 言語選択セクション */}
        <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
          <h2 className="text-lg font-semibold mb-4">プログラミング言語</h2>
          <p className="text-muted-foreground mb-4">
            選択された言語: <span className="font-medium text-foreground">{selectedLanguage}</span>
          </p>
          <Button
            onClick={() => setIsOpen(true)}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            言語を選ぶ
          </Button>
        </div>

        {/* アクションボタン */}
        <div className="pt-4">
          <Link href="/practice">
            <Button
              size="lg"
              className="px-8 py-3 text-lg font-semibold"
              disabled={!language}
            >
              練習を始める
            </Button>
          </Link>
          {!language && (
            <p className="text-sm text-muted-foreground mt-2">
              まず言語を選択してください
            </p>
          )}
        </div>
      </div>

      <LanguageSelectModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onSelect={handleLanguageSelect}
        currentLanguage={language || 'javascript'}
      />
    </div>
  )
}