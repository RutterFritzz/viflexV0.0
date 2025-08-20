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
                            Back to Game
                        </Link>
                    </Button>
                </div>
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Trophy className="h-8 w-8" />
                        Edit Game
                    </h1>
                    <p className="text-muted-foreground">
                        Update the details for <span className="font-medium">{game.homeTeam?.name || 'Team A'} vs {game.awayTeam?.name || 'Team B'}</span>.
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Save className="h-5 w-5" />
                        Game Information
                    </CardTitle>
                    <CardDescription>
                        Make changes to the game details below.
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
                                    Home Team
                                </Label>
                                <Select name="home_team_id" required defaultValue={game.home_team_id.toString()}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select home team" />
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
                                    Away Team
                                </Label>
                                <Select name="away_team_id" required defaultValue={game.away_team_id.toString()}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select away team" />
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
                                Location
                            </Label>
                            <Select name="location" required defaultValue={game.gameday?.location_id.toString()}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select location" />
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
                                    Date
                                </Label>
                                <Calendar22 date={date} setDate={setDate} />
                                <Input type="hidden" name="date" value={date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` : ''} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="time" className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    Time
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
                                Update Game
                            </Button>
                            <Button asChild variant="outline" type="button">
                                <Link href={route('game.show', game.id)}>
                                    Cancel
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
                        Update Score
                    </CardTitle>
                    <CardDescription>
                        Record the final score for this match.
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
                                    {game.homeTeam?.name || 'Team A'} Score
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
                                    {game.awayTeam?.name || 'Team B'} Score
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
                                Update Score
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
                                <p className="font-medium text-xs">Current Teams</p>
                                <p className="text-xs">{game.homeTeam?.name || 'Team A'} vs {game.awayTeam?.name || 'Team B'}</p>
                            </div>
                            <div>
                                <Target className="h-4 w-4 mx-auto opacity-50 mb-1" />
                                <p className="font-medium text-xs">Current Score</p>
                                <p className="text-xs">
                                    {game.home_team_score !== null && game.away_team_score !== null
                                        ? `${game.home_team_score} - ${game.away_team_score}`
                                        : 'Not recorded'
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
