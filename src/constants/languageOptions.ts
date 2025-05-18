export type LanguageKey = "javascript" | "typescript" | "python"; // 追加していける

export type LanguageOption = {
  key: LanguageKey;
  name: string;
  icon: string;
};

export const languageOptions: LanguageOption[] = [
  { key: "javascript", name: "JavaScript", icon: "💻" },
  { key: "typescript", name: "TypeScript", icon: "🐋" },
  { key: "python", name: "Python", icon: "🐍" },
];
