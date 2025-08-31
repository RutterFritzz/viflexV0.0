import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Game, Competition } from "@/types";
import { Link } from "@inertiajs/react";
import { formatDate } from "@/helpers/format-date";
import {
    Calendar,
    Clock,
    Trophy,
    Users,
    Gavel,
    User,
    Award,
    Building2,
    ArrowRight,
    MapPin,
    Activity,
} from "lucide-react";
import { t } from "i18next";

interface UserTeamRole {
    id: number;
    team?: {
        id: number;
        name: string;
        club?: {
            name: string;
        };
    };
    role?: {
        name: string;
    };
}

interface DashboardProps {
    userGames: {
        asPlayer: Game[];
        asCoach: Game[];
        asReferee: Game[];
    };
    upcomingGames: Game[];
    recentGames: Game[];
    userTeams: UserTeamRole[];
    userCompetitions: Competition[];
    statistics: {
        totalGames: number;
        upcomingGames: number;
        completedGames: number;
        totalTeams: number;
        totalCompetitions: number;
    };
}

export default function Dashboard({userGames, recentGames, statistics, userTeams, userCompetitions }: DashboardProps) {
    // Helper function to get game status badge
    const getGameStatusBadge = (game: Game) => {
        const gameDate = new Date(game.gameday?.date || '');
        const today = new Date();
        const diffTime = gameDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            return <Badge variant="secondary">{t('completed')}</Badge>;
        } else if (diffDays === 0) {
            return <Badge variant="destructive">{t('today')}</Badge>;
        } else if (diffDays <= 7) {
            return <Badge variant="default">{t('upcoming')}</Badge>;
        } else {
            return <Badge variant="outline">{t('scheduled')}</Badge>;
        }
    };

    // Helper function to get role badge
    const getRoleBadge = (role: string) => {
        switch (role.toLowerCase()) {
            case 'player':
                return <Badge variant="default" className="text-xs">{t('player')}</Badge>;
            case 'coach':
                return <Badge variant="secondary" className="text-xs">{t('coach')}</Badge>;
            default:
                return <Badge variant="outline" className="text-xs">{role}</Badge>;
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Calendar className="h-8 w-8" />
                        {t('dashboard')}
                    </h1>
                    <p className="text-muted-foreground">
                        {t('welcomeBack')} {t('hereIsAnOverviewOfYourUpcomingGamesAndActivities')}
                    </p>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t('totalGames')}</CardTitle>
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{statistics.totalGames}</div>
                        <p className="text-xs text-muted-foreground">
                            {t('allTimeGames')}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t('upcomingGames')}</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{statistics.upcomingGames}</div>
                        <p className="text-xs text-muted-foreground">
                            {t('next30Days')}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t('completedGames')}</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{statistics.completedGames}</div>
                        <p className="text-xs text-muted-foreground">
                            {t('last30Days')}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t('myTeams')}</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{statistics.totalTeams}</div>
                        <p className="text-xs text-muted-foreground">
                            {t('activeTeams')}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t('competitions')}</CardTitle>
                        <Award className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{statistics.totalCompetitions}</div>
                        <p className="text-xs text-muted-foreground">
                            {t('participatingIn')}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* My Teams Section */}
            {userTeams.length > 0 && (
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5" />
                                    {t('myTeams')}
                                </CardTitle>
                                <CardDescription>
                                    {t('teamsYouAreAMemberOfAsAPlayerOrCoach')}
                                </CardDescription>
                            </div>
                            <Badge variant="secondary">{userTeams.length}</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {userTeams.map((teamRole) => (
                                <div
                                    key={teamRole.id}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                            <Users className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="text-sm">
                                            <div className="font-medium">{teamRole.team?.name}</div>
                                            <div className="text-muted-foreground text-xs">
                                                {teamRole.team?.club?.name}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {getRoleBadge(teamRole.role?.name || t('member'))}
                                        <Button asChild variant="outline" size="sm">
                                            <Link href={route('team.show', teamRole.team?.id)}>
                                                <ArrowRight className="h-3 w-3" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* My Competitions Section */}
            {userCompetitions.length > 0 && (
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <Trophy className="h-5 w-5" />
                                    {t('myCompetitions')}
                                </CardTitle>
                                <CardDescription>
                                    {t('competitionsYouAreParticipatingIn')}
                                </CardDescription>
                            </div>
                            <Badge variant="secondary">{userCompetitions.length}</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {userCompetitions.map((competition) => (
                                <div
                                    key={competition.id}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                            <Trophy className="h-5 w-5 text-yellow-600" />
                                        </div>
                                        <div className="text-sm">
                                            <div className="font-medium">{competition.name}</div>
                                            <div className="text-muted-foreground text-xs">
                                                {competition.category} • {competition.year}
                                            </div>
                                        </div>
                                    </div>
                                    <Button asChild variant="outline" size="sm">
                                        <Link href={route('competition.show', competition.id)}>
                                            <ArrowRight className="h-3 w-3" />
                                        </Link>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Upcoming Games Section */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Games as Player */}
                {userGames.asPlayer.length > 0 && (
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="h-5 w-5" />
                                        {t('gamesAsPlayer')}
                                    </CardTitle>
                                    <CardDescription>
                                        {t('yourUpcomingGamesAsAPlayer')}
                                    </CardDescription>
                                </div>
                                <Badge variant="secondary">{userGames.asPlayer.length}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {userGames.asPlayer.slice(0, 5).map((game) => (
                                    <div
                                        key={game.id}
                                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="text-sm">
                                                <div className="font-medium">
                                                    {game.homeTeam?.name || t('teamA')} vs {game.awayTeam?.name || t('teamB')}
                                                </div>
                                                <div className="text-muted-foreground text-xs">
                                                    {game.competition?.name}
                                                </div>
                                                {game.gameday?.location && (
                                                    <div className="text-muted-foreground text-xs flex items-center gap-1">
                                                        <MapPin className="h-3 w-3" />
                                                        {game.gameday.location.name}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                <span>{game.time}</span>
                                            </div>
                                            {getGameStatusBadge(game)}
                                            <Button asChild variant="outline" size="sm">
                                                <Link href={route('game.show', game.id)}>
                                                    <ArrowRight className="h-3 w-3" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                {userGames.asPlayer.length > 5 && (
                                    <Button asChild variant="outline" size="sm" className="w-full">
                                        <Link href={route('game.index')}>
                                            {t('viewAllPlayerGames')}
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Games as Coach */}
                {userGames.asCoach.length > 0 && (
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <Award className="h-5 w-5" />
                                        {t('gamesAsCoach')}
                                    </CardTitle>
                                    <CardDescription>
                                        {t('yourUpcomingGamesAsACoach')}
                                    </CardDescription>
                                </div>
                                <Badge variant="secondary">{userGames.asCoach.length}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {userGames.asCoach.slice(0, 5).map((game) => (
                                    <div
                                        key={game.id}
                                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="text-sm">
                                                <div className="font-medium">
                                                    {game.homeTeam?.name || t('teamA')} vs {game.awayTeam?.name || t('teamB')}
                                                </div>
                                                <div className="text-muted-foreground text-xs">
                                                    {game.competition?.name}
                                                </div>
                                                {game.gameday?.location && (
                                                    <div className="text-muted-foreground text-xs flex items-center gap-1">
                                                        <MapPin className="h-3 w-3" />
                                                        {game.gameday.location.name}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                <span>{game.time}</span>
                                            </div>
                                            {getGameStatusBadge(game)}
                                            <Button asChild variant="outline" size="sm">
                                                <Link href={route('game.show', game.id)}>
                                                    <ArrowRight className="h-3 w-3" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                {userGames.asCoach.length > 5 && (
                                    <Button asChild variant="outline" size="sm" className="w-full">
                                        <Link href={route('game.index')}>
                                            {t('viewAllCoachGames')}
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Games as Referee */}
            {userGames.asReferee.length > 0 && (
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <Gavel className="h-5 w-5" />
                                    {t('gamesAsReferee')}
                                </CardTitle>
                                <CardDescription>
                                    {t('yourUpcomingOfficiatingAssignments')}
                                </CardDescription>
                            </div>
                            <Badge variant="secondary">{userGames.asReferee.length}</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {userGames.asReferee.slice(0, 5).map((game) => (
                                <div
                                    key={game.id}
                                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="text-sm">
                                            <div className="font-medium">
                                                {game.homeTeam?.name || t('teamA')} vs {game.awayTeam?.name || t('teamB')}
                                            </div>
                                            <div className="text-muted-foreground text-xs">
                                                {game.competition?.name}
                                            </div>
                                            {game.gameday?.location && (
                                                <div className="text-muted-foreground text-xs flex items-center gap-1">
                                                    <MapPin className="h-3 w-3" />
                                                    {game.gameday.location.name}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            <span>{game.time}</span>
                                        </div>
                                        {getGameStatusBadge(game)}
                                        <Button asChild variant="outline" size="sm">
                                            <Link href={route('game.show', game.id)}>
                                                <ArrowRight className="h-3 w-3" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            {userGames.asReferee.length > 5 && (
                                <Button asChild variant="outline" size="sm" className="w-full">
                                    <Link href={route('game.index')}>
                                        {t('viewAllRefereeGames')}
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('quickActions')}</CardTitle>
                    <CardDescription>
                        {t('commonTasksAndNavigationShortcuts')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                        <Button asChild variant="outline" className="h-auto p-4 flex-col gap-2">
                            <Link href={route('game.index')}>
                                <Calendar className="h-5 w-5" />
                                <span>{t('viewAllGames')}</span>
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="h-auto p-4 flex-col gap-2">
                            <Link href={route('team.index')}>
                                <Users className="h-5 w-5" />
                                <span>{t('myTeams')}</span>
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="h-auto p-4 flex-col gap-2">
                            <Link href={route('competition.index')}>
                                <Trophy className="h-5 w-5" />
                                <span>{t('competitions')}</span>
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="h-auto p-4 flex-col gap-2">
                            <Link href={route('gameday.index')}>
                                <Building2 className="h-5 w-5" />
                                <span>{t('gamedays')}</span>
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Recent Activity */}
            {recentGames.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>{t('recentActivity')}</CardTitle>
                        <CardDescription>
                            {t('yourRecentlyCompletedGamesAndActivities')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {recentGames.slice(0, 3).map((game) => (
                                <div
                                    key={game.id}
                                    className="flex items-center justify-between p-3 border rounded-lg"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="text-sm">
                                            <div className="font-medium">
                                                {game.homeTeam?.name || t('teamA')} vs {game.awayTeam?.name || t('teamB')}
                                            </div>
                                            <div className="text-muted-foreground text-xs">
                                                {game.competition?.name} • {formatDate(game.gameday?.date || '')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        {game.home_team_score !== null && game.away_team_score !== null && (
                                            <Badge variant="default" className="text-xs">
                                                {game.home_team_score} - {game.away_team_score}
                                            </Badge>
                                        )}
                                        <Button asChild variant="outline" size="sm">
                                            <Link href={route('game.show', game.id)}>
                                                <ArrowRight className="h-3 w-3" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Empty State */}
            {userGames.asPlayer.length === 0 && userGames.asCoach.length === 0 && userGames.asReferee.length === 0 && (
                <Card>
                    <CardContent className="text-center py-12">
                        <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <h3 className="text-lg font-medium mb-2">{t('noUpcomingGames')}</h3>
                        <p className="text-muted-foreground mb-6">
                            {t('youDontHaveAnyGamesScheduledAtTheMomentCheckBackLaterOrBrowseAvailableCompetitions')}
                        </p>
                        <div className="flex gap-3 justify-center">
                            <Button asChild>
                                <Link href={route('competition.index')}>
                                    <Trophy className="h-4 w-4 mr-2" />
                                    {t('browseCompetitions')}
                                </Link>
                            </Button>
                            <Button asChild variant="outline">
                                <Link href={route('team.index')}>
                                    <Users className="h-4 w-4 mr-2" />
                                    {t('viewTeams')}
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
