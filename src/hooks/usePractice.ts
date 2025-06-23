import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/data/questions";
import { isCorrectInput, isCompletelyCorrect } from "@/lib/typing/validation";
import { recordTyping, TypingStats } from "@/lib/typing/recordTyping";

const TOTAL_QUESTIONS_TO_FINISH = 3;

export const usePractice = () => {
  const router = useRouter();
  const totalCount = Math.min(questions.length, TOTAL_QUESTIONS_TO_FINISH);
  const maxIndex = totalCount - 1;
  const [isCorrect, setIsCorrect] = useState(false);
  const [isCompleteAndCorrect, setIsCompleteAndCorrect] = useState(false);

  const [input, setInput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);

  // ランダムに選択された問題の配列
  const [selectedQuestions, setSelectedQuestions] = useState<typeof questions>([]);

  const currentQuestion = selectedQuestions[currentIndex] || questions[0];

  const [typingStats, setTypingStats] = useState<TypingStats>({
    totalTyped: 0,
    totalMistyped: 0,
    mistypedChars: [],
  });

  // ランダムに問題を選択
  useEffect(() => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setSelectedQuestions(shuffled.slice(0, totalCount));
  }, [totalCount]);

  const handleChange = (value: string) => {
    if (!startTime) setStartTime(Date.now());

    const index = value.length - 1;

    // 入力が空か、期待される文字数を超えた場合はスキップ
    if (index < 0 || index >= currentQuestion.text.length) {
      setInput(value);
      setIsCorrect(isCorrectInput(value, currentQuestion.text));
      setIsCompleteAndCorrect(isCompletelyCorrect(value, currentQuestion.text));
      return;
    }

    // タイプミスの判定
    const expectedChar = currentQuestion.text[index];
    const actualChar = value[index];
    const isMistyped = actualChar !== expectedChar;

    setTypingStats((prev) => ({
      totalTyped: prev.totalTyped + 1,
      totalMistyped: prev.totalMistyped + (isMistyped ? 1 : 0),
      mistypedChars: isMistyped
        ? [...prev.mistypedChars, expectedChar]
        : prev.mistypedChars,
    }));

    setIsCorrect(isCorrectInput(value, currentQuestion.text));
    setIsCompleteAndCorrect(isCompletelyCorrect(value, currentQuestion.text));
    setInput(value);
  };

  const goToNext = () => {
    if (currentIndex >= maxIndex) {
      setShowResult(true);
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setInput("");
    setStartTime(null);
  };

  const handleSkip = () => goToNext();
  const handleEnd = () => setShowResult(true);
  const handleClose = () => router.push("/");

  const resetState = () => {
    setCurrentIndex(0);
    setInput("");
    setStartTime(null);
    setShowResult(false);
    setCorrectCount(0);
    setTotalElapsedTime(0);
    // 新しいランダムな問題セットを選択
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setSelectedQuestions(shuffled.slice(0, totalCount));
    setTypingStats({
      totalTyped: 0,
      totalMistyped: 0,
      mistypedChars: [],
    });
  };

  const handleRetry = () => resetState();

  useEffect(() => {
    // 完全一致していない場合は処理しない
    if (!isCompleteAndCorrect) return;

    // 経過時間を計測
    const elapsed = startTime ? (Date.now() - startTime) / 1000 : 0;
    setTotalElapsedTime((prev) => prev + elapsed);

    // 打鍵情報を記録
    const stats = recordTyping(input, currentQuestion.text);
    setTypingStats((prev) => ({
      totalTyped: prev.totalTyped + stats.totalTyped,
      totalMistyped: prev.totalMistyped + stats.totalMistyped,
      mistypedChars: [...prev.mistypedChars, ...stats.mistypedChars],
    }));

    // 正答数を更新
    setCorrectCount((prev) => prev + 1);

    const timeout = setTimeout(goToNext, 500);
    return () => clearTimeout(timeout);
  }, [isCompleteAndCorrect]);

  return {
    input,
    handleChange,
    currentQuestion,
    isCorrect,
    isCompleteAndCorrect,
    showResult,
    correctCount,
    totalCount,
    totalElapsedTime,
    handleSkip,
    handleEnd,
    handleClose,
    handleRetry,
    typingStats,
  };
};
