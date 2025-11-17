import { Game } from "@/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { ArrowRight, Calendar, Trophy, Users } from "lucide-react";
import { formatDate } from "@/helpers/format-date";
import { Link } from "@inertiajs/react";

export default function LastResults({ lastResults, limit }: { lastResults: Game[] | undefined, limit?: number }) {
    const { t } = useTranslation();

    let lastResultsMapped: Game[] | undefined;

    if (limit) {
        lastResultsMapped = lastResults?.slice(0, limit);
    } else {
        lastResultsMapped = lastResults;
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Trophy className="h-5 w-5" />
                            {t('Recente resultaten')}
                        </CardTitle>
                        <CardDescription>
                            {t('Je recente resultaten')}
                        </CardDescription>
                    </div>
                    <Badge variant="secondary">{lastResults?.length}</Badge>
                </div>
            </CardHeader>
            <CardContent>
                {lastResults?.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">{t('Geen recente resultaten')}</p>
                        <p className="text-sm">{t('Voltooide wedstrijden zullen hier worden getoond.')}</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {lastResultsMapped?.map((game) => (
                            <Link key={game.id} href={route('game.show', game.id)}>
                                <div className="flex flex-col items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors gap-2">
                                    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 font-semibold text-lg w-full h-full p-5">
                                        <div className="flex flex-col items-center gap-1 justify-center">
                                            <span>
                                                {game.home_team?.logo ?
                                                    <img src={String(game.home_team.logo_cache)} alt={game.home_team.name} className="w-24 h-24" />
                                                    :
                                                    <Users className="w-24 h-24 text-muted-foreground" />}
                                            </span>
                                            <span className="text-2xl">
                                                {game.home_team?.name || t('Team A')}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-2 justify-center text-4xl items-center">
                                            <Badge variant="outline" className="text-lg">
                                                <Calendar className="h-6 w-6" />
                                                {formatDate(game.date || '')}
                                            </Badge>
                                            <span className="text-center mb-5 mt-2">
                                                {game.home_team_score || 0} - {game.away_team_score || 0}
                                            </span>
                                            <span className="h-5"></span>
                                        </div>
                                        <div className="flex flex-col items-center gap-1 justify-center">
                                            <span>
                                                {game.away_team?.logo ?
                                                    <img src={String(game.away_team.logo_cache)} alt={game.away_team.name} className="w-24 h-24" />
                                                    :
                                                    <Users className="w-24 h-24 text-muted-foreground" />}
                                            </span>
                                            <span className="text-2xl">
                                                {game.away_team?.name || t('Team B')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                        {limit && (
                            (lastResults?.length ?? 0) > limit && (
                                <Link href={route('game.index')} className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2 justify-end">
                                    {t('Bekijk alle resultaten')}
                                    <ArrowRight className="h-3 w-3" />
                                </Link>
                            )
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}