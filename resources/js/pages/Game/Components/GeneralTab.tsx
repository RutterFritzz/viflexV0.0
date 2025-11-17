import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/helpers/format-date";
import { Game } from "@/types";
import { ArrowLeft, Award, Calendar, MapPin, Trash2, Edit, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import DeleteConfirmation from "@/components/delete-confirmation";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function General({ game }: { game: Game }) {
    const { t } = useTranslation();

    const [dialogOpen, setDialogOpen] = useState(false);

    function isPastGame() {
        const gameDate = new Date(game.date || '');
        const [hours, minutes] = game.time.split(':').map(Number);
        gameDate.setHours(hours, minutes);
        const now = new Date();
        const isPastGame = gameDate < now;
        if (isPastGame) {
            return true;
        }
        return false;
    }


    return (
        <div className="space-y-6">
            <Card>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 font-semibold text-lg w-full h-full p-5">
                        <div className="flex flex-col items-center gap-1 justify-center">
                            <span>
                                {game.home_team?.logo ?
                                    <img src={String(game.home_team.logo_cache)} alt={game.home_team.name} className="w-24 h-24" />
                                    :
                                    <Users className="w-24 h-24 text-muted-foreground" />
                                }
                            </span>
                            <Link href={route('team.show', game.home_team_id)} className="text-2xl hover:text-primary transition-colors">
                                {game.home_team?.name || t('Team A')}
                            </Link>
                        </div>
                        {isPastGame() ? (
                            <div className="flex flex-col gap-2 justify-center text-4xl items-center">
                                <Badge className="text-lg" variant="outline">
                                    <Calendar className="h-6 w-6" />
                                    {formatDate(game.date || '')}
                                </Badge>
                                <span className="text-center mb-5 mt-2">
                                    {game.home_team_score || 0} - {game.away_team_score || 0}
                                </span>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2 justify-center text-4xl items-center">
                                <Badge className="text-lg">
                                    <Calendar className="h-6 w-6" />
                                    {formatDate(game.date || '')}
                                </Badge>
                                <span className="text-center mb-5 mt-2">
                                    {game.time}
                                </span>
                            </div>
                        )}
                        <div className="flex flex-col items-center gap-1 justify-center">
                            <span>
                                {game.away_team?.logo ?
                                    <img src={String(game.away_team.logo_cache)} alt={game.away_team.name} className="w-24 h-24" />
                                    :
                                    <Users className="w-24 h-24 text-muted-foreground" />
                                }
                            </span>
                            <Link href={route('team.show', game.away_team_id)} className="text-2xl hover:text-primary transition-colors">
                                {game.away_team?.name || t('Team B')}
                            </Link>
                        </div>
                    </div>
                </CardContent >
            </Card >
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
                                <span className="font-medium">{formatDate(game.date || 'Unknown Date')}</span>
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
                                <span className="text-sm font-medium text-muted-foreground">{t('Adres')}:</span>
                                <span className="font-medium">{game.location?.address || 'Unknown Address'}</span>
                            </div>
                            {game.arrival_time && (
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-muted-foreground">{t('Aanvangstijd')}:</span>
                                    <span className="font-medium">{game.arrival_time}</span>
                                </div>
                            )}
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
        </div >
    );
}
