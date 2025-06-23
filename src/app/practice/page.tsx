"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";

const sampleText = "console.log('Hello, World!');";

export default function Practice() {
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!startTime) {
      setStartTime(Date.now());
    }
    setInput(e.target.value);
  };

  const renderText = () => {
    return sampleText.split("").map((char, i) => {
      const typedChar = input[i];

      let className = "text-muted-foreground"; // 未入力
      if (typedChar != null) {
        className = typedChar === char ? "text-foreground" : "text-red-500";
      }

      return (
        <span key={i} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div
      className="flex flex-col items-center justify-center gap-6 p-6"
      onClick={() => inputRef.current?.focus()} // 全体クリックでフォーカス
    >
      <h1 className="text-xl font-semibold">タイピング練習</h1>

      <div className="text-lg font-mono whitespace-pre-wrap max-w-xl break-words border rounded-md p-4 w-full min-h-[120px]">
        {renderText()}
      </div>

      {/* 非表示にしてキー入力のみ扱うパターンも可 */}
      <Input
        ref={inputRef}
        value={input}
        onChange={handleChange}
        className="opacity-0 h-0 pointer-events-none absolute"
        autoFocus
      />

      <p className={sampleText.startsWith(input) ? "text-green-600" : "text-red-600"}>
        {input === "" ? "入力を開始してください" :
          sampleText.startsWith(input) ? "正しい入力中…" : "ミスがあります！"}
      </p>
    </div>
  );
}
