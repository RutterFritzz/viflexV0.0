import { Game } from "@/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "@inertiajs/react";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/helpers/format-date";
import GetGamesStatusBadge from "../GetGamesStatusBadge";

export default function LastReasults({ lastResults }: { lastResults: Game[] | undefined }) {
    const { t } = useTranslation();

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Trophy className="h-5 w-5" />
                            {t('lastResults')}
                        </CardTitle>
                        <CardDescription>
                            {t('yourLastResults')}
                        </CardDescription>
                    </div>
                    <Badge variant="secondary">{lastResults?.length}</Badge>
                </div>
            </CardHeader>
            <CardContent>
                {lastResults?.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">{t('noLastResults')}</p>
                        <p className="text-sm">{t('completedGamesWillAppearHere')}</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {lastResults?.slice(0, 5).map((game) => (
                            <div
                                key={game.id}
                                className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                            >
                                <div className="font-medium flex items-center justify-between w-full gap-1">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            <span>{formatDate(game.gameday?.date || '')}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            <span>{game.time}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-3 w-3" />
                                            <span>
                                                {game.gameday?.location?.city || t('unknownLocation')}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span>
                                            {game.home_team?.logo && <img src={String(game.home_team.logo_cache)} alt={game.home_team.name} className="w-6 h-6" />}
                                        </span>
                                        <span>
                                            {game.home_team?.name || t('teamA')}
                                        </span>
                                        <span className="mx-2">
                                            vs
                                        </span>
                                        <span>
                                            {game.away_team?.logo && <img src={String(game.away_team.logo_cache)} alt={game.away_team.name} className="w-6 h-6" />}
                                        </span>
                                        <span>
                                            {game.away_team?.name || t('teamB')}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <GetGamesStatusBadge game={game} />
                                        <Button asChild variant="outline" size="sm">
                                            <Link href={route('game.show', game.id)}>
                                                <ArrowRight className="h-3 w-3" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {lastResults && lastResults.length === 0 && (
                            <div className="text-center text-sm text-muted-foreground">
                                {t('noLastResults')}
                            </div>
                        )}
                        {lastResults && lastResults.length > 5 && (
                            <Button asChild variant="outline" size="sm" className="w-full">
                                <Link href={route('game.index')}>
                                    {t('viewAllLastResults')}
                                </Link>
                            </Button>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}