import EditGameCard from "@/components/edit-game-card";
import { Game, User } from "@/types";
import { closestCorners, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useState } from "react";
import axios from "axios";

type UserRole = 'home_coach' | 'away_coach' | 'home_team' | 'away_team';

export default function Index({ _games }: { _games: Game[] }) {

    const [games, setGames] = useState<Game[]>(_games);

    const sensors = useSensors(
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
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

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

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
                    changes: {
                        [activeRole]: over.data.current.user?.id || null,
                        [targetRole]: activeUser.id,
                    }
                });
            } else {
                updates.push({
                    gameId: activeGameId,
                    changes: {
                        [activeRole]: over.data.current?.user?.id || null
                    }
                });
                updates.push({
                    gameId: targetGameId,
                    changes: {
                        [targetRole]: activeUser.id
                    }
                });
            }

            // axios.post('/games/update-users', { updates });
        }
    };

        return (
            <div>
                <h1>Games</h1>
                <DndContext
                    collisionDetection={closestCorners}
                    onDragEnd={handleDragEnd}
                    sensors={sensors}
                    >
                    <div className="flex flex-col gap-3">
                        <SortableContext items={games} strategy={verticalListSortingStrategy}>
                            {games.map((game) => (
                                <div key={game.id} className="flex flex-row gap-5 w-5/6 mx-auto">
                                    <p className="text-sm text-gray-500 flex items-center">{game.time}</p>
                                    <div className="w-full">
                                        <EditGameCard key={game.id} game={game} />
                                    </div>
                                </div>
                            ))}
                        </SortableContext>
                    </div>
                </DndContext>
            </div>
        );
    }