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
};

export const ResultModal: React.FC<ResultModalProps> = ({ isOpen, onRetry, results }) => {
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
      <div className="relative bg-background p-6 rounded-lg shadow-2xl max-w-md w-full border border-border">
        <h2 className="text-xl font-bold mb-4 text-center">練習結果</h2>
        <ul className="mb-6 text-sm space-y-2">
          <li>WPM（入力速度）: <span className="font-semibold">{results.wpm}</span></li>
          <li>正確率: <span className="font-semibold">{results.accuracy}%</span></li>
          <li>ミスタイプ数: <span className="font-semibold">{results.mistakes}</span></li>
          <li>所要時間: <span className="font-semibold">{results.elapsedTime.toFixed(2)}秒</span></li>
        </ul>
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
