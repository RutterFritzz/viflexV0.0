import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Club, Team, TeamValue, Role } from "@/types";
import { Link } from "@inertiajs/react";
import Search from "@/components/search";
import DeleteConfirmation from "@/components/delete-confirmation";
import axios from "axios";
import { useEffect, useState } from "react";
import { Users, Building2, ArrowLeft, Edit, Trash2, UserPlus, Crown, User, X } from "lucide-react";
import Coach from "@/components/coach";
import Player from "@/components/player";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AddValue } from "./Components/AddValue";
import { Badge } from "@/components/ui/badge";
import { AddUser } from "./Components/AddUser";

interface ShowProps {
    team: Team;
    club: Club;
    roles: Role[];
}

export default function Show({ team, club, roles }: ShowProps) {
    const { t } = useTranslation();
    const [dialogOpen, setDialogOpen] = useState(false);
    const csrf_token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    const handleUserSelect = (userId: number) => {
        const csrf_token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
        axios.post(route('team.add-player', team.id), {
            user_id: userId,
            team_id: team.id,
            role_id: 1,
        }, {
            headers: {
                'X-CSRF-TOKEN': csrf_token
            }
        })
    }

    const handleCoachSelect = (userId: number) => {
        const csrf_token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
        axios.post(route('team.add-coach', team.id), {
            user_id: userId,
            team_id: team.id,
            role_id: 2,
        }, {
            headers: {
                'X-CSRF-TOKEN': csrf_token
            }
        })
    }

    const handleTeamValueDelete = (teamValue: TeamValue) => {
        axios.delete(route('team.teamValue.destroy', [team, teamValue]));
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('club.show', club.id)}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            {t('backToClub')}
                        </Link>
                    </Button>
                </div>

                <div className="flex items-center space-x-4">

                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <Users className="h-8 w-8" />
                            {team.name}
                        </h1>
                        <p className="text-muted-foreground flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            {t('partOf')} <Link href={route('club.show', club.id)} className="font-medium hover:text-primary transition-colors">{club.name}</Link>
                        </p>
                    </div>

                    {(team.logo) && (
                        <div className="relative h-auto w-auto max-w-12 overflow-hidden mb-2">
                            <img src={String(team.logo_cache)} alt="Preview" className="object-cover" />
                        </div>
                    )}
                </div>
            </div>

            <Separator />

            {/* Team Members Section */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Coaches */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Crown className="h-5 w-5" />
                            {t('coaches')}
                        </CardTitle>
                        <CardDescription>
                            {team.coaches?.length === 0
                                ? t('noCoachesAssignedYet')
                                : `${team.coaches?.length} ${team.coaches?.length === 1 ? t('coach') : t('coaches')} ${t('managingThisTeam')}`
                            }
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {!team.coaches || team.coaches.length === 0 ? (
                            <div className="text-center py-6 text-muted-foreground">
                                <Crown className="h-10 w-10 mx-auto mb-3 opacity-50" />
                                <p className="text-sm">{t('noCoachesYet')}</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {team.coaches.map((coach) => (
                                    <Coach key={coach.id} name={coach.name} />
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Players */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            {t('players')}
                        </CardTitle>
                        <CardDescription>
                            {team.players?.length === 0
                                ? t('noPlayersAssignedYet')
                                : `${team.players?.length} ${team.players?.length === 1 ? t('player') : t('players')} ${t('onThisTeam')}`
                            }
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {!team.players || team.players.length === 0 ? (
                            <div className="text-center py-6 text-muted-foreground">
                                <User className="h-10 w-10 mx-auto mb-3 opacity-50" />
                                <p className="text-sm">{t('noPlayersYet')}</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {team.players.map((player) => (
                                    <Player key={player.id} name={player.name} />
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Add Player Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <UserPlus className="h-5 w-5" />
                        {t('addPlayer')}
                    </CardTitle>
                    <CardDescription>
                        {t('searchForUsersToAddAsPlayersToThisTeam')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Search onSelect={handleUserSelect} type="user" />
                </CardContent>
            </Card>

            {/* Add Coach Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Crown className="h-5 w-5" />
                        {t('addCoach')}
                    </CardTitle>
                    <CardDescription>
                        {t('searchForUsersToAddAsCoachesToThisTeam')}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <AddUser team={team} roles={roles} />
                </CardContent>
            </Card>

            {/* Add Velden Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Crown className="h-5 w-5" />
                        Velden
                    </CardTitle>
                    <CardDescription>
                       <AddValue team={team} />
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-4">
                        { team?.values?.map((tv) => (
                            <div key={tv.id} className="group flex items-center w-fit">
                                <p>{tv.value}</p>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="opacity-0 group-hover:opacity-100 hover:bg-transparent transition-opacity"
                                    onClick={ e => { handleTeamValueDelete(tv) }}
                                >
                                    <X className="h-4 w-4 text-muted-foreground hover:text-destructive cursor-pointer" />
                                </Button>
                            </div>
                        ))}
                    </div>
                    {/* <Search onSelect={handleCoachSelect} type="user" /> */}
                </CardContent>
            </Card>

            {/* Actions Section */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('teamActions')}</CardTitle>
                    <CardDescription>
                        {t('manageTeamSettingsAndNavigation')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-3">
                        <Button asChild variant="default">
                            <Link href={route('team.edit', team.id)}>
                                <Edit className="h-4 w-4 mr-2" />
                                {t('editTeam')}
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href={route('team.index')}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                {t('backToTeams')}
                            </Link>
                        </Button>
                        <Button variant="destructive" size="sm" className="ml-auto"
                            onClick={(e) => {
                                e.preventDefault();
                                setDialogOpen(true);
                            }}
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            {t('deleteTeam')}
                        </Button>
                        <DeleteConfirmation dialogOpen={dialogOpen} type="team" name={team.name} onOpenChange={setDialogOpen} id={team.id} />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
