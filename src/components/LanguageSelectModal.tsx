"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/";
import { Button, RadioGroup, RadioGroupItem } from "@/components/ui/";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (lang: string) => void;
}

const languages = ["JavaScript", "TypeScript", "Python"];

export default function LanguageSelectModal({
  open,
  onClose,
  onSelect,
}: Props) {

  const [selected, setSelected] = useState<string>(languages[0]);

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
        <RadioGroup value={selected} onValueChange={setSelected}>
          {languages.map((lang) => (
            <div key={lang} className="flex items-center space-x-2">
              <RadioGroupItem value={lang} id={lang} />
              <label htmlFor={lang}>{lang}</label>
            </div>
          ))}
        </RadioGroup>
        <Button onClick={handleConfirm} className="mt-4 w-full">
          決定
        </Button>
      </DialogContent>
    </Dialog>
  );
}

