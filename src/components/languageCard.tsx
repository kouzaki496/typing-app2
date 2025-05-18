import { Card, CardContent } from "@/components/ui/";
import { ReactNode } from "react";
import { cn } from "@/utils/utils";


type LanguageCardProps = {
  icon: ReactNode;
  name: string;
  selected: boolean;
  onClick: () => void;
}

export default function LanguageCard({ icon, name, selected, onClick }: LanguageCardProps) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "cursor-pointer transition border-2 py-2",
        selected ? "border-primary bg-muted" : "border-transparent"
      )}
    >
      <CardContent className="flex items-center gap-4 p-4">
        <div className="text-2xl">{icon}</div>
        <div className="text-lg font-medium">{name}</div>
      </CardContent>
    </Card>
  )
}
