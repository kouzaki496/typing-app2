"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/";
import { Button } from "@/components/ui/";
import LanguageCard from "@/components/languageCard";
import { languageOptions, LanguageKey } from "@/constants/languageOptions";
import { useState, useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (lang: LanguageKey) => void;
  currentLanguage?: LanguageKey;
}

/**
 * 言語選択モーダル
 * @param open モーダルが開いているかどうか
 * @param onClose モーダルを閉じる
 * @param onSelect 選択された言語を確定する
 * @param currentLanguage 現在選択されている言語
 */
export default function LanguageSelectModal({
  open,
  onClose,
  onSelect,
  currentLanguage = 'javascript',
}: Props) {

  const [selected, setSelected] = useState<LanguageKey>(currentLanguage);

  // モーダルが開かれたときに現在の言語を選択状態に設定
  useEffect(() => {
    if (open) {
      setSelected(currentLanguage);
    }
  }, [open, currentLanguage]);

  // 選択された言語を確定する
  const handleConfirm = () => {
    console.log('LanguageSelectModal: Confirming selection:', selected);

    // 即座にローカルストレージに保存
    localStorage.setItem('selectedLanguage', selected);
    console.log('LanguageSelectModal: Saved to localStorage:', selected);

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

