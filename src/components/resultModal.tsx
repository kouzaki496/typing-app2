"use client";
import React from "react";
import { useRouter } from "next/navigation";

type ResultModalProps = {
  isOpen: boolean;
  onRetry: () => void;
  results: {
    wpm: number;
    accuracy: number;
    elapsedTime: number;
    mistakes: number;
  };
  setResults?: Array<{
    wpm: number;
    accuracy: number;
    elapsedTime: number;
    mistakes: number;
    textId: string;
  }>;
};

export const ResultModal: React.FC<ResultModalProps> = ({
  isOpen,
  onRetry,
  results,
  setResults = []
}) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleClose = () => {
    // TOPページに遷移
    router.push('/');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* 背景オーバーレイ */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* モーダルコンテンツ */}
      <div className="relative bg-background p-6 rounded-lg shadow-2xl max-w-2xl w-full border border-border max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-center">練習結果</h2>

        {/* セット全体の結果 */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-center">セット全体の結果</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-primary/10 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-primary">{results.wpm}</div>
              <div className="text-sm text-muted-foreground">WPM</div>
            </div>
            <div className="bg-green-500/10 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{results.accuracy}%</div>
              <div className="text-sm text-muted-foreground">正確率</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-orange-500/10 p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-orange-600">{results.mistakes}</div>
              <div className="text-sm text-muted-foreground">ミスタイプ数</div>
            </div>
            <div className="bg-blue-500/10 p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-blue-600">{results.elapsedTime.toFixed(1)}秒</div>
              <div className="text-sm text-muted-foreground">所要時間</div>
            </div>
          </div>
        </div>

        {/* 各問題の詳細結果 */}
        {setResults.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">各問題の詳細</h3>
            <div className="space-y-2">
              {setResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">問題 {index + 1}</span>
                    <span className="text-xs text-muted-foreground">ID: {result.textId}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span>WPM: <span className="font-semibold">{result.wpm}</span></span>
                    <span>正確率: <span className="font-semibold">{result.accuracy}%</span></span>
                    <span>ミス: <span className="font-semibold">{result.mistakes}</span></span>
                    <span>時間: <span className="font-semibold">{result.elapsedTime.toFixed(1)}秒</span></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 text-black bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
            onClick={handleClose}
          >
            終了
          </button>
          <button
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/80"
            onClick={onRetry}
          >
            もう1セット
          </button>
        </div>
      </div>
    </div>
  );
};
