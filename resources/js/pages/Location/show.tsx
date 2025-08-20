import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Location, Game } from "@/types";
import { Link } from "@inertiajs/react";
import DeleteConfirmation from "@/components/delete-confirmation";
import { useState } from "react";
import { formatDate } from "@/helpers/format-date";
import { MapPin, ArrowLeft, Edit, Trash2, Building2, Map, Calendar, Trophy, Clock } from "lucide-react";

interface ShowProps {
    location: Location;
    games?: Game[];
}

export default function Show({ location, games = [] }: ShowProps) {
    const [dialogOpen, setDialogOpen] = useState(false);

    // Get upcoming games
    // const upcomingGames = games.filter(game => new Date(game.date) > new Date());
    const pastGames = games.filter(game => new Date(game.date) <= new Date());

    const upcomingGames = games;

    return (
        <div className="max-w-4xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('location.index')}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Locations
                        </Link>
                    </Button>
                </div>
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <MapPin className="h-8 w-8" />
                        {location.name}
                    </h1>
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Map className="h-4 w-4" />
                            <Badge variant="secondary">{location.city}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            <span>Sports Venue</span>
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
                            Venue Information
                        </CardTitle>
                        <CardDescription>
                            Basic details about this location.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-muted-foreground">Venue Name:</span>
                                <span className="font-medium">{location.name}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-muted-foreground">City:</span>
                                <Badge variant="outline">{location.city}</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-muted-foreground">Type:</span>
                                <span className="font-medium">Sports Venue</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Trophy className="h-5 w-5" />
                            Venue Statistics
                        </CardTitle>
                        <CardDescription>
                            Overview of venue usage and activity.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="text-center p-4 border rounded-lg">
                                <div className="text-2xl font-bold text-primary">{games.length}</div>
                                <div className="text-sm text-muted-foreground">Total Games</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                                <div className="text-2xl font-bold text-secondary">{upcomingGames.length}</div>
                                <div className="text-sm text-muted-foreground">Upcoming Games</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                                <div className="text-2xl font-bold text-accent">{pastGames.length}</div>
                                <div className="text-sm text-muted-foreground">Past Games</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Upcoming Games Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Upcoming Games
                    </CardTitle>
                    <CardDescription>
                        Future games scheduled at this venue.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {upcomingGames.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p className="text-lg font-medium">No upcoming games</p>
                            <p className="text-sm">Games scheduled at this venue will appear here.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {upcomingGames.slice(0, 5).map((game) => (
                                <div
                                    key={game.id}
                                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="text-sm">
                                            <span className="font-medium">{game.homeTeam?.name || "Team A"}</span>
                                            <span className="text-muted-foreground mx-2">vs</span>
                                            <span className="font-medium">{game.awayTeam?.name || "Team B"}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            <span>{formatDate(game?.date || "")}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            <span>{game.time}</span>
                                        </div>
                                        <Button asChild variant="outline" size="sm">
                                            <Link href={route('game.show', game.id)}>
                                                View Game
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            {upcomingGames.length > 5 && (
                                <div className="text-center pt-2">
                                    <Button asChild variant="ghost" size="sm">
                                        <Link href={route('game.index')}>
                                            View all {upcomingGames.length} upcoming games
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Recent Games Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Trophy className="h-5 w-5" />
                        Recent Games
                    </CardTitle>
                    <CardDescription>
                        Recently completed games at this venue.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {pastGames.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p className="text-lg font-medium">No recent games</p>
                            <p className="text-sm">Completed games at this venue will appear here.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {pastGames.slice(0, 5).map((game) => (
                                <div
                                    key={game.id}
                                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="text-sm">
                                            <span className="font-medium">{game.homeTeam?.name || "Team A"}</span>
                                            <span className="text-muted-foreground mx-2">vs</span>
                                            <span className="font-medium">{game.awayTeam?.name || "Team B"}</span>
                                        </div>
                                        {game.home_team_score !== null && game.away_team_score !== null && (
                                            <Badge variant="default" className="text-xs">
                                                {game.home_team_score} - {game.away_team_score}
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            <span>{formatDate(game.date)}</span>
                                        </div>
                                        <Button asChild variant="outline" size="sm">
                                            <Link href={route('game.show', game.id)}>
                                                View Game
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            {pastGames.length > 5 && (
                                <div className="text-center pt-2">
                                    <Button asChild variant="ghost" size="sm">
                                        <Link href={route('game.index')}>
                                            View all {pastGames.length} past games
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Actions Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Location Actions</CardTitle>
                    <CardDescription>
                        Manage location settings and navigation.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-3">
                        <Button asChild variant="default">
                            <Link href={route('location.edit', location.id)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Location
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href={route('location.index')}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Locations
                            </Link>
                        </Button>
                        <Button variant="destructive" size="sm" className="ml-auto"
                            onClick={(e) => {
                                e.preventDefault();
                                setDialogOpen(true);
                            }}
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Location
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
