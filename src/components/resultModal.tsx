"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { WeakKeyAnalysis } from "@/types/practice";

type ResultModalProps = {
  isOpen: boolean;
  onRetry: () => void;
  results: {
    wpm: number;
    accuracy: number;
    elapsedTime: number;
    mistakes: number;
    weakKeyAnalysis?: WeakKeyAnalysis;
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
            <div className="bg-primary/10 p-3 rounded-lg text-center border border-primary/20">
              <div className="text-2xl font-bold text-primary">{results.wpm}</div>
              <div className="text-sm text-muted-foreground">WPM</div>
            </div>
            <div className="bg-accent/20 p-3 rounded-lg text-center border border-accent/30">
              <div className="text-2xl font-bold text-accent-foreground">{results.accuracy}%</div>
              <div className="text-sm text-muted-foreground">正確率</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted p-3 rounded-lg text-center border border-border">
              <div className="text-lg font-bold text-foreground">{results.mistakes}</div>
              <div className="text-sm text-muted-foreground">ミスタイプ数</div>
            </div>
            <div className="bg-secondary p-3 rounded-lg text-center border border-border">
              <div className="text-lg font-bold text-secondary-foreground">{results.elapsedTime.toFixed(1)}秒</div>
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

        {/* 苦手キー分析 */}
        {results.weakKeyAnalysis && results.weakKeyAnalysis.totalMistakes > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">苦手キー分析</h3>
                        <div className="bg-destructive/5 p-4 rounded-lg border border-destructive/20">
              <div className="mb-3">
                <span className="text-sm text-muted-foreground">
                  総ミス回数: <span className="font-semibold text-destructive">{results.weakKeyAnalysis.totalMistakes}回</span>
                </span>
              </div>

              {results.weakKeyAnalysis.mostMistakenKeys.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2 text-destructive">
                    よくミスするキー（上位5つ）
                  </h4>
                  <div className="space-y-2">
                    {results.weakKeyAnalysis.mostMistakenKeys.map((keyData, index) => (
                      <div key={keyData.key} className="flex items-center justify-between bg-muted/50 p-2 rounded border border-border">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-medium text-muted-foreground">#{index + 1}</span>
                          <span className="font-mono text-lg font-bold bg-accent/20 px-2 py-1 rounded border border-accent/30">
                            {keyData.key === ' ' ? '[ スペース ]' : keyData.key}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-semibold text-destructive">{keyData.count}回</span>
                          <span className="text-muted-foreground">({keyData.percentage}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 p-2 bg-primary/5 rounded border border-primary/20">
                    <p className="text-xs text-primary">
                      💡 <strong>アドバイス:</strong>
                      これらのキーを重点的に練習することで、タイピング精度の向上が期待できます。
                    </p>
                  </div>
                </div>
              )}
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
