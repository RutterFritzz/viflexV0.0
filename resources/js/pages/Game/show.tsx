import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Game, MessageTemplate, PresenceData, SharedData, Team } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { Trophy, ArrowLeft, Award } from "lucide-react";
import { useTranslation } from "react-i18next";
import MainLayout from '@/layouts/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Messages from "./Components/MessagesTab";
import General from "./Components/GeneralTab";
import Players from "./Components/PlayersTab";
import axios from "axios";
import { useState } from "react";


interface ShowProps {
    game: Game;
    templates: MessageTemplate[];
}

export default function Show({ game, templates }: ShowProps) {
    const { t } = useTranslation();
    const page = usePage<SharedData>();
    const { auth } = page.props;
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

    const findUsersTeam = (userId: any) => {
        const home_team = game?.home_team?.players?.find((player) => player.id === userId)

        return home_team !== undefined ? game.home_team : game.away_team;
    }

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

                <Tabs defaultValue="general">
                    <TabsList>
                        <TabsTrigger value="general">{t('Algemeen')}</TabsTrigger>
                        <TabsTrigger value="players" className="capitalize">{t('spelers')}</TabsTrigger>
                        <TabsTrigger value="messages">{t('Berichten')}</TabsTrigger>
                    </TabsList>
                    <TabsContent value="general" className="space-y-8">
                        <General game={game} />
                    </TabsContent>

                    <TabsContent value="players">
                        <Players game={game} />
                    </TabsContent>

                    <TabsContent value="messages">
                        <p>messages</p>
                        <Messages game={game} team={findUsersTeam(auth.user.id)} templates={templates} />
                    </TabsContent>
                </Tabs>
            </div>
        </MainLayout>
    );
}
