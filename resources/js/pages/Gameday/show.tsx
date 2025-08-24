import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Gameday, Game, User, Team, PresenceData } from "@/types";
import { Link } from "@inertiajs/react";
import DeleteConfirmation from "@/components/delete-confirmation";
import EditGameCard from "@/components/edit-game-card";
import TrashCan from "@/components/trash-can";
import { useState } from "react";
import { Calendar, ArrowLeft, Edit, Trash2, MapPin, Trophy, Clock, Building2, Plus } from "lucide-react";
import { formatDate } from "@/helpers/format-date";
import { closestCorners, DndContext, DragEndEvent, DragStartEvent, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import axios from "axios";
// import PresenceSubmit from "@/components/presence-submit";

type UserRole = 'home_coach' | 'away_coach' | 'home_team_users' | 'away_team_users' | 'home_referee' | 'away_referee';

interface ShowProps {
    gameday: Gameday;
    games?: Game[];
}

export default function Show({ gameday, games = [] }: ShowProps) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [gameList, setGameList] = useState<Game[]>(games);
    const [isDraggingUser, setIsDraggingUser] = useState(false);

    const sensors = useSensors(
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5
            },
        }),
        useSensor(PointerSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5
            },
        }));

    // Get status badge
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

    // Get completed and upcoming games
    const completedGames = gameList.filter(game => new Date(game.time) <= new Date());
    const upcomingGames = gameList;

    const handleDragStart = (event: DragStartEvent) => {
        if (event.active.data.current?.type === 'user') {
            setIsDraggingUser(true);
        }
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        setIsDraggingUser(false);

        if (active.id === over?.id) return;

        if (active.data.current?.type === 'game' && over?.data.current?.type === 'game') {
            setGameList((games) => {
                const oldIndex = games.findIndex((game) => game.id === active.id);
                const newIndex = games.findIndex((game) => game.id === over?.id);

                const newGames = [...games];

                const tempTime = newGames[oldIndex].time;
                newGames[oldIndex].time = newGames[newIndex].time;
                newGames[newIndex].time = tempTime;

                const changedGames = [
                    {
                        id: newGames[oldIndex].id,
                        time: newGames[oldIndex].time
                    },
                    {
                        id: newGames[newIndex].id,
                        time: newGames[newIndex].time
                    }
                ];

                axios.post(route('game.update-time'), {
                    games: changedGames
                });

                return arrayMove(newGames, oldIndex, newIndex);
            });
        }

        if (active.data.current?.type === 'user' && over?.data.current?.type === 'slot') {
            const activeUser: User = active.data.current.user;
            const activeRole: UserRole = active.data.current.role;
            const activeGameId: number = active.data.current.gameId;

            const targetRole: UserRole = over.data.current.role;
            const targetGameId: number = over.data.current.gameId;

            setGameList((games) => {
                const newGames = [...games];

                const activeGameIndex = newGames.findIndex((game) => game.id === activeGameId);
                const targetGameIndex = newGames.findIndex((game) => game.id === targetGameId);

                if (activeGameIndex === -1 || targetGameIndex === -1) return newGames;

                // Handle team users arrays
                if (activeRole.includes('team_users') || targetRole.includes('team_users')) {
                    if (activeRole.includes('team_users')) {
                        (newGames[activeGameIndex] as any)[activeRole] = over.data.current?.user ? [over.data.current.user] : null;
                    }
                    if (targetRole.includes('team_users')) {
                        (newGames[targetGameIndex] as any)[targetRole] = [activeUser];
                    }
                } else {
                    // Handle single user assignments
                    (newGames[activeGameIndex] as any)[activeRole] = over.data.current?.user || null;
                    (newGames[targetGameIndex] as any)[targetRole] = activeUser;
                }

                return newGames;
            });

            const updates = [];

            if (activeGameId === targetGameId) {
                updates.push({
                    gameId: activeGameId,
                    changes: [
                        {
                            key: activeRole,
                            value: over.data.current.user?.id || null,
                        },
                        {
                            key: targetRole,
                            value: activeUser.id,
                        }
                    ]
                });
                if (updates[0].changes[0].value === updates[0].changes[1].value) {
                    return;
                }
            } else {
                updates.push({
                    gameId: activeGameId,
                    changes: [
                        {
                            key: activeRole,
                            value: over.data.current?.user?.id || null,
                        }
                    ]
                });
                updates.push({
                    gameId: targetGameId,
                    changes: [
                        {
                            key: targetRole,
                            value: activeUser.id,
                        }
                    ]
                });
            }

            axios.post(route('game.update-users'), { updates });
        }

        if (active.data.current?.type === 'user' && over?.data.current?.type === 'trash') {
            const activeRole: UserRole = active.data.current.role;
            const activeGameId: number = active.data.current.gameId;

            setGameList((games) => {
                const newGames = [...games];
                const gameIndex = newGames.findIndex((game) => game.id === activeGameId);

                if (gameIndex !== -1) {
                    (newGames[gameIndex] as any)[activeRole] = null;
                }

                return newGames;
            });

            axios.post(route('game.update-users'), {
                updates: [
                    {
                        gameId: activeGameId,
                        changes: [{ key: activeRole, value: null }]
                    }
                ]
            });
        }
        return;
    };

    const handleUserAssign = (user: User, role: string, gameId: number) => {
        setGameList((games) => {
            const newGames = [...games];
            const gameIndex = newGames.findIndex((game) => game.id === gameId);

            if (gameIndex !== -1) {
                if (role.includes('team_users')) {
                    (newGames[gameIndex] as any)[role] = [user];
                } else {
                    (newGames[gameIndex] as any)[role] = user;
                }
            }

            return newGames;
        });

        axios.post(route('game.update-users'), {
            updates: [
                {
                    gameId: gameId,
                    changes: [{ key: role, value: user.id }]
                }
            ]
        });
    }

    // const handlePresenceSubmit = (team: Team, presenceData: PresenceData) => {
    //     axios.post(route('gameday.submit-presence', gameday.id), {
    //         team_id: team.id,
    //         presence: presenceData
    //     });
    // }

    return (
        <div className="max-w-4xl mx-auto space-y-6 p-6">
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={route('gameday.index')}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Gamedays
                        </Link>
                    </Button>
                </div>
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Calendar className="h-8 w-8" />
                        Gameday - {formatDate(gameday.date)}
                    </h1>
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <Badge variant="secondary">{gameday.location?.name}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            <span>{gameday.location?.city}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            {getStatusBadge(gameday.date)}
                        </div>
                    </div>
                </div>
            </div>

            <Separator />

            {/* Gameday Details Section */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Event Information
                        </CardTitle>
                        <CardDescription>
                            Basic details about this gameday.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-muted-foreground">Date:</span>
                                <span className="font-medium">{formatDate(gameday.date)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-muted-foreground">Venue:</span>
                                <span className="font-medium">{gameday.location?.name}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-muted-foreground">City:</span>
                                <Badge variant="outline">{gameday.location?.city}</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-muted-foreground">Status:</span>
                                {getStatusBadge(gameday.date)}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Trophy className="h-5 w-5" />
                            Event Statistics
                        </CardTitle>
                        <CardDescription>
                            Overview of games and activity for this gameday.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="text-center p-4 border rounded-lg">
                                <div className="text-2xl font-bold text-primary">{gameList.length}</div>
                                <div className="text-sm text-muted-foreground">Total Games</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                                <div className="text-2xl font-bold text-secondary">{upcomingGames.length}</div>
                                <div className="text-sm text-muted-foreground">Upcoming Games</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                                <div className="text-2xl font-bold text-accent">{completedGames.length}</div>
                                <div className="text-sm text-muted-foreground">Completed Games</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Team Management Section */}
            {/* <Card>
                <CardHeader>
                    <CardTitle>Team Management</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-3">
                        <div className="grid grid-cols-2 gap-3">
                            {teams?.map((team) => (
                                <PresenceSubmit key={team.id} team={team} onSubmit={handlePresenceSubmit}>
                                    <div className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2 cursor-pointer hover:shadow-md transition-shadow">
                                    <h3 className="text-lg font-medium">{team.name}</h3>
                                    <div className="flex flex-col gap-2">
                                        {team.hasPresences ? (
                                            <CircleCheck className="h-6 w-6 text-success" />
                                        ) : (
                                            <CircleAlert className="h-6 w-6 text-warning" />
                                        )}
                                    </div>
                                    </div>
                                </PresenceSubmit>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card> */}

            {/* Games Management Section */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                Games Management
                            </CardTitle>
                            <CardDescription>
                                Drag and drop to reorder games and assign users to roles.
                            </CardDescription>
                        </div>
                        <Button asChild variant="outline" size="sm">
                            <Link href="#">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Game
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {gameList.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p className="text-lg font-medium">No games scheduled</p>
                            <p className="text-sm">Games scheduled for this gameday will appear here.</p>
                        </div>
                    ) : (
                        <DndContext
                            collisionDetection={closestCorners}
                            onDragEnd={handleDragEnd}
                            sensors={sensors}
                            onDragStart={handleDragStart}
                        >
                            <div className="flex flex-col gap-3">
                                <SortableContext items={gameList} strategy={verticalListSortingStrategy}>
                                    {gameList.map((game) => (
                                        <div key={game.id} className="flex flex-row gap-5 w-full">
                                            <div className="flex items-center min-w-[80px]">
                                                <Badge variant="outline" className="text-xs">
                                                    {game.time}
                                                </Badge>
                                            </div>
                                            <div className="w-full">
                                                <EditGameCard key={game.id} game={game} onUserAssign={handleUserAssign} />
                                            </div>
                                        </div>
                                    ))}
                                </SortableContext>
                            </div>
                            <TrashCan isVisible={isDraggingUser} />
                        </DndContext>
                    )}
                </CardContent>
            </Card>

            {/* Actions Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Gameday Actions</CardTitle>
                    <CardDescription>
                        Manage gameday settings and navigation.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-3">
                        <Button asChild variant="default">
                            <Link href={route('gameday.edit', gameday.id)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Gameday
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href={route('gameday.index')}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Gamedays
                            </Link>
                        </Button>
                        <Button variant="destructive" size="sm" className="ml-auto"
                            onClick={(e) => {
                                e.preventDefault();
                                setDialogOpen(true);
                            }}
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Gameday
                        </Button>
                        <DeleteConfirmation
                            dialogOpen={dialogOpen}
                            type="gameday"
                            name={`Gameday on ${formatDate(gameday.date)}`}
                            onOpenChange={setDialogOpen}
                            id={gameday.id}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
