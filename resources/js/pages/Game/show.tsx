import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Game, PresenceData, Team } from "@/types";
import { Link, router } from "@inertiajs/react";
import DeleteConfirmation from "@/components/delete-confirmation";
import { useState } from "react";
import { formatDate } from "@/helpers/format-date";
import { Trophy, Calendar, ArrowLeft, Edit, Trash2, Users, Award, Target, Building2, MapPin } from "lucide-react";
// import Captain from "@/components/captain";
import Coach from "@/components/coach";
import Player from "@/components/player";
import PresenceSubmit from "@/components/presence-submit";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { ContextCard } from "./Components/ContextCard";

interface ShowProps {
    game: Game;
}

export default function Show({ game }: ShowProps) {
    const { t } = useTranslation();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [homeTeamPresences, setHomeTeamPresences] = useState(game.homeTeamPresences);
    const [awayTeamPresences, setAwayTeamPresences] = useState(game.awayTeamPresences);

    // Helper function to get game status
    const getGameStatus = () => {
        if (game.home_team_score !== null && game.away_team_score !== null) {
            return 'completed';
        }
        const gameDate = new Date(game.gameday?.date || '');
        const [hours, minutes] = game.time.split(':').map(Number);
        gameDate.setHours(hours, minutes);
        const now = new Date();
        if (gameDate < now) {
            return 'overdue';
        }
        return 'scheduled';
    };

    // Helper function to get status badge variant
    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'completed':
                return 'default';
            case 'overdue':
                return 'destructive';
            case 'scheduled':
                return 'secondary';
            default:
                return 'outline';
        }
    };

    const status = getGameStatus();

    const handlePresenceSubmit = (team: Team, presenceData: PresenceData) => {
        axios.post(route('game.submit-presence', game.id), {
            team_id: team.id,
            presence: presenceData
        });
        setHomeTeamPresences(true);
        setAwayTeamPresences(true);
        router.reload();
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('game.index')}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            {t('backToGames')}
                        </Link>
                    </Button>
                </div>
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Trophy className="h-8 w-8" />
                        {game.home_team?.name || t('teamA')} vs {game.away_team?.name || t('teamB')}
                    </h1>
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Award className="h-4 w-4" />
                            <Link href={route('competition.show', game.competition_id)} className="font-medium hover:text-primary transition-colors">
                                {game.competition?.name}
                            </Link>
                        </div>
                        <Badge variant={getStatusBadgeVariant(status)}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Badge>
                    </div>
                </div>
            </div>

            <Separator />

            {/* Match Details Section */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            {t('matchInformation')}
                        </CardTitle>
                        <CardDescription>
                            {t('dateTimeAndLocationDetails')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-muted-foreground">{t('date')}:</span>
                                <span className="font-medium">{formatDate(game.gameday?.date || 'Unknown Date')}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-muted-foreground">{t('time')}:</span>
                                <span className="font-medium">{game.time}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-muted-foreground">{t('location')}:</span>
                                <span className="font-medium">{game.location?.name || 'Unknown Location'}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-muted-foreground">{t('arrivalTime')}:</span>
                                <span className="font-medium">{game.arrival_time} minuten</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="h-5 w-5" />
                            {t('location')}
                        </CardTitle>
                        <CardDescription>
                            {game.location?.city} - {game.location?.name}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full">
                            <iframe width="100%" height="600"
                                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Geertsemaweg%203a,%209751%20XA%20Haren+(Scharlakenhof)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                                <a href="https://www.mapsdirections.info/it/calcola-la-popolazione-su-una-mappa/">città più popolate Italia mappa</a>
                            </iframe>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Team Management Section */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('teamManagement')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-3">
                        <div className="grid grid-cols-2 gap-3">
                            {game.home_team && (
                                <PresenceSubmit team={game.home_team} onSubmit={handlePresenceSubmit} presences={game.homeTeamPresences} disabled={game.homeTeamPresences} />
                            )}
                            {game.away_team && (
                                <PresenceSubmit team={game.away_team} onSubmit={handlePresenceSubmit} presences={game.awayTeamPresences} disabled={game.awayTeamPresences} />
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Teams Section */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Home Team */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building2 className="h-5 w-5" />
                            {t('homeTeam')}
                        </CardTitle>
                        <CardDescription>
                            {game.home_team?.name || t('teamA')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {game.homeTeam ? (
                            <div className="text-center py-6">
                                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="h-8 w-8 text-secondary" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{t('teamA')}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {t('playingHome')}
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col gap-2">
                                    {game.home_team?.coaches?.map((coach) => (
                                        <Coach key={coach.id} coach={coach} />
                                    ))}
                                </div>
                                <div className="flex flex-col gap-2">
                                    {game.home_team?.players?.map((player) => (
                                        <Player key={player.id} player={player} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Away Team */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building2 className="h-5 w-5" />
                            {t('awayTeam')}
                        </CardTitle>
                        <CardDescription>
                            {game.away_team?.name || t('teamB')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {game.awayTeam ? (
                            <div className="text-center py-6">
                                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="h-8 w-8 text-secondary" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{t('teamB')}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {t('playingAway')}
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col gap-2">
                                    {game.away_team?.coaches?.map((coach) => (
                                        <Coach key={coach.id} coach={coach} />
                                    ))}
                                </div>
                                <div className="flex flex-col gap-2">
                                    {game.away_team?.players?.map((player) => (
                                        <Player key={player.id} player={player} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-2 gap-6">
                {game.home_team?.values && game.home_team?.values?.length > 0 &&
                    <ContextCard game={game} team={game?.home_team}></ContextCard>
                }

                {game.away_team?.values && game.away_team?.values?.length > 0 &&
                    <ContextCard game={game} team={game?.away_team}></ContextCard>
                }
            </div>

            {/* Competition Context */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        {t('competitionContext')}
                    </CardTitle>
                    <CardDescription>
                        {t('informationAboutTheCompetitionThisGameBelongsTo')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold">{game.competition?.name}</h3>
                            <p className="text-sm text-muted-foreground">
                                {game.competition?.category} • {game.competition?.year}
                            </p>
                        </div>
                        <Button asChild variant="outline">
                            <Link href={route('competition.show', game.competition_id)}>
                                <Award className="h-4 w-4 mr-2" />
                                {t('viewCompetition')}
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Actions Section */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('gameActions')}</CardTitle>
                    <CardDescription>
                        {t('manageGameSettingsAndNavigation')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-3">
                        <Button asChild variant="default">
                            <Link href={route('game.edit', game.id)}>
                                <Edit className="h-4 w-4 mr-2" />
                                {t('editGame')}
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href={route('game.index')}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                {t('backToGames')}
                            </Link>
                        </Button>
                        <Button variant="destructive" size="sm" className="ml-auto"
                            onClick={(e) => {
                                e.preventDefault();
                                setDialogOpen(true);
                            }}
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            {t('deleteGame')}
                        </Button>
                        <DeleteConfirmation
                            dialogOpen={dialogOpen}
                            type="game"
                            name={`${game.home_team?.name} vs ${game.away_team?.name}`}
                            onOpenChange={setDialogOpen}
                            id={game.id}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
