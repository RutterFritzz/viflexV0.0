import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gameday } from "@/types";
import { Link } from "@inertiajs/react";
import { Calendar, Plus, ArrowLeft, MapPin, Trophy, Clock } from "lucide-react";
import { formatDate } from "@/helpers/format-date";
import { useTranslation } from "react-i18next";

export default function Index({ gamedays }: { gamedays: Gameday[] }) {
    const { t } = useTranslation();
    // Helper function to get status badge
    const getStatusBadge = (date: Date) => {
        const today = new Date();
        const gamedayDate = new Date(date);
        const diffTime = gamedayDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            return <Badge variant="secondary">{t('Geweest')}</Badge>;
        } else if (diffDays === 0) {
            return <Badge variant="default">{t('Vandaag')}</Badge>;
        } else if (diffDays <= 7) {
            return <Badge variant="destructive">{t('Aankomend')}</Badge>;
        } else {
            return <Badge variant="outline">{t('Gepland')}</Badge>;
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href="/dashboard">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            {t('Terug naar dashboard')}
                        </Link>
                    </Button>
                </div>
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <Calendar className="h-8 w-8" />
                            {t('Wedstrijddagen en evenementen')}
                        </h1>
                        <p className="text-muted-foreground">
                            {t('Beheer alle geplande wedstrijddagen en sportevenementen.')}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <Trophy className="h-3 w-3" />
                            {gamedays.length} {gamedays.length === 1 ? t('Wedstrijddag') : t('Wedstrijddagen')}
                        </Badge>
                        <Button asChild>
                            <Link href={route('gameday.create')}>
                                <Plus className="h-4 w-4 mr-2" />
                                {t('Plan wedstrijddag')}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Gamedays Grid */}
            {gamedays.length === 0 ? (
                <Card>
                    <CardContent className="text-center py-12">
                        <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <h3 className="text-lg font-medium mb-2">{t('Geen wedstrijddagen gepland')}</h3>
                        <p className="text-muted-foreground mb-6">
                            {t('Maak je eerste wedstrijddag om sportevenementen te organiseren.')}
                        </p>
                        <Button asChild>
                            <Link href={route('gameday.create')}>
                                <Plus className="h-4 w-4 mr-2" />
                                {t('Plan eerste wedstrijddag')}
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {gamedays.map((gameday) => (
                        <Card key={gameday.id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Calendar className="h-5 w-5 text-primary" />
                                        {formatDate(gameday.date)}
                                    </CardTitle>
                                    {getStatusBadge(gameday.date)}
                                </div>
                                <CardDescription className="flex items-center gap-2">
                                    <MapPin className="h-3 w-3" />
                                    <span className="text-xs">{gameday.location?.name || t('Onbekende locatie')}</span>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">{t('Locatie')}:</span>
                                        <span className="font-medium">{gameday.location?.name}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">{t('Plaats')}:</span>
                                        <Badge variant="outline" className="text-xs">{gameday.location?.city}</Badge>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">{t('Wedstrijden')}:</span>
                                        <span className="font-medium">{gameday.games_count} {t('Gepland')}</span>
                                    </div>
                                    {gameday.games && gameday.games.length > 0 && (
                                        <div className="pt-2 border-t">
                                            <div className="text-xs text-muted-foreground mb-2">{t('Komende wedstrijden')}:</div>
                                            <div className="space-y-1">
                                                {gameday.games.slice(0, 2).map((game) => (
                                                    <div key={game.id} className="flex items-center justify-between text-xs">
                                                        <span className="truncate">
                                                            {game.homeTeam?.name || t('Team A')} vs {game.awayTeam?.name || t('Team B')}
                                                        </span>
                                                        <span className="text-muted-foreground">
                                                            <Clock className="inline h-3 w-3 mr-1" />
                                                            {game.time}
                                                        </span>
                                                    </div>
                                                ))}
                                                {gameday.games.length > 2 && (
                                                    <div className="text-xs text-muted-foreground">
                                                        +{gameday.games.length - 2} {t('meer wedstrijden')}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between pt-2">
                                        <Button asChild variant="outline" size="sm">
                                            <Link href={route('gameday.show', gameday.id)}>
                                                {t('Bekijk details')}
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
