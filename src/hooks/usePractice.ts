import { useState, useEffect, useRef, useCallback } from "react";
import React from "react";
import { practiceService } from "@/lib/practiceService";
import { PracticeText, UserPreferences } from "@/types/practice";

export const usePractice = (preferences?: UserPreferences) => {
  const [currentText, setCurrentText] = useState<PracticeText | null>(null);
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [shake, setShake] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [isSetFinished, setIsSetFinished] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const TOTAL_QUESTIONS_PER_SET = 3;

  // セット全体の結果を管理
  const [setResults, setSetResults] = useState<Array<{
    wpm: number;
    accuracy: number;
    elapsedTime: number;
    mistakes: number;
    textId: string;
  }>>([]);

  const [lastResult, setLastResult] = useState<{
    wpm: number;
    accuracy: number;
    elapsedTime: number;
    mistakes: number;
  } | null>(null);

  // セット全体の結果を計算
  const calculateSetResults = useCallback((results: typeof setResults) => {
    if (results.length === 0) return null;

    const totalWpm = results.reduce((sum, result) => sum + result.wpm, 0);
    const totalAccuracy = results.reduce((sum, result) => sum + result.accuracy, 0);
    const totalElapsedTime = results.reduce((sum, result) => sum + result.elapsedTime, 0);
    const totalMistakes = results.reduce((sum, result) => sum + result.mistakes, 0);

    return {
      wpm: Math.round(totalWpm / results.length),
      accuracy: Math.round(totalAccuracy / results.length),
      elapsedTime: totalElapsedTime,
      mistakes: totalMistakes,
    };
  }, []);

  // 初期化時に問題を選択
  useEffect(() => {
    const text = practiceService.getRandomText(preferences);
    setCurrentText(text);
  }, [preferences]);

  // 振動効果をリセット
  useEffect(() => {
    if (shake) {
      const timer = setTimeout(() => {
        setShake(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [shake]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentText) return;

    const nextValue = e.target.value;

    if (!startTime && nextValue.length > 0) {
      setStartTime(Date.now());
    }

    // 入力が期待される文字列の一部かチェック（文字単位）
    const expectedText = currentText.text;
    const isCorrect = expectedText.startsWith(nextValue);

    if (isCorrect) {
      setInput(nextValue);
    } else {
      // ミスタイプ時は振動のみ、入力は更新しない
      console.log('ミスタイプ検出:', {
        nextValue,
        expected: expectedText.slice(0, nextValue.length),
        fullExpected: expectedText
      });
      setShake(true);
      setMistakes(prev => prev + 1);
    }
  };

  const renderText = (): React.ReactNode[] => {
    if (!currentText) return [];

    const text = currentText.text;
    const result: React.ReactNode[] = [];

    for (let i = 0; i < text.length; i++) {
      const char = text[i];

      if (i < input.length) {
        // 正しく入力された文字
        result.push(React.createElement('span', {
          key: i,
          className: "text-green-600"
        }, char));
      } else if (i === input.length) {
        // 現在のカーソル位置
        result.push(React.createElement('span', {
          key: i,
          className: "underline underline-offset-4"
        }, char));
      } else {
        // まだ入力されていない文字
        result.push(React.createElement('span', {
          key: i,
          className: "text-muted-foreground"
        }, char));
      }
    }

    return result;
  };

  const reset = useCallback((includeCounter = false) => {
    setInput("");
    setStartTime(null);
    setShake(false);
    setMistakes(0);
    if (includeCounter) {
      setQuestionCount(0);
      setIsSetFinished(false);
      setSetResults([]);
    }
  }, []);

  const nextText = useCallback(() => {
    if (questionCount + 1 >= TOTAL_QUESTIONS_PER_SET) {
      setIsSetFinished(true);
      setShowResultModal(true);
      return;
    }

    const newText = practiceService.getRandomText(preferences);
    setCurrentText(newText);
    reset();
    setQuestionCount(prev => prev + 1);
  }, [questionCount, preferences, reset]);

  const isComplete = currentText ? input === currentText.text : false;

  // 完了時の処理
  useEffect(() => {
    if (isComplete && startTime) {
      const endTime = Date.now();
      const elapsedTime = (endTime - startTime) / 1000;

      const wpm = calculateWPM(input, elapsedTime);
      const accuracy = calculateAccuracy(input, mistakes);

      const session = {
        textId: currentText?.id,
        startTime,
        endTime,
        input,
        isComplete: true,
        mistakes,
        elapsedTime,
        wpm,
        accuracy,
      };

      practiceService.savePracticeSession(session);

      // 現在の問題の結果をセット結果に追加
      const currentResult = {
        wpm,
        accuracy,
        elapsedTime,
        mistakes,
        textId: currentText?.id || '',
      };

      setSetResults(prev => {
        const newResults = [...prev, currentResult];

        // 3問目が完了した場合、セット全体の結果を計算
        if (newResults.length === TOTAL_QUESTIONS_PER_SET) {
          const setResult = calculateSetResults(newResults);
          setLastResult(setResult);
        }

        return newResults;
      });

      // 自動で次の問題に遷移（少し遅延を入れて結果を確認できるようにする）
      const delayNextText = () => {
        setTimeout(() => {
          nextText();
        }, 500);
      };

      delayNextText();
    }
  }, [isComplete, startTime, currentText?.id, input, mistakes, nextText, calculateSetResults]);

  const closeModal = () => {
    setShowResultModal(false);
    reset(true); // 次のセットに備えて完全リセット
    const newText = practiceService.getRandomText(preferences);
    setCurrentText(newText);
  };

  return {
    currentText,
    input,
    startTime,
    shake,
    mistakes,
    inputRef,
    handleChange,
    renderText,
    reset,
    nextText,
    isComplete,
    questionCount,
    isSetFinished,
    showResultModal,
    closeModal,
    lastResult,
    setResults,
    TOTAL_QUESTIONS_PER_SET,
  };
};

// ユーティリティ関数
const calculateWPM = (text: string, elapsedTime: number): number => {
  const words = text.split(' ').length;
  const minutes = elapsedTime / 60;
  return Math.round(words / minutes);
};

const calculateAccuracy = (text: string, mistakes: number): number => {
  const totalChars = text.length;
  if (totalChars === 0) return 100;
  return Math.round(((totalChars - mistakes) / totalChars) * 100);
};
