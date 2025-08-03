import EditGameCard from "@/components/edit-game-card";
import { Game, User } from "@/types";
import { closestCorners, DndContext, DragEndEvent, DragStartEvent, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useState } from "react";
import axios from "axios";
import TrashCan from "@/components/trash-can";

type UserRole = 'home_coach' | 'away_coach' | 'home_team' | 'away_team' | 'home_referee' | 'away_referee';

export default function Index({ _games }: { _games: Game[] }) {

    const [games, setGames] = useState<Game[]>(_games);
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
            setGames((games) => {
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

                axios.post('/games/update-time', {
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

            setGames((games) => {
                const newGames = [...games];

                const activeGameIndex = newGames.findIndex((game) => game.id === activeGameId);
                const targetGameIndex = newGames.findIndex((game) => game.id === targetGameId);

                if (activeGameIndex === -1 || targetGameIndex === -1) return newGames;

                newGames[activeGameIndex][activeRole] = over.data.current?.user || null;
                newGames[targetGameIndex][targetRole] = activeUser;

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

            axios.post('/games/update-users', { updates });
        }

        if (active.data.current?.type === 'user' && over?.data.current?.type === 'trash') {
            const activeRole: UserRole = active.data.current.role;
            const activeGameId: number = active.data.current.gameId;

            setGames((games) => {
                const newGames = [...games];
                const gameIndex = newGames.findIndex((game) => game.id === activeGameId);

                if (gameIndex !== -1) {
                    newGames[gameIndex][activeRole] = null;
                }

                return newGames;
            });

            axios.post('/games/update-users', {
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
        setGames((games) => {
            const newGames = [...games];
            const gameIndex = newGames.findIndex((game) => game.id === gameId);

            if (gameIndex !== -1) {
                newGames[gameIndex][role as UserRole] = user;
            }

            return newGames;
        });

        axios.post('/games/update-users', {
            updates: [
                {
                    gameId: gameId,
                    changes: [{ key: role, value: user.id }]
                }
            ]
        });
    }

        return (
            <div>
                <h1>Games</h1>
                <DndContext
                    collisionDetection={closestCorners}
                    onDragEnd={handleDragEnd}
                    sensors={sensors}
                    onDragStart={handleDragStart}
                    >
                    <div className="flex flex-col gap-3">
                        <SortableContext items={games} strategy={verticalListSortingStrategy}>
                            {games.map((game) => (
                                <div key={game.id} className="flex flex-row gap-5 w-5/6 mx-auto">
                                    <p className="text-sm text-gray-500 flex items-center">{game.time}</p>
                                    <div className="w-full">
                                        <EditGameCard key={game.id} game={game} onUserAssign={handleUserAssign} />
                                    </div>
                                </div>
                            ))}
                        </SortableContext>
                    </div>
                    <TrashCan isVisible={isDraggingUser} />
                </DndContext>
            </div>
        );
    }