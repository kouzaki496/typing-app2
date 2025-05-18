"use client";

import { useState, useEffect } from "react";

const sampleText = "console.log('Hello, World!');";

export default function Practice() {
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!startTime) {
      setStartTime(Date.now());
    }
    setInput(e.target.value);
  };

  const isCorrect = sampleText.startsWith(input);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-xl font-semibold">タイピング練習</h1>
      <p className="text-lg">{sampleText}</p>
      <input
        value={input}
        onChange={handleChange}
        className="border px-4 py-2 w-full max-w-md"
        placeholder="ここに入力"
      />
      <p className={isCorrect ? "text-green-600" : "text-red-600"}>
        {isCorrect ? "正しい入力中…" : "ミスがあります！"}
      </p>
    </div>
  )

}