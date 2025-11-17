import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Category, Role, Team } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { Users, Save, Edit2, User, Crown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import DeleteDialog from "@/components/Assets/DeleteDialog";
import Header from "@/components/Admin/Header";
import { AddUser } from "./AddUser";
import Player from "@/components/player";
import Coach from "@/components/coach";
import { Separator } from "@/components/ui/separator";

export default function PlayersTab({team, roles}: {team: Team, roles: Role[]}) {
    const { t } = useTranslation();

    const [coaches, setCoaches] = useState<any[]>([]);
    const [players, setPlayers] = useState<any[]>([]);

    useEffect(() => {
        // setCoaches(team.players)
        setPlayers(team?.players ?? [])
        setCoaches(team?.coaches ?? [])
    }, [team])

    console.log(team);

    return (
         <div className="grid">
            {/* Coaches */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        {t('Team leden')}
                    </CardTitle>
                    <CardDescription>
                        <span>
                            {coaches?.length} {coaches?.length === 1 ? t('Coach') : t('coaches')}.{' '}
                        </span>
                        <span>
                        {players?.length} {players?.length === 1 ? t('Speler') : t('spelers')}.
                        </span>
                        <Separator />
                    </CardDescription>
                </CardHeader>
                <CardContent>

                    <AddUser team={team} roles={roles} />

                    {/* Coaches header */}
                    <div className="mb-2">
                        <div className="flex items-center gap-2 font-semibold">
                            <Crown className="h-5 w-5" />
                            {t('coaches')}
                        </div>
                        <div className="text-muted-foreground text-sm">
                            {coaches?.length === 0
                                ? t('Geen coaches toegewezen')
                                : `${coaches?.length} ${coaches?.length === 1 ? t('Coach') : t('coaches')} ${t('beheert dit team.')}`
                            }
                        </div>
                    </div>

                    {/* Coaches list */}
                    {!coaches || coaches.length === 0 ? (
                        <div className="text-center py-6 text-muted-foreground">
                            <Crown className="h-10 w-10 mx-auto mb-3 opacity-50" />
                            <p className="text-sm">{t('Geen coaches')}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-2">
                            {coaches.map((coach) => (
                                <Coach key={coach.id} coach={coach} edit={true} />
                            ))}
                        </div>
                    )}

                    {/* Players header */}
                    <div className="my-2">
                        <div className="flex items-center gap-2 font-semibold">
                            <User className="h-5 w-5" />
                            {t('spelers')}
                        </div>
                        <div className="text-muted-foreground text-sm">
                            {players?.length === 0
                                ? t('Geen spelers toegewezen')
                                : `${players?.length} ${players?.length === 1 ? t('Speler') : t('spelers')} ${t('op dit team.')}`
                            }
                        </div>
                    </div>

                    {/* Players list */}
                    {!players || players.length === 0 ? (
                        <div className="text-center py-6 text-muted-foreground">
                            <User className="h-10 w-10 mx-auto mb-3 opacity-50" />
                            <p className="text-sm">{t('Geen spelers')}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-2">
                            {players.map((player) => (
                                <Player key={player.id} player={player} edit={true} />
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
