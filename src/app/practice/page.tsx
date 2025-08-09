"use client";

import { Input } from "@/components/ui/input";
import { usePractice } from "@/hooks/usePractice";
import { useLanguage } from "@/hooks/useLanguage";
import { ResultModal } from "@/components/resultModal";
import LanguageSelectModal from "@/components/languageSelectModal";
import { Button } from "@/components/ui/button";
import { languageOptions } from "@/constants/languageOptions";

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
    keyMistakes,
    setResults,
    questionCount,
    TOTAL_QUESTIONS_PER_SET,
  } = usePractice(selectedLanguage, isInitialized);

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
