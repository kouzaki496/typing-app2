"use client";
import { Button } from "@/components/ui/index";
import { languageOptions } from "@/constants/languageOptions";
import { useState } from "react";
import { LanguageSelectModal } from "@/components/index";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<string | null>(null);

  const selectedLanguage = languageOptions.find((option) => option.key === language)?.name ?? "まだ選ばれていません";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to CodeTapper</h1>
      <p className="mb-6 text-gray-500">エンジニア向けタイピング練習アプリ</p>
      <p>選択された言語: {selectedLanguage}</p>
      <Button onClick={() => setIsOpen(true)}>言語を選ぶ</Button>

      <LanguageSelectModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onSelect={(language) => setLanguage(language)}
      />
    </main>
  )
}