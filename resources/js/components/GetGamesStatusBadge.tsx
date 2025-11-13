import { Game } from "@/types";
import { Badge } from "./ui/badge";
import { useTranslation } from "react-i18next";

export default function GetGamesStatusBadge({ game }: { game: Game }) {
    const { t } = useTranslation();
    const gameDate = new Date(game.gameday?.date || '');
    const today = new Date();
    const diffTime = gameDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
        return <Badge variant="secondary">{t('completed')}</Badge>;
    } else if (diffDays === 0) {
        return <Badge variant="destructive">{t('today')}</Badge>;
    } else if (diffDays <= 7) {
        return <Badge variant="default">{t('upcoming')}</Badge>;
    } else {
        return <Badge variant="outline">{t('scheduled')}</Badge>;
    }
}