import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Game } from "@/types";
import PresenceSubmit from "@/components/presence-submit";
import { useTranslation } from "react-i18next";
import { Building2, Users } from "lucide-react";
import Coach from "@/components/coach";
import Player from "@/components/player";
import { ContextCard } from "./ContextCard";

export default function Players({ game }: { game: Game }) {
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>{t('Aanwezigheid')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-3">
                        <div className="grid grid-cols-2 gap-3">
                            {game.home_team && (
                                <PresenceSubmit team={game.home_team} game={game} presences={game.homeTeamPresences} />
                            )}
                            {game.away_team && (
                                <PresenceSubmit team={game.away_team} game={game} presences={game.awayTeamPresences} />
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
            </div>
        </div>
    );
}