import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Game } from "@/types";
import { Link } from "@inertiajs/react";
import { Trophy, Calendar, MapPin, Eye, ArrowLeft, Clock, Users, Award } from "lucide-react";
import { formatDate } from "@/helpers/format-date";

export default function Index({ games }: { games: Game[] }) {
    // Group games by competition for better organization
    const gamesByCompetition = games.reduce((acc, game) => {
        const competitionName = game.competition?.name || 'Unknown Competition';
        if (!acc[competitionName]) {
            acc[competitionName] = [];
        }
        acc[competitionName].push(game);
        return acc;
    }, {} as Record<string, Game[]>);

    const competitions = Object.keys(gamesByCompetition).sort();

    // Helper function to get game status
    const getGameStatus = (game: Game) => {
        if (game.home_team_score !== null && game.away_team_score !== null) {
            return 'completed';
        }
        // Create a proper date object from the game date and time
        const gameDate = new Date(game.gameday?.date || '');
        const [hours, minutes] = game.time.split(':').map(Number);
        gameDate.setHours(hours, minutes);
        const now = new Date();
        if (gameDate < now) {
            return 'overdue';
        }
        return 'scheduled';
    };

    // Helper function to get status badge variant
    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'completed':
                return 'default';
            case 'overdue':
                return 'destructive';
            case 'scheduled':
                return 'secondary';
            default:
                return 'outline';
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
                            <Trophy className="h-8 w-8" />
                            Games & Matches
                        </h1>
                        <p className="text-muted-foreground">
                            View and manage all scheduled games and match results.
                        </p>
                    </div>
                    <Badge variant="secondary" className="flex items-center gap-1">
                        <Trophy className="h-3 w-3" />
                        {games.length} {games.length === 1 ? 'Game' : 'Games'}
                    </Badge>
                </div>
            </div>

            {/* Games by Competition */}
            {games.length === 0 ? (
                <Card>
                    <CardContent className="text-center py-12">
                        <Trophy className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <h3 className="text-lg font-medium mb-2">No games scheduled</h3>
                        <p className="text-muted-foreground mb-6">
                            Games will appear here once they are created for competitions.
                        </p>
                        <Button asChild>
                            <Link href="/competition">
                                <Award className="h-4 w-4 mr-2" />
                                Go to Competitions
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-8">
                    {competitions.map((competitionName) => (
                        <div key={competitionName} className="space-y-4">
                            <div className="flex items-center gap-3">
                                <h2 className="text-2xl font-semibold flex items-center gap-2">
                                    <Award className="h-6 w-6" />
                                    {competitionName}
                                </h2>
                                <Badge variant="outline" className="text-xs">
                                    {gamesByCompetition[competitionName].length} {gamesByCompetition[competitionName].length === 1 ? 'game' : 'games'}
                                </Badge>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {gamesByCompetition[competitionName].map((game) => {
                                    const status = getGameStatus(game);
                                    return (
                                        <Card key={game.id} className="hover:shadow-md transition-shadow">
                                            <CardHeader className="pb-3">
                                                <div className="flex items-center justify-between">
                                                    <CardTitle className="text-lg">
                                                        {game.home_team?.name || 'Team A'} vs {game.away_team?.name || 'Team B'}
                                                    </CardTitle>
                                                    <Badge variant={getStatusBadgeVariant(status)} className="text-xs">
                                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                                    </Badge>
                                                </div>
                                                <CardDescription className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-3 w-3" />
                                                        <span className="text-xs">{formatDate(game.gameday?.date || '')}</span>
                                                        <Clock className="h-3 w-3 ml-2" />
                                                        <span className="text-xs">{game.time}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="h-3 w-3" />
                                                        <span className="text-xs">{game.location?.name || 'Unknown Location'}</span>
                                                    </div>
                                                    {game.home_team_score !== null && game.away_team_score !== null && (
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <Users className="h-3 w-3" />
                                                            <span className="text-xs font-medium">
                                                                {game.home_team_score} - {game.away_team_score}
                                                            </span>
                                                        </div>
                                                    )}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardFooter className="pt-0">
                                                <Button asChild variant="outline" className="w-full">
                                                    <Link href={route('game.show', game.id)}>
                                                        <Eye className="h-4 w-4 mr-2" />
                                                        View Game
                                                    </Link>
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
