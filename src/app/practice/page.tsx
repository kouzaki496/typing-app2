"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";

const sampleText = "console.log('Hello, World!');";

export default function Practice() {
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

  const renderText = () => {
    return sampleText.split("").map((char, i) => {
      if (i < input.length) {
        // 正しく入力された文字
        return (
          <span key={i} className="text-green-600">
            {char}
          </span>
        );
      } else if (i === input.length) {
        // 現在のカーソル位置
        return (
          <span key={i} className="underline underline-offset-4">
            {char}
          </span>
        );
      } else {
        // まだ入力されていない文字
        return (
          <span key={i} className="text-muted-foreground">
            {char}
          </span>
        );
      }
    });
  };

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
      <h1 className="text-xl font-semibold">タイピング練習</h1>

      <div className="text-lg font-mono whitespace-pre-wrap max-w-xl break-words border rounded-md p-4 w-full min-h-[120px]">
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

      <p className={sampleText.startsWith(input) ? "text-green-600" : "text-red-600"}>
        {input === ""
          ? "入力を開始してください"
          : sampleText.startsWith(input)
          ? "正しい入力中…"
          : "ミスがあります！"}
      </p>

      {/* デバッグ用：振動状態を表示 */}
      {/* <p className="text-xs text-gray-500">
        振動状態: {shake ? "ON" : "OFF"} | 入力: "{input}" | 期待: "{sampleText.slice(0, input.length)}"
      </p> */}
    </div>
  );
}
