import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Team } from "@/types";
import { Link } from "@inertiajs/react";
import { Users, Eye, Building2, ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Index({ teams }: { teams: Team[] }) {
    const { t } = useTranslation();
    return (
        <div className="max-w-6xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('club.index')}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            {t('backToClubs')}
                        </Link>
                    </Button>
                </div>
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <Users className="h-8 w-8" />
                            {t('allTeams')}
                        </h1>
                        <p className="text-muted-foreground">
                            {t('viewAllTeamsAcrossYourOrganization')}
                        </p>
                    </div>
                    <Badge variant="secondary" className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {teams.length} {teams.length === 1 ? t('team') : t('teams')}
                    </Badge>
                </div>
            </div>

            {/* Teams Grid */}
            {teams.length === 0 ? (
                <Card>
                    <CardContent className="text-center py-12">
                        <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <h3 className="text-lg font-medium mb-2">{t('noTeamsYet')}</h3>
                        <p className="text-muted-foreground mb-6">
                            {t('teamsWillAppearHereOnceTheyAreCreatedWithinClubs')}
                        </p>
                        <Button asChild>
                            <Link href={route('club.index')}>
                                <Building2 className="h-4 w-4 mr-2" />
                                {t('goToClubs')}
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {teams.map((team) => (
                        <Card key={team.id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Users className="h-5 w-5" />
                                    {team.name}
                                </CardTitle>
                                <CardDescription className="space-y-1">
                                    <div className="flex flex-wrap gap-2">
                                        {team.players && team.players.length > 0 && (
                                            <Badge variant="outline" className="text-xs">
                                                {team.players.length} {team.players.length === 1 ? t('player') : t('players')}
                                            </Badge>
                                        )}
                                        {team.coaches && team.coaches.length > 0 && (
                                            <Badge variant="outline" className="text-xs">
                                                {team.coaches.length} {team.coaches.length === 1 ? t('coach') : t('coaches')}
                                            </Badge>
                                        )}
                                        {(!team.players || team.players.length === 0) &&
                                            (!team.coaches || team.coaches.length === 0) && (
                                                <Badge variant="secondary" className="text-xs">
                                                    {t('noMembersYet')}
                                                </Badge>
                                            )}
                                    </div>
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className="pt-0">
                                <Button asChild variant="outline" className="w-full">
                                    <Link href={route('team.show', team.id)}>
                                        <Eye className="h-4 w-4 mr-2" />
                                        {t('viewTeam')}
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}