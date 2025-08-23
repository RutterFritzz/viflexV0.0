import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogTrigger, DialogDescription, DialogFooter } from "./ui/dialog";
import { Team, PresenceData } from "@/types";
import { CheckIcon, Loader2, XIcon } from "lucide-react";
import axios from "axios";

interface PresenceSubmitProps {
    children: React.ReactNode;
    team: Team;
    onSubmit: (team: Team, presenceData: PresenceData) => void;
}

export default function PresenceSubmit({ children, team, onSubmit }: PresenceSubmitProps) {
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
        if (isOpen) {
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
    }, [isOpen, allCoaches.length, allPlayers.length, team.id]);

    const allMembers = [...allCoaches, ...allPlayers];

    const isFormValid = allMembers.length > 0 &&
    allCoaches.every(coach => presenceData.coaches[coach.id.toString()] !== undefined) &&
    allPlayers.every(player => presenceData.players[player.id.toString()] !== undefined);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Presence Submit</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Please select the presence for the team {team.name}
                </DialogDescription>
                {isLoading && (
                    <div className="flex justify-center items-center h-full">
                        <Loader2 className="size-4 animate-spin" />
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2 mb-5">
                        {allCoaches.length > 0 && (
                            <>
                                <p className="text-sm text-muted-foreground">Coach{allCoaches.length === 1 ? '' : 'es'}</p>
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
                                <p className="text-sm text-muted-foreground">Players</p>
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
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading || isFormValid}>
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}