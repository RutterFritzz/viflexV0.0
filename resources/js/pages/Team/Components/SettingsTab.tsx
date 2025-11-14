import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Role, Team, TeamValue } from "@/types";
import { Link, router } from "@inertiajs/react";
import DeleteConfirmation from "@/components/delete-confirmation";
import { ArrowLeft, Edit, Trash2, UserPlus, Crown, User, X, Users } from "lucide-react";
import Coach from "@/components/coach";
import Player from "@/components/player";
import { useTranslation } from "react-i18next";
import { AddValue } from "./AddValue";
import { AddUser } from "./AddUser";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
export default function Settings({ team, roles }: { team: Team, roles: Role[] }) {
    const { t } = useTranslation();
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleTeamValueDelete = (teamValue: TeamValue) => {
        router.delete(route('team.teamValue.destroy', [team, teamValue]), {
            preserveScroll: true,
        });
    }

    return (
        <div className="space-y-4">
            {/* Team Members Section */}
            <div className="grid">
                {/* Coaches */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            {t('Team leden')}
                        </CardTitle>
                        <CardDescription>
                            {t('Beheer team leden')}
                            <Separator />
                        </CardDescription>
                    </CardHeader>
                    <CardContent>

                        {/* Coaches header */}
                        <div className="mb-2">
                            <div className="flex items-center gap-2 font-semibold">
                                <Crown className="h-5 w-5" />
                                {t('coaches')}
                            </div>
                            <div className="text-muted-foreground text-sm">
                                {team?.coaches?.length === 0
                                    ? t('Geen coaches toegewezen')
                                    : `${team?.coaches?.length} ${team?.coaches?.length === 1 ? t('Coach') : t('coaches')} ${t('beheert dit team.')}`
                                }
                            </div>
                        </div>

                        {/* Coaches list */}
                        {!team?.coaches || team?.coaches.length === 0 ? (
                            <div className="text-center py-6 text-muted-foreground">
                                <Crown className="h-10 w-10 mx-auto mb-3 opacity-50" />
                                <p className="text-sm">{t('Geen coaches')}</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-2">
                                {team?.coaches.map((coach) => (
                                    <Coach key={coach.id} coach={coach} edit={true} team={team} />
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
                                {team?.players?.length === 0
                                    ? t('Geen spelers toegewezen')
                                    : `${team?.players?.length} ${team?.players?.length === 1 ? t('Speler') : t('spelers')} ${t('op dit team.')}`
                                }
                            </div>
                        </div>

                        {/* Players list */}
                        {!team?.players || team?.players.length === 0 ? (
                            <div className="text-center py-6 text-muted-foreground">
                                <User className="h-10 w-10 mx-auto mb-3 opacity-50" />
                                <p className="text-sm">{t('Geen spelers')}</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-2">
                                {team?.players.map((player) => (
                                    <Player key={player.id} player={player} edit={true} team={team} />
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Add User Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <UserPlus className="h-5 w-5" />
                        {t('Voeg gebruiker toe')}
                    </CardTitle>
                    <CardDescription>
                        {t('Zoek naar gebruikers om ze toe te voegen aan dit team.')}
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
                        {t('values')}
                    </CardTitle>
                    <CardDescription>
                        <AddValue team={team} />
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-4">
                        {team?.values?.map((tv) => (
                            <div key={tv.id} className="group flex items-center w-fit">
                                <p>{tv.value}</p>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="opacity-0 group-hover:opacity-100 hover:bg-transparent transition-opacity"
                                    onClick={() => { handleTeamValueDelete(tv) }}
                                >
                                    <X className="h-4 w-4 text-muted-foreground hover:text-destructive cursor-pointer" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Actions Section */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('Team acties')}</CardTitle>
                    <CardDescription>
                        {t('Beheer team instellingen en navigatie.')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-3">
                        <Button asChild variant="default">
                            <Link href={route('team.edit', [team])}>
                                <Edit className="h-4 w-4 mr-2" />
                                {t('Bewerk team')}
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href={route('team.index')}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                {t('Terug naar teams')}
                            </Link>
                        </Button>
                        <Button variant="destructive" size="sm" className="ml-auto"
                            onClick={(e) => {
                                e.preventDefault();
                                setDialogOpen(true);
                            }}
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            {t('Verwijder team')}
                        </Button>
                        <DeleteConfirmation dialogOpen={dialogOpen} type="team" name={team?.name} onOpenChange={setDialogOpen} id={team?.id} />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}