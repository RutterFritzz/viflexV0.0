import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Competition, Game, Team } from "@/types";
import { Link } from "@inertiajs/react";
import DeleteConfirmation from "@/components/delete-confirmation";
import { useState } from "react";
import { Trophy, Calendar, Tag, ArrowLeft, Edit, Trash2, Users, Award, Calendar as CalendarIcon, Plus, Building2, User, UserCheck, X } from "lucide-react";
import Search from "@/components/search";
import axios from "axios";
import { formatDate } from "@/helpers/format-date";
import { t } from "i18next";

interface ShowProps {
    competition: Competition;
    teams: Team[];
    games: Game[];
}

export default function Show({ competition, teams, games }: ShowProps) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [showAddTeam, setShowAddTeam] = useState(false);

    const handleTeamSelect = (teamId: number) => {
        const csrf_token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
        axios.post(route('competition.add-team'), {
            team_id: teamId,
            competition_id: competition.id,
        }, {
            headers: {
                'X-CSRF-TOKEN': csrf_token
            }
        }).then(() => {
            setShowAddTeam(false);
        }).catch((error) => {
            console.error('Error adding team:', error);
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('competition.index')}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            {t('backToCompetitions')}
                        </Link>
                    </Button>
                </div>
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Trophy className="h-8 w-8" />
                        {competition.name}
                    </h1>
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Tag className="h-4 w-4" />
                            <Badge variant="secondary">{competition.category}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{competition.year}</span>
                        </div>
                    </div>
                </div>
            </div>

            <Separator />

            {/* Competition Details Section */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Award className="h-5 w-5" />
                            {t('competitionInformation')}
                        </CardTitle>
                        <CardDescription>
                            {t('basicDetailsAboutThisCompetition')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-muted-foreground">{t('name')}:</span>
                                <span className="font-medium">{competition.name}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-muted-foreground">{t('category')}:</span>
                                <Badge variant="outline">{competition.category}</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-muted-foreground">{t('year')}:</span>
                                <span className="font-medium">{competition.year}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CalendarIcon className="h-5 w-5" />
                            {t('quickStats')}
                        </CardTitle>
                        <CardDescription>
                            {t('overviewOfCompetitionStatistics')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="text-center p-4 border rounded-lg">
                                <div className="text-2xl font-bold text-primary">{teams.length}</div>
                                <div className="text-sm text-muted-foreground">{t('participatingTeams')}</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                                <div className="text-2xl font-bold text-secondary">0</div>
                                <div className="text-sm text-muted-foreground">{t('matchesPlayed')}</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                                <div className="text-2xl font-bold text-accent">TBD</div>
                                <div className="text-sm text-muted-foreground">{t('status')}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Teams Section */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                {t('participatingTeams')}
                            </CardTitle>
                            <CardDescription>
                                {t('teamsRegisteredForThisCompetition')}
                            </CardDescription>
                        </div>
                        <Button
                            onClick={() => setShowAddTeam(!showAddTeam)}
                            variant="outline"
                            size="sm"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            {showAddTeam ? t('cancel') : t('addTeam')}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {showAddTeam && (
                        <div className="mb-6 p-4 border rounded-lg bg-muted/50">
                            <div className="flex items-center gap-2 mb-3">
                                <Plus className="h-4 w-4 text-primary" />
                                <span className="font-medium text-sm">{t('addTeamToCompetition')}</span>
                            </div>
                            <Search onSelect={handleTeamSelect} type="team" />
                        </div>
                    )}

                    {teams.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p className="text-lg font-medium">{t('noTeamsRegisteredYet')}</p>
                            <p className="text-sm mb-4">{t('teamsWillAppearHereOnceTheyRegisterForThisCompetition')}</p>
                            <Button
                                onClick={() => setShowAddTeam(true)}
                                variant="outline"
                                size="sm"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                {t('addFirstTeam')}
                            </Button>
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {teams.map((team) => (
                                <div
                                    key={team.id}
                                    className="group relative p-4 border rounded-lg hover:shadow-md transition-all duration-200 bg-card"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3 flex-1">
                                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                                <Users className="h-5 w-5 text-primary" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-sm truncate">
                                                    <Link
                                                        href={route('team.show', team.id)}
                                                        className="hover:text-primary transition-colors"
                                                    >
                                                        {team.name}
                                                    </Link>
                                                </h3>
                                                <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <User className="h-3 w-3" />
                                                        <span>{team.players?.length || 0} {t('player')}{team.players?.length === 1 ? '' : 's'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <UserCheck className="h-3 w-3" />
                                                        <span>{team.coaches?.length || 0} {t('coach')}{team.coaches?.length === 1 ? '' : 'es'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Matches Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Trophy className="h-5 w-5" />
                        {t('matchesAndFixtures')}
                    </CardTitle>
                    <CardDescription>
                        {t('scheduleAndResultsForThisCompetition')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center mb-4">
                        <div className="font-semibold text-lg">{t('matches')}</div>
                        <Button
                            asChild
                            variant="secondary"
                            size="sm"
                            disabled={teams.length < 2}
                            title={teams.length < 2 ? t('atLeast2TeamsRequiredToScheduleAMatch') : ""}
                        >
                            <Link href={route('game.create', competition.id)}>
                                <Plus className="h-4 w-4 mr-2" />
                                {t('makeAMatch')}
                            </Link>
                        </Button>
                    </div>
                    {/* Show matches if any, otherwise show empty state */}
                    {Array.isArray(games) && games.length > 0 ? (
                        <div className="space-y-4">
                            {games.map((game: Game) => (
                                <div key={game.id} className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                    <div className="flex items-center gap-4">
                                        <span className="font-semibold">{game.home_team?.name || t('teamA')}</span>
                                        <span className="text-muted-foreground">{t('vs')}</span>
                                        <span className="font-semibold">{game.away_team?.name || t('teamB')}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span>
                                            <CalendarIcon className="inline h-4 w-4 mr-1" />
                                            {formatDate(game.gameday?.date || '')} {game.time && `at ${game.time}`}
                                        </span>
                                        <span>
                                            <Building2 className="inline h-4 w-4 mr-1" />
                                            {game.location?.name}
                                        </span>
                                        {(game.home_team_score !== null && game.away_team_score !== null) && (
                                            <span className="font-bold text-primary">
                                                {game.home_team_score} - {game.away_team_score}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p className="text-lg font-medium">{t('noMatchesScheduled')}</p>
                            <p className="text-sm">{t('matchFixturesWillBeDisplayedHereOnceTheCompetitionBegins')}</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Actions Section */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('competitionActions')}</CardTitle>
                    <CardDescription>
                        {t('manageCompetitionSettingsAndNavigation')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-3">
                        <Button asChild variant="default">
                            <Link href={route('competition.edit', competition.id)}>
                                <Edit className="h-4 w-4 mr-2" />
                                {t('editCompetition')}
                            </Link>
                        </Button>
                        {teams.length >= 2 && (
                            <Button asChild variant="secondary">
                                <Link href={route('game.create', competition.id)}>
                                    <Trophy className="h-4 w-4 mr-2" />
                                    {t('scheduleGame')}
                                </Link>
                            </Button>
                        )}
                        <Button asChild variant="outline">
                            <Link href={route('competition.index')}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                {t('backToCompetitions')}
                            </Link>
                        </Button>
                        <Button variant="destructive" size="sm" className="ml-auto"
                            onClick={(e) => {
                                e.preventDefault();
                                setDialogOpen(true);
                            }}
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            {t('deleteCompetition')}
                        </Button>
                        <DeleteConfirmation
                            dialogOpen={dialogOpen}
                            type="competition"
                            name={competition.name}
                            onOpenChange={setDialogOpen}
                            id={competition.id}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
