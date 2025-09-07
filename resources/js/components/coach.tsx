import { Crown } from "lucide-react";
import { Badge } from "./ui/badge";
import { useTranslation } from "react-i18next";

export default function Coach({ name }: { name: string }) {
    const { t } = useTranslation();
    return (
        <div className="flex items-center gap-3 p-2 border rounded-lg">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Crown className="h-4 w-4 text-primary" />
            </div>
            <span className="font-medium">{name}</span>
            <Badge variant="secondary" className="ml-auto text-xs">{t('coach')}</Badge>
        </div>
    )
}