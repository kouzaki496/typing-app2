import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/";
import { ReactNode } from "react";


type LanguageCardProps = {
  icon: ReactNode;
  name: string;
  selected?: boolean;
  onClick: () => void;
}

export default function LanguageCard({ icon, name, onClick }: LanguageCardProps) {
  return (
    <Card onClick={onClick}  className="cursor-pointer hover:shadow-lg transition py-2">
      <CardContent className="flex items-center gap-4 p-4">
        <div className="text-2xl">{icon}</div>
        <div className="text-lg font-medium">{name}</div>
      </CardContent>
    </Card>
  )
}
