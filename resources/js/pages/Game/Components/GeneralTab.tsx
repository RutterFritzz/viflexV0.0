import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/helpers/format-date";
import { Game } from "@/types";
import { ArrowLeft, Award, Calendar, MapPin, Trash2, Edit } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import DeleteConfirmation from "@/components/delete-confirmation";
import { useState } from "react";

export default function General({ game }: { game: Game }) {
    const { t } = useTranslation();

    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <div>
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
                            name={`${game?.home_team?.name} vs ${game?.away_team?.name}`}
                            onOpenChange={setDialogOpen}
                            id={game.id}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
