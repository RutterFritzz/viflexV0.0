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
        <div className="max-w-7xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('game.index')}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            {t('Terug naar wedstrijden')}
                        </Link>
                    </Button>
                </div>
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Trophy className="h-8 w-8" />
                        {game.home_team?.name || t('Team A')} vs {game.away_team?.name || t('Team B')}
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
                            {t('Wedstrijd informatie')}
                        </CardTitle>
                        <CardDescription>
                            {t('Datum, tijd en locatie details.')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-muted-foreground">{t('Datum')}:</span>
                                <span className="font-medium">{formatDate(game.gameday?.date || 'Unknown Date')}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-muted-foreground">{t('Tijd')}:</span>
                                <span className="font-medium">{game.time}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-muted-foreground">{t('Locatie')}:</span>
                                <span className="font-medium">{game.location?.name || 'Unknown Location'}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-muted-foreground">{t('Aanvangstijd')}:</span>
                                <span className="font-medium">{game.arrival_time} minuten</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="h-5 w-5" />
                            {t('Locatie')}
                        </CardTitle>
                        <CardDescription>
                            {game.location?.city} - {game.location?.name}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full h-60">
                            <iframe width="100%" height="100%"
                                src={`https://maps.google.com/maps?hl=en&q=${game.location?.address_url}&t=&z=13&ie=UTF8&iwloc=B&output=embed`}>
                            </iframe>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Team Management Section */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('Teammanagement')}</CardTitle>
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
                            {t('Thuis team')}
                        </CardTitle>
                        <CardDescription>
                            {game.home_team?.name || t('Team A')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {game.homeTeam ? (
                            <div className="text-center py-6">
                                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="h-8 w-8 text-secondary" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{t('Team A')}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {t('Thuis spelen')}
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
                            {t('Uit team')}
                        </CardTitle>
                        <CardDescription>
                            {game.away_team?.name || t('Team B')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {game.awayTeam ? (
                            <div className="text-center py-6">
                                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="h-8 w-8 text-secondary" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{t('Team B')}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {t('Uit spelen')}
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
                        {t('Competitie context')}
                    </CardTitle>
                    <CardDescription>
                        {t('Informatie over de competitie waar deze wedstrijd bij hoort.')}
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
                                {t('Bekijk competitie')}
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Actions Section */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('Wedstrijd acties')}</CardTitle>
                    <CardDescription>
                        {t('Beheer wedstrijdinformatie en navigatie.')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-3">
                        <Button asChild variant="default">
                            <Link href={route('game.edit', game.id)}>
                                <Edit className="h-4 w-4 mr-2" />
                                {t('Bewerk wedstrijd')}
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href={route('game.index')}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                {t('Terug naar wedstrijden')}
                            </Link>
                        </Button>
                        <Button variant="destructive" size="sm" className="ml-auto"
                            onClick={(e) => {
                                e.preventDefault();
                                setDialogOpen(true);
                            }}
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            {t('Verwijder wedstrijd')}
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
