import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Trophy, ArrowLeft, Save, Calendar, Clock, MapPin, Users, Target } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Link } from "@inertiajs/react";
import { Game, Location, Team } from "@/types";
import UpdateGame from "./Components/UpdateGame";
import UpdateScore from "./Components/UpdateScore";
interface EditProps {
    game: Game;
    teams: Team[];
    locations: Location[];
    competitionTeams: any;
}

export default function Edit({ game, teams, locations, competitionTeams }: EditProps) {

    const { t } = useTranslation();
    const csrf_token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
    const [date, setDate] = useState<Date | undefined>(game.gameday?.date ? new Date(game.gameday?.date) : undefined);
    const [time, setTime] = useState<string | undefined>(game.time);

    return (
        <div className="max-w-2xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('game.show', game.id)}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            {t('Terug naar wedstrijd')}
                        </Link>
                    </Button>
                </div>
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Trophy className="h-8 w-8" />
                        {t('Bewerk wedstrijd')}
                    </h1>
                    <p className="text-muted-foreground">
                        {t('Update de details voor')} <span className="font-medium">{game.home_team?.name} vs {game.away_team?.name}</span>.
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Save className="h-5 w-5" />
                        {t('Wedstrijd informatie')}
                    </CardTitle>
                    <CardDescription>
                        {t('Maak wijzigingen aan de wedstrijd details hieronder.')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <UpdateGame game={game} teams={teams} locations={locations}/>
                </CardContent>
            </Card>

            {/* Score Update Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        {t('Update score')}
                    </CardTitle>
                    <CardDescription>
                        {t('Registreer de eindscore voor deze wedstrijd.')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <UpdateScore game={game} />
                </CardContent>
            </Card>

            {/* Current Values Display */}
            <Card className="border-dashed border-muted-foreground/25">
                <CardContent className="pt-6">
                    <div className="text-center text-sm text-muted-foreground space-y-2">
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <Users className="h-4 w-4 mx-auto opacity-50 mb-1" />
                                <p className="font-medium text-xs">{t('Huidige teams')}</p>
                                <p className="text-xs">{game.home_team?.name} vs {game.away_team?.name}</p>
                            </div>
                            <div>
                                <Target className="h-4 w-4 mx-auto opacity-50 mb-1" />
                                <p className="font-medium text-xs">{t('Huidige score')}</p>
                                <p className="text-xs">
                                    {game.home_team_score !== null && game.away_team_score !== null
                                        ? `${game.home_team_score} - ${game.away_team_score}`
                                        : t('Niet geregistreerd')
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
