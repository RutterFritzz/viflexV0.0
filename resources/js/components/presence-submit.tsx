import { useState, useMemo } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogTrigger, DialogDescription, DialogFooter } from "./ui/dialog";
import { Team, PresenceData, Game } from "@/types";
import { CheckIcon, CircleCheck, CircleAlert, XIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";

interface PresenceSubmitProps {
    team: Team;
    game: Game;
    presences: PresenceData;
}

export default function PresenceSubmit({ team, game, presences }: PresenceSubmitProps) {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const { data, setData, post } = useForm({
        presence: presences as any,
        team_id: team.id,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('game.submit-presence', game.id), {
            onSuccess: () => {
                toast.success(t('Aanwezigheid succesvol ingediend'));
                setIsOpen(false);
            },
        });
    }

    // Calculate presence status from form data
    const presenceStatus = useMemo(() => {
        const total = data.presence.coaches.length + data.presence.players.length;
        const presentCount = data.presence.coaches.filter(p => p.present === true).length + data.presence.players.filter(p => p.present === true).length;
        const hasNulls = data.presence.coaches.some(p => p.present === null) || data.presence.players.some(p => p.present === null);
        const allFilled = total > 0 && !hasNulls;

        return {
            total,
            presentCount,
            hasNulls,
            allFilled
        };
    }, [data.presence]);

    const handlePresenceChange = (user_id: number, isPresent: boolean, type: 'coaches' | 'players') => {
        setData('presence', {
            ...data.presence,
            [type]: data.presence[type].map(p =>
                p.user_id === user_id ? { ...p, present: isPresent } : p
            )
        });
    };


    // Always use team.presences for display (trigger button), not form state

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <div className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2 cursor-pointer hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-medium">{team.name}</h3>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                            {presenceStatus.presentCount}/{presenceStatus.total}
                        </span>
                        {presenceStatus.total > 0 && presenceStatus.allFilled ? (
                            <CircleCheck className="h-6 w-6 text-success" />
                        ) : (
                            <CircleAlert className="h-6 w-6 text-warning" />
                        )}
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('Aanwezigheid indeling')}</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    {t('Selecteer de aanwezigheid voor het team')} {team.name}
                </DialogDescription>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2 mb-5 overflow-y-auto max-h-[500px]">
                        {data.presence.coaches.length > 0 && (
                            <>
                                <p className="text-sm text-muted-foreground">{t('Coach')}{data.presence.coaches.length === 1 ? '' : 'es'}</p>
                                {data.presence.coaches.map((coach) => {
                                    const currentValue = data.presence.coaches.find(c => c.user_id === coach.user_id)?.present;
                                    return (
                                        <div key={coach.user_id} className="flex items-center gap-2">
                                            <div className="flex gap-2">
                                                <button type="button" onClick={() => handlePresenceChange(coach.user_id, true, 'coaches')}
                                                    className={`cursor-pointer hover:text-success transition-colors duration-200 border p-2 rounded-md
                                                        ${currentValue === true
                                                            ? 'text-success border-success'
                                                            : 'text-black'
                                                        }`}>
                                                    <CheckIcon className="size-4" />
                                                </button>
                                                <button type="button" onClick={() => handlePresenceChange(coach.user_id, false, 'coaches')}
                                                    className={`cursor-pointer hover:text-destructive transition-colors duration-200 border p-2 rounded-md
                                                        ${currentValue === false
                                                            ? 'text-destructive border-destructive'
                                                            : 'text-black'
                                                        }`}>
                                                    <XIcon className="size-4" />
                                                </button>
                                            </div>
                                            <p>{coach.user.name}</p>
                                        </div>
                                    );
                                })}
                            </>
                        )}

                        {data.presence.players.length > 0 && (
                            <>
                                <p className="text-sm text-muted-foreground">{t('Speler')}{data.presence.players.length === 1 ? '' : 's'}</p>
                                {data.presence.players.map((player) => {
                                    const currentValue = data.presence.players.find(p => p.user_id === player.user_id)?.present;
                                    return (
                                        <div key={player.user_id} className="flex items-center gap-2">
                                            <div className="flex gap-2">
                                                <button type="button" onClick={() => handlePresenceChange(player.user_id, true, 'players')}
                                                    className={`cursor-pointer hover:text-success transition-colors duration-200 border p-2 rounded-md
                                                        ${currentValue === true
                                                            ? 'text-success border-success'
                                                            : 'text-black'
                                                        }`}>
                                                    <CheckIcon className="size-4" />
                                                </button>
                                                <button type="button" onClick={() => handlePresenceChange(player.user_id, false, 'players')}
                                                    className={`cursor-pointer hover:text-destructive transition-colors duration-200 border p-2 rounded-md
                                                        ${currentValue === false
                                                            ? 'text-destructive border-destructive'
                                                            : 'text-black'
                                                        }`}>
                                                    <XIcon className="size-4" />
                                                </button>
                                            </div>
                                            <p>{player.user.name}</p>
                                        </div>
                                    );
                                })}
                            </>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsOpen(false)} type="button">
                            {t('Annuleren')}
                        </Button>
                        <Button type="submit">
                            {t('Verzenden')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}