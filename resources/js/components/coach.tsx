import { Crown, Trash } from "lucide-react";
import { Badge } from "./ui/badge";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Team, User } from "@/types";
import { router } from "@inertiajs/react";

export default function Coach({ coach, edit = false, team }: { coach: User, edit?: boolean, team?: Team }) {
    const { t } = useTranslation();
    const handleCoachDelete = (coach: User) => {
        if (!team) return;
        router.delete(route('team.remove-coach', [team.id, coach.id]));
    }
    return (
        <div className="flex p-2 border rounded-lg justify-between">
            <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Crown className="h-4 w-4 text-primary" />
                </div>
                <span className="font-medium">{coach.name}</span>
            </div>
            <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">{t('coach')}</Badge>
                {edit && (
                    <Button variant="ghost" size="sm" className="text-xs hover:bg-transparent hover:text-destructive cursor-pointer" onClick={() => { handleCoachDelete(coach) }}>
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    )
}