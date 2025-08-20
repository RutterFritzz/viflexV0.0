import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Game } from "@/types";
import { Link } from "@inertiajs/react";
import DeleteConfirmation from "@/components/delete-confirmation";
import { useState } from "react";
import { formatDate } from "@/helpers/format-date";
import { Trophy, Calendar, ArrowLeft, Edit, Trash2, Users, Award, Target, Building2 } from "lucide-react";

interface ShowProps {
    game: Game;
}

export default function Show({ game }: ShowProps) {
    const [dialogOpen, setDialogOpen] = useState(false);

    // Helper function to get game status
    const getGameStatus = () => {
        if (game.home_team_score !== null && game.away_team_score !== null) {
            return 'completed';
        }
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

    const status = getGameStatus();

    return (
        <div className="max-w-4xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('game.index')}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Games
                        </Link>
                    </Button>
                </div>
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Trophy className="h-8 w-8" />
                        {game.home_team?.name || 'Team A'} vs {game.away_team?.name || 'Team B'}
                    </h1>
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Award className="h-4 w-4" />
                            <Link href={route('competition.show', game.competition_id)} className="font-medium hover:text-primary transition-colors">
                                {game.competition?.name}
                            </Link>
                        </div>
                        <Badge variant={getStatusBadgeVariant(status)}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Badge>
                    </div>
                </div>
            </div>

            <Separator />

            {/* Match Details Section */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Match Information
                        </CardTitle>
                        <CardDescription>
                            Date, time, and location details.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-muted-foreground">Date:</span>
                                <span className="font-medium">{formatDate(game.gameday?.date || 'Unknown Date')}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-muted-foreground">Time:</span>
                                <span className="font-medium">{game.time}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-muted-foreground">Location:</span>
                                <span className="font-medium">{game.location?.name || 'Unknown Location'}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5" />
                            Match Result
                        </CardTitle>
                        <CardDescription>
                            Final score and outcome.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {game.home_team_score !== null && game.away_team_score !== null ? (
                            <div className="text-center space-y-4">
                                <div className="text-4xl font-bold">
                                    {game.home_team_score} - {game.away_team_score}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {game.home_team_score > game.away_team_score
                                        ? `${game.home_team?.name || 'Team A'} wins`
                                        : game.home_team_score < game.away_team_score
                                        ? `${game.away_team?.name || 'Team B'} wins`
                                        : 'Draw'
                                    }
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p className="text-lg font-medium">No result yet</p>
                                <p className="text-sm">Score will be updated after the match.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Teams Section */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Home Team */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building2 className="h-5 w-5" />
                            Home Team
                        </CardTitle>
                        <CardDescription>
                            {game.home_team?.name || 'Team A'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center py-6">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{game.home_team?.name}</h3>
                            <p className="text-sm text-muted-foreground">
                                Playing at home
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Away Team */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building2 className="h-5 w-5" />
                            Away Team
                        </CardTitle>
                        <CardDescription>
                            {game.away_team?.name || 'Team B'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center py-6">
                            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="h-8 w-8 text-secondary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{game.away_team?.name}</h3>
                            <p className="text-sm text-muted-foreground">
                                Playing away
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Competition Context */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Competition Context
                    </CardTitle>
                    <CardDescription>
                        Information about the competition this game belongs to.
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
                                View Competition
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Actions Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Game Actions</CardTitle>
                    <CardDescription>
                        Manage game settings and navigation.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-3">
                        <Button asChild variant="default">
                            <Link href={route('game.edit', game.id)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Game
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href={route('game.index')}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Games
                            </Link>
                        </Button>
                        <Button variant="destructive" size="sm" className="ml-auto"
                            onClick={(e) => {
                                e.preventDefault();
                                setDialogOpen(true);
                            }}
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Game
                        </Button>
                        <DeleteConfirmation
                            dialogOpen={dialogOpen}
                            type="game"
                            name={`${game.home_team?.name} vs ${game.away_team?.name}`}
                            onOpenChange={setDialogOpen}
                            id={game.id}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
