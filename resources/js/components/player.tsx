import { Trash, UserIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Team, User } from "@/types";
import { router } from "@inertiajs/react";

export default function Player({ player, edit = false, team }: { player: User, edit?: boolean, team?: Team }) {
    const { t } = useTranslation();

    const handlePlayerDelete = (player: User) => {
        if (!team) return;
        router.delete(route('team.remove-player', [team.id, player.id]), {
            preserveScroll: true,
            onSuccess: () => {
                router.reload();
            }
        });
    }
    return (
        <div className="flex p-2 border rounded-lg justify-between">
            <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-secondary/50 flex items-center justify-center">
                    <UserIcon className="h-4 w-4" />
                </div>
                <span className="font-medium">{player.name}</span>
            </div>
            <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">{t('player')}</Badge>
                {edit && (
                    <Button variant="ghost" size="sm" className="text-xs hover:bg-transparent hover:text-destructive cursor-pointer" onClick={() => { handlePlayerDelete(player) }}>
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    )
}