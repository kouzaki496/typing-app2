"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";

const sampleText = "console.log('Hello, World!');";

export default function Practice() {
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value;

    if (!startTime && nextValue.length > 0) {
      setStartTime(Date.now());
    }

    const expected = sampleText.slice(0, nextValue.length);

    if (nextValue === expected) {
      setInput(nextValue);
    }
  };

  const renderText = () => {
    return sampleText.split("").map((char, i) => {
      const typedChar = input[i];

      if (i < input.length) {
        // 入力済 → 緑
        return (
          <span key={i} className="text-green-600">
            {char}
          </span>
        );
      } else if (i === input.length) {
        // 次に打つ文字 → 下線
        return (
          <span key={i} className="underline underline-offset-4">
            {char}
          </span>
        );
      } else {
        // 未入力 → グレー
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
      className="flex flex-col items-center justify-center gap-6 p-6"
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
    </div>
  );
}
