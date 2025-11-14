import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Game, MessageTemplate, PresenceData, SharedData, Team } from "@/types";
import { Link, router, usePage } from "@inertiajs/react";
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
import MainLayout from '@/layouts/MainLayout';
import General from "./Components/General";
import Messages from "./Components/Messages";

interface ShowProps {
    game: Game;
    templates: MessageTemplate[];
}

export default function Show({ game, templates }: ShowProps) {
    const { t } = useTranslation();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [homeTeamPresences, setHomeTeamPresences] = useState(game.homeTeamPresences);
    const [awayTeamPresences, setAwayTeamPresences] = useState(game.awayTeamPresences);

    const page = usePage<SharedData>();
    const { auth } = page.props;

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

    const findUser = (userId: any) => {
        const home_player = game?.home_team?.players?.find((player) => player.id === userId)
        const away_player = game?.away_team?.players?.find((player) => player.id === userId)
        console.log("home_player", home_player)
        console.log("away_player", away_player)

        console.log(game?.away_team?.players, game?.home_team?.players)
    }

    findUser(auth.user.id)

    return (
        <MainLayout>
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

                <Tabs defaultValue="matches">
                    <TabsList>
                        <TabsTrigger value="general">{t('Algemeen')}</TabsTrigger>
                        <TabsTrigger value="players" className="capitalize">{t('spelers')}</TabsTrigger>
                        <TabsTrigger value="messages">{t('Berichten')}</TabsTrigger>
                    </TabsList>
                    <TabsContent value="general" className="space-y-8">
                        {/* Match Details Section */}
                    </TabsContent>

                    <TabsContent value="players">
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
                        <div className="grid gap-6 md:grid-cols-2 mt-8">
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
                        </div>                {/* Team Management Section */}
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
                        {/* <Players team={team} /> */}
                    </TabsContent>

                    <TabsContent value="messages">
                        <p>messages</p>
                        <Messages game={game} templates={templates} />
                    </TabsContent>
                </Tabs>
            </div>
        </MainLayout>
    );
}
