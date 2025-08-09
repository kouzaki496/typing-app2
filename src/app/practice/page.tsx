"use client";

import { Input } from "@/components/ui/input";
import { usePractice } from "@/hooks/usePractice";
import { useLanguage } from "@/hooks/useLanguage";
import { ResultModal } from "@/components/resultModal";
import LanguageSelectModal from "@/components/languageSelectModal";
import { Button } from "@/components/ui/button";
import { languageOptions } from "@/constants/languageOptions";
import { useEffect } from "react";

// 開発モードかどうかを判定
const isDevelopment = process.env.NODE_ENV === 'development';

export default function Practice() {
  const {
    selectedLanguage,
    selectLanguage,
    isLanguageModalOpen,
    openLanguageModal,
    closeLanguageModal,
    isInitialized,
  } = useLanguage();

  const {
    currentText,
    renderText,
    inputRef,
    handleChange,
    input,
    shake,
    lastResult,
    showResultModal,
    closeModal,
    mistakes,
    setResults,
    questionCount,
    TOTAL_QUESTIONS_PER_SET,
    skipCurrentText,
    autoComplete,
  } = usePractice(selectedLanguage, isInitialized);

  // 開発モード用のキーボードショートカット
  useEffect(() => {
    if (!isDevelopment) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + S でスキップ
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        skipCurrentText();
      }
      // Ctrl + Enter で自動完成
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        autoComplete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [skipCurrentText, autoComplete]);

  if (!isInitialized) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-6">
        <h1 className="text-xl font-semibold">初期化中...</h1>
      </div>
    );
  }

  if (!currentText) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-6">
        <h1 className="text-xl font-semibold">読み込み中...</h1>
      </div>
    );
  }

  const currentLanguage = languageOptions.find(lang => lang.key === selectedLanguage);

  return (
    <div
      className={`flex flex-col items-center justify-center gap-6 p-6 ${
        shake ? "animate-shake" : ""
      }`}
      style={{
        animation: shake ? 'shake 0.3s ease-in-out' : 'none'
      }}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center justify-between w-full max-w-xl">
        <h1 className="text-xl font-semibold">タイピング練習</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={openLanguageModal}
          className="flex items-center gap-2"
        >
          {currentLanguage?.icon}
          <span>{currentLanguage?.name}</span>
        </Button>
      </div>

      {/* 進捗表示 */}
      <div className="text-sm text-muted-foreground">
        問題 {questionCount + 1} / {TOTAL_QUESTIONS_PER_SET}
      </div>

      <div className="text-lg font-mono whitespace-pre-wrap max-w-xl break-words border rounded-md p-4 w-full min-h-[120px] tracking-wide typing-text">
        {renderText()}
      </div>

      <Input
        ref={inputRef}
        value={input}
        onChange={handleChange}
        className="opacity-0 h-0 pointer-events-none absolute"
        inputMode="text"
        lang="en"
        autoFocus
      />

      <p className={currentText.text.startsWith(input) ? "text-green-600" : "text-red-600"}>
        {input === ""
          ? "入力を開始してください"
          : currentText.text.startsWith(input)
          ? "入力中…"
          : "ミスがあります！"}
      </p>

      {/* 統計情報 */}
      <div className="text-sm text-gray-600">
        <p>ミス回数: {mistakes}</p>
        <p>進捗: {input.length} / {currentText.text.length}</p>
      </div>

      {/* 開発モード用のコントロール */}
      {isDevelopment && (
        <div className="flex gap-2 mt-4 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <div className="text-xs text-yellow-700 dark:text-yellow-400 mr-4">
            <strong>開発モード:</strong>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={skipCurrentText}
            className="text-xs"
          >
            スキップ (Ctrl+S)
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={autoComplete}
            className="text-xs"
          >
            自動完成 (Ctrl+Enter)
          </Button>
          <div className="text-xs text-muted-foreground ml-2 flex items-center">
            ショートカット: Ctrl+S (スキップ), Ctrl+Enter (自動完成)
          </div>
        </div>
      )}

      {/* 言語選択モーダル */}
      <LanguageSelectModal
        open={isLanguageModalOpen}
        onClose={closeLanguageModal}
        onSelect={selectLanguage}
        currentLanguage={selectedLanguage}
      />

      {/* 結果モーダル */}
      <ResultModal
        isOpen={showResultModal}
        onRetry={closeModal}
        results={lastResult || { wpm: 0, accuracy: 0, elapsedTime: 0, mistakes: 0 }}
        setResults={setResults}
      />
    </div>
  );
}
