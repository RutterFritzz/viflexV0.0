import { Calendar22 } from "@/components/calender";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Game, Location, Team } from "@/types";
import { Link } from "@inertiajs/react";
import { Trophy, ArrowLeft, Save, Calendar, Clock, MapPin, Users, Target } from "lucide-react";
import { useState } from "react";
import { t } from "i18next";

interface EditProps {
    game: Game;
    teams: Team[];
    locations: Location[];
}

export default function Edit({ game, teams, locations }: EditProps) {
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
                            {t('backToGame')}
                        </Link>
                    </Button>
                </div>
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Trophy className="h-8 w-8" />
                        {t('editGame')}
                    </h1>
                    <p className="text-muted-foreground">
                        {t('updateTheDetailsFor')} <span className="font-medium">{game.homeTeam?.name || t('teamA')} vs {game.awayTeam?.name || t('teamB')}</span>.
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Save className="h-5 w-5" />
                        {t('gameInformation')}
                    </CardTitle>
                    <CardDescription>
                        {t('makeChangesToTheGameDetailsBelow')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={route('game.update', game.id)} method="post" className="space-y-6">
                        <input type="hidden" name="_token" value={csrf_token} />
                        <input type="hidden" name="_method" value="PUT" />

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="home_team_id" className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    {t('homeTeam')}
                                </Label>
                                <Select name="home_team_id" required defaultValue={game.home_team_id.toString()}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('selectHomeTeam')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {teams.map((team) => (
                                            <SelectItem key={team.id} value={team.id.toString()}>
                                                {team.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="away_team_id" className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    {t('awayTeam')}
                                </Label>
                                <Select name="away_team_id" required defaultValue={game.away_team_id.toString()}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('selectAwayTeam')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {teams.map((team) => (
                                            <SelectItem key={team.id} value={team.id.toString()}>
                                                {team.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location" className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                {t('location')}
                            </Label>
                            <Select name="location" required defaultValue={game.gameday?.location_id.toString()}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('selectLocation')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {locations.map((location) => (
                                        <SelectItem key={location.id} value={location.id.toString()}>
                                            {location.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="date" className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    {t('date')}
                                </Label>
                                <Calendar22 date={date} setDate={setDate} />
                                <Input type="hidden" name="date" value={date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` : ''} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="time" className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    {t('time')}
                                </Label>
                                <Input
                                    id="time"
                                    type="time"
                                    name="time"
                                    defaultValue={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    required
                                    className="w-full"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="submit" className="flex-1">
                                <Save className="h-4 w-4 mr-2" />
                                {t('updateGame')}
                            </Button>
                            <Button asChild variant="outline" type="button">
                                <Link href={route('game.show', game.id)}>
                                    {t('cancel')}
                                </Link>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Score Update Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        {t('updateScore')}
                    </CardTitle>
                    <CardDescription>
                        {t('recordTheFinalScoreForThisMatch')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={route('game.update', game.id)} method="post" className="space-y-6">
                        <input type="hidden" name="_token" value={csrf_token} />
                        <input type="hidden" name="_method" value="PUT" />

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="home_team_score" className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    {game.homeTeam?.name || t('teamA')} {t('score')}
                                </Label>
                                <Input
                                    id="home_team_score"
                                    type="number"
                                    name="home_team_score"
                                    placeholder="0"
                                    defaultValue={game.home_team_score || ''}
                                    min="0"
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="away_team_score" className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    {game.awayTeam?.name || t('teamB')} {t('score')}
                                </Label>
                                <Input
                                    id="away_team_score"
                                    type="number"
                                    name="away_team_score"
                                    placeholder="0"
                                    defaultValue={game.away_team_score || ''}
                                    min="0"
                                    className="w-full"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="submit" className="flex-1">
                                <Target className="h-4 w-4 mr-2" />
                                {t('updateScore')}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Current Values Display */}
            <Card className="border-dashed border-muted-foreground/25">
                <CardContent className="pt-6">
                    <div className="text-center text-sm text-muted-foreground space-y-2">
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <Users className="h-4 w-4 mx-auto opacity-50 mb-1" />
                                <p className="font-medium text-xs">{t('currentTeams')}</p>
                                <p className="text-xs">{game.homeTeam?.name || t('teamA')} vs {game.awayTeam?.name || t('teamB')}</p>
                            </div>
                            <div>
                                <Target className="h-4 w-4 mx-auto opacity-50 mb-1" />
                                <p className="font-medium text-xs">{t('currentScore')}</p>
                                <p className="text-xs">
                                    {game.home_team_score !== null && game.away_team_score !== null
                                        ? `${game.home_team_score} - ${game.away_team_score}`
                                        : t('notRecorded')
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
