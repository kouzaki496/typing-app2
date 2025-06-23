import { useState, useEffect, useRef } from "react";
import React from "react";

export const usePractice = (sampleText: string) => {
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 振動効果をリセット
  useEffect(() => {
    if (shake) {
      const timer = setTimeout(() => {
        setShake(false);
      }, 300); // アニメーションの持続時間（0.3秒）に合わせる
      return () => clearTimeout(timer);
    }
  }, [shake]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value;

    if (!startTime && nextValue.length > 0) {
      setStartTime(Date.now());
    }

    // 入力が期待される文字列の一部かチェック
    if (sampleText.startsWith(nextValue)) {
      setInput(nextValue);
    } else {
      // ミスタイプ時は振動のみ、入力は更新しない
      console.log('ミスタイプ検出:', { nextValue, expected: sampleText.slice(0, nextValue.length) });
      setShake(true);
    }
  };

  const renderText = (): React.ReactNode[] => {
    return sampleText.split("").map((char, i) => {
      if (i < input.length) {
        // 正しく入力された文字
        return React.createElement('span', {
          key: i,
          className: "text-green-600"
        }, char);
      } else if (i === input.length) {
        // 現在のカーソル位置
        return React.createElement('span', {
          key: i,
          className: "underline underline-offset-4"
        }, char);
      } else {
        // まだ入力されていない文字
        return React.createElement('span', {
          key: i,
          className: "text-muted-foreground"
        }, char);
      }
    });
  };

  const reset = () => {
    setInput("");
    setStartTime(null);
    setShake(false);
  };

  const isComplete = input === sampleText;

  return {
    input,
    startTime,
    shake,
    inputRef,
    handleChange,
    renderText,
    reset,
    isComplete,
  };
};
