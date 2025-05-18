"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/";
import { Button, RadioGroup, RadioGroupItem } from "@/components/ui/";
import LanguageCard from "@/components/languageCard";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (lang: string) => void;
}

const languages = [
  { name: "JavaScript", icon: "💻" },
  { name: "TypeScript", icon: "🧠" },
  { name: "Python", icon: "🐍" },
];

export default function LanguageSelectModal({
  open,
  onClose,
  onSelect,
}: Props) {

  // 選択された言語を管理する
  const [selected, setSelected] = useState<string>(languages[0].name);

  // 選択された言語を確定する
  const handleConfirm = () => {
    onSelect(selected);
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>言語を選んでください</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {languages.map((lang) => (
            <LanguageCard
              key={lang.name}
              name={lang.name}
              icon={lang.icon}
              selected={selected === lang.name}
              onClick={() => setSelected(lang.name)}
            />
          ))}
        </div>
        <Button onClick={handleConfirm} className="mt-4 w-full">
          決定
        </Button>
      </DialogContent>
    </Dialog>
  );
}

