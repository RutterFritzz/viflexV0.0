import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Club, Team } from "@/types";
import { Link } from "@inertiajs/react";
import { MapPin, Users, Plus, Edit, ArrowLeft, Trash2 } from "lucide-react";
import DeleteConfirmation from "@/components/delete-confirmation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ShowProps {
    club: Club;
    teams: Team[];
}

export default function Show({ club, teams }: ShowProps) {
    const { t } = useTranslation();
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <div className="max-w-4xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">{club.name}</h1>
                    <Badge variant="secondary" className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {teams.length} {teams.length === 1 ? t('team') : t('teams')}
                    </Badge>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{club.location}</span>
                </div>
            </div>

            <Separator />

            {/* Teams Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        {t('teams')}
                    </CardTitle>
                    <CardDescription>
                        {teams.length === 0
                            ? t('noTeamsHaveBeenCreatedYet')
                            : t('manageAndViewAllTeamsIn') + ` ${club.name}`
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {teams.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p className="text-lg font-medium">{t('noTeamsYet')}</p>
                            <p className="text-sm">{t('createYourFirstTeamToGetStarted')}</p>
                        </div>
                    ) : (
                        <div className="grid gap-3">
                            {teams.map((team) => (
                                <div
                                    key={team.id}
                                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                                >
                                    <div>
                                        <Link
                                            href={route('team.show', team.id)}
                                            className="font-medium hover:text-primary transition-colors"
                                        >
                                            {team.name}
                                        </Link>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {team.players && (
                                            <Badge variant="outline" className="text-xs">
                                                {team.players.length} {t('players')}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    <Button asChild className="w-full">
                        <Link href={route('team.create', club.id)}>
                            <Plus className="h-4 w-4 mr-2" />
                            {t('createNewTeam')}
                        </Link>
                    </Button>
                </CardFooter>
            </Card>

            {/* Actions Section */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('clubActions')}</CardTitle>
                    <CardDescription>
                        {t('manageClubSettingsAndNavigation')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-3">
                        <Button asChild variant="default">
                            <Link href={route('club.edit', club.id)}>
                                <Edit className="h-4 w-4 mr-2" />
                                {t('editClub')}
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href={route('club.index')}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                {t('backToClubs')}
                            </Link>
                        </Button>
                        <Button variant="destructive" size="sm" className="ml-auto"
                            onClick={(e) => {
                                e.preventDefault();
                                setDialogOpen(true);
                            }}
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            {t('deleteClub')}
                        </Button>
                        <DeleteConfirmation dialogOpen={dialogOpen} type="club" name={club.name} onOpenChange={setDialogOpen} id={club.id} />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}