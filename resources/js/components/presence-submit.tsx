import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogTrigger, DialogDescription, DialogFooter } from "./ui/dialog";
import { Team, PresenceData } from "@/types";
import { CheckIcon, CircleCheck, CircleAlert, Loader2, XIcon } from "lucide-react";
import axios from "axios";
import { useTranslation } from "react-i18next";

interface PresenceSubmitProps {
    team: Team;
    onSubmit: (team: Team, presenceData: PresenceData) => void;
    presences?: boolean;
    disabled?: boolean;
}

export default function PresenceSubmit({ team, onSubmit, presences, disabled = false }: PresenceSubmitProps) {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [allCoaches, setAllCoaches] = useState<{ id: number, name: string }[]>([]);
    const [allPlayers, setAllPlayers] = useState<{ id: number, name: string }[]>([]);
    const [presenceData, setPresenceData] = useState<PresenceData>({
        coaches: {},
        players: {}
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isFormValid) {
            return;
        }
        onSubmit(team, presenceData);
        setIsOpen(false);
        setPresenceData({ coaches: {}, players: {} });
    }

    const handlePresenceChange = (userId: string, isPresent: boolean, type: 'coaches' | 'players') => {
        setPresenceData(prev => ({
            ...prev,
            [type]: {
                ...prev[type],
                [userId]: isPresent
            }
        }));
    };

    useEffect(() => {
        if (isOpen && !disabled) {
            if (allCoaches.length === 0 && allPlayers.length === 0) {
                setIsLoading(true);
                axios.get(route('team.get-members', team.id))
                    .then(response => {
                        setAllCoaches(response.data.coaches);
                        setAllPlayers(response.data.players);
                        setIsLoading(false);
                    });
            }
        }
    }, [isOpen, allCoaches.length, allPlayers.length, team.id, disabled]);

    const allMembers = [...allCoaches, ...allPlayers];

    const isFormValid = allMembers.length > 0 &&
        allCoaches.every(coach => presenceData.coaches[coach.id.toString()] !== undefined) &&
        allPlayers.every(player => presenceData.players[player.id.toString()] !== undefined);

    return (
        <Dialog open={isOpen && !disabled} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <div className={`border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2 ${presences ? 'text-muted-foreground border-muted' : 'cursor-pointer hover:shadow-md transition-shadow'}`}>
                    <h3 className="text-lg font-medium">{team.name}</h3>
                    <div className="flex flex-col gap-2">
                        {presences ? (
                            <CircleCheck className="h-6 w-6 text-success" />
                        ) : (
                            <CircleAlert className="h-6 w-6 text-warning" />
                        )}
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('presenceSubmit')}</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    {t('pleaseSelectThePresenceForTheTeam')} {team.name}
                </DialogDescription>
                {isLoading && (
                    <div className="flex justify-center items-center h-full">
                        <Loader2 className="size-4 animate-spin" />
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2 mb-5 overflow-y-auto max-h-[500px]">
                        {allCoaches.length > 0 && (
                            <>
                                <p className="text-sm text-muted-foreground">{t('coach')}{allCoaches.length === 1 ? '' : 'es'}</p>
                                {allCoaches.map((coach) => (
                                    <div key={coach.id} className="flex items-center gap-2">
                                        <div className="flex gap-2">
                                            <button type="button" onClick={() => handlePresenceChange(coach.id.toString(), true, 'coaches')}
                                                className={`cursor-pointer hover:text-success transition-colors duration-200 border p-2 rounded-md
                                                    ${presenceData.coaches[coach.id.toString()] === true
                                                        ? 'text-success border-success'
                                                        : 'text-black'
                                                    }`}>
                                                <CheckIcon className="size-4" />
                                            </button>
                                            <button type="button" onClick={() => handlePresenceChange(coach.id.toString(), false, 'coaches')}
                                                className={`cursor-pointer hover:text-destructive transition-colors duration-200 border p-2 rounded-md
                                                    ${presenceData.coaches[coach.id.toString()] === false
                                                        ? 'text-destructive border-destructive'
                                                        : 'text-black'
                                                    }`}>
                                                <XIcon className="size-4" />
                                            </button>
                                        </div>
                                        <p>{coach.name}</p>
                                    </div>
                                ))}
                            </>
                        )}

                        {allPlayers.length > 0 && (
                            <>
                                <p className="text-sm text-muted-foreground">{t('player')}{allPlayers.length === 1 ? '' : 's'}</p>
                                {allPlayers.map((player) => (
                                    <div key={player.id} className="flex items-center gap-2">
                                        <div className="flex gap-2">
                                            <button type="button" onClick={() => handlePresenceChange(player.id.toString(), true, 'players')}
                                                className={`cursor-pointer hover:text-success transition-colors duration-200 border p-2 rounded-md
                                                    ${presenceData.players[player.id.toString()] === true
                                                        ? 'text-success border-success'
                                                        : 'text-black'
                                                    }`}>
                                                <CheckIcon className="size-4" />
                                            </button>
                                            <button type="button" onClick={() => handlePresenceChange(player.id.toString(), false, 'players')}
                                                className={`cursor-pointer hover:text-destructive transition-colors duration-200 border p-2 rounded-md
                                                    ${presenceData.players[player.id.toString()] === false
                                                        ? 'text-destructive border-destructive'
                                                        : 'text-black'
                                                    }`}>
                                                <XIcon className="size-4" />
                                            </button>
                                        </div>
                                        <p>{player.name}</p>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsOpen(false)} type="button">
                            {t('cancel')}
                        </Button>
                        <Button type="submit" disabled={isLoading || !isFormValid || disabled}>
                            {t('submit')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}