import { User } from "lucide-react";
import { Badge } from "./ui/badge";
import { useTranslation } from "react-i18next";
export default function Player({ name }: { name: string }) {
    const { t } = useTranslation();
    return (
        <div className="flex items-center gap-3 p-2 border rounded-lg">
            <div className="h-8 w-8 rounded-full bg-secondary/50 flex items-center justify-center">
                <User className="h-4 w-4" />
            </div>
            <span className="font-medium">{name}</span>
            <Badge variant="outline" className="ml-auto text-xs">{t('player')}</Badge>
        </div>
    )
}