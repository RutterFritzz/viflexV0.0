import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gameday } from "@/types";
import { Link } from "@inertiajs/react";
import { Calendar, Plus, ArrowLeft, MapPin, Trophy, Clock } from "lucide-react";
import { formatDate } from "@/helpers/format-date";

export default function Index({ gamedays }: { gamedays: Gameday[] }) {
    // Helper function to get status badge
    const getStatusBadge = (date: Date) => {
        const today = new Date();
        const gamedayDate = new Date(date);
        const diffTime = gamedayDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            return <Badge variant="secondary">Past</Badge>;
        } else if (diffDays === 0) {
            return <Badge variant="default">Today</Badge>;
        } else if (diffDays <= 7) {
            return <Badge variant="destructive">Upcoming</Badge>;
        } else {
            return <Badge variant="outline">Scheduled</Badge>;
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href="/dashboard">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Dashboard
                        </Link>
                    </Button>
                </div>
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <Calendar className="h-8 w-8" />
                            Gamedays & Events
                        </h1>
                        <p className="text-muted-foreground">
                            Manage all scheduled gamedays and sporting events.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <Trophy className="h-3 w-3" />
                            {gamedays.length} {gamedays.length === 1 ? 'Gameday' : 'Gamedays'}
                        </Badge>
                        <Button asChild>
                            <Link href={route('gameday.create')}>
                                <Plus className="h-4 w-4 mr-2" />
                                Schedule Gameday
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
                        <h3 className="text-lg font-medium mb-2">No gamedays scheduled</h3>
                        <p className="text-muted-foreground mb-6">
                            Create your first gameday to start organizing sporting events.
                        </p>
                        <Button asChild>
                            <Link href={route('gameday.create')}>
                                <Plus className="h-4 w-4 mr-2" />
                                Schedule First Gameday
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
                                    <span className="text-xs">{gameday.location?.name || 'Unknown Venue'}</span>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Venue:</span>
                                        <span className="font-medium">{gameday.location?.name}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">City:</span>
                                        <Badge variant="outline" className="text-xs">{gameday.location?.city}</Badge>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Games:</span>
                                        <span className="font-medium">{gameday.games_count} scheduled</span>
                                    </div>
                                    {gameday.games && gameday.games.length > 0 && (
                                        <div className="pt-2 border-t">
                                            <div className="text-xs text-muted-foreground mb-2">Upcoming Games:</div>
                                            <div className="space-y-1">
                                                {gameday.games.slice(0, 2).map((game) => (
                                                    <div key={game.id} className="flex items-center justify-between text-xs">
                                                        <span className="truncate">
                                                            {game.homeTeam?.name || 'Team A'} vs {game.awayTeam?.name || 'Team B'}
                                                        </span>
                                                        <span className="text-muted-foreground">
                                                            <Clock className="inline h-3 w-3 mr-1" />
                                                            {game.time}
                                                        </span>
                                                    </div>
                                                ))}
                                                {gameday.games.length > 2 && (
                                                    <div className="text-xs text-muted-foreground">
                                                        +{gameday.games.length - 2} more games
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between pt-2">
                                        <Button asChild variant="outline" size="sm">
                                            <Link href={route('gameday.show', gameday.id)}>
                                                View Details
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
