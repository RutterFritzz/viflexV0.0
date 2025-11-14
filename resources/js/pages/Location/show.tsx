import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Location } from "@/types";
import { Link } from "@inertiajs/react";
import DeleteConfirmation from "@/components/delete-confirmation";
import { useState } from "react";
import { formatDate } from "@/helpers/format-date";
import { MapPin, ArrowLeft, Edit, Trash2, Building2, Map, Calendar, Trophy, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import UpcommingGames from "@/components/Games/UpcommingGames";
import LastReasults from "@/components/Games/LastReasults";

interface ShowProps {
    location: Location;
}


export default function Show({ location }: ShowProps) {
    console.log(location);
    const upcomingGames = location.upcoming_games || [];
    const pastGames = location.past_games || [];
    const { t } = useTranslation();
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <div className="max-w-7xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('location.index')}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            {t('Terug naar locaties')}
                        </Link>
                    </Button>
                </div>
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <MapPin className="h-8 w-8" />
                        {t('Locatie')} - {location.name}
                    </h1>
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Map className="h-4 w-4" />
                            <Badge variant="secondary">{location.city}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            <span>{t('Sport venue')}</span>
                        </div>
                    </div>
                </div>
            </div>

            <Separator />

            {/* Location Details Section */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building2 className="h-5 w-5" />
                            {t('Locatie informatie')}
                        </CardTitle>
                        <CardDescription>
                            {t('Basisdetails over deze locatie.')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-muted-foreground">{t('Locatie naam')}:</span>
                                <span className="font-medium">{location.name}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-muted-foreground">{t('Plaats')}:</span>
                                <Badge variant="outline">{location.city}</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-muted-foreground">{t('Adres')}:</span>
                                <span className="font-medium">{location.address || t('Niet beschikbaar')}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Trophy className="h-5 w-5" />
                            {t('Locatie statistieken')}
                        </CardTitle>
                        <CardDescription>
                            {t('Overzicht van venue gebruik en activiteit.')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="text-center p-4 border rounded-lg">
                                <div className="text-2xl font-bold text-primary">{upcomingGames.length + pastGames.length}</div>
                                <div className="text-sm text-muted-foreground">{t('Totaal gespeelde wedstrijden')}</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                                <div className="text-2xl font-bold text-secondary">{pastGames.length}</div>
                                <div className="text-sm text-muted-foreground">{t('Komende gespeelde wedstrijden')}</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                                <div className="text-2xl font-bold text-accent">{upcomingGames.length}</div>
                                <div className="text-sm text-muted-foreground">{t('Komende wedstrijden')}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <UpcommingGames upcomingGames={upcomingGames} />

            <LastReasults lastResults={pastGames} />

            {/* Actions Section */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('Locatie acties')}</CardTitle>
                    <CardDescription>
                        {t('Beheer locatie instellingen en navigatie.')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-3">
                        <Button asChild variant="default">
                            <Link href={route('location.edit', location.id)}>
                                <Edit className="h-4 w-4 mr-2" />
                                {t('Bewerk locatie')}
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href={route('location.index')}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                {t('Terug naar locaties')}
                            </Link>
                        </Button>
                        <Button variant="destructive" size="sm" className="ml-auto"
                            onClick={(e) => {
                                e.preventDefault();
                                setDialogOpen(true);
                            }}
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            {t('Verwijder locatie')}
                        </Button>
                        <DeleteConfirmation
                            dialogOpen={dialogOpen}
                            type="location"
                            name={location.name}
                            onOpenChange={setDialogOpen}
                            id={location.id}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
