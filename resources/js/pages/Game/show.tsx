import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Game, MessageTemplate, SharedData } from "@/types";
import { Link, router, usePage } from "@inertiajs/react";
import { Trophy, ArrowLeft, Award } from "lucide-react";
import { useTranslation } from "react-i18next";
import MainLayout from '@/layouts/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Messages from "./Components/MessagesTab";
import General from "./Components/GeneralTab";
import Players from "./Components/PlayersTab";
import GetGamesStatusBadge from "@/components/GetGamesStatusBadge";
import Settings from "./Components/SettingsTab";


interface ShowProps {
    game: Game;
    templates: MessageTemplate[];
    tab: string;
}

export default function Show({ game, templates, tab }: ShowProps) {
    const { t } = useTranslation();
    const page = usePage<SharedData>();
    const { auth } = page.props;

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
                            <GetGamesStatusBadge game={game} />
                        </div>
                    </div>
                </div>

                <Separator />

                <Tabs value={tab} defaultValue="general" onValueChange={(value) => {
                    router.get(route('game.show', [game]),
                        { tab: value }, {
                        preserveScroll: true,
                        preserveState: true,
                    });
                }}>
                    <TabsList>
                        <TabsTrigger value="general">{t('Algemeen')}</TabsTrigger>
                        <TabsTrigger value="players" className="capitalize">{t('spelers')}</TabsTrigger>
                        <TabsTrigger value="messages">{t('Berichten')}</TabsTrigger>
                        <TabsTrigger value="settings">{t('Instellingen')}</TabsTrigger>
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

                    <TabsContent value="settings">
                        <Settings game={game} />
                    </TabsContent>
                </Tabs>
            </div>
        </MainLayout>
    );
}
