"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/";
import { Button, RadioGroup, RadioGroupItem } from "@/components/ui/";
import LanguageCard from "@/components/languageCard";
import { languageOptions, LanguageKey } from "@/constants/languageOptions";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (lang: LanguageKey) => void;
}

export default function LanguageSelectModal({
  open,
  onClose,
  onSelect,
}: Props) {

  // 選択された言語を管理する
  const [selected, setSelected] = useState<LanguageKey>(languageOptions[0].key);

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
          {languageOptions.map((lang) => (
            <LanguageCard
              key={lang.key}
              name={lang.name}
              icon={lang.icon}
              selected={selected === lang.key}
              onClick={() => setSelected(lang.key)}
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

