import { SiJavascript, SiTypescript, SiPython } from "react-icons/si";
import { JSX } from "react";

// https://simpleicons.org/?q=python

export type LanguageKey = "javascript" | "typescript" | "python"; // 追加していける

export const languageOptions: {
  key: LanguageKey;
  name: string;
  icon: JSX.Element;
}[] = [
  {
    key: "javascript",
    name: "JavaScript",
    icon: <SiJavascript size={32} color="#f7df1e" />,
  },
  {
    key: "typescript",
    name: "TypeScript",
    icon: <SiTypescript size={32} color="#3178c6" />,
  },
  {
    key: "python",
    name: "Python",
    icon: <SiPython size={32} color="#3776ab" />,
  },
];