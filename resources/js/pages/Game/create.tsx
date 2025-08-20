import { Calendar22 } from "@/components/calender";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Competition, Location, Team } from "@/types";
import { Link } from "@inertiajs/react";
import { Trophy, ArrowLeft, Plus, Calendar, Clock, MapPin, Users } from "lucide-react";
import { useState } from "react";

interface CreateProps {
    competition: Competition;
    teams: Team[];
    locations: Location[];
    errors: string | null;
}

export default function Create({ competition, teams, locations, errors }: CreateProps) {
    const csrf_token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [time, setTime] = useState<string | undefined>('00:00');

    console.log(errors);

    return (
        <div className="max-w-2xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('home')}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Home
                        </Link>
                    </Button>
                </div>
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Trophy className="h-8 w-8" />
                        Schedule New Game
                    </h1>
                </div>
            </div>

            {/* Form Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Plus className="h-5 w-5" />
                        Game Information
                    </CardTitle>
                    <CardDescription>
                        Enter the details for the new match.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={route('game.store', competition.id)} method="post" className="space-y-6">
                        <input type="hidden" name="_token" value={csrf_token} />
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="home_team_id" className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    Home Team
                                </Label>
                                <Select name="home_team_id" required>
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
                                <Select name="away_team_id" required>
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
                            <Select name="location_id" required defaultValue={locations[0].id.toString()}>
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
                                <Plus className="h-4 w-4 mr-2" />
                                Schedule Game
                            </Button>
                            <Button asChild variant="outline" type="button">
                                <Link href={route('home')}>
                                    Cancel
                                </Link>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Competition Info Card */}
            <Card className="border-dashed border-muted-foreground/25">
                <CardContent className="pt-6">
                    <div className="text-center text-sm text-muted-foreground space-y-2">
                        <Trophy className="h-8 w-8 mx-auto opacity-50" />
                        <p className="text-xs mt-2">Available Teams: {teams.length}</p>
                    </div>
                </CardContent>
            </Card>

            {/* Help Card */}
            <Card className="border-dashed border-muted-foreground/25">
                <CardContent className="pt-6">
                    <div className="text-center text-sm text-muted-foreground space-y-2">
                        <Calendar className="h-8 w-8 mx-auto opacity-50" />
                        <p className="font-medium">Game Scheduling</p>
                        <p>After scheduling the game, you'll be able to manage the match details, update scores, and track results.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
