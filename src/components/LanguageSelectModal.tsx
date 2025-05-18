import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LanguageSelectModal({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>言語を選んでください</DialogTitle>
        </DialogHeader>
        {/* あとで言語選択UIを追加 */}
        <p>ここに言語選択UIが入ります（例: JavaScript, Python...）</p>
      </DialogContent>
    </Dialog>
  );
}

