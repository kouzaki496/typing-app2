"use client";

import { Input } from "@/components/ui/input";
import { usePractice } from "@/hooks/usePractice";

const sampleText = "console.log('Hello, World!');";

export default function Practice() {
  const {
    input,
    shake,
    inputRef,
    handleChange,
    renderText,
  } = usePractice(sampleText);

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
